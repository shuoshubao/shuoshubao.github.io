import React, { useState, useEffect } from 'react'
import { Layout, Typography, Space, Tooltip, Tree, theme } from 'antd'
import { CaretLeftOutlined, CaretRightOutlined, UnorderedListOutlined } from '@ant-design/icons'
import getTocData from 'mdx-toc'
import { map } from 'lodash-es'
import { TocCollapsedKey } from '@/configs'
import { memoizeFetch, getHashs, slugify } from '@/utils'

const { Sider } = Layout
const { Text } = Typography
const { useToken } = theme

export default () => {
  const [collapsed, setCollapsed] = useState(JSON.parse(window.localStorage.getItem(TocCollapsedKey) || 'false'))

  const [list, setList] = useState([])
  const [treeData, setTreeData] = useState([])

  const [allExpanded, setAllExpanded] = useState(true)
  const [selectedKeys, setSelectedKeys] = useState([])
  const [expandedKeys, setExpandedKeys] = useState([])

  const { token } = useToken()

  const updateSelectedKeys = () => {
    document.querySelector(`[id="${window.location.hash.slice(1)}"]`)?.scrollIntoView()
    document.querySelector('.ant-tree-node-selected')?.scrollIntoView()
    setSelectedKeys([window.location.hash.slice(1)])
  }

  const fetchData = async () => {
    const md = await memoizeFetch(`article/${getHashs().join('/')}.md`)
    const tocData = getTocData(md, { slugify })
    setTreeData(tocData.treeData)
    setList(tocData.list)
    setExpandedKeys(map(tocData.list, 'slug'))
    setTimeout(() => {
      updateSelectedKeys()
    }, 0)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    window.addEventListener('hashchange', updateSelectedKeys)

    return () => {
      window.removeEventListener('hashchange', updateSelectedKeys)
    }
  }, [setSelectedKeys])

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
        height: '100vh',
        overflowY: 'auto',
        borderRight: collapsed ? 'none' : `1px solid ${token.colorBorderSecondary}`
      }}
      zeroWidthTriggerStyle={{
        position: 'fixed',
        top: 'calc(50% - 22px)',
        insetInlineStart: 'auto',
        insetInlineEnd: collapsed ? 0 : 300 - 12 / 2,
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
          position: 'sticky',
          top: 0,
          zIndex: 1,
          padding: '6px 10px 6px 28px',
          marginBottom: token.paddingContentVertical,
          background: token.colorBgBase,
          borderBottom: `1px solid ${token.colorBorderSecondary}`
        }}
      >
        <Space>
          <Text strong style={{ lineHeight: '20px' }}>
            大纲
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