import { DefaultI18nLng, I18nKey, I18nOptions } from '@/configs'
import { Select } from 'antd'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default props => {
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
      popupMatchSelectWidth={100}
      placement="topLeft"
      {...props}
    />
  )
}
