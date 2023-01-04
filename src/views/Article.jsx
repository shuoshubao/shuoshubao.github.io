import React, { useState, useEffect } from 'react'
import { Modal, Result, Card, Tree, Button, Typography, Tag, Space, Tooltip, theme } from 'antd'
import { CodeOutlined, EyeOutlined, EyeInvisibleOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { map, find } from 'lodash-es'
import ms from 'ms'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/vs2015.css'
import { getHashs, MarkdownItHighlight, slugify, getTocData } from '@/utils'

const { Text } = Typography
const { useToken } = theme

export default props => {
  const { token } = useToken()

  const { data } = props

  const [visibleToc, setVisibleToc] = useState(true)

  const [collapsed, setCollapsed] = useState(false)

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

  const fetchData = async () => {
    const md = await fetch(
      `https://raw.githubusercontent.com/shuoshubao/blog/master/article/${[category, name].join('/')}.md`
    ).then(res => res.text())
    const timeStamp = Date.now()
    const htmlStr = MarkdownItHighlight.render(md)
    const TocData = getTocData({ content: htmlStr, type: 'html' })
    setExpandedKeys(
      TocData.list.map(v => {
        return slugify(v.title)
      })
    )
    setHtml(htmlStr)
    setContent(md)
    setTocData(TocData)
    setParserTime(Date.now() - timeStamp)
  }

  useEffect(() => {
    fetchData()
  }, [setContent])

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
            {!visibleToc && (
              <Tooltip title="显示大纲">
                <EyeOutlined
                  onClick={() => {
                    setVisibleToc(true)
                  }}
                />
              </Tooltip>
            )}
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
              right: 12,
              top: 50 + 10,
              paddingBottom: 12,
              maxHeight: 'calc(100vh - 50px - 10px - 12px)',
              overflow: 'auto',
              border: `1px solid ${token.colorBorderSecondary}`,
              background: token.colorBgBase,
              boxShadow: token.boxShadow
            }}
          >
            <div
              style={{
                padding: '6px 10px 6px 28px',
                position: 'sticky',
                top: 0,
                zIndex: 1,
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
                          setExpandedKeys(
                            tocData.list.map(v => {
                              return slugify(v.title)
                            })
                          )
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
              expandedKeys={expandedKeys}
              onSelect={selectedKeys => {
                if (selectedKeys[0]) {
                  window.location.hash = selectedKeys[0]
                }
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
