---
title: 激进复位行动：CSS的古怪默认值
---

## min-width & min-height: auto → 0



## flex-shrink: 1 → 0

设置此值，使flex元素免受意外挤压。

## white-space: normal → pre-wrap

在手写HTML、手动在80列换行的年代，这是HTML语法的宽容。在所有文本数据都来自脚本的今天，这已不再重要，而想要让包含换行符的数据源正常显示，就必须包含这个属性。

```js
element.textContent = '第一行\n第二行'
```


