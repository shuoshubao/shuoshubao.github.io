import { map } from 'lodash-es'

export const NavData = [
  {
    label: 'Home',
    value: 'index'
  },
  {
    label: 'JS',
    value: 'js'
  },
  {
    label: 'Node',
    value: 'node'
  },
  {
    label: 'HTML',
    value: 'html'
  },
  {
    label: 'CSS',
    value: 'css'
  },
  {
    label: 'Tool',
    value: 'tool'
  },
  {
    label: 'Assemble',
    value: 'assemble'
  }
]

export const getHashs = () => {
  return window.location.hash.slice(1).split('/').filter(Boolean)
}

export const getPageType = () => {
  const hashs = getHashs()
  const [category, articleName] = hashs
  if (hashs.length === 0) {
    return 'index'
  }
  if (!map(NavData.slice(1), 'value').includes(category)) {
    return '404'
  }
  if (hashs.length === 1) {
    return 'list'
  }
  if (hashs.length === 2) {
    return 'detail'
  }
  return '404'
}
