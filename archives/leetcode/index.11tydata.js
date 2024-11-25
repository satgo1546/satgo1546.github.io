export default {
	tags: ['算法问题'],
	eleventyComputed: {
		title: ({ page, title }) => `${page.fileSlug}. ${title}`,
	},
}
