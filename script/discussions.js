{
	const { n } = document.currentScript.dataset
	const fetchComments = async () => {
		let lastError
		for (const additionalHeaders of [
			{ Authorization: 'Basic T3YyM2xpaElzR1dWaVhFSGh4UjQ6MjlhNTNjNmY5MWY3NWE0ZjJjMDc1OWJkNDJmMDlmZGE3MmEzNjczNw==' }, // deliberately leaked
			undefined,
			{ Authorization: 'Basic MTE0NTE0Og==' },
		]) {
			try {
				const response = await fetch(`https://api.github.com/repos/satgo1546/satgo1546.github.io/discussions/${n}/comments?per_page=100`, {
					headers: {
						Accept: 'application/vnd.github.html+json',
						'X-GitHub-Api-Version': '2022-11-28',
						...additionalHeaders,
					},
				})
				if (!response.ok) {
					lastError = new Error(response.statusText)
					continue
				}
				const json = await response.json()
				if (!Array.isArray(json)) {
					lastError = new Error(JSON.stringify(response, undefined, 1))
					continue
				}
				return json
			} catch (error) {
				lastError = error
			}
		}
		throw lastError
	}
	const h = (name, props, children) => {
		const el = Object.assign(document.createElement(name), props)
		if (children?.length) el.append(...children)
		return el
	}
	const render = item => item.本站尚未接入pingback系统
		? h('li', { className: 'pingback' }, [
			h('p', {}, [
				'Pingback引用通告： ',
				h('a', { href: '', rel: 'external nofollow', className: 'url' }, ['外部某页面引用了此页面'])
			])
		])
		: h('li', { className: 'comment' }, [
			h('article', { className: 'comment' }, [
				h('header', { className: 'comment-meta comment-author' }, [
					h('img', { src: item.user.avatar_url, width: 44, height: 44 }),
					h('cite', {}, [
						h('b', {}, [h('a', {href: item.user.html_url, className: 'url', textContent: item.user.login })]),
						item.author_association === 'OWNER'
							? h('span', { className: 'bypostauthor' }, ['文章作者'])
							: '',
					]),
					h('a', { href: item.html_url }, [
						h('time', {
							datetime: item.created_at,
							title: `创建于${item.created_at}`
								+ (item.created_at === item.updated_at ? '' : `\n更新于${item.updated_at}`),
							textContent: new Date(item.created_at),
						}),
					]),
				]),
				h('section', { className: 'comment-content comment', innerHTML: item.body_html }),
			]),
			item.child_comment_count
				? h('ol', { className: 'children' }, item.children.map(render))
				: '',
		])
	const container = document.currentScript.parentElement
	const fetchAndRenderComments = async () => {
		try {
			let items = await fetchComments()
			{
				const map = {
					__proto__: null,
					null: { children: [] },
				}
				for (const item of items) {
					map[item.id] = item
					item.children = []
				}
				for (const item of items) {
					map[item.parent_id]?.children.push(item)
				}
				items = map.null.children
			}
			if (items.length) {
				container.replaceChildren(
					h('h2', { className: 'comments-title' }, [
						'《',
						...document.querySelector('article > h1')?.cloneNode(true).childNodes ?? '',
						`》上有${items.length}条评论`,
					]),
					h('ol', { className: 'commentlist' }, items.map(render)),
				)
			} else {
				container.textContent = ''
			}
		} catch (error) {
			container.prepend(
				'评论加载失败（错误信息：',
				h('code', { textContent: error }),
				'）。',
			)
			console.error('评论加载失败', error)
		}
	}
	fetchAndRenderComments()
}
