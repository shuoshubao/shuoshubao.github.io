# Buffer

## 已废弃

* new Buffer(size)
* new Buffer(string[, encoding])
* new Buffer(buffer)
* new Buffer(array)
* new Buffer(arrayBuffer[, byteOffset [, length]])

## new

* Buffer.alloc(size[, fill[, encoding]])
```
size <Integer>
fill <Integer> | <String> | <Buffer>; default: 0
encoding <String>; default: 'utf-8'
```
* Buffer.allocUnsafe(size)
* Buffer.allocUnsafeSlow(size)
* Buffer.byteLength(string[, encoding])
* Buffer.compare(buf1, buf2)