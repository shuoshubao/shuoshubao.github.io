# HTML

* \! 文档
* \# id
* \. class
* \[\] 属性
* \{\} 文本
* \> 子元素
* \+ 兄弟元素
* ^ 后退(类似jq的end)
* \(\) 分组
* $ 自增
* @ 起点(跟在$之后,后跟'-'表示降序)
* \* 批量

### 隐式标签 (Implicit TagNames)

* 块元素 → div
* 行间元素 → span
* ul, ol → li
* select, optgroup → option
* table, thead ,tbody, tfoot → tr
* tr → td

# CSS

* 单值/负值/多值/多命令

```
m100 → margin: 100px;
m-100 → margin: -100px;
m0-a → margin: 0 auto;
m1-2-3 → margin: 1px 2px 3px;
m1-2-3-4 → margin: 1px 2px 3px 4px;
w100+c#3 → width: 100px; color: #333;
```

* 缺省单位

```
m10 → margin: 10px;
m10em → margin: 10em;
```

* 单位别名

```
p → %
e → em
x → ex
```

```
w100p → width: 100%
m10p30e5x → margin: 10% 30em 5ex
```

* 色值

```
c → color: #000;
c# → color: #000;
c#1 → color: #111;
c#12 → color: #121212;
c#123 → color: #123;
c#1234 → color: #123412;
c#12345 → color: #123451;
c#123456 → color: #123456;
```

* 没有单位的属性

```
* z-index
* line-height
* opacity
* font-weight
```

* !important

```
! → !important
```

* 厂商前缀

```
w: webkit
m: moz
s: ms
o: o
```

```
-wm-bx-s
-webkit-box-shadow: inset hoff voff blur color;
-moz-box-shadow: inset hoff voff blur color;
box-shadow: inset hoff voff blur color;
```

* 渐变

```
lg()
background-image: -webkit-linear-gradient();
background-image: -o-linear-gradient();
background-image: linear-gradient();

lg(left, #123 30%, #456)
background-image: -webkit-linear-gradient(left, #123 30%, #456);
background-image: -o-linear-gradient(left, #123 30%, #456);
background-image: linear-gradient(to right, #123 30%, #456);
```


# Referrence

1. [http://emmet.io/](http://emmet.io/)
2. [http://docs.emmet.io/](http://docs.emmet.io/)
3. [https://github.com/emmetio/emmet/blob/master/lib/snippets.json](https://github.com/emmetio/emmet/blob/master/lib/snippets.json)