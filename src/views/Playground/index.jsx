import { PlaygroundStore, createIframe } from '@/utils/playground'
import { EyeInvisibleOutlined, EyeOutlined, SendOutlined, SettingOutlined } from '@ant-design/icons'
import { sleep } from '@nbfe/tools'
import { useGetState } from 'ahooks'
import { Button, ConfigProvider, Layout, Radio, Space, theme } from 'antd'
import { cloneDeep } from 'lodash'
import 'monaco-editor/esm/vs/basic-languages/monaco.contribution'
import 'monaco-editor/esm/vs/editor/editor.all'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import 'monaco-editor/esm/vs/editor/standalone/browser/iPadShowKeyboard/iPadShowKeyboard'
import 'monaco-editor/esm/vs/editor/standalone/browser/inspectTokens/inspectTokens'
import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneCommandsQuickAccess'
import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoLineQuickAccess'
import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneGotoSymbolQuickAccess'
import 'monaco-editor/esm/vs/editor/standalone/browser/quickAccess/standaloneHelpQuickAccess'
import 'monaco-editor/esm/vs/editor/standalone/browser/referenceSearch/standaloneReferenceSearch'
import 'monaco-editor/esm/vs/language/css/monaco.contribution'
import 'monaco-editor/esm/vs/language/html/monaco.contribution'
import 'monaco-editor/esm/vs/language/typescript/monaco.contribution'
import { Resizable } from 're-resizable'
import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import styles from './index.module.less'

const { Header, Sider, Content } = Layout
const { defaultAlgorithm, useToken } = theme

const CollapsedKey = 'playground-collapsed'
const SiderWidthKey = 'playground-sider-width'

const LanguagesEnum = [
  {
    label: 'React',
    value: 'js',
    language: 'javascript'
  },
  {
    label: 'Less',
    value: 'css',
    language: 'less'
  },
  {
    label: 'HTML',
    value: 'html',
    language: 'html'
  }
]

export default () => {
  const resizableRef = useRef()
  const editorRef = useRef()
  const iframeRef = useRef()

  const [PlaygroundId] = useState(uuidv4())
  const [collapsed, setCollapsed] = useState(JSON.parse(window.sessionStorage.getItem(CollapsedKey)) || false)
  const [siderWidth, setSiderWidth] = useState(JSON.parse(window.sessionStorage.getItem(SiderWidthKey)) || 500)
  const [editor, setEditor] = useState(null)
  const [language, setLanguage, getLanguage] = useGetState(LanguagesEnum[0].value)

  const { token } = useToken()

  const handleChangeLanguage = value => {
    const result = PlaygroundStore.get(PlaygroundId)
    editor.getModel().setValue(result[value])
    monaco.editor.setModelLanguage(
      monaco.editor.getModels()[0],
      LanguagesEnum.find(item => item.value === value).language
    )
    setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run()
    }, 0)
    setLanguage(value)
  }

  const handleExecute = () => {
    if (iframeRef.current.firstChild) {
      iframeRef.current.removeChild(iframeRef.current.firstChild)
    }

    const iframe = createIframe(PlaygroundId)
    iframeRef.current.appendChild(iframe)
  }

  useEffect(() => {
    const monacoEditor = monaco.editor.create(editorRef.current, {
      value: '',
      language: LanguagesEnum[0].language,
      automaticLayout: true,
      theme: 'vs-dark',
      autoIndent: true,
      formatOnPaste: true,
      formatOnType: true,
      fontSize: 14
    })
    PlaygroundStore.set(PlaygroundId, {
      html: '',
      css: '',
      cssType: 'less',
      cssAssets: [],
      js: '',
      jsAssets: []
    })
    monacoEditor.getModel().onDidChangeContent(async () => {
      await sleep(0)
      const content = monacoEditor.getValue()
      const result = cloneDeep(PlaygroundStore.get(PlaygroundId))
      result[getLanguage()] = content
      PlaygroundStore.set(PlaygroundId, result)
    })
    setEditor(monacoEditor)
  }, [setEditor])

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
          </Space>
          <Space>
            <Button icon={<SettingOutlined />} />
            <Button type="primary" icon={<SendOutlined />} onClick={handleExecute}>
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
                <Radio.Group
                  value={language}
                  onChange={e => handleChangeLanguage(e.target.value)}
                  options={LanguagesEnum}
                  optionType="button"
                />
                <div ref={editorRef} className={styles['editor-container']} />
              </div>
            </Sider>
          </Resizable>
          <Content ref={iframeRef} className={styles['iframe-container']} />
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}
