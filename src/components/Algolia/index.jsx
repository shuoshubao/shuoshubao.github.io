import React, { useRef, useState, useEffect } from 'react'
import { Modal, AutoComplete, Input, Tag, Typography, Space, Divider, List, Empty } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { debounce } from 'lodash-es'
import { getFetchPrefix } from '@/utils'

const { Link, Text } = Typography

const HighlightText = ({ value, query }) => {
  const [left, ...right] = value.split(query)
  return (
    <>
      <Text>{left}</Text>
      <Text type="danger">{query}</Text>
      <Text>{right.join('')}</Text>
    </>
  )
}

export default () => {
  const autoCompleteRef = useRef()
  const autoCompleteContainerRef = useRef()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [AllData, setAllData] = useState({})

  const [options, setOptions] = useState([])

  const searchFunc = query => {
    const list = []
    Object.entries(AllData).forEach(([k, v]) => {
      const filters = v.filter(({ content }) => {
        return content.split('\n').some(v2 => v2.includes(query))
      })
      if (!filters.length) {
        return
      }
      list.push({
        value: k,
        label: (
          <Space>
            <Link href={`#${k}`}>{k}</Link>
            <Text type="secondary">{filters.length}</Text>
          </Space>
        ),
        options: filters.map(({ name, title, content }) => {
          const contentList = content.split('\n').filter(v2 => v2.includes(query))
          return {
            value: [k, name].join('/'),
            label: (
              <Space split={<Divider type="vertical" />}>
                <Text>{title}</Text>
                <List
                  dataSource={contentList}
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
              </Space>
            )
          }
        })
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
    const data = await fetch(`${getFetchPrefix()}store/all.json`).then(res => {
      return res.json()
    })
    setAllData(data)
  }

  useEffect(() => {
    fetchData()
  }, [setAllData])

  useEffect(() => {
    window.addEventListener('keydown', e => {
      const { metaKey, key } = e
      if (metaKey && key === 'k') {
        if (!isModalOpen) {
          setTimeout(() => {
            autoCompleteRef?.current?.focus()
          }, 100)
        }
        setIsModalOpen(!isModalOpen)
      }
    })
  }, [isModalOpen, setIsModalOpen])

  return (
    <>
      <Input
        style={{ padding: '5px 10px', margin: 10, width: 130 }}
        prefix={<SearchOutlined />}
        suffix={<Tag style={{ margin: 0 }}>⌘K</Tag>}
        placeholder="Search"
        readOnly
        onClick={() => {
          setIsModalOpen(true)
          setTimeout(() => {
            autoCompleteRef?.current?.focus()
          }, 100)
        }}
      />
      <Modal
        open={isModalOpen}
        width="90%"
        style={{ top: 12 }}
        closeIcon={' '}
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
