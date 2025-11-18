---
title: Crafting Interpreters 阅读笔记（完结篇）
date: 2025-11-16
dates: 2025-11-15 ~ 2025-11-16
excerpt: 先说结论，《Crafting Interpreters》的完整度较高，教学性极强，总的来说属于超大杯。
tags:
- 进度报告
- Crafting Interpreters 阅读笔记
---

## 完结撒花 💮

第2部分写了一周，第3部分坐牢了两周。

第2部分写起来很直接，基本上换什么面向对象的语言来写都能方便地翻译过去，还有余力调整一些实现细节。第3部分就没这么友好了。因为我第3部分选择了Rust的缘故，跳过了一些难以实现的部分（字符串、散列表、垃圾回收、NaN tagging），而实现的过程中大部分时间是在跟借用检查器搏斗，发生过多次因所有权问题导致的大面积重构。

Rust的啰嗦程度堪比古典Java，这实在是不符合我的风格。还好得益于强大的IDE补全能力，写起来并不麻烦。现在我已经能熟练写出`Vec<Rc<RefCell<_>>>`这种东西，预判将要到来的生命周期难题并知难而退（clone或换成整数索引），以及在合适的时机插入std::mem::{drop, take, replace}了。

在Rust中，提取变量和提取函数可能造成对象生命周期变化，并不总是可以无脑执行这种重构（β变换性质被破坏），例如[E0716](https://doc.rust-lang.org/error_codes/E0716.html "A temporary value is being dropped while a borrow is still in active use")明确提到“consider using a `let` binding to create a longer lived value”，即添加let语句可能可以修复编译错误。我发现这导致我开始倾向于复制粘贴。

## 书评

先说结论，《Crafting Interpreters》的完整度较高，教学性极强，总的来说属于超大杯。该书的优势区间主要集中在：

1. 不讲黑话，不使用yacc等初学者从来没用过的专门工具，不偷偷摸摸加代码，所有代码修改事无巨细地全部列出，不留给读者作为练习，这已经完爆几乎所有教科书了；
2. Lox语言经过专门设计，融合了过程式、函数式、面向对象多种范式，有品味地融合了主流语言的精华摒弃糟粕的同时令读者感到亲切；
3. 实践性强，覆盖了许多理论课程不会涉及的知识，例如编译错误报告、特性背后的动机、主流语言的细节（我从来没想过[if语句里不能单独出现一句变量声明](https://craftinginterpreters.com/statements-and-state.html#variable-syntax)）；
4. 配套资源完善，仓库里有[大部分习题答案](https://github.com/munificent/craftinginterpreters/tree/master/note/answers)，还有很多他人写的其他语言实现可参考。

劣势区间在于：

1. 有比较多的未定义先使用的情况，一般隔两段就能找到定义，但确实会导致阅读和跟着写起来不顺畅；
2. 第3部分使用了大量C语言特色特性，再加上C语言可以说是不存在的抽象能力，很难换其他语言跟着写，还导致了一些比较微妙的设计决定（如局部变量个数限制）；
3. 书已经很厚了，但仍有许多没有涉及的话题，如编译期优化、静态类型、模块系统等。

## 延伸阅读

[Crafting “Crafting Interpreters”](https://journal.stuffwithstuff.com/2020/04/05/crafting-crafting-interpreters/)&emsp;关于本书成书幕后，以及写书在作者人生艰难变故时期成为了精神支柱的事。

[作者在Hacker News上的回帖](https://news.ycombinator.com/item?id=40956138)对接下来考虑讲解静态类型的情况作了描述。
