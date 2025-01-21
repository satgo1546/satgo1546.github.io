import lume from 'lume/mod.ts'
import { getCurrentVersion } from 'lume/core/utils/lume_version.ts'
import feed from 'lume/plugins/feed.ts'
import jsxPreact from 'lume/plugins/jsx_preact.ts'
import nav from 'lume/plugins/nav.ts'
import redirects from 'lume/plugins/redirects.ts'
import sass from 'lume/plugins/sass.ts'
import highlightPlugin from './highlight.ts'

const site = lume({
	location: new URL('https://satgo1546.github.io/'),
}, {
	markdown: {
		options: {
			breaks: true,
			linkify: true,
		},
	},
})
site.hooks.addMarkdownItRule('table_open', () => '<table class="booktabs">')
site.loadPages(['.html'], {})
site.copyRemainingFiles()
site.use(jsxPreact()) // 【TODO：看看能不能干掉这玩意】
site.use(sass({
	options: {
		silenceDeprecations: ['mixed-decls'],
	},
}))
site.scopedUpdates(
	path => /\.s?css$/.test(path),
)
site.options.watcher.ignore.push('_cache')

declare global {
	namespace Lume {
		interface Data {
			theme: string,
			generator: string,
			description: string,
			dates: string,
			sourcePath: string,
			slugify: typeof slugify,
			tagUrl: (tag: string) => string,
		}
	}
}
site.data('layout', 'layout.tsx')
site.data('title', '<i>无标题</i>')
site.data('theme', 'theme-modern-magic light')
site.data('lang', 'zh-Hans')
site.data('generator', `Lume v${getCurrentVersion()}`)
site.data('tags', ['post', 'archive'], '/archives')
site.data('tags', ['post', 'status'], '/statuses')
site.parseBasename(basename => {
	const match = basename.match(/\d{4}-\d{2}-\d{2}/)
	if (match) {
		return {
			date: new Date(match[0])
		}
	}
})
site.preprocess([".html"], pages => {
	for (const page of pages) {
		page.data.sourcePath = page.sourcePath
		if (page.sourcePath.startsWith('/archives/leetcode/')) {
			page.data.title = `${page.data.basename}. ${page.data.title}`
		}
		if (!page.data.description && page.data.excerpt) {
			page.data.description = `<blockquote>${page.data.excerpt}</blockquote>`
		}
		if (!page.data.dates) {
			page.data.dates = page.data.date.toISOString().slice(0, 10)
		}
	}
})
const slugify = (content: string) => content.replace(/[\\\/:*?"<>| !@#$%^&`'{}-]+/g, '-').replace(/^-|-$/g, '')
site.data('slugify', slugify)
site.data('tagUrl', (tag: string) => `/tags/${slugify(tag)}/`)

site.use(highlightPlugin)
site.use(feed({
	output: ['/feed.xml'],
	query: 'post',
	sort: 'date=desc',
	limit: 8,
	info: {
		lang: 'zh-Hans',
		title: 'satgo1546’s ocean',
		authorName: 'Frog Chen',
		generator: true,
	},
}))
site.use(nav())
site.use(redirects())

export default site
