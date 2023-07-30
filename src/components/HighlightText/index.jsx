import { Typography } from 'antd'
import React from 'react'

const { Text } = Typography

export default ({ value, query }) => {
  const index = value.toLowerCase().indexOf(query.toLowerCase())
  const left = value.slice(0, index)
  const center = value.slice(index, index + query.length)
  const right = value.slice(index + query.length)
  return (
    <>
      <Text>{left}</Text>
      <Text type="danger">{center}</Text>
      <Text>{right}</Text>
    </>
  )
}
