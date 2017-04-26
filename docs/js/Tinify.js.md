# Tinify.js

```
const fs = require('fs')
const glob = require('glob')
const chalk = require('chalk')
const tinify = require('tinify')

tinify.key = 'KckuU929qtv_nPK_czL6HKfcAJO9FCKm'

let files = [...glob.sync('img/**/*.png'), ...glob.sync('img/**/*.jpg')]

const timeInfo = `tinify 共处理${files.length}个文件, 共耗时`
console.time(timeInfo)
const tinifyImg = src => new Promise((resolve, reject) => {
  tinify.fromFile(src).toFile(src, err => {
    if(err) {
      reject(err)
    }else {
      console.log(`成功压缩 ${chalk.blue(src)}`)
      resolve();
    }
  })
})


Promise.all(files.map(v => tinifyImg(v)))
.then(() => console.timeEnd(timeInfo))
.catch(e => {
  console.log(e)
})
```

# Referrence

> https://www.npmjs.com/package/tinify
>
> https://tinypng.com/developers/reference/nodejs