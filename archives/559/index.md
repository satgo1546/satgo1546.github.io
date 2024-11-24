---
title: Haskell类型系统四创
date: 2024-10-25
dates: 2024-10-25 ~ 2024-10-29
tags:
- 进度报告
- Haskell
- 类型系统
---

通过Google搜到了一系列博文[Type inference for Haskell](https://jeremymikkola.com/posts/2019_01_01_type_inference_intro.html)。

- 原型：Miranda
- 原作：[The Haskell 98 Language Report](https://www.haskell.org/onlinereport/)
- 二创：[Typing Haskell in Haskell](https://web.cecs.pdx.edu/~mpj/thih/)
- 三创：Type inference for Haskell
- 四创：Typing Haskell in TypeScript（我的笔记）

如果语言具有复杂的类型系统，那么从类型系统出发开始设计是合理的。

为什么是TypeScript？TypeScript名字里有个type，显然很适合用来写编译原理相关的项目。原世界上最垃圾的编程语言，现在竟变得如此好用。正如下面的代码所示，TypeScript版几乎是Haskell代码的直译。在翻译过程中，我还将函数式行话改为了一般编程常用词。

## Functional programming jargons demystified

<figure>
<figcaption>生息演算#2主题提前流出：可露希尔的函数式之路 CLOSURE’S ROAD TOWARDS Λ</figcaption>
</figure>

在阅读资料时，我发现拥有现代编程语言经验的用户几乎可以跳过关于λ演算的基础说明，但是其中的术语因采用数学领域命名而与主流语言格格不入得稀奇古怪。我在此记录徒增门槛的行话。

<dl>
<dt>α-conversion<dd>变量重命名 = variable renaming
<dt>β-reduction<dd>内联函数 = function inlining
<dt>β-abstraction<dd>抽出函数 = function extraction
<dt>η-reduction<dd>化简不必要的匿名函数
<dt>λ-abstraction<dd>匿名函数 = anonymous function
<dt>typeclass<dd>接口 = interface
<dt>ad-hoc polymorphism<dd>函数重载 = overloading
<dt>monad<dd>回调 = callback
<dt>algebraic data type<dd>tagged union
<dt>parametric polymorphism<dd>泛型 = generic
<dt>binding<dd>定义 = definition
<dt>combinator<dd>没有捕获的函数
<dt>supercombinator<dd>顶层函数 = top-level function
<dt>unit<dd>void
<dt>bottom<dd>never
<dt>application<dd>调用 = call
<dt>dictionary passing<dd>虚表 = vtable
</dl>

λ演算中的函数只能接受一个参数。多参数的函数用高阶函数代替。

```ts
console.log(Math.hypot(3, 4))

const hypot = x => y => Math.sqrt(x * x + y * y)
console.log(hypot(3)(4))
```

λ演算只定义了函数这一种数据类型。没有其他数据类型。

# 罅隙回环

定点求值无变更，代码来源自生成。
语法树上递归过，运行时间回路生。

Dottie数是cos的不动点。
quine是eval的不动点。
(f ↦ f(f))(f ↦ f(f))是单步求值（代入）的非平凡不动点。
Y(f)是*任意*自变量为函数的f的不动点。

这里应该有一段Y的推导过程，但是可以阅读The Little Schemer（关于Y组合子的内容在第9章）或Mike Vanier的文章[The Y Combinator (Slight Return)](https://mvanier.livejournal.com/2897.html)。

我觉得我应该没有完全理解Y组合子，因为我不能在没有任何提示的情况下推导出它。我甚至不知道应该如何给出提示，给出的任何提示都像是剧透。

# Y组合子与自生成程序

好像学会了一种quine的写法？

```ruby
"%1$p%%%1$p"%"%1$p%%%1$p"
```

```python
"%(x)r%%{'x':%(x)r}"%{'x':"%(x)r%%{'x':%(x)r}"}
```

```python
'\x00.replace("\\x00",repr(\x00))'.replace("\x00",repr('\x00.replace("\\x00",repr(\x00))'))
```

表达式的值是自身代码的字符串，也就是eval的不动点。

共同点是都有模板替换操作（`%`和replace方法）。模板字符串里的内容和程序代码相似，只是其中的字符串是占位符（`%1$p`、`$(x)r`、`\x00`），由后续替换操作代入，在结果中同一个字符串值的表示形式出现两次。

这和单步执行的不动点有极为相似的画风。

```js
(x=>x(x))(x=>x(x))
```

字符串 ······ 匿名函数
占位符 ······ 函数体内形参
模板替换 ······ 函数调用

稍微扭曲一下，每次步进就会多出一层f()。

```js
(x=>f(x(x)))(x=>f(x(x)))
```
