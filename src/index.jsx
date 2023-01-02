import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import { isDark, addListenerPrefersColorScheme } from '@/utils'
import App from './App'

const { defaultAlgorithm, darkAlgorithm } = theme

const Container = () => {
  const [dark, setDark] = useState(isDark())

  useEffect(() => {
    addListenerPrefersColorScheme(value => {
      setDark(value)
    })
  }, [setDark])

  return (
    <ConfigProvider
      componentSize="small"
      theme={{
        algorithm: dark ? darkAlgorithm : defaultAlgorithm
      }}
    >
      <App />
    </ConfigProvider>
  )
}

createRoot(document.querySelector('#app')).render(<Container />)
