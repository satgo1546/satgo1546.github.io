export const title = '页面列表'
export const renderOrder = 114514

export default (data: Lume.Data) => <>
	<data.comp.ArticleTree pages={[data.nav.menu('/pages', '', 'title=asc')]} />
</>
