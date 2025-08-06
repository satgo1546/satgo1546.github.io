---
title: Git仓库作为API端点（3）：您完全不克隆是吗？
date: 2025-08-01
excerpt: “不知道怎么解包超过一个对象”这种事是什么鬼啦！
tags:
- 实验
- Git仓库作为API端点
- Git
- GitHub
---

[上回](/archives/700/)实现了在不克隆仓库的情况下向仓库推送提交。到目前为止，所有对象散列值都是写死的。下一步，将自动化获取这些信息。

使用Git HTTP端点下载仓库信息本质上与克隆没什么区别。只是，绕开git后，所需信息可仅保留在内存中，不必触及文件系统。

这里介绍的是v2下载协议。与上传一样，守序的客户端应先GET再POST。在v0协议中，GET请求是获取远端分支指向的必经之路，但在v2协议中，GET请求的响应中没有任何有价值的信息，这样的设计导致用v2协议下载比v0要多请求一次。混乱派可以直接略过GET请求。

下载分为两步：获取分支指向的对象散列值（ls-refs）、获取指定散列值的对象内容（fetch）。

## ls-refs

一次git命令行克隆产生的第一个POST请求体如下：

<pre><code>0014<mark>command=ls-refs</mark>
001aagent=git/2.50.1-Linux0016object-format=sha1<mark>0001</mark>0009peel
000csymrefs
000bunborn
001bref-prefix refs/heads/
001aref-prefix refs/tags/
0014ref-prefix HEAD
<mark>0000</mark></code></pre>

请求体由多个pkt-line结构构成，分为元数据和命令参数两段，之间用`0001`隔开，最后以`0000`结尾。命令名必须置于元数据段最首，其他都可以省略。每次请求只能发送一条命令。

对于ls-refs命令，元数据和参数都是可选项，因此如下的请求足矣。

```
0014command=ls-refs
00010000
```

为了避免浪费流量下载到不需要的东西（真的吗？），客户端通过ref-prefix参数告知服务器需要得知哪些分支的指向。但是，这个参数只是前缀提示，一来客户端无法精确指定需要的分支，二来服务器有权额外返回无用分支信息。

怎么着都得正经解析响应。响应也是多个pkt-line结构，以`0000`结尾，每行描述一个分支的指向。

```ts
const head = parsePktLines(await (await fetch('https://gist.github.com/008e50722174267a95bd6c033c4c5d3d.git/git-upload-pack', {
	method: 'POST',
	headers: {
		Accept: 'application/x-git-upload-pack-result',
		'Content-Type': 'application/x-git-upload-pack-request',
		Authorization: 'Basic ' + btoa('satgo1546:ghp_114514191981AAAaaa1145141919810721AAAaaa'),
		'Git-Protocol': 'version=2',
	},
	body: new Blob([
		pktLine('command=ls-refs\n'),
		new Uint8Array([0x30, 0x30, 0x30, 0x31]), // 0001
		pktLine('ref-prefix HEAD\n'),
		new Uint8Array([0x30, 0x30, 0x30, 0x30]), // 0000
	]),
})).bytes()).flatMap(line => line instanceof Uint8Array ? [new TextDecoder().decode(line).replace(/\n$/, '').split(' ')] : []).find(line => line[1] === 'HEAD')[0]
console.log(head) // ⇒ 209ffbc589f3afa43ae98a5b7ceb40a970bdd19f
```

如果只需要知道分支当前指向（例如，准备完全覆盖分支内容和历史的场合），这一步就足够了。需要对象内容的话，还得继续请求。

## fetch

取得了提交散列值后，再发一条fetch命令获取提交内容，参数是下载起点对象散列值。该命令面向克隆和抓取操作优化，服务器会主动计算从指定起点出发的完整克隆需要哪些数据，将涉及的文件树和文件内容一并打包发送。

要避免下载过多不需要的数据，就要传入deepen和filter参数抑制默认行为。`git clone`的`--depth`和`--filter`选项的原理就是在请求中携带这些参数。上回的`git clone --depth=1 --filter=tree:0`命令产生的第二个POST请求体如下：

<pre><code>0011command=fetch001aagent=git/2.50.1-Linux0016object-format=sha10001000dthin-pack000finclude-tag000dofs-delta000c<mark>deepen 1</mark>0011<mark>filter tree:0</mark>0032want f9e7acd46c5a03e19d8c23379f66bdd29d2448d7
0032want f9e7acd46c5a03e19d8c23379f66bdd29d2448d7
0009done
0000</code></pre>

照做就可以只下载提交而不下载文件树和文件内容。

协议规定了客户端与服务器之间一套复杂的协商流程，响应时机与格式都各有触发条件。我搞不懂在看不到对象内容的情况下有啥好协商的。

简单实现可以跳过大部分解析，等待服务器返回`000dpackfile␊`后，收集以字节01开头的pkt-line，直冲pack内容。甚至不等待也没问题，因为在packfile出现之前的消息都是文本，不会以字节01开头。

```ts
const packfile = await new Blob(Array.from(parsePktLines(await (await fetch('https://gist.github.com/008e50722174267a95bd6c033c4c5d3d.git/git-upload-pack', {
	// method、headers同上一请求
	body: new Blob([
		pktLine('command=fetch\n'),
		new Uint8Array([0x30, 0x30, 0x30, 0x31]), // 0001
		pktLine('wait-for-done\n'),
		pktLine('no-progress\n'),
		pktLine('deepen 1\n'),
		pktLine('filter tree:0\n'),
		pktLine('want 209ffbc589f3afa43ae98a5b7ceb40a970bdd19f\n'),
		pktLine('done\n'),
		new Uint8Array([0x30, 0x30, 0x30, 0x30]), // 0000
	]),
})).bytes())).flatMap(line => line instanceof Uint8Array && line[0] === 1 ? [line.subarray(1)] : [])).bytes()
```

