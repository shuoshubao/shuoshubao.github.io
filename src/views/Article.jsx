import { useState, useEffect } from 'react'
import { Modal, Result, Card, Button } from 'antd'
import { CodeOutlined } from '@ant-design/icons'
import { map, find, isNull } from 'lodash-es'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import { getHashs } from '@/utils'

export default props => {
  const { data } = props

  const [content, setContent] = useState(null)

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
        loading={isNull(content)}
      >
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
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
        footer={null}
      >
        <pre>{content}</pre>
      </Modal>
    </>
  )
}