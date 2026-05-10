---
title: Linux程序兼容性疑难解答（MaaAssistantArknights篇）
date: 2026-01-08
dates: "2026-01-08"
description: <span lang=en>Are we MaaAssistantArknights yet?</span>
tags:
- 闲聊
- Linux程序兼容性疑难解答
- MAA
---

切换系统后直至目前遇到的最大的兼容性问题竟然是[MaaAssistantArknights](https://github.com/MaaAssistantArknights/MaaAssistantArknights) 😾 明明是开源项目，核心功能是C++图像识别，却因为GUI采用了WPF，还总是很急地升级到最新版.NET，用Wine也运行不起来。虽然MAA也有命令行前端，但这类选项繁多、更新频繁、问题百出的软件用tier 2命令行就有点牢了。希望WPF立刻从世界上消失！

自从发现因为给maa-cli的配置编写有误而浪费了好几天公开招募刷新机会后，我日思夜想着这个MaaAssistantArknights，连做梦梦到的都是MaaWpfGui可以在Linux上运行。

事实上MaaWpfGui也确实可以通过Wine运行，但很不巧刚好就现在这个Wine版本（10.20）与.NET有兼容性问题，直到有[高人指点](https://github.com/orgs/MaaAssistantArknights/discussions/15320)之前我都不知道到底是怎么回事。通过Wine运行虽然可行，但有一堆问题：MAA需要频繁创建adb子进程，而创建Wine进程开销巨大，导致任务耗时成倍增加；因为是Windows版，缺少针对Waydroid的连接预设，需要手动修补资源中的截图命令；DPI和界面缺字等问题我实在不想再深究。至此我才明白官方文档中“使用Wine”一节下“使用Linux原生MaaCore（实验性功能）”小节这种集两家之短、部署极为麻烦的方案存在的意义。

<p><img src=maa-wine.webp></p>

我多么希望我可以为MAA追加一个Linux也能原生使用的前端。技术上完全可行，可在这个核心开发者屈指可数的社区开源项目上，我却只觉得面前有着巨大的阻力。

MAA的架构从一开始就是前后端分离的，大概是因为图像识别的核心功能需要的OpenCV是C++库，而用C++写GUI的体验完全是一坨，C#写UI更方便。这仅仅是出于实现上的方便：MaaWpfGui并不只是调用MAACore接口，还承担了连接检测、资源更新、数据上报等不少核心功能。

最初漫不经心选择的WPF终究还是只能在Windows上运行。明日方舟作为手机游戏，在电脑上游玩本就需要手机模拟器（官方电脑版快六年了还在抠抠搜搜搞无宣传内测 😾），完全没有一定要用Windows的道理。甚至，macOS有PlayCover，Linux支持多种Android容器，性能都比模拟器强，只有Windows Subsystem for Android烂完了。于是有macOS用户开发了SwiftUI版MaaMacGui（2022），有Rust用户开发了跨平台的命令行版maa-cli（2023）。

```
┌───────────┬───────────┬─────────┬──────────────┐
│ MaaWpfGui │ MaaMacGui │ maa-cli │ MaaX         │
│ • Windows │ • macOS   │ • Rust  │ • Electron   │
│ • C#      │ • Swift   │         │ • TypeScript │
│ • WPF     │ • SwiftUI │         │ • Vue        │
├───────────┴───────────┴─────────┴──────────────┤
│          MAACore.{dll,dylib,so} • C++          │
├────────────────────────────────────────────────┤
│                   adb[.exe]                    │
└────────────────────────────────────────────────┘
```

MaaWpfGui覆盖了◕的用户，MaaMacGui覆盖了◔中的◕，maa-cli覆盖了◔中的◔中的◕。也就不难理解为什么此后的一些跨平台前端的尝试（[MaaX](https://github.com/MaaAssistantArknights/MaaX)、[MaaBo](https://github.com/BoredTape/MaaBo)等）最终都坑掉了：一套前端的开发成本并不小，还经常需要随游戏本体、MAACore一起维护更新，替代品难以达到与原有前端一致的体验。本就拥有原生GUI的◕用户没有理由切换到一个体验更差的Electron/Tauri套壳应用，用户更少问题也就更多，恶性循环。

如果我现在去开发一个新的前端，顶多也只能填补Linux GUI用户的需求空白，又怎么可能不会重蹈覆辙呢？开发图形界面的本意是减少命令行工具使用上的不便，可到最后只有我一个人用的话，就彻底失去花费大力气开发的意义了。想到这里，我不禁感到悲伤。
