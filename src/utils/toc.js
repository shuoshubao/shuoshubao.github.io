import MarkdownIt from 'markdown-it'
import { slugify } from './markdown'

const stringToFragment = string => {
  const renderer = document.createElement('template')
  renderer.innerHTML = string
  return renderer.content
}

const getHeaders = (content, type) => {
  const html = type === 'html' ? content : MarkdownIt().render(content)

  const fragment = stringToFragment(html.trim())

  return [...fragment.children]
    .filter(v => {
      return Array(6)
        .fill(0)
        .map((v2, i) => ['H', i + 1].join(''))
        .includes(v.tagName)
    })
    .map(v => {
      const { tagName, innerText } = v
      const level = Number(tagName.slice(1))
      return {
        level,
        title: innerText,
        slug: slugify(innerText)
      }
    })
}

export const getTocData = ({ content, type }) => {
  const headers = getHeaders(content, type)

  if (!headers.length) {
    return {
      list: [],
      markdown: '',
      html: '',
      treeData: []
    }
  }

  const headersMd = headers
    .map(v => {
      const { level, title } = v
      return ['  '.repeat(level), '*', title].join(' ')
    })
    .join('\n')

  const toc = MarkdownIt().render(headersMd).trim()

  const recursion = node => {
    const children = [...node.children]
    if (children.filter(v => v.nodeType === 1).length) {
      const title = node.firstChild.nodeValue.trim()
      return {
        title,
        key: slugify(title),
        children: (node.firstElementChild.tagName === 'UL' ? [...node.firstElementChild.children] : children).map(v => {
          return recursion(v)
        })
      }
    }
    const { innerText } = node
    return {
      title: innerText,
      key: slugify(innerText),
      children: []
    }
  }

  const fragment = stringToFragment(toc)

  return {
    list: headers,
    markdown: headersMd,
    html: toc,
    treeData: recursion(fragment.firstChild).children
  }
}
