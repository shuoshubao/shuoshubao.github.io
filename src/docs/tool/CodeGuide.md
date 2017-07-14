# HTML

## 语法

* 使用4个空格代替缩进
* 嵌套的节点应该缩进
* 属性值用双引号
* 标签名全部小写
* 属性名全小写，分隔符为-
* 自定义属性全部 data-*
* boolean属性指不要声明属性值

## 基本结构

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Document</title>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
</head>
<body>
```

## 标签嵌套规范

* 内联元素不能嵌套块元素
* p, dt, h1 不能嵌套块元素
* 块元素与块元素平级、内联元素与内联元素平级

## 属性顺序(荐)

* id、class、name、data-*
* src、for、type、href、value、max-length、pattern
* placeholder、title、alt
* required、readonly、disabled

## 推荐

* 自闭合标签结尾不加/

# CSS

## 语法

* 使用4个空格代替缩进
* 每个属性声明独占一行
* 选择器嵌套不要超过3层
* 注释独占一行
* 分组选择器需换行
* 嵌套需换行
* 每个属性声明末尾都要加分号
* 全部双引号
* 复合属性尽量简写

> 常用复合属性: margin padding font background transition animation


## 空格

* 属性值前
* 选择器'>', '+', '~'前后
* '{'前
* !important '!'前
* 属性值中的','后
* 注释分隔符前后

## 命名

* 类名使用小写字母，以中划线分隔（参考Bootstrap）
* id采用驼峰式命名

## 顺序(荐)

* 可见性(display, visibilty, overflow)
* 浮动(float, clear)
* 定位(position, z-index, t-r-b-l)
* 盒模型(width, min-width, max-width, margin, padding, border, content)
* 字体(font, line-height)
* 颜色、背景色(color, background)
* 其他(transition, transform, outline, box-shadow)

## 推荐

* 不建议使用类选择器
* 样式里面不要出现id
* 尽量不用 important
* 尽量少用'*'选择器
* zIndex规范: 100, 101, ...
* 不要有空的规则
* 元素选择器小写
* 去掉小数点前面的0
* 属性值'0'后面不要加单位
* 标准属性写在厂商前缀属性后面
* 用 border: 0; 代替 border: none;


# JS

## 语法

* 使用4个空格代替缩进
* 一行一条语句
* 语句末尾加分号
* 函数参数之间的逗号后加空格
* 用'===', '!=='代替'==', '!='
* 同步模块的require import 都放在最前面
* 尽量改变className 而不是操作style
* 将要用于js操作的元素加className act驼峰(eg: actSubmit)
* 注释独占一行
* 注释采用DocBlockr风格

> Reference
[usejsdoc](http://usejsdoc.org/)
[JSDoc Guide](http://yuri4ever.github.io/jsdoc/)

```
// 单行注释

/**
 * 多行注释
 * 多行注释
 */
```

## 换行 空格

* 运算符与操作值之间加空格

```
// []
var a = [1, 2, 3];
// {}
var a = {
  a: 1,
  b: 2
};
// ()
var a = (1 + 2) * 3;
// function
function a() {

}
// 二元运算符
x++;
++x;
// 三目运算符
var x = a > b ? c : d;
// if else while catch finally switch case try catch
if(a > b) {

}else if(c > d) {

}else {

}
// for while
for(var i = 0; i < 1; i++) {

}
```

## 引号

> 最外层使用单引号, 内层使用双引号

## 变量命名

* 标准变量采用驼峰式命名
* 常量全大写, 用下划线连接
* 构造函数, 首字母大写
* jquery对象以'$'开头命名

## 变量声明

* 一个函数作用域中所有的变量声明尽量提到函数首部
* 一个var, 一个变量

## 数组、对象

* 对象的属性名不要加引号
* 对象多个属性需换行
* 对象不要尾逗号
* 数组不要写空位

## 推荐

* 每个js文件头部都应该有个注释(README)
* 每个js模块应该分配一个id(命名空间)
* 编辑器开启word wrap
* css状态名统一化: active, current, disabled, selected, checked (反义加un)
* 不要用关键字作为对象的属性名
* 不要给内置对象的原型添加属性或方法
* 使用 window.xxx 显式定义全局变量
* 变量声明和函数声明手动提升
* for-in里一定要有hasOwnProperty的判断
* 不要重复声明变量
* 不要使用with
* 不要使用eval
* 行尾不要有空白字符(编辑器设置)
