---
title: Haskell类型系统四创 二周目：Typing Haskell in TypeScript
date: 2025-09-27
dates: 2025-09-13 ~ 2025-09-28, 2025-11-19 ~ 2025-11-20
excerpt: 原文十几行压缩毛巾代码，一大半都在玩它那个替换表 😾 又没有保留旧替换表的需求，纯纯的自找麻烦。可变的并查集赢太多了。
tags:
- 进度报告
---

<dl>
<dt>原型
<dd><a href="https://www.cs.kent.ac.uk/people/staff/dat/miranda/3.8.html">Miranda</a>
<dt>原作
<dd><a href="https://www.haskell.org/onlinereport/">The Haskell 98 Language Report</a>
<dt>二创
<dd><a href="https://web.cecs.pdx.edu/~mpj/thih/">Typing Haskell in Haskell</a>
<dt>三创
<dd><a href="https://jeremymikkola.com/posts/2019_01_01_type_inference_intro.html">Type inference for Haskell</a>
<dt>四创
<dd>Typing Haskell in TypeScript（我的笔记）
</dl>

<dl class=long>

<dt>为什么是二周目，一周目在哪？<dd>

一周目BE了（坑掉了），没有公开。

大概是因为在没有足够背景知识的情况下跨语言追连载太容易偏离原作导致卡关了。

原作进行了一步重构，我发现我抄的代码无法进行同样的重构。再然后，发现原作其实在几步前就已经为这步重构铺垫过了，但当时抄的时候不明白其中的深意。

<dt>为什么是TypeScript？<dd>

