export const title = '标签'
export const renderOrder = 114514

export default function* (data: Lume.Data) {
	for (const tag of data.search.values<string>('tags')) {
		yield {
			title: `标签：${tag}`,
			url: data.tagUrl(tag),
			content: <>
				<div dangerouslySetInnerHTML={{ __html: data.tagDescriptions[tag] ?? '此标签没有描述。' }} />
				<data.comp.ArticleList pages={data.search.pages(`"${tag}"`, 'date=desc')} />
			</>
		}
	}
}
