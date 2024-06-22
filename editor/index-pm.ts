import { EditorState, Plugin } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import 'prosemirror-view/style/prosemirror.css'
import { Schema, DOMParser, ParseRule } from 'prosemirror-model'
import {
	baseKeymap,
	wrapIn, setBlockType, chainCommands, toggleMark, exitCode,
	joinUp, joinDown, lift, selectParentNode,
} from 'prosemirror-commands'
import { keymap } from 'prosemirror-keymap'
import {
	undoInputRule,
	InputRule, inputRules, wrappingInputRule, textblockTypeInputRule,
} from 'prosemirror-inputrules'
import { history, undo, redo } from 'prosemirror-history'
import { dropCursor } from 'prosemirror-dropcursor'
import { gapCursor } from 'prosemirror-gapcursor'
import {
	orderedList, bulletList, listItem, wrapInList, splitListItem, liftListItem, sinkListItem,
} from 'prosemirror-schema-list'

const schema = new Schema({
	nodes: {
		doc: { content: 'block+' },
		text: { group: 'inline' },

		/// A horizontal rule (`<hr>`).
		horizontal_rule: {
			group: 'block',
			parseDOM: [{ tag: 'hr' }],
			toDOM: () => ['hr', 0],
		},

		/// A code listing. Disallows marks or non-text inline
		/// nodes by default. Represented as a `<pre>` element with a
		/// `<code>` element inside of it.
		textStyle: {
			group: 'block',
			content: 'inline*',
			attrs: {
				tagName: {},
				attributes: {},
			},
			parseDOM: [{
				tag: 'b, strong, i, em, u, ins, del, a',
				getAttrs(dom: string | HTMLElement) {
					if (typeof dom === 'string') throw new Error()
					return {
				tagName: dom.tagName,
				attributes:Object.fromEntries(Array.prototype.map.call(dom.attributes, ({name, value})=>[name, value])),
					}
				}
			}],
			toDOM(node) {
				return [node.attrs.tagName, node.attrs.attributes, 0]
			},
		},
		code_block: {
			content: 'inline*',
			group: 'block',
			code: true,
			defining: true,
			parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
			toDOM: () => ['pre', ['code', 0]],
		},

		/// An inline image (`<img>`) node. Supports `src`,
		/// `alt`, and `href` attributes. The latter two default to the empty
		/// string.
		image: {
			inline: true,
			attrs: {
				src: {},
				alt: { default: null },
				title: { default: null }
			},
			group: 'inline',
			draggable: true,
			parseDOM: [{
				tag: 'img[src]',
				getAttrs(dom: string | HTMLElement) {
					if (typeof dom === 'string') throw new Error()
					return {
						src: dom.getAttribute('src'),
						title: dom.getAttribute('title'),
						alt: dom.getAttribute('alt')
					}
				}
			}],
			toDOM: node => ['img', node.attrs],
		},

		/// A hard line break, represented in the DOM as `<br>`.
		hard_break: {
			inline: true,
			group: 'inline',
			selectable: false,
			parseDOM: [{ tag: 'br' }],
			toDOM: () => ['br', 0],
		},

		ordered_list: { ...orderedList, content: 'list_item+', group: 'block' },
		bullet_list: { ...bulletList, content: 'list_item+', group: 'block' },
		list_item: { ...listItem, content: 'block+' },
	},

	marks: {
	},
})




