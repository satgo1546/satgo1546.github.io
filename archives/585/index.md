




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

## Conclusion

These restrictions are the reason why writing HTML articles by hand is not an exprience too terrible.


