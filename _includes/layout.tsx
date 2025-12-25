export const layout = 'base.tsx'
export default (data: Lume.Data) => {
	return <>
		<header>
			<hgroup lang="en">
				<h1><a href="/" title="satgo1546’s ocean" rel="home">satgo1546’s ocean</a></h1>
				<h2>Any sufficiently primitive magic is indistinguishable from technology.</h2>
			</hgroup>
			<nav class="main-navigation">
				<label class="menu-toggle"><input type="checkbox" hidden />菜单</label>
				<ul class="nav-menu">
					<li class="current-menu-item"><a href="/">首页</a></li>
					<li><a href="/pages/">页面</a></li>
					<li><a href="/tags/">标签</a></li>
					{/* <li>
						<a href="/pages/about/">关于</a>
						博客是巨大的草稿箱
						<ul>
							<li><a href="https://dearti.me/satgo1546">第二时光</a></li>
							<li><a href="https://github.com/satgo1546">GitHub</a></li>
						</ul>
					</li> */}
				</ul>
			</nav>
		</header>

		<main>
			<article lang={data.lang}>
				<h1 dangerouslySetInnerHTML={{ __html: String(data.title) }} />
				{data.children}
				<script defer src="/script/toc.js" />
			</article>
			<footer class="entry-meta">
				<a href="." title="链向本文的固定链接" rel="bookmark">{data.dates || '固定链接'}</a>
				{data.githubDiscussionNumber && <a class="comments-link" href={'https://github.com/satgo1546/satgo1546.github.io/discussions/' + data.githubDiscussionNumber}>发表评论</a>}
				<a href={'https://github.com/satgo1546/satgo1546.github.io/blob/main'
					+ data.sourcePath.replace(/\[\d+\]\.page\./, '.page.')}>查看源代码</a>
				{!!data.tags.length && <ul>
					{data.tags.map(tag => {
						const count = data.search.pages(`"${tag}"`).length
						return count > 1 ? <li>
							<a href={data.tagUrl(tag)} rel="tag">{tag}</a>
							<small>{count}</small>
						</li> : <li title="该标签只有本文使用">{tag}</li>
					})}
				</ul>}
			</footer>
			{data.githubDiscussionNumber && <div class="comments-area">
				<script defer src="/script/discussions.js" data-n={data.githubDiscussionNumber} />
				<a href={'https://github.com/satgo1546/satgo1546.github.io/discussions/' + data.githubDiscussionNumber}>在GitHub上查看和发表评论</a>。
			</div>}
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
