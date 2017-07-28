import fs from 'fs'
import rimraf from 'rimraf'
import {DATA_NAV, DATA_ARTICLE} from '../src/data'

rimraf.sync('view')

fs.mkdirSync('view')

const pageList = Object.entries(DATA_ARTICLE).reduce((prev, cur) => {
  prev.push(...cur[1].map(v => `view/${cur[0]}/${v.name}.html`))
  prev.push(`view/${cur[0]}/index.html`)
  return prev
}, [])

DATA_NAV.forEach(v => fs.mkdirSync(`view/${v.categories}`))

const promiseMkdir = path => new Promise((resolve, reject) => {
  fs.mkdir(path, err => {
    if(err) {
      resolve()
    }else {
      reject()
    }
  })
})

Promise.all(
  DATA_NAV.map(v => promiseMkdir(`view/${v.categories}`))
)
.then(() => {
  pageList.forEach(v => {
    fs.writeFileSync(v, '')
  })
})




