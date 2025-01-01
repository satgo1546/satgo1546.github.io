export const title = '标签'
export const renderOrder = 114514

export default function* (data: Lume.Data) {
	for (const tag of data.search.values<string>('tags')) {
		yield {
			title: `标签：${tag}`,
			url: data.tagUrl(tag),
			content: <>
				<div dangerouslySetInnerHTML={{ __html: data.tagDescriptions[tag] }} />
				<ul class="articles">
					{data.search.pages(`"${tag}"`).map(page => <li>
						<a href={page.url} dangerouslySetInnerHTML={{ __html: String(page.title) }} />
						<time datetime={page.date.toISOString().slice(0, 10)}>{page.dates}</time>
						<div dangerouslySetInnerHTML={{ __html: page.description }} />
					</li>)}
				</ul>
			</>
		}
	}
}
