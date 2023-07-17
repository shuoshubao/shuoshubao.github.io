import React from 'react'
import { Table, Typography } from 'antd'
import { formatTime } from '@nbfe/tools'
import { useTranslation } from 'react-i18next'
import { getHashs } from '@/utils'

const { Text, Link } = Typography

export default props => {
  const { data } = props
  const [category] = getHashs()

  const { t } = useTranslation()

  const columns = [
    {
      title: t('columns.title'),
      dataIndex: 'title',
      render(value, record) {
        const { name } = record
        const path = [category, name].join('/')
        return <Link href={`#${path}`}>{value}</Link>
      }
    },
    {
      title: t('columns.mtime'),
      dataIndex: 'mtime',
      render(value) {
        return formatTime(value, 'YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: t('columns.ctime'),
      dataIndex: 'ctime',
      render(value) {
        return formatTime(value, 'YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: t('columns.words'),
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
        return <Text>{t('total_articles', { value: data.length })}</Text>
      }}
      pagination={false}
    />
  )
}
