# 检测

> window.Notification

# 权限

> Notification.permission

* default
* denied
* granted

# 询问

> Notification.requestPermission(function(status) { // status: default、denied、granted })

# 实例

> new Notification(title, {})

```
属性
var n = new Notification(title, {
    body: '',
    icon: '',
    tag: '',
    lang: '',
    dir: '', // auto, ltr, rtl
});
事件
onshow
onclose
onerror
onclick
```

# Demo

```
if(window.Notification && Notification.permission !== "denied") {
  Notification.requestPermission(function(status) {    // 请求权限
    if(status === 'granted') {
      var n = new Notification('标题', {
        body : '我是主体',
        icon : 'https://assets-cdn.github.com/favicon.ico'
      });
    }
  });
}
```
