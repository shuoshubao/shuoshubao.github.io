# 语法

```
var patt = new RegExp(pattern,modifiers);
var patt = /pattern/modifiers;
```

| 修饰符 | 描述 |
| --- | --- |
| i | 忽略大小写 |
| g | 全局匹配 |
| m | 多行匹配 |

| 方括号 | 描述 |
| --- | --- |
| [abc] | 任意一个括号内字符 |
| [^abc] | 任何一个不在括号内的字符 |
| [0-9] | 0-9的数字 |
| [a-z] | a-z |
| [A-Z] | A-Z |
| [A-z] | A-z |
| (red &#124; blue &#124; green) | 任何一项 |

| 元字符 | 描述 |
| --- | --- |
| * | 单个字符(除了换行符 结束符) |
| \w | 单词字符 |
| \W | 非单词字符 |
| \d | 数字 |
| \D | 非数字 |
| \s | 空白符 |
| \S | 非空白符 |
| \b | 单词边界 |
| \B | 非单词边界 |
| \0 | NULL |
| \n | 换行符 |
| \f | 换页符 |
| \r | 回车符 |
| \t | 制表符 |
| \v | 垂直制表符 |

| 量词 | 描述 |
| --- | --- |
| n+ | [1, +) |
| n* | [0, +) |
| n? | 0或1 |
| n{x} | x |
| n{x, y} | [x, y] |
| n{x,} | [x, +) |
| n$ | 以n结尾 |
| ^n | 以n开头 |
| ?=n | 其后紧接n |
| ?!n | 其后没紧接n |

| 原型 | 方法 |
| ----- | ----------- |
| RegExp.prototype | .test() <br> .exec() <br> .compile() |
| String.prototype | .replace() <br> .split() <br> .search() <br> .match() |