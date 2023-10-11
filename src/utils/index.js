import { isDevelopment } from '@/configs'
import { memoize } from '@nbfe/tools'

export * from './markdown'
export * from './route'
export * from './text'

export const getFetchPrefix = () => {
  if (isDevelopment) {
    const { protocol, hostname } = window.location
    return `${protocol}//${hostname}:3000/`
  }
  return 'https://raw.githubusercontent.com/shuoshubao/blog/master/'
}

const fetchMd = (url = '', options = {}) => {
  return fetch(getFetchPrefix() + url, options).then(res => res.text())
}

export const memoizeFetch = memoize(fetchMd)

const addStylesheet = (href = '') => {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.href = href
  document.head.appendChild(link)
}

const memoizedAddStylesheet = memoize(addStylesheet)

export const addKatexStylesheet = () => {
  memoizedAddStylesheet('https://registry.npmmirror.com/katex/0.16.8/files/dist/katex.min.css')
}
