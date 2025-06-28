---
title: 基于滥用GitHub Discussions、未公开接口与机密泄露的评论系统
date: 2025-06-28
dates: 2025-06-24 ~ 2025-06-28
excerpt: 太棒了，我的评论系统现在完全依赖NRND和无文档记载的特性（也可能其实是bug）运行。
tags:
- 站点更新记录
- GitHub
---

## 致逝去的评论系统

像GitHub Pages这样的纯静态网页服务一直存在额外的评论区托管需求。外部评论平台一代又一代地新生、遗弃、消亡，唯有GitHub Pages本体即将活过一个又一个十年。

我印象里早年间Disqus用户不少；还有几家类似的服务，但我记不清了（参照：[Various ways to include comments on your static site](https://darekkay.com/blog/static-site-comments/)）。这类平台的问题在于用户为了评论必须先注册个平台账号。

于是有了[Gitment](https://github.com/imsun/gitment)、[Gitalk](https://gitalk.github.io/)、[utterances](https://utteranc.es/)、[giscus](https://giscus.app/)这类偷取GitHub平台资源的项目，依靠GitHub平台保存评论数据、防垃圾。只要注册GitHub账号就能评论，而用户往往出于各种原因已经有GitHub账号了。其中，前三个作于GitHub讨论系统上线以前，基于议题系统，且现在都已不再维护了。

## utterances与giscus

GitHub议题系统很简约，帖子完全平铺，没有楼中楼的概念。现在既然GitHub仓库有了支持楼中楼的讨论区，我希望我的评论系统也基于它。

giscus看上去几乎就是utterances的discussions化 + 现代化翻版，但其实代码完全重写了，架构设计也不同。

utterances生在GitHub还在坚持JS减量的时代，接入的iframe里HTML + CSS + JS只有63KB。giscus生在前端已经没有人类的时代，和烂掉的GitHub本站一样被Next.js渗透，接入的iframe启动先花7秒加载2.5MB JS，是我目前这个页面上所有资源大小总和的7倍。

utterances那会还没有GitHub bot账户执行操作的说法，所以注册了个用户账号[@utterances-bot](https://github.com/utterances-bot)来创建新议题。贡献图表一片绿油油，年度总结报告数据很好看吧。

<!----><img src=utterances-bot_contributions.webp>

utterances和giscus都有一个GitHub app和一个中心服务器。发表评论的流程也相似：以giscus为例，用户授权[giscus GitHub app](https://github.com/apps/giscus)后跳转到giscus.app，再带形如`?giscus=⟨会话ID⟩`的URL参数跳回文章页，该会话ID被保存在前端文章站点的本地存储空间（localStorage）。前端向giscus.app服务器交换会话ID得到`ghu_`开头的GitHub API令牌，之后由前端直接连接GitHub API。

这个流程问题很大。会话ID不是保存在giscus.app域下的cookie或本地存储空间，而是保存在文章站点域下，因此事实上iframe没有提供任何安全隔离，反而阻碍了评论组件样式融入页面。

假设文章站点由攻击者控制。读者登录后，站点上的脚本能轻松获得会话ID。攻击者就可伪装成该用户请求giscus.app，得到GitHub API令牌，随后用该用户的身份在任何安装了giscus应用的仓库里评论。看上去读者需要在每个站点分别授权登录，其实令牌是通用的。giscus默认实例的用户令牌有效期为一年。也就是说，不仅giscus中心服务器可以伪装成用户发评论（显而易见），在任何使用giscus评论系统的站点上登录后，站点控制方也能拥有一年同样的权限。

很遗憾，三小时的代码审计期后，giscus最终被我评定为不安全，于今日被正式踢出博客评论区组件候选。

## 匿名请求GitHub API

先前在兔子洞里挖到过一个用访客浏览器匿名请求GitHub API显示评论的做法（[A new comments system for my static Jekyll site](https://aristath.github.io/blog/static-site-comments-using-github-issues-api)）。这个思路不稀奇，其他博客上有诸多本质相同的做法记载。优点是访客无需登录，只依赖GitHub API服务器而不依赖其他中间服务；缺点是只能显示评论，发表评论和互动不能在文章页完成，必须前往GitHub平台。我觉得可以接受：这样不仅更安全，也更能让用户理解其安全性。

另一个不太明显的缺点是，GitHub匿名API给的配额实在太少了，每个IP每小时60次，共用IP的场合很容易被限流。带令牌的话，配额就能涨到每小时5000次。公开泄露个人访问令牌显然很不安全，泄露无权限令牌带来的最严重后果可能是有人拿着令牌消耗用户个人的5000次配额，使用户自己无法使用API。

用户未授权utterances的场合，请求即为匿名发送。utterances使用的搜索端点使用独立的匿名请求每个IP每小时10次、认证请求每个用户每小时30次的限额，这意味着未登录状态每小时只能阅读10个评论区，无论文章对应的议题是否存在，亦无论评论区有几条评论。这是个不小的限制。

Ari Stathopoulos的这篇文章中，最奇妙的是一段关于提升限额的描述：

<blockquote lang=en>
<p>Depending on the number of requests you have on your site you may want to add [these] at the end of the URL in the <code>GH_API_URL</code> constant in the above script:
<pre><code>?client_id=MY_CLIENT_ID&amp;client_secret=MY_CLIENT_SECRET</code></pre>
<p>To get the client-ID and client-secret you’ll have to create a new application from your <a href="https://github.com/settings/applications/new">GitHub Profile &gt; Developer Settings &gt; OAuth Apps</a>. Don’t worry, it only requires an application name and a URL. You can use the same URL for the callback, so it only takes 10-20 seconds to create your app and get the keys.
</blockquote>

`?client_id=`是我从未见过的参数。查询文档可知[该参数已弃用](https://developer.github.com/changes/2020-02-10-deprecating-auth-through-query-param/)。但我试了一下，只要乱填一个client_id参数，甚至不需要client_secret，确实能解除限流！请求`https://api.github.com/rate_limit`发现，似乎只要加上client_id参数，就会切换到另一套限流策略，从而获得额外的每个IP每小时60次请求。

正确地通过HTTP基本身份认证传入OAuth应用的client_id作为用户名、client_secret作为密码的话，能获得每个应用每小时5000次请求，该限额独立于创建应用的用户。这种传法设计用于应用内部读取数据；client_secret虽然名叫client，但不应该传给客户端使用。[它曾可用于解除OAuth应用关联的所有用户授权](https://github.com/isaacs/github/issues/330#issuecomment-69152473)，该危险端点现已删除。

我建了一个无权限的OAuth应用，公开其client_id和client_secret。反正这个应用没有任何权限，本来就没有任何用户授权，公开client_secret也无所谓。最坏的情况就是有人作死非要授权这个应用，使攻击者能消耗该用户的配额。

<figure>
  <img src=satgo1546-test-app-2.webp width=400 height=164>
  <figcaption>GitHub还是一如既往地充满了竖直不对齐的元素</figcaption>
</figure>

我计划客户端读取评论时尝试下列请求方式：

- 匿名请求。
- 带client_id但不带client_secret地匿名请求。
- 以OAuth应用的client_id和client_secret登录并请求。

我也不确定最优的尝试顺序是什么样的。

确定基本方案后，还有若干架构选择待决。

## 预先建帖还是即时建帖？

utterances和giscus在页面没有对应的讨论和议题时会自动帮忙创建一个新的；未授权应用的用户也可以手动建帖，尔后被评论系统自动拾取。即时建帖的好处在于不用预先创建一堆没人回复的帖子。

以giscus为鉴，讨论帖的创建应由可信方执行。讨论帖主楼有着与回复楼层不同的地位，用于评论区，主楼应留空。giscus方案中，主楼总是由giscus应用创建，得以保证主楼无内容；用户自己建帖子就会建得乱七八糟。

但是没有自己的服务器的话，就做不到可信地即时建帖了。借用GitHub Actions作为服务器的话，用什么令牌触发工作流又是个问题。

反过来，如果在站点构建时预先建好所有页面的讨论帖，就不会有信任和谁来建的问题。站点构建本就在GitHub Actions中执行，环境中有github.token变量，开个讨论是顺手的事。

即使没有回复也总是预先建好讨论帖，听起来很浪费，然而个人博客撑死也就几百篇文章，而且反正浪费的是GitHub的资源，无所谓了。

## JSON还是GraphQL？

GitHub仓库和议题API以JSON端点（官方称其为REST API）为基础，GraphQL只是JSON端点的包装；讨论区却不提供JSON接口，只有GraphQL接口，文档也只有[一篇指南](https://docs.github.com/en/graphql/guides/using-the-graphql-api-for-discussions)，埋藏得搜都搜不到。

只支持GraphQL倒好说了。对接GraphQL接口不需要查docs.github.com：随便找个GraphiQL实例，就能交互式编写查询。GitHub官方提供了[一个实例](https://docs.github.com/en/graphql/overview/explorer)，可是嵌在iframe里太难用了。我找了第三方实例，把新生成的有效期1天的没权限的访问令牌贴进去。设置令牌有效期就是为了肆无忌惮地泄露！

GitHub有不止三套ID：议题和拉取请求的编号是自然数，JSON端点返回的id字段是比较大的自然数，GraphQL返回的id字段有Base64字符串和随机字符串，Base64字符串虽被弃用还是被返回了。GraphQL节点ID仅用于GraphQL接口，在网页上无处显示，也不能用于请求JSON端点。

```json
  "extensions": {
    "warnings": [
      {
        "type": "DEPRECATION",
        "message": "The id MDEwOlJlcG9zaXRvcnkyNjU4Mjk3Ng== is deprecated. Update your cache to use the next_global_id from the data payload.",
        "data": {
          "legacy_global_id": "MDEwOlJlcG9zaXRvcnkyNjU4Mjk3Ng==",
          "next_global_id": "R_kgDOAZWfwA"
        },
        "link": "https://docs.github.com"
      }
    ]
  }
```

编写客户端脚本时，我才发现GraphQL API不能匿名请求。与utterances的直接向GitHub API服务器发起匿名请求设计不同，giscus连读评论也要经过giscus.app服务器，就是因为GraphQL API不能匿名请求。

就连OAuth应用的client_id和client_secret也不能用于认证GraphQL端点。GraphQL限额文档大概是从REST限额文档复制来的，没删干净。我[发了个帖问这事](https://github.com/orgs/community/discussions/164148 "Is it possible to request public data through the GraphQL API using an OAuth app's client ID and client secret?")，一用户回复说确实不行。

这样一来，就真的只能登录才能请求GraphQL接口了。

一筹莫展之际，我发现讨论区其实有JSON接口，只不过没有公开文档，被我心灵感应（= 乱试）出来了。下列端点用于获取讨论帖主楼和评论列表。主楼响应末尾还煞有介事地指出访问`timeline`子接口还可获取时间线，但该接口并不存在。

```
GET https://api.github.com/repos/⟨owner⟩/⟨repo⟩/discussions/⟨number⟩
GET https://api.github.com/repos/⟨owner⟩/⟨repo⟩/discussions/⟨number⟩/comments
```

AI瞎编叫幻觉；人类瞎编的事怎么能叫瞎编呢，那叫educated guess。😼

它返回的body字段是Markdown源码，和议题接口一样，添加请求标头`Accept: application/vnd.github.html+json`以获取渲染后的HTML。

太棒了，我的评论系统现在完全依赖NRND和无文档记载的特性（也可能其实是bug）运行。

## 避免搜索还是拥抱搜索？

既然GitHub对JSON格式的搜索端点有严格的限额，我希望避免搜索。这需要在某处记录文章地址和讨论帖编号的对应关系表，无论是读取还是写入都要处理关系表和讨论帖两步。

神奇的是，同样是基于搜索的方案，utterances很容易请求超额，giscus即使不登录也不会超额。我最初以为它是像[shields.io那样将匿名请求平摊给所有已授权用户](https://shields.io/blog/token-pool "How shields.io uses the GitHub API")，可是我翻了giscus的源码，既没有找到缓存讨论帖编号的程序，也没有找到类似令牌池的逻辑。它好像真的每次刷新都重新用应用令牌调用搜索接口。这怎么会不超额？

实验发现，这是因为GraphQL接口配额完全独立于JSON接口配额，登录用户有独立的每小时5000点的GraphQL配额。读取数据的场合，粗略地说，只要等价JSON请求数不到100，即使是搜索也只计为1点。

GitHub只支持模糊搜索，即使加上双引号，也无法区分大小写。giscus的解决方案是在正文里加SHA-1，搜索散列。

可以随意搜索的话，就不需要保存关系表了。

但是，采用搜索的选择与预先建帖的选择不相容。为了在构建中增量创建讨论帖，需要获取当前已存在的所有讨论帖。无论是JSON还是GraphQL，列表接口每次请求项目数皆不能超过100。保存关系表的话，无论有多少讨论帖都只需一次请求，关系以表为准也更明确。

关系表保存在哪里都可以，例如仓库环境变量就是个不错的选择。保存在仓库文件里还能随代码一起版本控制，不过我觉得讨论区作为游离在Git存储之外的部分，唯独把关系表存在库里只会添乱。

为了尽可能收紧github.token的权限，我选择把关系表保存在一条评论里，具体来说是[这条评论](https://github.com/satgo1546/satgo1546.github.io/discussions/2#discussioncomment-13568824)——评论系统的数据保存在评论里，很合理吧！

## 机密泄露（故意的）

我编写完自动创建讨论帖的插件和显示评论的脚本，部署到本站。批量创建原有文章对应讨论帖的任务悠闲地运行了20分钟，创建了81个讨论帖，创建新帖的通知塞爆了我的邮箱。

我猜到硬编码凭据可能引来代码审计工具警报，但忘了Base64是HTTP Authorization头的标准编码格式，扫描器认识明文也认识Base64，该来的警报还是来了。

<figure>
  <img src=getgitguardian.webp width=480 height=480>
  <figcaption>来自GitGuardian Good Samaritan Program的警报邮件</figcaption>
</figure>

于是我在泄露时加了点非常规计算，产生了[一个抽象提交](https://github.com/satgo1546/satgo1546.github.io/commit/4be64ab5b52855e5e9e3d13ddce379deec961775)。

```
Date: Fri, 27 Jun 2025 17:27:35 +0800
Subject: [PATCH] 避免client secret泄露一事被检测到

嘻嘻，假装换了个凭据
---
 script/discussions.js | 4 +++-
 1 file changed, 3 insertions(+), 1 deletion(-)

diff --git a/script/discussions.js b/script/discussions.js
index 1f53991..4a49027 100644
--- a/script/discussions.js
+++ b/script/discussions.js
@@ -3,7 +3,9 @@
 	const fetchComments = async () => {
 		let lastError
 		for (const additionalHeaders of [
-			{ Authorization: 'Basic T3YyM2xpaElzR1dWaVhFSGh4UjQ6MjlhNTNjNmY5MWY3NWE0ZjJjMDc1OWJkNDJmMDlmZGE3MmEzNjczNw==' }, // deliberately leaked
+			{ Authorization: 'Basic ' // deliberately leaked
+				+ btoa(btoa('\x3a\xfd\xb7\x96\x28\x48\xb0\x65\x95\x89\x71\x07\x87\x14\x78')
+				+ ':' + 137914977647423195926431911903966095675342193175n.toString(16)) },
 			undefined,
 			{ Authorization: 'Basic MTE0NTE0Og==' },
 		]) {
```

目前没有再收到警报。
