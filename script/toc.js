// This is a script instead of precomputation because I don’t have stable ids for header elements.
{
	const headings = document.currentScript.parentElement.querySelectorAll('h1, h2, h3, h4, h5, h6')
	if (headings.length > 1) {
		const toc = document.createElement('table-of-contents')
		toc.appendChild(document.createElement('h3')).textContent = '本页目录'
		let currentListItem = toc
		let currentLevel = 0
		for (const el of headings) {
			const level = +el.tagName[1]
			if (currentLevel < level) {
				while (currentLevel < level) {
					currentListItem = currentListItem.appendChild(document.createElement('ol'))
					currentListItem = currentListItem.appendChild(document.createElement('li'))
					currentLevel++
				}
			} else {
				while (currentLevel > level) {
					currentListItem = currentListItem.parentElement.parentElement
					currentLevel--
				}
				currentListItem = currentListItem.parentElement.appendChild(document.createElement('li'))
			}
			const a = currentListItem.appendChild(document.createElement('a'))
			a.href = 'javascript:;'
			a.append(...el.cloneNode(true).childNodes)
			a.addEventListener('click', () => el.scrollIntoView())
		}
		document.querySelector('body > aside').append(toc)
	}
}
