import React from 'react'
import { Typography } from 'antd'

const { Text } = Typography

export default ({ value, query }) => {
  const [left, ...right] = value.split(query)
  return (
    <>
      <Text>{left}</Text>
      <Text type="danger">{query}</Text>
      <Text>{right.join('')}</Text>
    </>
  )
}
