import React, { useRef, useState, useEffect } from 'react'
import { Modal, AutoComplete, Input, Tag, Col, Row, List, Empty } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { find, debounce, once } from 'lodash-es'
import HighlightText from '@/components/HighlightText'
import { memoizeFetch } from '@/utils'

const decodeText = arrary => {
  return new TextDecoder().decode(new Uint8Array(arrary))
}

export default () => {
  const autoCompleteRef = useRef()
  const autoCompleteContainerRef = useRef()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [AllData, setAllData] = useState({})

  const [options, setOptions] = useState([])

  const searchFunc = async query => {
    const text = await memoizeFetch('store/data.json')
    const ArticleData = JSON.parse(text)
    const list = []
    Object.entries(AllData).forEach(([k, content]) => {
      const [category, name] = atob(k).split('/')
      const { title } = find(ArticleData[category], { name })
      const ContentList = decodeText(content.toString().split(',')).split('\n')
      const filterContentList = [k, title, ...ContentList].filter(v2 => {
        return v2.toLowerCase().includes(query.toLowerCase())
      })
      if (!filterContentList.length) {
        return
      }
      list.push({
        value: k,
        label: (
          <Row>
            <Col
              span={6}
              style={{
                display: 'flex',
                alignContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              {title}
            </Col>
            <Col span={18}>
              <List
                dataSource={filterContentList}
                renderItem={item => {
                  return (
                    <List.Item style={{ padding: '5px 0' }}>
                      <div>
                        <HighlightText value={item.trim()} query={query} />
                      </div>
                    </List.Item>
                  )
                }}
              />
            </Col>
          </Row>
        )
      })
    })
    setOptions(list)
  }

  const debounceSearchFunc = debounce(searchFunc, 500)

  const handleSearch = q => {
    const query = q.trim()
    if (query.length <= 2) {
      setOptions([])
      return
    }
    debounceSearchFunc(query)
  }

  const handleSelect = value => {
    window.location.hash = value
    setIsModalOpen(false)
  }

  const fetchData = async () => {
    const data = await memoizeFetch('store/all.json')
    setAllData(JSON.parse(data))
  }

  const onceFetchData = once(fetchData)

  const keydownListener = e => {
    const { metaKey, key } = e
    if (metaKey && key === 'k') {
      if (!isModalOpen) {
        setTimeout(() => {
          autoCompleteRef?.current?.focus()
        }, 100)
      }
      setIsModalOpen(!isModalOpen)
      onceFetchData()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keydownListener)
    return () => {
      window.removeEventListener('keydown', keydownListener)
    }
  }, [isModalOpen, setIsModalOpen])

  return (
    <>
      <Input
        style={{ position: 'absolute', bottom: 0, padding: 5, margin: 12, width: 150 - 12 * 2 }}
        prefix={<SearchOutlined />}
        suffix={<Tag style={{ margin: 0 }}>⌘ K</Tag>}
        placeholder="Search"
        readOnly
        onClick={() => {
          setIsModalOpen(true)
          onceFetchData()
          setTimeout(() => {
            autoCompleteRef?.current?.focus()
          }, 100)
        }}
      />
      <Modal
        open={isModalOpen}
        width="90%"
        style={{ top: 12 }}
        className="algolia-modal"
        footer={null}
        onCancel={() => {
          setIsModalOpen(false)
        }}
        destroyOnClose
      >
        <AutoComplete
          ref={autoCompleteRef}
          options={options}
          onSearch={handleSearch}
          onSelect={handleSelect}
          autoFocus
          virtual={false}
          allowClear
          getPopupContainer={() => {
            return autoCompleteContainerRef?.current
          }}
          style={{ width: '100%' }}
          notFoundContent={<Empty />}
        >
          <Input size="large" prefix={<SearchOutlined />} />
        </AutoComplete>
        <div ref={autoCompleteContainerRef} className="algolia-container" />
      </Modal>
    </>
  )
}
