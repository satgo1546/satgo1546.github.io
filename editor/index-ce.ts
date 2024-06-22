// @ts-ignore
import style from './wysiwym.scss?inline'

document.head.appendChild(document.createElement('style')).textContent = style

function select() {
	const selection = getSelection()
	if (!selection?.rangeCount) return
	selection.getRangeAt(0).selectNode(selection.getRangeAt(0).commonAncestorContainer)
}

function wrap() {
	const selection = getSelection()
  if (!selection?.rangeCount) return
  selection.getRangeAt(0).surroundContents(document.createElement('em'))
}

function ensureElement(node: Node): HTMLElement {
	if (node instanceof HTMLElement) return node
	if (node.parentElement) return node.parentElement
	throw new Error('node has no associated HTMLElement')
}

function splitAtSelectionBoundary() {
	const selection = getSelection()
  if (!selection?.rangeCount) return
	const selectionRange = selection.getRangeAt(0)
	const startElement=  ensureElement(selectionRange.startContainer)
	const endElement = ensureElement(selectionRange.endContainer)
	const range = document.createRange()
	range.selectNodeContents(endElement)
	range.setStart(selectionRange.endContainer, selectionRange.endOffset)
	if (!range.collapsed && !endElement.contentEditable) {
		endElement.insertAdjacentElement('afterend', endElement.cloneNode() as typeof endElement)!.appendChild(range.extractContents())
	}
	range.selectNodeContents(startElement)
	range.setEnd(selectionRange.startContainer, selectionRange.startOffset)
	if (!range.collapsed && !startElement.contentEditable) {
		startElement.insertAdjacentElement('beforebegin',startElement.cloneNode() as typeof startElement)!.appendChild(range.extractContents())
	}
}

function editable(el: HTMLElement) {
	const toolbar = el.insertAdjacentElement('beforebegin', document.createElement('menu'))
	if (!toolbar) throw new Error('toolbar creation failed')
	for (let i = 1; i <= 12; i++) {
		const button = toolbar.appendChild(document.createElement('li'))
		button.addEventListener('pointerdown', event => {
			event.preventDefault()
		})
	}
	el.tabIndex = Math.max(0, el.tabIndex)
	el.contentEditable = 'true'
	el.addEventListener('keydown', event => {
		if (/^F\d+$/.test(event.code)) {
			event.preventDefault()
			wrap()
		} else {
			console.log(event.code)
		}
	})
	el.addEventListener('beforeinput', event => {
		if (/^format[A-Z]/.test(event.inputType)) {
			event.preventDefault()
		} else if (/^insertFrom[A-Z]/.test(event.inputType) && event.dataTransfer) {
			event.preventDefault()
			console.log(event.dataTransfer.getData('text/html'))
		} else if (event.inputType === 'insertParagraph') {
			event.preventDefault()
			splitAtSelectionBoundary()
		} else {
			console.log(event)
		}
	})
}

export default editable(document.getElementsByTagName('main')[0])

