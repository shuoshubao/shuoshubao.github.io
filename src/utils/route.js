import { NavData } from '@/configs'
import { map } from 'lodash-es'

export const getHashs = () => {
  const hash = window.location.hash.slice(1)
  return hash.split('#')[0].split('/').filter(Boolean)
}

export const getPageType = () => {
  const hashs = getHashs()
  const [category] = hashs
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
