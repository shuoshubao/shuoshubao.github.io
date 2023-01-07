import React, { useState, useEffect } from 'react'
import { Modal, Result, Card, Tree, Button, Typography, Tag, Space, Tooltip, theme } from 'antd'
import { CodeOutlined, EyeOutlined, EyeInvisibleOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { map, find } from 'lodash-es'
import ms from 'ms'
import getTocData from 'mdx-toc'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/vs2015.css'
import { memoizeFetch, getHashs, MarkdownItHighlight, slugify } from '@/utils'

const { Text } = Typography
const { useToken } = theme

export default props => {
  const { token } = useToken()

  const { data } = props

  const [visibleToc, setVisibleToc] = useState(false)

  const [collapsed, setCollapsed] = useState(false)

  const [selectedKeys, setSelectedKeys] = useState([])
  const [expandedKeys, setExpandedKeys] = useState([])

  const [parserTime, setParserTime] = useState(null)

  const [content, setContent] = useState('')

  const [html, setHtml] = useState('')

  const [tocData, setTocData] = useState({
    list: [],
    markdown: '',
    html: '',
    treeData: []
  })

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [category, name] = getHashs()

  const AllArticles = data[category]

  if (!map(AllArticles, 'name').includes(name)) {
    return <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." />
  }

  const updateSelectedKeys = () => {
    document.querySelector(`[id="${window.location.hash.slice(1)}"]`)?.scrollIntoView()
    document.querySelector('.ant-tree-node-selected')?.scrollIntoView()
    setSelectedKeys([window.location.hash.slice(1)])
  }

  const fetchData = async () => {
    const md = await memoizeFetch(`article/${[category, name].join('/')}.md`).then(res => res.text())
    const timeStamp = Date.now()
    const htmlStr = MarkdownItHighlight.render(md)
    const TocData = getTocData(htmlStr, { type: 'html', slugify })
    const { list } = TocData
    setExpandedKeys(map(list, 'slug'))
    setHtml(htmlStr)
    setContent(md)
    setTocData(TocData)
    setVisibleToc(!!list.length)
    setParserTime(Date.now() - timeStamp)
    setTimeout(() => {
      updateSelectedKeys()
    }, 0)
  }

  useEffect(() => {
    fetchData()
  }, [setExpandedKeys, setHtml, setContent, setTocData, setVisibleToc, setParserTime, setSelectedKeys])

  useEffect(() => {
    window.addEventListener('hashchange', updateSelectedKeys)

    return () => {
      window.removeEventListener('hashchange', updateSelectedKeys)
    }
  }, [setSelectedKeys])

  const { title } = find(AllArticles, { name })

  const showCollapsed = tocData.treeData.some(v => v.children.length)

  return (
    <>
      <Card
        title={
          <Space>
            <Text>{title}</Text>
            {parserTime && <Tag color="success">{ms(parserTime, { long: true })}</Tag>}
          </Space>
        }
        extra={
          <Space>
            <Button
              icon={<CodeOutlined />}
              onClick={() => {
                setIsModalOpen(true)
              }}
            />
            <Tooltip title={visibleToc ? '隐藏大纲' : '显示大纲'}>
              <Button
                icon={visibleToc ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                onClick={() => {
                  setVisibleToc(!visibleToc)
                }}
              />
            </Tooltip>
          </Space>
        }
        loading={!content}
      >
        <div style={{ position: 'relative' }}>
          <div style={{ paddingRight: visibleToc ? 300 : 0 }}>
            <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
          <div
            style={{
              display: visibleToc ? 'block' : 'none',
              position: 'fixed',
              zIndex: 1,
              width: 300,
              right: token.paddingContentVertical,
              top: 50 + 10,
              paddingBottom: token.paddingContentVertical,
              maxHeight: 'calc(100vh - 50px - 10px - 12px)',
              overflow: 'auto',
              border: `1px solid ${token.colorBorderSecondary}`,
              boxShadow: token.boxShadow
            }}
          >
            <div
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                padding: '6px 10px 6px 28px',
                marginBottom: token.paddingContentVertical,
                background: token.colorBgBase
              }}
            >
              <Space>
                <Text strong style={{ lineHeight: '20px' }}>
                  大纲
                </Text>
                <Tooltip title="隐藏大纲">
                  <EyeInvisibleOutlined
                    onClick={() => {
                      setVisibleToc(false)
                    }}
                  />
                </Tooltip>
                {showCollapsed && (
                  <Tooltip title={collapsed ? '全部展开' : '全部折叠'}>
                    <UnorderedListOutlined
                      onClick={() => {
                        if (collapsed) {
                          setExpandedKeys(map(tocData.list, 'slug'))
                        } else {
                          setExpandedKeys([])
                        }
                        setCollapsed(!collapsed)
                      }}
                    />
                  </Tooltip>
                )}
              </Space>
            </div>
            <Tree
              treeData={tocData.treeData}
              selectedKeys={selectedKeys}
              expandedKeys={expandedKeys}
              onSelect={keys => {
                if (keys[0]) {
                  window.location.hash = keys[0]
                }
              }}
              onExpand={expandedKeysValue => {
                setExpandedKeys(expandedKeysValue)
              }}
            />
          </div>
        </div>
      </Card>
      <Modal
        title="Markdown 源码"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false)
        }}
        maskClosable
        width="90%"
        style={{ top: 20 }}
        bodyStyle={{
          maxHeight: 'calc(100vh - 110px)',
          overflowY: 'auto'
        }}
        footer={null}
      >
        <pre className="markdown-source" contentEditable="true">
          {content}
        </pre>
      </Modal>
    </>
  )
}
