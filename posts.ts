export default Object.values(import.meta.glob('./archives/*/index.md', {
	import: '__pageData',
	eager: true,
})).sort((a: any, b: any) => a.lastUpdated - b.lastUpdated)
