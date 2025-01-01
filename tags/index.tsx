export const title = '标签'
export const renderOrder = 114514

export default (data: Lume.Data) => {
	return <ul>
		{data.search.values<string>('tags').toSorted().map(tag => <li>
			<a href={data.tagUrl(tag)}>{tag}</a>
			<small>{data.search.pages(`"${tag}"`).length}</small>
			<div dangerouslySetInnerHTML={{ __html: data.tagDescriptions[tag] }} />
		</li>)}
	</ul>
}
