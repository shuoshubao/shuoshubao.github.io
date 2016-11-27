* 读取文件

```
fs.readFile(filename, [options], callback)
fs.readFileSync(filename, [options])
```

* 写入文件

```
* fs.writeFile(filename, data, [options], callback)
* fs.writeFile(filename, data, [options])
```

* 创建目录

```
* fs.mkdir(path, [mode], callback)
```

* 读取目录

```
* fs.readdir(path, (err, files) => {})
```

* 查看文件/目录信息

```
* fs.stat(path, (err, stats) => {})
```

* 检查文件/目录是否存在

```
* fs.exists(path, (exists) => {})
```

* 获取文件的绝对路径

```
* fs.realpath(path, (err, resolvedPath) => {})
```

* 修改文件时间

```
* fs.utimes(path, atime, mtime, callback)
```

* 修改文件/目录的读取权限

```
* fs.chmod(path, mode, callback)
```

* 修改文件/目录的读取权限

```
fs.chmod(path, mode, callback)
```

* 移动/重命名文件

```
fs.rename(oldPath, newPath, callback)
```

* 创建和删除硬连接

```
fs.link(srcPath, dstPath, callback)
```

* 截断文件

```
fs.truncate(filename, len, callback)
```

* 删除空目录

```
fs.rmdir(path, callback)
```

* 监视文件/目录

```
fs.watchFile(filename, [options], listener)
fs.unwatchFile(filename, [listener])
```