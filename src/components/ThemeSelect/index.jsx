import React, { useState } from 'react'
import { Select, Space, Typography } from 'antd'
import { ThemeKey, DefaultTheme, ThemeOptions, ThemeEventEmitter } from '@/configs'

const { Text } = Typography

const options = ThemeOptions.map(v => {
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

export default () => {
  const [theme, setTheme] = useState(window.localStorage.getItem(ThemeKey) || DefaultTheme)

  const handleChange = value => {
    ThemeEventEmitter.emit(ThemeKey, value)
    setTheme(value)
    window.localStorage.setItem(ThemeKey, value)
  }

  return <Select value={theme} onChange={handleChange} options={options} style={{ width: '100%' }} />
}
