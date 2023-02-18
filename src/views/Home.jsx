import React from 'react'
import { Card, Row, Col, List, Space, Typography, Button } from 'antd'
import { HomeOutlined, GithubOutlined } from '@ant-design/icons'
import { map } from 'lodash-es'
import { NavData } from '@/configs'
import Icons from '@/configs/Icons'

const { Text } = Typography

const ProjectList = [
  {
    title: '个人博客',
    homepage: 'http://shuoshubao.github.io',
    github: 'shuoshubao.github.io',
    npm: '',
    description: [
      '个人技术博客.',
      '基于 vite, antd 开发',
      '博客数据托管于另一个仓库 <a href="https://github.com/shuoshubao/blog" target="_blank">blog</a>'
    ]
  },
  {
    title: '通用组件库',
    homepage: 'https://shuoshubao.github.io/components',
    github: 'components',
    npm: '@nbfe/components',
    description: [
      '针对 B 端系统, 基于 antd 高度封装基础组件库, 覆盖业务开发中 90% 的场景.',
      '与 ProComponents 定位相同, 但实现思路和使用方法完全不同.'
    ]
  },
  {
    title: '工具库',
    homepage: 'https://github.com/shuoshubao/tools',
    github: 'nbfe',
    npm: '@nbfe/tools',
    description: ['基于 lodash 开发的通用工具库', '采用rollup打包', '拥有完善的使用文档和测试用例']
  },
  {
    title: '工程化',
    homepage: 'https://github.com/shuoshubao/nbfe/tree/master/packages/standard',
    github: 'nbfe',
    npm: '@nbfe/standard',
    description: [
      '集成: eslint, typescript-eslint, prettier, stylelint, husky, lint-staged, standard-version, commitlint',
      '完美打通 eslint prettier typescript react vue 技术栈'
    ]
  },
  {
    title: '前端工作台',
    homepage: '',
    github: 'magpie',
    npm: '',
    description: ['基于 Electron 开发的前端研发工作台, 集成前端开发日常所需要的功能. 参考 AppToolkit, AppWorks等']
  },
  {
    title: 'eslint-formatter-html',
    homepage: '',
    github: 'eslint-formatter-html',
    npm: 'eslint-formatter-html',
    description: [
      '一款可交互的 eslint 报告器',
      '<a href="https://shuoshubao.github.io/eslint-formatter-html" target="_blank">示例</a>',
      '<a href="https://shuoshubao.github.io/eslint-formatter-html/demo1" target="_blank">示例1</a>',
      '<a href="https://shuoshubao.github.io/eslint-formatter-html/demo2" target="_blank">示例2</a>',
      '<a href="https://shuoshubao.github.io/eslint-formatter-html/demo3" target="_blank">示例3</a>',
      '<a href="https://shuoshubao.github.io/eslint-formatter-html/demo4" target="_blank">示例4</a>',
      '<a href="https://shuoshubao.github.io/eslint-formatter-html/demo5" target="_blank">示例5</a>',
      '<a href="https://shuoshubao.github.io/eslint-formatter-html/demo6" target="_blank">示例6</a>',
      '<a href="https://shuoshubao.github.io/eslint-formatter-html/demo7" target="_blank">示例7</a>',
      '<a href="https://shuoshubao.github.io/eslint-formatter-html/demo8" target="_blank">示例8</a>'
    ]
  },
  {
    title: 'istanbul-reporter-html',
    homepage: '',
    github: 'istanbul-reporter-html',
    npm: 'istanbul-reporter-html',
    description: [
      'A beautiful html reporter for Istanbul',
      '<a href="https://shuoshubao.github.io/istanbul-reporter-html" target="_blank">示例</a>'
    ]
  },
  {
    title: 'jscpd-react-reporter',
    homepage: '',
    github: 'jscpd-react-reporter',
    npm: 'jscpd-react-reporter',
    description: [
      'A reporter wrote with React for jscpd',
      '<a href="https://shuoshubao.github.io/jscpd-react-reporter" target="_blank">示例</a>'
    ]
  },
  {
    title: 'webpack-analyzer',
    homepage: '',
    github: 'webpack-analyzer',
    npm: 'webpack-analyzer-plugin',
    description: [
      'webpack 打包产物分析器',
      '<a href="https://shuoshubao.github.io/webpack-analyzer" target="_blank">示例</a>'
    ]
  },
  {
    title: 'static-visualizer',
    homepage: '',
    github: 'static-visualizer',
    npm: 'static-visualizer',
    description: ['一个简单的静态服务器', '造轮子, 市面上使用较多的是 http-server, serve']
  },
  {
    title: 'rollup-plugin-analyze',
    homepage: '',
    github: 'rollup-plugin-analyze',
    npm: 'rollup-plugin-analyze',
    description: [
      'A visualizer rollup analyzer',
      '<a href="https://shuoshubao.github.io/rollup-plugin-analyze" target="_blank">示例1</a>',
      '<a href="https://shuoshubao.github.io/stats.html" target="_blank">示例2</a>'
    ]
  },
  {
    title: 'esbuild-analyzer',
    homepage: '',
    github: 'esbuild-analyzer',
    npm: 'esbuild-analyzer',
    description: [
      'A visualizer esbuild analyzer',
      '<a href="https://shuoshubao.github.io/esbuild-analyzer" target="_blank">示例1</a>',
      '<a href="https://shuoshubao.github.io/esbuild-analyzer/demo1" target="_blank">示例2</a>'
    ]
  },
  {
    title: 'markdown-toc',
    homepage: '',
    github: 'markdown-toc',
    npm: 'mdx-toc',
    description: ['Table of contents for markdown', '几行代码即可生成 markdown 大纲']
  }
]

