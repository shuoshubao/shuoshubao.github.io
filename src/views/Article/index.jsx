import MarkdownToc from '@/components/MarkdownToc'
import Playground from '@/components/Playground'
import { updateMarkdownTheme } from '@/configs'
import { MarkdownItHighlight, addKatexStylesheet, getAllLanguages, getHashs, memoizeFetch, showConfetti } from '@/utils'
import { CodeOutlined } from '@ant-design/icons'
import { Button, Card, Divider, Image, Layout, Modal, Result, Space, Tag, Typography, message, theme } from 'antd'
import copy from 'copy-to-clipboard'
import dayjs from 'dayjs'
import filesize from 'filesize'
import 'highlight.js/styles/vs2015.css'
import { find, map } from 'lodash'
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { useTranslation } from 'react-i18next'

const { useToken } = theme
const { Text } = Typography
const { Content } = Layout

const getFileSize = size => {
  return filesize(size || 0, { base: 2, standard: 'jedec' })
}

const formatTime = time => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

export default props => {
  const { data } = props

  const [content, setContent] = useState('')

  const [markdownHtml, setMarkdownHtml] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [messageApi, contextHolder] = message.useMessage()

  const [category, name] = getHashs()

  const [visible, setVisible] = useState(false)
  const [imageList, setImageList] = useState([])
  const [currentImgIndex, setCurrentImgIndex] = useState(0)

  const { t } = useTranslation()

  const { token } = useToken()

  const AllArticles = data[category]

  const fetchData = async () => {
    const md = await memoizeFetch(`article/${[category, name].join('/')}.md`)
    showConfetti()
    const languages = await getAllLanguages(md)
    const MarkdownIt = await MarkdownItHighlight(languages)
    const htmlStr = MarkdownIt.render(md)
    setMarkdownHtml(htmlStr)
    setContent(md)
    setTimeout(() => {
      setImageList([...document.querySelectorAll('.markdown-body img')].map(v => v.src))
    }, 1)

    setTimeout(() => {
      const list = [...document.querySelectorAll('.playground-coordinate')]
      list.forEach(v => {
        const { id } = v.dataset

        const div = document.createElement('div')
        div.id = id

        v.insertAdjacentElement('afterend', div)

        createRoot(div).render(<Playground id={id} />)
      })
    }, 1e2)
  }

  const handleCopy = e => {
    const { target } = e
    let targetNode
    if (target.closest('.markdown-body .playground-container')) {
      return
    }
    if (target.classList.contains('anticon-copy')) {
      targetNode = target
    }
    if (target.closest('.markdown-body .anticon-copy')) {
      targetNode = target.closest('.markdown-body .anticon-copy')
    }
    if (targetNode) {
      const code = decodeURIComponent(targetNode.dataset.code)
      copy(code)
      messageApi.success(t('copied'))
    }
  }

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
    updateMarkdownTheme(token.colorPrimary === '#1668dc')
  }, [token.colorPrimary])

  useEffect(() => {
    addKatexStylesheet()
    fetchData()
  }, [setMarkdownHtml, setContent])

  useEffect(() => {
    document.body.addEventListener('click', handleCopy)

    return () => {
      document.body.removeEventListener('click', handleCopy)
    }
  }, [])

  useEffect(() => {
    document.body.addEventListener('click', handlePreviewImage)

    return () => {
      document.body.removeEventListener('click', handlePreviewImage)
    }
  }, [])

  if (!map(AllArticles, 'name').includes(name)) {
    return <Result status="404" title="404" subTitle={t('page_not_found')} />
  }

  const { title, size, ctime, mtime } = find(AllArticles, { name })

  return (
    <Layout>
      <Content>
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
          <div className="markdown-body" dangerouslySetInnerHTML={{ __html: markdownHtml }} />
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
      </Content>
      {!!content && <MarkdownToc data={content} />}
    </Layout>
  )
}
