#!/usr/bin/env -S deno run --allow-read=. --allow-write=_site

// The MIT License (MIT)
//
// Copyright (c) 2018-2022 Sunaina Pai
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
// IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
// CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
// TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
// SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

import {DOMParser, Node, Element, Document, Element as DOMElement} from 'https://deno.land/x/deno_dom@v0.1.45/deno-dom-wasm.ts'

/**
 * React nonsense just to make JSX work.
 */
declare namespace React.JSX {
  type Element = DOMElement
  type IntrinsicElements = Record<string, object>
}
const React = {
  createElement(name: string, attrs: Record<string, string>, ...children: (string|Node)[]): DOMElement {
    const el = document.createElement(name)
    for (const [key, value] of Object.entries(attrs || {})) {
      el.setAttribute(key, value)
    }
    el.append(...children)
    return el
  },
}


const document = new DOMParser().parseFromString('<xmp><xmp><xmp></xmp><pre><pre><pre></pre>', 'text/html')!

console.log(document.body.textContent)


const g=(<a index-id="123">114<hr/></a>)
console.log(g)
console.log(DOMParser)

type Page = {
  document: Document,
  title: string,
  revisions: {date:Date,author:string,commit_hash:string}[]
}
function decoratePage(page: Page): void {
  const { head, body } = page.document
  // …
  body.append(<footer>Copyright © 2013–2024 Frog Chen. All rights reserved.</footer>)
  for (const main of body.getElementsByTagName('main')) {
    main.prepend(<h1>{page.title}</h1>)
    main.append(
      <section class="revisions">
        {page.revisions.map(({ date, author, commit_hash }) => (
          <div>
            <a href={`https://github.com/satgo1546/satgo1546.github.io/commit/${commit_hash}`}>{commit_hash.slice(0, 7)}</a>
            <time datetime={date.toISOString()}>{date.toString()}</time>
            <span>{author}</span>
          </div>
        ))}
      </section>
    )
    // …
  }
}
