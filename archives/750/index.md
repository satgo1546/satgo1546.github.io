---
title: Crafting Interpreters 阅读笔记（第2部分）
date: 2025-11-03
dates: 2025-10-28 ~ 2025-11-03
excerpt: ……这种艺术未免过于超前了。最后我选择不做了 🐖
tags:
- 进度报告
- Crafting Interpreters 阅读笔记
---

看到隔壁[@KinnariyaMamaTanha](https://kinnari-blog.vercel.app/posts/plox/)跟着[《Crafting Interpreters》](https://craftinginterpreters.com/)写了[plox](https://github.com/KinnariyaMamaTanha/plox)，我也想写 🐖

[在GitHub上查看代码。](https://github.com/satgo1546/plat/tree/loxjs)

<dl class=long>

<dt>§4 设计笔记（语句间分号）
<dd>

[Lua 5.1要求`f(a)`的`f`与`(`之间不能有空格](https://www.lua.org/manual/5.1/manual.html#2.5.8)，但后来这个限制被取消了，导致Lua现在有和JS一样的[行首`;(`](https://standardjs.com/rules#semicolons)。

<dt>§5.3.2（访问者模式）
<dd>

visitor pattern这块全跳了，毫无意义 😾

<dt>§7.2.5 最后一条旁注（<code>NaN == NaN</code>）
<dd>

除了NaN，Java的Double.equals还有一处不符合IEEE-754定义，导致Lox中有`+0 != -0`。<img class="icon" src="icon-javascript.svg"> 这种比较由Object.is实现。

<dt>§7 第1题（扩展比较运算符到更多类型）
<dd>

我想添加`⟨字符串⟩ * ⟨数值⟩`运算符，但这会引入许多不良定义：

- `"abcd" * 0.25 == "a"`？
- `"abcd" * -1 == "dcba"`？？
- `"abcd" * (1 / 0) == "abcdabcdabcd…"`？？？

这种艺术未免过于超前了。最后我选择不做了 🐖

<dt>§8.5.1（作用域嵌套与遮蔽）
<dd>

<img class="icon" src="icon-javascript.svg"> 原型链秒了——键只能是字符串的JS对象的原型链属性存取方式完美符合作用域嵌套时变量的查找和定义逻辑。只有赋值时需要手动向上找到定义的那一层。

<dt>§10.1, §10.3（函数调用、函数声明）
<dd>

不支持尾缀逗号很令用户难过，贯穿全书代码片段的“add <strong>‘,’</strong> to previous line”就是例证，所以我略微修改语法以支持尾缀逗号。

```
arguments      → expression ( "," expression )* ","? ;
parameters     → IDENTIFIER ( "," IDENTIFIER )* ","? ;
```

<dt>§10 第1题（为何Smalltalk无需在运行时检查函数参数数量）
<dd>

在Prolog、Erlang、Elixir中，参数个数是函数名的一部分，比如[String.slice/2](https://hexdocs.pm/elixir/String.html#slice/2)和String.slice/3是两个不同的函数。在Smalltalk中，参数名是函数名的一部分，也是调用语法的一部分。

<dt>§10 第2题（如何区分函数语句与函数表达式）
<dd>

JavaScript有完全相同的问题，直接导致了IIFE中的多余括号：`(function () { … })()`中的首个括号仅表示这是一个函数表达式而非语句，没有调节优先级的作用。

<dt>§11.1 第二条旁注（JavaScript variable hoisting）
<dd>

JavaScript用const和let修好了词法作用域，但保留了一部分动态作用域，这样你才知道你写的是JavaScript。

```js
let a = "global";
{
  const showA = function () {
    console.log(a);
  }

  showA();
  let a = "block";
  showA();
}
```

这个案例不是像Lox那样打印“global”两次，而是在第一次调用showA时报错。尽管块内的a定义还在后面，showA中引用的a仍是块内的a。这导致有一段时间变量用不了，这段时间称为temporal dead zone。

在极端情况下，检查变量是否已在域内定义会带来可见的性能损耗。一篇最近的关于此特性的文章：[<cite>The Temporal Dead Zone, or why the TypeScript codebase is littered with var statements</cite>](https://vincentrolfs.dev/blog/ts-var)。

<dt>§12.3（创建实例）
<dd>

在Python中，许多看起来是函数的东西其实是类：str、int、list等内置类型的构造函数起到了类型转换的作用；map、zip、filter、reversed、enumerate以及itertools模块提供的大部分工具的返回值对外提供迭代器接口的同时也需要保存包裹的迭代器的状态，用类来实现再合适不过了。不区分函数调用和实例构造，也不限制函数名和类名的大小写，才使得Python中的类和函数可以如此透明地互换使用。

C++需要new关键字，以区分静态和动态分配内存。Java对象都是动态分配，理应不需要new关键字，不知道为什么留着了。C#和JavaScript抄了Java，搞得现在到处都是没用的new。

<dt>§13.2（继承方法）
<dd>

<img class="icon" src="icon-javascript.svg"> 又惦记着原型链了。类继承体现为类方法表的原型是超类的方法表，便可省略findMethod的逻辑。

</dl>

---

<pre>☑ 第2部分</pre>

```console
$ cloc *.ts --by-file
       2 text files.
       2 unique files.                              
       0 files ignored.

github.com/AlDanial/cloc v 2.06  T=0.01 s (168.7 files/s, 84253.8 lines/s)
-------------------------------------------------------------------------------
File                             blank        comment           code
-------------------------------------------------------------------------------
index.ts                            24             11            942
main.ts                              1              0             21
-------------------------------------------------------------------------------
SUM:                                25             11            963
-------------------------------------------------------------------------------
```

不到一千行代码，但是塞了太多小巧思，感觉屎山已经堆起来了 😾
