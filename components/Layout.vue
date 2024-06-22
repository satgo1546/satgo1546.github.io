<script setup lang="ts">
import { useData } from 'vitepress'
const { frontmatter } = useData()
</script>

<template>
	<a href="/">Home</a>
	<Content :lang="frontmatter.lang" :class="frontmatter.class" />
</template>

<style>
* {
	box-sizing: border-box;
	margin: 0;
	border: none;
	padding: 0;
	flex-shrink: 0;
	min-width: 0;
	min-height: 0;
}

:root {
	text-decoration-skip-ink: none;
}

body {
	display: grid;
}

header {
	grid-area: "head";
}

main {
	grid-area: "main";
}

aside {
	grid-area: "side";
}

footer {
	grid-area: "foot";
}
</style>
