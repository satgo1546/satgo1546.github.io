import {
	EditorView,
	keymap, highlightSpecialChars, dropCursor,
	rectangularSelection, Panel, showPanel, layer, RectangleMarker,
	ViewPlugin, Decoration, DecorationSet, ViewUpdate,
	highlightTrailingWhitespace,
	WidgetType,
} from '@codemirror/view'
import {
	EditorState, EditorSelection, Extension, RangeSetBuilder,
} from '@codemirror/state'
import {
	syntaxHighlighting, indentOnInput, bracketMatching,
	foldGutter, foldKeymap, indentUnit, syntaxTree, ensureSyntaxTree
} from '@codemirror/language'
import {
	defaultKeymap, history, historyKeymap,
	indentLess, insertTab,
} from '@codemirror/commands'
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search'
import {
	autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap,
	acceptCompletion, nextSnippetField, prevSnippetField,
	clearSnippet, snippetKeymap,
} from '@codemirror/autocomplete'
import { html } from '@codemirror/lang-html'
import { tags, tagHighlighter } from '@lezer/highlight'
import { StyleModule } from 'style-mod'

function wordCountPanel(view: EditorView): Panel {
	let dom = document.createElement('div')
	dom.textContent = view.state.doc.toString().length + '.'
	return {
		dom,
		update(update) {
			if (update.docChanged)
				dom.textContent = 'eee'
		}
	}
}


const selectionMark = Decoration.mark({ attributes: { class: 'cm-selectionMark' } })

class CheckboxWidget extends WidgetType {
	constructor(readonly checked: boolean) {
		super()
	}

	eq(other: CheckboxWidget) {
		return other.checked == this.checked
	}

	toDOM() {
		let wrap = document.createElement("span")
		wrap.setAttribute("aria-hidden", "true")
		wrap.className = "cm-boolean-toggle"
		let box = wrap.appendChild(document.createElement("input"))
		box.type = "checkbox"
		box.checked = this.checked
		return wrap
	}

	ignoreEvent() {
		return false
	}
}

const extensions: Extension = [
	highlightSpecialChars({}),
	highlightTrailingWhitespace(),
	history({}),
	foldGutter({
		markerDOM(open) {
			const span = document.createElement('span')
			span.className = open ? 'cm-foldButton' : 'cm-unfoldButton'
			return span
		},
	}),
	dropCursor(),
	EditorState.allowMultipleSelections.of(true),
	indentOnInput(),
	syntaxHighlighting(tagHighlighter([
		{ tag: tags.link, class: 'tok-link' },
		{ tag: tags.heading, class: 'tok-heading' },
		{ tag: tags.emphasis, class: 'tok-emphasis' },
		{ tag: tags.strong, class: 'tok-strong' },
		{ tag: tags.keyword, class: 'tok-keyword' },
		{ tag: tags.atom, class: 'tok-atom' },
		{ tag: tags.bool, class: 'tok-bool' },
		{ tag: tags.url, class: 'tok-url' },
		{ tag: tags.labelName, class: 'tok-labelName' },
		{ tag: tags.inserted, class: 'tok-inserted' },
		{ tag: tags.deleted, class: 'tok-deleted' },
		{ tag: tags.literal, class: 'tok-literal' },
		{ tag: tags.string, class: 'tok-string' },
		{ tag: tags.number, class: 'tok-number' },
		{ tag: [tags.regexp, tags.escape, tags.special(tags.string)], class: 'tok-string2' },
		{ tag: tags.variableName, class: 'tok-variableName' },
		{ tag: tags.local(tags.variableName), class: 'tok-variableName tok-local' },
		{ tag: tags.definition(tags.variableName), class: 'tok-variableName tok-definition' },
		{ tag: tags.special(tags.variableName), class: 'tok-variableName2' },
		{ tag: tags.definition(tags.propertyName), class: 'tok-propertyName tok-definition' },
		{ tag: tags.typeName, class: 'tok-typeName' },
		{ tag: tags.namespace, class: 'tok-namespace' },
		{ tag: tags.className, class: 'tok-className' },
		{ tag: tags.macroName, class: 'tok-macroName' },
		{ tag: tags.propertyName, class: 'tok-propertyName' },
		{ tag: tags.operator, class: 'tok-operator' },
		{ tag: tags.comment, class: 'tok-comment' },
		{ tag: tags.meta, class: 'tok-meta' },
		{ tag: tags.invalid, class: 'tok-invalid' },
		{ tag: tags.punctuation, class: 'tok-punctuation' }
	])),
	bracketMatching({}),
	closeBrackets(),
	autocompletion({
		defaultKeymap: false,
	}),
	snippetKeymap.of([]),
	rectangularSelection({
		eventFilter: event => event.button === 0 && event.altKey || event.button === 1,
	}),
	highlightSelectionMatches(),
	indentUnit.of('\t'),
	EditorState.tabSize.of(2),
	keymap.of([
		{ key: 'Tab', run: acceptCompletion },
		{ key: 'Tab', run: nextSnippetField, shift: prevSnippetField },
		{ key: 'Tab', run: insertTab, shift: indentLess },
		...completionKeymap,
		{ key: 'Escape', run: clearSnippet },
		{
			key: 'Mod-2', run: view => {
				if (view.state.readOnly) return false
				view.dispatch(view.state.changeByRange(range => ({
					changes: [
						{ from: range.from, insert: '<h2>' },
						{ from: range.to, insert: '</h2>' },
					],
					range: EditorSelection.range(range.from + 4, range.to + 4),
				})))
				return true
			}
		},
		...closeBracketsKeymap,
		...defaultKeymap,
		...searchKeymap,
		...historyKeymap,
		...foldKeymap,
	]),
	html({}),
	showPanel.of(wordCountPanel),
	// secondary cursor layer
	layer({
		above: true,
		markers(view) {
			return view.state.selection.ranges.flatMap(r => r.empty && r !== view.state.selection.main ? RectangleMarker.forRange(view, 'cm-cursorMarker', r) : [])
		},
		update(update) {
			return update.docChanged || update.selectionSet
		},
	}),
	// secondary selection mark
	ViewPlugin.fromClass(class {
		decorations: DecorationSet

		constructor(view: EditorView) {
			this.decorations = this.secondarySelectionRangeSet(view)
		}

		update(update: ViewUpdate) {
			if (update.docChanged || update.selectionSet)
				this.decorations = this.secondarySelectionRangeSet(update.view)
		}

		secondarySelectionRangeSet(view: EditorView) {
			const builder = new RangeSetBuilder<Decoration>()
			for (const r of view.state.selection.ranges) {
				if (!r.empty && r !== view.state.selection.main) {
					builder.add(r.from, r.to, selectionMark)
				}
			}
			return builder.finish()
		}
	}, {
		decorations: v => v.decorations
	}),
	(() => {
		let handle: number | undefined
		return EditorView.updateListener.of(update => {
			if (update.docChanged) {
				if (handle !== undefined) cancelIdleCallback(handle)
				handle = requestIdleCallback(() => {
					iframeDocument.documentElement.innerHTML = update.state.doc.toString()
				}, { timeout: 500 })
			}
			if (update.selectionSet) {
				iframeDocument
				const {anchor,head}=update.state.selection.main
				const anchorNode = syntaxTree(update.state).cursorAt(anchor).node
				anchorNode.name === 'Text'
				console.log()
			}
		})
	})(),
]

