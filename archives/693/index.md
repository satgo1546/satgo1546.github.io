---
title: Git仓库作为API端点（1）：远程控制智能马桶
date: 2025-07-28
dates: 2025-07-26 ~ 2025-07-30
excerpt: git提供了大量下水道疏通工具（plumbing commands）来操作本地库，可与远端交互的命令却只有fetch和push这样的完整文件树操作。这个世界需要更多支持远程控制的智能马桶。
tags:
- 实验
- Git
- GitHub
---

你是否在Git服务中遇到过这样的不便？许多“高级”操作都必须克隆到本地仓库中进行，例如修订提交消息（amend）、移动分支指向（update-ref）、创建空分支（switch --orphan）等，甚至只是一次性提交多个文件的修改都无法在线完成。仓库可能很大，临时克隆要花不少时间。

GitHub提供的在线编辑功能很有限，在一个提交中只能编辑、移动或删除单个文件。曾经，想要达成在线提交多个文件就必须创建合并请求，然后压缩合并多个各自包含单个文件修改的提交。后来，GitHub允许一次上传多个文件（可以覆盖现有文件），而github.dev使在线提交多个文件和改写历史成为了可能。在大型仓库上使用github.dev只用下载索引，比克隆整个仓库快不少。但无论如何，改写历史都无法在线完成。没有在线IDE服务的提供商就更没辙了。

仔细考虑Git存储原理与git命令行的工作方式，其实任何支持HTTP传输协议的Git服务都可以通过HTTP传输请求直接操作库中对象，而不受到服务商额外提供的接口种类限制。传输协议其实有很大的自由度，可以精准地只传输需要的部分，也可以改写历史。

git提供了大量下水道疏通工具（plumbing commands）来操作本地库，可与远端交互的命令却只有fetch和push这样的完整文件树操作。这个世界需要更多支持远程控制的智能马桶。

那么，来写一个自己的Git客户端吧！先以修改分支指向（就像git update-ref那样）为目标吧。

## 逆向

