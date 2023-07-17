import React from 'react'
import { Button, Card, Result, Typography } from 'antd'
import ErrorStackParser from 'error-stack-parser'

const { Paragraph, Text } = Typography

export default ({ error, resetErrorBoundary }) => {
  const title = [error.name, error.message].join(': ')

  const ErrorStackList = ErrorStackParser.parse(error)

  return (
    <Result
      status="error"
      title="Oops, Something went wrong"
      subTitle={
        <>
          <Paragraph>Please try to refresh the page.</Paragraph>
          <Paragraph>If this error still occurs, please try returning to the homepage.</Paragraph>
        </>
      }
      extra={
        <>
          <Button
            type="primary"
            onClick={() => {
              window.location.reload()
            }}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            onClick={() => {
              window.location.hash = ''
              setTimeout(() => {
                resetErrorBoundary()
              }, 0)
            }}
          >
            Back Home
          </Button>
        </>
      }
    >
      <Card title={<Text type="danger">{title}</Text>}>
        {ErrorStackList.map((v, i) => {
          const { columnNumber, lineNumber, fileName, functionName } = v
          return (
            <div key={i}>
              <Text type="danger">at </Text>
              <Text type="danger">{functionName} (</Text>
              <Text type="secondary">{[fileName, lineNumber, columnNumber].join(':')}</Text>
              <Text type="danger">)</Text>
            </div>
          )
        })}
      </Card>
    </Result>
  )
}
