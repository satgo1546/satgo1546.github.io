<script setup lang="ts">
import ByPostAuthorBadge from './ByPostAuthorBadge.vue'

type Comment = {
	author: string,
	time: Date,
	content: string,
	children?: Comment[],
}

defineProps<{
	item: Comment,
}>()
</script>

<template>
	<li class="comment">
		<article class="comment">
			<header class="comment-meta comment-author">
				<img :src="`https://avatars.githubusercontent.com/${item.author}`" height="44" width="44">
				<cite>
					<b><a :href="`https://github.org/${item.author}`" class="url">{{ item.author }}</a></b>
					<!-- 偷偷硬编码一下！ -->
					<ByPostAuthorBadge v-if="item.author === 'satgo1546'" />
				</cite>
				<!-- TODO：正确的ISO datetime字符串；定位到GH discussion -->
				<a href="https://github.com/"><time :datetime="item.time">{{ item.time }}</time></a>
			</header>
			<section class="comment-content comment" v-html="item.content" />
			<div class="reply">
				<a class="comment-reply-link" href="javascript:undefined">回复</a>↓
			</div>
		</article>
		<ol v-if="item.children?.length" class="children">
			<CommentItem v-for="child of item.children" :item="child" />
		</ol>
	</li>
</template>
