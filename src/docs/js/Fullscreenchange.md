> 注意：以下全屏属性和方法以及事件，都需要加上前缀~

# 方法

* requestFullscreen()
* exitFullscreen()

> document 和 element 部署了 requestFullscreen()
>
> document 部署了 requestFullscreen()

# 属性

* document.fullscreenElement 返回正处于全屏状态的Element节点,如果没有则返回null
* document.fullscreenEnableds 返回一个布尔值,表示当前文档是否可以切换到全屏状态


# 事件

* fullscreenchange

```
document.addEventListener("fullscreenchange", function( event ) {
  if (document.fullscreenElement) {
    console.log('进入全屏');
  } else {
    console.log('退出全屏');
  }
}, false);
```

> 浏览器进入或离开全屏时触发

* fullscreenerror

```
document.addEventListener("fullscreenerror", function( event ) {
  // dosomethings
}, false);
```

> 浏览器无法进入全屏时触发，可能是技术原因，也可能是用户拒绝


# 全屏状态的CSS

```css
:-webkit-full-screen {
  // properties
}
:full-screen {
  // properties
}
```
