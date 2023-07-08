import React from 'react'
import { Space, Table, Typography } from 'antd'
import { formatTime } from '@nbfe/tools'
import { getHashs } from '@/utils'

const { Text, Link } = Typography

export default props => {
  const { data } = props
  const [category] = getHashs()

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      render(value, record) {
        const { name } = record
        const path = [category, name].join('/')
        return <Link href={`#${path}`}>{value}</Link>
      }
    },
    {
      title: '更新时间',
      dataIndex: 'mtime',
      render(value) {
        return formatTime(value, 'YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '创建时间',
      dataIndex: 'ctime',
      render(value) {
        return formatTime(value, 'YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '字数',
      dataIndex: 'size',
      render(value) {
        return value.toLocaleString()
      }
    }
  ]

  return (
    <Table
      rowKey="name"
      dataSource={data}
      columns={columns}
      title={() => {
        return (
          <Space>
            <Text strong>共</Text>
            <Text strong italic>
              {data.length}
            </Text>
            <Text strong>篇文章</Text>
          </Space>
        )
      }}
      pagination={false}
    />
  )
}
