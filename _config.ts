import lume from 'lume/mod.ts'
import { getCurrentVersion } from 'lume/core/utils/lume_version.ts'
import feed from 'lume/plugins/feed.ts'
import jsx from 'lume/plugins/jsx.ts'
import nav from 'lume/plugins/nav.ts'
import redirects from 'lume/plugins/redirects.ts'
import sass from 'lume/plugins/sass.ts'
import highlightPlugin from './highlight.ts'
import discussionsPlugin from './discussions.ts'

const site = lume({
	location: new URL('https://satgo1546.github.io/'),
	server: {
		debugBar: false,
	},
}, {
	markdown: {
		options: {
			breaks: true,
			linkify: false,
		},
	},
})
site.hooks.addMarkdownItRule('table_open', () => '<table class="booktabs">')
site.loadPages(['.html'], {})
site.add('')
site.ignore(path => path.endsWith('.ts') && !path.endsWith('.page.ts')
	&& !path.startsWith('/archives/') && !path.startsWith('/statuses/'))
site.use(jsx())
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
			htmlToPlainText: (content: string) => string,
		}
	}
}
site.data('layout', 'layout.tsx')
site.data('title', '<i>无标题</i>')
site.data('theme', 'theme-modern-magic light')
site.data('lang', 'zh-Hans')
site.data('generator', `Lume ${getCurrentVersion()}`)
site.data('date', new Date(0))
site.parseBasename(basename => {
	const match = basename.match(/\d{4}-\d{2}-\d{2}/)
	if (match) return { date: new Date(match[0]) }
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
			page.data.dates = +page.data.date
				? page.data.date.toISOString().slice(0, 10)
				: ''
		}
		// Prevent the Norway problem.
		if (!(
			typeof page.data.title === 'string'
			&& (page.data.description === undefined || typeof page.data.description === 'string')
			&& typeof page.data.dates === 'string'
			&& typeof page.data.lang === 'string'
			&& typeof page.data.theme === 'string'
			&& Array.isArray(page.data.tags) && page.data.tags.every(tag => typeof tag === 'string')
		)) {
			throw new Error('wrong data type in ' + page.sourcePath)
		}
	}
})
const slugify = (content: string) => content.replace(/[\\\/:*?"<>| !@#$%^&`'{}-]+/g, '-').replace(/^-|-$/g, '')
site.data('slugify', slugify)
site.data('tagUrl', (tag: string) => `/tags/${slugify(tag)}/`)
// For use in metadata fields such as title that should allow HTML but require plaintext in some places.
// This does not cover everything, but I do not write fancy entities in title and description anyway.
site.data('htmlToPlainText', (content: string) =>
	content.replace(/<[^>]*>/g, '')
		.replaceAll('&lt;', '<').replaceAll('&gt;', '>')
		.replaceAll('&amp;', '&')
)

site.use(highlightPlugin)
site.use(feed({
	output: ['/feed.xml'],
	query: 'url^="/archive|/status"',
	sort: 'date=desc',
	limit: 8,
	info: {
		lang: 'zh-Hans',
		title: 'satgo1546’s ocean',
		authorName: 'Frog Chen',
		generator: true,
	},
}))
site.use(discussionsPlugin)
site.use(nav())
site.use(redirects())

export default site
