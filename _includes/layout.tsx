export const layout = 'base.tsx'
export default (data: Lume.Data) => {
	return <>
		<header>
			<hgroup>
				<h1><a href="/" title="satgo1546’s ocean" rel="home">satgo1546’s ocean</a></h1>
			</hgroup>
			<nav class="main-navigation">
				<label class="menu-toggle"><input type="checkbox" hidden />菜单</label>
				<ul class="nav-menu">
					<li class="current-menu-item"><a href="/">首页</a></li>
					<li>
						<a href="/pages/about/">关于</a>
						<ul>
							<li><a href="/pages/changelog/">站点更新记录</a></li>
							<li><a href="https://dearti.me/satgo1546">第二时光</a></li>
							<li><a href="https://github.com/satgo1546">GitHub</a></li>
						</ul>
					</li>
				</ul>
			</nav>
		</header>

		<main>
			<article lang={data.lang}>
				<h1 dangerouslySetInnerHTML={{ __html: String(data.title) }} />
				{data.children}
			</article>
			<footer class="entry-meta">
				<a href="." title="链向本文的固定链接" rel="bookmark">{data.dates || '固定链接'}</a>
				<a class="comments-link" href="javascript:alert('还没做')">发表评论</a>
				<a href={'https://github.com/satgo1546/satgo1546.github.io/blob/main' + data.sourcePath}>查看源代码</a>
			</footer>
			<div class="comments-area">
				{!!data.comments?.length && <>
					<h2 class="comments-title">《title》上有comments.length条评论</h2>
					<ol class="commentlist">
						<li class="pingback">
							<p>Pingback引用通告： <a href="https://github.com/" rel="external nofollow" class="url">外部某页面引用了此页面</a></p>
						</li>
						{/*<CommentItem v-for="item in frontmatter.comments" :item />*/}
					</ol>
				</>}
				{/*<div class="comment-respond">
					<h3>发表评论</h3>
					<form>
						<input type="submit" value="发表评论" />
					</form>
				</div>*/}
			</div>
		</main>

		<aside>
			<aside class="widget">
				<h3 class="widget-title">分类目录</h3>
				<ul>
					<li><a href="/tags/实验/">实验</a></li>
					<li><a href="/tags/进度报告/">进度报告</a></li>
					<li><a href="/tags/闲聊/">闲聊</a></li>
				</ul>
			</aside>
			<aside class="widget">
				<h3 class="widget-title">功能</h3>
				<ul>
					<li>
						{/* <LayoutSelector /> */}
					</li>
					<li><a href="/feed.xml">文章RSS</a></li>
					<li><a href="https://cn.wordpress.org/" title="WordPress，一个优美、先进的个人信息发布平台。">WordPress.org</a></li>
					<li><a href="https://www.11ty.dev/" title="Eleventy是一个更简单的静态站点生成器">Eleventy</a></li>
				</ul>
			</aside>
		</aside>

		<footer>
			<a href="https://lume.land/" title="适用于Deno的快速、灵活的静态站点生成器">自豪地采用Lume</a>
		</footer>
	</>
}
