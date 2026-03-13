---
title: 招笑的异步Python 😾
date: 2026-03-12
dates: 2026-03-12 ~ 2026-03-13
excerpt: 我研究了一下Python的async，结论是别研究 😾
tags:
- 闲聊
- Python
---

还在用Flask吗？快来试试最新最热的FastAPI吧。我研究了一下Python的async，结论是别研究 😾

我想不通为什么Python能搞出比Rust还要复杂的异步系统，结果也是一样的招笑。标准库asyncio几乎把其他标准库重做了一遍，搞得所有第三方库都要大动干戈地适配，简直是对Python之道“There should be one — and preferably only one — obvious way to do it.”的侮辱。

```py
time.sleep(1)
await asyncio.sleep(1)

subprocess.Popen(['ls', '-1'])
await asyncio.create_subprocess_exec('ls', '-1')

requests.get('https://example.com/')
async with httpx.AsyncClient() as client:
    await client.get('https://example.com/')
```

就连REPL都有asyncio特制版，因为原版Python/REPL不支持顶层await。

```console
$ python
Python 3.14.3 (main, Feb 13 2026, 15:31:44) [GCC 15.2.1 20260209] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> 
$ python -m asyncio
asyncio REPL 3.14.3 (main, Feb 13 2026, 15:31:44) [GCC 15.2.1 20260209] on linux
Use "await" directly instead of "asyncio.run()".
Type "help", "copyright", "credits" or "license" for more information.
>>> import asyncio
>>> 
```

五年过去了，SQLModel（FastAPI作者对SQLAlchemy的封装）[文档中的异步部分仍在施工中](https://github.com/fastapi/sqlmodel/blob/0.0.37/docs/advanced/index.md#:~:text=async)；Django费了九牛二虎之力把API裂成两半，结果[异步比同步还慢，当然也就没什么人用](https://www.loopwerk.io/articles/2025/async-django-why/)。

<img src=sqlmodel.webp width=420>

<img src=4-2x.webp width=600>

JavaScript添加async/await是在解决问题，Python则是在创造问题。异步特性只是简单地叠加进了语言里，其带来的问题任由开发者自己坑自己。（这一点倒是很Python。）使用异步很容易不小心写出有问题的代码。所有先有同步后有异步的语言都有不小心阻塞的问题，可是什么叫[游离的Task会自动记入事件循环却可能被垃圾回收](https://docs.python.org/3.14/howto/a-conceptual-overview-of-asyncio.html#:~:text=the%20task%20object%20you%20created%20is%20garbage%20collected)？

<blockquote lang=en>

```py
async def hello():
    print("hello!")

async def main():
    asyncio.create_task(hello())
    # Other asynchronous instructions which run for a while
    # and cede control to the event loop...
    ...

asyncio.run(main())
```

Because there’s no reference to the task object created on line 5, it *might* be garbage collected before the event loop invokes it. Later instructions in the coroutine `main()` hand control back to the event loop so it can invoke other jobs. When the event loop eventually tries to run the task, it might fail and discover the task object does not exist!

</blockquote>

随着<abbr title="Python 3.14">πthon</abbr>发布，以后GIL解除的话，异步程序将需要同时考虑异步、阻塞、多线程的影响，想想就头皮发麻。

## 阅读材料

我在阅读完文档[A Conceptual Overview of `asyncio`](https://docs.python.org/3.14/howto/a-conceptual-overview-of-asyncio.html)后就立即断定异步Python不适合投入使用。实际上，除了函数着色和垃圾回收问题，asyncio还有中断卡死、无限缓冲、同步回调等好几个极其离谱的设计缺陷。

<div lang=en>

- [<img class=icon src=sailor.li.jpg> asyncio: a library with too many sharp corners](https://sailor.li/asyncio)
- Armin Ronacher's Thoughts and Writings
    - [I’m not feeling the async pressure](https://lucumr.pocoo.org/2020/1/1/async-pressure/)
    - [Playground Wisdom: Threads Beat Async/Await](https://lucumr.pocoo.org/2024/11/18/threads-beat-async-await/)
    - [From Async/Await to Virtual Threads](https://lucumr.pocoo.org/2025/7/26/virtual-threads/)

</div>
