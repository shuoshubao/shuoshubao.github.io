export * from './markdown'
export * from './toc'
export * from './route'

const isDevelopment = !!window.location.port

export const getFetchPrefix = () => {
  if (isDevelopment) {
    return 'http://localhost:3000/'
  }
  return 'https://raw.githubusercontent.com/shuoshubao/blog/master/'
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
