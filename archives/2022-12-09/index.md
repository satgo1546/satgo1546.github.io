---
title: Ŝalenzo文字徽标的设计
dates: 2022-12-09, 2022-12-12, 2024-11-26
tags:
- 实验
---

<div class="admonition">
本文最初预计发表在Ŝalenzo.RTFD.io，但烂在草稿箱里了，现在此补完。
</div>

Ŝalenzo第一代图标正如当初预测的那样，至今仍在使用。

作为互联网文艺复兴运动的支线任务之一，我想为Ŝalenzo部署在Neocities上的站点制作88×31的友情链接小图标。

苦于不知如何设计与徽标图形相称的文字，这时我想到了，不如问问正值火热公测的神奇的ChatGPT：

> <strong>松鼠：</strong>请为下面的图标配上协调的艺术字“Ŝalenzo”。
>
> ```xml
> <?xml version="1.0" encoding="UTF-8" standalone="no"?>
> <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 33 33" xml:space="preserve" version="1.1">
> 	<defs>
> 		<clipPath id="clipPath1" clipPathUnits="userSpaceOnUse">
> 			<path d="M 18.5 0.5 L 16.5 17.5 L 0.5 18.5 Z"/>
> 		</clipPath>
> 		<pattern id="pattern1" x="0" y="0" width="2" height="2" patternUnits="userSpaceOnUse">
> …
> ```
>
> <strong>Assistant：</strong>给定的SVG图像是一个不规则的图形，其中包含了红色，橄榄色和黑色的阴影和彩色图案。为了与该图像协调，“Ŝalenzo”的艺术字可能会使用与图像中使用的颜色相似的颜色，并且字体的设计可能会与图像中的图形相似。例如，字体可能会有不规则的轮廓和阴影效果，以反映图像中的设计元素。总之，“Ŝalenzo”的艺术字应该与给定的SVG图像相协调，以给人以统一感觉。
>
> ```xml
> <?xml version="1.0" encoding="UTF-8" standalone="no"?>
> …
> ```

这幅图像渲染出的效果是这样的：

<!----><img src="chatgpt.svg" width="300">

呃，好吧。靠言语想象来绘图还是太艰难了些。

一个多月前，在[明日方舟2022感谢庆典](https://www.bilibili.com/video/av987004099?t=209)上，公开了三个叙拉古家族的徽标，其中之一为拉普兰德所属的萨卢佐（Saluzzo）家族。这个名字与Ŝalenzo的重合度过高。

我尝试了配上和萨卢佐家族徽标上的文字具有类似风格的衬线细字，但是有些不对，我认为原因可能是星形八面体的图标是实体，细字无法支撑。家族徽标只有一个字母S，像是宽线折叠而成，也不是细线。在徽标上使用单线字体未免过于单薄了。

我第一次尝试制作像素粗体文字，效果感觉还不错。

<!----><img src="text.svg" width="200" height="60">

首字母S采用了特殊的空心设计。在这样的小尺寸下，也可以解读为图案。

首字母采用深红色，而后续文字使用深黄色，这样就能完整利用和徽标图形相同的调色板了。

## pixelated-evenodd.html

一些复古页面使用样式`image-rendering: pixelated`来使图像呈现像素化风格，但这个声明要求使用最近邻插值法，对非整数缩放不友好。很不幸，我现在使用的设备缩放倍率为1.5，最近邻插值导致某些源像素缩放后显示面积为另一些像素的四倍，产生的惨状再明显不过，我拒绝使用这个CSS声明。我希望`pixelated`能够真正为像素艺术服务，在提供次像素渲染的同时保留像素点的锐利，像是为每一个像素创建了一个`<rect>`SVG图元，但没有矩形之间因抗锯齿后的图像叠加产生的缝隙瑕疵，且性能应更好。在OpenCV里，这称为面积采样算法`INTER_AREA`。但是现在，我们只能选择将位图放大一百倍，并在显示时缩回原图尺寸。

如果想用SVG，则在SVG中创建大量图元带来的性能骤降问题应得到重视。Aseprite的SVG导出功能简单地为每个像素创建`<rect>`，[另一些工具](https://codepen.io/shshaw/pen/XbxvNj)用`<path>`描画单像素宽的线段，当图中存在大块色彩填充时，无法取得最优。若不是偏移半像素的视图框，填充路径应有更好的性能。[dotrace.js](http://defghi1977.html.xdomain.jp/tech/dotrace/dotrace.htm)用路径化简算法优化矩形路径，使大块色彩填充路径为最简。此外，使用填充路径，可能充分利用`fill-rule="evenodd"`的效果，并通过路径交叉减少路径点数，这在Ŝalenzo初代徽标的SVG版本中有过应用：为了填充2×2棋盘格，

- 不使用路径交叉：`M 0 0 h 1 v 1 h -1 Z M 1 1 h 1 v 1 h -1 Z`；
- 使用路径交叉：`M 0 0 h 1 v 2 h 1 v -1 h -2 Z`。

这个例子使用`fill-rule="nonzero"`（默认值）也能正常显示。

按奇偶规则填充，就不必考虑路径卷绕方向，可以将问题[化为图](../leetcode/114514/)，<ruby>行<rt>háng</ruby>为节点，色块分界线为边，而其中的连通块又可化为[寻找欧拉回路](../leetcode/114515/)，我将它们包装成了算法题。这样，就能对具有较少色彩的位图自动化简出比较精简的路径。该工具发布在<https://salenzo.github.io/Utilities/pixelated-evenodd.html>。

对于纯色填充，不同的绘制顺序可能得到不同的路径复杂度。最先绘制的颜色可填充整个图像；随后绘制的路径，只要其中有将被遮盖的部分，也能节省点数。我没有仔细研究路径化简的方法，但也为之编写了[算法题](../leetcode/114516/)。

## 带动画的交互式按钮

你知道吗？SVG压根不是一个独立的描述矢量图的格式，它只是HTML全家桶的一部分。在SVG中，可以嵌入链接、CSS和JavaScript。（顺带一提，PDF也是个无所不包的全家桶格式，当然也做得到。我记得在StackOverflow上看到过有人因CSS太难实现各端统一而转用PDF做网站。PDF确实支持JavaScript，但支持度很受限。）通过`<img>`嵌入时，链接和JS被禁用，但通过`<iframe>`或`<object>`（其实也是个iframe）嵌入，就能保留交互要素。

所以，这是最终的88×31按钮，自带链接和鼠标悬浮动画效果，在各种分辨率下保持清晰：

<object data="salenzo-button.svg" type="image/svg+xml" width="176" height="62"></object>
