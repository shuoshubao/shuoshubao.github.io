import MarkdownIt from 'markdown-it'
import hljs from 'util/highlight.js/lib'
import GitHubButton from 'component/GithubButton'
import {DATA_NAV, DATA_META} from 'data'
import 'polyfill'
import 'style/highlight-table.less'
import 'util/highlight.js/styles/github.css'
import style from './index.module.less'

const MarkdownItHighlight = MarkdownIt({
  highlight: (str, language) => {
    const lang = language || 'javascript'
    const {value} = hljs.highlight(lang, str)
    if (hljs.getLanguage(lang)) {
      try {
        return [
          `<pre class="hljs language-${lang}">`,
            `<table>`,
              `<tbody>`,
                value.trim().split(`\n`).map((v, i) => [
                  `<tr>`,
                    `<td data-line-number=${i + 1}></td>`,
                    `<td>${v}</td>`,
                  `</tr>`,
                ].join('')).join(''),
              `</tbody>`,
            `</table>`,
          `</pre>`
        ].join('')
      } catch (e) {
        throw e
      }
    }
    return ''
  }
})

const getHash = () => {
  const hash = window.location.hash.substring(1).split('/')
  return [hash[0] || 'index', hash[1] || '']
}

const getIndex = () => {
  let navIndex = 0
  const categories = getHash()[0]
  DATA_NAV.forEach((v, i) => {
    if(v.categories === categories) {
      navIndex = i
      return false
    }
  })
  return navIndex
}

let DATA_ARTICLE = null

const urlPrefix = 'https://raw.githubusercontent.com/shuoshubao/blog/master'

class App extends React.Component {
  static propTypes = {
    sourceUrl: PropTypes.string.isRequired
  }
  static defaultProps = {
    sourceUrl: `${urlPrefix}/article/`
  }
  constructor() {
    super()
    this.state = {
      navIndex: getIndex(),
      content: '',
      hash: getHash()
    }
  }
  componentDidMount() {
    this.init()
    window.addEventListener('hashchange', this.init.bind(this), false)
    window.addEventListener('resize', this.winResize.bind(this), false)
  }
  openNav = () => {
    this.setState({
      openNav: !this.state.openNav
    })
  }
  renderList(categories) {
    let dataList = []
    const render = () => {
      if(categories === 'index') {
        dataList = DATA_NAV.filter(v => v.categories !== 'index').reduce((prev, cur) => {
            prev.push(...DATA_ARTICLE[cur.categories].map(v => ({
                categories: cur.categories,
                title: v.title,
                name: v.name
            })))
            return prev
        }, [])
      }else {
          dataList = DATA_ARTICLE[categories].map(v => ({
              categories,
              title: v.title,
              name: v.name
          }))
      }
      this.setState({
        navIndex: getIndex(),
        openNav: false,
        content: <ul className={style.list}>
          {
            dataList.map(v => (
              <li key={`${v.categories + v.name}`}>
                <a href={`/build/#${v.categories}/${v.name}`}>{v.title}</a>
              </li>
            ))
          }
        </ul>
      })
    }
    if(!DATA_ARTICLE) {
      fetch(`${urlPrefix}/data/db.json`)
      .then(rs => rs.json())
      .then(rs => {
        DATA_ARTICLE = rs
        render()
      })

    }else {
      render()
    }
  }
  renderArticle(categories, article) {
    const articleId = [categories, article]
    const getContent = content => (
    categories === 'assemble' ?
      <div
        className={style[`p-${article.toLowerCase()}`]}
        dangerouslySetInnerHTML={{__html: content}}
      />
    :
      <div className={style.markdown}>
        <div dangerouslySetInnerHTML={{__html: MarkdownItHighlight.render(content)}} />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${this.props.sourceUrl}${articleId.join('/')}.md`}
        >源码</a>
      </div>
    )
    fetch(`${this.props.sourceUrl}${articleId.join('/')}.md`)
    .then(rs => rs.text())
    .then(rs => {
      this.setState({
        navIndex: getIndex(),
        openNav: false,
        content: getContent(rs)
      })
    })
  }
  renderView = hash => this[hash[1] ? 'renderArticle' : 'renderList'](...hash)
  winResize() {
    this.setState({
      openNav: false
    })
  }
  init() {
    this.renderView(getHash())
  }
  render() {
    const {
      openNav,
      navIndex,
      content
    } = this.state
    return (
      <div>
        <nav className={style.nav}>
          <div className={style.inner}>
            <div className={style.wrap}>
              <a className={style.home} href="/build/#">
                <svg
                  className={style.logo}
                  aria-hidden="true"
                  width="30"
                  height="30"
                  version="1.1"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
                <span className={style.name}>硕鼠宝</span>
              </a>
              <span className={classnames(style.navbar, {[style.active]: openNav})} onClick={this.openNav}>
                {
                  [0, 1, 2, 3].map(v => <span key={v} className={style.bar} />)
                }
              </span>
              <ul style={{height: openNav ? (DATA_NAV.length * 40 + 20) : 0}}>
                {
                  DATA_NAV.map((v, i) => (
                    <li key={`${v.categories + v.name}`} className={classnames({[style.active]: navIndex === i})}>
                      <a href={`/build/#${DATA_NAV[i].categories}`}>{v.text}</a>
                    </li>
                  ))
                }
              </ul>
              <a
                className={style.github}
                target="_blank" rel="noopener noreferrer"
                href={DATA_META.githubLink}
              >GitHub</a>
            </div>
          </div>
        </nav>
        {
          typeof content === 'string' ?
            <article className={style.content} dangerouslySetInnerHTML={{__html: content}} />
            :
            <article className={style.content}>{content}</article>
        }
        <footer className={style.footer}>
          <div className={style.outer}>
            <div className={style.wrap}>
              <span>© 2014-{new Date().getFullYear()} Shuoshubao.com 版权所有 {DATA_META.registration}</span>
              <span> Powered by </span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={DATA_META.githubLink}
              > GitHub </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://facebook.github.io/react/"
              > React </a>
              <GitHubButton
                type="stargazers"
                username="shuoshubao"
                repo="shuoshubao.github.io"
              />
            </div>
          </div>
        </footer>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#app'))
