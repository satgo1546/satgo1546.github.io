import { codeToTokens, bundledLanguages, BundledLanguage } from 'npm:shiki'
import theme from './style/tm-theme.js'
import Cache from 'lume/core/cache.ts'

export default function (site: Lume.Site) {
	const cache = new Cache({folder:site.root('_cache')})
	site.process(['.html'], async pages => {
		for (const page of pages) {
			for (const node of page.document!.getElementsByTagName('code')) {
				const lang = /(?:^|\s)language-(\S*)/.exec(node.className)?.[1]
				if (!lang) continue
				if (node.childNodes.length > 1) {
					console.warn('non-plaintext code span')
				}
				if (!Object.hasOwn(bundledLanguages, lang)) {
					console.warn('unknown language ', lang)
					continue
				}

				// Note that we have not checked whether the child is a text node or a comment node.
				// It is expected that both are accepted.
				// https://prismjs.com/plugins/unescaped-markup/
				const source = (node.childNodes[0]?.textContent ?? '').replace(/^\n|\n[ \t]*$/g, '')
				const cached = await cache.getText(source, lang)
				if (cached) {
					node.innerHTML = cached
					continue
				}
				const { tokens } = await codeToTokens(source, { lang: lang as BundledLanguage, theme })
				node.textContent = ''
				node.append(...tokens.flatMap((line, i, { length }) => {
					const spans = line.map(token => {
						let className = token.color
						if (token.fontStyle) {
							if (token.fontStyle & 1) className += ' italic'
							if (token.fontStyle & 2) className += ' bold'
							if (token.fontStyle & 4) className += ' underline'
							if (token.fontStyle & 8) className += ' faint'
						}
						if (className) {
							const span = page.document!.createElement('span')
							span.className = className
							span.textContent = token.content
							return span
						} else {
							return page.document!.createTextNode(token.content)
						}
					})
					if (i < length - 1) spans.push(page.document!.createTextNode('\n'))
					return spans
				}))
				cache.set(source, lang, node.innerHTML)
			}
		}
	})
}
