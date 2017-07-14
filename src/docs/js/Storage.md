# 分类

## sessionStorage、localStorage

## 方法

* getItem()
* setItem()
* removeItem()
* clear()

## 事件

```
window.addEventListener('storage', function(ev) {
    // key : 修改或删除的key值，如果调用clear(),key为null
    // newvalue : 新设置的值，如果调用removeStorage(),key为null
    // oldvalue : 调用改变前的value值
    // storageArea : 当前的storage对象
    // url : 触发该脚本变化的文档的url
}, false);
```
