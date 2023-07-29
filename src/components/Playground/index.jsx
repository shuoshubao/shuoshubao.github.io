import { useEffect, useRef, useState } from 'react'
import { Button, Radio, Space, message, Tooltip } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { useAsyncEffect } from 'ahooks'
import classnames from 'classnames'
import copy from 'copy-to-clipboard'
import { PlaygroundStore, createIframe } from '@/utils/playground'
import { dynamicRegisterLanguage } from '@/utils/highlight'
import { getHighlightCode } from '@/utils/markdown'
import Icons from '@/configs/Icons'
import { IconCode, IconCodeExpand } from './config'
import styles from './index.module.less'

export default ({ id }) => {
  const demoRef = useRef(null)

  const [showCode, setShowCode] = useState(false)
  const [files, setFiles] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [sourceCode, setSourceCode] = useState('')

  const [messageApi, contextHolder] = message.useMessage()

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
  }, [])

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

  return (
    <div
      className={classnames('playround-container', styles['playround-container'], {
        [styles['playround-container-open']]: showCode
      })}
    >
      <div className={styles['playround-container-demo']} ref={demoRef} />
      <div className={styles['playround-container-meta']}>
        <div className={styles['playround-container-actions']}>
          <div className={styles['playround-container-files']}>
            <Radio.Group
              value={selectedIndex}
              onChange={e => {
                setSelectedIndex(e.target.value)
              }}
              size="small"
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
          <div className={styles['playround-container-btns']}>
            <Space>
              <Tooltip title="复制代码">
                <Button
                  icon={<CopyOutlined className={styles['playround-container-btncopy']} />}
                  onClick={() => {
                    copy(files[selectedIndex].content)
                    messageApi.success('Copied')
                  }}
                />
              </Tooltip>
              <Tooltip title={showCode ? '收起代码' : '展开代码'}>
                <Button
                  onClick={() => {
                    setShowCode(!showCode)
                  }}
                >
                  {showCode ? <IconCodeExpand /> : <IconCode />}
                </Button>
              </Tooltip>
            </Space>
          </div>
        </div>
        <div className={styles['playround-container-source-code']}>
          <div dangerouslySetInnerHTML={{ __html: sourceCode }} />
        </div>
      </div>
      {contextHolder}
    </div>
  )
}
