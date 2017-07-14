# beforeunload

```
window.onbeforeunload = function() {
  return '真的要关闭么？别后悔！';
}
```

> 只有当事件处理函数返回一个字符串的时候，才会生效


# visibility

```
document.addEventListener("visibilitychange", function() {
  // dosomethings
}, false);
```

#### 相关属性

* document.hidden : 返回一个布尔值，表示当前是否被隐藏。
* document.visibilityState
  * visibile : 可见
  * hidden : 不可见
  * prerender : 正在渲染中，不可见


# fullscreenchange

```
document.addEventListener("fullscreenchange", function( event ) {
  if (document.fullscreenElement) {
    console.log('进入全屏');
  } else {
    console.log('退出全屏');
  }
}, false);
```

# fullscreenerror
