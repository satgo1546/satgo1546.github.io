---
title: 慢报：CSS属性<code>text-autospace</code>的支持正在全面铺开
date: 2025-12-03
dates: 2025-06-26, 2025-12-03
excerpt: 自web平台普及以来，我就确信这一排版功能在网页上被实现是迟早的事。
tags:
- 闲聊
- CSS
---

<figure lang=zh-Hant>
<blockquote>
<p>其餘三成的人最後只能把遺產留給自己的貓。</p>
</blockquote>
<figcaption><a href="https://github.com/vinta/pangu.js">為什麼你們就是不能加個空格呢？</a></figcaption>
</figure>

我是坚定的中西文间不加空格派，认为加空格一事应交由排版软件完成，而不应在源文本上插手。Microsoft Word、xeCJK、LuaTeX-ja、Typst等排版工具都支持自动在中西文间插入适当的空格。中西文间的空格宽度不应与西文单词间空格等同，手动插入的空格只能作为缓解措施；要做到好看的排版，根本上还需排版引擎解决。

自web平台普及以来，我就确信这一排版功能在网页上被实现是迟早的事。只是，和其余web标准的功能一样，事情总是偏向迟的方向。此前，当有读者表示不满时，我指出这可以通过安装“为什么你们就是不能加个空格呢？”插件缓解。而现在，只需要[一些自定义样式](https://greasyfork.org/zh-CN/scripts/552916-text-autospace)。

```css
:root {
	text-autospace: normal;
}
```

本站的样式表也已更新。在[Chrome 120+（需在chrome://flags开启实验性web平台功能）](https://developer.chrome.com/blog/css-i18n-features#inter-script_spacing_text-autospace)/140+、[Firefox 146+](https://bugzilla.mozilla.org/show_bug.cgi?id=1981086 "Enable layout.css.text-autospace.enabled in all channels")（较低版本的正式版需在about:config开启layout.css.text-autospace.enabled）、[Safari 18.4+](https://developer.apple.com/documentation/safari-release-notes/safari-18_4-release-notes)可以看到效果。

遗憾的是，关于`text-autospace`是否应该默认启用，[仍有争议](https://github.com/w3c/csswg-drafts/issues/12386 "[css-text] Reconsider the initial value of the `text-autospace` property")。另外，目前自动插入的空格的宽度固定为⅛字宽（0.125ic）无法调整，这未必适用于所有字体。希望五十年后，这些情况都能得到改善。
