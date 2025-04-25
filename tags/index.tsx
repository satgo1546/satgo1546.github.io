export const title = '标签列表'
export const renderOrder = 114514

export default (data: Lume.Data) => {
	const tags = new Map<string, Lume.Data[]>
	for (const tag of data.search.values<string>('tags').toSorted()) {
		tags.set(tag, data.search.pages(`"${tag}"`))
	}
	return <>
		<ul>
			{[...tags.entries()].map(([tag, pages]) => pages.length > 1 && <li>
				<a href={data.tagUrl(tag)}>{tag}</a>
				<small>{pages.length}</small>
				{tag in data.tagDescriptions && <div dangerouslySetInnerHTML={{ __html: data.tagDescriptions[tag] }} />}
			</li>)}
		</ul>
		<h2>孤篇标签</h2>
		<p>这些标签只有一篇文章在用。</p>
		<ul>
			{[...tags.entries()].map(([tag, [page, morePages]]) => !morePages && <li>
				<a href={page.url} title={page.title}>{tag}</a>
				{tag in data.tagDescriptions && <div dangerouslySetInnerHTML={{ __html: data.tagDescriptions[tag] }} />}
			</li>)}
		</ul>
	</>
}
