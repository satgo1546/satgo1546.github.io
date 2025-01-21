export default function (data) {
	return <data.comp.ArticleTree pages={data.pages.map(page => ({ data: page }))} />
}
