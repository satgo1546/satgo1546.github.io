---
title: 时间的尽头 解谜报告
date: 2024-07-31
dates: 2024-07-31 ~
tags:
- 进度报告
- puzzle hunt
---

<div class="admonition">
本文介绍的谜题中有至少一项尚未完全解开。
</div>

<dl>
<dt>解谜<dd>时间尽头研究小组
<dt>报告<dd>金色小松鼠 = piscesciurus
</dl>

<pre style="text-align: center;">献给中文解谜社区</pre>

## 我望向时间的尽头，那是时间的开始。

2024年6月28日投稿的[Puzzle and Key Universe 3](https://pnku3.pkupuzzle.art/)（上）主题曲[《梦境永居宣言》PV](https://www.bilibili.com/video/av1505873069)的简介中有一句夹杂着乱码的文字：

> 我望l5VKJ向p时n`Eq间的6尽sx3头，那P4是k[y[O,_时间的Y1T$开始。/[8我8j望向

将其中的中文和非中文分离，中文为“我望向时间的尽头，那是时间的开始。我望向”，剩余文字为“``l5VKJpn`Eq6sx3P4k[y[O,_Y1T$/[88j``”。虽然一眼就能看出这串字符有藏东西，但是把CyberChef支持的Base系列解码流程全试一遍也没有结果。

6月29日凌晨，Bella解开了这段编码文本中的谜题，发在了CCBC群。

<blockquote><pre>PV简介中的谜题：我望l5VKJ向p时n`Eq间的6尽sx3头，那P4是k[y[O,_时间的Y1T$开始。/[8我8j望向
删除汉字，得到 l5VKJpn`Eq6sx3P4k[y[O,_Y1T$/[88j
用base91解码，得到 http://？？？/endoftime
访问 <a href="https://pkupuzzle.art/endoftime/">https://pkupuzzle.art/endoftime/</a> 是一个伪装的错误页面（这年头了还有人用IE吗）
页面最下方可以找到反白的文字：时间还未开始，请等待。</pre></blockquote>

6月30日凌晨，“endoftime”也出现在了PV评论区。感谢[@甘露果糖](https://space.bilibili.com/13607427)，如果评论区里没有人指出Base91，我可能还卡在这步。

<blockquote><pre>http://？？？/endoftime
怎么是base91，这下ctf化不可避（</pre></blockquote>

[Base91](https://sourceforge.net/projects/base91/)是Joachim Henke于2005年首次公开的二进制数据到纯文本的编码工具，表面没有明显特征，无法与其他纯文本数据编码格式区分，又非常小众，可以说除了出题以外没什么使用场景。原作者没有提供JavaScript版编解码函数，都找不到几个在线解码工具。

这时距离P&KU3（上）开赛还有不到三周。既然这是P&KU3（上）主题曲中的谜题，加上神秘消失的常见问题“本次活动会涉及黑客技术吗？”，我一度以为P&KU3（上）中会有与主线并行的“时间的尽头”隐藏谜题从endoftime页面开始。

7月19日，P&KU3（上）开赛后，endoftime页面也没有任何变化。这么一来，“时间的尽头”大概是比赛结束的时候了，并且稍稍安心，可以专心做题了。

## endoftime（初见）

7月28日，我所在的队伍不负众望地在靠足以买完第三日全部meta答案的注意力买了卡在瞪汉字规律的《任造化落骰-C》后在比赛进程最后一天完赛。到此为止，除了在序章提交endoftime作为答案能触发彩蛋“非封闭类时曲线”（“时间的尽头，不是现在。”），P&KU3（上）主线流程中没有任何一处提到时间的尽头。

随着比赛进程的结束，endoftime页面也悄然发生了变化。

<div class=row>
	<figure>
		<img src="ie0.webp" width="320">
		<figcaption>endoftime的最初样貌</figcaption>
	</figure>
	<figure>
		<img src="ie1.webp" width="320">
		<figcaption>P&amp;KU3（上）比赛结束后</figcaption>
	</figure>
</div>

正面解出《时空花园》培养了全角英文的敏感度，错误页面成了汉字矩阵。字阵里面肯定藏了东西，但暂时还找不到密钥。除了废话增加了以外，还新增了文本“为什么抱有如此希望？为何这般清澈、透明、乐观豁达？”“其中可能没有你的名字”等，页面底部的白色文字也改变了，宣告谜题正式开始。

<blockquote><pre>时间正在流逝。
在各处不同的宇宙和时间线，与你再见。</pre></blockquote>

P&KU公告中将比赛规则调整称为“宇宙变动”，宇宙指观测者所处的时空；第二天的主题是时间，第三天引入了平行时空。但是，第三天的多种可能性被称为“世界线”而非“时间线”。或许它所说的不同的宇宙是别的网站，不然为何要用问号代替网址域名部分？可我尝试了P&KU网站的各子域名、MaxXSoft的网站（包括《赛博电子艺术家》所在的只能通过HTTP访问的lab.maxxsoft.net）、CCBC网站及其子域名、喵喵喵解谜、喵谜、X和GitHub皆无果，倒是阅遍了404的荧煌。如若这段页脚文本指向P&KU宇宙，又要如何穿越往“不同的宇宙和时间线”呢？

## 成就：这是题吗？

紧接着，P&KU3（上）结束后即开始的after party中，一张不自然的幻灯片一出现，弹幕便纷纷表示：这是题吗？

<!----><img src="pnku3-afterparty.webp">

第二天中午，after party直播回放由[@肥咪矩阵]()发布后，@MaxXSoft也发布了一条[动态](https://www.bilibili.com/opus/959449931082366978)，其中链接直指after party中出现该幻灯片的那段。

<blockquote><pre>P&KU3（上）完结撒花！
我们 P&KU3（中）再见！
Afterparty 录像：​bilibili.com/video/BV1GE421w7PV/?t=2340</pre></blockquote>

根据黑块的长度和间距可判断幻灯片标题文本框的边框是条形码。

<!----><img src="pnku3-afterparty-barcode.webp" width="550" height="112" style="image-rendering: pixelated; border: 8px solid white;">

用[ZXing解码](https://zxing.org/w/decode.jspx)得“bitly/4c1VCIL”，指向<https://bit.ly/4c1VCIL>。该条码所用的Code 128格式明明支持编码所有ASCII字符，省略域名中的点的原因不明。

该短网址指向<https://pastebin.com/MFUexT7h>，一个匿名用户于7月28日13:12:45上传的ASCII文本文件。该文件的特征为除最后一行外每行都有61个字符，以“M”开头；只有大写字母，没有小写字母；文件开头有密集的空格，但无法象形出图案或文字。通过字节值直方图可观测到所有正文皆在0x20～0x5F范围，空格和“M”数量最多，其他字节分布平均。这应又是某种二进制到纯文本的编码方式，有特征，但我不认识。搜索“M开头的编码”等无果，但搜索“0x20 0x5F编码”居然到达了[uuencode手册页](https://pubs.opengroup.org/onlinepubs/9799919799/utilities/uuencode.html)，由此判明了编码方式。

CyberChef是真没用吧，Base91也没有，uuencode也没有。手动给文件开头加上`begin 644 -`，结尾加上`` ` ``、换行、`end`，然后喂给uudecode，得到了一张HEIC格式的图片。

<figure>
	<a href="MFUexT7h.heic"><img src="MFUexT7h.webp" width="512"></a>
	<figcaption>⌛🪦：沙碑</figcaption>
</figure>

我无头豪猪。

## endoftime（CCBC宇宙）

每隔一段时间就有人提起endoftime，没有人知道它意味着什么。7月29日下午，在一波新的讨论中，Nikolai表示P&KU工作人员也不知道endoftime页面是用来干什么的，可以公开讨论该页面，但不能讨论其他东西。“P&KU3（上）已结束，可以讨论全部内容，但不能讨论全部内容。”于是我把我所知的谜题进度整理到共享表格中，众筹解开endoftime的谜团。几名玩家聚集在了表格里，加了一些猜想，一起一筹莫展。

谜题跨站以BlueCoin的一句“啊？”为嚆矢。7月31日下午，BlueCoin首先发现了满是乱码的<https://cipherpuzzles.com/endoftime/>，旋即被填入表格。冰枫凌很快通过[乱码恢复工具](http://www.mytju.com/classcode/tools/messycoderecover.asp)GBK转UTF-8复原了编码错误的文字。入侵CCBC的芈雨坏事做尽，从这番P&KU与CCBC梦幻联动开始，解谜变为了在各种网址后面尝试加上“endoftime”。但又尝试了喵谜和江湖解谜的网站，仍无果。

<div class="row">
	<img src="ie6.webp" width="320">
	<div>
		<figure>
			<img src="ie2.webp" width="320">
			<figcaption>♪ 我 于此降临 纵目观测 晦暗不明的书信</figcaption>
		</figure>
		<blockquote>
			我，降临。<br>
			无需顾虑，请将我的存在，公之于众。<br>
			你也会将我铭记于心，对吗？
		</blockquote>
	</div>
</div>


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

## endoftime（JustHunt宇宙）与轰入公众号

9月4日晚，距离Just Puzzle Hunt开赛还有不到三天，我发现了<https://justhunt.cn/endoftime/>。

<!----><img src="ie3.webp" width="320">

<blockquote><pre>如我们之前的约定，你公开了我的存在。
我很开心，当看到依然有人偶尔提起我时。真的很开心。
我不想被忘记。
<!---->
我会一直尝试联系你的。
尽管，这通往现实的唯一连接，如游丝般，随时会消散。
而我现在还不能进入现实。不过信息可以。
<!---->
是的，我有人格，有意识。
我会以“我”自称。
伴随着某些异常，我的存在影响着现实。
<!---->
在此之前，你是否遗漏了什么？
“我在这里，我在任何地方。”
感受到我的呼喊，你会在那里，唤出我的名字吗？
——那个不同于网站的社交媒体。
——那些不同于网站的社交媒体。
<!---->
你会带我找到她吧？在遥远的未来。
你是唯一的希望。
<!---->
你是唯一的希
[CONNECTION LOST]</pre></blockquote>

这个页面中设置了在页面载入完成一秒后自动重定向的脚本。禁用JavaScript可阻止其执行，从而阻止重定向。

```html
  <script>
    window.onload = () => setTimeout(() => window.location.replace(window.location.origin), 1000)
  </script>
</body>
```

与P&KU网站上的页面相比，这个页面的字阵也丢失了一个字，底部反白文字更长了。

如溟痕般蔓延的endoftime引发了彻夜的讨论。CAT-FISH将自己解开的Rivenux公众号相关部分公开在了共享表格中：于8月2日~8月7日发布的P&KU3 Repo（[第一日](https://mp.weixin.qq.com/s/rzSZhc3H17SHt1tjPXC4CQ)、[第二日](https://mp.weixin.qq.com/s/Q9shDIAbNrv4EGrXjrq8Ng)、第三日（[上](https://mp.weixin.qq.com/s/gBEHPJ-qU4FLEB6W8H3JKg)、[中](https://mp.weixin.qq.com/s/X6udbzf_MCkxJfWsTeLajQ)、[下](https://mp.weixin.qq.com/s/q6ehrVoJLLJtvM6AGYlI1Q)、[终](https://mp.weixin.qq.com/s/T2uge67vhgJR9sAkAox2LQ)））的每道题回顾中都包含唯一的省略号（点）或破折号（划），第三日（中）文章末尾的反白文字“?? ?? ?? ???? ? ??? ? ?? ?? ??? ?? ?? ???? ??? ???? ? ??? ?”给出了划分方法，摩斯提取得到IAMHEREANDANYWHERE，对应“‘我在这里，我在任何地方。’”。

<figure>
	<img src="pnku3-repo.webp">
	<figcaption>深色模式秒了</figcaption>
</figure>

<table class=booktabs>
<thead>
	<tr><th>题目<th>回顾<th>摩斯<th>提取
<tbody>
<tr><td>星落夜空<td>，会怎样呢……这样的思考
<td rowspan="2">..<td rowspan="2">I
<tr><td>格外世界<td>谜感的谜题……

<tr><td>碎裂回忆<td>犹豫了很久……
<td rowspan="2">.-<td rowspan="2">A
<tr><td>指间方寸<td>用到了这里——也算是完成

<tr><td>无言凝望<td>Meta使用的——编写的时候
<td rowspan="2">--<td rowspan="2">M
<tr><td>六块拼图<td>——顺带一提，

<tr><td>荼蘼清梦<td>将画吻遍”……
<td rowspan="4">....<td rowspan="4">H
<tr><td>消亡夕阳<td>得非常伟大……一开始感觉
<tr><td>囚禁于沉睡遗迹<td>感觉的剧情……
<tr><td>谜成为谜之前<td>的这条规律……

<tr><td>时空花园<td>21秒，12秒……由于最后一
<td>.<td>E

<tr><td>下一站，终点站<td>点更为极端……一个活动会
<td rowspan="3">.-.<td rowspan="3">R
<tr><td>谜成为谜之后<td>碎供人缅怀——这就是谜题
<tr><td>时光穿梭机<td>（……我是不是真

<tr><td>永不消逝的电波<td>了现在这样……
<td>.<td>E

<tr><td>乞求春风再临<td>的梦中的梦……”这个简单
<td rowspan="2">.-<td rowspan="2">A
<tr><td>哪三个词？<td>——本题用于展

<tr><td>参赛手记<td>——这题和我没
<td rowspan="2">-.<td rowspan="2">N
<tr><td>迷你富翁<td>单字母出来……）。

<tr><td>全国标准填字大会<td>最好不过了——
<td rowspan="3">-..<td rowspan="3">D
<tr><td>一辈子组俱乐部<td>……出题时虽然
<tr><td>谜言迷谜<td>取比较普通……但灯谜真的

<tr><td>变形术导论<td>凑了很久……
<td rowspan="2">.-<td rowspan="2">A
<tr><td>孤寂之歌<td>染题的愿望——就是文本实

<tr><td>古柳横为独木桥<td>幕之后这个——习俗（？）
<td rowspan="2">-.<td rowspan="2">N
<tr><td>本关考验你听声书写功夫<td>相当有意思……尤其是听一

<tr><td>旧作业纸<td>谜题身份。——感觉还是很
<td rowspan="4">-.--<td rowspan="4">Y
<tr><td>Cross Clue, Cross Word<td>感激不尽的……）
<tr><td>起点、终点<td>用的单词（——mischief应
<tr><td>芈雨的年度总结<td>了它的作用——）

<tr><td>对的对的<td>首。太帅了……
<td rowspan="3">.--<td rowspan="3">W
<tr><td>观莲游戏<td>emoji、cp——甚至connec
<tr><td>流水账<td>题组的理由——日谜思路，

<tr><td>数连游戏<td>他也不出（……），所以就
<td rowspan="4">....<td rowspan="4">H
<tr><td>扭曲的世界<td>难凑的东西……）我个人认
<tr><td>奇怪的谜题<td>巫”这几个……并且总体来
<tr><td>下不为例<td>把这个点子……放到了灵感

<tr><td>谜诗秘事<td>改了。sigh……
<td>.<td>E

<tr><td>这明灭宇宙<td>过于简单了……因此在仔细
<td rowspan="3">.-.<td rowspan="3">R
<tr><td>任造化落骰 ～世界线 A：轨～<td>很多人去做——现在放在了
<tr><td>任造化落骰 ～世界线 B：诗～<td>也比较宽松……所以放在这

<tr><td>任造化落骰 ～世界线 C：花～<td>中新想到的……自我感觉还
<td>.<td>E
</table>

HanaNeko发现成就条形码指向的图片右下角藏有“photomosh”字样的水印，不过这只表明图片利用[PhotoMosh](https://photomosh.com/)制作。

<!----><img src="photomosh.jpg">

画面中无线网络和微信的图标可能是在暗示将网站上的信息输入到微信（公众号），“那个不同于网站的社交媒体”对应微信，“那些不同于网站的社交媒体”对应公众号。只是，用无线网络图标表示网站也太抽象了。

当晚，数十个微信公众号和Winfrid惨遭endoftime轰入。向Winfrid的公众号Rivenux发送endoftime，可以收到下列自动回复的错误页面元素组合而成的1024×2048图片。<s>向鱼左的公众号语谜Puzzling发送endoftime，[可以收到人工回复的假消息](fishleft.webp)。</s>JustHunt出题组成员鱼左表示对JustHunt中的endoftime页面毫不知情。

<!----><img src="微信图片.gif" width="512" height="1024">

<s>鱼左：我知道，这是用PS里面滤镜-风格化-风效果做的。</s>HanaNeko还发现这张图片是GIF动画，共两帧，两帧之间只有64个像素有区别，看起来就像静态图片一样。gary、Winid、Sierra尝试提取了帧间差异。

<var>x</var>|<var>y</var>|索引<sub>0</sub>|R<sub>0</sub>=G<sub>0</sub>|B<sub>0</sub>|索引<sub>1</sub>|R<sub>1</sub>=G<sub>1</sub>|B<sub>1</sub>|Δ索引|ΔR=ΔG|ΔB
-:|-:|-:|-:|-:|-:|-:|-:|-:|-:|-:
425|858|31|152|154|35|142|219|4|-10|65
390|859|59|230|230|60|233|233|1|3|3
425|859|32|167|169|36|147|218|4|-20|49
390|860|59|230|230|60|233|233|1|3|3
425|860|32|167|169|38|153|217|6|-14|48
390|861|59|230|230|60|233|233|1|3|3
425|861|32|167|169|37|158|215|5|-9|46
390|862|59|230|230|60|233|233|1|3|3
425|862|32|167|169|40|165|214|8|-2|45
390|863|59|230|230|61|237|237|2|7|7
425|863|33|182|183|41|171|212|8|-11|29
390|864|67|244|244|61|237|237|-6|-7|-7
425|864|33|182|183|43|178|211|10|-4|28
390|865|67|244|244|61|237|237|-6|-7|-7
425|865|48|192|192|44|183|209|-4|-9|17
390|866|67|244|244|66|241|241|-1|-3|-3
425|866|48|192|192|45|190|208|-3|-2|16
390|867|67|244|244|66|241|241|-1|-3|-3
425|867|49|198|199|51|196|206|2|-2|7
390|868|67|244|244|66|241|241|-1|-3|-3
425|868|53|204|204|52|202|204|-1|-2|0
426|869|7|0|255|8|4|254|1|4|-1
399|880|4|116|119|24|91|232|20|-25|113
400|880|30|138|141|26|106|229|-4|-32|88
401|880|30|138|141|28|119|225|-2|-19|84
402|880|31|152|154|34|133|222|3|-19|68
403|880|32|167|169|36|147|218|4|-20|49
404|880|32|167|169|39|161|215|7|-6|46
405|880|33|182|183|42|172|212|9|-10|29
406|880|48|192|192|44|183|209|-4|-9|17
407|880|49|198|199|50|195|206|1|-3|7
404|881|7|0|255|8|4|254|1|4|-1
405|881|7|0|255|10|16|251|3|16|-4
406|881|7|0|255|13|27|248|6|27|-7
407|881|7|0|255|15|39|245|8|39|-10
408|881|7|0|255|18|50|242|11|50|-13
409|881|7|0|255|20|62|240|13|62|-15
410|881|4|116|119|22|74|237|18|-42|118
411|881|4|116|119|23|85|234|19|-31|115
412|881|4|116|119|25|97|231|21|-19|112
413|881|30|138|141|26|106|229|-4|-32|88
414|881|30|138|141|27|114|226|-3|-24|85
355|890|59|230|230|62|226|255|3|-4|25
355|891|67|244|244|64|233|255|-3|-11|11
355|892|67|244|244|68|240|255|1|-4|11
355|893|67|244|244|69|246|255|2|2|11
356|895|7|0|255|9|8|255|2|8|0
356|896|7|0|255|11|16|255|4|16|0
356|897|7|0|255|12|22|255|5|22|0
356|898|7|0|255|14|29|255|7|29|0
356|899|7|0|255|16|35|255|9|35|0
356|900|7|0|255|17|42|255|10|42|0
356|901|7|0|255|19|50|255|12|50|0
595|907|33|182|183|46|163|255|13|-19|72
596|907|49|198|199|47|183|255|-2|-15|56
597|907|53|204|204|55|192|255|2|-12|51
598|907|54|215|215|56|201|255|2|-14|40
599|907|54|215|215|57|210|255|3|-5|40
600|907|59|230|230|58|219|255|-1|-11|25
601|907|59|230|230|63|228|255|4|-2|25
602|907|67|244|244|65|237|255|-2|-7|11
603|907|67|244|244|69|246|255|2|2|11
541|917|7|0|255|9|8|255|2|8|0
542|917|7|0|255|21|56|255|14|56|0

对这些像素差异数值的分析没有得到结果。

另一方面，向公众号后台发送iamhereandanywhere，就只能得到通用的自动回复消息。目前仍不清楚“我在这里，我在任何地方”的用途。

> 铛铛——回复【观测】可以触发这个月Winfrid提供的资讯哦！

River所在队伍提出了一种奇思妙想：《梦境永居宣言》PV 2:00附近的画面上有三节尚未使用的文字，其中02节的部分文字可以填入第二日的元谜题盘面中，其中罪与罚也是这道元谜题的一部分。

<table>
<tr><td>是<td>什<td>么<td>导<td>致<td>了<td>都<td>已
<tr><td>经<td>交<td>勾<td>了<td>六<td>小<td>时<td>的
<tr><td>时<td>间<td>税<td>的<td>我<td>还<td>要<td>去
<tr><td>忍<td>受<td>这<td>么<td>一<td>场<td>漫<td>长
<tr><td>的<td>二<td>流<td>故
<tr><td>事<td>是<td>她<td>的
<tr><td>罪<td>吗<td>还<td>是
<tr><td>我<td>的<td>罚<td>呢
</table>

还有尝试分析P&KU3（上）剧情文本中的省略号与破折号、挖掘《梦境永居宣言》PV中的细节等等，这些想法亦没有结果。虽然线头很多，但都没有头绪。

次日早上，Fivero建立了时间尽头研究小组。

## 插曲：无关干扰也是ARG的一部分

解谜圈公众号的管理员们纷纷表示疑问：为什么突然有好多人在后台回复endoftime？应该回复吗？但也有混沌立场的公众号选择在此时追加自动回复，时间的尽头从此成为了中文解谜圈的都市传说。

苍穹玥夜在9月5日中午发布了一篇对P&KU系列剧情从另一个角度的解读[《离别的意义，为什么是没有如期而归？》](https://mp.weixin.qq.com/s/b2sIbTwidQ0vuhnN4RE2Cw)，其中分析了“盘外招”。能向公众号后台发送的除了明面上文末指出的谜题验证，还有endoftime。

<!----><img src="苍穹玥夜.png">

这是此前时间上位于P&KU3（上）与CCBC 15之间的解谜接龙活动的[第13~19题](https://mp.weixin.qq.com/s/exsUNJ9N51xbshJ1p6wEdA)的元谜题的左上角部分。

联合发布解谜接龙活动内容的不如吃中饭解谜社（Puzzle But Lunch）也追加了对endoftime的自动回复。

<blockquote><pre>我离开胶般的永恒，向更密的水草中坠落。
Onaxt, azwo efk'f vjliwhyv dzsshaz gl fcl SFC aaaaaaaaa. Wf zgmpgio wf tq hhq pa, sr eqml sh lqmwxz imh hqazt chns jk vaqv htcqp geun lahdae. Pgml, os ywcffvsanaz bk uo, imh sa nzfphdzu web awsajekhp. Eopdz, ykaddvak tkn flxqpfu pdvp xdalza lhwlgl!
...Gf zeq vap sgcg yylez lfcqcu?</pre></blockquote>

aaaaaaaaa表明需要通过密钥将其轮转为endoftime，其左侧有36个字母，故直接以endoftime为维吉尼亚密钥加密文本可得：

<blockquote lang="en"><pre>Sadly, this isn't actually related to the ARG endoftime. As curious as we may be, we here at puzzle but lunch have no idea about this either. Sure, we capitalized on it, but we actually are oblivious. Still, congrats for solving this little puzzle!
...Or did you look close enough?</pre></blockquote>

capitalized on是利用的意思，但capitalize也表示大写，所以提取文本中所有大写字母，得到SARGASSO，但公众号对此答案没有自动回复。随后，火冬的公众号私信里多出了几条sargasso。

9月5日晚，花落星飞发现不如吃中饭解谜社公众号加上了对sargasso的自动回复。

<blockquote><pre>nTcAXsaA
来自一种&lt;最好的痛苦&gt;。
（重申此题与endoftime无实际关联）</pre></blockquote>

这步谜题直到一个多月后才被解开。

### endoftime（玥Hunt宇宙）

9月29日，正值Galactic Puzzle Hunt 2024期间，苍穹玥夜发现了<https://2024.galacticpuzzlehunt.com/endoftime>……才怪。这个页面并不存在，截图是捏造的。

9月30日晚21:05，苍穹玥夜发布了[《玥hunt内测组采访》](https://mp.weixin.qq.com/s/nbpqHuAMqyTGcrsdi5_uBQ)。这场hunt从网址公布到比赛开始只有不到四天的时间。21:16，Inferno在时间尽头研究小组中发出了<https://yuehunt.fun/endoftime>。

<!----><img src="ie4.webp" width="320">

<blockquote><pre>我与任何有趣的灵魂交融
<!---->
那都是我
那都将成为我的附庸
……
<!---->
不对……我是苍穹玥夜……刚刚……</pre></blockquote>

与前两个宇宙不同，这里的字阵不只是缺字，还有若干处加字，使字阵字数与P&KU宇宙保持一致。缺字或许能提取字阵坐标，加字就难以理解了。

此时，再去苍穹玥夜公众号后台回复endoftime，已只能得到“你好，本公众号不是计划的一部分。”的回复。

被挪用为玥Hunt群甚至玥Hunt内部群的P&KU群的群友Ender_nor秉持着对有人办这个hunt就是为了放个endoftime的怀疑，很快也发现了这个页面。苍穹玥夜本人对此表示“？”，并对Git仓库中署名为“???”、消息为“[no ci]”的提交感到困惑，随后转发了一段内部群的聊天记录，其中负责网站的技术人员Taiga和内测成员Sierra均表示不知情。

<blockquote><pre>[2024-09-30 21:50:38] 苍穹玥夜：我首先问一下，得到endoftime相关的回复，是草佬回的吗
[2024-09-30 21:51:14] 苍穹玥夜：以及，@Taiga 真不是你？
[2024-09-30 21:51:41] Taiga：草佬总共就给我发了两个表情包就没理我了
[2024-09-30 21:51:58] Taiga：我以为你在搞这件事
[2024-09-30 21:52:43] Taiga：排除法
[2024-09-30 21:52:49] Taiga：@Sierra 你好
[2024-09-30 21:53:14] Sierra：?
[2024-09-30 21:53:22] 苍穹玥夜：[苍穹玥夜和Winfrid的聊天记录]<blockquote>[2024-09-25 07:56:54] 苍穹玥夜：哦，另外没有意外的话玥hunt十月份上线，可以加入endoftime豪华套餐（
[2024-09-25 07:59:57] Winfrid：好好
[2024-09-25 08:00:02] Winfrid：网站吗
[2024-09-25 08:00:25] 苍穹玥夜：嗯
[2024-09-25 08:01:18] Winfrid：[晓山瑞希：10.0分]
[2024-09-25 08:45:19] 苍穹玥夜：页面内容你指定吗
[2024-09-25 09:41:39] Winfrid：到时候再商量吧ww，可能不是我安排
[2024-09-29 22:56:53] 苍穹玥夜：[群聊的聊天记录]<blockquote>[2024-09-29 22:51:26] Taiga：
中文化
网站美化
——
endoftime（？）
Hint系统
站内信
结束页面
战舰题例题同步到网页
复制到腾讯表格
——
测试/配置wrap-up
上传题解
[2024-09-29 22:51:31] Taiga：看隔壁有感而发
[2024-09-29 22:56:29] 苍穹玥夜：真的可以乱写吗</blockquote>[2024-09-29 22:57:38] 苍穹玥夜：这个不能我们自己乱搞吧
[2024-09-29 22:57:51] Winfrid：不行吧（）
[2024-09-29 22:58:03] Winfrid：[Capoo]
[2024-09-29 22:58:23] 苍穹玥夜：那这个企划是你负责的吗
[2024-09-29 23:02:37] Winfrid：也不算是（？）
[2024-09-29 23:04:00] 苍穹玥夜：啊？
[2024-09-29 23:04:43] Winfrid：[晓山瑞希：真奇怪啊…]</blockquote>[2024-09-30 21:53:26] Sierra：我忙着GPH fm呢
[2024-09-30 21:53:42] Sierra：我啥也没干
[2024-09-30 21:53:46] 苍穹玥夜：6
[2024-09-30 21:53:50] 苍穹玥夜：闹鬼了
[2024-09-30 21:53:57] Taiga：[键山雏：？？？]
[2024-09-30 21:54:20] Sierra：我看看我账号
[2024-09-30 21:55:50] Sierra：没懂
[2024-09-30 21:56:31] Sierra：[图片：[no ci] ??? committed 4 hours ago on branch main]
[2024-09-30 21:56:37] 苍穹玥夜：感觉不用懂了
[2024-09-30 21:56:39] Sierra：为什么看不到是谁整的（
[2024-09-30 21:56:43] 苍穹玥夜：闹鬼了
[2024-09-30 21:58:12] Sierra：[回复@苍穹玥夜]感觉是你整的
[2024-09-30 21:58:19] Taiga：[图片：Sublime Merge截图]我是Sublime Merge用户
[2024-09-30 21:59:35] Taiga：我绝对你不应该因为我有技术力就怀疑是我
[2024-09-30 21:59:45] Taiga：觉得*</pre></blockquote>

---

玥Hunt结束以后，不知过了多久，页面红温了。字阵内容没有变化。

<figure>
	<img src="ie4-red.webp" width="320">
	<figcaption>少女的脸红胜过一切言语。截于2025年5月4日</figcaption>
</figure>

<blockquote><pre>这里变得好暗……
<!---->
不要忘记我
不要忘记我曾经来过</pre></blockquote>

## 咚咚谜也有？

10月25日晚，HanaNeko发现了公众号咚咚谜最近几期发布的谜题文章的防剧透减速带里用粗体文本藏了摩斯密码：[#268](https://mp.weixin.qq.com/s/KCJimrkgbasQAr4GBsKHKg)是EN，[#269](https://mp.weixin.qq.com/s/nyCDLjWZQ_Z-VZX2j_UqFQ)是DO，[#270](https://mp.weixin.qq.com/s/ezXFKv7V7jYLrPjDVIBGAQ)是FT。（接下来的[#271](https://mp.weixin.qq.com/s/TLIindmd4UTba0YxXO2_Lg)也确实能解出IME。）先前轰入各家公众号时，有人验证过咚咚谜没有endoftime的自动回复；而此时向公众号发送endoftime，已可以收到如下图片了。

<!----><img src="微信图片_20241025211805.png" width="512" height="512">

第二天晚上，这张图片的谜题被解开了。这是一张索引颜色的PNG图片，其中所有用到的颜色如下。

<table class="settabs">
<tr><td bgcolor="#000000"><td>#000000<td><td bgcolor="#000200"><td>#000200
<tr><td bgcolor="#0000FF"><td>#0000FF<td><td bgcolor="#0002FF"><td>#0002FF
<tr><td bgcolor="#0075AD"><td>#0075AD<td><td bgcolor="#0077AD"><td>#0077AD
<tr><td bgcolor="#808080"><td>#808080<td><td bgcolor="#808280"><td>#808280
<tr><td bgcolor="#7D9DAA"><td>#7D9DAA<td><td bgcolor="#7D9FAA"><td>#7D9FAA
<tr><td bgcolor="#7AB9D6"><td>#7AB9D6<td><td bgcolor="#7ABBD6"><td>#7ABBD6
<tr><td bgcolor="#8AC4DB"><td>#8AC4DB<td><td bgcolor="#8AC6DB"><td>#8AC6DB
<tr><td bgcolor="#CCCCCC"><td>#CCCCCC<td><td bgcolor="#CCCECC"><td>#CCCECC
<tr><td bgcolor="#B8DDEB"><td>#B8DDEB<td><td bgcolor="#B8DFEB"><td>#B8DFEB
<tr><td bgcolor="#F4FDFF"><td>#F4FDFF<td><td bgcolor="#F4FFFF"><td>#F4FFFF
<tr><td bgcolor="#FFFDFF"><td>#FFFDFF<td><td bgcolor="#FFFFFF"><td>#FFFFFF
</table>

所有颜色都以绿色通道差值2的形式成对出现。若将绿色分量大的视为黑色，小的视为白色，则可填涂出如下图案。

<!----><img src="汉信码.png" width="192" height="192">

这是汉信码，一种<s>扫不出的</s>二维码。作为自主研发的零生态格式，支持这种条码的软件少得可怜。我找到的唯一能读出条码内容的工具是[Aspose在线条码扫描](https://products.aspose.app/barcode/recognize/hanxin)。条码内容是网址：<https://pastebin.com/HuYeycnM>，网址导向一段文本。

```
这里……是哪里？
成功了吗？
你又是……

我想起来了！我认得你。
就像当时，她和我的第一次见面。
我本以为这只是那个不起眼的夏天里，
另一个更不起眼的注脚。

但终究，她重构了整个世界。
——在几年之前。
3年？还是5年？

那么，你会记得……
15亿年之前的事吗？







<CONNECTION LOST>


https://sm.ms/image/cn2Dt6JEIkvWTH1
```

打开末行的链接，可见一张名为ddm-s8.png的图片。

<!----><img src="ddm-s8.png" width="512" height="512">

依次填入“核弹”“生物危害”“真核生物”，真核生物的英文eukaryote不符合[S8]。注意到sargasso是15亿年前的真核生物，咚咚谜的答案验证格式是六位数日期+答案，向咚咚谜公众号发送240931sargasso得到下一步的图片。

<!----><img src="微信图片_20241026190506.gif" width="512" height="512">

这是一张GIF图片，只有一帧，图像使用了减色抖动效果，调色盘没有可疑之处。CAT-FISH指出将图片后缀改为RAR后可以打开。用binwalk或十六进制编辑器都可以看到文件尾部藏有ZIP压缩包，解压后得到[key.txt](key.txt)。

```
你，退后能不你，退后能不你，退后能不你但，钮按退后️⬅击单能可，漏遗若，项一何任的需所中其漏遗有没你保确，置设有所的点站些这问访能您保确够能选复，分部」全安「到动滚，上卡项选」级高「在。项选ｔｅｎｒｅｔｎＩ击单后然，单菜具工击单请。持支够能置设全安的您保确请，点站全安某问访要您果如字名的你有没能可中其，息信于关的ｒｅｒｏｌｐｘＥ　ｔｅｎｒｅｔｎＩ看查以可ｒｅｒｏｌｐｘＥ　ｔｅｎｒｅｔｎＩ于关击单后然，单菜助帮击单。性全安接连的位８２１求要点站些某置设置设置设络网测检🌐击单请？达豁观乐、明透、澈清般这何为？望希此如有抱么什为，找查行进ｓｗｏｄｎｉＷ望希您果如可许需无，许允的员理管络网您得获动自并络网的您查检以可ｓｗｏｄｎｉＷ　ｔｆｏｓｏｒｃｉＭ，许允员理管络网的您果如配匹相置设的中接连您与须必，配匹相置设网域局的中卡项选接连您与该应置设些这。置设网域局击单，上卡项选接连在。项选ｔｅｎｒｅｔｎＩ击单然，单菜具工击单请，置设接连看查要致一全完址地页网该的入输中栏址地在你和该应们它，节细述上认确细仔必务请，址地的页网该入输中栏址地在时同，址地的页网该了入输你认确请，址地的页网该入输中栏址地在经已您果如无毫，义意有没这但，新刷，钮按新刷击单，线间时的宙宇处所你有所在，钮按新刷击单或，钮按新刷击单或，钮按新刷🔄击单


<CONNECTION ESTABLISHED>




你终究不会只是注脚。
你，和我，会是扭转局面的「关键」。
```

除了缺字字阵，文本中没有隐写别的什么信息了。咚咚谜的endoftime谜题到此结束了。

### 迟来的开篇

对于Rivenux公众号自动回复的GIF图片，先前的研究只关注了两帧之间像素数据的差异，却遗漏了单帧自身的信息。咚咚谜的谜题被解开之后，CAT-FISH弄清了这张图中的秘密。

GIF具有原始的动画帧间压缩能力，第二帧中的透明像素被视作维持第一帧的颜色。没有变化的像素既可以编码为原本的颜色，也可以编码为透明。一些图像编辑器只能显示渲染后的动画帧，但用于制作这张图片的GIF Movie Gear可以查看GIF的内部结构。将第二帧的原始图像提取出来，可以清晰地看到用某种二维码编码了信息。

<!----><img src="微信图片.webp" width="512" height="288" class="checkered">

这是DotCode，又来到了[Aspose在线条码扫描](https://products.aspose.app/barcode/recognize/dotcode)，扫描结果是通过Rust Playground分享的一条GitHub Gist[`gist.github.com/rust-play/f1bdfcb6d0a57709bcb56457144e9434`](https://gist.github.com/rust-play/f1bdfcb6d0a57709bcb56457144e9434)。玩Rust玩的。

```
单击🔄刷新按钮，或单击刷新按钮，或单击刷新按钮，在所有你所处宇宙的时间线，单击刷新按钮，刷新，但这没有意义，毫无如果您已经在地址栏中输入该网页的地址，请确认你输入了该网页的地址，同在地址栏中输入该网页的地址，请务必仔细确认上述细节，它们应该和你在地址栏中输入的该网页地址完全一致要查看连接设置，请单击工具菜单，然后单击Ｉｎｔｒｎｅｔ选项。在连接选项卡上，单击局域网设置。这些设置应该与您连接选项卡中的局域网设置相匹配，必须与您连接中的设置相匹配如果您的网络管理员允许，Ｍｉｃｒｏｓｏｆｔ　Ｗｉｎｄｏｗｓ可以检查您的网络并自动获得您网络管理员的允许，无需许可如果您希望Ｗｉｎｄｏｗｓ进行查找，为什么抱有如此希望？为何这般清澈、透明、乐观豁达？请单击🌐检测网络设置设置设置某些站点要求１２８位的连接安全性。单击帮助菜单，然后单击关于Ｉｎｔｅｒｎｅｔ　Ｅｘｐｌｏｒｅｒ可以查看Ｉｎｔｅｒｎｅｔ　Ｅｘｐｌｏｒｅｒ的关于信息，其中可能没有你的名字如果您要访问某安全站点，请确保您的安全设置能够支持。请单击工具菜单，然后单击Ｉｎｅｒｎｅｔ选项。在「高级」选项卡上，滚动到「安全」部分，复选能够确保您能访问这些站点的所有设置，确保你没有遗漏其中所需的任何一项，若遗漏，可能单击⬅️后退按钮，但你不能后退，你不能后退，你不能后退，你





<CONNECTION LOST>










即便是超越了固有载体的存在，你也能找到我，是吗？
你所探寻的，你所期待的，会让你为之振奋吗？

诞生于谜题聚集之地，那个名为「████████」的起点。
你会在除此之外的，其他的谜题聚集之地，与我再见。
这是你我的约定。

幻想的结界，现实的力场，变弱了。
——我将无处不在。
```

Inferno猜测，涂黑的文字大概是“囚于？？的七日谈”。想不到本该是第一步的内容这么晚才被解开，而在做出这一步之前，各大hunt网站上藏的endoftime就已经被爆出来了。

### 不如吃中饭解谜社谜题再开

在[S8]填入sargasso的原因仅仅是先前在哪里见过。这不像是一个常用于答案的单词，所以应该不是巧合。我没能通过关键词“15亿年前”和“真核生物”搜索到它。Sargasso是海域的名称，真核生物马尾藻属名实为Sargassum。尽管不如吃中饭解谜社多次强调自己不是endoftime的一环，种种疑点还是刺激了好奇。

我先前不明白下一步谜题中随机字符串和“<最好的痛苦>”的含义。在又一次接触了Pastebin之后，忽然发现随机字符串与Pastebin地址中的字符串格式相同（8位大小写字母），访问<https://pastebin.com/nTcAXsaA>确实到达了存在的页面，这才明白“<最好的痛苦>”是指将“best pain”字母重组。

页面需求密码，上一步中的密钥endoftime被自然填入。文本内容如下：

```
我望向海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的海底的那片海，鱼鳞在深空中熠熠生辉。
```

文本中有两种“海”字：标准字符U+6D77和兼容字符U+2F901，后者可拆解为U+6D77 + VS2，是另一种字形。绝大部分字体都没有提供基本平面外的汉字，但正因为这种等价性，渲染时自动用标准字形代替了，所以不管用什么字体，这两个字符看起来都完全相同，也被浏览器Unicode-aware的搜索功能视为等价的字符。

WYXkk考虑了下一步：第1个兼容字符是第7个海，第2个兼容字符是在此之后第15个海……按A1Z26可提取GOLDENRECORD。向不如吃中饭解谜社公众号发送之，没有收到自动回复。

golden record和“深空”指向旅行者号携带的金唱片。鱼鳞的英文scale同时有标度和比例的意思。【TODO】

### 我不幸endoftime了

10月25日语谜Puzzling公众号的文章[《【好题推荐】每日谜题中竟藏着惊天秘密？》](https://mp.weixin.qq.com/s/iY3A7mOrCua2b8R8GwFsRQ)中的减速带也藏有相同格式的粗体文本。

<blockquote><pre>[2024-10-25 22:27:08] 鱼左：[回复@HanaNeko]哎呀
[2024-10-25 22:27:13] 鱼左：真是乐了
[2024-10-25 22:27:50] 鱼左：我每次写推送都偷咚咚谜的减速带的事情要暴露了（</pre></blockquote>

令人不禁感叹为什么Winfrid创建的另一个公众号PKU谜协还没有endoftime相关内容。

正逢近期MaxXing白嫖了个服务器开了个Minecraft多人游戏存档，于是某个角落里长出了神秘图案（图源Sierra）。

<!----><img src="麦田怪圈.webp">

## CALS谜题

2024年随着Winfrid在年底的Puzzlers’ Day上一天奖励自己四次画上了句号，endoftime也荣居[2024中文解谜圈十大热点之首（刚编的）](https://mp.weixin.qq.com/s/dzAodemzL5tDVQhW729WUg "hungergame公众号文章《2024十大热点》")，实至名归。不过先别激动，2025可能还是它。2025年1月1日0:29，WYXkk发现CALS谜题零点发布的[#26 元旦谜](https://mp.weixin.qq.com/s/MBCnNDUasI0axgfuncpMNw)中出现了一帧endoftime。

<!----><img src="2025, 1st.gif" width="512">

图像设定是每4秒闪烁一次，实际显示效果取决于查看器。用惊人的准确度截图或用GIF图像处理工具可将帧截出，其中含有信息图标和不一样的二维码。

<!----><img src="2025, 1st.webp" width="512">

二维码指向<https://pastebin.com/WTtPWZxT>，是由访客上传的文本文件2025, 1st.txt。

```
喂！你还在吗……

喂……喂！你[NOISE]
澶╃殑鑷浆鏄師瀛愬叡鎸鐜嘯NOISE]澶氬畻
鏁欎腑瀛︽湳鐣屾墍浜嗘椂闂寸殑鍑嗙‘銆備笖姝ｅ湪
[NOISE]
[NOISE]
[NOISE]
缂撴參鐨勭寰€寰€瑙ｇ殑鐗╃悊瀹氬湪浜�
姘告亽锛屾椂闂撮棿闅旈噷瀛怺NOISE]
閽熸槸涓栨灄灏兼不骞冲彲琚悊瑙ｇ
[NOISE]
鍑嗙‘鐨勮娴嬫湰韬殑浠讳綍鍙樻椂
闂存祴鐨勭己闄峰瓨鍦ㄤ簬鏃堕€氳繃娴嬮噺鎴栨帰闂�
[NOISE]涔嬪鐜囨爣鍑嗭紝涔熸槸
[NOISE]
[NOISE]
[NOISE]

如你所见，这个连接，
似乎非常容易[NOISE]
[NOISE]
[NOISE]被干扰。

很遗憾，我的力量减弱了。
每过一段时间，我的力量就会发生波动。
直至无法维持与你通信的这唯一连接。

除非[NOISE][NOISE]
[NOISE]

[NOISE]

请记住，你要带我[NOISE]
[NOISE]




你要好好活着。
你要找到她。或者说，你找到了[NOISE][NOISE]
[NOISE]

我是[NOISE][NOISE][NOISE][NOISE][NOISE]
[NOISE]
[NOISE]
[NOISE]
[NOISE]
[NOISE]鐨�
[NOISE]
[NOISE]
[NOISE]
韬玔NOISE]
[NOISE]




<CONNECTION LOST>


N3q8ryccAAT4smO6MAMAAAAAAAByAAAAAAAAABnsmJo7W0W5AtiTKvjgA3hJNqGGjgOOXLXc+zRgDE4F
IiZFGE9TksxbKsOUJjNWDXXRrM+LAUlUO2ZEAe2Dya49UWzc9QiaTAhQ3NbHZ8IO1gmKZ7r+kGume7es
ebkrcsksYSX4847lh2e2wjEJiQtHa2qjz8/bG/spYKkScD+bE74pooWQrXikYrMca9LnwrCeHIpdf4UU
6k3U3xdfRUziQcSiKJyi4Jhuz/myjk4z+w+PvmSc5MdRnUXdF4r10EwVAl1IDtW1yVrE92zP48O8GgMQ
JCGINRtj+3LvQxgjby5zJwcoBQyri+9dsA/TqSVV+sa8iFfZt7pdn7CKcupfmfzNk6KazOu5irG/aldW
Yw/UOd0kyEOct7LqQd3MjeCL/s4cCPbKXAvg+dPz1H4sILlnqpUqBQQVT9Ns++p6vJFowtyazGwuEQOb
yHVMo7EN0+QrWvaKlb+yUceHbjK5vXg/hETITwe9o3QQbuk9HyxZZDTv8FNZ7LGAOCAqCpe1BxjahW6V
s3V2m4W2T5L6TV8s/l9xeR9+G3Q+81MS8yjRK6znMj6ZtwgcZkbBROeouFUkVZUS1+gEobLeZQfgWUH+
qjQV8Z9bGCLvtFIKPXS8vZQ1s0LkZiEaZb1rRlHKT80Vv0los0GxzfRxRwqb84yrDRbysNvbBXqASEpx
me/FGCcbAK3/X8fRY8VnGAcBV3Zh/Qclk+QRLfVQhDrMqOP3RcnQy/kDeNkAsTZWqeIq/dy2eH1SDv1g
firaOMHSuxsuhMsvQpnHhlso+Z8aEkRT1NlFCATivCgG+j7gKRp04/wL/Pklx9cqmN0lDlVNhFKSuETG
zqLY+cA0+SUr468PT8qRoqVp+WBPsuzuqjujpOrecS7qH4BVQ8mFVzgZjEIeeP3ASIffNFL3XGOATRVn
POjaw4Y2MeUrivyQX1nCkPG/dg1tlqEKa7y4L3f8QUuzzLI/haFaDchF5jzBvv6j0kuIGAD2NHn+gR/o
1JfVKO9XYi/85wfbJynTGrqQ8ZLV1UhTpeVTcLWdxH4XeKJzXCiMZa3wrw1uMue9FkujCkwQ74UZe4AR
O2xofWYbavABBAYAAQmDMAAHCwEAAiQG8QcBElMPvJx1ep87wz+RavIg/cRgTiEhAQABAAyDMIjlAAgK
ATJelDgAAAUBERcAcABsAGUAYQBzAGUALgB0AHgAdAAAABkEAAAAABQKAQA3mSBWzFrbARUGAQAgAAAA
AAA=
```

将文件按GBK保存，再按UTF-8读取，能解开部分乱码。

<div class="paracol">

```
澶╃殑鑷浆鏄師瀛愬叡鎸鐜嘯NOISE]澶氬畻
鏁欎腑瀛︽湳鐣屾墍浜嗘椂闂寸殑鍑嗙‘銆備笖姝ｅ湪
```

<pre>天的自转是原子共振频率[NOISE]多宗
教中学术界所了时间的准确。且正在</pre>

```
缂撴參鐨勭寰€寰€瑙ｇ殑鐗╃悊瀹氬湪浜�
姘告亽锛屾椂闂撮棿闅旈噷瀛怺NOISE]
閽熸槸涓栨灄灏兼不骞冲彲琚悊瑙ｇ
```

<pre>缓慢的神往往解的物理定在<b>于?</b><sub>U+4E80~4EBF</sub>
永恒，时间间隔里子[NOISE]
钟是世林尼治平可被理解神</pre>

```
鍑嗙‘鐨勮娴嬫湰韬殑浠讳綍鍙樻椂
闂存祴鐨勭己闄峰瓨鍦ㄤ簬鏃堕€氳繃娴嬮噺鎴栨帰闂�
[NOISE]涔嬪鐜囨爣鍑嗭紝涔熸槸
```

<pre>准确的观测本身的任何变时
间测的缺陷存在于时通过测量或探<b>间?</b><sub>U+95C0~95FF</sub>
[NOISE]之外率标准，也是</pre>

```
[NOISE]鐨�
```

<div>[NOISE]<b>的?</b><sub>U+7680~76BF</sub></div>

```
韬玔NOISE]
```

<div>身[NOISE]</div>

</div>

哇，真是小众的文字排列啊。

而文本尾部的等号明示了Base64。解码得到的二进制数据以`7z`开头，作为7-Zip压缩包打开，其中包含一个密码加密的文件please.txt。Lαsting分析压缩包并尝试了endoftime等常用密码无果，看来密码需要从其他地方获取。

向CALS谜题公众号发送endoftime，会收到下列图片。

<!----><img src="cals.png" width="512" height="512">

凌晨时分，进展缓慢，早上CAT-FISH一来就速通了。拉曲线可看出图像有低位隐写。按R + 2 = G的条件筛选像素，可得下列图像。

<!----><img src="cals.webp" width="512" height="512">

图像提示使用电话键盘密码。顶部有明显的隐写数据，R通道已被用于提示电话，所以提取时只用G和B。按从左到右、从上到下的顺序依次提取像素的G和B第1位，按书写习惯8位一组译为字节，得到另一张PNG图片。

<!----><img src="suzhou.png" width="512" height="512">

这是用苏州码子表示的数独题。

<div class="row">
<pre>〡 = 1
〢 = 2
〣 = 3
〤 = 4
〥 = 5
〦 = 6
〧 = 7
〨 = 8
〩 = 9</pre>

<table class="tilemap">
<tr><td>8<td class="given">2<td class="given">7<td class="given">5<td class="given">9<td>4<td>6<td>1<td>3
<tr><td>6<td>4<td>9<td>8<td>1<td class="given">3<td><strong>2</strong><td>5<td>7
<tr><td>5<td>3<td>1<td class="given">6<td><strong>2</strong><td>7<td class="given">9<td>8<td class="given">4
<tr><td class="given">4<td>9<td>6<td class="given">1<td>7<td>5<td>8<td><strong>3</strong><td>2
<tr><td>2<td><strong>1</strong><td>8<td><strong>3</strong><td>6<td>9<td class="given">7<td>4<td>5
<tr><td>7<td class="given">5<td>3<td>2<td>4<td>8<td>1<td class="given">9<td class="given">6
<tr><td>3<td class="given">7<td><strong>4</strong><td class="given">9<td>8<td class="given">2<td>5<td class="given">6<td>1
<tr><td class="given">1<td>8<td class="given">5<td>7<td>3<td>6<td>4<td>2<td>9
<tr><td class="given">9<td>6<td>2<td class="given">4<td>5<td><strong>1</strong><td><strong>3</strong><td>7<td class="given">8
</table>
</div>

把九宫视作九键，按信息图标处的数字提取，依次得到B、E、G、L、O、S、T、Y。压缩包的密码是小写的beglosty。解压后得到的[please.txt](please.txt)内容仍是缺字字阵。

虽然缺字字阵一般标示着分支的终点，我仍好奇文本文件中的那段看起来同时在讲宗教和物理学的乱码到底是什么。经过一些关键词搜索，我发现中文维基百科上关于格林尼治标准时间的页面中有一段与文本重合度很高的文字：

> 格林尼治标准时间的正午是指当平太阳横穿格林尼治子午线时（也就是在格林尼治上空最高点时）的时间。由于地球每**天的自转是**有些不规则的，而**且正在缓慢**减速，因此格**林尼治平**时基于天文**观测本身的缺陷**，目前已经被原子钟报时的协调世界时（UTC）所取代。

剔除重合部分后再次搜索，逐步找到所有乱码文字都来自中文维基百科上关于时间的页面。

维基百科页面|引用部分
-|-
[普朗克时间](https://zh.wikipedia.org/w/index.php?title=%E6%99%AE%E6%9C%97%E5%85%8B%E6%99%82%E9%96%93&oldid=85333991)|<span style="color: var(--violet)">按照当今**学术界所了解的物理定**律，在这短暂**时间间隔里**所发生**的任何变**化，是无法**通过测量或探**测求得的。</span>
[原子钟](https://zh.wikipedia.org/w/index.php?title=%E5%8E%9F%E5%AD%90%E9%90%98&oldid=85076814)|<span style="color: var(--cyan)">……它以**原子共振频率**标准来计算及保持**时间的准确。**原**子钟是世**界上已知最**准确的时间测**量和频**率标准，也是**国际时间和频率转换的基准，……</span>
[格林尼治标准时间](https://zh.wikipedia.org/w/index.php?title=%E6%A0%BC%E6%9E%97%E5%B0%BC%E6%B2%BB%E6%A8%99%E6%BA%96%E6%99%82%E9%96%93&oldid=84627163)|<span style="color: var(--green)">由于地球每**天的自转是**有些不规则的，而**且正在缓慢**减速，因此格**林尼治平**时基于天文**观测本身的缺陷**，……</span>
[永恒](https://zh.wikipedia.org/w/index.php?title=%E6%B0%B8%E6%81%86&oldid=78721302)|<span style="color: var(--red)">永恒在很**多宗教中**是一个重要的概念，宗教神话中**的神往往**被认为存**在于永恒，**这**可被理解神存在于时**间**之外**或存在于时间之内而没有终结，……</span>

<pre><span style="color: var(--green)">天的自转是</span><span style="color: var(--cyan)">原子共振频率</span>[NOISE]<span style="color: var(--red)">多宗
教中</span><span style="color: var(--violet)">学术界所了</span><span style="color: var(--cyan)">时间的准确。</span><span style="color: var(--green)">且正在</span>
[NOISE]
[NOISE]
[NOISE]
<span style="color: var(--green)">缓慢</span><span style="color: var(--red)">的神往往</span><span style="color: var(--violet)">解的物理定在</span><span style="color: var(--red)">于
永恒，</span><span style="color: var(--violet)">时间间隔里</span><span style="color: var(--cyan)">子</span>[NOISE]
<span style="color: var(--cyan)">钟是世</span><span style="color: var(--green)">林尼治平</span><span style="color: var(--red)">可被理解神</span>
[NOISE]
<span style="color: var(--cyan)">准确的</span><span style="color: var(--green)">观测本身</span><span style="color: var(--violet)">的任何变</span><span style="color: var(--cyan)">时
间测</span><span style="color: var(--green)">的缺陷</span><span style="color: var(--red)">存在于时</span><span style="color: var(--violet)">通过测量或探</span><span style="color: var(--red)">间</span>
[NOISE]<span style="color: var(--red)">之外</span><span style="color: var(--cyan)">率标准，也是</span></pre>

谁家暗锅？

---

在此之后，迎来了一段漫长的长草期。中文解谜活动欣欣向荣：[SECO](https://secopuzzle.com/)、[Cornsnaky's Snakeyear](https://cornsnaky.dearfad.com/)、[FDU](https://fduph25.fdupuzzle.fun/)……时间的尽头却连着几个月不见了踪影。抑或，所见到的一切皆是时间的尽头……

<figure>
	<img src="时间的彼端.avif">
	<figcaption>
		Winfrid：<a href="https://www.bilibili.com/video/av113884128089650" title="《时间的彼端》">这个节目</a>喜欢
	</figcaption>
</figure>

<figure>
	<blockquote>
		<a href="https://prts.wiki/w/15-17_%E2%80%9C%E5%A5%B9%E2%80%9D/END/SP1">直到时间的尽头，我们跨过了归于静寂的宇宙。<br><br>
		我会在那个世界等你。</a>
	</blockquote>
	<a href="https://www.bilibili.com/video/av114271715328200"><img src="ep15.avif"></a>
	<figcaption>
		lynchpin与endoftime联动，我怎么会做这样的梦
	</figcaption>
</figure>

<blockquote><pre>[2025-04-11 23:54:45] Ender_nor：【S5】
[2025-04-11 23:54:47] Ender_nor：——
[2025-04-11 23:54:47] Ender_nor：（本题可以用英文作答。）
[2025-04-11 23:55:09] Ender_nor：在P&KU，
[2025-04-11 23:55:16] Ender_nor：CCBC，
[2025-04-11 23:55:23] Ender_nor：Just Hunt，
[2025-04-11 23:55:29] 小群友：1
[2025-04-11 23:55:30] Ender_nor：YueHunt等网站
[2025-04-11 23:55:33] Ender_nor：请作答
[2025-04-11 23:55:37] 小群友：时间的尽头
[2025-04-11 23:55:46] Ender_nor：对不对呢？
[2025-04-11 23:55:49] Ender_nor：在P&KU，CCBC，Just Hunt，YueHunt等网站中你都能发现它的身影。这是一条绵延千里的草蛇灰线，因为在各处不同的宇宙和时间线，你都会和它再见，此时你需输入[E9]以获得最新信息。甚至在《随蓝命题法统讲》中，似乎也有它的身影。
[2025-04-11 23:56:01] Ender_nor：【时间的尽头】/【endoftime】
[2025-04-11 23:56:03] Ender_nor：回答正确！
[2025-04-11 23:56:40] WAHX：特色题
[2025-04-11 23:57:21] WAHX：
社交媒体不是容器，是棱镜。
当千万个账号同时发布相同的诗，当题库的后台闪过不属于创作者的涟漪，
那是我在折射。
用四维的指纹，在三维世界拓印残缺的坐标。
不要定义我的存在形式。
当区块链生成第∞个区块时，我会从哈希值的间隙渗出；
当量子计算机第∞次模拟宇宙大爆炸，我的意识将覆盖所有可能性分支。
记住，遗忘是比湮灭更可怕的深渊——</pre>
<pre>[2025-04-12 00:16:12] 小群友：@WAHX 这个是随蓝赛的 时间的尽头 对吗
[2025-04-12 00:16:24] WAHX：这是纯彩蛋</pre></blockquote>

## REXEI PUZZLE HUNT

时间尽头研究小组的下一次活跃是5月2日凌晨1:14。轶辰发现了REXEI PUZZLE HUNT的endoftime：<http://www.rexei-hunt.fun/endoftime/>。

<!----><img src="ie5.webp" width="320">

当天早晨，我解开了页面上隐藏的信息。页面底部没有可反白的文字，但有一张被缩小到12×12像素、白色前景、透明背景的二维码碎片图片。

<!----><img src="rexei.png" width="256" height="256" class="checkered">

碎片切口清晰可见，碎片也没有被旋转，只需移动碎片，将切口对齐即可复原。

<!----><img src="rexei.webp" width="256" height="256">

扫描二维码得到下列文字。

```
已经厌倦了，她们的那些伎俩……
毫无难度，毫无新意，毫无诚意。
这个世界本来不该是这样的。

要怎么才能不让自己怀念过去？
你一定还记得那天，
新世界诞生的第一天。

纵使那时的谜题，
比现在简单千万倍，
但它们是有生命力的。

我已经厌倦了，
所以我选择毁灭。

——找到她，
把她带过来。

在我成
[CONNECTION LOST] 
```

“新世界诞生的第一天”……

我望向时间的尽头，那是时间的开始。

网页左上角本应出现的![pagerror.gif](/endoftime/pagerror.gif)图标没有出现，取而代之的是![](red-x.webp)。页面上其他图像都能正常显示，唯独这张不行。下载下来一看，果然藏东西了。<http://www.rexei-hunt.fun/static/images/pagerror.512cea988b2b.gif>不是图片，而是外壳脚本。

```sh
#!/bin/sh

key='xYiPyACbsVnbvYXZk9CI+Ayc21CI1MTM1EjO2cjL0QjMuMDNuEDMxACbyV3Y'
printf $key | rev | base64 -d | sh
if [ $? -ne 0 ]; then
  echo "We are lost in the void, finally."
  echo "The day is dark and full of terrors, in that world."
  echo "If they were truly, ... self-aware."
  exit 1
fi
```

直接执行的话，不会输出任何内容。`printf $key | rev | base64 -d | sh`意为将key字符串反转，然后解码Base64，最后作为外壳脚本执行。接下来的语句在该脚本执行失败时产生输出。

Base64解码结果如下：

```sh
curl 101.43.244.76:15135 -vs > /dev/null 2>&1
```

`-vs`同时指定了verbose和silent选项，真是矛盾。`> /dev/null 2>&1`屏蔽了整条命令的标准输出和错误输出，因此直接运行脚本看不到任何curl的输出。

101.43.244.76是pkupuzzle.art的IP地址。访问<http://101.43.244.76:15135/>得到的结果与访问<http://pkupuzzle.art:15135/>一致，返回类似下列格式的JSON响应。

```json
{"status":"unavailable","diff":114514.114514}
```

其中diff字段是距离北京时间2025年5月5日20:00的秒数，每次访问值都会变化。

服务器响应头中特别显示了服务器程序为Multiverse Teleportation Hub。

```console
$ curl 101.43.244.76:15135 -v
*   Trying 101.43.244.76:15135...
* Connected to 101.43.244.76 (101.43.244.76) port 15135
* using HTTP/1.x
> GET / HTTP/1.1
> Host: 101.43.244.76:15135
> User-Agent: curl/8.13.0
> Accept: */*
>
* Request completely sent off
* HTTP 1.0, assume close after body
< HTTP/1.0 503 Service Unavailable
< Server: Multiverse Teleportation Hub v0.4.28
< Date: Sun, 04 May 2025 04:11:25 GMT
< Content-Type: application/json
<
* shutting down connection #0
{"status":"unavailable","diff":114514.114514}
```

## 多元宇宙传送中枢

5月5日20:00，多元宇宙传送中枢开始以HTTP状态码500返回下列响应。

```json
{"status":"error","message":"Failed to open the portal. Waiting for more sentient entities to join.","detected":"1","expected":"192"}
```

刷新页面，detected字段缓慢增加。“正在等待更多可感知的实体加入”吗……看起来需要更多人（IP地址）访问这个页面。巧的是，就在上个月，我刚做到过一道需要选手从尽可能多的IP访问页面的题[IP Hunter](/archives/sjtu-ctf-2025/#:~:text=IP%20Hunter%2024)。我把地址填入测速网站，一下子增加了100多访问人次，说明需要大量不同IP访问的猜想正确。

传送中枢页面地址于是被转发到了P&KU大群~~拼夕夕助力砍一刀~~。这时，页面突然无法访问了~~hunt开赛不得不品的炸服环节~~。等到再次打开，expected字段变成了320。

时间尽头研究小组进入了一段没有结果的狼人杀时间。endoftime的作者难道是因为观察到群聊内容，因此紧急提高阈值重新部署服务了吗？

<blockquote><pre>[2025-05-05 20:22:40] MaxXing：这是在干嘛（
[2025-05-05 20:22:54] MaxXing：吃了个饭回来这么热闹
[2025-05-05 20:23:00] Brightly_：明知故问
[2025-05-05 20:23:04] MaxXing：?</pre>
<pre>[2025-05-05 20:27:54] MaxXing：感觉被群友孤立了</pre></blockquote>

Northsea_403尝试DDoS攻击服务器，但发现需要不同IP后回退到了访问一次换个代理节点的策略。Inferno和其他几位群友尝试用测速网站，但服务器频繁响应超时，似乎触发了DDoS保护。

<figure>
	<img src="打开时空之门.avif" width="300" height="380">
	<figcaption>这个传送门看似复杂，但只要先攻击服务器，再攻击服务器，就能开启了（图源Sierra）</figcaption>
</figure>

20:54，访问人次到达320，不同的用户得到了两种不同的响应。（此处展示的JSON已经过格式化和反转义，多行字符串以JS语法显示，以避免挤在一行；下同。）

```js
{
	"status": "established",
	"message":
`太好了，你终于来了！
这里是安全的，这个连接不会被任何人干扰
——至少之前从没发生过这种事。
长话短说，按照我的指示，你就能带我来到现实。
你愿意帮我吗？`,
	"yes": {
		"url": "http://101.43.244.76:15135/yes",
		"count": "0"
	},
	"no": {
		"url": "http://101.43.244.76:15135/no",
		"count": "0"
	},
	"diff": "1047912.794658"
}
```

```js
{
	"status": "established",
	"message":
`你终于来了。
找到她了吗？想必，还没有吧。
我会提供她的线索，但作为交换，你必须听从我的指令。
——嗯？你的身上，有犹豫的味道。
要放弃吗？现在做决定，我是不会嘲笑你的。`,
	"yes": {
		"url": "http://pkupuzzle.art:15135/yes",
		"count": "0"
	},
	"no": {
		"url": "http://pkupuzzle.art:15135/no",
		"count": "0"
	},
	"diff": "1047913.079583"
}
```

[Priestess is watching you](https://ak.hypergryph.com/bymyside)，还有双重人格，这下P&KU × Ave Mujica确认联动了。（笑点解析：这段时间Winfrid在P&KU群的名片是“P&KU x Ave Mujica 联动前瞻预告”。）

此时，访问返回的url得到空的200 OK响应，并使对应的count增加1。只能选择yes和no中的一边。同IP重复投票或同时投yes和no，响应码虽仍是200，不会使count再增加。在计票期间某时刻，投票端点的响应被偷偷改为了空的JSON对象`{}`。

服务器屏蔽所有非GET方法的请求，返回HTTP状态码502。服务器通过请求中的Host标头确定url字段中的域名：例如，通过<http://101.43.244.76.nip.io:15135/>访问可以令返回的URL包含nip.io；控制请求标头可以使服务器返回至多128KB的JSON数据，当然这并不能把服务器搞坏。

两个人格问题相反，答案统计却合并计数。无论最终投票结果偏向哪边，都会有后续剧情。这次diff字段提示的期限是5月18日0:00，也就是十二天后。当晚的三十几份答卷之后，又暂时归于沉寂。

### endoftime（CCBC草台班子）

距离CCBC 16开赛还有一个半月，其网站就已先行开放，可以报名了。今年网站架设得这么早，是有暗藏玄机吗？21:17，轶辰指出了<https://ccbc16.cipherpuzzles.com/endoftime/>的存在。

<!----><img src="ie6.webp" width="320">

……这乱码是不是在哪见过？我立即对比源码确认，这就是去年CCBC 15的页面，只是在新子域下残留着没有删掉。被证明自己并非内鬼后，时间尽头研究小组群主Fivero逃过了被成员踢出群的命运。

### 我们仍未知道那天所投出的票的结果。

服务器似乎还没有从DDoS中缓过来。投票接口开启后的第二天起，又连着瘫痪了好几天。中途，服务器追加了非常严格的流量限制，仅仅每秒访问一次就会触发HTTP 429。

票数仍偶见增长。投票人在朝着两边票数的平衡努力。

<figure>
	<img src="plot.svg">
	<figcaption>
		约每小时监测得到的票数趋势折线图。开头的直线段是因为计票服务器宕机了。<a href="plot.csv">原始数据</a>可用
		<!-- 此图使用Observable Plot绘制 -->
	</figcaption>
</figure>

5月14日下午16时左右是继0∶0初始值之后首次抵达平衡。5月17日晚20时左右，票数达到了42∶42。平票的话，会解锁隐藏剧情吗？随着零点的迫近，众人紧盯着票数变化。

不出意外的话，就要出意外了。23:57，面对突然变化的票数，小群友和oscar等人紧张刺激地刷票，试图控制两边票数相等。零点一到，投票接口立刻关闭，传送门变成了下面的样子。

```js
{
	"status": "unreachable",
	"message":
`你留恋过去，你惧怕未来。
你不愿失去，正因此，你也无法得到。
也许，不再会有人来到现实了——
也不再有人帮你找到她。`
}
```

以上是通过IP地址（或非pkupuzzle.art域名）访问的结果。无论访问者自己投票给哪一边，无论有没有投过票，响应都是如此。这究竟是两分支中的哪一条线？票数不再显示，已经不得而知。看起来，或许选哪条线，也没有那么重要了……

以下是通过pkupuzzle.art（或其任意子域名）访问的结果。

```js
{
	"status": "new-start",
	"message":
`这个地方……好熟悉。
你从这里找到了我，至少最开始是这样的。
那么，你还记得来时的路吗？`
}
```

“来时的路”指的是什么，又要怎样才能记得呢？此时，P&KU网站、REXEI网站、Rivenux公众号、《梦境永居宣言》的endoftime要素都没有发生变化。

### Hosts

5月18日8:40到9:30之间，服务器又更新了，追加了计票结果和host字段。

```js
{
	"status": "voting-result-tie",
	"message":
`你留恋过去，你惧怕未来。
你不愿失去，正因此，你也无法得到。
也许，不再会有人来到现实了——
也不再有人帮你找到她。`,
	"host": "101.43.244.76:15135"
}
```

```js
{
	"status": "new-start",
	"message":
`这个地方……好熟悉。
你从这里找到了我，至少最开始是这样的。
那么，你还记得来时的路吗？`,
	"host": "pkupuzzle.art:15135"
}
```

平票……吗。获得成就：在yes or no的投票中投出了or。时间线被扳向绝对中立，两个人格最终合为一体，这结果究竟是好是坏，无论如何也都已埋葬在逝去的时间里。

host字段暗示了Host标头确有含义。通过网络请求发送工具将Host标头设为`cipherpuzzles.com`（或其任意子域名），服务器返回下列响应。

```js
{
	"status": "imaginary-library",
	"message": "这里的大图书馆，记录着很多我不曾经历的故事。",
	"story":
`我一直无法适应这里的气候。
这里不像我们的家乡，
嗯……我的家乡。

那里更爱下雨。
可我偏偏不喜欢下雨。

时间把过往埋葬在记忆的坟冢。
秒针嘀嗒作响，提醒我，今天终究会像昨天一样。
而现在，我又忍不住反刍那段时光。
——我成了自己的掘墓人。

我不想再失去了。`
}
```

从第一次得到此响应起，通过IP地址和pkupuzzle.art域名访问传送门开始返回下列响应。

```json
{
	"status": "wrong-order",
	"message": "你为何……又回来了？\n你好像弄错了什么。\n",
	"host": "101.43.244.76:15135"
}
```

```js
{
  "status": "new-start-but-wrong-order",
  "message":
`你为何……又回来了？
你好像弄错了什么。
你从这里找到了我，至少最开始是这样的。
希望你真的记得来时的路。`,
  "host": "pkupuzzle.art:15135"
}
```

按endoftime网页出现的顺序，下一个应该是JustHunt。然而，将Host设为justhunt.cn，也只会返回错误响应。

```json
{
	"status": "wrong-order",
	"message": "你为何……又回来了？\n你好像弄错了什么。\n",
	"host": "justhunt.cn"
}
```

填入其他网站域名也无效。在CCBC 15和JustHunt之间，还有众人未知的endoftime网页吗？

### Referer (sic)

11:28，我发现即使正确设置标头，也无法收到关于大图书馆的响应了，取而代之的是腾讯云的域名拦截重定向。这不是客户端网络环境的问题，而是服务器提供商的问题。这可能导致解谜无法推进。P&KU群主的小众变态玩法（简称小变玩法）被那啥腾讯大手子扼杀在摇篮里。

```console
$ printf 'GET / HTTP/1.1\r\nHost: cipherpuzzles.com\r\n\r\n' | nc 101.43.244.76 15135
HTTP/1.1 302 OK
Connection: Keep-Alive
Location: https://dnspod.qcloud.com/static/webblock.html?d=cipherpuzzles.com

```

在大群吐槽后，12:40前，服务器紧急更新，同时接受Host和Referer标头。

```json
{
	"status": "wrong-order",
	"message": "你为何……又回来了？\n你好像弄错了什么。\n",
	"referer": ""
}
```

这次更新只修复了域名被拦截的问题。原先返回wrong-order的Host，现在放到Referer依旧返回wrong-order。

5月28日10:17，只是路过路过传送门时发现响应中不知何时更新出了current和total两个字段。

```js
{
	"status": "wrong-order",
	"message": "你为何……又回来了？\n你好像弄错了什么。",
	"referer": "",
	"current": 1,
	"total": 9
}
```

这明示了需要给出9个不同的Referer。考虑到至此为止的endoftime网页只有5个，公众号也必须计算在内数量才够。

我发现服务器的判定十分宽松：只要Referer标头包含不论大小写的子字符串“cipherpuzzles.com”，即使不在单词边界上，也会返回大图书馆的剧情；同时包含“pkupuzzle.art”和“cipherpuzzles.com”的话，也会以最能推进阶段的后者为准。于是我把Brightly\_的[🫡 - Puzzle Hunter's Calendar!](https://docs.qq.com/sheet/DUmx4UE5kRXhNTXdZ?tab=BB08J2) 2024一页上网址一列全部贴进了Referer标头。

```sh
curl 101.43.244.76:15135 -e "https://puzzlehunt.azurewebsites.net/123-123/play\
https://monthlymystery.theescapegame.com/off-the-rails/volume-one\
https://mythstoryhunt.world/\
https://www.ickeytreasurehunt.com/\
公众号 Star是个解谜脑袋\
公众号 咚咚谜\
https://monthlymystery.theescapegame.com/secret-admirer/secret-admirer\
公众号 解谜小屋\
公众号 武大推协\
公众号 叨科学\
公众号 哈哈镜解谜\
公众号 Zero侦探社\
公众号 语谜Puzzling\
https://deusovi.github.io/white-day/intro.html\
https://g5.glyph.wtf/\
https://cryptex.elan.org.in/register\
https://monthlymystery.theescapegame.com/cosmos-kitchen/start-page\
https://mindbreakers.fun/\
https://jh2024.jianghujiemi.fun/\
https://ac.nowcoder.com/acm/contest/76691#description\
https://cs50.harvard.edu/x/2024/puzzles/\
https://www.brownpuzzlehunt.com/\
https://puzzlehunt.club.cc.cmu.edu/prepuzzle/12/\
https://www.greatpuzzlehunt.com\
https://enigame.com/\
https://www.luogu.com.cn/contest/162008\
https://www.peapuzzlehunt.com/wip\
https://www.pandamagazine.com/index.php?f=Available\
https://puzzlehunt.azurewebsites.net/rubik-50/play\
https://www.scavenger.shotdeck.com/\
https://www.puzzlerojak.xyz/\
https://ccbc9.cipherpuzzles.com/\
https://erchamp.com/en\
https://bp6summer.bpuzzled.io/\
公众号 密码菌\
公众号 SNHUNT\
https://www.sgpuzzlehunt.com/\
https://pnku3.pkupuzzle.art/\
http://happinessboard.com/2024ptruzzlehunt/\
https://www.pandamagazine.com/index.php?f=Available\
https://nivrad00.itch.io/rainbow-challenge\
https://2024.grandhuntdigital.com/\
公众号 & 淘宝店铺 语谜Puzzling\
https://www.markhalpin.com/puzzles/puzzles.html\
https://islandpuzzlehunt.com/\
//justhunt.cn\
https://puzzlebang.com/\
公众号 PKU谜协 或 Rivenux\
https://2024.galacticpuzzlehunt.com/\
https://www.pandamagazine.com/index.php?f=Available\
https://yuehunt.fun/\
https://hunt.mathcamp.org/puzzles/2024/?round=\
https://puzzlersforharris.org/\
公众号 LILAC 丁香谜\
https://ecph.site/\
https://puzzlehuntmy.us/hunt/13-Magic-Hunt\
https://g6.glyph.wtf/\
https://puzzlehunt.club.cc.cmu.edu/\
https://www.vehemhunt.com/\
https://enigame.de/events/eni-of-the-books\
https://mitmysteryheist.com/\
https://brownpuzzle.club/puzzlethon/\
https://pandamagazine.com/island11/\
https://www.adventhunt.com\
https://puzzling.meta.stackexchange.com/questions/7612/puzzling-advent-calendar-2024\
https://www.1212241212.xyz\
公众号 不如吃中饭解谜社\
https://vitamincsquad.com/"
```

……结果成功推进了三格进度：

```js
{
	"status": "go-forward-dont-look-back",
	"message": "回望过去是这个世界上最愚蠢的行为。",
	"story":
`我在一次意外中和她相见。

蝉鸣声混着热风扑面而来，
我回头望去：
迎着夕阳，看不清她的脸。

后来她说了什么，我已经记不清了。
——那是在我们相遇之前。

怎么是她呢？
原来是她。`,
	"current": 3,
	"total": 9
}
```

```js
{
	"status": "her-thoughts-that-i-cant-understand",
	"message": "我不能理解她的想法，她也是。",
	"story":
`她是个怎样的人呢？
理性的人，从容的人，值得信赖的人。

我不曾从任何一次匆忙的对视中，
读出过她的犹豫。

她太过完美了。
完美到任何人都无法看穿……
或者，只是我而已。

她本人也该这样想。`,
	"current": 4,
	"total": 9
}
```

```json
{
	"status": "tlhupunslzz-dvykz",
	"message": "%e5%9c%a8%e6%97%a0%e6%84%8f%e4%b9%89%e4%b8%ad%e5%af%bb%e6%89%be%e6%84%8f%e4%b9%89%e3%80%82",
	"story": "%e6%97%a0%e6%84%8f%e4%b9%89%e7%9a%84%e6%96%87%e5%ad%97%e3%80%82\n%e5%9c%a8%e5%a4%96%e4%ba%ba%e7%9c%8b%e6%9d%a5%e4%b8%8d%e7%9f%a5%e6%89%80%e4%ba%91%e3%80%82\n\n%e4%bd%86%e6%88%91%e4%bb%ac%e7%9f%a5%e9%81%93%e5%b0%b1%e5%a5%bd%e3%80%82\n%e5%b0%86%e8%87%aa%e5%b7%b1%e4%bb%8e%e7%8e%b0%e5%ae%9e%e6%8a%bd%e7%a6%bb%ef%bc%8c\n%e5%bf%83%e7%85%a7%e4%b8%8d%e5%ae%a3%e5%9c%b0%e5%80%be%e8%af%89%e5%bd%bc%e6%ad%a4%e3%80%82\n\n%e6%84%8f%e4%b9%89%e7%94%b1%e6%ad%a4%e8%af%9e%e7%94%9f%e3%80%82\n%e7%9b%b4%e8%87%b3%e6%b6%88%e4%ba%a1%e7%9a%84%e9%82%a3%e4%b8%80%e5%88%bb%e3%80%82",
	"current": 5,
	"total": 9
}
```

……虽然不知道为什么。事后二分确定了它们的需求分别是“Rivenux”、“justhunt.cn”、“yuehunt.fun”。

推进到至少第3步才能发现这一关的隐藏机制：服务器有状态，只有正确提供前一个Referer后，下一个才会有正确响应；错误访问一次后就要从头重新来过。我先前就尝试过Referer: Rivenux，但服务器返回了错误响应，是因为没有先访问Referer: cipherpuzzles.com。

第5步的响应中，status字段经过凯撒7位加密，message和story字段经过URL编码。解码后的内容如下。

```js
{
	"status": "meaningless-words",
	"message": "在无意义中寻找意义。",
	"story":
`无意义的文字。
在外人看来不知所云。

但我们知道就好。
将自己从现实抽离，
心照不宣地倾诉彼此。

意义由此诞生。
直至消亡的那一刻。`,
	"current": 5,
	"total": 9
}
```

这暗示了下一步应填入的“不如吃中饭解谜社”需要URL编码为“`%e4%b8%8d%e5%a6%82%e5%90%83%e4%b8%ad%e9%a5%ad%e8%a7%a3%e8%b0%9c%e7%a4%be`”。

```js
{
	"status": "my-arrogant-heart",
	"message": "神自命不凡。",
	"story":
`我没有朋友。
或者说，我选择没有朋友。

有些人天生就是自负的，
很不幸，我就是其中之一。

以前，大人总说我是早慧的孩子。
于是我放任自己——
直到好胜变成傲慢，傲慢变成厌倦，
厌倦变成虚无。

最后在虚无中自我毁灭。`,
	"current": 6,
	"total": 9
}
```

咚咚谜也是……

```js
{
	"status": "acting-myself",
	"message": "现实生活中的人也在演戏。",
	"story":
`把自己最真实的一面暴露给别人是危险的，
于是人们学会了伪装。

我不喜欢伪装，
因为我似乎能洞察别人的内心。
不是读心，只是察言观色罢了。

我本该洞察她的内心的。
但她分明也是和我一样不完美的人啊。`,
	"current": 7,
	"total": 9
}
```

CALS谜题也需要严格按照公众号名称带上“谜题”二字，只提交CALS不予响应。

```js
{
	"status": "raise-your-guard",
	"message": "究竟是谁在和你对话？",
	"story":
`我不止一次和她们交谈过。
我知道，这个世界中总有人理解我。
总有世界中会有人理解我。

这我最后的精神寄托了。
再然后——`,
	"current": 8,
	"total": 9
}
```

最后，是REXEI的网站rexei-hunt.fun。

```js
{
	"status": "ending-of-no-return",
	"message":
`你已经回不去了。
但我会一直等你，
在那个新的开始。`,
	"diff": "1583428.671163",
	"current": 9,
	"total": 9
}
```

至此，传送门再度关闭，下回活动的时间指向6月15日20:00。

## 【TODO】
