import { isEqual, pick } from 'lodash-es'

export * from './markdown'
export * from './route'

const isDevelopment = !!window.location.port

export const getFetchPrefix = () => {
  if (isDevelopment) {
    return 'http://localhost:3000/'
  }
  return 'https://raw.githubusercontent.com/shuoshubao/blog/master/'
}

const CacheFetchList = []

export const memoizeFetch = (url = '', options = {}) => {
  const item = CacheFetchList.find(v => {
    return isEqual(pick(v, 'url', 'options'), { url, options })
  })
  if (item) {
    return item.request
  }
  const request = fetch(getFetchPrefix() + url, options).then(res => res.text())
  CacheFetchList.push({
    url,
    options,
    request
  })
  return request
}

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
