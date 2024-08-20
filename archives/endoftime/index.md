---
title: 时间的尽头 解谜报告
date: 2024-07-31
dates: 2024-07-31 ~
tags:
- puzzle hunt
---

<div class="admonition">
本文介绍的谜题中有至少一项尚未完全解开。
</div>

## 我望向时间的尽头，那是时间的开始。

2024年6月28日投稿的[Puzzle and Key Universe 3](https://pnku3.pkupuzzle.art/)（上）主题曲[《梦境永居宣言》PV](https://www.bilibili.com/video/av1505873069)的简介中有一句夹杂着乱码的文字：

> 我望l5VKJ向p时nEq间的6尽sx3头，那P4是k[y[O,_时间的Y1T$开始。/[8我8j望向

将其中的中文和非中文分离，中文为“我望向时间的尽头，那是时间的开始。我望向”，剩余文字为“`l5VKJpnEq6sx3P4k[y[O,_Y1T$/[88j`”。虽然一眼就能看出这串字符有藏东西，但是把CyberChef支持的Base系列解码流程全试一遍也没有结果。

6月29日凌晨，Bella解开了这段编码文本中的谜题，发在了CCBC群。

> <div>PV简介中的谜题：我望l5VKJ向p时nEq间的6尽sx3头，那P4是k[y[O,_时间的Y1T$开始。/[8我8j望向<br>
> 删除汉字，得到 l5VKJpnEq6sx3P4k[y[O,_Y1T$/[88j<br>
> 用base91解码，得到 http://？？？/endoftime<br>
> 访问 <a href="https://pkupuzzle.art/endoftime/">https://pkupuzzle.art/endoftime/</a> 是一个伪装的错误页面（这年头了还有人用IE吗）<br>
> 页面最下方可以找到反白的文字：时间还未开始，请等待。</div>

6月30日凌晨，“endoftime”也出现在了PV评论区。感谢[@甘露果糖](https://space.bilibili.com/13607427)，如果评论区里没有人指出Base91，我可能还卡在这步。

> <div>http://？？？/endoftime<br>
> 怎么是base91，这下ctf化不可避（</div>

[Base91](https://sourceforge.net/projects/base91/)是Joachim Henke于2005年首次公开的二进制数据到纯文本的编码工具，表面没有明显特征，无法与其他纯文本数据编码格式区分，又非常小众，可以说除了出题以外没什么使用场景。原作者没有提供JavaScript版编解码函数，都找不到几个在线解码工具。

这时距离P&KU3（上）开赛还有不到三周。既然这是P&KU3（上）主题曲中的谜题，加上神秘消失的常见问题“本次活动会涉及黑客技术吗？”，我一度以为P&KU3（上）中会有与主线并行的“时间的尽头”隐藏谜题从endoftime页面开始。

7月19日，P&KU3（上）开赛后，endoftime页面也没有任何变化。这么一来，“时间的尽头”大概是比赛结束的时候了，并且稍稍安心，可以专心做题了。

## endoftime（初见）

7月28日，我所在的队伍不负众望地在靠足以买完第三日全部meta的注意力买了卡在瞪汉字规律的任造化落骰-C后在比赛进程最后一天完赛。到此为止，P&KU3（上）主线流程中没有任何一处提到endoftime。

随着比赛进程的结束，endoftime页面也悄然发生了变化。

<figure>
	<figure>
		<img src="ie0.jpg" width="320">
		<figcaption>endoftime的最初样貌</figcaption>
	</figure>
	<figure>
		<img src="ie1.png" width="320">
		<figcaption>P&amp;KU3（上）比赛结束后</figcaption>
	</figure>
</figure>

正面解出时空花园培养了全角英文的敏感度，错误页面成了汉字矩阵。字阵里面肯定藏了东西，但暂时还找不到密钥。除了废话增加了以外，还新增了文本“为什么抱有如此希望？为何这般清澈、透明、乐观豁达？”“其中可能没有你的名字”，页面底部的白色文字也改变了，宣告谜题正式开始。

> <div>时间正在流逝。<br>
> 在各处不同的宇宙和时间线，与你再见。</div>

P&KU公告中将比赛规则调整称为“宇宙变动”，宇宙指观测者所处的时空；第二天的主题是时间，第三天引入了平行时空。但是，第三天的多种可能性被称为“世界线”而非“时间线”。或许它所说的不同的宇宙是别的网站，不然为何要用问号代替网址域名部分？可我尝试了P&KU网站的各子域名、MaxXSoft的网站（包括《赛博电子艺术家》所在的只能通过HTTP访问的lab.maxxsoft.net）、CCBC网站及其子域名、喵喵喵解谜、喵谜、X和GitHub皆无果，倒是阅遍了404的荧煌。如若这段页脚文本指向P&KU宇宙，又要如何穿越往“不同的宇宙和时间线”呢？

## 成就：这是题吗？

紧接着，P&KU3（上）结束后即开始的after party中，一张不自然的幻灯片一出现，弹幕便纷纷表示：这是题吗？

![](pnku3-afterparty.webp)

第二天中午，after party直播回放由[@肥咪矩阵]()发布后，@MaxXSoft也发布了一条[动态](https://www.bilibili.com/opus/959449931082366978)，其中链接直指after party中出现该幻灯片的那段。

> <div>P&KU3（上）完结撒花！<br>
> 我们 P&KU3（中）再见！<br>
> Afterparty 录像：​bilibili.com/video/BV1GE421w7PV/?t=2340</div>

根据黑块的长度和间距可判断这是条形码。用[ZXing解码](https://zxing.org/w/decode.jspx)得“bitly/4c1VCIL”，指向<https://bit.ly/4c1VCIL>。该条码所用的Code 128格式明明支持编码所有ASCII字符，省略域名中的点的原因不明。

该短网址指向<https://pastebin.com/MFUexT7h>，一个匿名用户于7月28日13:12:45上传的ASCII文本文件。该文件的特征为除最后一行外每行都有61个字符，以“M”开头；只有大写字母，没有小写字母；文件开头有密集的空格，但无法象形出图案或文字。通过字节值直方图可观测到所有正文皆在0x20～0x5F范围，空格和“M”数量最多，其他字节分布平均。这应又是某种二进制到纯文本的编码方式，有特征，但我不认识。搜索“M开头的编码”等无果，但搜索“0x20 0x5F编码”居然到达了[uuencode手册页](https://pubs.opengroup.org/onlinepubs/9799919799/utilities/uuencode.html)，由此判明了编码方式。

CyberChef是真没用吧，Base91也没有，uuencode也没有。手动给文件开头加上`begin 644 -`，结尾加上`` ` ``、换行、`end`，然后喂给uudecode，得到了一张HEIC格式的图片。

[![](MFUexT7h.png)](MFUexT7h.heic)

我无头豪猪。

## endoftime（CCBC宇宙）

每隔一段时间就有人提起endoftime，没有人知道它意味着什么。7月29日下午，在一波新的讨论中，Николай,III表示P&KU工作人员也不知道endoftime页面是用来干什么的，可以公开讨论该页面，但不能讨论其他东西。“P&KU3（上）已结束，可以讨论全部内容，但不能讨论全部内容。”于是我把我所知的谜题进度整理到共享表格中，众筹解开endoftime的谜团。几名玩家聚集在了表格里，加了一些猜想，一起一筹莫展。

谜题跨站以BlueCoin的一句“啊？”为嚆矢。7月31日下午，BlueCoin首先发现了满是乱码的<https://cipherpuzzles.com/endoftime/>，旋即被填入表格。冰枫凌很快通过[乱码恢复工具](http://www.mytju.com/classcode/tools/messycoderecover.asp)GBK转UTF-8复原了编码错误的文字。入侵CCBC的芈雨坏事做尽，从这番P&KU与CCBC梦幻联动开始，解谜变为了在各种网址后面尝试加上“endoftime”。但又尝试了喵谜和江湖解谜的网站，仍无果。

![](ie2.png)

<figure>
	<blockquote>
		我，降临。<br>
		无需顾虑，请将我的存在，公之于众。<br>
		你也会将我铭记于心，对吗？
	</blockquote>
	<figcaption>♪ 我 于此降临 纵目观测 晦暗不明的书信</figcaption>
</figure>

通过下载工具直接下载页面，可发现页面源代码以UTF-8编码，但`<meta HTTP-EQUIV="Content-Type" Content="text-html; charset=gb2312">`却指定了字符集为GB2312。冰枫凌认为乱码可能是个意外。

除了meta指定的编码不同，CCBC版的页面还少了字阵中的三个字，以及底部可刮开的文本被替换了。

除了顶级域名，<https://ccbc15.cipherpuzzles.com/endoftime/>也返回同一页面，而存档站/endoftime返回404。可CCBC 15的观莲游戏的主题与endoftime页面的文字格格不入，与P&KU3（上）间可能仅存在时间相邻的关系。

CCBC 15开赛后，终于得知endoftime出现在CCBC网站的原因：观莲游戏与折纸幼儿园只是幌子，真正主题又是时空错乱。诶，我为什么要说又？一道名为[《囚于？？？的七日谈》](https://archive.cipherpuzzles.com/index.html#/problem?c=ccbc15/problems/6/57)（其中？？？ = 麦当劳）的题目虽然标题、题图、答案无所不neta P&KU3，但是题目本身跟P&KU3毫无关系。提交此题的中间答案之一“时间的尽头”后会得到：

> 你解出了一张奖券，并额外发现了一段来自另一个宇宙的消息！它对你解题没有影响：
>
> > 时间正在流逝。在各处不同的宇宙和时间线，与你再见。
> >
> > 请将？？？替换为ccbc15.cipherpuzzles.com

想不到吧，开赛前一周就有人把这个页面挖出来了。

<figure>
	<img src="9.png">
	<figcaption>观测者猫猫与金毛猫猫</figcaption>
</figure>
