import React, {Component} from 'react'
import {render} from 'react-dom'
import classnames from 'classnames'
import {
  DATA_NAV,
  DATA_ARTICLE,
  DATA_META
} from '../data'
import '../polyfill'
import style from '../less/app.less'

let DATA_ARTICLE_HTML = Object.entries(DATA_ARTICLE).reduce((prev, cur) => {
  cur[1].forEach(v => {
    const temp = [cur[0], v.name]
    prev[temp.join(',')] = require(`../docs/${temp.join('/')}.md`)
  })
  return prev
}, {})

class App extends Component {
  static defaultProps = {
    sourceUrl: '/docs/'
  }
  constructor() {
    super()
    this.state = {
      navIndex: this.getIndex(),
      content: '',
      hash: this.getHash()
    }
  }
  getHash() {
    let hash = window.location.hash.substring(1).split('/')
    return [hash[0] || 'index', hash[1] || '']
  }
  getIndex() {
    let navIndex = 0
    let categories = this.getHash()[0]
    DATA_NAV.forEach((v, i) => {
      if(v.categories === categories) {
        navIndex = i
        return false
      }
    })
    return navIndex
  }
  openNav = () => {
    this.setState({
      openNav: !this.state.openNav
    })
  }
  renderList(categories) {
    let dataList = []
    if(categories === 'index') {
      Object.entries(DATA_ARTICLE).forEach(v => {
        v[1].forEach(v2 => {
          dataList.push({
            categories: v[0],
            title: v2.title,
            name: v2.name
          })
        })
      })
    }else {
      DATA_ARTICLE[categories].forEach(v => {
        dataList.push({
          categories,
          title: v.title,
          name: v.name
        })
      })
    }
    this.setState({
      navIndex: this.getIndex(),
      openNav: false,
      content: <ul className={style.list}>
        {
          dataList.map((v, i) => (
             <li key={i}>
               <a href={`/#${v.categories}/${v.name}`}>{v.title}</a>
             </li>
          ))
        }
      </ul>
    })
  }
  renderArticle(categories, article) {
    let articleId = [categories, article]
    let getConten = (content) => categories == 'assemble' ? <div className={style[`p-${article.toLowerCase()}`]} dangerouslySetInnerHTML={{__html: content}} /> : <div className={style.markdown}>
      <div dangerouslySetInnerHTML={{__html: content}} />
      <a target="_blank" href={`${this.props.sourceUrl}${articleId.join('/')}.md`}>源码</a>
    </div>
    this.setState({
      navIndex: this.getIndex(),
      openNav: false,
      content: getConten(DATA_ARTICLE_HTML[articleId.join(',')])
    })
  }
  renderView(hash) {
    this[hash[1] ? 'renderArticle' : 'renderList'](...hash)
  }
  winResize() {
    this.setState({
      openNav: false
    })
  }
  init() {
    this.renderView(this.getHash())
  }
  componentDidMount() {
    this.init()
    window.addEventListener('hashchange', this.init.bind(this), false)
    window.addEventListener('resize', this.winResize.bind(this), false)
  }
  render() {
    let {
      openNav,
      navIndex,
      content
    } = this.state
    return (
      <div>
        <nav className={style.nav}>
          <div className={style.inner}>
            <div className={style.wrap}>
              <a className={style.home} href="/#">
                <svg className={style.logo} aria-hidden="true" width="30" height="30" version="1.1" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
                <span className={style.name}>硕鼠宝</span>
              </a>
              <span className={classnames(style.navbar, {[style.active]: openNav})} onClick={this.openNav}>
                {
                  Array(4).fill(1).map((v, i) => <span key={i} className={style.bar}></span>)
                }
              </span>
              <ul style={{height: openNav ? (DATA_NAV.length * 40 + 20) : 0}}>
                {
                  DATA_NAV.map((v, i) => {
                    return <li key={i} className={classnames({[style.active]: navIndex === i})}>
                      <a href={`/#${DATA_NAV[i].categories}`}>{v.text}</a>
                    </li>
                  })
                }
              </ul>
              <a className={style.github} target="_blank" href={DATA_META.githubLink}>GitHub</a>
            </div>
          </div>
        </nav>
        {
          typeof content === 'string'
          ?
          <article className={style.content} ref="content" dangerouslySetInnerHTML={{__html: content}} />
          :
          <article className={style.content} ref="content">{content}</article>
        }
        <footer className={style.footer}>
          <div className={style.outer}>
            <div className={style.wrap}>
              <span>© 2014-{new Date().getFullYear()} Shuoshubao.com 版权所有 {DATA_META.registration}</span>
              <span> Powered by </span>
              <a target="_blank" href={DATA_META.githubLink}> GitHub </a>
              <a target="_blank" href="https://facebook.github.io/react/"> React </a>
            </div>
          </div>
        </footer>
      </div>
    )
  }
}
render(<App />, document.body.appendChild(document.createElement('div')))
