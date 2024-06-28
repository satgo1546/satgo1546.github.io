<script setup lang="ts">
import { useData } from 'vitepress'
import Article from '../Article.vue'
import LayoutSelector from '../LayoutSelector.vue'
import CommentItem from './CommentItem.vue';
const { title, site, frontmatter } = useData()
</script>

<template>
	<div class="site-2012">
		<div class="site">
			<header>
				<hgroup>
					<h1><a href="/" :title="site.title" rel="home">{{ site.title }}</a></h1>
					<h2>{{ site.description }}</h2>
				</hgroup>
				<nav class="main-navigation">
					<label class="menu-toggle"><input type="checkbox" hidden>菜单</label>
					<ul class="nav-menu">
						<li class="current-menu-item"><a href="/">首页</a></li>
						<li>
							<a href="/about">关于</a>
							<ul>
								<li><a href="/about/changelog">站点更新记录</a></li>
								<li><a href="https://dearti.me/satgo1546">第二时光</a></li>
								<li><a href="https://github.com/satgo1546">GitHub</a></li>
							</ul>
						</li>
					</ul>
				</nav>
			</header>
			<main>
				<Article />
				<footer class="entry-meta">
					<a href="." title="链向本文的固定链接" rel="bookmark">1919-08-10</a>
					<a class="comments-link" href="https://satgo1546.mist.so/archives/462#respond">发表评论</a>
				</footer>
				<div class="comments-area">
					<template v-if="frontmatter.comments?.length">
						<h2 class="comments-title">《{{ title }}》上有{{ frontmatter.comments.length }}条评论</h2>
						<ol class="commentlist">
							<li class="pingback">
								<p>Pingback引用通告： <a href="https://github.com/" rel="external nofollow"
										class="url">外部某页面引用了此页面</a></p>
							</li>
							<CommentItem v-for="item in frontmatter.comments" :item />
						</ol>
					</template>
					<div class="comment-respond">
						<h3>发表评论 <a v-if="false" href="javascript:undefined">取消回复</a></h3>
						<form>
							<div v-if="true">
								您的电子邮箱地址不会被公开。
								必填项已用<span class="required">*</span>标注
							</div>
							<div v-else style="margin-bottom: 13px;">
								以 {{ '%1$s' }} 的身份登录。
								<a href="https://github.com/settings/profile" rel="noreferrer">编辑您的个人资料</a>。
								<a href="https://github.com/logout" rel="noreferrer">注销？</a>
							</div>
							<label>
								<div>评论</div>
								<textarea name="comment" rows="8"></textarea>
							</label>
							<label>
								<div>姓名 <span class="required">*</span></div>
								<input id="author" name="author" type="text" required>
							</label>
							<label>
								<div>电子邮件 <span class="required">*</span></div>
								<input id="email" name="email" type="text" required>
							</label>
							<label>
								<div>站点</div>
								<input name="url" type="text">
							</label>
							<input type="submit" value="发表评论">
						</form>
					</div>
				</div>
			</main>
			<aside>
				<aside class="widget">
					<h3 class="widget-title">分类目录</h3>
					<ul>
						<li><a href="/tags/实验">实验</a></li>
						<li><a href="/tags/进度报告">进度报告</a></li>
						<li><a href="/tags/闲聊">闲聊</a></li>
					</ul>
				</aside>
				<aside class="widget">
					<h3 class="widget-title">功能</h3>
					<ul>
						<li><LayoutSelector /></li>
						<li><a href="/feed.xml">文章<abbr title="Really Simple Syndication">RSS</abbr></a></li>
						<li><a href="https://cn.wordpress.org/" title="WordPress，一个优美、先进的个人信息发布平台。">WordPress.org</a></li>
					</ul>
				</aside>
			</aside>
			<footer>
				<a href="https://vitepress.dev/" title="Vite和Vue驱动的静态站点生成器">自豪地采用VitePress</a>
			</footer>
		</div>
	</div>
</template>

<style lang="scss">
.site-2012 {
	&::before {
		content: "";
		display: table;
	}

	@import "style.scss";
}
</style>
