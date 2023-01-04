import React from 'react'
import { HomeOutlined, ToolOutlined, BulbOutlined } from '@ant-design/icons'
import { map } from 'lodash-es'

export * from './markdown'

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

const IconFontSize = 16

export const NavData = [
  {
    label: 'Home',
    value: 'index',
    icon: <HomeOutlined style={{ fontSize: IconFontSize }} />
  },
  {
    label: 'JS',
    value: 'js',
    icon: (
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={IconFontSize}
        height={IconFontSize}
      >
        <path d="M512 968.96a68.266667 68.266667 0 0 1-20.48-2.944L232.106667 891.733333a74.794667 74.794667 0 0 1-53.76-63.573333L101.546667 136.106667a74.752 74.752 0 0 1 74.282666-82.773334h672.853334a74.24 74.24 0 0 1 55.466666 24.746667 75.861333 75.861333 0 0 1 18.773334 58.069333l-76.8 692.053334a74.794667 74.794667 0 0 1-53.76 63.573333l-259.413334 74.197333a73.856 73.856 0 0 1-20.949333 2.986667zM175.829333 117.333333a10.922667 10.922667 0 0 0-8.106666 3.413334 10.154667 10.154667 0 0 0-2.56 8.106666l76.8 692.053334a9.984 9.984 0 0 0 7.68 8.96l259.413333 74.24a14.122667 14.122667 0 0 0 5.973333 0l259.413334-74.24a10.410667 10.410667 0 0 0 7.68-8.96l76.8-692.053334a10.88 10.88 0 0 0-2.304-7.722666l-0.256-0.384a10.922667 10.922667 0 0 0-8.106667-3.413334z" />
        <path d="M444.16 712.96l-133.12-38.4a32 32 0 0 1 17.92-61.44l92.16 26.453333V299.093333a32 32 0 0 1 64 0v382.72a31.530667 31.530667 0 0 1-12.8 25.6 31.957333 31.957333 0 0 1-19.2 6.826667 32.469333 32.469333 0 0 1-8.96-1.28zM519.253333 690.346667a31.914667 31.914667 0 0 1 23.466667-38.826667l129.28-32.426667v-72.533333l-97.706667 14.08a31.36 31.36 0 0 1-25.6-7.68 32.64 32.64 0 0 1-11.093333-24.32V317.525333a31.744 31.744 0 0 1 27.306667-31.573333l134.4-19.2a32.085333 32.085333 0 0 1 8.96 63.573333l-107.093334 15.36v146.346667l97.706667-14.08a31.36 31.36 0 0 1 25.6 7.68 32.64 32.64 0 0 1 11.093333 24.32v134.4a32.298667 32.298667 0 0 1-24.32 31.146667l-153.6 38.4a37.546667 37.546667 0 0 1-7.253333 0.853333 32.298667 32.298667 0 0 1-31.146667-24.405333z" />
      </svg>
    )
  },
  {
    label: 'Node',
    value: 'node',
    icon: (
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={IconFontSize}
        height={IconFontSize}
      >
        <path
          d="M512 1016c-13.4 0-27-3.6-38.8-10.4l-123.4-73c-18.4-10.4-9.4-14-3.4-16 24.6-8.6 29.6-10.4 55.8-25.4 2.8-1.6 6.4-1 9.2 0.8l94.8 56.2c3.4 2 8.2 2 11.4 0l369.4-213.2c3.4-2 5.6-6 5.6-10V298.6c0-4.2-2.2-8-5.8-10.2L517.6 75.4c-3.4-2-8-2-11.4 0L137.2 288.6c-3.6 2-5.8 6-5.8 10.2v426.2c0 4 2.2 8 5.8 9.8l101.2 58.4c55 27.4 88.6-4.8 88.6-37.4V335c0-6 4.8-10.6 10.8-10.6h46.8c5.8 0 10.8 4.6 10.8 10.6V756c0 73.2-40 115.2-109.4 115.2-21.4 0-38.2 0-85-23.2l-96.8-55.8C80.2 778.4 65.4 752.6 65.4 724.8V298.6c0-27.6 14.8-53.6 38.8-67.4L473.2 18c23.4-13.2 54.4-13.2 77.6 0l369.4 213.4c24 13.8 38.8 39.6 38.8 67.4v426.2c0 27.6-14.8 53.4-38.8 67.4L550.8 1005.6c-11.8 6.8-25.2 10.4-38.8 10.4z m298.2-420.2c0-79.8-54-101-167.4-116-114.8-15.2-126.4-23-126.4-49.8 0-22.2 9.8-51.8 94.8-51.8 75.8 0 103.8 16.4 115.4 67.6 1 4.8 5.4 8.4 10.4 8.4h48c3 0 5.8-1.2 7.8-3.4s3-5.2 2.8-8.2c-7.4-88.2-66-129.2-184.4-129.2-105.4 0-168.2 44.4-168.2 119 0 80.8 62.6 103.2 163.6 113.2 121 11.8 130.4 29.6 130.4 53.4 0 41.2-33.2 58.8-111 58.8-97.8 0-119.2-24.6-126.4-73.2-0.8-5.2-5.2-9-10.6-9h-47.8c-6 0-10.6 4.8-10.6 10.6 0 62.2 33.8 136.4 195.6 136.4 116.8-0.2 184-46.4 184-126.8z"
          fill="currentColor"
        />
      </svg>
    )
  },
  {
    label: 'Tool',
    value: 'tool',
    icon: <ToolOutlined style={{ fontSize: IconFontSize }} />
  },
  {
    label: 'Assemble',
    value: 'assemble',
    icon: <BulbOutlined style={{ fontSize: IconFontSize }} />
  },
  {
    label: 'HTML',
    value: 'html',
    icon: (
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={IconFontSize}
        height={IconFontSize}
      >
        <path
          d="M128 64l69.8 791.6L511 960l315.2-104.4L896 64H128z m616.4 255.8H376.8l8.2 98.8h351.2l-27.2 296.8-195.8 54v0.6h-2.2l-197.4-54.6-12-151.6h95.4L404 640l107 29 107.4-29 12-124.4H296.6L271 224.4h482.2l-8.8 95.4z"
          fill="currentColor"
        />
      </svg>
    )
  },
  {
    label: 'CSS',
    value: 'css',
    icon: (
      <svg
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width={IconFontSize}
        height={IconFontSize}
      >
        <path
          d="M128 64l69.8 791.6L512 960l314.2-104.4L896 64H128z m626.2 160l-9.6 94.6L514 417.2l-0.6 0.2h223l-25.6 293.2-196.4 57.4-197.6-58.4-12.8-147.8h97.8l6.4 76.6 105.2 26.6 109.4-30.8 7.4-123.2-332.6-1v-0.2l-0.4 0.2-7.2-92.6L514.2 324l13-5.4H281.4L269.8 224h484.4z"
          fill="currentColor"
        />
      </svg>
    )
  }
]

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
