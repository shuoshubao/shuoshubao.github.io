import { PlaygroundStore, createIframe } from '@/utils/playground'
import { EyeInvisibleOutlined, EyeOutlined, PlayCircleOutlined, SettingOutlined } from '@ant-design/icons'
import { Form } from '@nbfe/components'
import { isEmptyString, isUniq, sleep } from '@nbfe/tools'
import { useGetState } from 'ahooks'
import { Button, ConfigProvider, Layout, Modal, Radio, Space, theme } from 'antd'
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
const { defaultAlgorithm, darkAlgorithm, useToken } = theme

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
  const formRef = useRef()

  const [PlaygroundId] = useState(uuidv4())
  const [collapsed, setCollapsed] = useState(JSON.parse(window.sessionStorage.getItem(CollapsedKey)) || false)
  const [siderWidth, setSiderWidth] = useState(JSON.parse(window.sessionStorage.getItem(SiderWidthKey)) || 500)
  const [editor, setEditor] = useState(null)
  const [language, setLanguage, getLanguage] = useGetState(LanguagesEnum[0].value)

  const { token } = useToken()

  const columns = [
    {
      label: 'CSS',
      name: 'cssAssets',
      tooltip: '额外的 CSS 资源',
      rules: [
        {
          validator(rule, value) {
            if (value.some(v => isEmptyString(v))) {
              console.log(111)
              console.log(value)
              return Promise.reject(new Error('不能有空数据'))
            }
            if (!isUniq(value)) {
              return Promise.reject(new Error('不能有重复项'))
            }
            if (value.length > 5) {
              return Promise.reject(new Error('至多 5 项'))
            }
            return Promise.resolve()
          }
        }
      ],
      formListConfig: {
        record: '',
        rules: [
          (label, index, name) => {
            console.log(name)
            return {
              required: true,
              message: '不得为空'
            }
          }
        ]
      },
      template: {
        tpl: 'input'
      }
    },
    {
      label: '城市',
      name: 'cities',
      tooltip: '和其他内置组件一样的写法',
      rules: [
        {
          validator(rule, value) {
            if (value.length < 2) {
              return Promise.reject(new Error('至少 2 项'))
            }
            if (value.length > 5) {
              return Promise.reject(new Error('至多 5 项'))
            }
            return Promise.resolve()
          }
        }
      ]
    }
  ]

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

  const handleSubmit = async () => {
    const values = await formRef.current.getFieldsValue()
    console.log(999)
    console.log(values)
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
        algorithm: darkAlgorithm
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
            <Button icon={<SettingOutlined />} />
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
          <Content
            ref={iframeRef}
            className={styles['iframe-container']}
            style={{ padding: token.paddingContentVertical }}
          />
        </Layout>
      </Layout>
      <Modal title="设置" open={true} onOk={handleSubmit}>
        <Form
          ref={formRef}
          columns={columns}
          // initialValues={initialValues}
          onFinish={handleSubmit}
        />
      </Modal>
    </ConfigProvider>
  )
}
