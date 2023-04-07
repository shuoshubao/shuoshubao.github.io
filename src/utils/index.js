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

export const isDark = () => {
  const { matchMedia } = window
  return matchMedia('(prefers-color-scheme: dark)').matches
}

export const addListenerPrefersColorScheme = callback => {
  const { matchMedia } = window
  matchMedia('(prefers-color-scheme: dark)').addListener(mediaQueryList => {
    callback(mediaQueryList.matches)
  })
  matchMedia('(prefers-color-scheme: light)').addListener(mediaQueryList => {
    callback(!mediaQueryList.matches)
  })
}

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
