const fs = require('fs')
const crypto = require('crypto')

const article = require('./data/article')
const articleData = {}
const arrPromise = []


article.forEach((v, i) => {
  const strPath = [v.categories, v.name]
  arrPromise[i] = new Promise((resolve, reject) => {
    const fsHash = crypto.createHash('md5')
    const stream = fs.createReadStream(`./docs/${strPath.join('/')}.md`)
    stream.on('data', d => fsHash.update(d))
    stream.on('end', () => resolve(articleData[strPath.join()] = fsHash.digest('hex').slice(0, 5)))
  })
})

Promise.all(arrPromise).then(values => fs.writeFile('./data/md5.js', 'module.exports = ' + JSON.stringify(articleData, null, 2)))