export const title = '首页'
export const renderOrder = 1919810

export default (data: Lume.Data) => {
	return <>
		<h2>近期文章</h2>
		<data.comp.ArticleList pages={data.search.pages(undefined, 'date=desc', 16)} />
	</>
}
