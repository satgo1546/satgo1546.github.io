import { NavData } from 'lume/plugins/nav.ts'

export default function ArticleTree(props: { pages: NavData[] }) {
	if (!Array.isArray(props.pages)) {
		throw new Error('received object instead of array for `pages`; wrap nav.menu result into an array if you are using it')
	}
	return <ul class="articles">
		{props.pages.map(({ data, children }) => <li>
			{data.url ? <>
				<a href={data.url} dangerouslySetInnerHTML={{ __html: String(data.title) }} />
				<time datetime={data.date.toISOString().slice(0, 10)}>{data.dates}</time>
				<div dangerouslySetInnerHTML={{ __html: data.description ?? '' }} />
			</> : <>
				{data.basename}/
			</>}
			{children && <ArticleTree pages={children} />}
		</li>)}
	</ul>
}
