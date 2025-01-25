




# Exotic things possible with DOM but not with HTML

## Have no document

```js
document.remove()
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

## Event listeners on any node

```js
document.body.appendChild(document.createTextNode('example text'))
  .addEventListener('dragstart', console.log)
```

All types of nodes, including text nodes and comment nodes, can emit events. Not many types of events are dispatched on nodes other than elements, though. `dragstart` for a text selection is an example.

## Conclusion

These restrictions are the reason why writing HTML articles by hand is not an exprience too terrible.


