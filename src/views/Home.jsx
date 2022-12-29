import { Card, List, Space, Typography, Button } from 'antd'
import { map } from 'lodash-es'
import { NavData } from '@/utils'

const { Text } = Typography

export default props => {
  const { loading, data } = props
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
        dataSource={map(NavData.slice(1), 'value')}
        renderItem={item => {
          return data[item].map(v => {
            const { name, title } = v
            const path = [item, name].join('/')
            return (
              <List.Item key={name} style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Button type="link" href={`#${path}`}>
                  {title}
                </Button>
              </List.Item>
            )
          })
        }}
      ></List>
    </Card>
  )
}
