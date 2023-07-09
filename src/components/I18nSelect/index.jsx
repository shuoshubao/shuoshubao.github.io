import React, { useState } from 'react'
import { Select } from 'antd'
import { useTranslation } from 'react-i18next'
import { I18nKey, DefaultI18nLng, I18nOptions } from '@/configs'

export default () => {
  const [language, setLanguage] = useState(window.localStorage.getItem(I18nKey) || DefaultI18nLng)

  const { i18n } = useTranslation()

  return (
    <Select
      options={I18nOptions}
      value={language}
      onChange={value => {
        setLanguage(value)
        i18n.changeLanguage(value)
        window.localStorage.setItem(I18nKey, value)
      }}
      popupMatchSelectWidth={150}
      style={{ width: '100%' }}
      placement="topLeft"
    />
  )
}
