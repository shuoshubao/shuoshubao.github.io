/*
 * @Author: shuoshubao
 * @Date: 2024-04-07 10:14:39
 * @LastEditors: shuoshubao
 * @LastEditTime: 2024-06-17 20:04:56
 * @Description:
 */
import { isDevelopment } from '@/configs'
import { memoize } from '@nbfe/tools'
import confetti from 'canvas-confetti'
import { get } from 'lodash'

export * from './markdown'
export * from './route'
export * from './text'

const getFetchPrefix = async () => {
  if (isDevelopment) {
    const { protocol, hostname } = window.location
    return `${protocol}//${hostname}:3000`
  }
  const name = '@nbfe/blog'
  const data = await fetch(['https://registry.npmmirror.com', name].join('/')).then(res => res.json())
  const version = get(data, 'dist-tags.latest')
  return ['https://unpkg.com', [name, version].join('@')].join('/')
}

const memoizeFetchPrefix = memoize(getFetchPrefix)

const fetchMd = async (url = '', options = {}) => {
  const prefix = await memoizeFetchPrefix()
  return fetch([prefix, url].join('/'), options).then(res => res.text())
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

export const showConfetti = () => {
  confetti({
    particleCount: 200,
    spread: 200,
    origin: { y: 0.6 }
  })
}
