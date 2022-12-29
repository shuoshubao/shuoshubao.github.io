import React, { useRef, useState, useEffect } from 'react'
import { Layout, Skeleton, Menu, Result } from 'antd'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import '@/assets/styles/index.scss'
import Home from '@/views/Home'
import Category from '@/views/Category'
import Article from '@/views/Article'
import { NavData, getHashs, getPageType } from '@/utils'

const { Sider, Content } = Layout

export default () => {
  const [pageType, setPageType] = useState(getPageType())
  const [collapsed, setCollapsed] = useState(false)
  const [categoryData, setCategoryData] = useState({})
  const [selectedClassification, setSelectedClassification] = useState(getHashs()[0])

  const fetchData = async () => {
    const data = await fetch('https://raw.githubusercontent.com/shuoshubao/blog/master/data/db.json').then(res =>
      res.json()
    )
    setCategoryData(data)
  }

  useEffect(() => {
    window.addEventListener('hashchange', event => {
      setSelectedClassification(getHashs()[0])
      setPageType(getPageType())
    })
  }, [])

  useEffect(() => {
    fetchData()
  }, [setCategoryData])

  return (
    <Layout>
      <Sider
        theme="light"
        collapsible
        collapsedWidth={0}
        collapsed={collapsed}
        onCollapse={collapsed => {
          setCollapsed(collapsed)
        }}
        style={{ height: '100vh', borderRight: '1px solid #f5f5f5' }}
        zeroWidthTriggerStyle={{
          top: 'calc(50% - 22px)',
          width: 12,
          height: 44,
          fontSize: 12,
          insetInlineEnd: collapsed ? -12 : -6,
          border: '1px solid #f5f5f5',
          borderLeftWidth: collapsed ? 0 : 1,
          borderRadius: collapsed ? '0 6px 6px 0' : 6
        }}
        trigger={collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
      >
        <Menu
          key={selectedClassification}
          defaultSelectedKeys={[selectedClassification]}
          items={NavData.map(v => {
            const { label, value } = v
            return {
              key: value,
              label
            }
          })}
          onClick={({ key }) => {
            if (key === 'index') {
              window.location.hash = `#`
              return
            }
            window.location.hash = `#${key}`
          }}
        />
      </Sider>
      <Content style={{ padding: 12 }}>
        <Skeleton loading={Object.keys(categoryData).length === 0}>
          {pageType === 'index' && <Home data={categoryData} />}
          {pageType === 'list' && <Category data={categoryData[selectedClassification]} />}
          {pageType === 'detail' && <Article data={categoryData} />}
          {pageType === '404' && (
            <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." />
          )}
        </Skeleton>
      </Content>
    </Layout>
  )
}
