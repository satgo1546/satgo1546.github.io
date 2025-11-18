---
title: Notes on <cite>Rewriting Interpreters in Rust</cite>
date: 2025-11-15
dates: 2025-11-04 ~ 2025-11-15
excerpt: I’m going to skip it and do the simplest thing possible — leaking with Rc.
lang: en
tags:
- 进度报告
- Crafting Interpreters 阅读笔记
---

<pre>a.k.a. my take on <cite>Crafting Interpreters</cite>, part III</pre>

[View code of this part on GitHub.](https://github.com/satgo1546/plat/tree/lox-rs)

<dl class=long>

<dt>§14, first marginal note [turtles all the way down]
<dd>

Back in the days when operating systems were in their infancy, programs handled memory allocations themselves. You can still find traces of the old times today in the codebase of venerable software such as TeX. Nowadays, even languages that are considered low-level provide built-in dynamic arrays and hash tables.

I find it rather arbitrary to stop asking “How?” at malloc and free. How can one write a good dynamic array without knowing the underlying memory allocator? Alas, it most probably is due to clox being written in C. <img class="icon" src="icon-rust.png"> Since I’m writing Rust, I’ll skip more parts that the language provides for free.

<dt>§14.3 [enum OpCode]
<dd>

The notion of an enum varies a lot across languages. Nonetheless, C’s enum is clearly an outlier. An enum in C couples so loosely with its variants that it most often translates to plain constant definitions — instead of a proper enumeration (whatever that means) — in other languages.

If binary compatibility is desired between VM implementations, this is the only way to go. <img class="icon" src="icon-rust.png"> I’m not aiming for that, however, so I rely on a Rust enum that encodes both the opcode and operands of an instruction. It makes the instructions fixed-length, which is wasteful for those with few operands.

<dt>§14 design note [test your language]
<dd>

The column can’t be hiding this well if the intention to test early is real. When I try to make the official Lox test suite work, I’m greeted with compatibility issues like [this one](https://github.com/munificent/craftinginterpreters/issues/1122). Tools move so fast.

<dt>§15.3.1, last marginal note [operator as preprocessor macro argument]
<dd>

<img class="icon" src="icon-rust.png"> Higher-level languages allow passing an operator as an actual argument.

```rust
fn binary_op(stack: &mut Vec<Value>, op: fn(f64, f64) -> f64) { /* … */ }
pub fn interpret(chunk: &Chunk) -> InterpretResult {
    // …
    binary_op(&mut stack, std::ops::Sub::sub);
```

<dt>§15.1, first marginal note [global singleton]
<dd>

<img class="icon" src="icon-rust.png"> In Rust, reaching for global variables is asking for trouble. Threading a state struct through every function call properly instead becomes the path of least resistance.

<dt>§16.2, third marginal note [lifetime of source code string]
<dd>

<img class="icon" src="icon-rust.png"> One must not only think through, but also *write down* the lifetimes of all shared string slices in Rust. 😾

<dt>§17.3 [emitting bytecode]
<dd>

<img class="icon" src="icon-rust.png"> `compilingChunk` is state local to a particular call of `compile()`, but is stored as a module-wide global. Rust barks at such a pattern. Thread it through every function call properly is, once again, the path of least resistance.

<dt>§17.6 [Pratt parser]
<dd>

The inclusion of a big table is questionable even in C. Why introduce a level of indirection and muddle the control flow with function pointers when three big switch statements suffice?

[A tutorial by @matklad](https://matklad.github.io/2020/04/13/simple-but-powerful-pratt-parsing.html) explains Pratt parsing in Rust — but is also applicable to other languages with decent type systems. It uses match statements rather than a big table. While match statements compile to big tables anyway, they do so in a type-safe manner, and save one from writing out many `NULL`s for every token type not used as an operator.

<dt>§18.3.2 [macro as macro argument]
<dd>

<img class="icon" src="icon-rust.png"> Higher-level languages allow passing a union tag as an argument.

```rust
fn binary_op<T>(
    &mut self,
    op: fn(f64, f64) -> T,
    value_type: fn(T) -> Value,
) -> InterpretResult {
    // …
    let result: Value = value_type(op(a, b));
    // …
}

fn run(&mut self, chunk: &Chunk) -> InterpretResult {
    // …
    self.binary_op(std::ops::Add::add, Value::Number)?;
    // = macro invocation in C: BINARY_OP(NUMBER_VAL, +);
```

But there is no point generalizing over `T`, as the only use of the type parameter is in the intermediate result. Just do anonymous functions.

```rust
fn binary_op(
    &mut self,
    op: fn(f64, f64) -> Value,
) -> InterpretResult {
    // …
    let result: Value = op(a, b);
    // …
}

fn run(&mut self, chunk: &Chunk) -> InterpretResult {
    // …
    self.binary_op(chunk, |a, b| Value::Number(a + b))?;
```

<dt>§19 [strings]
<dd>

<img class="icon" src="icon-rust.png"> I added another variant to enum Value, and left housekeeping to Rust’s String. While this works for strings as they are immutable in Lox, it’s going to be tough when it comes to classes.

<dt>§20.3 [hash functions]
<dd>

Java uses an infamously bad [hash function for String](https://docs.oracle.com/javase/8/docs/api/java/lang/String.html#hashCode--): <var>s</var>.hashCode() = 31<sup><var>n</var>−1</sup><var>s</var><sub>0</sub> + 31<sup><var>n</var>−2</sup><var>s</var><sub>1</sub> + ⋯ + <var>s</var><sub><var>n</var>−1</sub>. It has many properties a good hash function doesn’t exhibit, such as `"".hashCode() == 0`, `"a".hashCode() == "a".charAt(0)`, `("\0" + s).hashCode() == s.hashCode()`, and `"gelato".hashCode() == "variants".hashCode()`.

<dt>§20.5 [string interning]
<dd>

<img class="icon" src="icon-rust.png"> I tried to add a string pool as a `HashSet<Rc<String>>`, but the global nature of string interning kept me from making the compiler happy with an intertwined data flow. I gave up and [cloned strings everywhere](https://keepcalmandcallclone.website/). This is an example where rewriting in Rust inappropriately degrades performance.

<dt>§23.1 [if statements]
<dd>

<img class="icon" src="icon-rust.png"> Holding a pointer to the jump offset field works equally well as recording a byte offset to the instruction. In Rust however, the borrow checker is generally unhappy with these mutable references. I followed the book and opted for numeric indices.

Rustaceans frown upon unwrap()ping as panics are unrecoverable. It is more subtle that indexing is also panicking. Holding an integer index to an object pool is just like holding a pointer to some random memory, but indices bypass the borrow checker. It is no safer, for some defintion of safety that probably aligns more with what an average programmer thinks it is but Rust does not adopt.

<dt>§26.4, first marginal note [timing of implementing GC]
<dd>

(This note is intentionally out of order.) <img class="icon" src="icon-rust.png"> Until now, data form a directed acyclic graph in the interpreter. The default single-owner memory model enforced by Rust serves well. A GC is strictly not needed.

As soon as closures enter the picture, cycles are possible, multiple owners become a requirement, and even Rc can’t save the interpreter from leaking memory. This is one of the few cases where one *should* use a GC in Rust.

A GC is obviously more difficult to implement than a linked list, [the hardest thing™ in Rust](https://rust-unofficial.github.io/too-many-lists/). I’m going to skip it and do the simplest thing possible — leaking with Rc.

No wonder why [the list of Lox implementations in Rust](https://github.com/munificent/craftinginterpreters/wiki/Lox-implementations#rust) has a low rate of completeness.

<dt>§24.2.1, change to compiler.h [adjust signature of compile()]
<dd>

This seemingly innocent move transfers the ownership of the returned chunk. <img class="icon" src="icon-rust.png"> My compiler has been pervaded by a mutable reference parameter `chunk: &mut Chunk` throughout at this point, and the little change of ownership translates to a massive overhaul getting rid of that.

<dt>§24.4.1 [a stack of compilers]
<dd>

It’s yet another way to manage stack-like stuff; this is getting ugly. <img class="icon" src="icon-rust.png"> I did something way uglier though: I reused the same compiler object, jiggling the fields around into something called a CompilerFrame — it’s like CallFrame but at compile time. It’s because the parser and the compiler couple so tightly that they have to be the same object, but the parser should not reinitialize itself when entering a function.

<dt>§30.3 [NaN boxing]
<dd>

<img class="icon" src="icon-rust.png"> This trick isn’t possible in Rust without unsafe blocks. I have a 4-byte Instruction type and a 32-byte Value type (due to ObjClosure inlined into Value). This is the price to pay for enums.

</dl>

---

<pre>☑ Part III</pre>

```console
$ tokei src --files
================================================================================
 Language             Files        Lines         Code     Comments       Blanks
================================================================================
 Rust                     2         1835         1810            4           21
--------------------------------------------------------------------------------
 src/main.rs                          42           40            0            2
 src/lib.rs                         1793         1770            4           19
================================================================================
 Total                    2         1835         1810            4           21
================================================================================
```
