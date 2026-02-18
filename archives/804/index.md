---
title: 不破坏的破坏性变更也是破坏性变更：GitHub Actions不省心的官方操作
date: 2026-02-15
dates: 2026-02-15, 2026-02-18
excerpt: 在不知查看了多少次actions/upload-artifact的最新版本号后，我把所有应用于官方actions的版本号标记全都改成了@main，并没有发现任何问题。
tags:
- 实验
- GitHub
---

在修缮老项目时，我屡次发现需要升级使用到的其他操作（action）的版本号。

```diff
--- a/.github/workflows/deploy.yml
+++ b/.github/workflows/deploy.yml
@@ -21,7 +21,7 @@ jobs:
     runs-on: ubuntu-latest
     steps:
-    - uses: actions/checkout@v3
+    - uses: actions/checkout@v6
     - name: Build production binaries
       run: |
```

比如actions/checkout这个所有CI流程都需要的操作，就是一例版本号数值膨胀。从[2022年3月的v3.0.0](https://github.com/actions/checkout/releases/tag/v3.0.0)到[2025年11月的v6.0.0](https://github.com/actions/checkout/releases/tag/v6.0.0)，不到四年的时间已经升级了四次大版本。其中v3、v4、v5都是升级最低所需Node.js版本（可是git clone为什么需要Node.js？！）；v6貌似在做安全整改，实则[啥也没干](https://github.com/actions/checkout/issues/485#issuecomment-3617694423 "Remove `persist-credentials` or change the default to `false`") 😾

在库名后指定版本，是为了防止库有破坏性更新。可事实上，GitHub官方的几个actions使用固定版本号才反倒会招来破坏：

- 所谓的破坏性更新往往不涉及参数调整（CI检出当前仓库代码，还能有什么参数？！），用户除了修改指定版本号以外不需要做任何事。
- 缓存、上传产物等操作随GitHub平台自身一起更新，旧版本很快就会因网站接口变化而彻底无法使用。
- GitHub Actions runner定期移除旧镜像、旧操作系统、旧软件，即使把Ubuntu和Node.js锁定在旧版本，两三年后也就用不了了。

这些事实当然不会在文档里告知用户，只有经历过[一大堆弃用公告](https://github.blog/changelog/?label=actions&type=deprecations)才能理解GitHub锲而不舍地搞坏用户流水线的良苦用心。在不知查看了多少次actions/upload-artifact的最新版本号后，我把所有应用于官方actions的版本号标记全都改成了@main，并没有发现任何问题。（不能指定SemVer版本号范围。事实上，GitHub Actions完全不使用SemVer，像“v1”这样看上去是版本号范围的东西实际是仓库中的分支名，由发布者自行维护。）

可靠的第三方操作则总是靠得住的：[ruby/setup-ruby](https://github.com/marketplace/actions/setup-ruby-jruby-and-truffleruby)在发布的六年间从v1.0.0升级到了v1.288.0，这充分说明由组织维护一个可复用且稳定的操作并非不可能。至于那些不可靠到需要用提交SHA确定版本的action，压根就不应该通过`uses`使用。结果到头来，原来官方提供的才是最不稳定的。
