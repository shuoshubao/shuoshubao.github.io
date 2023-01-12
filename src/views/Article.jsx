import React, { useState, useEffect } from 'react'
import { Modal, Result, Card, Button, Typography, Tag, Space, message } from 'antd'
import copy from 'copy-to-clipboard'
import { CodeOutlined } from '@ant-design/icons'
import { map, find } from 'lodash-es'
import ms from 'ms'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/vs2015.css'
import { memoizeFetch, getHashs, MarkdownItHighlight } from '@/utils'

const { Text } = Typography

export default props => {
  const { data } = props

  const [parserTime, setParserTime] = useState(null)

  const [content, setContent] = useState('')

  const [html, setHtml] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [messageApi, contextHolder] = message.useMessage()

  const [category, name] = getHashs()

  const AllArticles = data[category]

  if (!map(AllArticles, 'name').includes(name)) {
    return <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." />
  }

  const fetchData = async () => {
    const md = await memoizeFetch(`article/${[category, name].join('/')}.md`)
    const timeStamp = Date.now()
    const htmlStr = MarkdownItHighlight.render(md)
    setHtml(htmlStr)
    setContent(md)
    setParserTime(Date.now() - timeStamp)
  }

  useEffect(() => {
    fetchData()
  }, [setHtml, setContent, setParserTime])

  const handleCopy = e => {
    const { target } = e
    let targetNode
    if (target.classList.contains('anticon-copy')) {
      targetNode = target
    }
    if (target.closest('.markdown-body .anticon-copy')) {
      targetNode = target.closest('.markdown-body .anticon-copy')
    }
    if (targetNode) {
      const code = decodeURIComponent(targetNode.dataset.code)
      copy(code)
      messageApi.success('Copied')
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', handleCopy)

    return () => {
      document.body.removeEventListener('click', handleCopy)
    }
  }, [])

  const { title } = find(AllArticles, { name })

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
          </Space>
        }
        loading={!content}
      >
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />
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
      {contextHolder}
    </>
  )
}
