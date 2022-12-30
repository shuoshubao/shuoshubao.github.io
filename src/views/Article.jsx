import { useState, useEffect } from 'react'
import { Modal, Result, Card, Button } from 'antd'
import { CodeOutlined } from '@ant-design/icons'
import { map, find } from 'lodash-es'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/vs2015.css'
import { getHashs, MarkdownItHighlight } from '@/utils'

export default props => {
  const { data } = props

  const [content, setContent] = useState('')

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

    setContent(md)
  }

  useEffect(() => {
    fetchData()
  }, [setContent])

  const { title } = find(AllArticles, { name })

  return (
    <>
      <Card
        title={title}
        extra={
          <Button
            icon={<CodeOutlined />}
            onClick={() => {
              setIsModalOpen(true)
            }}
          />
        }
        loading={!content}
      >
        <div className="markdown-body" dangerouslySetInnerHTML={{ __html: MarkdownItHighlight.render(content) }} />
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
        <pre className="markdown-source" contenteditable="true">
          {content}
        </pre>
      </Modal>
    </>
  )
}
