import React, { useState, useEffect } from 'react'
import { Modal, Result, Card, Button, Typography, Space, Divider, Tag, Image, message } from 'antd'
import { CodeOutlined } from '@ant-design/icons'
import copy from 'copy-to-clipboard'
import dayjs from 'dayjs'
import { map, find } from 'lodash-es'
import filesize from 'filesize'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/vs2015.css'
import { memoizeFetch, getHashs, MarkdownItHighlight } from '@/utils'

const { Text } = Typography

const getFileSize = size => {
  return filesize(size || 0, { base: 2, standard: 'jedec' })
}

const formatTime = time => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

export default props => {
  const { data } = props

  const [content, setContent] = useState('')

  const [html, setHtml] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [messageApi, contextHolder] = message.useMessage()

  const [category, name] = getHashs()

  const [visible, setVisible] = useState(false)
  const [imageList, setImageList] = useState([])
  const [currentImgIndex, setCurrentImgIndex] = useState(0)

  const AllArticles = data[category]

  if (!map(AllArticles, 'name').includes(name)) {
    return <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." />
  }

  const fetchData = async () => {
    const md = await memoizeFetch(`article/${[category, name].join('/')}.md`)
    const htmlStr = MarkdownItHighlight.render(md)
    setHtml(htmlStr)
    setContent(md)
    setTimeout(() => {
      setImageList([...document.querySelectorAll('.markdown-body img')].map(v => v.src))
    }, 1)
  }

  useEffect(() => {
    fetchData()
  }, [setHtml, setContent])

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

  const handlePreviewImage = e => {
    const { tagName, src, parentNode } = e.target
    if (tagName === 'IMG') {
      if (parentNode.tagName === 'A') {
        return
      }
      const index = [...document.querySelectorAll('.markdown-body img')].map(v => v.src).indexOf(src)
      setCurrentImgIndex(index)
      setVisible(true)
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', handlePreviewImage)

    return () => {
      document.body.removeEventListener('click', handlePreviewImage)
    }
  }, [])

  const { title, size, ctime, mtime } = find(AllArticles, { name })

  return (
    <>
      <Card
        title={title}
        extra={
          <Space>
            <Text type="secondary" italic>
              {formatTime(mtime)}
            </Text>
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
        title={
          <Space split={<Divider type="vertical" />}>
            <Text>Markdown 源码</Text>
            <Text type="secondary" italic>
              {formatTime(ctime)}
            </Text>
            <Text type="secondary" italic>
              {formatTime(mtime)}
            </Text>
            <Tag color="cyan">{getFileSize(size)}</Tag>
          </Space>
        }
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
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{
            visible,
            current: currentImgIndex,
            onVisibleChange: vis => setVisible(vis)
          }}
        >
          {imageList.map(v => {
            return <Image key={v} src={v} />
          })}
        </Image.PreviewGroup>
      </div>
      {contextHolder}
    </>
  )
}