export default props => {
  const { data } = props
  const AllArticles = map(NavData.slice(1), 'value')
    .map(v => data[v])
    .flat()
  return (
    <>
      <Card>
        <img src="https://ghchart.rshah.org/30a14e/shuoshubao" width="100%" />
      </Card>
      <Card title="作品集" size="small">
        <Row gutter={[12, 12]}>
          {ProjectList.map(v => {
            const { title, homepage, github, npm, description } = v
            const githubStarUrl = `https://img.shields.io/github/stars/shuoshubao/${github}.svg?style=social&label=Star`
            const githubUrl = `https://github.com/shuoshubao/${github}`
            const npmUrl = `https://www.npmjs.com/package/${npm}`
            const npmIconUrl = `https://img.shields.io/npm/dy/${npm}?style=flat-square`
            return (
              <Col xs={{ span: 24 }} sm={{ span: 12 }} key={title}>
                <Card
                  title={title}
                  extra={<img src={githubStarUrl} />}
                  bodyStyle={{ height: 124, maxHeight: 124, overflowY: 'auto', lineHeight: '20px' }}
                  actions={[
                    <Button type="link" href={githubUrl} target="_blank" icon={<GithubOutlined />} />,
                    homepage && <Button type="link" href={homepage} target="_blank" icon={<HomeOutlined />} />,
                    npm && <Button type="link" href={npmUrl} target="_blank" icon={Icons.Npm} />
                  ].filter(Boolean)}
                >
                  {!!npm && <img src={npmIconUrl} />}
                  {description.map((v2, i) => {
                    return <div key={i} dangerouslySetInnerHTML={{ __html: v2 }} />
                  })}
                </Card>
              </Col>
            )
          })}
        </Row>
      </Card>
      <Card
        title={
          <Space>
            <Text>共</Text>
            <Text italic>{AllArticles.length}</Text>
            <Text>篇文章</Text>
          </Space>
        }
      >
        <List
          dataSource={AllArticles}
          grid={{ column: 2, xs: 1, lg: 3, xl: 4, xxl: 5 }}
          renderItem={item => {
            const { category, name, title } = item
            const path = [category, name].join('/')
            return (
              <List.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Button type="link" href={`#${path}`}>
                  {title}
                </Button>
              </List.Item>
            )
          }}
        />
      </Card>
    </>
  )
}
