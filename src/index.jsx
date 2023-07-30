import {
  DefaultTheme,
  ThemeEventEmitter,
  ThemeKey,
  ThemeKeyEnum,
  addListenerPrefersColorScheme,
  initI18n,
  isDark,
  isDevelopment
} from '@/configs'
import { ConfigProvider, theme } from 'antd'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import VConsole from 'vconsole'
import App from './App'

const { defaultAlgorithm, darkAlgorithm } = theme

initI18n()

const defaultThemeValue = window.localStorage.getItem(ThemeKey) || DefaultTheme

let vConsole

if (isDevelopment && ['Android', 'iPhone', 'iPad'].includes(window.navigator.platform)) {
  // eslint-disable-next-line no-new
  vConsole = new VConsole({ theme: isDark(defaultThemeValue) ? 'dark' : 'light' })
}

const Container = () => {
  const [themeValue, setThemeValue] = useState(defaultThemeValue)
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
    vConsole?.setOption?.('theme', dark ? 'dark' : 'light')
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

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
