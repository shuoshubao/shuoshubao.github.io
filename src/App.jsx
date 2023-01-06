import React, { useState, useEffect } from 'react'
import { Layout, Skeleton, Menu, Result, FloatButton, theme } from 'antd'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import '@/assets/styles/index.scss'
import Home from '@/views/Home'
import Category from '@/views/Category'
import Article from '@/views/Article'
import Algolia from '@/components/Algolia'
import { NavData, CollapsedKey } from '@/configs'
import { getFetchPrefix, isDark, getHashs, getPageType } from '@/utils'

const { Sider, Content } = Layout
const { BackTop } = FloatButton

const { useToken } = theme

const SiderWidth = 150

export default () => {
  const { token } = useToken()

  const [pageType, setPageType] = useState(getPageType())
  const [collapsed, setCollapsed] = useState(JSON.parse(window.localStorage.getItem(CollapsedKey) || 'false'))
  const [categoryData, setCategoryData] = useState({})
  const [selectedClassification, setSelectedClassification] = useState(getHashs()[0])

  const fetchData = async () => {
    const data = await fetch(`${getFetchPrefix()}store/db.json`).then(res => {
      return res.json()
    })
    Object.entries(data).forEach(([k, v]) => {
      v.forEach(v2 => {
        v2.category = k
      })
    })
    setCategoryData(data)
  }

  useEffect(() => {
    window.addEventListener('hashchange', () => {
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
        width={SiderWidth}
        theme="light"
        collapsible
        collapsedWidth={0}
        collapsed={collapsed}
        onCollapse={value => {
          setCollapsed(value)
          window.localStorage.setItem(CollapsedKey, JSON.stringify(value))
        }}
        style={{
          height: '100vh',
          borderRight: collapsed ? 'none' : `1px solid ${token.colorBorderSecondary}`
        }}
        zeroWidthTriggerStyle={{
          position: 'fixed',
          top: 'calc(50% - 22px)',
          width: 12,
          height: 44,
          fontSize: 12,
          insetInlineStart: collapsed ? 0 : SiderWidth - 12 / 2,
          border: `1px solid ${token.colorBorderSecondary}`,
          borderRadius: collapsed ? '0 6px 6px 0' : 6,
          overflow: 'hidden'
        }}
        trigger={collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
      >
        <div
          style={{
            position: 'fixed',
            width: collapsed ? 0 : SiderWidth - 1,
            left: 0,
            top: 0,
            bottom: 0,
            background: isDark() ? '#141414' : '#ffffff'
          }}
        >
          {!collapsed && (
            <>
              <Menu
                key={selectedClassification}
                defaultSelectedKeys={[selectedClassification]}
                items={NavData.map(v => {
                  const { label, value, icon } = v
                  return {
                    key: value,
                    label,
                    icon
                  }
                })}
                style={{ borderInlineEnd: 'none' }}
                onClick={({ key }) => {
                  if (key === 'index') {
                    window.location.hash = '#'
                    return
                  }
                  window.location.hash = key
                }}
              />
              <Algolia />
            </>
          )}
        </div>
      </Sider>
      <Content style={{ padding: token.paddingContentVertical, minHeight: '100vh', overflowY: 'auto' }}>
        <Skeleton loading={Object.keys(categoryData).length === 0}>
          {pageType === 'index' && <Home data={categoryData} />}
          {pageType === 'list' && <Category data={categoryData[selectedClassification]} />}
          {pageType === 'detail' && <Article data={categoryData} />}
          {pageType === '404' && (
            <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." />
          )}
        </Skeleton>
        <BackTop />
      </Content>
    </Layout>
  )
}
