import fs from 'fs'
import ejs from 'ejs'
import rimraf from 'rimraf'
import {minify} from 'html-minifier'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import {DATA_NAV, DATA_ARTICLE, DATA_META} from '../src/data'


const tempEjs = fs.readFileSync('src/template/deploy.ejs').toString()

rimraf.sync('view')
fs.mkdirSync('view')

const MarkdownItHighlight = MarkdownIt({
  highlight: (str, language) => {
    const lang = language || 'javascript'
    const {value} = hljs.highlight(lang, str)
    if (hljs.getLanguage(lang)) {
      try {
        return [
          `<pre class="hljs language-${lang}">`,
            `<table>`,
              `<tbody>`,
                value.trim().split(`\n`).map((v, i) => [
                  `<tr>`,
                    `<td data-line-number=${i + 1}></td>`,
                    `<td>${v}</td>`,
                  `</tr>`,
                ].join('')).join(''),
              `</tbody>`,
            `</table>`,
          `</pre>`
        ].join('')
      } catch (e) {
        throw e
      }
    }
    return ''
  }
})

const minifyOption = {
  collapseInlineTagWhitespace: true,
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  removeComments: true,
  removeEmptyAttributes: true,
  removeEmptyElements: false,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  removeTagWhitespace: false,
  sortAttributes: true,
  sortClassName: true,
  trimCustomFragments: true,
  useShortDoctype: true
}

const allDetail = Object.entries(DATA_ARTICLE).reduce((prev, cur) => {
  prev.push(...cur[1].map(v => `${cur[0]}/${v.name}`))
  return prev
}, [])

// mkdir promise
const promiseMkdir = path => new Promise((resolve, reject) => fs.mkdir(path, err => err ? reject() : resolve()))

const promiseDoc = path => new Promise((resolve, reject) => {
  fs.readFile(path, (err, data) => {
    if(err) {
      reject()
    }else {
      resolve(data.toString())
    }
  })
})



Promise.all([
  ...DATA_NAV.map(v => promiseMkdir(`view/${v.categories}`)),
  ...allDetail.map(v => promiseDoc(`src/docs/${v}.md`))
])
.then(([...data]) => {
  const docContent = data.slice(DATA_NAV.length)
  allDetail.map((v, i) => {
    const [categories, name] = v.split('/')
    let content = ejs.render(tempEjs, {
      DATA_NAV,
      DATA_ARTICLE,
      DATA_META,
      title: v.title || v.text,
      type: 'detail',
      categories,
      path: name,
      content: categories == 'assemble' ? docContent[i] : MarkdownItHighlight.render(docContent[i])
    })
    fs.writeFileSync(`view/${v}.html`, minify(content, minifyOption))
  })
  DATA_NAV.map(v => {
    const {categories} = v
    let content = ejs.render(tempEjs, {
      DATA_NAV,
      DATA_ARTICLE,
      DATA_META,
      title: v.title || v.text,
      type: 'list',
      categories: categories,
      content: (() => {
        if(categories == 'index') {
          return allDetail.map(v => {
            const [categories, name] = v.split('/')
            const {title} = DATA_ARTICLE[categories].find(v => v.name == name)
            return `<li><a href="/view/${categories}/${name}.html">${title}</a></li>`
          }).join('')
        }else {
          return DATA_ARTICLE[categories].map(v => `<li><a href="/view/${categories}/${v.name}.html">${v.title}</a></li>`).join('')
        }
      })()
    })
    fs.writeFileSync(`view/${categories}/index.html`, minify(content, minifyOption))
  })
})
.then(() => {
  // console.log(11)
})
.catch(e => console.log(e))
