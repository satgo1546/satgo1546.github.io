// @ts-check
/** @type {import('@shikijs/types').ThemeRegistration} */
export default {
	name: 'web',
	displayName: 'WEB-like',
	type: 'light',
	colors: {
		'editor.background': '',
		'editor.foreground': 'token',
	},
	tokenColors: [
		// bold and italic
		{
			scope: [
				'keyword.other.unit',
				'variable.other.enummember',
				'variable.other.constant',
				'comment',
				'constant',
				'entity',
				'invalid',
				'keyword',
				'markup',
				'string',
				'support',
				'punctuation'
			],
			settings: { fontStyle: '' },
		},
		{
			scope: [
				'markup.bold',
				'markup.heading',
				'keyword.control',
				'keyword.other',
				'keyword.operator.wordlike',
				'keyword.operator.expression',
				'storage',
				'constant.language',
			],
			settings: { fontStyle: 'bold' },
		},
		{
			scope: [
				'markup.italic',
				'source.python',
				'source.ruby',
				'variable',
				'entity.name.function',
				'meta.object-literal.key',
				'support.variable',
				'support.function',
			],
			settings: { fontStyle: 'italic' },
		},
		{
			scope: [
				'variable.parameter.function.language',
			],
			settings: { fontStyle: 'bold italic' },
		},
		// opacity
		{
			scope: [
				'comment',
				'punctuation.definition.comment',
			],
			settings: { fontStyle: 'strikethrough' },
		},
		// face and feature
		{
			scope: [
				'string',
				'punctuation.definition.string',
				'source.xml',
			],
			settings: { foreground: 'token monospace' },
		},
		{
			scope: [
				'keyword.operator',
				'storage.type.function.arrow',
			],
			settings: { foreground: 'token symbol', fontStyle: '' },
		},
		{
			scope: [
				'punctuation',
				'meta.brace.angle.ts',
			],
			settings: { foreground: 'token punctuation' },
		},
	],
}
