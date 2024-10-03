---
title: Just Puzzle Hunt解题报告
date: 2024-09-11
dates: 2024-09-11, 2024-09-18
tags:
- puzzle hunt
theme: theme-htmltex
---

<div class="admonition">
本文也有<a href="index.pdf">PDF版本</a>，但其中没有完整列出所有代码。
</div>

<div>队伍：😾建一个Just队伍！<br>
解题：piscesciurus</div>

第一次准单刷的hunt！

曾经一起参加校园寻宝的puzzle hunt练习生队友大概是被超长流程和极为抽象的题目吓晕，自第二天起就没有再出现在共享表格里，所以大题只有我一人在做。

队伍的名字和简介来自水源社区非著名无意义帖[😾建一个投票水楼 2.0!](https://shuiyuan.sjtu.edu.cn/t/topic/227074)。

因为官方解析已经在网站上公开了，所以这里只挑选了本队解法不同寻常的题目来解说。

## 当代周公解梦

对不起鱼左，我不知道我是谁，我觉得这题可能就是要通过答案是英文的条件从百万种可能性中找到那条正确的世界线，所以我在没看出任何作品、更不知道本题主题的情况下通过了这题，并在提交答案后对我同时是白毛和光头提出质疑。

> [2024-09-08 21:35:11] @piscesciurus（队长）：大师，我头发是白色的同时，又是光头。这是什么意思？（《当代周公解梦》一题中，第4条解读需要有头发颜色才能执行，那么第6条解读的正确分支怎能是光头？）
>
> [2024-09-08 21:39:26] @Arya（Staff）：【当代周公解梦】每一条对应的主体是独立的。

<table class="booktabs">
<thead>
<tr>
	<th>步骤
	<th>描述（择一执行）
	<th>可能性数上限
<tbody>
<tr>
	<td>0
	<td>
		<ul>
			<li>初始化为sin
		</ul>
	<td>1
<tr>
	<td>1
	<td>
		<ul>
			<li>在开头添加aries
			<li>在开头添加taurus
			<li>在开头添加gemini
			<li>在开头添加cancer
			<li>在开头添加leo
			<li>在开头添加virgo
			<li>在开头添加libra
			<li>在开头添加scorpio
			<li>在开头添加sagittarius
			<li>在开头添加capricorn
			<li>在开头添加aquarius
			<li>在开头添加pisces
		</ul>
	<td>12
<tr>
	<td>2
	<td>
		<ul>
			<li>替换[abdegopq]为c
			<li>依次执行到第一个有效的为止<ul>
				<li>替换[bdfhkl]为c
				<li>替换[ij]为c
				<li>替换t为c</ul>
		</ul>
	<td>2
<tr>
	<td>3
	<td>
		<ul>
			<li>在开头添加oreo
			<li>在末尾添加kfc
			<li>在第四个字符前添加sony
		</ul>
	<td>3
<tr>
	<td>4
	<td>
		<ul>
			<li>删除某个字符
		</ul>
	<td>18
<tr>
	<td>5
	<td>
		<ul>
			<li>在开头和末尾添加m
			<li>删除第一个和最后一个字符
		</ul>
	<td>2
<tr>
	<td>6
	<td>
		<ul>
			<li>在第三个字符后添加jan
			<li>在第三个字符后添加feb
			<li>在第三个字符后添加mar
			<li>在第三个字符后添加apr
			<li>在第三个字符后添加may
			<li>在第三个字符后添加jun
			<li>在第三个字符后添加jul
			<li>在第三个字符后添加aug
			<li>在第三个字符后添加sep
			<li>在第三个字符后添加oct
			<li>在第三个字符后添加nov
			<li>在第三个字符后添加dec
		</ul>
	<td>12
<tr>
	<td>7
	<td>
		<ul>
			<li>最后若干字符凯撒1位，但i不变
		</ul>
	<td>20
<tr>
	<td>8
	<td>
		<ul>
			<li>在所有c前添加最后一个字符，<br>然后把第三个字符移动到第五个
		</ul>
	<td>1
</table>

第2步中，如果事物数量是6的倍数，且按顺序执行“把所有带有封闭空间的字母换成c”和“把最高的字母换成c”，则有可能在前半步中将最高的字母换成了不高的c而使后半步无事可做，反过来则无此问题，操作顺序不明确，故排除。如果2和3的倍数都不是，就什么都不做，但本hunt又没有多解题，无意义步骤没有必要存在，所以排除。

第7步中特意提到i不能改变，说明选中范围包含至少一个i。又因为只选中一个i等同于什么都不做，所以选中字符数至少为2。

按可能性数简单相乘的话，总共有622080种。但经过上述剪枝并实际生成，可得有效组合仅十万种左右。

虽然写了程序，但因为答案是词组，我又没有准备人话程度评分函数，没一下子爆出来，结果转人工做了。

不过程序的结果还是有用的：从十万条输出中可以观察到很多以-tion结尾的文本，很像是答案会选择的路径。回溯发现tion来自第3步没有选择肯德基，第5步在末尾追加了m，第7步sinm凯撒1位i不变。第7步必做；第5步如果选择另一个分支，将导致最终答案以ti结尾，符合这一条件的常见单词也就spaghetti了，所以第5步选择的分支应是首尾加m；第3步如果选择了肯德基，将导致最终答案以lgd结尾，完全不符合英语词法，所以第3步不能选择肯德基。由此确定答案只能以-tion结尾。

综合考虑第5~8步。一般来说，第7步应不会影响到开头的几个字母，故在第7步结束后，文本开头一定是<code>mAA(jan|&ZeroWidthSpace;feb|&ZeroWidthSpace;ma[ry]|&ZeroWidthSpace;apr|&ZeroWidthSpace;ju[nl]|&ZeroWidthSpace;aug|&ZeroWidthSpace;sep|&ZeroWidthSpace;oct|&ZeroWidthSpace;nov|&ZeroWidthSpace;dec)</code>的格式。第8步的加字母只对oct和dec有影响，移动字母后的文本符合<code>mA(jaAn|&ZeroWidthSpace;feAb|&ZeroWidthSpace;maA[ry]|&ZeroWidthSpace;apAr|&ZeroWidthSpace;juA[nl]|&ZeroWidthSpace;auAg|&ZeroWidthSpace;seAp|&ZeroWidthSpace;onAct|&ZeroWidthSpace;noAv|&ZeroWidthSpace;deAnc)A*tion</code>，送入Nutrimatic。到这里完全可以开始爆了，正解其实已经排第六了。

Nutrimatic得到的答案均符合`mAdeAncA*`，故第6步添加的月份是12月。可能的答案主要分为以modern co-开头和以made in co-开头的两类，分别意味着在第4步结束后文本以oro和aio开头。以oro开头的原因很可能是第3步选择了奥利奥而e被第4步删去。而若以aio开头，只能来自星座，以a开头的aries和aquarius经过第2~4步变换不可能得到aio，所以舍弃此可能。确定第3步选择了奥利奥，第4步删除了oreo中的e，最终答案以modern co-开头。

此时已经确定第3~6步的所有细节，即使人工枚举第1~2步也才24种可能；优化Nutrimatic表达式为`"modern" coA*tion`后可能的答案也已所剩无几。两头开爆，很快就能得到答案modern conception。

## 排列组合

简单操作可以发现，需要按特定顺序排列🔴🟠🟡🟢🔵🟣⚫️，但只能通过尝试得知要如何排列。第一页就有39组排列，第二页更是有两条7<sup>7</sup>。稍微玩了玩前十个排列发现第一页的罗马数字后就不想拖元素了，太费手了。打开控制台就看到一句：“You don't have to view source code or use the console to solve this puzzle.”注意到验证答案时竟没有发出任何请求，也就是说验证功能通过客户端JavaScript实现。魔法书页的meta交互也在客户端运行，不过那题的规则已经在剧情中明确写出，所以无所谓。这回，我必须立刻开爆！

页面引用了[puzzles.js](https://justhunt.cn/secrets/pai-lie-zu-he-4940234f8db37fd941866f6ab51f76b0/puzzles.js)、jQuery（[jquery-3.7.1.min.js](https://justhunt.cn/secrets/pai-lie-zu-he-4940234f8db37fd941866f6ab51f76b0/aes.js)）和CryptoJS（[aes.js](https://justhunt.cn/secrets/pai-lie-zu-he-4940234f8db37fd941866f6ab51f76b0/aes.js)）。谜题逻辑在puzzles.js中清晰地写出，没有压缩与混淆。该脚本最底部说明阅读程序来爆排列是预期路径之一。

```js
console.log("You don't have to view source code or use the console to solve this puzzle.")
// unless you wanna!
```

puzzles.js很短，通读也花不了多久。阅读程序得知页面底部的“💡：🫳🖱️😫，👉⌨️😋”表示可以按ROYGBPK键输入🔴🟠🟡🟢🔵🟣⚫️（阅读程序才能知道的逆天键位！）。谜题数据在getPuzzle函数内部。所有函数都在顶层定义，所以可以直接在控制台执行`getPuzzle(0).validCombinations`获取第一题的目标排列。另外还有嵌在题面文字中的排列。排列由排列长度和Base64密文拼接而成。

```
1,U2FsdGVkX19ZLyhHn0LzIuLQmvvmHKRFjRdLX8UdqW1LEN0LGXSASeg7g1PbVqL7oGfR621rqbJwFN/yE6yJindA8is+9xsEWqEzeb1l/Lg=
2,U2FsdGVkX1+r/UzbtIXlADyglTCUjxLvIqbC9ZFgz3fYIiI7Y9MV8fcdxDt6FbJ+/Xu0WQAYdSQQM3Z+w1UgCILaWHQzI/jyXoMDWlUPWKk=
3,U2FsdGVkX18/JjxAmiimI47du198yoQJB4t3llLOlUHA73QSXI3toLgDiS2iTDnlsvj0VFWGVzs/bJaNFf3r11utXmOMW+9IHFcYQkAsfiA=
```

这个排列在存档JSON中也出现了。存档JSON的格式是{目标排列: 目标排列答案}。通过程序得到答案后，可以用读档功能快速填入。

验证答案核心逻辑在trySubmit函数中。

```js
function trySubmit(level, value) {
    let decrypts = [];
    for (const comb of getPuzzle(level).validCombinations) {
        const expectedLen = comb.split(',')[0];
        if (parseInt(expectedLen) != value.length) {
            continue;
        }
        const enc = comb.split(',')[1];
        try {
            const dec = CryptoJS.AES.decrypt(enc, SALT + value + SALT).toString(CryptoJS.enc.Utf8);
            if (dec.length === 17) {
                decrypts.push(comb);
            }
        } catch (e) {
            // ignore it
        }
    }
    return decrypts;
}
```

为了避免在代码中直接露出答案，一段随机字符串被AES加密，密钥为正确排列。用户输入正确密钥就能解码出明文，输入错误密钥会解码出不符合UTF-8的字符串导致异常，或产生与预期长度不符的字符串。由于明文是随机的，相同的排列密钥也会加密出不同的密文。SALT为密钥增添多样性，避免单一数字密钥过于简单。

统计题中所有长为6和7的排列数量，总枚举量在7<sup>7</sup> × 3 + 7<sup>6</sup> × 26 ≈ 5.5M，即使用JavaScript枚举都可接受。很快，一段狗屎代码就诞生了：

```js
// a[k] = 预期密钥长度为k的Base64密文列表
// 直接从getPuzzle的源码中得到所有密文，省去解析对象。(getPuzzle+'')是getPuzzle函数的源码字符串。
a=Object.groupBy((getPuzzle+'').matchAll(/(\d+),(U2FsdGV.{100}=)/g),m=>m[1])
for(const k in a)a[k]=[...new Set(a[k].map(m=>m[2]))]
o={}

v=a[1];for(const a0 of '0123456'){const comb = SALT+a0+SALT
for(const cipher of v)try{if(CryptoJS.AES.decrypt(cipher,comb).toString(CryptoJS.enc.Utf8).length===17)
console.log(cipher,o['1,'+cipher]=comb)}catch{}}

v=a[2];for(const a0 of '0123456')for(const a1 of '0123456'){const comb = SALT+a0+a1+SALT
for(const cipher of v)try{if(CryptoJS.AES.decrypt(cipher,comb).toString(CryptoJS.enc.Utf8).length===17)
console.log(cipher,o['2,'+cipher]=comb)}catch{}}

v=a[3]
for(const a0 of '0123456')for(const a1 of(console.log(a0),'0123456'))for(const a2 of '0123456'){const comb = SALT+a0+a1+a2+SALT
for(const cipher of v)try{if(CryptoJS.AES.decrypt(cipher,comb).toString(CryptoJS.enc.Utf8).length===17){
console.log(cipher,o['3,'+cipher]=comb)
v.splice(v.indexOf(cipher),1) // 删除已找到密钥的密文，加快后续枚举速度
}}catch{}}

// ……省略一些复制粘贴再改改的代码……

v=a[7]
for(const a0 of '0123456')for(const a1 of(console.log(a0),'0123456'))for(const a2 of '0123456')for(const a3 of '0123456')for(const a4 of '0123456')for(const a5 of '0123456')for(const a6 of '0123456'){const comb = SALT+a0+a1+a2+a3+a4+a5+a6+SALT
for(const cipher of v)try{if(CryptoJS.AES.decrypt(cipher,comb).toString(CryptoJS.enc.Utf8).length===17){
console.log(cipher,o['7,'+cipher]=comb)
v.splice(v.indexOf(cipher),1)
}}catch{}}

for(const k in o)o[k]=o[k].replaceAll(SALT,'')
o
```

考虑到各小题并不都有7色元素可选，此程序还有明显优化空间，但运行时间已只要数分钟，并能解开几乎所有排列。随后便可悠闲地观察规律，发现几页的主题，愉快地通过Nutrimatic得到本题答案。

该程序没能解开所有排列的原因之一是7色元素编号有的小题从0开始，而有的小题从1开始。如果无视题目描述数据将枚举范围放大到0~7的话，就不是几分钟能得到结果的了。之二是边枚举边删导致的经典bug，连续两个相同排列中第二个被跳过。

<details>
<summary>全通关存档</summary>

直接复制粘贴到读档框即可。虽然显示的是单行输入框，Chrome却保留粘贴时的换行符；Firefox将换行转换为空格。无论何种行为都不影响JSON解析。

```json
{"1,U2FsdGVkX19ZLyhHn0LzIuLQmvvmHKRFjRdLX8UdqW1LEN0LGXSASeg7g1PbVqL7oGfR621rqbJwFN/yE6yJindA8is+9xsEWqEzeb1l/Lg=":"0"
,"1,U2FsdGVkX195iwIHGbwkk9vjKSo9cmsXadB41IyzmaRKupWMww7b6Qy7nNcO0xw0qhbBKBdjK+qQG4JTqMdRmyaZuxfyd4JcvoPcnhVL9XM=":"0"
,"1,U2FsdGVkX190hCyYS/ENZa/df+vAYf4Vvl5F6MSTCciPyDiKZumK9jZgXW7P7tBc9/dfyr+Tg91w8LOzkxolBmKd0+gbv11T/mj1alU5Gn8=":"1"
,"1,U2FsdGVkX1+BCuLxqTD2jvk5aeNBiCdXsprzwKEVSUiQ6aZOICVd0Jwo1MlkERGq/ixn1JbVRu0lvVyX/WIJsVeTLvyQti1uTZghc91MDtU=":"1"
,"1,U2FsdGVkX18oVrzQeCh+TA+PegWKSSEcF/Y63c+chCgMRYO0s0EYqS183vDCkfKhbqkWCxY2qY2KyYVQyOQiSYx0Itpp4jUVpcB5z7VO7rk=":"2"
,"1,U2FsdGVkX192IIT5m1Y/Ifo/hT+Cozy7dHCZLh2MqWUmpCW0iiWXsKxGCu0pOJsvGTjXHS7VELmA7B0R65RELJ9s0H0K4EofkbAxpQzHm08=":"2"
,"1,U2FsdGVkX199a++SiI3OOXfle7NYPlZPmr5Wy9mpv6VeJkga6KYQzryPBznptyYY85itDIYbX+kWXMOFDuotjZ5cHMcniGHMMJVgdvH7iCg=":"2"
,"1,U2FsdGVkX18Frshb9MowsPGkGNgxWg0kvRKw3F0dmcctLhW7Pm21iAEkhZ5HqNfo7tce6216tT3Q+X01mwWJ+Zp2Aa0sKmaNKST5txoFr4k=":"2"
,"1,U2FsdGVkX19D0xX6YxG0cQDmtbh0mRAkQ2qJHozNETcchRu0ZItlrqrQaaujYKjTVIMv1A5gwxB//k3lMZ/QWdoeMJJe2gw1muFWZNGdM5M=":"2"
,"1,U2FsdGVkX18t1Eh8W6lRvWls6K4yTd7RMQ9pgaMed1S2ulNzEsexodwpFn96d0Nf26/dRM3+ieXWx/ngemxlf5IKofXkX0hgXwuUAtuvOi4=":"2"
,"1,U2FsdGVkX1/lWM0ms/bsGinvXFSAH99MDnHjcIk5Xx8m3mPsnAMaBrIBbIhPyyyEGkD8JOtK7viyjkB8eJc5D7XOt5lwhJgE79zjvuI6zMw=":"2"
,"1,U2FsdGVkX19dNSVf6UzL1trPWwJjc7dhCXYete0vvia2+9x597lVDTku9kflmsnTFihfynPZ8nLP9fR22ign6Pw2CmsM2WnCJJIWE2hLbGw=":"3"
,"1,U2FsdGVkX1/r83a5aXRC/9m0XZ3AdCPCaWs10P6R7/6/AdhoAqhIt9RNHOMvRvLidkfA4733pOqy8PmtaHDjYmZu+cwXJAp3C5lT3of2tns=":"3"
,"1,U2FsdGVkX181Nlew32oU4jA8QSf2IaYKzxHaov+cZmpgU1oBFFOEHxZ4MKe2OJVeqGpJKiw0YQhkyTwg/0++XgquAtUY0fOhN5zmpasiadA=":"4"
,"1,U2FsdGVkX18/RNewlNIOaq70uMUtIu14GRJ34zPn4u+R31rQmj1J26xMCwo0L/uItsy504KFBNzxjU9xXvvJrN2atY4VovrO+DJux8noqf0=":"4"
,"1,U2FsdGVkX1+7VaVEqNr0Sqsrl8aPLRaRL0RrnrMoWsp9TRVTvmH3e5eHeqrnPoDfMmbeVa/f8TREyGtN43AW4RXDfR3caZoVRyaap1vuJtQ=":"4"
,"1,U2FsdGVkX1+t/dIvXx/7FMm5Ll+KXCiqEtYpZADKgqm2SiS1ekAiapmEgLyQ7AVgJ3q/ROvXrlP4XRYmGRLNW6O7T5P1iogxvFcp6uKwlj4=":"5"
,"1,U2FsdGVkX195laf2noFtHLh2E/3k0nvt1YtRFKqGxf6AVyNKHHC+a2gZsd8dwVi6E+3qqHuMD7kFZ0WDrkQCZU3WHKjbWgeGq91MaVk91uc=":"5"
,"2,U2FsdGVkX1+r/UzbtIXlADyglTCUjxLvIqbC9ZFgz3fYIiI7Y9MV8fcdxDt6FbJ+/Xu0WQAYdSQQM3Z+w1UgCILaWHQzI/jyXoMDWlUPWKk=":"00"
,"2,U2FsdGVkX1+1HQwgjbIPRSBWHCbpC4dyGXvuaSOW8pI4kD8PuAcGUyMWlMcoNsNBesk44V1JEwTUHtCg3FIjwvBMOwcgLgWooEilO7Yx38w=":"01"
,"2,U2FsdGVkX1/7v9qOyhjgXXhYAYwFE9onXcQTCxkt0IXIr74H4Ls2pZh4pP9ImJG2QemvbrYjmI1sAluNFEZA4WEpWmAOacB5bLdYhZuSMhY=":"01"
,"2,U2FsdGVkX19bxGx3bjQuWMIPFGEaBx3GkfNWvEg8tHvW23vdtyCSnbXXJVENEu+TyTOCNT/LtJuXwdnH2smC448tmN6PbWCzVqI/CN8ctLs=":"01"
,"2,U2FsdGVkX182ReYldjJFirEZvgASMUulycoTVLdmqqsgJqNt9ArIwuTU6ZMFPQhn/QkdVrPA5PY9uAzEo9q4pWqcPGSiBbxatIZma12nG5E=":"02"
,"2,U2FsdGVkX19p+SqwYi+xg8x/G6beTobEb1tNI7PdjLycf6RghDrdEgonsJZh0J6usnEIkXqwkkbkJkTRjlq0wKM/9AT5YU8PzSJuS3RaebY=":"03"
,"2,U2FsdGVkX1+ZrdNY52sKISKRuBqNt+/oekKd1uNGWsZgwwd9wOnhh/gSyZaphbzfpQmlhKzlXZx8XBEcXW/QlolvUGxhWQOKnYWU4YCBuUw=":"03"
,"2,U2FsdGVkX1823Fe5veyUqH01G8D2+IZOv10gFw5pFrzA8mp3UongRG5fJn7KPzfTIPVbzw9mqXwY6iSzX09LFSs4BnHF6hcaYSMtc83peAk=":"04"
,"2,U2FsdGVkX1+vJysgSPM3WOJt/ZsqyMaWhF41pCopiZJqpDVwCnNzyXduum0L2/i7Lcrm96ChcDt+h+vbo9Xs3fbD3PrLpajoO32iVw0kjXQ=":"10"
,"2,U2FsdGVkX1873XWbpbeAQJHnjENPc3JxWzaCnFa3OF+4qV1ex2eBt6NtOlK6sL4FQ4bGS/KZjiBgXZ9d7PcoF0YN0y/4EXS1iaVsY3FVTA8=":"10"
,"2,U2FsdGVkX1+Gy1XpBUGx0xuHpGEd6LgDY8drrqqPRmr4UQlsMR59E0V7oRgQa/jJgk4hiWRKgD3H436funYceG0RXNXY1dGrMhfwMedoiAo=":"11"
,"2,U2FsdGVkX19IOdbsvkU2SyQQ5mfiLBX2ngSD6QASN4DYvKQDfLqe1Ia0XVkXpmmhszuE30I8iDAatkM4YoVHlquE3GXzaaNVcfB6bdYahP8=":"13"
,"2,U2FsdGVkX1/YF7a3316wBAZaopXZPhRFF4fWBYKAa2iO6o7KmiD24iqNN/a3kfQSQK6a3kemv17/HnMoYvUTAE6/ZMC4UHVzYiH3eWShmUY=":"13"
,"2,U2FsdGVkX18tnP6fVzXi6QUBWwIq8NGEAks02z8ki2L9O/Xn1J/jUNwu0zCSUYyY1/+aC7yfdKHgLqYwKcYL2hXMvBCrt1x5ggMjIN+NZc4=":"14"
,"2,U2FsdGVkX1/lDV1qwPg6u4Leh3pWDCvhosCMdXAewcFIxnOA5609vdXGXbxKLYq7aQLkPCzj1MXGzTQTlUFkonp+Nxr6McphRHLa4LxlR2I=":"20"
,"2,U2FsdGVkX1+w2Y/HHN4UsQ5ZpmE3Uka0JDvL5nvxsvbi4fhmFGBMZLQAU78aBtl5RY9M0U10gNctWGkOBDswdoqPVawldRQ1CfBqf0XxS1c=":"21"
,"2,U2FsdGVkX18YLWReahJQW8jyAkpKwKr7m10s97P6qX3heuHSAhuO+M4S1Uo2UbAn09IalPc5I502FPYVcN2TH2TOeNP1WESGlyu2htMpYtw=":"21"
,"2,U2FsdGVkX193n+WmXZJPiCq3iYew6PMA7yEl5Ba7UMMxZfwXUNjXGDx/MPoHgeEAMi04fhGKe06AWSOMSY7+CgG4iPBneGHMQDKoKsEnUcs=":"21"
,"2,U2FsdGVkX1+Wy7m5bywMqQDc9OzLRU2/kMcoH4rKEgTXOrUAVm6yjM51qXWx1/FP7gMQjVD6b9g3M0MxVevvvSUNLV5AXN3PQ+tIsAVWhAY=":"21"
,"2,U2FsdGVkX1/szliZeMq51g1YfTIvvid7bZTrnz90Grjg2nVM9oLcrFOH8mEBMm4J4Kxl5QztcDr+B/UJmrA9mrdSXunwCNq8GF5cQLJTfIU=":"22"
,"2,U2FsdGVkX1/ChxGLeIeUyjr5brHe0SH6hr4FwJslNzu0P1+UHJSIHgzpQeuZpjfnzanCAJXewP9U5v6CKIVrQW1WCTPfLwUaVFrN26w9mig=":"22"
,"2,U2FsdGVkX184dwHZfWN66lgtjuNlIn0UWjpZ/4gefc5t0mXGo1+IOOEQuTAJXwUzh0L1G/NwgSXZu7yuF+pJwlsr990heIFtQw0dJCTadKs=":"23"
,"2,U2FsdGVkX1+js5R7H2kOMnn6SoQzZTcqw1z0EIn4TTobQJsE8Qa0pVrpxV6hOeyICmzwiqYLBTtOre1XwUAuiULAhB9AlIC1LVYZVODPaKw=":"24"
,"2,U2FsdGVkX19sfXrPDn9yAA2N3h0Jz3hi80KZCqE32GHO+gD4QBhscgeTA7kZnRm4yhcVyv1hGwB0YBtDPC/DDToDWY1PW8pYKT5CF+2Npmo=":"31"
,"2,U2FsdGVkX18o7/9HJSidYGOHC+h8wgvvglU4HCcDs5txLlfMsuUn6tATq0RnFRxizuLn9YohGemzFk19jdT3OVzrwlDJWjceV11MBJgH+w0=":"32"
,"2,U2FsdGVkX1+mkkoaGHSoVIp8LQWdCuVuXr/pORGBM8x25F1TFTfvelCnyrBh/xkljTryWNtV6jQ2Ub7uzyXS8mtEz1PqE4XtGE8KGX8eAjI=":"32"
,"2,U2FsdGVkX19okLr3X5aYSpV3uKt5qzjf1hfVC06uBFkyCoKUy8B/JBtOgD4TwgAf0D8LLQ6AThWhD/8VRK7yDcaQoTWahH5Iol2byNWtWHA=":"33"
,"2,U2FsdGVkX19Kwkqx7jvNyNPCySSDzALxf+AGItnR3GEO3QKNreH16VLb2tcOa0m8DGr7hvBaw/GgaN/b6O+F3Irseb14CgA3KSdStXNgIak=":"33"
,"2,U2FsdGVkX18pes9Vc0/VFv3MZWhErLDXLmfZ+M2QFyfoBBMVX9/Z5e0UYym7WssGS/FXV1ks1PdqOs44zUrmsEPK48UX3njts1Z/zOzfaEU=":"35"
,"2,U2FsdGVkX18BTOiXEk+SaJofBePRqm9Th8IqUY9g+FR+u40GNW+KwgJ3rDhtCzyc7FTdr7rgeiBetB2/xfWaZmN4dkyo8E5ZP1GYop67W64=":"35"
,"2,U2FsdGVkX1+e36hjGFZo6LiPIWA1sOGoJflkDe7JTR0ulRn17fBf/W8wQXczD9SGq8Oux4zWuYmWhcMuN1nx/GARmC3tK067dOt/uUYHZ/c=":"35"
,"2,U2FsdGVkX1/ne6DDrU/qpJrvXl1FoSCgR0j1qMGuReBHvAXATloBDtIE+tfmxvCDVqP6MFZN8WRNeDedi6bxSJejnY8DBwvQr2JXUJ019fg=":"35"
,"2,U2FsdGVkX1/tkcHA09NoNiVi9vmKPnRJ7v9dtfBod+CwEI1SZcLEdJNyKHd5LhWQwwCDbSke6J6dSEPK4zl8E5SxvuA8e3vLyfbRMSznYco=":"43"
,"2,U2FsdGVkX18yji9pKNSFYKBtEAwma+qnOP7kXfvBqusqBQtHw5y4j7D+9NsqURpRit5S/Fvx4p09hZwoaoeSPbocjaVEPF816pxtkNw5IGA=":"51"
,"2,U2FsdGVkX19tqIFqJ3xACXR+/i7oAE2tKwmG/emu0VqT/IYx+iXtpcqgrvANXQB25HOXNHz9hoXE9Az5G5A5npYeEcwbOf3DP5ufC4F3nQE=":"53"
,"2,U2FsdGVkX19Ssiqr0Tk2xb8dZBs+rtzceaeR5M0Cmk4wiCniG//iXR2EAlKpJEXW82wNtGBmKn8C3Oo39sVwXQBGpB4JB74Oy7W1R3CtMK8=":"55"
,"2,U2FsdGVkX1+W3DkWTjZJYlCvXMUsjJDMVswEUE4y817oH1OdriK1LAgQZpItx84QpCUO+n9RhFjexE+Tkfv0qyQZZewwloI4FNXpV8XWAGU=":"55"
,"3,U2FsdGVkX18/JjxAmiimI47du198yoQJB4t3llLOlUHA73QSXI3toLgDiS2iTDnlsvj0VFWGVzs/bJaNFf3r11utXmOMW+9IHFcYQkAsfiA=":"000"
,"3,U2FsdGVkX1+Ur/dXLFex/WcoHuavXJ38ofbXBUUJrcnE1PIfjzc/23JQeFf+RafbwKW7ahn7i7TMODZwGtwMf8JPNzjZkTrJPzg8oFy20rs=":"011"
,"3,U2FsdGVkX195dxtfRhBj6780x8zdGFxiAFcgtr4zdniR0qY3439D6TJRSxI/piWKeofJUorBvwYwxMDzKDgYMisEEIH5evcSFZgaL5BHC2Y=":"012"
,"3,U2FsdGVkX18cXYjFyoyyYygEzbOW1dbG0+hDdLu5t/154IcTqyk9TVb3HTC+BXol9axMnh1A7HmDLaUGyFEtf1P3MNbgxaKDNR2jtPj9ig4=":"013"
,"3,U2FsdGVkX19H0aZGzONtFi9EXFbhM5jOpmoOQ/rxkypVIqrRCxWYx2P0tM4UoTY41ir0/BV9hAcT6zqQvi/2fmFj8oq3aCgrixDiApP0nf8=":"031"
,"3,U2FsdGVkX19k0L3zAFPIpSNrL+ZNgMFEkhe/UCV9nUUlNCpisNM84wT57OMO3cdN46QlEOIQcCbotdm/41rLPJlyj3ME/nIiaH57SrqZi+M=":"036"
,"3,U2FsdGVkX19a0B96CFH4NDYGkQ9Xsp4kfUzH3hzgO5gVPwuhsvx08yt27Wp43n0xTLW2yhCrGXrc0RqPMrBwMC5pV1RuUjojPvoC4byeMso=":"100"
,"3,U2FsdGVkX1/uTbNwDiigAbm37DyJS9zYMSfSQe2vMXgdDlHg8teWoc3qnmpBfJJeldXMRsf6R8oqL9vxagAO/xg025AwLcc07yYOEHW3YdU=":"111"
,"3,U2FsdGVkX18vV1WzGP3fmMJr4JnPfAv3Ty+VTy6KcFw7mtdj/WxY+XEq1UETOHRwTtRVBApQW2jxnVUs30S9gWBAdpQ9GX6nI6JinFxKr8o=":"112"
,"3,U2FsdGVkX1+74+C3XYHb0OGDOgvAiWrXz/izKeJ7Pb7Fc1+6mmJA/gDApwpAJAUPbPZ2eilOI+ocAD1z1c1DvWt4AsfeJwbO6tB7NX6+zos=":"113"
,"3,U2FsdGVkX18NaPH3+8EukbTCMpfaqBi1x/NaUSQjP549UKfH+Du1XVvA6TVt9Hpa6FP9Jp4/5NRV2Dps0YBXTEuaT1eBgv1vD3BdVFXR7o0=":"114"
,"3,U2FsdGVkX1+kN7R858lKJXVPuMvwogf3YDXt8xiclo4Ai1X+tdQRw2LEh2GJHr7Xhwz/0euRAEnHaehN6BSBOq6damt0cTxiOXA+25jFMzM=":"121"
,"3,U2FsdGVkX1/LcTuWURRHDhR+B3LZwCxqb86Rir/FwucnimGQnOabBeE/Dq07y5Risn7Azd7OupYvgivYzcVYt+wudj581HWrSTIv/m256Gg=":"122"
,"3,U2FsdGVkX1/FNNcNJjMECQ/2tDvYBFHTagw0/qA+iWSnW4/bNBdoRDSCP6GJHimOx63srq3SvekH17bJ2VkFzc32V8EkcxxBL5HOwq2eO0o=":"123"
,"3,U2FsdGVkX19KVI92/WbAhw03qtco7tVtDKo78hou8tuPamkoWPrF2ZHVWDzr70R8/fs5X5jEvmzugcdHi6/3Yx/TtqdB3tA/jhSOLiaZ4nU=":"123"
,"3,U2FsdGVkX18dd46dHSXVmVpbNoM6o3sK67po11yoKE7YL9gDXDuOZ5nS+6PU/KZExlD7I1hXMGHIeoRKhOo9fnydfX+TAKgUMFqrJtAHKiM=":"124"
,"3,U2FsdGVkX1/W9+MEhkWBf7rJIxyB/Q2CnCM6yGudQspjB0++6NfG6NJwNKyCAgYHLbhsTpOakjiXOuLxHCDCnHarVIjMi2n2UIXF/Nw2LlQ=":"124"
,"3,U2FsdGVkX18NLJUeWo32aN2sfFDU52KQN5W1JwMJ9FqxvivXxAwYpqHOLBog+38riKwfR7dFayDQhi4V+4iYUtlb3zKfbyIZwCVdwKKQAkA=":"131"
,"3,U2FsdGVkX1+7h+4j72qJ8Pepdq7cpeExU+0GW7uos9lq/1bhll4+0kCXF0gzgqAvgCBpEao9fHHjMoiLTisFE/ZhUCvKHDkqtfvhP8++Dok=":"131"
,"3,U2FsdGVkX1+fa0QSzMez8DdVT58kbewVQLJRWeCZUT0vOxsb247k//LV2wVgDPmjJNxTbpu7KJFAzynTbfQu+qiO5UWoXnF2dvKZ2itBJZA=":"132"
,"3,U2FsdGVkX1+XrrWAfCSRYskVNh9xnO6D5PdQC97wqZAJr1kqoGnNSET4W4PHEZsZNR+2Jhc3JHxnwJC7B42K6pMQ9ba5z5TVAeD51fUJJW8=":"133"
,"3,U2FsdGVkX189tMWYq7vgdO9INLnURL92ZInc5JkFhDoRaYHloRAGMO0Cmd5L4RvyYl0vybIIk3PJ1yECzJ3r1tofa7uE/UQbdpxrBQ068hw=":"134"
,"3,U2FsdGVkX18Xp0DcrWgf27EYfdHxuIKvjA5mMza6bBsYU6MqYr/3lelLJu7YLVGUtxFQtifwkExic3AKwyFoVBG7T9d0UJbLQ67zv2Nc9Ho=":"134"
,"3,U2FsdGVkX18GhQ94rNUKDtjHAohmQsCiSo3kPKR9+GekvlJTyEOLSfxOkQ2FYvJPG1WfZwCJ4LZw714fxKWbIz5F5CJxGm0n5U0OcbKTJgM=":"136"
,"3,U2FsdGVkX1+2zYuJ4Iv1DEgNYCVJk4+ML/L/PpBTNuEKjG9D0wbdhzpk1nchQEPl9OoXV5b6XffhTbknvMlUt2J5X/2jZg2g8uWL3iy5Tsw=":"141"
,"3,U2FsdGVkX1+iYcC70Ew1YcYQ16nt+y3+mZ+tYkBw5SH87rrRpjeME5DiZjtqZWRq6jCFHjLqICfQ6iF08XjAYtHF6JwzHYUMse8o5zRohvQ=":"142"
,"3,U2FsdGVkX1+3RqEp8C16zZODSKweIb8siVU7vMknF5W0NlpNsp685QyyIX+H5MTPHAfrTyXxE65rbOS+gPvDoDKA3+My5yskWFrOPya2zx0=":"143"
,"3,U2FsdGVkX19I4dsMvmmLvreu1ecHOs8WbAND9iKxXg/jyEh8KRUfqVDqzQfZk92lLHgISy1DXICKrxQ90XLeeDtClv4n5yQhBBSSmOUCEWs=":"143"
,"3,U2FsdGVkX189McUPwrdqcA8pEUGROznFnfh6wk4gJQm1/fjieLG4KXTvyhSmCexgHRYNZ9kg3OkGu8D34aRls1P0VlSImrPNMr9npJfhSE8=":"144"
,"3,U2FsdGVkX1+rJDLYNi9lRxr8PpwPbW+HNWAi9eb5s0Awo85C+If7Tu+8Pu1wBZ61qyS0VFBr4NxINhscqDhSpf+57oQGC2AexuBQC7O6vks=":"151"
,"3,U2FsdGVkX1/V+WMKVyTeCVQuzt+xlKwUnQhJFcVvfjnnYTwwm06WljJsEz0ehIXBDgraumiGvd+2KnFRtf8mKsNqnPfVTGbYzTcghZhjk6w=":"152"
,"3,U2FsdGVkX1/53kGqPpDj0V1t25tm8rPvD2y6gEqCAVFYNN3+j7xjireKTBouEDmNvGVQgpUQTTWOstkrIQ6H154r9zPoiH6cGIdjvuh54Zg=":"155"
,"3,U2FsdGVkX18DfUUDL+u893hZjQvPnOxMf3i6kfRhUkAPIoQc/YDNqug23qKm0e/sCJGjM/ZnfXPT52oaXRaifCIIR/x6A5bz35RmO+omwbE=":"156"
,"3,U2FsdGVkX18IMxRbBnN/nSxi2W/dz34QVF+8S8toAuRt8B7aN3Ta8kTwsdci2LHcON3FMbN9tJqAeykIhGVcIuVkPQuALdGZJebTFDL1+54=":"200"
,"3,U2FsdGVkX1+n5+fJ9Isip+jbvCDVoMxwSmGG6dSDj8cF4Q65FDQLjOgLihMZ9UqPj3rbls+IAc/b4SSQNriJGjYpxvAwIdjC1SCV5f7G5X8=":"201"
,"3,U2FsdGVkX1/AIyrIMHhZjPCGPltCSFZlNwpIbMO5bz6+aw8T+viWm0ye7/xVZJTJuhoWzDDfUqoSoJec+zAtIcFbLMCVk38uA7DO0KRfrUA=":"201"
,"3,U2FsdGVkX1/fNDCPfzIw+7KbvUHj3YvcQdMirWXJEJQqZtJeTM8TeiNrcFs0DPu3F35O8nU3b/4xpjOi4Fua0wEKt1jEn174FF97YOzOgAY=":"202"
,"3,U2FsdGVkX19xSWu6OCOuq/ItapiF/1o78sFwXs64uYkIlskwuHE8TfggqbOwe3y1c9tY1HXfBnWpy6rzBxdF+rkIb05IgNjEW5pXJPp/fFI=":"210"
,"3,U2FsdGVkX19OaVkQRKNM93eT0ZKdqIm6CCgUy0nYf/PlchTQEcQHwOD7X9oAoPk6Bw9pRIpLwEYl5jd7JwBpzmUACw4COcLiA0Wm1PuflLA=":"211"
,"3,U2FsdGVkX199OFQFx6735A9ywMqYwUqYDJg+uYFOHh4U41ds/Di0XhJOx6eeL1Hi3eegtiSi3mjYyZCJ9Jn6P6oCIRcQvNsdZ3p0vaxEXls=":"212"
,"3,U2FsdGVkX1/Kx1BOkv0xhuEKHivXikGi5M8JTa7qiJSZSnwc9vaV1mdW0khy+YbYeP91boSQNf/pEPFsT6eIR+BMMb14ei3yds1n/nGDqmo=":"212"
,"3,U2FsdGVkX19uQKTJdZqmvjHyOqbO5uA143VFDGcBXmpq6K+tke5Rf0j+mcRH6PggXr460dpfLDslGQ/ldCrteRD6oY8L5O1QDvVZn3T5HlM=":"213"
,"3,U2FsdGVkX183WpFvSI61LkJErX5V5hLuAar2DmoJOOVXlH9dB9fWUHSWpJ8a+3VhQYSX715l9B1J8trTVHPnq9EHJWres356HZ0uLvTrMdM=":"214"
,"3,U2FsdGVkX18sVh7sqjXB6igPIMK8nZY9oBV1jstKS00reihawhp+aIn5aEOb1RByognbeFBeZ5x/bX/dH9TdEL+eiDxfKnajLdJebliqxxA=":"214"
,"3,U2FsdGVkX1+ToDgPz5uqSXzsw9kGxxIt8WLTUxtFoi2pOgYTa8mRTUG70J0fpe8j8HtA/9pmvk4fLv//uaKV3GmVa6ovru+cQTkBmu8bclM=":"220"
,"3,U2FsdGVkX1+kHfuIRGGS2p63nXDTSkqP55vJ3gK8/DDPwlCT80D3b9EaDc/qP2R5JO215dUDL62ir26nx+BS8oHI9CBqkaEiRbgONE4ohow=":"221"
,"3,U2FsdGVkX1/wgMk/7wekt38zlE0ZCvaaVw3NBFHgiHmcqR/Pe+6y4N3x3USy6ZSQtwrOf9F+kLUreJ04OP1c517G5YBsmjKiM8lU7YU4CME=":"221"
,"3,U2FsdGVkX1+2XMbnDnIcIYqfxmYJrhP0z1BGoV3W38vSQNm4ZhzBwLiOOOjtgyaQ1NFh9ijwXHzUZuFfLAlZOpMLMpBBw/0EzMTjszulDms=":"222"
,"3,U2FsdGVkX18rHUryREu+W73F5J+LGKUXA0b/bUUtwlGAVqQyTr4boGrrPY85bBVmhJU8C4ffHmPRlNkMCUCSFyCG6OmNU89v0zrv/LiYMbU=":"222"
,"3,U2FsdGVkX1+3YclRcXbkUh96qRoz7HJ3SWR4pIsq3+hp8U3ulbIvyft0eReIRarQ6nIiLTOsL85XzJ2Pk73TY2IiXCNeF+9IZqEVR+mtPFg=":"223"
,"3,U2FsdGVkX18QpBqRQpAVgTe+LiCXXNFHUL3KjaiJgBHPFDZ6Fsney0krHDr+TXy6Dnph2mGBLw99U0jvp93Sepg6j6dHa+S/DDoj8I9kth8=":"224"
,"3,U2FsdGVkX18GU41aJsxx3tA3JBglaTHrmyP6otrRxYTXm0VVSJGVs4k5QVGQXcnAmJRUl63JV8HXUbjzMn3eo6EZXuDIMRYxMyv2KLIS0Mw=":"230"
,"3,U2FsdGVkX1/GQKUryEsl4f15mQEjysgjF+SD7s073cqB0Sf0NpdVXBsghgGO77ZicVLOlS0pRoPFsVs/6Orjd0qoEeVYG5fU5YZko01IIWE=":"231"
,"3,U2FsdGVkX19k/IiGz/DNuQATKZ+/0W12HK1PMfHsY2rzrqTzeanmUjGCE5NHaZ5id0lEhzKK2wrKsvZKRiH1nlVpyXL+2CyJDmIfrjGqWjw=":"231"
,"3,U2FsdGVkX1+tEWOA/rNBS+1CxryGB9wWTtpHCL5GTHK7A1hijCv8m3TH/RXIlpxEltVDoKb/q+FiHyINvp1dzKPr6a2kVMze+1HLppMmJXw=":"232"
,"3,U2FsdGVkX1/h1C/fY8bclJEK18GvXBViYpq+LOtNevjn38pMCeBmj2+klaSpy3O4xPtypAJx2rFj8H2Bq3WqleNQVR0eEY3HqYZeMg8WpEY=":"233"
,"3,U2FsdGVkX1+bAJUB9gviMd3W0PRhzlXc4wF0i/5cULnHJooB6boSMpVqWAV7IpaGlKhMUgDAogMAPMXYjWhpqwRW9TGEeoL6hGbj6MtF0/8=":"234"
,"3,U2FsdGVkX18UJLby1PuAfwXiHBjubdDWvGw1EGuwXEiYucYFy6Wxs6Uej0VCkPgRIC4xUa0rdJbTAbaBmxAKkZOdLoYa4HaE0YVQ2DaiCdE=":"234"
,"3,U2FsdGVkX19QXrEhd+f55tLANQ6b8VhSgph471E9UdGnBsfFoESQBuullebI3VBD0vhwTiyhkvMOXOuSaoaM9wM5MwbM0klQ/MuKninPtvw=":"236"
,"3,U2FsdGVkX19rY/6aIBgBI3RJuptadV+fRMFgkTPxuNn7E8TEi66OAuO+6PhdtYcHzTF3QR0SKt0yVy9RO7ZdfM2QE6SAKSWlWirDzrFDKv4=":"241"
,"3,U2FsdGVkX1/81xK42tOYKQl9byD44O8qXZBHOAlMuQkrC9aVyh8yIabpP/jGXrziVYIG6BbR6h5zme+gCM1H6m/o3yVE6w3lTjjQ1qh3j8s=":"242"
,"3,U2FsdGVkX1/nPUFYKZWb3Vegx/InCnnaSJaI//dtYywDcFUPIi6R9FgFA3mHuPIH8Z0fQCmgKJ5NNvJDXno39DgDlyBOMdUEEOS0WqtMXyw=":"243"
,"3,U2FsdGVkX1+STJIcMtOWe4y9EG0svevL6dXj8dpuu3GOmtqKcjLf3XICfClWVIHnf9/4idESIYihmkFNDaJEcKwls+H3Cn8RJH1a5oU5F6Q=":"244"
,"3,U2FsdGVkX1+jZXcH4/O2R2nP8czPyWoAkMUwtcGtV/8vRd08XXFAGFUE+P2U1I8GLmmSd5RlqV4t4PDn7oeGCSLN1FzmZBlZf8XFc28VhAM=":"246"
,"3,U2FsdGVkX18HkeFIKbIpFyMib2G7ngI78tQyeZIO/rw1yZtmQpWQlBbOhZVsusbPXxKVdNfWYn43++m4cY5pasu8Nt62gso+IYT7JmU+6OQ=":"251"
,"3,U2FsdGVkX18GLhpNpaxjCs2fAPPPD2jO3C1T/ELn/r3NZKi742fb0FguUIdP03fDVwC04D2KtX2eRnWgjipUdGJzxtDn4z4E/K0aeAP2C34=":"255"
,"3,U2FsdGVkX1/ybyQE8vj8YUt+QzIuYwj8sOtah/OrOAl5XauJEMf0M8lmpSYgzJyuBi0LlMmNMhpBD4gA3JkPB57pRgEzS42ALWtCInrneOY=":"303"
,"3,U2FsdGVkX1/l1/gwz+A7TyahxTQcre2glUjNMXhzHZdUucf/JByexsKb1g9T9IsFhIPSDqA5Bp7CA8QK6aXgEGrENZYWg/auappS8P8Lu1A=":"303"
,"3,U2FsdGVkX1/fMQduM8DPfLDdIoUeX3TSW/xBSe4154chjBw0FVl8wGfbBhczc+WP0MjmZp1OR37ZAgv0RLLP380KzdnfWpL4HUjf6GujvZU=":"311"
,"3,U2FsdGVkX186jCvlUq7rIjU00Avo0ZwB0O1U7s27UGztXImdyi9KdgrX5U5VcLU0Y8atB5JKYAYIIcR0vIyFgNonpF/jeADxjvBYdoO1epA=":"312"
,"3,U2FsdGVkX1/Mj6hAxb20dfeuSGvEjBjH8CLTQpVwa1i2XY/Z4h/dLWNQrUC4QBefA6/Oil/urv6hOd3NLDk+WCYWw74uFdpPNS5s5caXZwE=":"313"
,"3,U2FsdGVkX1928iK5m2ltYNYQjjN7sWz4IO8mJPgew2ULaA2abtNheWHqDlnGfiePSZ1rWtncFNTsBgZqzryIrlbCsFMt5unGutvct4F9EJw=":"313"
,"3,U2FsdGVkX18xe3C/+Wd6mGvgl9xbzAG0xNNSsgdUmrZeK9adpezQAY6cJaQ0JXsdN7S+gqrMyH//RfDsBScOWBs1bfThl9KFDahLbvK6ul0=":"314"
,"3,U2FsdGVkX1+w4JK3xHCB2dcQkhVO6807giliwQEqyl3GkRAoId8KlE+Qih6dfzswP3a988d6vSqfoKp/MCXEqjdR/1Nl+UAq4mVwmxqR8T0=":"321"
,"3,U2FsdGVkX1+y5tXssqFelDhmredQ/Y1ERNrBvI2d13wsIQc+TaQDN+v3bPlHhPlRP9s/B/8KJ19gIWnEso+gPuluus6INVVbPaO+yO2Vh1U=":"321"
,"3,U2FsdGVkX19zCb7HmCAvs9Sfc4oSuqOPeHHcc2rzaci92P27jOfG+FOl14XS+W1sJQXuuMxaFNCXcWeSHBKx8l51roNLi//9gT0pK1UWuwQ=":"322"
,"3,U2FsdGVkX18Owk8FSkoSgdolrKnqO+YO40aN13s6FLb4OEfXzv1RpRyTCFSkX5ZKK7F4VZczafH35wgjYcYGmuLPL2IqBoiwXsz2KGOs2xk=":"322"
,"3,U2FsdGVkX19tgaIyx+di3BSE1c1/r66U+ADJI8m7wc2MdfnKQgDdoVDEudCsu67khNYXI13zSf3nEYanZqgpqgo40pXYhrmP7B8dgdozDI8=":"323"
,"3,U2FsdGVkX1+Ifs0CBBAILIqhac5cBu357LPYFUS8siAXFGKLz1QOPWpQTPHw82tl0M0QYrXsCNDTuRKIPlN4i0c8gZMF2twJPqYYIqk0YG0=":"323"
,"3,U2FsdGVkX18iLYUOMucvMQugz6azCaC1q4tVtUdB0pTY3IG2IOG4Yc+bP3e9+taoQQB74R/4RJ9YeLfbTL/CCC8WyrCV1kaCV2nFiJlym54=":"324"
,"3,U2FsdGVkX1/ZqRLmIvcr8sQoBi2FdiH8ZLt48a0qC1cEepAPFeaJ3pao8sQiHiY2PTh4uN+UUz6GLnBp3HdiDNN1u1mM6j4CzfPwg0P84OE=":"324"
,"3,U2FsdGVkX1+7WVYUI6HntfPGQTAKzXMg9YCkp54I4QzACoTVgB8rWsTEg6cSWTAg4pH61MPm5Ub6beENtDN1lTa6VvvhaEI8b524KitXFvA=":"331"
,"3,U2FsdGVkX1/zfdoQQimDJ2XydVovlHl4WVp+3xgwWjb2DwDmR12GVpg9LS66QdeqT3ExQkcpE1AarWmpr8EwdYAwRDijNhZHNlqsDoFjY1E=":"332"
,"3,U2FsdGVkX19oF23h6I+5RmbDdCYe+vy9LM3imXUrW7L4+HkiSmeG+Cr4ncQvj1dcXmfpfgPkjCNjfv/3ZnPusxGZFAgN5UpVUdtHvVKq0Rc=":"333"
,"3,U2FsdGVkX18Zf4pp3m5/4440YbJoYMLQGf6UTX+7o4X+4ZE7c19GRVAoc+i7aTkjk2EgEeUYA2qDLRhBqcN/J4NQ10+gED0+TrjdmL8yNbw=":"341"
,"3,U2FsdGVkX1+Teg6WmmOJyYOVusH0oNKlBgnEZT0lEAAMiPjOOK2OH6HRZLN1Y+SxlAOXp5cSqa2Uym3GXMJLsf2eaHilEiaMsRBxvwfbwy4=":"341"
,"3,U2FsdGVkX18bKqNGNvOBiwdubb58YlxBVi1PO10kKD/9RBhcoJka4xdnNTFxfN6Z6NcUSX80nGnHslRlcfSlAbtKOyGYcJZKEPTarhB9ECk=":"342"
,"3,U2FsdGVkX19a9ok7bB/50Snh58AOzniFfOwXqHXh7AnX8/i0UhsG1cnXudAVY1T6eyAKztYDGXHbZTZgTBnGInjshl5x4mEkxbar+ncFabE=":"343"
,"3,U2FsdGVkX19QM6Fm6FC/PHvWOS0QK0rtf5CEOvI+kixUnSNawtvDFF+3bJk70PneFGZOBG7DSYg9k1AG3oc6bygumDwZpEW+HHrztELcFJ0=":"344"
,"3,U2FsdGVkX19wDx/qjaqmtO0JdwZqIbOtaWl08OIn8it4E/bpyF/CL7K32N8+2CB+uikQXf6M8uVS+GDAJurnBuhg9FW0y/zHzqV9gs8XcT8=":"361"
,"3,U2FsdGVkX195OHLyvE127wyY1xHGUFPfjQx61MGV8eBQOUhcAWyk2HxUGCBlF0iislefMZOQ8qvE/8RncOy8v7CEVlV+bEyoWcx8pYEPK0U=":"363"
,"3,U2FsdGVkX18ihg94p5ajC/KsFPnkvG5PCjkxD6mZPgrpFpboIVFnos/mNEdEyP2rxpOwN2YrJEOe/ghvH9Ks/0DJRKObwQ2tO4mh1fvdjI0=":"365"
,"3,U2FsdGVkX1+ef6y2AKRSRW0lQS2Dn3E710OYEV+C6TFsrgyODD4QepRHq5PU98Ario1I094UhK0iBYv4uz4bjjO1fEwRc6ridtF0NWGhKQE=":"366"
,"3,U2FsdGVkX1/jSA29xuhEWh0Dl45KtOCFLGEIah03lc6fEzrduuHY15xgl+mllR6BH9th7Nvqj0Z+dFjLqLusypRB5UB7Bi8n0vI7iXn7hOk=":"411"
,"3,U2FsdGVkX181AXPUCNid6LvNzG12H8fgGgMWmf5axlCRuARtUTWFmRM/tc6KzYwlXL0V/Hma3y8ECZCOKUS5cDm04njbEIBzohPzYwDsHzU=":"412"
,"3,U2FsdGVkX19j106MdwbRpPJLSPyAxlOTmR4t1aK8c72OGQiQbD3A4XYU/j1LXbs98zxxsktm/HdxHnlmZjV9YFF0e6/YWDmSpSD+E1A9UKo=":"413"
,"3,U2FsdGVkX18WolZaybNkGjkpPUIMa0OLTt8O7VKD+TJUeJYNCOzsqIymXKO0iZ7T104DrAbMiOnQeF3OJlBWG2Z3H5gM9sye0tlEbx1cY90=":"414"
,"3,U2FsdGVkX1+wixcHgwrrTjPp0m8a5H+inWlI0Dt/OaxoSthcCgj3uchxAjheymiUXFJRJyKtSxQScc1gtJj0nO0QOThGSaHjm38cf1IB7w4=":"421"
,"3,U2FsdGVkX1+n/4SXlMXMf6hasSe4uptIpMTW8u75FZjyWx84ZqHkGPPr6uVFIpdWSYq6MHZl2M4KBVS8sYpbef8U+8KneQ7JqORegegHNcg=":"422"
,"3,U2FsdGVkX19drPbcrHCo5T3jfiiAHAm/30fX4957RPy3hdnlvgk+DS+DrZ3AufGVWMFNgjilpbv8t//LUozL/rkx0i9Qisg0jKZv6BK7T48=":"423"
,"3,U2FsdGVkX1/gkcQWDPnHIGJZwAAme4yNvadT+6ozlvAWvxZgRzLUiQPH03UN+UrrLdCjJ4yCgTJ8kN234HiXprT/ZVeUCdqb/dNzgnO1b/o=":"424"
,"3,U2FsdGVkX18tVoRziCFNpCNwdy2IMrZww1sxfJ4U3kxzIp+//mmUyOW/d9bwr8lPn+9WG9RcPV7fbQQd1USEvA9vzBDE+3stwK85O18nBEU=":"431"
,"3,U2FsdGVkX18TuhLlg281Z53jFqyhlYUCSNML2sYXciUQRQBJ/riN7IWkfAG8dmBIj3AYAb/ShJf20F5kY7yiBKusYEVq5qYMoHHI8XrE9gw=":"431"
,"3,U2FsdGVkX1/q+rgBhDQqNIVL4oRzYxdnl95W+/sUztv65/Zeon+jkGhK5lrw5ptNEGQggderxi2P460a9MrX3F44vQ2lVQtZaq8OPTrQH1M=":"432"
,"3,U2FsdGVkX19lO+qeZvX9mOz5rNxQMTjIJ5npjeL3gA8CK1Rww10SwDRdfjlEBON0d6bBGj9XbKr2lmdvzYv505qP7Ig+90+vrpi2vc20Fpo=":"432"
,"3,U2FsdGVkX1/p6ae+0gRCr2xL3HX9lbF1ITSoaQe2/gOwRl8/F7LLLNCMLXzqlLHO7lnXFEE0qTzxD//Qb1/pueMqu+eQ6/Uu4+RSH7MyCyY=":"433"
,"3,U2FsdGVkX1+eztxpdNIUW6Zwz7aZqrYrynp9WNpkG5n07EgW6DS0kvmqWMVLTXsdyG5frOAIiUobcsXxiHgHglyWM3v4wD1gvaC8usYVY7Q=":"434"
,"3,U2FsdGVkX19CcBKDI2ZQD+Gt/cq7dS+6ejV6B8BvK1M9jyLTzY9u/zT7q3eRFKpd7ECA9RDcKgj6gcxRz3087WlvbQmMMKpGxV5Z6Eocky8=":"436"
,"3,U2FsdGVkX19teSEWPbnGGhP1kNYTUBsBf5rHI7VCmfhZGPpNsXLcAxlX2AhNmJSbI7kGDFApjZerqYKGEIOA/WIILKSOzCAxmfHDmwo7+Q0=":"441"
,"3,U2FsdGVkX1+opoRRAmPt8aIWaUPqX7ZnKbkZHEwDSzuwOa6Gp9fZDpbtafx5qklE+n3M+0tvDvQWhOGeeeuzqr9N3oMLcd9h8k7l91A8IH0=":"442"
,"3,U2FsdGVkX18BbyKjnQ6jQ2ZiF8TO8CF4aVh0ywhKgGcUU3IUSmnb2mQtXTYtzdaqLrmpRbAFug4zRCexAxsX4+aJo1z74Px/546b4Vodx3Y=":"443"
,"3,U2FsdGVkX1/SOrO2Uj7Qi7NtcGJ3KD2aHzQydxuftlClYcM210NhpvS/exVI2cgkSBhDmmO+DTrTukrr9l76rJY8P52GZTYTWGmZUs620xM=":"444"
,"3,U2FsdGVkX1+SdOF2/x8+MqQTYqVT+/hY3YlppikQ4oYG6mBwxNU7Gi+xaXTS/b9bEiCkpoaTN1PwHVp7KECNxUHA10yZeHfO5WUzRRzpzQg=":"451"
,"3,U2FsdGVkX1+YcNrZfjR1eaR16eg+2jJv8GIeMjqC0A1+SUylKLeykIIGGIfVBUtcYCTKQe5jQzAI8zSk+2/R2zC1/P9VsxveWsHqu5POpzE=":"452"
,"3,U2FsdGVkX1+uUDR9WpEO7/YIyQoOSDmV7fpKEq71Gp9Tgn/JKRi+o1h3EwzpEhTAR/2oIOnJ57hfsYOvsgzAUHD3OeFJhglN5MxJPpF9uAQ=":"453"
,"3,U2FsdGVkX19dLtLIdD3OsIEuxNi67sfO/f/8r6azrnbFNDdvxTG9zjc+enKB4Q31OdWtbpnJ+taSqBFOfeEdsntaUK0u/VVW9tODSnnQ++E=":"455"
,"3,U2FsdGVkX19IBq9ccWhsjr9ByyZM7vDc/10iHNKKiFZw73XUDUcYf/0JX86HBa2ImG92dMWUl4tKxTjQyrsR1VCqqfuQuiruoj5Ooz66Bx4=":"456"
,"3,U2FsdGVkX19dp5UV8vbdjczXnbnoUoNJsa0txgHkKrQ2lZ6ymVzehyypBlu9kYXqExtBhAGBOAIa6fGGsHyMzx8lPT8/uZtY3rOjld4RjvY=":"503"
,"3,U2FsdGVkX18W3Kb/aDzPMio8nsEzkv1KzD2ZZn0jlzHJ62xokgX9KSkRLAD0xR5XWwCyI3Ws3QfhLMc319aSQ68B+f8dojF62ffRE170amc=":"531"
,"3,U2FsdGVkX1/E3al0h1GsV7mMXPgFliwc0m5xwvcxl+Z+3RUFSBfERz7jHcp4KBiKofUuwKJxNREUd+qRBmftFUimzYFmoTlqcI6Qd77AOjI=":"543"
,"3,U2FsdGVkX1++ssP6afaMoHYwtdoRRkz/yKHtycD5MxEFja7B39tDnS9VhxaCylmtoRfr4VJkNAChXRazmOkD42419qM1p9c8hYYb/UCZxQU=":"556"
,"3,U2FsdGVkX1/xJqsHXrRRA+/SJgnfx1zfg7qwK1zfNckSykl+9YQ2DzQP9t+fD3iAiNgovk1Z3IwY3kU0h0/kd8DwhY8iPIf0/at4epNgLCA=":"631"
,"3,U2FsdGVkX19c4TjlLiFCtoiP+8pP0AjLGMOsgCIvjBfBIIvxA/nRHw5iJFmoiF9zJW7oKd3QRkzTXNng4rI9Rx1myimZdwzh5ONQudl+wbo=":"636"
,"3,U2FsdGVkX1+O9YzC5+NGDmPagtMEw7jNDT9AA8/5MRZSAUmEDE96pSmhZqt5zt3OhDCJMcCdDdG/ZlAy0sGrGeaSDLSe7souhAtdlDAuW/Y=":"651"
,"3,U2FsdGVkX1+B3G5cbl37Ynv6QDrHUhX4ekbyhMsAsmaCj9ds8clTO8oTsRmea0ISvUG7KrFcn5ls5UF2HVreNAKmqlbWbjNl/xpEj4dAlaA=":"656"
,"4,U2FsdGVkX1/kznSCMDZ5AOZYfJgOpyYVXPlbja0OmKjS5eIsdeTW8aMLiA2oaXgGkHfSEfZyexaYfrQXcYT1BgeanWfgnmljwUCo3TOLPQ4=":"0111"
,"4,U2FsdGVkX19fkYfOhLvf7riNoqW/TVneIsal79QlYrb6rHMB3hLggR0XfXL79m6P+IBT7R5VuTpw+3SuGYIQGrM4k9++rKjDbyQxJ+dLKD4=":"0123"
,"4,U2FsdGVkX1+hstvmhUeiWWmGsFszaKfwwyQ9exy4wMgLE5MaUGsXoBhvB57u4IfWY7A3z5k2ZYlkhILqexAaiAUor79OcNvUtw9dNpz8xpo=":"1000"
,"4,U2FsdGVkX19Doe6bAI/Giks1cwmCh7Mdrp67naL3KY5QG4wrSTiXD2N0WvBO0iZKyRnK0ktlZtB6MJaEmWhQyZrUng8dhc+gn3gjHCBT844=":"2000"
,"4,U2FsdGVkX1/4n/9jKnkd1RAtHHhGhOtXNfvMxoQKLzE1zxcRSiafmyRlsFrPV5MuVTrRGiiMARrPMfMAFSlJ5J5mR9t6pmOrSL8gLHlqD98=":"2100"
,"4,U2FsdGVkX19wR15Y2IhEzhZeFg23J0ObMHTYpeBLjeaFznAF7do1RGmnMRZBd77deoa/e/ai2iXFCO3Ccf+u2eZRhDYEhgX5m6nJjje4kQ0=":"2200"
,"4,U2FsdGVkX1/tDHITjVeE7h62TPc0LWVrsPMOAyfgaoacWC1QQkdDRofFaWeTfqvS3Faau64ZPYTmljoiWtm82+9t5UvtKyujKwELNrdWBPI=":"2201"
,"4,U2FsdGVkX19tRloLqINAC0/+Eqpv1SiGMtVpgiRR+V9tngR4idNH8jpZZ99dN5xKgiUVJhToRBzzrwUFoZ24K0hFWN07kpkK3tBHCezTY4c=":"2202"
,"4,U2FsdGVkX1/vR3AeoFSSFriJy0pCNzX6BJatQOD9jCRKYHkcn1HotEgrbVY6cQodjRpRq5Bm46aIonBeydj+KeQ/WWwDsJmlxKr3qfDzUKw=":"2210"
,"4,U2FsdGVkX1+VxNpb6Cx45262+LpFEa0Dy/8Ddm1tuaSo9O1zAPEwdydNfXqj2LmueJbv+uZlp8nRxI3yTvesewM5vUtB+eS8ti8ADilvZQ4=":"2220"
,"4,U2FsdGVkX19dlOf2Q47qPRZLDG0Kw8TM8oNm/YKhwuc7+16F9/PTKzMRsC1lfYSYV4otDG366tki/S5uXe+TjZ9wW43UcDa4ddu1z/to1Fw=":"2221"
,"4,U2FsdGVkX1/7a3JPWsLzMP7/tPkg12rkkV+y9ojoTZuICWajFUL3ZbWv7O81VA80J9AUH2lkiYz72/tyCWAO5bA7dJX2N5BbVyg1tjG1bVc=":"2630"
,"4,U2FsdGVkX186pbZCQMbcHrltSda7P905jS5IkGrtBwTZ3vI1sUUpsEzbBrC56anZlw8mRucnpgMeoSIyYe2GvhFqpZEAF58+MT5UEB5CyG0=":"4036"
,"4,U2FsdGVkX1/lftUHObvstjbGADuTEhABSm148n0C3GXSrBwtmSJrnfj7vhHGvjJ+stVZNd/wK9uVq2d83WhqETgQZK2NWhS71O3Pk72Sr/o=":"6304"
,"5,U2FsdGVkX1/xF+ZUVL0oQq/FT/UJr4MCH129HEbuFvA31QeIEC31afrWvhUaqb8YbPyZwqp/MXYwv5SCG/infyB0RDEAMZsBJbT5omu2YAo=":"01113"
,"5,U2FsdGVkX1/hJIH5h8Bkbz7Is15G9/Wd1t3M8NvN653/fV4NJ7V/8lKmxzaALZ0CjXMqHZ4JvMSuXsQhuat0+Klc2QxgQ+5ilWNRA+W9WQg=":"01235"
,"5,U2FsdGVkX19FM2kv3ZnzZaOk1w9XWfvVJcNWjLIEesgEgKiiKi8pEYbjQ59ox4XL8i6XRqtKe5SbyKbOGC5kb16vvwp+a29H5N5DG47Bw/c=":"21000"
,"5,U2FsdGVkX1/zrHq2F1pKeO/ZeexAAMsP+7rwUxSb4FZ4SyWgezuzX57ByJlrnpwgNO5EbywUHRsbGgxaPcww0EHEQSusCUvmWpGdjxIarhc=":"22000"
,"5,U2FsdGVkX1+amXGrV7c+2p5e7ArgfkL+E3DbNTsTHCqtlz/EoQPJmnbgexqwBECxvLIwVjdb4M19IHJixykOyzCVn6/9smsyf9X2FeIbxUs=":"22100"
,"5,U2FsdGVkX19rMCAteC/F9ko4tMKhqHmbHBdxxZ6YivGcNdK+nKnwN0jJcilOukS87Osydyw5ebpabagoBcPHQNFWh+v5wYfIG6zepo5tXH0=":"22200"
,"5,U2FsdGVkX1+mGGtWAJ+4YcaoHVMC/QAqaOuknNQvhzi6zTHJywdC5d6s5cZclk9sZ3jAMHMzFXjc0taK5IK7USA+yzv3jnUVt3uc2zCAfX0=":"22201"
,"5,U2FsdGVkX18CcOG+If3dDnhLTcusSTjRSy7m4GuFP49UpMfRa2isNBZRYZYc8VD7zUmxc7WuR+JxclbwCCCqZwLTz0LrxNKs450KllchQCk=":"22202"
,"5,U2FsdGVkX19SRBaYYuCs5rdZQZMAnf78HaODiZEkPLjbD7lLWiQdnKjubduYEoQI14UlTxAYXdTpvA6jHn60RWJnOHqh1LLVMUtPRQFhlqY=":"22210"
,"5,U2FsdGVkX1+k8EQlIUl2qXUjEFDJdMo5ZbVcdbb6MRFhbk1PXwL5NcYPEY45i/8owSDAvCgskUCto489PRBPwyddwvhRQrKBunW6wCfHPoA=":"46135"
,"6,U2FsdGVkX19JECgzfZSKQTbZZ3hgSvm15/2i1fF8VINJINsrjZgHuz8p5MVycxafTXMpMfWxVs5dR98kCJeFtA5R6IgKbo3KxpFKJqPyFSw=":"032032"
,"6,U2FsdGVkX19EsPY/FFWehgwO+yEra++8WfGBoA5gtqMinl3Xxc5m5+VIig5/N7z5egvaaYq7BB5+hyaJnT4UzDOOquldWTDEzKe0J1wuHU8=":"034361"
,"6,U2FsdGVkX18lv5IKTNq4nSI3zUgGSqjssfi/FQr3DnKHryXoNmfoXWFiVnfhs1sPSiTkXx7/h/izdCUXAcYJAkVpJ+Ol8r9gnjuplUq1bDc=":"052361"
,"6,U2FsdGVkX19IxrAhE4295Svp2rwtPNS0v8FKBW2nCmPVoQfO8fmM6j253G/DGfGyOrvPY68Q6ytie38jjK3hpuJOEASH6bdlKH5NG4zTOns=":"131155"
,"6,U2FsdGVkX1+ooIbLwH/UfsAtOopEkOs18dYcSnU2VJOld6UKpbcPH/Jwi1RbHTDRws+pLuCnXoC5I0oSVhXknU0axyfM5zwBOVG5z1u3hpg=":"221000"
,"6,U2FsdGVkX1+bQytZlk/qK6bTI68sENtod/vQ1HdYoKC1uGxihNUXp9KzD1PamtyDlWU5jnVYpWXMvQkxUIRVtO5yBBrQ60QVVHUVe9m5Y3A=":"222000"
,"6,U2FsdGVkX18ayfZUNaw8m+/5lbI8nMMR40OvVzkHRcXMDMRf9CzvjNW/ZGnXmJCKzZjikCuve4vgOmRlG3t6hDHB4Wa/QqXZbTPvlZvzP34=":"222100"
,"6,U2FsdGVkX1/x5DcD+2UOxiSwhxxI1sDeSLJHzYR3CtFza/IjBSmLRtsT1VAdUduPeQQ/SWypVGyXP0IX18VVx8RBqQb9NOEW1Rf28tnGZAI=":"230521"
,"6,U2FsdGVkX1+qqhzVUNiQRaMyT8YgObzOZjJQKZ6vg4PLfHFjqpmoBf83PIwpPZIraFyV0GS6MYFMEWme2ceIh/XwyeA/eI2ZEA6WpjJgLsI=":"305431"
,"6,U2FsdGVkX1+vM0y2YMLdyzavxvKpTfrT6E0TFzRYVAifUcpfiuFnkxozWvbQxt826lCKC2eFCpqrml93faqQ34CF84cJhGUtN14MoXeMEg8=":"363115"
,"6,U2FsdGVkX18Ym3Ou2OUNQbSkojOI8fNLiVvBrOF1MUGCj8iMTpMGeHkoNDKnlnu9u+f3WSIdndIg7Zi2Hv/ERmAm9+dCtatvsOSxJdGBXJw=":"365113"
,"6,U2FsdGVkX19nUuw60RzV7bKiNI4ZkwD02aRTenePrjnNnfynDNJXbPaST3AV1NNdK0Yt8nPFmH0+hTbiOPZ+n+36gUSN+D3aeMNH3ld911s=":"403614"
,"6,U2FsdGVkX19wunEzZFkcj856QgXmvXhZRMvdCzLQWS84Hf+lT7/4MYJfQl4liujmWKz9ATgsfzzthXJNhE6n6ITIHIWpVSD0JUmKEPGYqeE=":"425343"
,"6,U2FsdGVkX1/sPw7KhVhcHBXP6/65ga0RjEdUBIGQm4Ft4UQQJu4hy2g4/elmeJrsaIZr91nAADMZe/rvmiCH4wof9kEl1QleTwP1C3iwi8M=":"432231"
,"6,U2FsdGVkX1+EmVfbgghBB2xV53lMUtrrE7M49M6ap0vm/NFCv6QyCGY90G4t831H7HGy7Q2q1UqYOvjHl5awJ1mK4+9WUZ+d4rjGGgQjqA0=":"432251"
,"6,U2FsdGVkX1/uDHYoZxgHs+QSh4AUMldyT2zUMjmQV1CqxM4/iaEqO81FMhhsWiexJSeGxlxsKgW47mkr5VMZ4Q/Bw3aWpKw03tHakRyhFY0=":"434556"
,"6,U2FsdGVkX1+6YDXVUwHb+AGvGlQbZf+4aINiPcMxd892DFuDD7QbT5bonrVtgOi7jqBveyZEetOUe7YIcKjwWABj7emtECg0uqKDVICISvo=":"436156"
,"6,U2FsdGVkX1+PXYsTBseOFxhIB4Qc/3YhnImOADYvayA4o9Cu9kvCBTlVL9+VChYdhA8WWIG9M74/XCt52jadPY6uwTQVR3s0Q3OsPbHKoWg=":"436336"
,"6,U2FsdGVkX1+fmR4s4BUO8pie9tnvLKn5g00jYUBFbKzGw9/E4c6uPs3qSmX3KQl1cp9pM9yJ2p9U2/ATw1IhgwYAsFizjc+Y1K3vYWc7bDk=":"436436"
,"6,U2FsdGVkX19Fw1alFTG5C4JaHvnalHrPanJvyE3oum/tLzSZyt9/NRp3W29VRrF9anasOGo5kSajPJrqbzh6ngUQKKq+nNIYO5BJFF8Hb5A=":"436651"
,"6,U2FsdGVkX1/CFkt71SdF7iqEAfDnTTzcPraAhvqr2/4Am3F2K6B+uKV7wguabD5R5Fa+/gebyNzCL8AIe/A6y43hYrEpduSbtCQTuHt1MrQ=":"436656"
,"6,U2FsdGVkX18ZxZW8acbICVVWv4p5bVA47qCHrZF4+IIXvXO43QnX/AUR03Bdt0ebtBTStOjB93QEIemfc3cvpQLGxMRyaG3MLe6SI+Yoki8=":"451156"
,"6,U2FsdGVkX1+zHX1PdKNLR44+3YX/kg0Ts7OuOtxthtD+znTDgnOQw3VlcBRzfwjgNJErBMwe/p2ff7f9R30SKl71m8xhGGtnuIpXszUvuow=":"454556"
,"6,U2FsdGVkX1/xmhnCqfgeRDvoJyb0PxkQTN79PJxVW65vHralPlNGTwnWIM6iOF7dBJy8deE0NIaLMgDA9C+5MxvOHjSWCjWu+fM0QHge3ps=":"541305"
,"6,U2FsdGVkX19qlGz5ejHW9hTR3UTsI4LUQZ93PL60qkhq95dhWi7KgXUfNFfz+ULgp6xcJQLjwzNr+2EFEUtacIBdVWgm9/YLX4/ZhPkmNm4=":"541361"
,"6,U2FsdGVkX199/xzua4Jx2m0P+aUgcfrxVBSkoIyun2gouxJw5rCQ5HEDTniSOaDZ/+xMPpB0LxYBvae8tMsDaLxAXlZVDTvCGSsIvfIhsUQ=":"631361"
,"7,U2FsdGVkX1+SMw2qNhYMqGNpGSptcVOxFeVOJuhw2D5TF+4kMttf/noSTA+o4bqWWt00X2ohqRULERY5hBnZ1HOY/3yYb7dV6VaeGTUAnQI=":"2011064"
,"7,U2FsdGVkX1955YitpOOv0emY4D6g6Q1bU432sSMYLZt0RBC7EofB7Swwdu5HGZsoQ5K6Jlynh4O0DIGQ3kRAf5bEpF/nHLTBQBPGUasBDhk=":"2221000"
,"7,U2FsdGVkX193aHPlfaFuV6j8O3FbZL3jtk0WlO1EWfgqnOmx8ftbqVVW8S8nF79tmRo+K1eYE5a92JOzGXGi6vg0SD85dp0mZlFPnZZb41M=":"3210564"
,"1,U2FsdGVkX1+YbVDkml7bWZqqrNcznMc3PpBVULD6M9dmmiU8oQ/I8XyWF1HxhA6Q3SPiksd1/TefrPnzoNnGT0OALbHqB6hZnlx/OOazvdg=":"7"
,"1,U2FsdGVkX1+HnckL9pZn1kp7lFzY2l8Dfw3WtCGqAwt6MKgKyFDe3ewb3bAriDJYSeg6Ws5XmsbsFL8Ku4hd01Ka9038433KdwCvJ/fL5fo=":"7"
,"1,U2FsdGVkX1/rbDs0BG2KM1DzRKZl4EE/m0m0FTGuF1QkiEo23EsmOSIFuHwfMFDi4Y+7YOfFD46/hkbeQrOIO2tQ7AghvzGKWePnsEq6XDM=":"7"
,"1,U2FsdGVkX19v0eMBAjPg09GHQHvNCVkttIm6NdKjPyA3I5tRCnJvX1m/TVCt7EHz8uIxCJ4tKUx9zWrN5bJ8bheBM+rmIAFVhik2wM0zeJE=":"7"
,"1,U2FsdGVkX19FlRhQ9qq5Yp9VKT8GfCBMYKlF6Q44HHnUt9foNpPne9r21t+lNGXsKJyEBbfdVbVSS5UGfRhscXClB1Ph3aRXq7EEHTjzFRY=":"7"
,"1,U2FsdGVkX1/RUkTEuwsjOdaLI7Wolxo5yTEB8WQHTLt73Owddeda+wRxCMGW8AkkPmP1fUh4tKFfbexyM1DnJErIBWUiq/QNRQBkZFn7ix0=":"7"
,"1,U2FsdGVkX19NOHhOABZX7Ej+oe92gDl7Z4tLnn0xr7pmuHDlc+KTUN1Hx996CmVwJwbcV2wePlO1Wo85S2sELTdv77NxM9gneFK3p2WoI8s=":"7"
,"1,U2FsdGVkX1+ICtOKTolljZfUC4aW4dzoL3TYYiNP5QY/SjFtGIm/Tn9Rgct2NEWesIWZ2d6tpH3ie9voYpUH9d2zH4QDrCgKVA0kt1Sn5ow=":"7"
,"1,U2FsdGVkX18twJPWgY6LxfRYmEeBOqkcUq1O1R75bUsqXYXFCQ+0C+066P5x+pffLtG5iYWbpDK8KRA9AFNW4/0FqACAs+/fy38P1d8lc+I=":"7"
,"1,U2FsdGVkX1/KqVDNRdxsHUm1sNNVA/VpOv58PUrLDktHmnafXFqzvfGreBcrLaFYRPD9T1MsYZ26/MThxYoSScc+41tGeWc/x927QpRSGXk=":"7"
,"1,U2FsdGVkX1+7lCRpDb3h55vRfd8ZySh53Nh60f0llrmETcz5D+jWvkilAKvTn1YmNXmPEgwAes1LGWaNrOx4ViXv1eC0XuxqKZo8YYjV4uk=":"7"
,"1,U2FsdGVkX18QP41Mh1UNNXuWmcyBxTo8KQFMgImiCPViAPo6tJ3Pjflpi+HwUQJyJAcadE2VYD1MOhB68rpWnOdGISkaUvuA0xen9DZnjHI=":"7"
,"1,U2FsdGVkX19Tme2JKZcN+vGg04+OTvp4CoCpGThcHIEk2XaCxG+hqA5ttChcaR3EGxJqyTATaiTZKN5NyiZDXLMaNHUsWZyOnsEyPMIzRKE=":"7"
,"2,U2FsdGVkX19EyQYkm9L+2YiRdmYq0ah/N1aZv7D1ITznAEehtSh7w6kZOeolyjQN5cfKhuuK2xVY75HpEZcR686bxHSOAwndExn3ojLSW3U=":"47"
,"2,U2FsdGVkX1/ZoD4NIIyWxdvpNnY2/wLTJIlCLhQfRfOL0Nja8Acaxk5ZHgO6q7I1oA7FV5bfycMs14Suid7vU5EDBxrwLeCil2uJWf2tLpk=":"57"
,"2,U2FsdGVkX19Ezo17rrE1lVYAItlCYxVDSJ0bWbIJxfuc/C7bLvQ892RkZfgN6bs3fGbL5XGN3L+pgby1WMfl8fQTbeQcuEJ5scrMcGwYZbw=":"67"
,"3,U2FsdGVkX18vggjeNsOP9YPqVlXkxFXUcZ7fcMquHIhXQUA2QmrXfmksSTbD3H08mM7JdD8cs4rG+gRRDcLp66RWaDmPXIqWwi5v3EJc8tE=":"246"
,"4,U2FsdGVkX19uhYmedXOggm95A5Pl71/CauSrWyySjDbBOQVmZfI2/teBgoMQuiAwQkeASEN62oTt1L843rjlopMMqOJUUvpcCPMRdU/dpT0=":"2630"
}
```

</details>

## 墨瑟星球生物鉴定

JustHunt也要有自己的迷宫饭！这题的解析怎么能没有推理过程呢？在没有摩斯限制和购买提示的情况下，我一次性推出了100%正确的食物链，有被爽到。以下是重建的解题过程。

<style>
.animal { color: #C71D31 }
.plant { color: #342DDC }
article > ul {
	border: .4pt solid;
	padding: 6pt;
	margin-inline: 2em;
}
</style>

本题首先要做的事是根据捕食关系拓扑排序。虽然本题是一道无法团建的题，但是拿出纸笔来做并不是最方便的选择，因为没有套索工具来移动子图，随着推理进程推进会频繁地发生构图混乱，还是电子笔记工具比较有效。我最初选择在电子表格中以邻接表格式记录每种生物的食物。稍微推断数个生物后发现，一种生物只有一种食物，但可能被多种生物捕食，因此食物网形成树形结构，此时可换用思维导图工具，或在文档中以缩进表示供养关系。思维导图和带缩进的列表本质上都是树形结构，相关软件为绘制本题食物网提供了非常方便的操作方式。不过我为了以防万一，直到最后之前都在电子表格中进行推理，导致硬是推完了整棵摩斯树才看出端倪。

---

<blockquote><dl>
<dt>Epiphyllum<br><span class="plant">昙花果</span>
<dd><span class="plant">昙花果</span><strong>是这个星球上唯一一种不捕食其他生物，仅作为生产者而生存的生物</strong>。……
</dl></blockquote>

这是食物网的树根，所有食物链都由此开始。与昙花果有关的生物有不少，它们的进化过程与昙花果的特性息息相关。

<blockquote><dl>
<dt>Epiphyllum<br><span class="plant">昙花果</span>
<dd>……它萼片十分坚硬，不能通过一般方式打开，在白天闭合，夜晚，当萼片受到一定程度的月光照射后，会慢慢展开，其中果实状的受光体，即<span class="plant">昙花果</span>露出，接受月光进行光合作用。足够的光合作用后，受光体会自然脱落，脱落时会从脱落的部位释放种子孢子。但是，<span class="plant">昙花果</span>对月光极为敏感，若受光过强，<span class="plant">昙花果</span>则会坏死，无法脱落传播种子。……
<dt>Beam<br><span class="plant">束光蕨</span>
<dd><span class="plant">束光蕨</span>具有很强的趋光性，能快速攀着光束生长并进一步吸食光源生物。曾经，<span class="plant">束光蕨</span>以<span class="plant">昙花果</span>为食，……
<dt>Lunar<br><span class="animal">月光鸟</span>
<dd>由<span class="animal">日光鸟</span>进化而来。<span class="animal">日光鸟</span>的翅膀可以在白天贮存光能，并在夜间释放日光，以此让<span class="plant">昙花果</span>受光过度而坏死并食用，害得<span class="plant">昙花果</span>一度大面积消亡。……
<dt>Transparent<br><span class="animal">透明蝇</span>
<dd>原以腐坏<span class="plant">昙花果</span>为食，通过透明翅膀的精密结构和团体配合可以汇聚月光使<span class="plant">昙花果</span>受光过强而腐坏，……
</dl></blockquote>

在昙花果还未进化出喷射麻痹素的能力的元初，日光鸟、透明蝇、束光蕨都以昙花果为食。日光鸟和透明蝇有加速昙花果烂掉的能力，束光蕨还停留在等待昙花果自然脱落的版本。

<blockquote><dl>
<dt>Beam<br><span class="plant">束光蕨</span>
<dd>……此后<span class="animal">日光鸟</span>和<span class="animal">某种动物（透明蝇）</span>与<span class="plant">昙花果</span>建立了光线联系，于是又以<span class="animal">日光鸟</span>和<span class="animal">这种动物（透明蝇）</span>为食。……
<dt>Lunar<br><span class="animal">月光鸟</span>
<dd>……因此，同时代以<span class="plant">昙花果</span>为食的生物开始捕食<span class="animal">日光鸟</span>。……
<dt>Transparent<br><span class="animal">透明蝇</span>
<dd>……在与<span class="animal">日光鸟</span>的竞争中，进化出汇聚<span class="animal">日光鸟</span>的日光并反射回<span class="animal">日光鸟</span>的能力，以此杀死<span class="animal">日光鸟</span>并以其尸体为食。……
</dl></blockquote>

由于日光鸟吃得太快，透明蝇开始吃日光鸟；由于日光鸟和透明蝇吃得太快，束光蕨开始吃日光鸟和透明蝇。

<blockquote><dl>
<dt>Epiphyllum<br><span class="plant">昙花果</span>
<dd>……因此，它们进化出一种能力，如果<span class="plant">昙花果</span>坏死或被破坏，就会向外喷射“麻痹素”，让特定的天敌麻痹甚至中毒死亡，保护附近的<span class="plant">昙花果</span>。
<dt>Beam<br><span class="plant">束光蕨</span>
<dd>……随着<span class="plant">昙花果</span>进化，喷射的“麻痹素”对<span class="plant">束光蕨</span>有害，因而<span class="plant">束光蕨</span>不再以<span class="plant">昙花果</span>为食。同时，<span class="animal">这种动物（透明蝇）</span>也在进化中断开和<span class="plant">昙花果</span>的光线联系，<span class="plant">束光蕨</span>便只以<span class="animal">日光鸟</span>为食。……
<dt>Lunar<br><span class="animal">月光鸟</span>
<dd>……<span class="animal">日光鸟</span>逐渐考虑可持续发展的问题，同时<span class="plant">昙花果</span>也进化出喷射“麻痹素”自卫的能力，<span class="animal">日光鸟</span>便开始进化成<span class="animal">月光鸟</span>，但外形基本没有变化，唯一的变化是能在夜间将日光转化成月光再释放，由此能加速<span class="plant">昙花果</span>成熟脱落再食用，让其能正常繁衍。此前以<span class="animal">日光鸟</span>为食的生物，逐渐以<span class="animal">月光鸟</span>为食，而放弃了进化出自卫手段的<span class="plant">昙花果</span>。
<dt>Transparent<br><span class="animal">透明蝇</span>
<dd>……此后<span class="plant">昙花果</span>进化出喷射“麻痹素”的能力，导致<span class="animal">透明蝇</span>无法以其为食，便转向以<span class="animal">日光鸟</span>为食，但仍有许多<span class="animal">透明蝇</span>因想吃腐坏<span class="plant">昙花果</span>而丧命。
</dl></blockquote>

由于被束光蕨、日光鸟、透明蝇三者同时吃，昙花果开始喷射麻痹素，束光蕨和透明蝇都不再吃昙花果，只吃日光鸟。只有日光鸟进化成了月光鸟，还在吃昙花果。文中没有日光鸟一节，可以认为日光鸟现已灭绝，月光鸟是日光鸟的平替。

<ul>
<li class="plant">Epiphyllum 昙花果<ul>
<li class="animal">Lunar 月光鸟<ul>
<li class="plant">Beam 束光蕨
<li class="animal">Transparent 透明蝇</ul></ul>
</ul>

---

<blockquote><dl>
<dt>Addiction<br><span class="animal">上瘾兔</span>
<dd>生活在<span class="plant">昙花果</span>附近，但并不捕食<span class="plant">昙花果</span>。<span class="plant">昙花果</span>喷射出的“麻痹素”对其他生物有麻痹作用，但对它们来说会产生快感。因此历史上它们会很期待<span class="animal">日光鸟</span>和<span class="animal">另一种动物（透明蝇）</span>的到来，因为它们会促使<span class="plant">昙花果</span>喷射化学物质。然而，<span class="plant">某种植物（束光蕨）</span>会攻击<span class="animal">这两种动物（日光鸟、透明蝇）</span>，于是它们会捕食<span class="plant">这种植物（束光蕨）</span>。之后<span class="animal">日光鸟</span>和<span class="animal">另一种动物（透明蝇）</span>因各自的进化路线几乎不再刺激<span class="plant">昙花果</span>，上瘾兔自身也对这种物质产生耐药性，但捕食<span class="plant">这种植物（束光蕨）</span>的习性却保留了下来。
</dl></blockquote>

这种生物是在昙花果开始喷射麻痹素后诞生的。按进化史将生物名填入，就能得到上瘾兔的食物是束光蕨。

<ul>
<li class="plant">Beam 束光蕨<ul>
<li class="animal">Addiction 上瘾兔</ul>
</ul>

---

<blockquote><dl>
<dt>Beam<br><span class="plant">束光蕨</span>
<dd>……<span class="plant">束光蕨</span>能沿着光线快速生长，是因为其含有的“光催素”。这种化学物质对其他生物几乎没有影响，但是会随着食物链富集，可能会使其他生物产生趋光性。……
<dt>Rainy-night<br><span class="animal">雨夜虎</span>
<dd>取这个名字是因为其形态像老虎，并常常在雨天和晚上出没。究其原因，我们在其体内检测出了大量的“光催素”，在早期可能由于趋光性影响捕猎，而选择避光生存，致使其现在只在雨夜出没。是肉食性生物。
</dl></blockquote>

雨夜虎的食物链上富集了光催素。题中没有任何类似“某种激素”的叙述，因此只要搜索全文就能找到与光催素相关的生物，只有束光蕨生产光催素。雨夜虎是肉食性，不会直接食用束光蕨，而是通过捕食上瘾兔间接摄取光催素。

<ul>
<li class="animal">Addiction 上瘾兔<ul>
<li class="animal">Rainy-night 雨夜虎</ul>
</ul>

---

<blockquote><dl>
<dt>Beam<br><span class="plant">束光蕨</span>
<dd>……<span class="plant">束光蕨</span>最早诞生于“深渊裂缝”，一个细长而深邃的裂缝，外面的生物进不去，里面的生物也很难出来。但得益于“光催素”，也为了避免被裂缝中的生物捕食，群系很快就逃离裂缝发展。
<dt>Base<br><span class="plant">基底茅</span>
<dd>生活在“深渊裂缝”里，每天靠短暂的阳光生存。十分需要“光催素”刺激其生长，但是其无法自己生产。艰难的环境让其进化出一种神奇的能力，它们能提取自己的遗传物质再重组，以此创造出为自己服务的生物，也能借此实现跨物种交配。
<dt>Machine<br><span class="animal">机械蜂</span>
<dd>同样生活在“深渊裂缝”里，具有飞行能力，但飞不高，至今从未飞出过裂缝。取名“机械”并非因为它有机械结构，而是它们无欲无求，很机械地生活，在裂缝中筑巢，为<span class="plant">基底茅</span>传粉授粉，当然它们也同样渴求“光催素”。我个人认为它也是<span class="plant">基底茅</span>生产的生物。
<dt>Naive<br><span class="plant">天真蓬</span>
<dd>是<span class="plant">某种植物（基底茅）</span>和<span class="animal">某种动物（机械蜂）</span>通过某种神奇的方式跨物种交配诞生出来的物种，不具有繁衍能力。它们继承了<span class="animal">某种动物（机械蜂）</span>的飞行能力并青出于蓝，能借助翅膀状的叶片飞出裂缝，但也继承其机械性生活的特点，专门捕食<span class="plant">另一种植物（束光蕨）</span>，然后返回“深渊裂缝”，它们不知道的是，那里正等着准备食用<span class="plant">自己</span>的父母。
</dl></blockquote>

描述中提到深渊裂缝的生物只有上述四种。根据深渊裂缝的描述，其中的食物链关系应与外界隔离，所以虽然基底茅和机械蜂与光催素有关，但是雨夜虎吃不到它们，能吃到的只有上瘾兔。

基底茅和机械蜂活动范围受限，只能吃到深渊裂缝里的东西；天真蓬是唯一能沟通深渊裂缝内外的生物；束光蕨从深渊裂缝中诞生后离开，很可能在深渊裂缝附近有种群。只有基底茅能进行跨物种交配，机械蜂为基底茅传粉授粉，所以天真蓬是基底茅和机械蜂杂交产物，继承了机械蜂的飞行能力，在深渊裂缝外采集植物，自己作为基底茅和机械蜂的食物。基底茅和机械蜂都需要光催素，只有束光蕨生产光催素，其食物链上级的上瘾兔和雨夜虎都是动物，所以天真蓬捕食束光蕨。

<ul>
<li class="plant">Beam 束光蕨<ul>
<li class="plant">Naive 天真蓬<ul>
<li class="plant">Base 基底茅
<li class="animal">Machine 机械蜂</ul></ul>
</ul>

---

<blockquote><dl>
<dt>Kaleidoscope<br><span class="animal">万花茧</span>
<dd>是一种神奇的<span class="animal">动物</span>，因体内复杂的透明折射结构而得名“万花筒”。不过这些结构并非是其器官，而是它的食物。……因此，<span class="animal">某种小型动物（透明蝇）</span>就成了它首选食物，既能补充动物蛋白，又能借助其折射结构来汇聚光能。
</dl></blockquote>

万花茧吃某种小型的、具有折射结构的动物。没有其他任何动物显式提到折射，但透明蝇的描述中提到其透明翅膀可以聚光，最符合折射，所以万花茧吃透明蝇。

<ul>
<li class="animal">Transparent 透明蝇<ul>
<li class="animal">Kaleidoscope 万花茧</ul>
</ul>

---

<blockquote><dl>
<dt>Kaleidoscope<br><span class="animal">万花茧</span>
<dd>……<span class="animal">万花茧</span>需要动物体内的蛋白合成一种维持其生命的必需物质“动凸素”，而其核心又有一个类似叶绿体的结构，需要吸收光能合成另一种生存必需物质“植凹素”。……
<dt>Absolute<br><span class="animal">绝对蚕</span>
<dd><span class="animal">某种动物</span>进化而来的动物部分，能自己合成“动凸素”，却同样需要“植凹素”才能生长。在早期，<span class="animal">绝对蚕</span>和<span class="plant">相对荇</span>为了取得另一半的必需物质经常互相厮杀，但很快双方便意识到这么做只会两败俱伤。而它们很快就想到，<span class="animal">某种动物</span>本身就可以同时满足它们双方的需求，便开始捕食<span class="animal">这种动物</span>。
<dt>Relative<br><span class="plant">相对荇</span>
<dd><span class="animal">某种动物</span>进化而来的植物部分，能自己合成“植凹素”，也同样需要“动凸素”才能生长。
</dl></blockquote>

与动凸素或植凹素相关的生物只有万花茧，它符合同时提供动凸素和植凹素的动物的描述，是绝对蚕和相对荇的食物。

<ul>
<li class="animal">Kaleidoscope 万花茧<ul>
<li class="animal">Absolute 绝对蚕
<li class="plant">Relative 相对荇</ul>
</ul>

如果只看本题内容的话，绝对蚕和相对荇进化前的动物只能是万花茧，因为只有万花茧同时具有动物和植物的特性。不过更可能的是进化前的动物已灭绝，所以本题没有收录。

---

<blockquote><dl>
<dt>Eden<br><span class="plant">伊甸橡</span>
<dd>这种橡树会观察附近的生物尸体，长出类似形状的果实，不少果实经过一段时间会膨胀爆炸，……
<dt>Yeast<br><span class="animal">酵母虫</span>
<dd>这种虫子会钻入果实中，在果实内生存繁殖。同时这种虫子在产卵过程中会分泌一种酶，最终会导致果实内像发酵一样不断产生气体，达到一定程度果实就会炸开，<span class="animal">酵母虫</span>的卵和幼虫得以飞溅到其他的果实上继续生存。 
</dl></blockquote>

与果实爆炸相关的生物只有上述两种，故酵母虫以伊甸橡果实为食。

<ul>
<li class="plant">Eden 伊甸橡<ul>
<li class="animal">Yeast 酵母虫</ul>
</ul>

---

<blockquote><dl>
<dt>Eden<br><span class="plant">伊甸橡</span>
<dd>……传播种子的同时会发散尸臭，吸引以该尸体为食的<span class="animal">食腐动物（透明蝇）</span>来偷食“禁果”，因而得名“伊甸”。树枝分泌的粘液不但会粘附生物，还能将其慢慢溶解，转化成养分吸收。
</dl></blockquote>

食用尸体的生物只有透明蝇和催产榆，其中动物只有透明蝇一种。

<ul>
<li class="animal">Transparent 透明蝇<ul>
<li class="plant">Eden 伊甸橡</ul>
</ul>

---

连接到此为止的食物链片段，月光鸟一支的食物网已编织完成：

<ul>
<li class="plant">Epiphyllum 昙花果<ul>
<li class="animal">Lunar 月光鸟<ul>
<li class="plant">Beam 束光蕨<ul>
<li class="animal">Addiction 上瘾兔<ul>
<li class="animal">Rainy-night 雨夜虎</ul>
<li class="plant">Naive 天真蓬<ul>
<li class="plant">Base 基底茅
<li class="animal">Machine 机械蜂</ul></ul>
<li class="animal">Transparent 透明蝇<ul>
<li class="plant">Eden 伊甸橡<ul>
<li class="animal">Yeast 酵母虫</ul>
<li class="animal">Kaleidoscope 万花茧<ul>
<li class="animal">Absolute 绝对蚕
<li class="plant">Relative 相对荇</ul></ul></ul></ul>
</ul>

而在星球的另一面，有着许多拥有精神控制系能力的生物。

---

<blockquote><dl>
<dt>Breakfast<br><span class="animal">早餐蝠</span>
<dd>这种蝙蝠是夜行性的动物，白天睡觉，晚上活动。奇怪的是，在夜间它们完全没有任何捕食行动，只是在繁衍生息，为新成员衔土筑巢。也许在他们的世界观里，睡觉就能补充能量，但实际上，他们会在白天大量地进食，甚至不少蝙蝠会因进食过多而撑死。
<dt>Lodge<br><span class="plant">寄宿藓</span>
<dd>……于是它们借着<span class="animal">某种动物（早餐蝠）</span>筑巢的时候，附生在其身上。它们会不断向<span class="animal">这种动物（早餐蝠）</span>传导饥饿的信号，促使它们疯狂进食甚至撑死摔落到<span class="plant">寄宿藓</span>幼体附近的地表。不过它们并非肉食性生物，<span class="animal">这种动物（早餐蝠）</span>只是采集食物的工具罢了。
<dt>Oxytocin<br><span class="plant">催产榆</span>
<dd>生长在<span class="plant">某种植物（寄宿藓）</span>幼体附近，与其达成一定的互利关系。<span class="plant">催产榆</span>会在夜晚散发催产物质，激发<span class="animal">某种动物（早餐蝠）</span>生产欲望，以此推动其筑巢，帮助<span class="plant">互利植物（寄宿藓）</span>完成附生。借助<span class="plant">互利植物（寄宿藓）</span>的力量，<span class="animal">这种动物（早餐蝠）</span>会因为过食而亡摔落到附近，<span class="plant">催产榆</span>会用锋利的叶片割开动物尸体，让<span class="plant">互利植物（寄宿藓）</span>幼体获取其内的食物，而自己则以<span class="animal">动物（早餐蝠）</span>尸体为食。
</dl></blockquote>

早餐蝠有三大欲望：食欲、性欲、睡眠欲，而在这三大欲望当中，食欲和性欲分别是被寄宿藓和催产榆操控产生的（悲）。能撑死的动物仅此一种，所以非常确定。注意寄宿藓虽然依赖于早餐蝠，但它们并不吃早餐蝠，食物链的下级是早餐蝠所吃的某种植物。

<ul>
<li class="plant">??? 某种植物<ul>
<li class="animal">Breakfast 早餐蝠<ul>
<li class="plant">Oxytocin 催产榆</ul>
<li class="plant">Lodge 寄宿藓</ul>
</ul>

---

<blockquote><dl>
<dt>Diode<br><span class="plant">二级菟</span>
<dd>……历史上为了避免被天敌捕食，它们在寄生的过程中攀爬得越来越高。
<dt>Lodge<br><span class="plant">寄宿藓</span>
<dd>在地表繁殖，曾经以<span class="plant">某种植物（二极菟）</span>为食，但后来逐渐捕食不到<span class="plant">这种植物（二极菟）</span>。……
</dl></blockquote>

寄宿藓在地表，吃不到高处的植物。有向高处移动过程的是二级菟。其他高处的生物自始至终位于高处，无法产生逐渐捕食不到的说法。

<ul>
<li class="plant">Diode 二极菟<ul>
<li class="animal">Breakfast 早餐蝠</ul>
</ul>

---

<blockquote><dl>
<dt>Email<br><span class="animal">电邮蚁</span>
<dd>每只<span class="animal">电邮蚁</span>都在以很高的频率向外发射信号波和接受其他蚂蚁的信号波，以此建立十分高效的信息共享机制。……
<dt>Intervene<br><span class="plant">干预草</span>
<dd><span class="plant">干预草</span>又叫插嘴草，是一种非常狡猾的植物。它不同形状大小的叶片可以吸收不同波长不同频率的波，从而对波上承载的信息进行篡改，甚至能将危险的警示干预成温暖的呼唤，以此来吸引它们的食物。……
</dl></blockquote>

其他一些生物也有篡改电信号的能力，但Neurax蠕虫和MITM攻击是科技树两个不同的分支，支持无线的只有干预草。

<ul>
<li class="animal">Email 电邮蚁<ul>
<li class="plant">Intervene 干预草</ul>
</ul>

---

<blockquote><dl>
<dt>Nail<br><span class="plant">钉子藤</span>
<dd>从地下长出地面，其体内含有大量金属成分，外观上看上去就像长长的钉子钉在地上。本来生活的好好的，但这里的土壤不断酸化，令其受到腐蚀。<span class="plant">钉子藤</span>很快发现是蚂蚁尸体的堆积造成的，并找到罪魁祸首，开始捕食它们。
</dl></blockquote>

吃电邮蚁的是干预草。

<ul>
<li class="plant">Intervene 干预草<ul>
<li class="plant">Nail 钉子藤</ul>
</ul>

体内含有大量金属的话，可以当天线吗？足够多的钉子藤可以起到屏蔽信号的作用吗？大概这就是钉子藤捕食干预草的原理吧。

---

<blockquote><dl>
<dt>Adorn<br><span class="animal">装饰驴</span>
<dd>草食性动物，捕食<span class="plant">某种植物（干预草）</span>，也会用<span class="plant">这种植物（干预草）</span>装饰自己。不过它们也发现，近代以来<span class="plant">这种植物（干预草）</span>释放的气味有所减弱甚至不再释放，……
<dt>Intervene<br><span class="plant">干预草</span>
<dd>……长久的进化下，它逐渐淡去了它原来散发的气味，……
</dl></blockquote>

与气味相关的生物有数种，其中提到气味减弱的生物只有干预草。

<ul>
<li class="plant">Intervene 干预草<ul>
<li class="animal">Adorn 装饰驴</ul>
</ul>

---

令人迷惑的是，明明箭头荚吃箭头形状的动物，唯一提到箭头形状的干预草却是植物。

<blockquote><dl>
<dt>Arrow<br><span class="plant">箭头荚</span>
<dd>肉食性生物，只吃箭头形状的<span class="animal">动物</span>，因而得名。
<dt>Intervene<br><span class="plant">干预草</span>
<dd>……并长出许多箭头形状却不用来吸收波的叶片，这自然也是它另一个狡猾的生存策略。
</dl></blockquote>

关于嗅觉的描述也都十分可疑。

<blockquote><dl>
<dt>Olfactory<br><span class="animal">嗅觉蟒</span>
<dd>这种蟒蛇退化了视觉、味觉等大部分知觉，而极端发展嗅觉。漫长的历史上，它曾以<span class="plant">干预草</span>为食，能在千里外嗅到<span class="plant">干预草</span>的味道，迅速靠近，精准攻击到散发气味的器官并吞食，并一直保持这个捕食习惯延续至今。
<dt>Adorn<br><span class="animal">装饰驴</span>
<dd>……但是<span class="animal">装饰驴</span>依然能循着<span class="plant">这种植物（干预草）</span>的气味捕食<span class="plant">它们</span>。
</dl></blockquote>

嗅觉蟒曾经以干预草为食，并保持捕食习惯至今。干预草的气味减弱了，但是嗅觉蟒肯定还能闻到，但是若它现在还吃干预草，又为什么要强调“曾”？没有敏锐嗅觉的装饰驴又为何在干预草气味减弱的情况下仍能找到干预草？答案在另一个提到气味的生物上：

<blockquote><dl>
<dt>Forge<br><span class="animal">伪造蛾</span>
<dd><span class="animal">伪造蛾</span>具有强大的拟态能力，它们拟态的对象是它们的竞争者叶片的形状，且不仅在形态上进行模仿，甚至能仿造竞争者散发一样的气味，以此混入其中分享竞争者的食物，也能借此吸引草食性生物抑制竞争者生长。
</dl></blockquote>

以上是所有提到气味的生物，其中能发出气味的只有干预草，所以伪造蛾模仿的一定是干预草的气味。

伪造蛾模仿的是它的竞争者植物，所以它和干预草吃一样的东西，也就是电邮蚁。

伪造蛾模仿干预草的叶片形状，干预草近来长出了箭头形状的叶片，伪造蛾就成了箭头形状的动物，被箭头荚吃了。

干预草的气味淡去了，但伪造蛾仍留有同样的气味。这是装饰驴仍能找到干预草的原因，而基于嗅觉识别的嗅觉蟒就不会吃干预草，而是吃伪造蛾了。

<ul>
<li class="animal">Email 电邮蚁<ul>
<li class="animal">Forge 伪造蛾<ul>
<li class="plant">Arrow 箭头荚
<li class="animal">Olfactory 嗅觉蟒</ul>
<li class="plant">Intervene 干预草<ul>
<li class="animal">Adorn 装饰驴</ul></ul>
</ul>

---

<blockquote><dl>
<dt>Fantasy<br><span class="plant">幻想树</span>
<dd>我更喜欢叫它“梦旅树”，因为它们会将树根插入附近睡眠的生物，学习他们的神经系统，并操控他们，被操控的生物甚至不会意识到自己被操控，只是同梦游一般。在夜间，<span class="plant">幻想树</span>会操控附近生物为自己采集食物<span class="plant">昙花果</span>。如果树根接入的神经系统过于复杂，<span class="plant">幻想树</span>会立刻切断该树根分支，以避免自己的神经系统过载。如果一部分受到伤害，就会立即通过其他部分的树根植入捕食者中并试图控制捕食者。但是，依然有生物能巧妙地以<span class="plant">幻想树</span>为食。……
<dt>Email<br><span class="animal">电邮蚁</span>
<dd>……对大量信息高速且频繁的价值判断，使其具有发达而强大的大脑，因此<span class="animal">电邮蚁</span>以借助这个优势，以<span class="plant">某种植物（幻想树）</span>为食。……
<dt>Diode<br><span class="plant">二极菟</span>
<dd>这种植物会寄生到其他<span class="plant">植物</span>上。这种植物神奇的地方在于，它可以像二极管一样，调整电信号在其中的通过方向。因此，它可以阻断<span class="plant">某种植物（幻想树）</span>的控制，达到寄生目的。……
</dl></blockquote>

能够吃幻想树的是电邮蚁和二极菟。干预草专精无线电，不能控制生物体内的电信号。

<ul>
<li class="plant">Epiphyllum 昙花果<ul>
<li class="plant">Fantasy 幻想树<ul>
<li class="plant">Diode 二极菟
<li class="animal">Email 电邮蚁</ul></ul>
</ul>

<blockquote><dl>
<dt>Fantasy<br><span class="plant">幻想树</span>
<dd>……即便如此，漫长的生存历程还是让<span class="plant">幻想树</span>找到制衡的方法，它会在白天专一性地控制<span class="animal">一种动物</span>来清理某种捕食者。
</dl></blockquote>

虽然与食物网没有关系了，但是最符合这里被控制的动物的是早餐蝠。幻想树只能控制睡眠的生物，早餐蝠正好白天睡觉，并且早餐蝠的食物正是幻想树的天敌，很满足幻想树的需求。这么说早餐蝠从早到晚要受到三种不同生物的控制play……但幻想树需要将根插入目标生物，所以早餐蝠其实是在地上睡觉的？但这样的话就没有吃饱了撑得掉下来的说法了。亦或者，幻想树的根是能伸到高处的触手？！

---

<blockquote><dl>
<dt>Tired<br><span class="animal">疲惫鼠</span>
<dd>曾经<span class="animal">疲惫鼠</span>因数量庞大而头脑简单，是<span class="plant">幻想树</span>的重要控制对象。不像一般的鼠类，在白天它们会累得走不动道，只能踉踉跄跄地爬行。一次偶然的意外，<span class="plant">幻想树</span>在操控<span class="animal">疲惫鼠</span>的过程中被<span class="plant">某种植物（二极菟）</span>打断，让<span class="animal">疲惫鼠</span>意识到被控制的事实。但其本身又是肉食性生物，不愿啃食<span class="plant">幻想树</span>。为了改变这种局面，<span class="animal">疲惫鼠</span>在进化过程中和<span class="plant">某种植物（二极菟）</span>达成互利关系，它们会在白天捕食<span class="plant">该植物（二极菟）</span>的天敌，然后在夜幕降临时采集<span class="plant">该植物（二极菟）</span>来保卫自己，免受<span class="plant">幻想树</span>影响。
</dl></blockquote>

踉跄爬行大概是被幻想树控制导致的。能够打断幻想树控制的植物是二极菟，二极菟的动物天敌是早餐蝠。

<ul>
<li class="animal">Breakfast 早餐蝠<ul>
<li class="animal">Tired 疲惫鼠</ul>
</ul>

地上的老鼠怎么抓天上的蝙蝠呢？用二极菟保护接触部位，顺着幻想树的触手根系爬上去吗？

---

至此，食物网已绘制完全：

<ul>
<li class="plant">Epiphyllum 昙花果<ul>
<li class="plant">Fantasy 幻想树<ul>
<li class="plant">Diode 二极菟<ul>
<li class="animal">Breakfast 早餐蝠<ul>
<li class="plant">Oxytocin 催产榆
<li class="animal">Tired 疲惫鼠</ul>
<li class="plant">Lodge 寄宿藓</ul>
<li class="animal">Email 电邮蚁<ul>
<li class="animal">Forge 伪造蛾<ul>
<li class="plant">Arrow 箭头荚
<li class="animal">Olfactory 嗅觉蟒</ul>
<li class="plant">Intervene 干预草<ul>
<li class="animal">Adorn 装饰驴
<li class="plant">Nail 钉子藤</ul></ul></ul>
<li class="animal">Lunar 月光鸟<ul>
<li class="plant">Beam 束光蕨<ul>
<li class="animal">Addiction 上瘾兔<ul>
<li class="animal">Rainy-night 雨夜虎</ul>
<li class="plant">Naive 天真蓬<ul>
<li class="plant">Base 基底茅
<li class="animal">Machine 机械蜂</ul></ul>
<li class="animal">Transparent 透明蝇<ul>
<li class="plant">Eden 伊甸橡<ul>
<li class="animal">Yeast 酵母虫</ul>
<li class="animal">Kaleidoscope 万花茧<ul>
<li class="animal">Absolute 绝对蚕
<li class="plant">Relative 相对荇</ul></ul></ul></ul>
</ul>

---

该如何提取？

> ……<i>在这个星球悠远的历史发展树上，动物的存在不过眨眼一瞬，植物的生存才是长久的延续</i>。……

“别告诉我这表示动物是点，植物是划”这样想着的时候，我才意识到“墨瑟”“科德”暗示了morse code。然后在食物链上多次尝试读取摩斯无果，研究墨瑟星球生物进化史无果，直到发现除了昙花果以外共有26种生物，才发现食物网与摩斯树完全一致，得到~~一串无意义英文字母~~“蟒蝇蝠鸟榆橡蕨蚁”。

昙花果的萼片为什么会长成“……→（8）→（6）”这样啊！

## 终曲

由于灰meta和黑白meta的解法完全一致，平常遇到meta必卡的我才能照葫芦画葫芦连斩两道灰meta，来到final meta门前~~继续卡~~。让我感到困惑的是，我已经到达了这道看起来就是final meta的题，解出题数却比排行榜上的平均值少个十道。但说什么都不再回去做任何一道巨无霸题了，我必须要将数日的折磨就此终结。

竖向读去，看到开头的i、ro、ha，立即确定了顺序。但不知道为什么大题答案与对应位置的假名完全无关。

注意到题面的第一张图中的灰阶色值皆为10的整倍数，完整对应了还没用上过、我也还没做的魔法书页区meta的答案排列，只好回去排单词。没解的小题都不会做，拿着已有单词也确定不了几行唯一解，从黑到白依次读出的AAAgao AAAAAAninukAAh更是狗屁不通。作日语解释也不太可能，因为不可能以h结尾，nu的字频也低。因为黑区是先开的phaseA，白区是后开的phaseB，从黑到白读取是合理的；但反过来的话，hAAkuninAAAAAA oagAAA稍微像一点，但Nutrimatic无结果，日语的话oagAAA也不太像一个词。要是有日语Nutrimatic就好了。

第二张图理应运用黑白灰meta的答案，但相等的<span style="background: #97d5db; border-radius: .25em">&emsp;&emsp;</span>和<span style="background: #3e6165; border-radius: .25em">&emsp;&emsp;</span>让我不解：两者分别是黑区和白区的导航栏颜色，但这两区哪有第二个答案，还是同一个？

这时我还有整整70根羽毛，于是买断了这题的所有提示。得知看板表示大题答案与假名的对应关系；确认了第一张图的思路基本正确，读取顺序是从白到黑；没想到第二张图那两个导航条颜色指的是魔法书页区没有固定主题色，我还以为这是网站bug……

一点都不想做小题（主要是剩下的题都不会了），我盯着hAAkunin瞪。如果真是日语答案，那么hAAk中的AA只能填an、in、un、en、on、ya、yu、yo，其中hyaku读着非常顺口，因为是<ruby>百<rt>ひゃく</ruby><ruby>人<rt>にん</ruby>。然后输入法自动联想出了《<ruby>百<rt>ひゃく</ruby><ruby>人<rt>にん</ruby><ruby>一<rt>いっ</ruby><ruby>首<rt>しゅ</ruby>》。搜索后发现是诗集，与伊吕波可算是同主题，大喜。发现这个词hyakunin isshu的长度是13，与提示的14刚好差了1，其中也没有类似tsu/tu这种能调节转写长度的要素，并且如此一来答案的后6个字母的含义也不明确。如果最后6个字母是wogura，可以解释为<ruby>小倉<rt>おぐら</ruby>的旧拼，但也不知道这个诗集要如何描述假名顺序，要是指定到其中一首的话还有可能，但诗没有名字……

想着进化到爆日语答案还是太早了点，突然想起魔法书页区可以用羽毛换答案！于是立即购买了8道未解小题的答案，并写程序根据完整已知信息求解了魔法书页meta。填入表格后，等待着我的答案是——hyakuninnissyu sagami。

这哪门子的转写法啊！

现在回过头来仔细分析的话，可能是因为，如果“百人一首”是一个词，那么n后接元音i需要加以区分，通常写作<span lang="en">n’i</span>，但答案只能包含英文字母，所以需要一种不使用标点的区分法。但这不是使用入力式罗马字的理由，况且“百人”和“一首”是两个词。顺带一提，不久前的CCBC 15中同样以日语为答案的《哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米哈基米头鹰》一题的解析中也出现了神必转写。这个故事告诉我们~~不要靠近猫头鹰，会带来不幸~~，汉语拼音方案精确到连声母和韵母的顺序都固定是多么稀有的性质，而在puzzle hunt中遇到除此之外的语言就要做好面临妙妙转写的准备……

那么在Wikisource的《小倉百人一首》页面中搜索さがみ对应的那首诗就能得到所需要的顺序。

虽然没能成为爆出《百人一首》的选手，但是我成功把解答题目数压在了39，成为了所有完赛队伍中解答题目数最少的队伍。在此之前，完赛的队伍都完成了至少46题。原因其实很简单：我买的小题答案都掖着没交……
