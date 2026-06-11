---
title: 超文本对时协议
date: 2026-06-11
dates: "2026-06-11"
excerpt: 能对上与否的影响巨大，精确到零点几秒就没有那么重要了。这一点上，HTTP完胜。
tags:
- 进度报告
- NTP
---

我使用的树莓派没有[纽扣电池槽](https://www.raspberrypi.com/products/rtc-battery/)，断电再启会重置系统时间，导致一部分日志时间戳变得莫名其妙。

我安装Alpine Linux时配置了ntpd，重启后理应很快恢复正确的时间，然而事实是有时放置十分钟都恢复不了。

测试发现，常用的NTP服务器time.windows.com（Windows默认值）和pool.ntp.org（Alpine BusyBox ntpd默认值，由[NTP池项目](https://www.ntppool.org/)提供，自动就近随机路由）我这边连接不稳定，经常超时。

国内的NTP服务器就更加难以信赖了：国家授时中心的NTP服务ntp.ntsc.ac.cn时断时续；[某些云厂商的对时服务只允许自家服务器使用](https://support.huaweicloud.com/ecs_faq/zh-cn_topic_0093971249.html "华为云有没有提供NTP服务器，怎样配置？
有，该NTP服务器仅限于在华为云控制台上购买的弹性云服务器配置使用。")；mirror.sjtu.edu.cn的可用性已超越GitHub达到了一个9，那么ntp.sjtu.edu.cn的可用性……😾

作为网络大爆炸时期诞生的产物，基于UDP的NTP已经不适合如今数据包应丢尽丢、只有唯一指定协议HTTPS能稳定使用的网络环境了。或许curl <https://time.is/>才是更有抗性的方式。

```console
$ curl https://time.is/
<h1 style="font-family:sans-serif;padding:20px">Please do not scrape our pages! Thanks!</h1>
```

<pre style="text-align: center;">😾😾😾</pre>

我想到了网站对时法。具体来说，HTTP响应的Date头指示精确到秒的服务器时间，因此只要能访问*任何*网站，就能利用该字段校准时间。

无论什么样的网站都可以。技术上来说，该标头可以省略，但因为其有助于浏览器正确缓存，一般不会省略。就算是禁止无凭据访问的网站，或是故意拒绝某些UA的网站 😾 也会在返回的403响应头中包含当前时间。

```console
$ curl --head --no-progress-meter https://time.is/ | grep -i '^date:'
date: Thu, 11 Jun 2026 11:45:14 GMT
```

```js
const dates = (await Promise.allSettled([
	'https://mirror.sjtu.edu.cn/',
	// 追加更多网站以提升可靠性
	'https://www.baidu.com/',
	'https://www.aliyun.com/',
	'https://www.qq.com/',
	'https://www.huaweicloud.com/', // 不让用也得让用 😾
	'https://time.is/',
].map(async url => {
	await fetch(url) // 先建立连接
	const local = performance.now()
	const dateHeader = (await fetch(url)).headers.get('date')
	let remote = Date.parse(dateHeader)
	if (Number.isNaN(remote)) throw new Error('no date')
	remote -= (performance.now() - local) / 2
	console.log(`${dateHeader}\t${url}`)
	return { url, local, remote }
})))
	.filter(({ status }) => status === 'fulfilled')
	.map(({ value: { local, remote } }) => remote + performance.now() - local)
	.sort((a, b) => a - b)
console.log(new Date(dates[dates.length >> 1]).toUTCString())
```

关于上述代码中第一条丢弃结果的fetch的作用，参照[NIST的原子钟都烂成这样了](/statuses/2026-05-07/)中提到的博文<a href="https://alexsci.com/blog/how-time-gov-works/" lang="en">How an HTTP header caused time.gov to skew from UTC</a>。另需注意，使用HTTPS时需要无视风险坚持访问，因为证书有效期验证依赖准确的本地时间。

HTTP时间只精确到秒；取决于连接的服务器层级（stratum）和距离，NTP的时间同步精度可达毫秒级甚至微秒级。但是，相比少得可怜的NTP服务器，可用的HTTP服务器数量多了好几个量级，其中总有方便访问的。能对上与否的影响巨大，精确到零点几秒就没有那么重要了。这一点上，HTTP完胜。

正当我思考如何自动根据程序运行结果设置系统时间时，我发现，我想要做的，前人们都做过了 😾

<blockquote lang=en>
	<p>Htpdate will synchronize your computer's time by extracting timestamps from HTTP headers found in web server responses.</p>
</blockquote>

[htpdate在Debian、Alpine、AUR等仓库中可用。](https://repology.org/project/htpdate/versions)

我删除了ntpd，完全拥抱[htpdate](https://www.vervest.org/htp/)。