这里额外传入了wait-for-done参数禁止服务器抢先响应，不过因为want参数只有一个，不加wait-for-done也问题不大。

如果没有no-progress参数，会在字节02开头的pkt-line中以“Enumerating objects”起手汇报进度，命令行克隆时显示的远端消息就来源于此。

pack文件格式上回已经描述过了。按理说反过来解析应该不成问题，但是上回还提到……

> 数据流长度要靠zlib解析。神人编码 😾

zlib原作C库在z_stream结构体中给出了足够多的信息，帮助应用程序确定zlib流断在何处。Python标准库zlib提供了Decompress.unused_data属性，Ruby标准库 Zlib::ZStream复刻了C结构体，都能应对结束位置不明的zlib流。

而到了JavaScript，容易被忽视的用例必定会被无视。DecompressionStream的封装显然压根没考虑过怎么获取zlib流后面的数据，数据流太短会报错，太长也会报错，是[标准规定](https://compression.spec.whatwg.org/#decompress-and-enqueue-a-chunk)的行为：

> 2. If the end of the compressed input has not been reached, then throw a `TypeError`.

如果能保证pack中只有一个对象，那么删掉pack尾部的20字节SHA-1就能得到干净的zlib数据。

```ts
const unpack = async (bytes: Uint8Array) => {
	const view = new DataView(bytes.buffer)
	if (view.getUint32(0) !== 0x5041434b) throw new Error('not a packfile')
	if (view.getUint32(4) !== 2) throw new Error('not a version 2 packfile')
	if (view.getUint32(8) !== 1) throw new Error('do not know how to unpack a packfile with more than one object')
	return await new Response(new Response(bytes.subarray(bytes.findIndex((b, i) => i >= 12 && b < 128) + 1, -20)).body!.pipeThrough(new DecompressionStream('deflate'))).bytes()
}
```

“不知道怎么解包超过一个对象”这种事是什么鬼啦！

可是有多个对象的话，想利用DecompressionStream就很困难了。

zlib头不记载长度信息，DEFLATE块的长度则埋在多种位域里，因此没法方便地手动切分。

zlib头只有两个字节，有多种，其中最常见，也是一般Git服务器会返回的，是78 9C。就算在数据流里搜索78 9C并认定这就是zlib数据的开端，也因两条数据之间隔着ULEB128编码的对象类型和长度，而ULEB128只能正向读，不能反向从尾找到头，无法由此回到上一个zlib流的末尾。

我想可能只能切下各种长度的数据尝试解压，用报错信息二分实际长度了。总比枚举要好吧。

<dl>
<dt>Chrome<dd><dl>
<dt>数据太短<dd>TypeError: Compressed input was truncated.
<dt>数据太长<dd>TypeError: Junk found after end of compressed data.
</dl>
<dt>Firefox<dd><dl>
<dt>数据太短<dd>TypeError: The input is ended without reaching the stream end
<dt>数据太长<dd>TypeError: Unexpected input after the end of stream
</dl>
<dt>Safari<dd><dl>
<dt>数据太短<dd>TypeError: Extra bytes past the end.
<dt>数据太长<dd>TypeError: Extra bytes past the end.
</dl>
</dl>

为什么Safari的两种报错信息是一样的？……只能说依靠报错信息运行的艺术对人类来说还是太过超前了。

看来要正确解析包含多于一个对象的pack，只能用JS实现zlib流的解压了，留给读者作为习题。

话说回来，在`deepen 1`和`filter tree:0`参数的限制下，服务器理论上只应、实践中确实也只返回一个对象，所以只能解包一个对象的unpack函数也并非毫无用武之地。

```ts
const [, treeHash] = new TextDecoder().decode(await unpack(packfile)).match(/^tree ([0-9a-f]{40})\n/)
```

这样一来，上回所有写死的散列值，在本篇都动态获取到了。

## 尾注

Git提供商可能额外提供返回JSON的提交信息查询端点，使用起来更加便利。例如，GitLab支持`GET /projects/⟨项目ID⟩/repository/commits/⟨分支名⟩`，返回的结果包含最新提交的散列值（id）和上一提交的散列值（parent_ids）。

GitHub的提交信息查询端点`GET https://api.github.com/repos/⟨用户名⟩/⟨仓库名⟩/commits/⟨分支名⟩`除了最新提交和上一提交，还会返回文件树对象的散列值（commit.tree.sha）。

GitHub还额外提供了一整套Git仓库详细信息查询和修改端点（[REST API endpoints for Git database](https://docs.github.com/en/rest/git)），其完整度之高，利用它们同样能在不克隆仓库的前提下完成复杂的提交操作。然而，不像Git传输协议使用pack格式，GitHub提供的端点一次请求只能创建一个对象，来回传输多次才能构建并推送一个提交。

如果Git服务器启用了ref-in-want支持，就可以用want-ref参数代替want参数，略去获取分支指向的请求，一步到位要求服务器返回指定分支的提交对象。这不仅能节省一次请求，还有助于避免竞态条件（参照提交说明[`516e2b7` upload-pack: implement ref-in-want](https://github.com/git/git/commit/516e2b76bdcf53e757309481fa0e663217ee8039)）。可惜GitHub和GitLab至今仍不支持这一2018年就加入Git的功能。
