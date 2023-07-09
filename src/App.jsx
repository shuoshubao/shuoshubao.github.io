import React, { lazy, Suspense, useState, useEffect } from 'react'
import { Layout, Skeleton, Menu, Result, Space, theme } from 'antd'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import 'antd/dist/reset.css'
import { useTranslation } from 'react-i18next'
import '@/assets/styles/index.scss'
import '@/assets/styles/markdown.scss'
import '@/assets/styles/markdown-container.scss'
import I18nSelect from '@/components/I18nSelect'
import ThemeSelect from '@/components/ThemeSelect'
import Algolia from '@/components/Algolia'
import { NavData, CollapsedKey } from '@/configs'
import { memoizeFetch, getHashs, getPageType } from '@/utils'

const Home = lazy(() => import('@/views/Home'))
const Category = lazy(() => import('@/views/Category'))
const Article = lazy(() => import('@/views/Article'))

const { Sider, Content } = Layout

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
          overflow: 'hidden',
          boxShadow: token.boxShadow
        }}
        trigger={collapsed ? <CaretRightOutlined /> : <CaretLeftOutlined />}
      >
        <div
          style={{
            position: 'fixed',
            width: collapsed ? 0 : SiderWidth - 1,
            left: 0,
            top: 0,
            bottom: 0
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
              <div style={{ position: 'absolute', bottom: 0, margin: 12, width: 150 - 12 * 2 }}>
                <Space direction="vertical" style={{ display: 'flex' }}>
                  <I18nSelect />
                  <ThemeSelect />
                  <Algolia />
                </Space>
              </div>
            </>
          )}
        </div>
      </Sider>
      <Content style={{ padding: token.paddingContentVertical, height: '100vh', overflowY: 'auto' }}>
        <Suspense fallback={<Skeleton active />}>
          <Skeleton loading={Object.keys(categoryData).length === 0}>
            {pageType === 'index' && <Home data={categoryData} />}
            {pageType === 'list' && <Category data={categoryData[selectedClassification]} />}
            {pageType === 'detail' && <Article key={pageHashs.join('/')} data={categoryData} />}
            {pageType === '404' && <Result status="404" title="404" subTitle={t('page_not_found')} />}
          </Skeleton>
        </Suspense>
      </Content>
    </Layout>
  )
}
