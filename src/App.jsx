import '@/assets/styles/index.scss'
import '@/assets/styles/markdown-container.scss'
import '@/assets/styles/markdown.scss'
import Algolia from '@/components/Algolia'
import ErrorBoundaryFallback from '@/components/ErrorBoundaryFallback'
import I18nSelect from '@/components/I18nSelect'
import ThemeSelect from '@/components/ThemeSelect'
import { CollapsedKey, NavData } from '@/configs'
import { getHashs, getPageType, memoizeFetch } from '@/utils'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import { Avatar, Layout, Menu, Result, Skeleton, Space, Typography, theme } from 'antd'
import 'antd/dist/reset.css'
import React, { Suspense, lazy, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useTranslation } from 'react-i18next'

const Home = lazy(() => import('@/views/Home'))
const Category = lazy(() => import('@/views/Category'))
const Article = lazy(() => import('@/views/Article'))
const Playground = lazy(() => import('@/views/Playground'))

const { Text } = Typography
const { Header, Sider, Content } = Layout

const { useToken } = theme

const SiderWidth = 150

export default () => {
  const [pageType, setPageType] = useState(getPageType())
  const [pageHashs, setPageHashs] = useState(getHashs())
  const [collapsed, setCollapsed] = useState(JSON.parse(window.localStorage.getItem(CollapsedKey) || 'false'))
  const [categoryData, setCategoryData] = useState({})
  const [selectedClassification, setSelectedClassification] = useState(getHashs()[0])

  const { t } = useTranslation()
  const { token } = useToken()

  const fetchData = async () => {
    const text = await memoizeFetch('store/data.json')
    const data = JSON.parse(text)
    Object.entries(data).forEach(([k, v]) => {
      v.forEach(v2 => {
        v2.category = k
      })
    })
    setCategoryData(data)
  }

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setPageHashs(getHashs())
      setSelectedClassification(getHashs()[0])
      setPageType(getPageType())
    })
  }, [setSelectedClassification, setPageType])

  useEffect(() => {
    fetchData()
  }, [setCategoryData])

  if (pageType === 'playground') {
    return <Playground />
  }

  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: `0 ${token.paddingLG}px`,
          background: token.colorBgContainer,
          boxShadow:
            '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
          zIndex: 1
        }}
      >
        <Space>
          <Space style={{ width: SiderWidth - token.paddingLG }}>
            <Avatar src="https://vitejs.dev/logo.svg" />
            <Text strong>Blog</Text>
          </Space>
          <Algolia />
        </Space>
        <Space>
          <I18nSelect />
          <ThemeSelect />
        </Space>
      </Header>
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
            overflow: 'hidden',
            boxShadow: token.boxShadow
          }}
          trigger={collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
        >
          <div
            style={{
              width: collapsed ? 0 : SiderWidth - 1
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
                <div
                  style={{ position: 'fixed', bottom: 0, margin: 12, width: 150 - 12 * 2 }}
                  className="site-layout-sider-actions"
                >
                  <Space direction="vertical" style={{ display: 'flex' }}>
                    <I18nSelect size="default" style={{ width: '100%' }} />
                    <ThemeSelect size="default" style={{ width: '100%' }} />
                    <Algolia />
                  </Space>
                </div>
              </>
            )}
          </div>
        </Sider>
        <Content style={{ padding: token.paddingContentVertical, height: '100vh', overflowY: 'auto' }}>
          <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
            <Suspense fallback={<Skeleton active />}>
              <Skeleton loading={Object.keys(categoryData).length === 0}>
                {pageType === 'index' && <Home data={categoryData} />}
                {pageType === 'list' && <Category data={categoryData[selectedClassification]} />}
                {pageType === 'detail' && <Article key={pageHashs.join('/')} data={categoryData} />}
                {pageType === '404' && <Result status="404" title="404" subTitle={t('page_not_found')} />}
              </Skeleton>
            </Suspense>
          </ErrorBoundary>
        </Content>
      </Layout>
    </Layout>
  )
}
