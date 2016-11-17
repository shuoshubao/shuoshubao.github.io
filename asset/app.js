import React, {Component} from 'react'
import {render} from 'react-dom'
import classnames from 'classnames'
import marked from 'marked'
import Prism from 'prismjs'
import DATA_META from '../data/meta'
import DATA_NAV from '../data/nav'
import DATA_ARTICLE from '../data/article'
import DATA_MD5 from '../data/md5'
import CSSModules from 'react-css-modules'
import styles from'../less/app.less'


class App extends Component {
  static defaultProps = {
    sourceUrl: 'https://ofuxezs94.qnssl.com/'
  }
  constructor(props) {
    super(props)
    this.state = {
      navIndex: this.getIndex(),
      isLoading: false,
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
    DATA_NAV.forEach((...arg) => {
      if(arg[0].categories === categories) {
        navIndex = arg[1]
        return false
      }
    })
    return navIndex
  }
  hideLoading() {
    document.querySelectorAll('pre code').forEach((v, i) => {
      Prism.highlightElement(v)
    })
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 200)
  }
  openNav() {
    this.setState({
      openNav: !this.state.openNav,
    })
  }
  renderList(categories) {
    let dataList = categories === 'index' ? DATA_ARTICLE : DATA_ARTICLE.filter((...arg) => arg[0].categories === categories)
    let list = dataList.map((...arg) => (
       <li key={arg[1]}>
         <a href={`/#${arg[0].categories}/${arg[0].name}`}>{arg[0].title}</a>
       </li>
    ))
    this.setState({
      content: <ul className={styles['m-list']}>{list}</ul>
    })
    this.hideLoading()
  }
  renderArticle(categories, article) {
    let articleId = [categories, article];
    if(!DATA_ARTICLE.filter((...arg) => arg[0].categories === categories).filter((...arg) => arg[0].name === article).length) {
      console.log('文章不存在')
      return false
    }
    let getConten = (content) => categories == 'assemble' ? <div dangerouslySetInnerHTML={{__html: marked(content)}} /> : <div className={styles['markdown']}>
      <a target="_blank" href={`${this.props.sourceUrl}${articleId.join('/')}.md`}>源码</a>
      <div dangerouslySetInnerHTML={{__html: marked(content)}} />
    </div>
    let content = localStorage.getItem(articleId.join())
    if(content && content.slice(0, 5) == DATA_MD5[articleId.join()].slice(0, 5)) {
      this.setState({
        content: getConten(content.slice(5))
      })
    }else {
      this.setState({
        isLoading: true
      })
      fetch(`${this.props.sourceUrl}${articleId.join('/')}.md`)
      .then(rs => rs.text())
      .then(rs => {
        localStorage.setItem(articleId.join(), DATA_MD5[articleId.join().slice(0, 5)] + rs)
        this.setState({
          content: getConten(rs)
        })
        this.hideLoading()
      })
    }
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
    this.setState({
      navIndex: this.getIndex(),
      openNav: false
    })
  }
  componentDidMount() {
    this.init()
    window.addEventListener('hashchange', this.init.bind(this), false)
    window.addEventListener('resize', this.winResize.bind(this), false)
  }
  render() {
    let {openNav, navIndex, content, isLoading} = this.state
    return (
      <div>
        <nav className={styles['g-nav']}>
          <div className={styles['inner']}>
            <div className={styles['wrap']}>
              <a className={styles['home']} href="/#">
                <svg className={styles['logo']} aria-hidden="true" width="30" height="30" version="1.1" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
                <span className={styles['name']}>硕鼠宝</span>
              </a>
              <span className={classnames(styles['btn-navbar'], openNav ? styles['active'] : '')} onClick={this.openNav.bind(this)}>
                {
                  Array(4).fill(1).map((v, i) => <span key={i} className={styles['icon-bar']}></span>)
                }
              </span>
              <ul style={{height: openNav ? (DATA_NAV.length * 40 + 20) : 0}}>
                {
                  DATA_NAV.map((...arg) => {
                    return <li key={arg[1]} className={navIndex === arg[1] ? styles['active'] : ''}>
                      <a href={`/#${DATA_NAV[arg[1]].categories}`}>{arg[0].text}</a>
                    </li>
                  })
                }
              </ul>
              <a className={styles['btn-github']} target="_blank" href={DATA_META.githubLink}>GitHub</a>
            </div>
          </div>
        </nav>
        {
          typeof content === 'string'
          ?
          <article className={styles['g-content']} ref="content" dangerouslySetInnerHTML={{__html: content}} />
          :
          <article className={styles['g-content']} ref="content">{content}</article>
        }
        {
          isLoading && <section className={styles['g-loading']}>
            <div className={styles['w-loading']}>
              <div className={styles['m-loading']}>
                {
                  ['y', 'r', 'g'].map((v, i) => <div key={i} className={classnames(styles['item'], styles[`item-${v}`])} />)
                }
              </div>
              <div className={styles['text']}>Loading...</div>
            </div>
          </section>
        }
        <footer className={styles['g-footer']}>
          <div className={styles['outer']}>
            <div className={styles['wrap']}>
              <span>© 2015-{new Date().getFullYear()} Shuoshubao.com 版权所有 {DATA_META.registration}</span>
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