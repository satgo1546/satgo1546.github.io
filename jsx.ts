// https://deno.land/x/lume@v2.5.3/plugins/jsx_preact.ts
import { preact, renderToString } from 'lume/deps/preact.ts'
import loader from 'lume/core/loaders/module.ts'

// Hack to remove the <div> inserted at Preact–HTML boundary.
// https://github.com/preactjs/preact/discussions/4311
export default function (site: Lume.Site) {
	const helpers: Record<string, Function> = {}
	site.loadPages(['.jsx', '.tsx'], {
		loader,
		engine: {
			includes: site.options.includes,
			addHelper(name, fn) {
				helpers[name] = fn
			},
			async render(content: unknown, data: Record<string, unknown> = {}) {
				// The content is a string, so we have to convert it to a Preact element.
				if (typeof content === 'string') {
					content = preact.h('preact-fragment', {
						dangerouslySetInnerHTML: { __html: content },
					})
				}

				// Create the children property.
				let children = data.content

				// If the children is a string, convert it to a Preact element.
				if (typeof children === 'string') {
					children = preact.h('preact-fragment', {
						dangerouslySetInnerHTML: { __html: children },
					})
				}

				const element =
					typeof content === 'object' && preact.isValidElement(content)
						? content
						: (typeof content === 'function'
							? await content({ ...data, children }, helpers)
							: content) as preact.VNode

				if (element && typeof element === 'object') {
					element.toString = () => renderToString(element)
				}
				return element
			},
			renderComponent(content: unknown, data: Record<string, unknown> = {}) {
				const element = typeof content === 'function'
					? content(data, helpers)
					: content

				if (element && typeof element === 'object') {
					element.toString = () => renderToString(element)
				}
				return element
			},
			deleteCache() { },
		},
		pageSubExtension: undefined,
	})
	site.process(['.html'], pages => {
		for (const page of pages) {
			if (typeof page.content === 'string') {
				page.content = page.content.replace(/<\/?preact-fragment>/g, '')
			}
		}
	})
}
