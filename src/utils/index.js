import { memoize } from '@nbfe/tools'

export * from './markdown'
export * from './route'

const isDevelopment = !!window.location.port

export const getFetchPrefix = () => {
  if (isDevelopment) {
    return 'http://localhost:3000/'
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
  memoizedAddStylesheet('https://unpkg.com/katex@0.16.4/dist/katex.min.css')
}
