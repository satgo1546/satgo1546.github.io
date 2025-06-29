import { type ThemeRegistration } from 'npm:@shikijs/types'

const theme = {
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
				'constant',
				'entity',
				'invalid',
				'markup',
				'string',
				'support',
				'punctuation',
				'constant.numeric storage.type',
			],
			settings: { fontStyle: '' },
		},
		{
			scope: [
				'markup.bold',
				'markup.heading',
				'keyword',
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
				'meta.brace.square.js',
				'meta.brace.square.ts',
			],
			settings: { foreground: 'token punctuation' },
		},
	],
} satisfies ThemeRegistration

// Monospace has the highest priority.
// We don't have !important in TextMate, so we generate every possible overriding declaration.
const subscopes = theme.tokenColors.flatMap(({ scope }) => scope)
for (const monospaceLanguageScope of [
	'text',
	'source.batchfile',
	'source.shell',
]) {
	theme.tokenColors[5].scope.push(monospaceLanguageScope)
	for (const subscope of subscopes) {
		theme.tokenColors[5].scope.push(`${monospaceLanguageScope} ${subscope}`)
	}
}

export default theme
