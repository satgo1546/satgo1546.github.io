




# Exotic things possible with DOM but not with HTML

## Have no document

```js
document.remove()
```

## Impossible characters in comments

```js
document.appendChild(document.createComment('-->I’m hidden<!--'))
```

## Block elements in paragraphs

```js
document.appendChild(document.createElement('p'))
  .append(document.createElement('div'))
```

This is a common pitfall in server-side rendering, which causes **hydration mismatches** between the server and client DOMs.

## Anything in anything

```js
['area', 'link', 'tbody', 'title', 'script', 'textarea', 'html']
  .reduce((parent, tagName) =>
    parent.appendChild(document.createElement(tagName)), document.head)
```

Not only are paragraphs affected, but also many elements that have special parsing rules. It is much rarer to see in the wild a real element inside what is supposed to be a leaf node, though.

Content in a normally self-closing tag don't show up. However, if `content: "…"` is applied to `<br>` itself (not its pseudo element) in Chrome, the content inside the `<br>` is displayed. It does not work in Firefox. The current [CSS Generated Content Module Level 3 suggests](https://drafts.csswg.org/css-content-3/#typedef-content-content-list) that the `content` property value should take over the inner text, but this has not been implemented by browsers.

## Mix namespaces

```js
document.body.appendChild(document.createElement('svg'))
  .appendChild(document.createElement('circle'))
  .setAttribute('r', 50)
```

This snippet will not create anything visible. The `<svg>` and `<circle>` created are in the HTML namespace, rather than the SVG namespace, so they bear no meaning to the browser. While the HTML parser handles namespace transitions automatically, you have to be explicit about them in JavaScript with `document.createElementNS` instead. Both Chrome's and Firefox's DevTools are not helpful here, showing an innocent tree as if the elements were in the correct namespace.

## Event listeners on any node

```js
document.body.appendChild(document.createTextNode('example text'))
  .addEventListener('dragstart', console.log)
```

All types of nodes, including text nodes and comment nodes, can emit events. Not many types of events are dispatched on nodes other than elements, though. `dragstart` for a text selection is an example.

## Conclusion

These restrictions are the reason why writing HTML articles by hand is not an exprience too terrible.


