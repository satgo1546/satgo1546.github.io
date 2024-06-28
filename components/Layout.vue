<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { selectedLayout } from './LayoutSelector.vue'
const { frontmatter } = useData()
const layouts = import.meta.glob(['./Layout_*.vue', './Layout_*/index.vue'], { import: 'default', eager: true })
const layout = computed(() => selectedLayout.value || frontmatter.value.layout || 'TwentyTwelve')
const layoutComponent = computed(() => layouts[`./Layout_${layout.value}.vue`] ?? layouts[`./Layout_${layout.value}/index.vue`])
</script>

<template>
	<component :is="layoutComponent" />
</template>

<style lang="scss">
* {
	box-sizing: border-box;
	margin: 0;
	border: none;
	padding: 0;
	flex-shrink: 0;
	min-width: 0;
	min-height: 0;
}

ul,
ol {
	list-style: none;
}

:root {
	text-decoration-skip-ink: none;
}
</style>
