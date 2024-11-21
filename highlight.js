import { codeToTokens, bundledLanguages, bundledLanguagesInfo } from 'shiki'
import { escapeUTF8, decodeHTML } from 'entities'
import theme from './style/tm-theme.js'

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default function (eleventyConfig) {
	// Whoa, what a problematic leaking interface.
	// With it enabled, my pages die, so no-go.
	//eleventyConfig.htmlTransformer.setPosthtmlProcessOptions({ decodeEntities: true })
	// @ts-expect-error htmlTransformer API is not yet published, but used in eleventy-image.
	eleventyConfig.htmlTransformer.addPosthtmlPlugin('html', context => async tree => {
		// The docs for PostHTML is horrible. Just read the source.
		// PostHTML does only minimal parsing. Entities in text nodes are left untouched.
		// walk, match - https://github.com/posthtml/posthtml/blob/master/lib/api.js
		// https://github.com/posthtml/posthtml-parser/blob/master/src/index.ts
		const tasks = []
		tree.walk(node => {
			if (node.tag === 'code' && node.attrs?.class) {
				const lang = /(?:^|\s)language-(\S*)/.exec(node.attrs.class)?.[1]
				if (lang) {
					if (node.content.length > 1 || typeof node.content[0] !== 'string') {
						console.warn('non-plaintext code span')
					}
					if (Object.hasOwn(bundledLanguages, lang)) {
						tasks.push({ node, lang })
					} else {
						console.warn('unknown language ', lang)
					}
				}
			}
			return node
		})
		for (const { node, lang } of tasks) {
			let source = node.content[0]
			// https://prismjs.com/plugins/unescaped-markup/
			if (source.startsWith('<!--') && source.endsWith('-->')) {
				source = source.slice(4, -3)
			} else {
				source = decodeHTML(source)
			}
			const {
				tokens,
				grammarState: { lang: resolvedLang },
			} = await codeToTokens(source, { lang, theme })
			node.content = tokens.flatMap((line, i, { length }) => {
				const spans = line.map(token => {
					let className = token.color
					if (token.fontStyle & 1) className += ' italic'
					if (token.fontStyle & 2) className += ' bold'
					if (token.fontStyle & 4) className += ' underline'
					if (token.fontStyle & 8) className += ' faint'
					const content = escapeUTF8(token.content)
					return className ? {
						tag: 'span',
						attrs: { class: className },
						content: [content],
					} : content
				})
				if (i < length - 1) spans.push('\n')
				return spans
			})
			if (lang !== resolvedLang) {
				node.attrs.class += ` language-${resolvedLang}`
			}
		}
		return tree
	}, {
		priority: 114514,
	})
}