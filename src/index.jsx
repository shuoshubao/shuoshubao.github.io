import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider, theme } from 'antd'
import {
  ThemeKey,
  ThemeKeyEnum,
  DefaultTheme,
  ThemeEventEmitter,
  isDark,
  addListenerPrefersColorScheme
} from '@/configs'
import App from './App'

const { defaultAlgorithm, darkAlgorithm } = theme

const Container = () => {
  const [themeValue, setThemeValue] = useState(window.localStorage.getItem(ThemeKey) || DefaultTheme)
  const [dark, setDark] = useState()

  const handleThemeChange = value => {
    setThemeValue(value)
    if (value !== ThemeKeyEnum.SYSTEM) {
      setDark(isDark(value))
    }
  }

  useEffect(() => {
    addListenerPrefersColorScheme(() => {
      setDark(isDark(themeValue))
    })
  }, [setDark])

  useEffect(() => {
    setDark(isDark(themeValue))
  }, [setDark])

  useEffect(() => {
    ThemeEventEmitter.on(ThemeKey, handleThemeChange)

    return () => {
      ThemeEventEmitter.off(ThemeKey, handleThemeChange)
    }
  }, [setThemeValue, setDark])

  return (
    <ConfigProvider
      theme={{
        algorithm: dark ? darkAlgorithm : defaultAlgorithm
      }}
    >
      <App />
    </ConfigProvider>
  )
}

createRoot(document.querySelector('#app')).render(<Container />)