const iframeDocument = document.getElementsByTagName('iframe')[0].contentDocument!
iframeDocument.onselectionchange = event => {
	console.log(event)
}

export default new EditorView({
	state: EditorState.create({
		doc: `<!DOCTYPE html>
<title>◆</title>
<main>\f\v
<h2>◆</h2>
<p>◆
<p>◆
<h2>Heading</h2>
<p>paragraph
<p>paragraph
<blockquote>
<p>paragraph in blockquote
</blockquote>
<p>paragraph
<ul>
<li>list item
<li>list item
<li>list item
</ul>
<table>
<tr>
<td>cell
<td>cell
<tr>
<td>cell
<td>cell
</table>
<math display="block">
	<munderover>
		<mmultiscripts>
			<mo>&Product;</mo>
			<mmultiscripts>
				<mi>&Efr;</mi>
				<mi>&upsilon;</mi>
				<mi>&tau;</mi>
				<mprescripts/>
				<mi>&rho;</mi>
				<mi>&sigma;</mi>
			</mmultiscripts>
			<mmultiscripts>
				<mi>&Dfr;</mi>
				<mi>&pi;</mi>
				<mi>&omicron;</mi>
				<mprescripts/>
				<mi>&nu;</mi>
				<mi>&xi;</mi>
			</mmultiscripts>
			<mprescripts/>
			<mmultiscripts>
				<mi>&Afr;</mi>
				<mi>&delta;</mi>
				<mi>&gamma;</mi>
				<mprescripts/>
				<mi>&alpha;</mi>
				<mi>&beta;</mi>
			</mmultiscripts>
			<mmultiscripts>
				<mi>&Bfr;</mi>
				<mi>&theta;</mi>
				<mi>&eta;</mi>
				<mprescripts/>
				<mi>&epsilon;</mi>
				<mi>&zeta;</mi>
			</mmultiscripts>
		</mmultiscripts>
		<mmultiscripts>
			<mi>&Ffr;</mi>
			<mi>&omega;</mi>
			<mi>&psi;</mi>
			<mprescripts/>
			<mi>&straightphi;</mi>
			<mi>&chi;</mi>
		</mmultiscripts>
		<mmultiscripts>
			<mi>&Cfr;</mi>
			<mi>&mu;</mi>
			<mi>&lambda;</mi>
			<mprescripts/>
			<mi>&iota;</mi>
			<mi>&kappa;</mi>
		</mmultiscripts>
	</munderover>
</math>
<style>style, script {
	display: block;
}</style>
<script>function g() {}<\/script>  `,
		// @ts-ignore piles of hacks to get rid of base themes
		extensions: extensions.flat(Infinity).filter(x => !(x.prec === 4 && x.inner.value instanceof StyleModule)),
	}),
	parent: document.getElementsByTagName('main')[0],
})
