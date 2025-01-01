import lumeCMS from "lume/cms/mod.ts"
const cms = lumeCMS()
cms.collection({
	name: "posts",
	store: "src:**/*.md",
	fields: [
		"title: text",
		"content: markdown",
	],
})
const recursiveFields = [
	{ name: 'name', type: 'text' },
	{ name: 'children', type: 'object-list', fields: [] }
];
cms.collection({
	name: 'test',
	store: 'src:*.json',
	fields: [
		{ name: '[]', type: 'object-list', fields: recursiveFields }
	]
})
cms.upload("images", "src:images")
export default cms
