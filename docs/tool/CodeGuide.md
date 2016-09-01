# HTML

## 语法

* 使用4个空格代替缩进
* 嵌套的节点应该缩进
* 属性值用双引号
* 属性名全小写，分隔符为-
* 自闭合标签结尾不加/
* style、script不要加type属性
* boolean属性指不要声明属性值

## 基本结构

```
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Document</title>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
</head>
<body>
```

## 属性顺序

* class、id、name、data-*
* src、for、type、href、value、max-length、pattern
* placeholder、title、alt
* required、readonly、disabled

# CSS

## 语法

* 使用4个空格代替缩进
* 文件最后保留一个空行
* 每个属性声明独占一行
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

## 顺序

* 可见性
* 浮动
* 定位
* 盒模型
* 字体
* 颜色、背景色
* 外边框

## 优化

* 选择器不要超过4层
* 尽量少用'*'选择器
* 不要有空的规则
* 元素选择器小写
* 去掉小数点前面的0
* 属性值'0'后面不要加单位
* 标准属性写在厂商前缀属性后面
* 用 border: 0; 代替 border: none;


# JS

## 语法

* 使用4个空格代替缩进
* 文件最后保留一个空行
* 编辑器开启word wrap
* 一行一条语句
* 语句末尾加分号
* 函数参数之间的逗号后加空格
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

## tips

* 用'===', '!=='代替'==', '!='
* 注意类型转换
* 不要用关键字作为对象的属性名
* 不要在内置对象的原型上添加属性或方法
* 使用 window.xxx 定义全局变量
* 变量声明和函数声明手动提升
* for-in里一定要有hasOwnProperty的判断
* 不要重复声明变量
* 不要在循环内部声明函数
* 行尾不要有空白字符(编辑器设置)
* 不要使用with
* 不要使用eval