import { type UserConfig } from 'vitepress'
import type { ThemeRegistrationAny, BundledTheme } from 'shiki'
import mdDeflist from 'markdown-it-deflist'
import tmTomorrow from '../components/Layout_TwentyTwelve/tomorrow'

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
		async shikiSetup(shiki) {
			await shiki.loadTheme('ayu-dark')
		},
		theme: {
			light: tmTomorrow,
			dark: 'material-theme-ocean',
			more: 'ayu-dark',
		} as Record<string, ThemeRegistrationAny | BundledTheme>,
		languageAlias: {
			webc: 'html',
		},
		codeTransformers: [],
		codeCopyButtonTitle: '复制代码',
		config(md) {
			md.disable(['emoji'])
			md.use(mdDeflist)
		},
	},
	head: [
		['link', { rel: 'shortcut icon', type: 'image/svg', favicon: '/favicon.svg' }],
	],
	async transformPageData(pageData) {
		pageData.frontmatter.head ??= []
		if (pageData.frontmatter.tags) {
			pageData.frontmatter.head.push(['meta', {
				name: 'keywords',
				content: pageData.frontmatter.tags.join()
			}])
		}
	},
} satisfies UserConfig<never>
