---
title: Hypertext Specimen
lang: en
theme: theme-htmltex
---

> # HTML Standard
>
> ## 13 The HTML syntax
>
> ### 13.2 Parsing HTML documents
>
> #### 13.2.6 Tree construction
>
> A node is an <dfn>HTML integration point</dfn> if it is one of the following elements:
>
> - A MathML `annotation-xml` element whose start tag token had an attribute with the name "encoding" whose value was an ASCII case-insensitive match for the string "`text/html`"
> - A MathML `annotation-xml` element whose start tag token had an attribute with the name "encoding" whose value was an ASCII case-insensitive match for the string "`application/xhtml+xml`"
> - An SVG `foreignObject` element
> - An SVG `desc` element
> - An SVG `title` element
>
> <div class="admonition">
> If the node in question is the <var>context</var> element passed to the HTML fragment parsing algorithm, then the start tag token for that element is the "fake" token created during by that HTML fragment parsing algorithm.
> </div>
>
> ##### 13.2.6.4 The rules for parsing tokens in HTML content
>
> ###### 13.2.6.4.22 The "after after body" insertion mode
>
> When the user agent is to apply the rules for the "after after body" insertion mode, the user agent must handle the token as follows:
>
> A comment token
> : Insert a comment as the last child of the Document object.
>
> A DOCTYPE token
> A character token that is one of U+0009 CHARACTER TABULATION, U+000A LINE FEED (LF), U+000C FORM FEED (FF), U+000D CARRIAGE RETURN (CR), or U+0020 SPACE
> A start tag whose tag name is "html"
> : Process the token using the rules for the "in body" insertion mode.
>
> An end-of-file token
> : Stop parsing.
>
> Anything else
> : Parse error. Switch the insertion mode to "in body" and reprocess the token.

— <cite>[Parsing HTML documents](https://html.spec.whatwg.org/multipage/parsing.html)</cite> in <cite>HTML Living Standard</cite>

```ruby
#!/usr/bin/env ruby
=begin
multiline comment
=end
class Klass < Superklass
  # :markup: rdoc
  # comment
  def initialize(foo = $bar) = @baz = @@baz = [
    nil, true, false, self, 0b0 + 01 - 2 * 0x3 / 4.0,
    :symbol, ?c, "string\n\t#{'string'}", %q(string),
    /regexp/i, __dir__ and __FILE__, `subshell`,
  ].map { |x| x }
  CONSTANT = <<~END
    heredoc
  END
end
```

```xml
<?xml version="1.0"?>
<!DOCTYPE lol [
	<!ELEMENT lol (#PCDATA)>
	<!ATTLIST lol lol CDATA #IMPLIED>
	<!ENTITY lol "lol">
]>
<lol lol="&lol;">&lol;</lol>
```

```cpp
#include <iostream>
#define UNICODE 1
using namespace std;
template <class T> class K {
	T field; // private field
public: /* public members onwards */
	enum F : unsigned short { PP, MM = 1 };
	bool f(T x, void (*fp)(int arg) = nullptr) {
		auto v = reinterpret_cast<K<int>>(114514);
		K<double> *u = (K<double> *) 0x1919810;
		volatile long double *p = new long double;
		cout << "PP = " << F::PP << endl;
		return x <= 0x1.5p8f && x >= 1ULL ||
			static_cast<decltype('C')>(L"Hi");
	}
};
```

```ts
const obj0 = { name: "A0", value: -0, null: null };
type Prop = Awaited<Partial<typeof obj0>> | undefined;
let obj1 = { name: 'B1', value: 114.514 } satisfies Prop;
/**
 * @template T - The generic parameter.
 * @param {T} x - The argument.
 * @returns {boolean} The return value.
 */
function f<T extends {}[] = []>(x?: T): boolean {
	return +(arguments[+false] instanceof Object) === 1;
}/i/i // stray regular expression, hard to parse correctly
<any>console.log(f([0x0n, obj0, obj1]),
	Math.min(...Array(9).fill(new class extends class {} {})
		.map((x, i) => x.toString().length ^ i << i)));
```

```python
from typing import Any, Never
type NDPoint = tuple[float, ...]
@lambda x: {(x, x): [str(b) for _, b in ((x, x),) if True]}
async def f(x: Any | Never) -> None:
	match int.from_bytes(rb'\114514' + x@x):
		case [_, _] | _ as a if z := -0x19_19 ** 81.e0j:
			f"""{{{await a # comment with symbols, e.g., }"""
			=!r:#8s}}}{z}"""
```
