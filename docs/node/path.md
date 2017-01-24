> const path = require('path')

* path.basename(path[, ext])
* path.delimiter
* path.sep
* path.dirname(path)
* path.extname(path)
* path.format(pathObject)
```
pathObject: {
    root,
    dir,
    base,
    name,
    ext
}
```
* path.isAbsolute(path)
* path.join([...paths])
* path.normalize(path)
* path.parse(path)
```
Returns: {
    root,
    dir,
    base,
    name,
    ext
}
```
* path.posix
* path.win32
* path.relative(from, to)
* path.resolve([...paths])