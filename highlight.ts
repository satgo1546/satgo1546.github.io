import { ensureDir } from 'jsr:@std/fs@1.0.9'
import { codeToTokens, bundledLanguages, BundledLanguage } from 'npm:shiki'
import theme from './style/tm-theme.js'

const Cache = {
	ofCache: new Map<string, string>,

	async filename(content: string, key: string): Promise<string> {
		let hash = Cache.ofCache.get(content)
		if (!hash) {
			hash = new Uint8Array(await crypto.subtle.digest('sha-256', typeof content === 'string' ? new TextEncoder().encode(content) : content)).join('_')
			Cache.ofCache.set(content, hash)
		}
		return `_cache/${hash}-${encodeURIComponent(key)}`
	},

	async set(content: string, key: string, result: string): Promise<void> {
		await ensureDir('_cache')
		await Deno.writeTextFile(await Cache.filename(content, key), result)
	},

	async get(content: string, key: string): Promise<string | undefined> {
		try {
			return await Deno.readTextFile(await Cache.filename(content, key))
		} catch {
			// ignore
		}
	}
}

export default function (site: Lume.Site) {
	site.process(['.html'], async (pages: Lume.Page[]) => {
		for (const page of pages) {
			const article = page.document!.getElementsByTagName('article')[0]
			if (!article) continue

			for (const node of article.getElementsByTagName('code')) {
				const lang = /(?:^|\s)language-(\S*)/.exec(node.className)?.[1]
				if (!lang) continue
				// I don't know why adding `source.diff` to monospaceLanguageScope in tm-theme.js doesn't work.
				// It is a temporary measure to force diff to be monospace anyway.
				// Proper layered highlighting should be done.
				if (lang === 'diff') {
					node.classList.remove('language-diff')
					continue
				}
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
				const cached = await Cache.get(source, lang)
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
				Cache.set(source, lang, node.innerHTML)
			}
		}
	})
}
