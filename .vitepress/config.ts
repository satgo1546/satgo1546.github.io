import { type UserConfig } from 'vitepress'
import mdDeflist from 'markdown-it-deflist'

export default {
	title: 'satgo1546’s ocean',
	titleTemplate: ':title · satgo1546’s ocean',
	description: ' ',
	lang: 'zh-Hans',
	appearance: false,
	markdown: {
		breaks: true,
		container: {
			detailsLabel: ' ',
			infoLabel: ' ',
			tipLabel: ' ',
			warningLabel: ' ',
			dangerLabel: ' ',
		},
		emoji: { defs: {} },
		config(md) {
			md.use(mdDeflist)
		},
	},
	head: [
		['link', { rel: 'shortcut icon', type: 'image/svg', favicon: '/favicon.svg' }],
	],
	async transformPageData(pageData) {
		pageData.frontmatter.head ??= []
	},
} satisfies UserConfig<never>