Git传输协议的文档在这里：[v0](https://git-scm.com/docs/http-protocol)，[v2](https://git-scm.com/docs/protocol-v2)。

由于Git事实上只有一个实现，文档并非规范，程序才是真理，文档当然也就一坨屎，不少试图重新实现Git传输协议的人都吐槽说遇到了一万个文档没说明的细节。比如说，v0文档第一段就提到的dumb protocol，GitHub完全不支持，只支持smart protocol（智能马桶实至名归）。继续读下去还会发现这文档根本没写完，留着一大堆TODO。字里行间有大量专有词汇，不像是面向实现者的说明，而更像是笔记。

要尝试就不得不抱着搞不明白就只能抓包的心态继续了。设置`GIT_TRACE_PACKET`环境变量为真，可令git输出请求明细，但不是在HTTP请求的级别，而是更高的抽象层，且不会输出PACK内容。

要弄清楚HTTP请求格式，还是用mitmproxy和whistle之类的工具比较方便。在.gitconfig中配置https.proxy到这些调试用代理，就可以截获真实请求数据。

<img src="mitmweb.webp" alt="mitmweb">

## 请求头

传输协议包含两种操作：git-upload-pack和git-receive-pack。它们的命名基于服务器视角；按用户的说法，git-upload-pack是下载/读取，git-receive-pack是上传/写入。端点URL示例如下：

<dl>
<dt>下载/读取<dd>
GET https://github.com/octocat/Hello-World.git/info/refs?service=git-upload-pack
<br>
POST https://github.com/octocat/Hello-World.git/git-upload-pack
<dt>上传/写入<dd>
GET https://github.com/octocat/Hello-World.git/info/refs?service=git-receive-pack
<br>
POST https://github.com/octocat/Hello-World.git/git-receive-pack
</dl>

守序的客户端需要先GET了解服务器基本信息和远端仓库分支列表，再POST执行实际传输。我不是守序而是混乱派，反正HTTP请求无状态，直接跳过GET，快进到有实际作用的那条POST请求吧。

理论上，所有请求都需要携带自定义的Accept和Content-Type标头，但我测试发现GitHub不强制要求这一点。

携带`Git-Protocol: version=2`标头以使用v2协议。（携带`Git-Protocol: version=1`标头以使用v1协议。v1协议貌似就是v0多了个版本号。）目前v2协议还不支持push操作（？！），所以v0和v2混用是常态，v0用于上传，v2用于下载。

https://github.com/git/git/blob/v2.50.1/remote-curl.c#L494-L501

写入仓库通常需要登录，读取私有仓库也需要登录。登录凭据通过`Authorization: Basic ⟨Base64⟩`标头传入。

```js
fetch('https://github.com/octocat/Hello-World.git/git-receive-pack', {
	method: 'POST',
	headers: {
		Accept: 'application/x-git-receive-pack-result',
		'Content-Type': 'application/x-git-receive-pack-request',
		Authorization: 'Basic ' + btoa('username:ghp_114514191981AAAaaa1145141919810721AAAaaa'),
		'Git-Protocol': 'version=1',
	},
	body: new Uint8Array([
```

## 请求体

Git作为诞生于Unix系平台上的C程序，很喜欢混合文本和二进制数据。传输流中，控制命令是纯文本，却动不动就插个`\0`；二进制数据也不编码，就硬传。Git也不对文本编码方案多加过问，就算在库里存GBK也没意见，只是约定俗成采用UTF-8。

这个POST端点要求请求体由若干个“pkt-line”结构和一个“pack”拼接而成。pkt-line是4位十六进制以字节为单位的长度（含这4位数）加文本内容形成的length–value结构。pack也就是扩展名为pack的文件，天然生成于.git/objects/pack目录中，是对象压缩包。

这个端点的pkt-line结构描述分支指向的变化。无论推送什么东西到远端，最终都会落实到分支指向变化：新提交、合并是分支前进，创建标签就是创建新分支，删除分支表示为修改指向到0000000000000000000000000000000000000000。每个pkt-line记录一个分支修改前和修改后的指向，一次请求可以更新多个分支。例如，这个pkt-line表示将main分支由`e68ed00`移动到`f9e7acd`：

```
e68ed00599915904d235d958e66679921025f723 f9e7acd46c5a03e19d8c23379f66bdd29d2448d7 refs/heads/main
```

第一个pkt-line的末尾可附元数据，例如客户端字符串（类似User-Agent的作用），是否需要服务器汇报进度（不汇报的话连报错都不会返回 😾）等。这些元数据被称为capability。

如果只是修改分支指向到已有的提交的话，不需要传输任何对象内容。但是这个端点强制要求请求体携带一个pack，所以还需要一个空的pack。[pack格式文档在此](https://git-scm.com/docs/gitformat-pack)。

```
+00  50 41 43 4B  … PACK文件头
+04              00 00 00 02  … 版本2（大端序）
+08                          00 00 00 00  … 包含0个对象（大端序）
+0C                                      02 9D 08 82
+10  3B D8 A8 EA B5 10 AD 6A C7 5C 82 3C FD 3E D3 1E  … SHA-1(以上12字节)
```

将上述元素拼接成一个请求体。

<img src="dissection.svg" width="444" height="264">

```js
const pktLine = str => {
	const bytes = new TextEncoder().encode('????' + str)
	new TextEncoder().encodeInto(bytes.length.toString(16).padStart(4, '0'), bytes)
	return bytes
}
fetch('https://gist.github.com/008e50722174267a95bd6c033c4c5d3d.git/git-receive-pack', {
	method: 'POST',
	headers: {
		Accept: 'application/x-git-receive-pack-result',
		'Content-Type': 'application/x-git-receive-pack-request',
		Authorization: 'Basic ' + btoa('satgo1546:ghp_114514191981AAAaaa1145141919810721AAAaaa'),
		'Git-Protocol': 'version=1',
	},
	body: new Uint8Array([
		...pktLine('e68ed00599915904d235d958e66679921025f723 f9e7acd46c5a03e19d8c23379f66bdd29d2448d7 refs/heads/main\0 report-status-v2\n'),
		0x30, 0x30, 0x30, 0x30, // 0000
		0x50, 0x41, 0x43, 0x4b, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00,
		...new Uint8Array(await crypto.subtle.digest('SHA-1', new Uint8Array([0x50, 0x41, 0x43, 0x4b, 0x00, 0x00, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00]))),
	]),
})
```

端点返回类似下列响应，即表明分支指向修改成功（“ok”）。这个请求完成了一次推送操作，使main分支由`e68ed00` 移动到了`f9e7acd`。

<pre><code>000eunpack ok
0017<mark>ok</mark> refs/heads/main
00000000</code></pre>

如果请求中提供的修改前指向不正确，则会返回错误信息表明失败（“ng”）。

<pre><code>000eunpack ok
009f<mark>ng</mark> refs/heads/main cannot lock ref 'refs/heads/main': is at f9e7acd46c5a03e19d8c23379f66bdd29d2448d7 but expected e68ed00599915904d235d958e66679921025f723
00000000</code></pre>

## 尾注

这个端点并不区分分支是前进还是后退。实际上常在git push输出中看到的“[rejected]”提示并不是服务端报错，而是客户端额外做的检查。不过，为了精细权限控制和访问记录（禁止某些用户强制推送等），高级Git服务器仍会检查修改的分支是否严格前进了。

虽然服务商提供的API支持CORS，但是Git端点被设计为仅用于git命令行，不会返回Access-Control-Allow-Origin标头，像[isomorphic-git](https://isomorphic-git.org/)这样的项目不得不依赖中转服务器。

GitHub的一些附加服务背后也由完整的Git仓库支撑，例如gist和wiki，在对应页面上能找到.git URL。需要临时练习场地的话，建条gist就足够了。

<img src="github-gist.webp" width="312">

<img src="github-wiki.webp" width="320">
