# 日期格式化


## Date.prototype.toISOString

```javascript
var dt = new Date();
    dt.toISOString().slice(0, -5).replace(/[T]/g, ' ');
```

## RegExp

```javascript
var dt = new Date();
var date = [
  [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join('-'),
  [dt.getHours(), dt.getMinutes(), dt.getSeconds()].join(':')
].join(' ').replace(/(?=\b\d\b)/g, '0');
```

## Date

```javascript
function pad(s) {
  return ('0' + s).slice(-2);
}
var dt = new Date();
var date = dt.getFullYear() + '-' + pad(dt.getMonth() + 1) + '-' + pad(dt.getDate());
date += ' ';
date += pad(dt.getHours()) + ':' + pad(dt.getMinutes()) + ':' + pad(dt.getSeconds());
```

## 生成数组

```javascript
Array.from(Array(N), (v, i) => i)
```

```javascript
Array.apply(null, {length: N}).map(Function.call, Number)
```
