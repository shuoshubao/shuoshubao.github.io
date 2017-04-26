# Prettier.js

```
const fs = require('fs')
const glob = require('glob')
const chalk = require('chalk')
const prettier = require('prettier')

let files = glob.sync('src/**/*.js')

const prettierOptions = {
  useTabs: false,
  tabWidth: 2,
  printWidth: 80,
  singleQuote: true,
  semi: false,
  trailingComma: 'none',
  bracketSpacing: false,
  jsxBracketSameLine: false,
  parser: 'babylon',
}

const timeInfo = `prettier 共处理${files.length}个文件, 共耗时`
console.time(timeInfo)
const prettierFile = src => new Promise((resolve, reject) => {
  fs.readFile(src, (err, buffer) => {
    if (err) {
      reject(err)
    } else {
      const str = buffer.toString()
      try {
        const str2 = prettier.format(str, prettierOptions)
        fs.writeFileSync(src, str2)
        console.log(src)
        resolve(src)
      } catch (e) {
        reject([e, src])
      }
    }
  })
})

Promise
  .all(files.map(v => prettierFile(v)))
  .then(() => console.timeEnd(timeInfo))
  .catch(([e, src]) => {
    console.log(`${chalk.red('请检查文件: ')}${chalk.blue(src)}`)
    console.log(e)
  })
```

# Referrence

> https://www.npmjs.com/package/prettier