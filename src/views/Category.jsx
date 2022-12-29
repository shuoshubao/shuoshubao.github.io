import { Card, List, Space, Typography, Button } from 'antd'
import { map } from 'lodash-es'
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
      ></List>
    </Card>
  )
}
