---
title: 狡兔十八窟 ~静态网页免费建站服务测评~
date: 2022-11-12
tags:
- 实验
---

<div class="admonition">
本文最初发表在<a href="https://salenzo.readthedocs.io/webring.html">Ŝalenzo.RTFD.io</a>。
</div>

功能 | [GitHub Pages](https://pages.github.com/) | [Cloudflare Pages](https://pages.cloudflare.com/) | [Netlify](https://www.netlify.com/) | [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/) | [Read the Docs](https://readthedocs.io/) | [Neocities](https://neocities.org/)
-|-|-|-|-|-|-
免费域名 | `*.github.io` | `*.pages.dev` | `*.netlify.app` | `*.gitlab.io` | `*.readthedocs.io`；附送`*.rtfd.io` | `*.neocities.io`
使用自购域名 | ✓ | ✓ | ✓ | ✓ | ✓ | —
版本控制 | ✔ | ✓ | ✓ | ✔ | ✔ | —
存储 | 1 GB | [20000文件；25 MB/文件](https://developers.cloudflare.com/pages/platform/limits/) | ∞ | [10 GB](https://docs.gitlab.com/ee/user/gitlab_com/index.html#account-and-limit-settings) | ? | [1 GB](https://neocities.org/supporter)
流量 | [~100 GB/月](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#usage-limits) | ∞ | 100 GB/月 | ? | ? | ~200 GB
持续集成 | [6小时/次；~10次/小时](https://docs.github.com/en/actions/learn-github-actions/usage-limits-billing-and-administration) | 20分钟/次；500次/月 | 300分钟/月 | 400分钟/月 | [15分钟/次](https://docs.readthedocs.io/en/stable/builds.html) | —
生成器偏好 | Jekyll | 任意 | 任意 | 任意 | Sphinx和MkDocs | 原生

— = 不可用；✓ = 可用；✔ = 强制

标注为∞的项目可能受到其他因素制约。

Read the Docs在HTTP标头中指示页面缓存一天，因此不强制刷新就无法看到最新更改。

2021年5月17日后注册的GitLab账户需要绑定银行卡才可免费使用公用持续集成服务。GitLab Pages必须通过持续集成工作。GitLab支持用户自己提供持续集成运行器，机子无需开放到公网，可以使用自己的电脑作为运行器。故通过安装软件仍可免费使用GitLab Pages服务。

虽然Neocities不提供版本控制集成和持续集成，但提供命令行和REST API。Neocities禁止将资源用于外链，且[限制文件扩展名](https://neocities.org/site_files/allowed_types)为建站资源，特别是不允许可执行文件和压缩包，也不允许上传视频和音乐。

Vercel不支持从组织名下的仓库部署，使用Vercel CLI可绕过这一限制。

Forestry.io免费站点不活动三个月后将自动关闭，登录后台即可恢复。

SourceForge为开源项目提供`*.sourceforge.io`（原为`*.sourceforge.net`）域名网站托管服务，似乎除了静态网页以外，还支持动态的PHP和CGI程序。

Azure需要绑定银行卡才可注册，使用永久免费的Azure Static Web Apps也不例外。

https://render.com/

https://codeberg.page/
