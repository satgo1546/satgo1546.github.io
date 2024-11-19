// @ts-check
import Prism from 'prismjs'
import loadLanguages from 'prismjs/components/index.js'
import { escapeUTF8, decodeHTML } from 'entities'

	loadLanguages()
	// Languages have aliases.
	// Aliases are created by having multiple language names pointing to the same grammar object.
	// They make trouble regarding language-specific styling and such, so normalize them.
	const reverseMap = new Map
	for (const language in Prism.languages) {
		reverseMap.set(Prism.languages[language],
			(reverseMap.get(Prism.languages[language]) ?? '') + ' language-' + language)
	}

function tokensToSpans(o) {
	if (typeof o == 'string') {
		return escapeUTF8(o)
	} else if (Array.isArray(o)) {
		return o.map(tokensToSpans)
	}
	// o is Prism.Token.
	let classes = `token ${o.type} `
	if (Array.isArray(o.alias)) {
		classes += o.alias.join(' ')
	} else if (o.alias) {
		classes += o.alias
	}

	return {
		tag: 'span',
		attrs: {
			class: classes,
		},
		content: tokensToSpans(o.content),
	}
}

/** @param {import('@11ty/eleventy').UserConfig} eleventyConfig */
export default function (eleventyConfig) {
	// Whoa, what a problematic leaking interface.
	// With it enabled, my pages die, so no-go.
	//eleventyConfig.htmlTransformer.setPosthtmlProcessOptions({ decodeEntities: true })
	// @ts-expect-error htmlTransformer API is not yet published, but used in eleventy-image.
	eleventyConfig.htmlTransformer.addPosthtmlPlugin('html', context => tree => {
		// The docs for PostHTML is horrible. Just read the source.
		// PostHTML does only minimal parsing. Entities in text nodes are left untouched.
		// walk, match - https://github.com/posthtml/posthtml/blob/master/lib/api.js
		// https://github.com/posthtml/posthtml-parser/blob/master/src/index.ts
		tree.walk(node => {
			if (node.tag === 'code' && node.attrs?.class) {
				const language = /(?:^|\s)language-(\S*)/.exec(node.attrs.class)?.[1]
				if (language) {
					if (node.content.length > 1 || typeof node.content[0] !== 'string') {
						console.warn('non-plaintext code span')
					}
					if (Object.hasOwn(Prism.languages, language)) {
						let source = node.content[0]
						// https://prismjs.com/plugins/unescaped-markup/
						if (source.startsWith('<!--') && source.endsWith('-->')) {
							source = source.slice(4, -3)
						} else {
							source = decodeHTML(source)
						}
						const tokens = Prism.tokenize(source, Prism.languages[language])
						node.content = tokensToSpans(tokens)
						node.attrs.class += reverseMap.get(Prism.languages[language])
					} else {
						console.warn('unknown language ', language)
					}
				}
			}
			return node
		})
		return tree
	}, {
		priority: 114514,
	})
}