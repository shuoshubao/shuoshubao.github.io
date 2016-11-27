* 使用 ReadStream对象 读取文件

```
const file = fs.createReadStream(path, [options])

const file = fs.createReadStream('./testFile.txt')
file.on('open', (fd) => {})
file.on('data', (data) => {})
file.on('end', () => {})
file.on('error', (err) => {})
file.pause()
file.resume()
```

* 使用 WriteStream对象 写入文件

```
const writable = fs.createWriteStream(path, [options])

writable.write(chunk, [encoding], [callback])
writable.end([chunk], [encoding], [callback])
```