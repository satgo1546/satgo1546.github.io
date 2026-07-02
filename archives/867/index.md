---
title: 一觉醒来，我对用户体验期望上升一万倍而Figma不变。Figma使用体验下滑简报
date: 2026-07-02
dates: "2026-07-02"
excerpt: 此agent非彼agent 😾
tags:
- 闲聊
- Figma
---

直到做[六方谜](https://4s.puzzle.cat/)需要叠图之前，我好像已经三个月没打开Figma了。

这可能与我的Figma使用体验持续下滑有关。

一方面，我切换到了Linux和Firefox。虽然Figma以网页应用为卖点，但是并没有网页该有的跨平台特性。很多软件的所谓跨平台就是Windows和macOS 😾 明明已经搭好了跨平台的框架，就连做手机版都不愿意做Linux版 😾

<!----><img src=download.webp>

在不那么主流但绝非无人使用的平台上，连重要的功能都有很大的体验问题。

- （Windows/macOS以外的操作系统）因为Figma agent（此agent非彼agent 😾）不提供支持，所以不能使用自定义字体。民间有[适用于Linux的Figma agent](https://github.com/neetly/figma-agent-linux)，但[惨遭Figma封杀](https://forum.figma.com/report-a-problem-6/requests-to-font-helper-on-linux-stopped-working-16569)，目前只能通过伪装UA为Windows来使用。

  至今为止，Figma agent似乎并没有获取字体列表以外的功能，可以被Chrome[获取本地字体](https://chromestatus.com/feature/6234451761692672)功能完全覆盖，但距离其他浏览器实现、Figma支持此功能也遥遥无期，Safari方面更是反对实现此功能。

- （Firefox + Linux）[鼠标中键拖动画布时，会触发中键粘贴。](https://forum.figma.com/report-a-problem-6/middle-click-button-pasting-on-linux-45877)直到画布里到处都是不知道哪里来的文本时，我才发现这一点。我写了个用户脚本，在figma\.com上暴力禁用中键粘贴。

  ```js
  let lastMiddlePress = 0
  for (const eventName of ['pointerdown', 'pointerup']) {
  	document.addEventListener(eventName, e => {
  		if (e.button === 1) lastMiddlePress = performance.now()
  	}, { capture: true })
  }
  document.addEventListener('paste', e => {
  	if (performance.now() < lastMiddlePress + 30) {
  		e.stopImmediatePropagation()
  		e.preventDefault()
  	}
  }, { capture: true })
  ```

- （任意操作系统上的Firefox）粘贴外部素材时，会弹出只有一个“粘贴”项目的菜单。该菜单本意为请求用户授权应用读取剪贴板，而且为了防止用户误操作，甚至必须等待整整1秒才能确认。

  <img src=paste.webp>

  可无意义😾的是，就算取消掉此菜单，粘贴依然能成功 😾

  [有用户指出](https://forum.figma.com/ask-the-community-7/how-to-hide-paste-button-in-figma-firefox-browser-25429)在about:config中启用dom.events.testing.asyncClipboard即可绕过该菜单。

  就算真的起到了隐私保护的作用，正常使用中每次粘贴都要确认也实在是太麻烦了。这一点上，我觉得反而是Chrome做得比较好：针对每个网站单独设置是否允许随便读写剪贴板，网站在首次非法使用剪贴板时向用户请求权限。

另一方面，自LLM爆火以来，Figma自身也不再着重优化真实用户体验，转而大量添加意义不明的AI功能：从根据提示词自动画原型图，到Figma design agent（此agent非彼agent 😾）。

Figma原生的图像处理功能很弱，色键抠图与拉曲线都做不到，毕竟提示词修图与超分辨率显然更为重要。

<img src=image.webp>

虽然连Photoshop图层样式和SVG基础滤镜库都没做全，AI编写着色器这种高级得莫名其妙的功能倒是先加上了，而且我没有找到任何不用AI新建的方法。自定义着色器需要WebGPU，目前Linux上的Chrome和Firefox都不支持。

<img src=shader.webp width=600 height=600>
<img src=webgpu.webp>

Figma Make的界面和使用方法与市面上任意一款agent IDE别无二致，与其他Figma软件之间仅存少量预先设置好的通道互通（例如下图左下角输入框上方的“<samp lang=en>Paste a Figma frame</samp>”）。至此，Figma泯然众人矣。

<img src=make.webp>

觉得眼熟？这样的场景，此时此刻正在银河系各处上演……