export default new EditorView(document.getElementsByTagName('main')[0], {
	state: EditorState.create({
		doc: DOMParser.fromSchema(schema).parse(document.createElement('p')),
		plugins: [
			inputRules({
				rules: [
					new InputRule(/(?:^|[\s\{\[\(\<''\u2018\u201C])(')$/, '“'),
					new InputRule(/'$/, '”'),
					new InputRule(/(?:^|[\s\{\[\(\<''\u2018\u201C])(')$/, '‘'),
					new InputRule(/'$/, '’'),
					new InputRule(/--$/, '—'),
					new InputRule(/\.\.\.$/, '…'),
					wrappingInputRule(/^\s*>\s$/, schema.nodes.blockquote),
					wrappingInputRule(/^(\d+)\.\s$/, schema.nodes.ordered_list, match => ({ order: +match[1] }),
						(match, node) => node.childCount + node.attrs.order == +match[1]),
					wrappingInputRule(/^\s*([-+*])\s$/, schema.nodes.bullet_list),
					textblockTypeInputRule(/^```$/, schema.nodes.code_block),
					textblockTypeInputRule(/^(#{1,6})\s$/,
						schema.nodes.heading, match => ({ level: match[1].length })),
				]
			}),
			keymap({
				'Mod-z': undo,
				'Shift-Mod-z': redo,
				'Backspace': undoInputRule,
				'Mod-y': redo,
				'Alt-ArrowUp': joinUp,
				'Alt-ArrowDown': joinDown,
				'Mod-BracketLeft': lift,
				'Escape': selectParentNode,
				'Mod-b': wrapIn(schema.nodes.strong),
				'Mod-B': wrapIn(schema.nodes.strong),
				'Mod-i': wrapIn(schema.nodes.em),
				'Mod-I': wrapIn(schema.nodes.em),
				'Mod-`': wrapIn(schema.nodes.code),
				'Shift-Ctrl-8': wrapInList(schema.nodes.bullet_list),
				'Shift-Ctrl-9': wrapInList(schema.nodes.ordered_list),
				'Ctrl->': wrapIn(schema.nodes.blockquote),
				'Shift-Enter': chainCommands(exitCode, (state, dispatch) => {
					if (dispatch)
						dispatch(state.tr.replaceSelectionWith(schema.nodes.hard_break.create()).scrollIntoView())
					return true
				}),
				'Enter': splitListItem(schema.nodes.list_item),
				'Mod-[': liftListItem(schema.nodes.list_item),
				'Mod-]': sinkListItem(schema.nodes.list_item),
				'Shift-Ctrl-0': setBlockType(schema.nodes.paragraph),
				'Shift-Ctrl-\\': setBlockType(schema.nodes.code_block),
				'Shift-Ctrl-1': setBlockType(schema.nodes.heading, { level: 1 }),
				'Shift-Ctrl-2': setBlockType(schema.nodes.heading, { level: 2 }),
				'Shift-Ctrl-3': setBlockType(schema.nodes.heading, { level: 3 }),
				'Shift-Ctrl-4': setBlockType(schema.nodes.heading, { level: 4 }),
				'Shift-Ctrl-5': setBlockType(schema.nodes.heading, { level: 5 }),
				'Shift-Ctrl-6': setBlockType(schema.nodes.heading, { level: 6 }),
				'Mod-_': (state, dispatch) => {
					if (dispatch)
						dispatch(state.tr.replaceSelectionWith(schema.nodes.horizontal_rule.create()).scrollIntoView())
					return true
				},
			}),
			keymap(baseKeymap),
			dropCursor(),
			gapCursor(),
			history(),
			new Plugin({
				props: {
					attributes: { class: 'ProseMirror-example-setup-style' },
				},
				view(editorView) {
function icon(text, name) {
  let span = document.createElement("span")
  span.className = "menuicon " + name
  span.title = name
  span.textContent = text
  return span
}

					const items = [
						// {command: toggleMark(schema.marks.strong), dom: icon("B", "strong")},
						// {command: toggleMark(schema.marks.em), dom: icon("i", "em")},
						// {command: setBlockType(schema.nodes.paragraph), dom: icon("p", "paragraph")},
						// {command: setBlockType(schema.nodes.heading, {level:1}), dom: icon("p", "paragraph")},
						{command: wrapIn(schema.nodes.blockquote), dom: icon(">", "blockquote")}
					]
					const dom = document.createElement("div")
					editorView.dom.parentNode!.insertBefore(dom, editorView.dom)
					dom.className = "menubar"
					for (const item of items) {
						dom.appendChild(item.dom).addEventListener('mousedown', event => {
							event.preventDefault()
							editorView.focus()
							item.command(editorView.state, editorView.dispatch, editorView)
						})
					}
					return {
						update() {
							for (const item of items) {
								let active = item.command(this.editorView.state, undefined, this.editorView)
								dom.style.display = active ? "" : "none"
							}
						},
						destroy() {
							dom.remove()
						},
					}
				},
			}),
		],
	}),
})
