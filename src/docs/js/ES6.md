# const let

* const
* let

# 解构赋值

* String
* Number
* Boolean
* Array
* 函数参数
* 对象

# Iterator

* for...of
* String、Array、array-like、Set、Map、WeakSet、WeakMap

# typeof

* number、string、boolean、undefined、function、object、`symbol`

# String

* for...of
* String.prototype.includes()
* String.prototype.startsWith()
* String.prototype.endsWith()
* String.prototype.repeat()
* String.raw()
* template string
* tagged template
* String.prototype.at()
* String.prototype.normalize()

# Number

* Number.isFinite()
* Number.isNaN()
* Number.parseInt()
* Number.parseFloat()
* Number.isInteger()
* Number.EPSILON
* Number.isSafeInteger()

# Array

* Array.from()
* Array.of()
* Array.prototype.copyWithin(target, start = 0, end = this.length)
* Array.prototype.find()
* Array.prototype.findIndex((value, index, arr) => {})
* Array.prototype.fill()
* Array.prototype.keys()
* Array.prototype.values()
* Array.prototype.entries()
* 数组的空位
* 数组推导

# Math

* Math.trunc()
* Math.sign()
* Math.cbrt()
* Math.clz32()
* Math.imul()
* Math.fround()
* Math.hypot()
* Math.expm1()
* Math.log1p()
* Math.log10()
* Math.log2()
* Math.sinh()
* Math.cosh()
* Math.tanh()
* Math.asinh()
* Math.acosh()
* Math.atanh()
* 指数运算符 (**)

# Function

* 参数默认值
* rest参数 (...变量名)
* 扩展运算符 (...)
* Function.prototype.name
* 箭头函数 (=>)
* 函数绑定 (::)
* 尾调用
* 尾递归
* 尾逗号

# Object

* obj[method].name
* Object.is()    // +0 != 0, NaN == NaN
* Object.assign()
* Object.getOwnPropertyDescriptor()
* Object.setPrototypeOf()
* Object.getPrototypeOf()
* Object.prototype.__proto__
* 扩展运算符(...)

# Set [WeakSet]

* new Set()
* new Set([]) // array or array-like

## property

* Set.prototype.size

## method

* Set.prototype.add(value)
* Set.prototype.delete(value)
* Set.prototype.has(value)
* Set.prototype.clear()

## Iterator

* Set.prototype.keys()
* Set.prototype.values()
* Set.prototype.entries()
* Set.prototype.forEach()

> Array.from(setInstance)  // Set -> Array
> ...   // Set -> flat to parameter in Function or menber in Array


# Map [WeakSet]

## property

* Map.prototype.size

## method

* Map.prototype.get(key)
* Map.prototype.set(key, value)
* Map.prototype.has(key)
* Map.prototype.delete(key)
* Map.prototype.clear()

## Iterator

* Set.prototype.keys()
* Set.prototype.values()
* Set.prototype.entries()
* Set.prototype.forEach()


# Referrence

> [http://es6.ruanyifeng.com/](http://es6.ruanyifeng.com/)
>
> [http://kangax.github.io/compat-table/es5/](http://kangax.github.io/compat-table/es5/)
>
> [http://kangax.github.io/compat-table/es6/](http://kangax.github.io/compat-table/es6/)