TypeScript名字里有个type，显然[很适合用来写编译原理相关的项目](https://matklad.github.io/2023/08/17/typescript-is-surprisingly-ok-for-compilers.html "TypeScript is Surprisingly OK for Compilers")。原世界上最垃圾的编程语言，现在竟变得如此好用。我曾尝试了Rust和Kotlin，它们的配套设施确实更加完善，用它们写代码却感受不到写TS的快乐。这当然与我熟悉TS有着很大关系，可启动如此便捷又有着强大类型系统的多范式编程语言可不多见。

<dt>和一周目相比有何变化？<dd>

原作THIH意在形式化规范，导致一些实现方式反而不好理解。这一周目，我不再试图1:1照抄原文的写法，转而大量使用可变值。

</dl>

本文不包含完整代码，可在[GitHub](https://github.com/satgo1546/plat/tree/thit)上阅读完整代码。

## 第1~9部分：Hindley–Milner（除let多态）

```ts
type Type =
	| { tag: 'namedType', name: string }
	| { tag: 'reify', generic: Type, argument: Type }
	| { tag: 'typeVariable', link?: Type, name: string }
```

tag是带标记联合体（tagged union）的标记。这个字段依惯例应命名为type，只是很不幸与本作关键处理对象撞名了，故改为tag。

<div class=admonition>
ℹ️ 上一周目，我把标记字段称作type，导致<code>type1.type === type2.type</code>之类的代码满天飘 🙀
</div>

我将原文中的TCon（类型构造器）和TAp（类型级别的函数调用）分别译为namedType和reify。reify是来自C#的词汇，意为给泛型类配上类型参数，得到具体类。不过在这里，因为泛型类型与函数一样也彻底柯里化，reify得到的可能仍不是具体类型。

<div class=admonition>
ℹ️ 上一周目，我把TAp称作instantiation（C++的模板例化），华丽地与之后let多态所用函数撞名 😾
</div>

阅读[用过程式语言编写的HM类型推断实现方法](https://bernsteinbear.com/blog/type-inference/)后，我发现用纯函数语言编写类型推断算法是不自然的：类型的推导需要来自其他表达式的全局条件，子问题之间互相关联，不能各自独立计算。纯的写法（如算法W）需要把替换表（substitution）传来传去，低效，麻烦，易碎，反而是带副作用的写法易懂又高效。GHC和OCaml编译器虽然使用函数式语言编写，类型推断部分也还是使用了可变数据结构。

原文[第7部分](https://jeremymikkola.com/posts/2019_01_07_type_inference_part_7.html)自称实现了算法J，但其实更像算法W。这一周目，我编写了使用并查集的真正的算法J，代码量相比上一周目照抄的基于替换表的版本减少了20%，也没有再出bug。

在OI Wiki和LeetCode题解中，并查集常以parent下标数组的形态出现，但并查集作为图论数据结构，最自然的写法莫过于在节点上添加指针字段。这即是typeVariable分支link属性的作用。

```ts
// 并查集之查
function find(type: Type): Type {
	if (type.tag === 'typeVariable' && type.link) {
		return type.link = find(type.link) // 路径压缩
	}
	return type
}
```

并查集之并只需要修改link字段，不需要专门的函数。

一般创建类型变量的方法是维护全局计数器，依次生成t1、t2、t3这样的类型变量名。原文也是如此（函数newTVar）。但反正自动生成变量的顺序过于实现细节，名称无法直接用于报错信息，不如怎么方便怎么来。

```ts
function newTypeVariable(): Type & { tag: 'typeVariable' } {
	return { tag: 'typeVariable', name: crypto.randomUUID() }
}
```

---

2023年，连Node.js也自带测试运行器了，没道理不往终端上抹点绿色。

虽然写解析器很无聊，但是一定要写，因为手写语法树实在是太麻烦了，麻烦到阻碍添加测试用例的程度。那么长的语法树对象：

```ts
// let a = 123 in (\x -> a)
{
  tag: 'let',
  variableName: 'a',
  variableValue: { tag: 'literal', value: { tag: 'int', value: 123 } },
  body: {
    tag: 'function',
    parameterName: 'x',
    body: { tag: 'variable', name: 'a' },
  },
}
```

用几个函数和变量包装一下，就能缩短成：

```ts
let$('a', 123, λ('x', $a))
```

除非实现语言是类型构造器名泄漏到全局作用域的ML系语言，缩短构造器名能换来可接受的表达式长度，否则还是找个解析库糊弄一下，或者至少搞个DSL。

美观输出对类型检查器来说不是必需的，但以后总会需要美观输出类型的时候。

<div class=admonition>
ℹ️ 上一周目，我没有写解析器和美观输出器，被测试用例的超长表达式啰嗦死，被自动省略的输出气死——Node.js输出嵌套超过三层的对象会跳过内部结构。

```console
> [[[[1]]]]
[ [ [ [Array] ] ] ]
```

</div>

## 第10部分：let多态

let多态是Hindley–Milner类型系统中最细节的部分。为了让下列代码通过类型检查，两处identity用的类型必须分别为Int → Int和String → String。

```haskell
let identity = (\x -> x) in (identity 42, identity "foo")
```

如果什么都不做，identity的类型会被先记为? → ?，遇到`identity 42`后解得? = Int，遇到`identity "foo"`后试图令Int = Bool而报类型错误。

解决办法是泛化变量定义。求出identity的类型为? → ?后，化其中**仍可变**的类型变量为泛型参数，得a → a，之后即可在各处以不同类型使用。

“仍可变”是个微妙的条件。就算还没有求出参数具体类型，就算之后整个函数被泛化，函数形参在函数体内也只能是同一种类型，所以在下列表达式中，`y`不是泛型。

```haskell
\x -> let y = x in y
```

像原文这样的教科书实现法，每次通过let定义变量和使用变量时都要为了泛化和例化而遍历类型结构，定义变量时更是需要遍历作用域内所有变量的类型，效率极低。

关于如何高效实现let多态的唯一指定参考资料是[How OCaml type checker works — or what polymorphism and garbage collection have in common](https://okmij.org/ftp/ML/generalization.html)。该文章将漏考虑“仍可变”条件的泛化比作释放仍在使用的内存，基于层级的泛化比作region-based memory management。内存管理好像也是个行话遍地走的领域，我完全没看懂文中与内存管理有关的部分，只好结合源码理解。

因为深度优先递归遍历语法树时，用栈记录正在处理的语法树节点，正在处理的每个类型变量的引入时刻可由创建类型变量时的let定义递归深度（称为层级（level））来描述。此处提到的层级只计算let语句（let A = B in C）的变量值部分（B）的深度，其他嵌套结构不影响。离开let语句变量值部分（B）后、进入let语句体（C）前，层级超过当前层级的类型变量需要泛化，在当前层级及以外的类型变量需要保留。

上文不可泛化的例子：

```haskell
\(x :: ?) -> let y = (x :: ?) in y
```

?引入于最外的第1层，计算出`y`的类型中，?的层级与之同级，故不可泛化。

下面这个例子中，第2层的`z`产生了新的类型变量<wbr><nobr>?₃</nobr>，且留在了第2层。`y`的类型中，第2层的<wbr><nobr>?₃</nobr>被泛化，第1层的<wbr><nobr>?₁</nobr>被保留。

```haskell
\(x :: ?₁) -> let y = (\z -> x) :: (?₃ -> ?₁) in y :: ?₂
```

注意，并不是所有在let语句的变量值部分新产生的类型变量都需要泛化，因为其中的某些类型变量可能并到外层去而不满足“仍可变”的要求。当发生类型结构合并到外层的情况时，需要将其中涉及的所有类型变量移到外层。

下面的例子与上一个只差两个字，但由于在`x z`中使用了`z`，第1层`x`的类型<wbr><nobr>?₁</nobr>化为了<wbr><wbr><nobr>?₃ → ?₄</nobr>，使<wbr><nobr>?₃</nobr>和<wbr><nobr>?₄</nobr>逃到了第1层。故`y`的类型中，没有任何变量被泛化。

```haskell
\(x :: ?₁) -> let y = (\z -> x z) :: (?₃ -> ?₄) in y :: ?₂
```

如此使用层级便可免去为了判定类型变量是否仍可变而遍历作用域，不过仍要遍历类型结构本身。如果在类型结构上也标上其中包含的类型变量的层级最大值并缓存，就能延缓并最终免去不必要的类型结构遍历。这块我读得晕晕的，缓存刷新时机很微妙，还有一些文中没有描述，只在代码里写了的细节，感觉写起来会有很多bug 🙀 就没做。

直接在Type类型的typeVariable分支上添加可修改的level字段非常省事，OCaml编译器就是这么做的。这样也不需要区分单类型（monotype）和多类型（polytype = type scheme）了：任何类型都可以当作多类型使用，其中层级无穷大的类型变量视为泛型参数。所谓多类型就是∀a. …这样的类型，由于HM中所有∀都位于开头，可以省略∀，仅在类型变量上作标记。

```ts
export type Type = { tag: 'typeVariable', level: number, … } | …
```

合并、泛化、例化都是标准的递归遍历过程，区别只在对类型变量的处理上。

```ts
let currentLevel = 0

function unify(a: Type, b: Type): void {
	// …
	case 'typeVariable':
		if (type.name === a.name) throw new Error('infinite type')
		type.level = Math.min(type.level, a.level)
		break

function generalize(type: Type): Type {
	// …
	case 'typeVariable':
		if (type.level > currentLevel) type.level = Infinity
		return type

function instantiate(type: Type): Type {
	const map: Record<string, Type> = Object.create(null)
	// …
	case 'typeVariable':
		return type.level === Infinity ? map[type.name] ??= newTypeVariable() : type
```

---

我在搜寻时找到一篇文章[Let Should not be Generalised](https://simon.peytonjones.org/let-generalised/)，指出应该仅允许顶层let多态，禁止内层变量自动推出多态类型。嵌套在内层的let多态本来就没人用（万一真要用也就标个泛型类型的事），在扩展的类型系统上徒增复杂性。只泛化顶层变量的类型的话，就不需要考虑该泛化哪些类型变量了。

## 第11部分：let rec

Haskell和多数语言一样，let语句本来就允许递归定义。但有的语言要求显式标出哪些定义是递归的，如OCaml和F#都区分let和let rec，且有专门的语法（let rec ~ and）定义互相递归的值。

递归定义会限制类型推断，导致无法得到最通用的类型。这是因为泛化过程在一组定义推断完毕之后一并发生。如果同组定义中抢先以特定类型使用了变量，这个变量的类型就被确定下来，不再泛化了。

```haskell
let
	identity x = snd (foo, x)
	foo x = identity "foo"
in …
```

上例中，`identity`和`foo`语法上互相递归（尽管`identity`的执行事实上不需要`foo`），作为同一组定义处理。由于`foo`中以String → String的类型使用了`identity`，`identity`的类型就被确定为了String → String，尽管明明可以是a → a。

所以，即使Haskell程序员不用标注递归性，编译器也要先分析哪些定义之间是互相递归的，而不是将语法上同一条let语句中的变量都放在同一组处理，这样才能尽可能独立地推断各变量的类型。像下面这样，虽然同属一条let语句，但是`identity`不从语法上依赖`foo`的话，就能准确推出a → a的类型。

```haskell
let
	identity x = x
	foo x = identity "foo"
in …
```

原文没有给出计算调用关系强连通分量的实现。我也偷懒，默认所有let语句皆为let rec，并要求源程序已标好let rec ~ and。

```diff ts
 type Expression = {
 	tag: 'let',
-	variableName: string,
-	variableValue: Expression,
+	variables: Record<string, Expression>,
 	body: Expression,
 } | …
```

要让类型推断支持递归定义，原理很简单：推断一组变量值类型之前，先将这组变量加到作用域里。变量类型先用类型变量占位。

原文十几行压缩毛巾代码，一大半都在玩它那个替换表 😾 又没有保留旧替换表的需求，纯纯的自找麻烦。可变的并查集赢太多了。而另一半则在倒腾单/多类型转换，研究要泛化哪些变量。基于层级的泛化又赢，代码都不用改。

```ts
function inferExpression(scope: Scope, expression: Expression): Type {
	// …
	case 'let':
		currentLevel++
		const innerScope = { ...scope }
		for (const name in expression.variables) {
			innerScope[name] = newTypeVariable()
		}
		for (const name in expression.variables) {
			unify(innerScope[name], inferExpression(innerScope, expression.variables[name]))
		}
		currentLevel--
		for (const name in expression.variables) {
			innerScope[name] = generalize(innerScope[name])
		}
		return inferExpression(innerScope, expression.body)
```

这一部分代码的修改只有上述两处。

原文末将类型检查器的输入输出由一个表达式 → 一个类型改为了一组定义 → 一组类型，我偷懒没改，反正就算只输出一个类型，多运行几遍（let rec a = … and b = … in a，let rec a = … and b = … in b）也能拿到各变量的类型了。

<div class=admonition>
😾 来自未来的消息：我因为知道第12部分要修改let语句的表达式数据结构，所以提前规划了这里的variables字段名为values，以便在下一部分添加types字段轻松重构。没想到在写第14部分模式匹配时，let语句的数据结构又又又被改了！现在variables字段叫variables而不是variableValues或values，是在未来视的引导下，为了后续重构方便，特地选的通用名称。
</div>

## 第12部分：变量类型标注

原文实现的类型标注只能用于let语句中的变量，而不能用于任意表达式。标注的类型是泛型，其中的类型变量已泛化。用于推断其他变量的类型时，使用例化的类型。

例化后的类型中包含的类型变量可能被其他用法约束，实际类型比标注的类型更具体，这种情况需要报错。下例中，`f`的真实类型为Int → Int，确实符合a → a的形状，但a只能是Int，标注的类型太宽泛了。

```haskell
f :: a -> a
f x = x + 1
```

原文中实现这一检查的方法是，在推断完未标注类型的变量后，对于每个标注了类型的变量，将其类型（`sc`）例化后与从变量值中推得的类型合并（`tiBinding as e t`），合并后的类型再次泛化后（`let sc' = quantify gs t'`）应与标注的类型相同，若不同（`sc /= sc'`）则报错。

```haskell
tiExpl :: Infer Expl ()
tiExpl as (i, sc, e) = do
  t <- freshInst sc
  tiBinding as e t

  s <- getSubst
  let t'  = apply s t
  let fs  = tv (apply s as)
  let gs  = tv t' \\ fs

  let sc' = quantify gs t'
  if sc /= sc' then
      fail "signature too general"
    else
      return ()
```

这看似轻描淡写的一个小小的`/=`，其实是一路铺垫过来的压缩毛巾 😾

原文中数据结构都采用默认的相等性判定（`deriving Eq`），所以这里进行的是递归比较，所有字段都相等才算相等。

可是，泛型参数名可以随意取，比如a → a和b → b其实是一样的，a → b → a和b → a → b也是一样的。如果按名称比较类型变量的话，就会产生误判。这又是怎么处理的呢？

倒回原文[第10部分](https://jeremymikkola.com/posts/2019_01_10_type_inference_for_haskell_part_10.html)：let多态。区别于用字符串名称标识的TVar，原文的泛型参数在多类型中以带整数索引的TGen表示。泛化时，会扫描类型中依次出现的待泛化类型变量，按顺序分配整数索引。原文注释提到：

> 2. `vs'` is arranged in the order of first appearance of the type variable in the type, which is nice because it causes this to use the numbers in `TGen` left to right. This isn’t important for correctness, but it is nice to have.

事实上，这不是可有可无的操作，而是切实必要的步骤！只有在泛化时统一了泛型参数顺序，并将类型变量名抹去，使a → b → a和b → a → b在数据结构中都表示为TGen 0 → TGen 1 → TGen 0，才能保证多类型可以用`==`比较相等性。THIH中明确指出了这一点（p. 20）：

<!-- > Note that the order of the kinds in <var>ks</var> is determined by the order in which the variables <var>v</var> appear in <var>tv</var> <var>qt</var>, and not by the order in which they appear in <var>vs</var>. So, for example, the leftmost quantified variable in a type scheme will always be represented by <var>TGen</var> 0. By insisting that type schemes are constructed in this way, we obtain a unique canonical form for <var>Scheme</var> values. This is important because it means that we can test whether two type schemes are the same—for example, to determine whether an inferred type agrees with a declared type—using Haskell’s derived equality, and without having to implement more complex tests for α-equivalence. -->

> Note that the order of the kinds in `ks` is determined by the order in which the variables `v` appear in `tv qt`, and not by the order in which they appear in `vs`. So, for example, the leftmost quantified variable in a type scheme will always be represented by `TGen 0`. By insisting that type schemes are constructed in this way, we obtain a unique canonical form for `Scheme` values. This is important because it means that we can test whether two type schemes are the same—for example, to determine whether an inferred type agrees with a declared type—using Haskell’s derived equality, and without having to implement more complex tests for α-equivalence.

这么做的理由在TypeScript中不成立，因为JS/TS根本没有深度相等比较运算。反正都要自己写相等性判定，不如干脆写个忽略泛型参数名的比较函数。

```ts
function areEqualTypes(a: Type, b: Type): boolean {
	const aToB: Record<string, string> = Object.create(null)
	const bToA: Record<string, string> = Object.create(null)
	return function recurse(a: Type, b: Type): boolean {
		a = find(a)
		b = find(b)
		if (a.tag === 'namedType' && b.tag === 'namedType') {
			return a.name === b.name
		} else if (a.tag === 'reify' && b.tag === 'reify') {
			return recurse(a.generic, b.generic) && recurse(a.argument, b.argument)
		} else if (a.tag === 'typeVariable' && b.tag === 'typeVariable') {
			if (a.level === Infinity && b.level === Infinity) {
				if (a.name in aToB) {
					return b.name === aToB[a.name]
				} else if (b.name in bToA) {
					return false
				} else {
					aToB[a.name] = b.name
					bToA[b.name] = a.name
					return true
				}
			} else {
				return a.name === b.name && a.level === b.level
			}
		} else {
			return false
		}
	}(a, b)
}
```

泛化的类型变量可以不同名，只要存在互相对应关系就算相等，`aToB`和`bToA`记录了它们间的双向映射；普通的类型变量则必须完全一致才算相等。理论上，因为标注的类型中不含类型变量，只会含有泛型参数，遇到的level都会是∞。

然后，按照原文的做法修改let语句的处理规则，将所有变量加入作用域后，先推断没有标注类型的变量，再检查标注了类型的变量。

```ts
function inferExpression(scope: Scope, expression: Expression): Type {
	// …
	case 'let':
		currentLevel++
		const innerScope = { ...scope }
		for (const name in expression.variables) {
			innerScope[name] = expression.variables[name].type ?? newTypeVariable()
		}
		for (const name in expression.variables) if (!expression.variables[name].type) {
			unify(innerScope[name], inferExpression(innerScope, expression.variables[name].value))
		}
		currentLevel--
		for (const name in expression.variables) if (!expression.variables[name].type) {
			innerScope[name] = generalize(innerScope[name])
		}
		for (const name in expression.variables) if (expression.variables[name].type) {
			currentLevel++
			let type = instantiate(expression.variables[name].type)
			unify(type, inferExpression(innerScope, expression.variables[name].value))
			currentLevel--
			type = generalize(type)
			if (!areEqualTypes(expression.variables[name].type, type)) {
				throw new Error('annotation too general')
			}
		}
		return inferExpression(innerScope, expression.body)
```

引入类型标注后，同一let语句中其他未标注类型的变量之间的类型依赖拓扑可能变化。我偷懒没有处理这种互相递归的情况。

<div class=admonition>
ℹ️ 上一周目止步于此。上一周目写到这里，主程序已经超过300行，到处都是`typeTemplateFromType`这样的超长函数名和`applySubstitutions(substitutions, …)`这样的重复但又不得不写的代码，混乱不堪，遗漏一处就会造成难查的bug，改起来举步维艰。<br>
这一周目至此，代码不到250行，每一步的改动都没有牵一发而动全身。这一周目顺利完结的风险大大增加了。
</div>

## 第13部分：kind

类型的类型系统——也就是kind系统——很简陋。因为运行时可以存在的类型必须是具体类型，函数参数、函数返回值、let定义的变量都必须是具体类型，抽象泛型独立存在的空间很有限。

具体类型的唯一kind是∗，组合产生抽象kind的唯一方法是a → b。因此，kind的数据结构是一棵节点上没有数据的二叉树。

由于实在起不出字段名，我选择了一种极为逆天却又透出一丝丝合理性的表示方法，这样我才知道我写的是TypeScript。

```ts
export type Kind = undefined | [Kind, Kind]
```

<figure>

Haskell记法|Kind数据结构
-|-
`Int :: *`|`undefined`
`[] :: * -> *`|`[,,]`
`(->) :: * -> * -> *`|`[,[,,]]`
`SomeKind :: (* -> *) -> *`<br>其中`data SomeKind a = SomeKind (a Int)`|`[[,,],,]`

</figure>

不了解该JavaScript特性的读者请参照[wtfjs](https://wtfjs.com/wtfs/2013-07-18-array-ruse)。

选择用undefined表示∗，就可以在对象字面量中省略kind，默认为∗。

```diff ts
 type Type =
 	| { tag: 'namedType', name: string,
+		kind?: Kind,
 	} | { tag: 'reify', generic: Type, argument: Type }
 	| { tag: 'typeVariable', link?: Type, name: string,
+		kind?: Kind,
 	level: number }
```

原文除了给Tyvar和Tycon添加了Kind类型的字段，还给Scheme添加了Kind列表，以表示已泛化类型中依次出现的类型参数的kind。为什么不给TGen添加Kind字段呢？明明Kind同样采用默认的递归相等性判定。无论如何，既然我选择了不区分单/多类型，就不用考虑这些问题，真是选对了。

原文中Kind自动生成的相等性判定在TS里又要手写。得益于这个逆天表示法没有使用对象，JSON序列化方式唯一，倒是可以偷懒比较JSON序列化得到的字符串是否相等……不过数据结构本来就很简单，相等性比较逻辑也就一行，还是手写一下好了。

```ts
function areEqualKinds(a: Kind, b: Kind): boolean {
	return a === b || !!a && !!b && areEqualKinds(a[0], b[0]) && areEqualKinds(a[1], b[1])
}
```

随后便是在各处补上对kind的检查。标注类型是kind错误的重灾区，原文却直说略过了对标注类型的检查。我寻思：我写类型检查器不去检查类型，那我到底在写什么？这大概是因为，就像类型推断一样，定义数据类型时也要进行类似的kind推断，这样推断类型时kind就已知合法了，不存在独立的检查kind一步。

既然本系列不会涉及kind推断，所有类型定义的kind都已在输入中明确给出，检查一下标注类型中的kind也不麻烦，我就自己写了检查。

```ts
function getKind(type: Type): Kind {
	if (type.tag === 'reify') {
		const kind = getKind(type.generic)
		if (!kind || !areEqualKinds(kind[0], getKind(type.argument))) {
			throw new Error('wrong kind')
		}
		return kind[1]
	} else {
		return type.kind
	}
}
```

这一部分一共增加了三种新的报错：

- incomplete type：标注的变量类型不是具体类型，如`x :: (->)`
- wrong kind：传入了错误类型的泛型参数，如`x :: (->) -> (->)`
- kind mismatch：遇到了因kind不同而无法合并的类型

最后一种错误很难触发，原文末尾给出了一个例子，但因为涉及模式匹配而没有添加测试用例到源码中。将其改写为显式标注类型的函数，也一样会产生kind不匹配的错误。

```haskell
data SomeKind a = SomeKind (a Int)

unwrap :: a b -> b
unwrap = unwrap

getVal :: SomeKind t -> t Int
getVal = getVal

foo y = (getVal y, unwrap y)
```

## 第14部分：模式匹配

let语句是否也是一种case语句？

```haskell
let f = \x -> \y -> x y in f id
-- 等价于
case \x -> \y -> x y of
	f -> f id
```

哈哈，其实case语句是一种let语句。

```haskell
case n of
	Just n -> n - 1
	Nothing -> 0
-- 等价于
let
	f (Just n) = n - 1
	f Nothing = 0
in f n
```

因为允许在函数定义的参数列表中进行多值、多分支的模式匹配，定义的函数还可互相递归，let语句是case语句的严格超集。

```haskell
let
	a 0 n = n + 1
	a m 0 = a (m - 1) 1
	a m n = a (m - 1) (a m (n - 1))
in a 3 4
```

支持在函数定义顶层对参数进行模式匹配好像是ML和Erlang（和Elixir）特有的特性，其他支持模式匹配的语言大多只有单独的模式匹配语句（如Rust和Python的match）。

原文将函数参数模式匹配中的一条分支（如上例的`0 n`、`m 0`、`m n`之一）命名为Alt，为alternative的缩写。可能是这个名字实在不好搜，也可能是这个词只在THIH里这么用过，我没有找到其他资料如此使用alternative一词。Erlang和Elixir将同一概念称为clause，已刻在标准库里了（[FunctionClauseError](https://hexdocs.pm/elixir/main/FunctionClauseError.html)），所以我选择了clause的名字。

```ts
export type Clause = { parameters: Pattern[], value: Expression }
```

一个变量定义由多条分支组成。

```diff ts
 export type Expression = {
 	tag: 'let',
 	variables: Record<string, {
 		type?: Type,
-		value: Expression,
+		clauses: Clause[],
 	}>,
 	body: Expression,
 } | …
```

原文Pat类型的6个分支颇为冗余：PVar（`x`）可替换为PAs嵌套PWildcard（`x@_`）；PNpk（`n + 1`）语义怪异，语法具有误导性，不推荐使用，在Haskell 2010中已删去。我没有实现这两个分支。

PCon的首个字段包含了构造器的名称和类型。构造器的名称在类型检查中无用，可以忽略。构造器的类型是函数，比如说，Just确实是一个函数，其类型是a → Maybe a；Nothing是一个Maybe a类型的值，可以看作接收0个参数的函数。Haskell中的constructor一般译为构造器，但在这里，检查的就是构造器的函数类型，看作面向对象语言中数据类的构造函数也无妨，因此我没有将其重命名为variant或case，而是保留了constructor的名字。

```ts
export type Pattern =
	| { tag: 'wildcard' }
	| { tag: 'as', variableName: string, pattern: Pattern }
	| { tag: 'literal' } & Expression
	| { tag: 'structure', constructor: Type, fields: Pattern[] }
```

原文中一下子追加了四个推断函数：tiPat、tiPats、tiAlt、tiAlts。我只保留了tiPat（inferPattern）和tiAlts（inferClauses）。tiPats只是遍历了一下模式列表，tiAlt只在tlAlts内部使用，所以我把这两个函数内联了。

在TypeScript中表达和使用返回多个值的函数好麻烦 😾

```ts
function inferPattern(pattern: Pattern): { scope: Scope, type: Type } {
	switch (pattern.tag) {
	case 'wildcard':
		return { scope: {}, type: newTypeVariable() }
	case 'as':
		const result = inferPattern(pattern.pattern)
		result.scope[pattern.variableName] = result.type
		return result
	case 'literal':
		return { scope: {}, type: inferExpression({}, pattern) }
	case 'structure':
		const fields = pattern.fields.map(inferPattern)
		const resultType = newTypeVariable()
		unify(
			instantiate(pattern.constructor),
			functionType(...fields.map(x => x.type), resultType),
		)
		return {
			scope: Object.assign({}, ...fields.map(x => x.scope)),
			type: resultType,
		}
	}
}

function inferClauses(scope: Scope, clauses: Clause[]): Type {
	const resultType = newTypeVariable()
	for (const clause of clauses) {
		const parameters = clause.parameters.map(inferPattern)
		unify(
			resultType,
			functionType(
				...parameters.map(x => x.type),
				inferExpression(Object.assign({}, scope, ...parameters.map(x => x.scope)), clause.value),
			)
		)
	}
	return resultType
}
```

原文中`functionType(...ts, t)`写作`foldr fn t ts`。foldr :: Foldable t ⇒ (a → b → b) → b → t a → b的回调的参数顺序刚好能让fn组合出正确的嵌套结果，怎么会这么巧？JavaScript的Array.prototype.reduceRight的参数顺序就反了 😾 还好我在一开始编写functionType辅助函数的时候就添加了多参数支持，没想到在这里用上了。

## 第15~20、23部分：typeclass

### 概述

```haskell
-- Haskell

data Ordering = LT | EQ | GT

class Eq a => Ord a where
	compare :: a -> a -> Ordering
	x <= y = case compare x y of { GT -> False; _ -> True }

instance Ord a => Ord [a] where
	compare x y = …

increasing :: Ord a => a -> a -> a -> Bool
increasing x y z = x <= y && y <= z
```

```rust
// Rust

enum Ordering { Less = -1, Equal = 0, Greater = 1 }

trait Ord: Eq {
    fn cmp(&self, other: &Self) -> Ordering;
    fn le(&self, other: &Self) -> bool {
        match self.cmp(other) { Ordering::Greater => false, _ => true }
    }
}

impl<T: Ord> Ord for [T] {
    fn cmp(&self, other: &[T]) -> Ordering {
        …
    }
}

fn increasing<T: Ord>(x: &T, y: &T, z: &T) -> bool {
    x <= y && y <= z
}
```

上例改编自各语言标准库。

Haskell的typeclass可以理解为Rust的trait、Java和C#等语言的接口。与TypeScript和Go的接口不同的是，实现接口必须显式声明，不同接口中的重名方法互不干扰。instance语句用于为类型实现接口。

只不过，Haskell的语法比较非主流，不好从语法中看出一些隐含的限制。

`class ClassName a`中只能有一个类型参数a，它在定义中起到Rust的Self关键字的作用。

`=>`不能连用，多个类型约束用元组语法写出（`(Ord a, Show a) =>`，对应于Rust的`<T: Ord + Debug>`）。`=>`前的部分称为谓词（predicate），在其他语言中称作constraint（C#、TypeScript、Swift）或bound（Java、Rust）。

实现定义`instance ClassName Type`中的目标类型部分必须是`TypeName a b c`这样类型名接数个互不相同的类型变量的格式。该限制的目的在于消除同一类型存在多种接口实现的可能，只靠类型名就能唯一确定使用哪套实现。

放松该限制将导致函数解析急剧复杂化。Rust支持为特定类型实例实现trait（如`impl MyTrait for Vec<bool>`），也支持为所有类型实现trait（`impl<T> MyTrait for T`）。因此，Rust编译器需要记录并检查实现间是否有重叠，在重叠时给出一个专门的错误[E0119](https://doc.rust-lang.org/stable/error_codes/E0119.html)。

C++等语言支持特化（specialization），即为某个特定类型修改通用实现。这个特性很有用，但涉及到多个实现间的优先级问题时，背后的规则复杂程度远超表象。[C++](https://en.cppreference.com/w/cpp/language/overload_resolution.html)和[Python](https://docs.python.org/3/howto/mro.html)各有十几页文档来说明存在多个实现时，`a.b()`调用的到底是哪个方法。即便如此，解析结果也未必符合直觉。

Haskell未开启语言扩展的情况下不允许实现重叠。GHC默认开启FlexibleInstances扩展，测试时需要传入命令行参数`-XHaskell98`关闭。

一些看起来像是发生了特化的现象其实是在接口自身上开了后门。

表达式|值
-|-
`show 1`|`"1"`
`show [1,1,4,5,1,4]`|`"[1,1,4,5,1,4]"`
`show '1'`|`"'1'"`
`show ['1','1','4','5','1','4']`|<del>`"['1','1','4','5','1','4']"`</del><br><ins>`"\"114514\""`<ins>

标准库中Show接口定义如下（经大幅简化）：

```haskell
class Show a where
	show :: a -> String

	showList :: [a] -> String
	showList xs = "[" ++ intercalate "," (map show xs) ++ "]"

instance Show a => Show [a] where
	show = showList
```

每个类型可以定制自身和自身列表的输出格式，String的特殊输出格式定义在Char类型上。

至此为止的描述尚可与Rust等语言对应。但Haskell之所以是那个难学程度远近闻名的Haskell，单子（monad）🌯功不可没。没有高阶类型（higher-kinded type），就无法表达Monad等抽象typeclass。除了Haskell，知名语言中原生支持高阶类型的就只剩Scala了，逃课逃不了了。

```haskell
class Applicative m => Monad m where
	(>>=) :: m a -> (a -> m b) -> m b
```

这里，目标类型m需要一个泛型参数才能变为具体类型，如m a和m b，即m的kind是∗ → ∗。

虽然函数参数必须是具体类型（kind为∗），但是泛型参数可以不是，因此泛型参数可以有更复杂的约束。`=>`前、typeclass名后的类型部分未必是单个泛型参数，但必须以泛型参数开头。这个细节在不支持高阶类型的语言中没有意义；在Haskell中，这意味着下面的代码可以编译（来自原文[第18部分](https://jeremymikkola.com/posts/2019_01_19_type_inference_for_haskell_part_18.html)）：

```haskell
data SomeData a = MkSomeData (a Int)

showData :: Show (a Int) => SomeData a -> [Char]
showData (MkSomeData x) = "SomeData " ++ show x

showData (MkSomeData [1]) -- "SomeData [1]"; a = []
showData (MkSomeData (Just 1)) -- "SomeData Just 1"; a = Maybe
showData (MkSomeData "1") -- error: [] Char ↚ a Int
```

### 数据结构

原文[第16部分](https://jeremymikkola.com/posts/2019_01_16_type_inference_for_haskell_part_16.html)不紧不慢地定义了Pred（类型约束）、Qual（泛型参数约束列表）、Inst（实现）、Class（接口定义）、ClassEnv（接口定义列表）数据类型。一些数据类型定义得相当奇怪，例如ClassEnv：

```haskell
data ClassEnv = ClassEnv { classes  :: Id -> Maybe Class,
                           defaults :: [Type] }

modify       :: ClassEnv -> Id -> Class -> ClassEnv
modify ce i c = ce{classes = \j -> if i==j then Just c
                                           else classes ce j}
```

明明用键值映射更直观也更高效，非要搞个闭包链表。

这些都没什么。可是原文在最后，修改了我未实现的Scheme（多类型）。

```diff haskell
 data Scheme
-    = Forall [Kind] Type
+    = Forall [Kind] (Qual Type)
     deriving Eq
```

这么一改我不就炸了吗！我的代码从头到尾就没有区分过单类型和多类型，现在把多类型加回来的话，就差不多要重写了。

我寻思：既然类型变量的泛化状态和kind可以记在类型变量对象本身上，那么同样作用于变量上的约束又有什么理由一定要另外记录呢？

照着泛化的思路，我将类型约束也记在类型变量对象上。像`(Show a, Ord a)`这样的约束，在类型变量a上用`bounds: ['Show', 'Ord']`的属性来表达。

```diff ts
 export type Type =
 	| { tag: 'namedType', name: string, kind?: Kind }
 	| { tag: 'reify', generic: Type, argument: Type }
 	| { tag: 'typeVariable',
 		link?: Type,
 		name: string,
 		kind?: Kind,
+		bounds: string[],
 		level: number,
 	}
```

至于上面提到过的`Show (a Int)`这样不只是作用于一个类型变量上的约束，留给读者作为练习 😾 提示：因为约束要求目标类型最左侧是类型变量，因此仍将类型约束记录在该类型变量上即可，只是要携带上额外的类型参数，例如`bounds: { interfaceName: string, arguments: Type[] }[]`。但如此一来又要额外实现一些相等性比较函数。有额外参数的情况怎么看都是边界场景，我就不做了。

将类型约束记录在类型变量上，顿时豁然开朗。不仅依旧不用区分单类型和多类型，原作中到处都是的把谓词传来传去的代码也不需要了，连带谓词推迟（predicate deferring）也自动完成了。谓词化简可在添加类型约束时顺便做掉。

我把到处传来传去的ClassEnv改写为了全局变量；Pred、Qual、Inst、Class这些数据结构不是被bounds字段覆盖就是短小可内联。最后，追加的数据结构就只有ClassEnv一个，命名为InterfaceDefinitions。

```ts
export type InterfaceDefinitions = Record<string, {
	parents: string[],
	implementations: Type[],
}>
let interfaceDefinitions: InterfaceDefinitions
```

超类（superclass）在Java中被称为超接口（superinterface）或父接口（parent interface），实例（instance）则是接口的实现（implementation）。对于有前置约束的实现，约束体现在类型变量的bounds字段上，例如typeclass Ord的定义如下：

```ts
const stdi: InterfaceDefinitions = {
	Ord: { parents: ['Eq'], implementations: [
		builtinTypes.int,
		builtinTypes.char,
		builtinTypes.bool,
		{ tag: 'reify', generic: builtinTypes.list, argument:
			{ tag: 'typeVariable', name: 'a', bounds: ['Ord'], level: Infinity } },
		// …
	] },
}
```

除此之外，最大的改动就在unify函数里了。将类型变量并入到其他类型时，需要保持类型约束仍被满足。当两个类型变量合并时，类型约束也需要合并；当类型变量并入具体类型时，需要找到对应实现，确保具体类型满足约束。

```ts
function head(type: Type): Type & { tag: 'namedType' | 'typeVariable' } {
	return type.tag === 'reify' ? head(type.generic) : type
}

function unify(a: Type, b: Type): void {
	a = find(a)
	b = find(b)
	if (a.tag === 'typeVariable') {
		// …
		if (b.tag === 'typeVariable') {
			const impliedBounds = [a.bounds.concat(b.bounds)]
			do {
				impliedBounds.push(impliedBounds.at(-1)!.flatMap(x => interfaceDefinitions[x].parents))
			} while (impliedBounds.at(-1)!.length)
			const newBounds = new Set(impliedBounds.shift())
			for (const x of impliedBounds.flat()) newBounds.delete(x)
			b.bounds = [...newBounds]
		} else {
			const bHead = head(b)
			if (bHead.tag === 'namedType') {
				for (const bound of a.bounds) {
					const implementation = interfaceDefinitions[bound].implementations.find(i => {
						const iHead = head(i)
						return iHead.tag === 'namedType' && iHead.name === bHead.name
					})
					if (!implementation) throw new Error('interface not implemented')
					unify(instantiate(implementation), b)
				}
			} else {
				// 类型约束目标类型不是单个类型变量的场合
				if (a.bounds.length) throw new Error('unsupported type constraint')
			}
		}
```

合并类型约束时需要删去重复和冗余的条目，这段代码由于JS数组和集合操作表达力太过贫乏，写得很别扭。不过其实就算不化简，推出的类型也并非错误。

检查实现时，由于所有实现类型均为`TypeName a b c`的格式，只需要检查类型最左侧的名称是否一致即可。开启FlexibleInstances语言扩展后，这一点不再能保证，就需要更复杂的类型匹配算法。原文中定义的`match`（单向unify）函数、原作中定义的`overlap`条件就是为此准备的。这里因为限制了实现类型格式，套用unify也没问题。

最终我在50行变动内实现了除歧义检查和单态限制的typeclass的类型检查。原文只算新增的代码都有70行了，那可是短死人不偿命的Haskell啊！涉及更改更是遍及所有ti开头的函数。没有选择照抄真是太对了。

## 第21部分：歧义检查

`\x -> show (read x)`的类型是String → String，输入和输出都不涉及接口，中间过程却涉及Read和Show两个typeclass。不对中间结果给出更多条件的话，就无法决定到底要执行哪个实现，这种现象称为歧义（ambiguity）。

`read x`的结果的类型变量在与`show`的参数类型变量合并后丢了。要寻找的歧义就是这些有类型约束但弄丢了的类型变量。

原文每一步都小心翼翼地收集着类型变量上的约束，所以最后能通过多出来的约束发现变量弄丢的事。可是，我这里的类型变量一旦丢了就真丢了，没法找回来。

### 数值类型

这一部分介绍的消歧义判定和原文下一部分介绍的单态限制都只针对数值型typeclass（Num等）。数值型有多特殊，后门都开到类型检查器里来了，这不对吧？

```haskell
f = show -- error
-- show :: Show a => a -> String
g = cos -- g :: Double -> Double
-- cos :: Floating a => a -> a
h = (+1) -- h :: Integer -> Integer
-- (+1) :: Num a => a -> a
```

GHC默认启用单态限制，但REPL默认禁用单态限制并扩张了消歧义范围，测试时需要传入命令行参数`-XMonomorphismRestriction -XNoExtendedDefaultRules`恢复Haskell报告定义的行为。

我认为数值字面量的多态性是促成这些特判的幕后黑手。如果数值字面量明确规定其类型，消歧义机制和单态限制就都不需要了。C的隐式转换规则的复杂性一大半都来源于数值类型，也有着类似的动机。Go的数值字面量同Haskell一样会根据类型上下文自适应，但推不出类型时的“我不管反正默认就是int”规则反倒不会带来很多问题。

因为我认为这些特性不具有普适性，我就偷懒不做消歧义和单态限制了，留给读者作为练习 😾 若要做的话，消歧义就是在检查歧义时跳过符合消歧义条件的类型变量；单态限制则要修改泛化逻辑，只泛化不带类型约束的类型变量。

### 完结撒花

至此，Haskell 98类型系统中的重要部分皆已实现，代码不过344行。

```console
$ cloc --quiet --by-file *.ts
github.com/AlDanial/cloc v 2.06  T=0.02 s (123.5 files/s, 97523.3 lines/s)
-------------------------------------------------------------------------------
File                             blank        comment           code
-------------------------------------------------------------------------------
index.test.ts                      125             13           1072
index.ts                            23              2            344
-------------------------------------------------------------------------------
SUM:                               148             15           1416
-------------------------------------------------------------------------------
```

与之相对，原文提供的不带测试用例的Haskell源代码行数为434行。去掉我没有实现的部分，原文的代码与我的代码长度差不多。完全胜利！
