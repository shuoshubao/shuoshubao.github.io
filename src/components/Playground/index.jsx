import {
  DefaultTheme,
  ThemeEventEmitter,
  ThemeKey,
  ThemeKeyEnum,
  addListenerPrefersColorScheme,
  isDark
} from '@/configs'
import Icons from '@/configs/Icons'
import { dynamicRegisterLanguage } from '@/utils/highlight'
import { getHighlightCode } from '@/utils/markdown'
import { PlaygroundStore, createIframe } from '@/utils/playground'
import { CopyOutlined, FullscreenOutlined } from '@ant-design/icons'
import { useAsyncEffect } from 'ahooks'
import { Button, ConfigProvider, Radio, Result, Space, Spin, Tag, Tooltip, message, theme } from 'antd'
import classnames from 'classnames'
import copy from 'copy-to-clipboard'
import { isUndefined } from 'lodash-es'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IconCode, IconCodeExpand } from './config'
import styles from './index.module.less'

const { defaultAlgorithm, darkAlgorithm } = theme

const defaultThemeValue = window.localStorage.getItem(ThemeKey) || DefaultTheme

const App = ({ id }) => {
  const { t } = useTranslation()

  const demoRef = useRef(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [time, setTime] = useState(0)
  const [showCode, setShowCode] = useState(false)
  const [files, setFiles] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [sourceCode, setSourceCode] = useState('')

  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    const receiveMessage = e => {
      if (e.data?.type !== 'playground') {
        return
      }
      const { id: playgroundId, eventName, initializedTime } = e.data
      if (playgroundId === id) {
        if (eventName === 'initialized') {
          setTime(initializedTime)
          setLoading(false)
        }
        if (eventName === 'error') {
          setError(e.data.error)
          setTime(initializedTime)
          setLoading(false)
        }
      }
    }

    window.addEventListener('message', receiveMessage, false)

    return () => {
      window.removeEventListener('message', receiveMessage, false)
    }
  }, [])

  useEffect(() => {
    const { html, css, js } = PlaygroundStore.get(id)
    const list = []
    if (js) {
      list.push({
        value: 'js',
        label: 'js',
        content: js,
        icon: Icons.JavaScript
      })
    }
    if (css.text) {
      list.push({
        value: css.type,
        label: css.type,
        content: css.text,
        icon: Icons.Css
      })
    }
    if (html) {
      list.push({
        value: 'html',
        label: 'html',
        content: html,
        icon: Icons.Html
      })
    }
    setFiles(list)
  }, [])

  useEffect(() => {
    const iframe = createIframe(id)
    demoRef.current.appendChild(iframe)
  }, [id])

  useAsyncEffect(async () => {
    if (!showCode) {
      return
    }
    const { value, content } = files[selectedIndex]
    const { default: hljs } = await import('highlight.js/lib/core')
    await dynamicRegisterLanguage(hljs, value)
    const code = await getHighlightCode(content, value)
    setSourceCode(code)
  }, [showCode, selectedIndex])

  const { token } = theme.useToken()

  const { colorBorderSecondary } = token

  // eslint-disable-next-line no-nested-ternary
  const timeTagColor = time < 500 ? 'success' : time < 1000 ? 'warning' : 'error'

  return (
    <div
      className={classnames('playground-container', styles['playground-container'], {
        [styles['playground-container-open']]: showCode
      })}
      style={{ borderColor: colorBorderSecondary }}
    >
      <Spin spinning={loading} tip="Loading...">
        <div
          className={styles['playground-container-demo']}
          ref={demoRef}
          style={{ display: error ? 'none' : 'block' }}
        />
      </Spin>
      {!loading && error && (
        <Result status="error" title={error.name}>
          <pre style={{ margin: 0 }}>{error.message}</pre>
        </Result>
      )}
      <div className={styles['playground-container-meta']}>
        <div className={styles['playground-container-actions']} style={{ borderColor: colorBorderSecondary }}>
          <div className={styles['playground-container-files']}>
            <Radio.Group
              value={selectedIndex}
              onChange={e => {
                setSelectedIndex(e.target.value)
              }}
            >
              {files.map((v, i) => {
                const { label, icon } = v
                return (
                  <Radio.Button key={i} value={i}>
                    {icon}
                    {label}
                  </Radio.Button>
                )
              })}
            </Radio.Group>
          </div>
          <Space>
            {!!time && (
              <Tag color={timeTagColor} style={{ marginRight: 0, marginBottom: 5 }}>
                {[time, 'ms'].join(' ')}
              </Tag>
            )}
            <Tooltip title={t('fullscreen')}>
              <Button
                type="text"
                icon={<FullscreenOutlined />}
                onClick={() => {
                  demoRef.current.requestFullscreen()
                }}
              />
            </Tooltip>
            {showCode && (
              <Tooltip title="复制代码">
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  onClick={() => {
                    copy(files[selectedIndex].content)
                    messageApi.success(t('copied'))
                  }}
                />
              </Tooltip>
            )}
            <Tooltip title={showCode ? t('collapse_code') : t('expand_code')}>
              <Button
                type="text"
                icon={showCode ? <IconCodeExpand /> : <IconCode />}
                onClick={() => {
                  setShowCode(!showCode)
                }}
              />
            </Tooltip>
          </Space>
        </div>
        <div className={styles['playground-container-source-code']} style={{ borderColor: colorBorderSecondary }}>
          <div dangerouslySetInnerHTML={{ __html: sourceCode }} />
        </div>
      </div>
      {contextHolder}
    </div>
  )
}

export default ({ id }) => {
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
    ThemeEventEmitter.on(ThemeKey, handleThemeChange)

    return () => {}
  }, [setThemeValue, setDark])

  if (isUndefined(dark)) {
    return null
  }
  return (
    <ConfigProvider
      theme={{
        algorithm: dark ? darkAlgorithm : defaultAlgorithm
      }}
    >
      <App id={id} key={dark} />
    </ConfigProvider>
  )
}
