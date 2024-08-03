import { MonacoEditorBaseConfig, getMonacoEditor } from '@/utils/monaco'
import { PlaygroundStore, createIframe, formatCode } from '@/utils/playground'
import { EyeInvisibleOutlined, EyeOutlined, PlayCircleOutlined, SettingOutlined } from '@ant-design/icons'
import { Form } from '@nbfe/components'
import { Button, ConfigProvider, Layout, Modal, Space, Tabs, message, theme } from 'antd'
import { cloneDeep } from 'lodash'
import { Resizable } from 're-resizable'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { formColumns, getLanguagesEnum } from './config'
import styles from './index.module.less'

const { Header, Sider, Content } = Layout
const { defaultAlgorithm, useToken } = theme

const CollapsedKey = 'playground-collapsed'
const SiderWidthKey = 'playground-sider-width'

export default () => {
  const resizableRef = useRef()
  const iframeRef = useRef()
  const formRef = useRef()

  const JavascriptRef = useRef()
  const CssRef = useRef()
  const HtmlRef = useRef()

  const [messageApi, messageContextHolder] = message.useMessage()
  const [modal, modalContextHolder] = Modal.useModal()

  const [visibleSettting, setVisibleSettting] = useState(false)
  const [PlaygroundId] = useState(uuidv4())
  const [collapsed, setCollapsed] = useState(JSON.parse(window.sessionStorage.getItem(CollapsedKey)) || false)
  const [siderWidth, setSiderWidth] = useState(JSON.parse(window.sessionStorage.getItem(SiderWidthKey)) || 500)

  const LanguagesEnum = getLanguagesEnum({ JavascriptRef, CssRef, HtmlRef })

  const { token } = useToken()

  const handleExecute = () => {
    if (iframeRef.current.firstChild) {
      iframeRef.current.removeChild(iframeRef.current.firstChild)
    }

    const iframe = createIframe(PlaygroundId)

    iframeRef.current.appendChild(iframe)
  }

  const handleSubmit = () => {
    formRef.current
      .validateFields()
      .then(() => {
        setVisibleSettting(false)
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err)
        messageApi.open({
          type: 'error',
          content: 'Please check the form'
        })
      })
  }

  useEffect(async () => {
    const monaco = await getMonacoEditor()

    LanguagesEnum.forEach(item => {
      const { value, language, ref } = item

      PlaygroundStore.set(PlaygroundId, {
        html: '',
        css: '',
        cssAssets: [],
        js: '',
        jsAssets: []
      })

      const monacoEditor = monaco.editor.create(ref.current, {
        ...MonacoEditorBaseConfig,
        value: '',
        language
      })
      monacoEditor.getModel().onDidChangeContent(() => {
        const content = monacoEditor.getValue()
        const result = cloneDeep(PlaygroundStore.get(PlaygroundId))
        result[value] = content
        PlaygroundStore.set(PlaygroundId, result)
      })

      monacoEditor.onDidBlurEditorText(async () => {
        const content = monacoEditor.getValue()
        try {
          const code = await formatCode(content, value)
          monacoEditor.setValue(code)
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log(e)
          modal.error({
            title: `${language} 语法报错, 请检查`,
            width: 800,
            content: (
              <pre className={styles.code}>
                <code>{e.message}</code>
              </pre>
            )
          })
        }
      })
    })
  }, [])

  return (
    <ConfigProvider
      theme={{
        algorithm: defaultAlgorithm
      }}
    >
      <Layout className={styles.container}>
        <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingInline: token.paddingContentVertical,
            borderBottom: '1px solid rgb(48, 48, 48)'
          }}
        >
          <Space>
            <Button
              onClick={() => {
                const value = !collapsed
                setCollapsed(value)
                resizableRef.current.updateSize({
                  width: value ? 0 : siderWidth
                })
                window.sessionStorage.setItem(CollapsedKey, JSON.stringify(value))
              }}
              icon={collapsed ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            />
            <Button
              icon={<SettingOutlined />}
              onClick={() => {
                setVisibleSettting(true)
              }}
            />
          </Space>
          <Space>
            <Button type="primary" icon={<PlayCircleOutlined />} onClick={handleExecute}>
              运行
            </Button>
          </Space>
        </Header>
        <Layout hasSider>
          <Resizable
            ref={resizableRef}
            defaultSize={{ width: collapsed ? 0 : siderWidth }}
            maxWidth="80%"
            minWidth={collapsed ? 0 : 500}
            onResizeStop={(event, direction, refToElement, delta) => {
              const width = siderWidth + delta.width
              setSiderWidth(width)
              window.sessionStorage.setItem(SiderWidthKey, JSON.stringify(width))
            }}
            enable={{
              top: false,
              right: true,
              bottom: false,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false
            }}
          >
            <Sider theme="light" width="100%" collapsible collapsedWidth={0} collapsed={collapsed} trigger={null}>
              <div
                className={styles['sider-container']}
                style={{ height: 'calc(100vh - 64px)', padding: token.paddingContentVertical }}
              >
                <Tabs
                  type="card"
                  items={LanguagesEnum.map(item => {
                    return {
                      label: item.label,
                      key: item.language,
                      forceRender: true,
                      children: <div ref={item.ref} className={styles['monaco-editor-container']} />
                    }
                  })}
                  style={{ flex: 1 }}
                />
              </div>
            </Sider>
          </Resizable>
          <Content
            ref={iframeRef}
            className={styles['iframe-container']}
            style={{ padding: token.paddingContentVertical }}
          />
        </Layout>
      </Layout>
      <Modal
        title="设置"
        open={visibleSettting}
        onOk={handleSubmit}
        onCancel={() => {
          setVisibleSettting(false)
        }}
      >
        <Form ref={formRef} columns={formColumns} initialValues={{ cssAssets: [] }} onFinish={handleSubmit} />
      </Modal>
      {messageContextHolder}
      {modalContextHolder}
    </ConfigProvider>
  )
}
