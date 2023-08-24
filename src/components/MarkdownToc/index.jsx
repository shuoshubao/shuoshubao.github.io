import { TocCollapsedKey } from '@/configs'
import { getMarkdownTocData } from '@/utils'
import { CaretLeftOutlined, CaretRightOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Layout, Space, Tooltip, Tree, Typography, theme } from 'antd'
import { map } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const { Sider } = Layout
const { Text } = Typography
const { useToken } = theme

export default props => {
  const { data } = props

  const [collapsed, setCollapsed] = useState(JSON.parse(window.localStorage.getItem(TocCollapsedKey) || 'false'))

  const [list, setList] = useState([])
  const [treeData, setTreeData] = useState([])

  const [allExpanded, setAllExpanded] = useState(true)
  const [selectedKeys, setSelectedKeys] = useState([])
  const [expandedKeys, setExpandedKeys] = useState([])

  const { token } = useToken()

  const { t } = useTranslation()

  const updateSelectedKeys = () => {
    document.querySelector(`[id="${window.location.hash.slice(1)}"]`)?.scrollIntoView()
    document.querySelector('.ant-tree-node-selected')?.scrollIntoView()
    setSelectedKeys([window.location.hash.slice(1)])
  }

  useEffect(() => {
    const parseTocData = async () => {
      const tocData = await getMarkdownTocData(data)
      setTreeData(tocData.treeData)
      setList(tocData.list)
      setExpandedKeys(map(tocData.list, 'slug'))
    }
    parseTocData()
    setTimeout(() => {
      updateSelectedKeys()
    }, 500)
  }, [setTreeData, setList, setExpandedKeys])

  useEffect(() => {
    window.addEventListener('hashchange', updateSelectedKeys)

    return () => {
      window.removeEventListener('hashchange', updateSelectedKeys)
    }
  }, [setSelectedKeys])

  if (!list.length) {
    return null
  }

  return (
    <Sider
      theme="light"
      collapsible
      reverseArrow
      collapsedWidth={0}
      collapsed={collapsed}
      onCollapse={value => {
        setCollapsed(value)
        window.localStorage.setItem(TocCollapsedKey, JSON.stringify(value))
      }}
      width={300}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        marginLeft: 12,
        height: '100vh',
        overflowY: 'auto',
        borderRight: collapsed ? 'none' : `1px solid ${token.colorBorderSecondary}`
      }}
      zeroWidthTriggerStyle={{
        position: 'fixed',
        top: 'calc(50% - 22px)',
        insetInlineStart: 'auto',
        insetInlineEnd: collapsed ? 0 : 300 + 12 / 2,
        width: 12,
        height: 44,
        fontSize: 12,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: collapsed ? '6px 0 0 6px' : 6,
        overflow: 'hidden'
      }}
      trigger={collapsed ? <CaretLeftOutlined /> : <CaretRightOutlined />}
    >
      <div
        style={{
          padding: '6px 10px 6px 28px',
          marginBottom: token.paddingContentVertical,
          background: token.colorBgBase,
          borderBottom: `1px solid ${token.colorBorderSecondary}`
        }}
      >
        <Space>
          <Text strong style={{ lineHeight: '20px' }}>
            {t('toc')}
          </Text>
          <Tooltip title={allExpanded ? '全部折叠' : '全部展开'}>
            <UnorderedListOutlined
              onClick={() => {
                if (allExpanded) {
                  setExpandedKeys([])
                } else {
                  setExpandedKeys(map(list, 'slug'))
                }
                setAllExpanded(!allExpanded)
              }}
            />
          </Tooltip>
        </Space>
      </div>
      <Tree
        treeData={treeData}
        selectedKeys={selectedKeys}
        expandedKeys={expandedKeys}
        onSelect={keys => {
          if (keys[0]) {
            window.location.hash = keys[0]
          }
        }}
        onExpand={expandedKeysValue => {
          setExpandedKeys(expandedKeysValue)
        }}
      />
    </Sider>
  )
}
