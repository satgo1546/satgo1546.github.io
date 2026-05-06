---
title: 慢报：Python 3.15新增内置类sentinel
date: 2026-05-04
dates: 2026-05-03 ~ 2026-05-06
excerpt: "为了统一这些用法，并方便后两者（美观输出、类型检查）实现，嫌builtins里的东西还不够多的Python往全局加了个sentinel类。<br>xkcd #927……"
tags:
- 闲聊
- Python
---

[PEP 661](https://peps.python.org/pep-0661/)给Python 3.15增加了[一个名为sentinel的内置类](https://docs.python.org/3.15/library/functions.html#sentinel)，其主要特性类似TypeScript的Symbol（不是Symbol.for 😾）：通过`x = sentinel('x')`语法定义的变量具有[unique symbol类型](https://www.typescriptlang.org/docs/handbook/symbols.html#unique-symbol)，该类型仅包含当次生成的那一个对象`x`。

JavaScript引入Symbol的目的是在保持兼容性的前提下允许对象属性名不为字符串。Python没有JavaScript的历史包袱，引入sentinel的目的不是解锁新的可能性，而是统一函数不便用`None`作为参数默认值时选择的其他默认值。

比如说，假设需要用Python实现`dict.pop(self, key, default=?)`方法。这是个常见的需求：第三方Python容器库要想兼容标准库接口，就必须这么做。

```py
class MyDict[K, V]:
    def pop[R](self, key: K, default: R = ?) -> V | R:
        ...
```

键不存在的场合，如果调用时提供了`default`参数，则dict.pop方法返回该值，否则抛出KeyError错误。因为`pop(key)`和`pop(key, None)`的语义并不相同，所以方法签名的`?`处不能填`None`。正确方法是创建一个无法被其他模块拿到的对象`missing`作为参数默认值，不管是什么对象都可以，然后通过`if default is missing:`检查参数是否已给出。

在sentinel出现之前，人们有各种办法创建无法被其他模块拿到的对象。[collections.abc.MutableMapping用的是最简单的`object()`](https://github.com/python/cpython/blob/v3.14.4/Lib/_collections_abc.py#L929)：

```py
class MutableMapping(Mapping):
    __marker = object()

    def pop(self, key, default=__marker):
        try:
            value = self[key]
        except KeyError:
            if default is self.__marker:
                raise
            return default
        else:
            del self[key]
            return value
```

[sortedcontainers为了输出得更好看，专门定义了个类](https://github.com/grantjenks/python-sortedcontainers/blob/master/src/sortedcontainers/sorteddict.py#L360)：

```py
class SortedDict(dict):
    class _NotGiven:
        def __repr__(self):
            return '<not-given>'

    __not_given = _NotGiven()

    def pop(self, key, default=__not_given):
        if key in self:
            self._list_remove(key)
            return dict.pop(self, key)
        else:
            if default is self.__not_given:
                raise KeyError(key)
            return default
```

[bidict更进一步](https://github.com/jab/bidict/blob/v0.23.1/bidict/_bidict.py#L126)，定义了个[无意义单选项枚举](https://github.com/jab/bidict/blob/v0.23.1/bidict/_typing.py#L38)，以辅助类型标注：

```py
class MissingT(Enum):
    MISSING = 'MISSING'

MISSING: t.Final[t.Literal[MissingT.MISSING]] = MissingT.MISSING
```

```py
from ._typing import MISSING

class MutableBidict(BidictBase[KT, VT], MutableBidirectionalMapping[KT, VT]):
    @t.overload
    def pop(self, key: KT, /) -> VT: ...
    @t.overload
    def pop(self, key: KT, default: DT = ..., /) -> VT | DT: ...

    def pop(self, key: KT, default: ODT[DT] = MISSING, /) -> VT | DT:
        try:
            return self._pop(key)
        except KeyError:
            if default is MISSING:
                raise
            return default
```

为了统一这些用法，并方便后两者（美观输出、类型检查）实现，嫌builtins里的东西还不够多的Python往全局加了个sentinel类。

[xkcd #927](https://xkcd.com/927/ "xkcd: Standards")……
