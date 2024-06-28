<script setup lang="ts">
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>

<template>
	<article :lang="frontmatter.lang" :class="frontmatter.class">
		<Content />
	</article>
</template>

<style lang="scss" scoped>
// Sat's 黑幕
:deep(.spoiler) {
	color: black;
	background: black;

	&:hover {
		color: white;
	}
}
</style>
