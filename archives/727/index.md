---
title: Git仓库作为API端点（4）：这个只存在十天的世界
date: 2025-08-02
dates: 2025-08-02 ~ 2025-08-03
excerpt: 我只能认为，当时的Linus彻底沉浸在自己的拼好file的艺术里了，C有什么就用什么，想到什么就写什么。
tags:
- 实验
- Git仓库作为API端点
- Git
- Linux
---

Brendan Eich十天作成JavaScript的都市传说广为人知。

Linus Torvalds从开始编写Git到投入Linux项目使用也不过十来天。

这个世界的时间，只够编写难用的软件。

## 文件树对象

`git cat-file -p`中的p选项是pretty-print的意思；单纯print的命令需要指定对象类型，有`git cat-file commit`、`git cat-file blob`等。对于其他所有类型的对象，美不美观没什么区别。

```console
$ git cat-file -p 209ffbc
tree ad382a30f5f3f330b85f2e719f42e976f1779afc
parent f9e7acd46c5a03e19d8c23379f66bdd29d2448d7
author someone <someone@example.com> 2000000000 +0000
committer someone <someone@example.com> 2000000000 +0000

未来的提交
$ git cat-file commit 209ffbc
tree ad382a30f5f3f330b85f2e719f42e976f1779afc
parent f9e7acd46c5a03e19d8c23379f66bdd29d2448d7
author someone <someone@example.com> 2000000000 +0000
committer someone <someone@example.com> 2000000000 +0000

未来的提交
$ git cat-file -p 980a0d5
Hello World!
$ git cat-file blob 980a0d5
Hello World!
```

唯独文件树对象不同。这种情况下，`git cat-file -p`等价于`git ls-tree`。

```console
$ git cat-file -p ad382a3
100644 blob 980a0d5f19a64b4b30a87d4206aade58726b60e3	index.txt
$ git ls-tree ad382a3
100644 blob 980a0d5f19a64b4b30a87d4206aade58726b60e3	index.txt
$ git cat-file tree ad382a3 | xxd
00000000: 3130 3036 3434 2069 6e64 6578 2e74 7874  100644 index.txt
00000010: 0098 0a0d 5f19 a64b 4b30 a87d 4206 aade  ...._..KK0.}B...
00000020: 5872 6b60 e3                             Xrk`.
```

为什么其他对象都是纯文本，只有文件树对象是文本和二进制混合的格式？我没有找到说法。文件树作为Git最基本的元素之一，格式早在Git最初编写时就已定下，在Git源代码仓库中还能找到当时输出文件树对象的程序（[write-tree.c@`e83c516` main()](https://github.com/git/git/blob/e83c5163316f89bfbde7d9ab23ca2e25604af290/write-tree.c#L43-L55)），这套格式沿用至今。

```c
	for (i = 0; i < entries; i++) {
		struct cache_entry *ce = active_cache[i];
		if (check_valid_sha1(ce->sha1) < 0)
			exit(1);
		if (offset + ce->namelen + 60 > size) {
			size = alloc_nr(offset + ce->namelen + 60);
			buffer = realloc(buffer, size);
		}
		offset += sprintf(buffer + offset, "%o %s", ce->st_mode, ce->name);
		buffer[offset++] = 0;
		memcpy(buffer + offset, ce->sha1, 20);
		offset += 20;
	}
```

修改格式意味着重算全部散列，时至今日已无修改格式的可能。文本与二进制混合的文件与传输格式仅仅因为C处理方便的缘故深深根植于Git底层。即使协议升级，这一点也绝不会改变。

我只能认为，当时的Linus彻底沉浸在自己的拼好file的艺术里了，C有什么就用什么，想到什么就写什么。

还写了个O(<var>n</var><sup>2</sup>)的文件名排序（[update-cache.c@`e83c516` add_cache_entry()](https://github.com/git/git/blob/e83c5163316f89bfbde7d9ab23ca2e25604af290/update-cache.c)）。

```c
static int cache_name_pos(const char *name, int namelen)
{
	int first, last;

	first = 0;
	last = active_nr;
	while (last > first) {
		int next = (last + first) >> 1;
		struct cache_entry *ce = active_cache[next];
		int cmp = cache_name_compare(name, namelen, ce->name, ce->namelen);
		if (!cmp)
			return -next-1;
		if (cmp < 0) {
			last = next;
			continue;
		}
		first = next+1;
	}
	return first;
}

