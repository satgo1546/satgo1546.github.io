---
title: 4202年的Godot
date: 2024-09-20
dates: 2024-09-20, 2024-09-23
tags:
- 闲聊
- Godot
---

<i>插播一条说明：Godot是《等待戈多》里的戈多，所以它不读go dot。</i>

上次调研Godot的时候，Godot 4还处于4.0.3版办法，差不多是刚发布的公测阶段，教程、文档、宣传视频都尚未更新，给刚开始尝试的我带来了很多混乱。现在，一年多过去了，官网和社区已经全面转向Godot 4，现在是个再次开始的好机会。

你猜怎么着？就像Windows、DOM、PixiJS、Three.js那样，Godot也有场景图，每个场景都包含一棵节点树。这真是个绕不开的话题。

那么它是否也有夺取数据所有权的问题呢？并不完全是。确实必须修改节点属性，才能将数值反映到界面上。但是，Godot有场景的概念。场景可以被当作节点实例化，所以Godot中的场景实际上是HTML自定义元素，或称组件。（Godot文档中特地指出“场景”与其他游戏引擎中“组件”的概念不同，是因为其他游戏引擎对组件的定义是基于实体-组件-系统架构的定义，不同于前端框架库对组件的定义。）此时，用户可以将自己制作的节点放入场景图中，拥有自定义的行为，在引擎的基础上构建，而不是受限于场景图中有限的节点类型，只能把场景图单纯作为输出。组件化是构建现今Web UI的基石思想，Godot将其应用到游戏引擎领域独树一帜。

DOM|Godot
-|-
元素|节点
自定义元素|场景
影子DOM|场景树
事件|信号
ID|唯一名称（%引用）
CSS类|分组

----

Godot支持自研脚本语言GDScript，也支持C#。我不会C#，所以先看看支持度更高的GDScript。但我很可能会现学C#。取决于设计预期用途，像GDScript这样的专用语言往往存在设计缺陷。（但看得出来至少设计得比AutoHotkey好。）因为配套工具的缺乏，如果用该语言实现了一些通用逻辑，后续也很难移植到其他语言。

目前发现的诡异的语言设计：

<ul>
<li>一个文件只能是一个类。你是Java吗？要写实用函数库的时候就遭罪了

<li>虽然面向对象，但是字段和方法不能为私有，鉴定为学Python学的。写Python的时候我恨死这个问题了，完全违反面向对象原则的设计实在是太逆天了。<a href="https://github.com/godotengine/godot-proposals/issues/641">godot-proposals #641</a>

<li>类型不匹配时<code>==</code>和<code>!=</code>可能报错

<li>仅在创建闭包时捕获一次变量值，之后外层变量的修改对闭包内无效
<pre><code class="language-gdscript">
var x = 114
var f = func (): return x
x = 514
print(f.call()) # 结果是114
</code></pre>
<ul>
<li>不能写<code>f()</code>，只能写<code>f.call()</code>的原因是<code>f()</code>是<code>self.f()</code>，就算作用域内有f也是如此
</ul>

<li>渐进式类型系统疑似有点过于渐进了，只要不标类型就完全不推断
<pre><code class="language-gdscript">
var x := 114514
x = "这样会报错" # Parser Error: Cannot assign a value of type "String" as "int".
</code></pre>
<pre><code class="language-gdscript">
var x = 114514
x = "把:=换成=就不报错了"
</code></pre>

<li>类型系统非常非常弱，唯一的泛型类型是数组

<li>Godot 4更换了异步函数的写法：不需要标注异步函数，异步函数也不返回promise；await几乎没有存在的必要，但仍必写，以供参考。Godot 3没有await，取而代之的是yield带有自动继续能力的生成器语法，更怪。很难说主流语言的异步写法是好的，GDScript不同寻常说不定反倒是件好事

<li>有很多基于名字字符串（准确地说是StringName，也就是Lisp风符号）的API，这太动态了，直接消灭了自动重构的可能性

<li>不知道为什么文档里完全没有提到场景内建脚本。脚本和场景分开就像在Vue SFC里分开导入<code>&lt;template src&gt;</code>、<code>&lt;style src&gt;</code>和<code>&lt;script src&gt;</code>一样，弱化了它们之间内在的关联。Godot推荐分离的原因应该是为了方便集成外部工具（C#、版本控制、外部编辑器），但编辑器又不像Visual Studio那样将.designer.cs文件（≈ .tscn文件）视作.cs（≈ .gd）的一部分，甚至推崇分离以备复用（但其实根本不存在这样复用的可能）

<li>跨过场景边界后，自动补全和类型检查就不复存在了。就当是在写古典JS和Python吧，这类型系统用不了一点

<li>4.0中<code>not ""</code>和<code>"" or []</code>会报错，4.1才修（<a href="https://github.com/godotengine/godot/pull/74741">#74741</a>）。不过这个好像是重写导致的退化，应该不是故意的
</ul>

2D教程有一些明显不符合最佳实践的操作，不知是否为了简单起见所致。

- 仅在场景\_ready生命周期中调用get_viewport_rect一次，没有考虑调整窗口大小的可能性
- 在多个UI控件上使用相同的主题覆盖直接设置字体和字体大小，而非创建UI主题
- 在音频流播放器的流属性上使用唯一化而非在导入BGM资源时设置循环属性

我觉得Godot是个很正常的游戏引擎，而正常是难能可贵的性质。
