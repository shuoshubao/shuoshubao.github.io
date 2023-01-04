import React from 'react'
import { Card, List, Space, Typography, Button } from 'antd'
import { getHashs } from '@/utils'

const { Text } = Typography

export default props => {
  const { data } = props
  const [category] = getHashs()
  return (
    <Card
      title={
        <Space>
          <Text>共</Text>
          <Text italic>{data.length}</Text>
          <Text>篇文章</Text>
        </Space>
      }
    >
      <List
        dataSource={data}
        grid={{ column: 2, xs: 1, lg: 3, xl: 4, xxl: 5 }}
        renderItem={item => {
          const { name, title } = item
          const path = [category, name].join('/')
          return (
            <List.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
              <Button type="link" href={`#${path}`}>
                {title}
              </Button>
            </List.Item>
          )
        }}
      />
    </Card>
  )
}