static int add_cache_entry(struct cache_entry *ce)
{
	int pos;

	pos = cache_name_pos(ce->name, ce->namelen);

	/* existing match? Just replace it */
	if (pos < 0) {
		active_cache[-pos-1] = ce;
		return 0;
	}

	/* Make sure the array is big enough .. */
	if (active_nr == active_alloc) {
		active_alloc = alloc_nr(active_alloc);
		active_cache = realloc(active_cache, active_alloc * sizeof(struct cache_entry *));
	}

	/* Add it in.. */
	active_nr++;
	if (active_nr > pos)
		memmove(active_cache + pos + 1, active_cache + pos, (active_nr - pos - 1) * sizeof(ce));
	active_cache[pos] = ce;
	return 0;
}
```

说到排序——文件树是无序集合，为了保证每次生成的对象散列一致，列表必须按文件名排序。

排序字符串是一件极其困难的事。此处排序的目的是加速机器查询，因此Git采用了memcmp比较文本。依UTF-8编码，这等价于按码点排序，但不等价于按UTF-16编码排序。在JavaScript中直接调用Array.prototype.sort排序会在文件名包含BMP外字符时得到错误的结果，目前只能通过专门编写一个按码点比较字符串的函数来解决。已经有[提案](https://tc39.es/proposal-compare-strings-by-codepoint/ "Compare Strings by Codepoint")希望JS内置这样的函数，不过该提案目前的状态如图所示：

<img src="proposal-title-goes-here.webp" width="500" height="115">

我通过奇怪的方法实现了按码点排序，在这个LLM时代写了一条[StackOverflow答案](https://stackoverflow.com/a/79723284 "How to sort strings in JavaScript by code point values?")。

火上浇油，雪上加霜，Git还有自己的怪癖。光靠观察很难发现的一个细节是，文件夹名隐含尾缀斜杠，同名文件和文件夹排列顺序不同。[这也是魔法芝士的一个侧面……](https://news.ycombinator.com/item?id=44589059 "🙀")

```console
$ git ls-tree 90d2c89
100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391	a.0
040000 tree 4b825dc642cb6eb9a060e54bf8d69288fbee4904	a
100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391	a0
$ git ls-tree 82bdf8c
100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391	a
100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391	a.0
100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391	a0
```

（2E `.`，2F `/`，30 `0`。`e69de29`和`4b825dc`是著名对象的散列。）

```ts
type TreeEntry = {
	mode: number,
	filename: string,
	hash: string,
}
const tree = (entries: TreeEntry[]): GitObject => {
	entries = entries.map(({ mode, filename, hash }) => ({
		hash,
		order: (filename + (((mode & 0o770000) === 0o040000) ? '/' : '')).replace(/[\0-\uffff]/gu, ' $&'),
		toString: () => `${mode.toString(8)} ${filename}\0${'?'.repeat(hash.length >>> 1)}`,
	})).sort((a, b) => a.order > b.order ? 1 : a.order < b.order ? -1 : 0)
	const bytes = new TextEncoder().encode(entries.join(''))
	let i = 0
	for (const { hash } of entries) {
		bytes.subarray(i = bytes.indexOf(0, i) + 1, i += hash.length >>> 1).setFromHex(hash)
	}
	return { type: 'tree', data: bytes }
}
const t = tree([
	{ mode: 0o100644, hash: 'e69de29bb2d1d6434b8b29ae775ad8c2e48c5391', filename: '😾.😾' },
	{ mode: 0o040000, hash: '4b825dc642cb6eb9a060e54bf8d69288fbee4904', filename: '😾' },
])
```

算上前几回写的代码，至此，提交、文件树、文件内容对象都可以生成、散列、上传了。这个Git客户端已经拥有了创建任意内容的提交并推送到远端的能力。

可它易碎得令人不敢触碰。诚然，Git软件表现出很强的向前兼容性，却不能消解我的担忧。原作能用就行的开发态度，缺乏规范和替代实现，注定了覆水难收的抽象泄露，互操作性的覆灭。

## 没了Linux地球就不转了

Git最初的目的只有一个：管理Linux的源代码，故一切设计皆以Linux为中心。

Linux的文件系统很简单：文件名无关文本编码，允许除了NUL和/以外的任何字符，区分大小写，类型加权限只用一个数字就能表示。

其他哪个操作系统都见不到这些特性。默认了系统优秀性质的程序，到了其他系统上必然漏洞频出，Git也不例外。

十天糊的不可移植文物，要花十年弥补跨平台支持。适用于Linux的Git于2005年启用；可直到2015年，Git for Windows才发布[首个版本2.5.0](https://github.com/git-for-windows/git/releases/tag/v2.5.0.windows.1)。如今，又是十年过去，[Git迎来了二十周年](https://github.blog/open-source/git/git-turns-20-a-qa-with-linus-torvalds/ "Git turns 20: A Q&A with Linus Torvalds")。直到现在，许多根本设计上不兼容带来的问题仍困扰着Windows用户。为什么100644变成了100755？为什么CRLF进库了？为什么读写数据库很慢？在Windows彻底被Linux同化之前，这些问题将永远相随。

这是一个只存在十天的世界。

<pre>（本系列完结）</pre>
