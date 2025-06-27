const sha1 = async (input: string) => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-1', new TextEncoder().encode(input))), b => ('0' + b.toString(16)).slice(-2)).join('')

const GH_TOKEN = Deno.env.get('GH_TOKEN')

const GHGQLAPI = async (query: string, variables?: Record<string, unknown>) => {
	console.log('Requesting GitHub GraphQL\nQuery:', query, 'Variables:', variables)
	const response = await fetch(
		'https://api.github.com/graphql',
		{
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + GH_TOKEN,
			},
			method: 'POST',
			body: JSON.stringify({ query, variables }),
		}
	)
	if (!response.ok) throw new Error('fetch failed', { cause: response })
	const json = await response.json()
	if (json?.errors) throw new Error('GraphQL failed', { cause: json.errors })
	return json.data
}

declare global {
	namespace Lume {
		interface Data {
			githubDiscussionNumber?: number,
		}
	}
}

export default function (site: Lume.Site) {
	if (!GH_TOKEN) return
	const mapping: Record<string, number> = Object.create(null)
	let mappingDirty = false
	site.addEventListener('beforeBuild', async () => {
		const text = String((await GHGQLAPI(`
query MyQuery {
	node(id: "DC_kwDOAZWfwM4Azws4") {
		... on DiscussionComment {
			body
		}
	}
}
`)).node.body)
		for (const [, pathname, number] of text.matchAll(/\[([^\]]+)\]\((\d+)\)/g)) {
			mapping[pathname] = +number
		}
		console.log('Discussion mapping before build:', JSON.stringify(mapping, undefined, 2))
	})
	site.addEventListener('afterBuild', async () => {
		if (!mappingDirty) {
			console.log('Discussion mapping unchanged after build')
			return
		}
		console.log('Discussion mapping after build:', JSON.stringify(mapping, undefined, 2))
		await GHGQLAPI(`
mutation ($body: String!) {
	updateDiscussionComment(input: {
		commentId: "DC_kwDOAZWfwM4Azws4",
		body: $body
	}) {
		__typename
	}
}
`, {
			body: Object.entries(mapping)
				.sort(([a], [b]) => +(a > b) - +(a < b))
				.map(([pathname, number]) => `- [${pathname}](${number})`)
				.join('\n') || '<!---->'
		})
		mappingDirty = false
	})
	site.preprocess(['.html'], async (pages: Lume.Page[]) => {
		for (const page of pages) {
			const pathname = page.data.url
			if (mapping[pathname]) {
				page.data.githubDiscussionNumber = mapping[pathname]
			} else if (pathname.startsWith('/archives/') || pathname.startsWith('/statuses/')) {
				const number = (await GHGQLAPI(`
mutation ($title: String!, $body: String!) {
	createDiscussion(input: {
		repositoryId: "R_kgDOAZWfwA",
		categoryId: "DIC_kwDOAZWfwM4CgcJl",
		title: $title,
		body: $body
	}) {
		discussion { number }
	}
}
`, { title: pathname, body: `SHA-1("\`${pathname}\`") = \`${await sha1(pathname)}\`\n` },
				)).createDiscussion.discussion.number
				console.log(`Created discussion #${number} for ${pathname}`)
				mapping[pathname] = number
				mappingDirty = true
			}
		}
	})
}
