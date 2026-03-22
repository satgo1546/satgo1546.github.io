---
title: 关闭全服防御系统（Tailscale和Forgejo篇）
date: 2026-03-21
dates: "2026-03-21"
excerpt: 不管了，以root身份运行Tailscale又不是不能用 😾
tags:
- 进度报告
- Tailscale
- Forgejo
---

我在树莓派上运行[Alpine Linux](https://alpinelinux.org/)和[Caddy](https://caddyserver.com/)，将若干服务集成到一个HTTP端口，然后通过[Tailscale Funnel](https://tailscale.com/docs/features/tailscale-funnel)允许公网访问。目前这些服务包括[Forgejo](https://forgejo.org/)（含runner）、[copyparty](https://github.com/9001/copyparty)、[Zellij](https://zellij.dev/)。各个服务各管各的鉴权，一派混乱。这个服务器的安全程度之低，如果部署个Theresa什么的话，可能已经死了。

## Tailscale

通过`apk add tailscale`安装Tailscale后会提示：

```
*
* tailscaled runs as root by default. For security reasons, we highly
* recommend that you run it under an unprivileged user. See command_user
* in /etc/conf.d/tailscale for more information.
*
```

其指向的/etc/conf.d/tailscale里如此写道：

```ini
# User and group to run tailscaled as.
#
# IMPORTANT: It's highly recommended to change this to "tailscale:tailscale" to
# run tailscaled without root privileges. However, in order for tailscaled to
# control /etc/resolv.conf, you must use either openresolv or networkmanager
# (tailscaled detects this based on the generated comment in resolv.conf).
# If you change this after running tailscale for the first time, you will need
# to run `chown -r tailscale:tailscale /var/lib/tailscale`.
#command_user="tailscale:tailscale"
```

Alpine默认安装不带DNS管理软件，此时要修改DNS设置只能覆盖/etc/resolv.conf。为了覆盖该系统文件，Tailscale必须以root身份运行。如果想降权，需要先安装一个受Tailscale支持的DNS管理器。

我尝试了openresolv，但[Tailscale、openresolv、静态IP配置三者同时存在冲突](https://github.com/tailscale/tailscale/issues/11129#issuecomment-2040836780)。

单为了DNS去配置NetworkManager感觉又很莫名其妙。因为我控制树莓派的唯一通道是局域网WiFi ssh连接，如果网络配置有误，就只能卸下SD卡离线修改文件系统了。我在安装操作系统的时候已经搞坏过一回了，不想再体验第二遍 😾

不管了，以root身份运行Tailscale又不是不能用 😾

## Forgejo

Forgejo文档指出[应该用独立的用户来运行forgejo](https://forgejo.org/docs/latest/admin/config-cheat-sheet/#:~:text=RUN_USER,-%3A%20current%20OS%20username)：

<blockquote lang=en>

- `RUN_USER`: ***current OS username*/`$USER`/`$USERNAME` e.g. git**: The user Forgejo will run as. This should be a dedicated system (non-user) account. Setting this incorrectly will cause Forgejo to not start.

</blockquote>

Forgejo Runner也[应该用独立的用户、独立家目录运行，最好是在一台与Forgejo所在设备不同的专门机器上运行](https://forgejo.org/docs/latest/admin/actions/runner-installation/#starting-the-runner)：

<blockquote lang=en>

[Forgejo Runner] needs to be installed separately from the main Forgejo instance. For security reasons it is **not recommended** to install the runner on the same machine as the main instance.

</blockquote>

<blockquote lang=en>

### Starting the runner

After the runner has been registered, it can be started by running `forgejo-runner daemon` as the `runner` user, in the home directory:

```console
$ whoami
runner
$ pwd
/home/runner
$ forgejo-runner daemon
INFO[2024-09-14T19:19:14+02:00] Starting runner daemon
```

</blockquote>

通过包管理器安装这些软件时通常会自动创建用户，服务也配置好由这些用户运行。例如Alpine的场合，`doas rc-service forgejo start`便是以forgejo用户的身份启动服务。

Forgejo Actions通常配置为在容器内执行，每次运行创建一个新的容器。文档中也介绍了如何对接Docker和Podman等容器运行时。

但是实际上，这些通通都不是必要的 😾 这个Git服务本来就只有我一个人用，还开启了service.REQUIRE_SIGNIN_VIEW和service.DISABLE_REGISTRATION，不登录到管理员账号什么事都做不了，并不适用为多账户使用考虑的安全措施。

我想要在actions中直接接触机器上的进程和文件系统，以实现本机持续部署。通过已开放的Git服务，容器可以操作Git仓库内容，用于持续集成，但除了再搞一些部署接口，我想不出如何从容器内将项目部署到容器外。这也太麻烦了。

简单的部署不一定要用actions系统。Forgejo除了webhook外也支持原生Git钩子，但由于推送时执行任意命令太过恐怖而默认完全禁用，需要开启[security.DISABLE\_GIT\_HOOKS](https://forgejo.org/docs/latest/admin/config-cheat-sheet/#:~:text=DISABLE%5FGIT%5FHOOKS)配置。

<blockquote lang=en>

WARNING: Custom Git Hooks can be used to perform arbitrary code execution on the host operating system. This enables users to access and modify this config file and the Forgejo database and interrupt the Forgejo service. By modifying the Forgejo database, users can gain Forgejo administrator privileges. It also enables them to access other resources available to the user on the operating system that is running the Forgejo instance and perform arbitrary actions in the name of the Forgejo OS user. This may be harmful to your website or your operating system.

</blockquote>

而actions好就好在有日志UI可用。所以我选择在注册runner时设置host标签，去除容器隔离。

<blockquote lang=en>

**Warning:** there is no isolation at all and a single job can permanently destroy the host.

</blockquote>

去除容器隔离后还有用户隔离。实际上Forgejo和Forgejo Runner完全可以用同一个用户运行。runner也不需要专门的家目录，只需要当前工作目录下有.runner配置文件就能启动。

到这一步，持续集成也不再需要用token执行git clone操作。Forgejo的Git数据保存在.git裸仓库文件夹中，可以直接从中检出工作树。

```
forgejo/
├── data
│   ├── forgejo.db
│   ⋮
├── git
│   └── ⟨用户名⟩
│       ├── ⟨仓库名⟩.git
│       │   ├── HEAD
│       │   ├── config
│       │   ├── description
│       │   ├── git-daemon-export-ok
│       │   ├── hooks
│       │   ├── info
│       │   ├── logs
│       │   ├── objects
│       │   └── refs
│       │       ├── heads
│       │       │   └── main
⋮       ⋮       └── tags
```

```sh
git --git-dir=/path/to/forgejo/git/user/repo.git worktree add .
```

话说，既然已经有数据库了，为什么Forgejo不[把Git仓库数据也放在数据库里](https://nesbitt.io/2026/02/26/git-in-postgres.html "Git in Postgres")呢？总不能是因为Git事实上只有一个实现吧 😾
