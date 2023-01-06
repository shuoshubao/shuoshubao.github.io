import React from 'react'
import { Card, List, Space, Typography, Button } from 'antd'
import { map } from 'lodash-es'
import { NavData } from '@/configs'

const { Text } = Typography

export default props => {
  const { data } = props
  const AllArticles = map(NavData.slice(1), 'value')
    .map(v => data[v])
    .flat()
  return (
    <Card
      title={
        <Space>
          <Text>共</Text>
          <Text italic>{AllArticles.length}</Text>
          <Text>篇文章</Text>
        </Space>
      }
    >
      <List
        dataSource={AllArticles}
        grid={{ column: 2, xs: 1, lg: 3, xl: 4, xxl: 5 }}
        renderItem={item => {
          const { category, name, title } = item
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
