import React, { useState } from 'react'
import { Select, Space, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { ThemeKey, DefaultTheme, getThemeOptions, ThemeEventEmitter } from '@/configs'

const { Text } = Typography

export default props => {
  const [theme, setTheme] = useState(window.localStorage.getItem(ThemeKey) || DefaultTheme)

  const { t } = useTranslation()

  const options = getThemeOptions({ t }).map(v => {
    const { value, label, icon } = v
    return {
      value,
      label: (
        <Space>
          <Text>{icon}</Text>
          <Text>{label}</Text>
        </Space>
      )
    }
  })

  const handleChange = value => {
    ThemeEventEmitter.emit(ThemeKey, value)
    setTheme(value)
    window.localStorage.setItem(ThemeKey, value)
  }

  return <Select size="small" value={theme} onChange={handleChange} options={options} placement="topLeft" {...props} />
}
