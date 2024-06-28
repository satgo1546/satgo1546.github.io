<script setup lang="ts">
import Article from '../Article.vue'
</script>

<template>
	<div class="site">
		<header>
		</header>
		<main>
			<Article />
		</main>
		<aside>
		</aside>
		<footer>
		</footer>
	</div>
</template>

<style lang="scss" scoped>
.site {
	display: grid;
	grid:
		"head head" 300px "side main"
		"foot foot"
		/ minmax(auto, 160px) 1fr;
	gap: 8px;
}

.site>* {
	border: 3px solid;
}

.site>header {
	grid-area: head;
}

.site>main {
	grid-area: main;
}

.site>aside {
	grid-area: side;
}

.site>footer {
	grid-area: foot;
}
</style>
