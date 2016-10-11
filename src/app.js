import React, {Component} from 'react'
import {render} from 'react-dom'
import marked from 'marked'
import Prism from 'prismjs'
import 'whatwg-fetch'
import DATA_META from '../data/meta'
import DATA_NAV from '../data/nav'
import DATA_ARTICLE from '../data/article'
import '../less/app.less'

class App extends Component {
  static defaultProps = {
    docRoot: '/docs/',
    hashRoot: '/#',
  }
  constructor(props) {
    super(props);
    this.state = {
      navIndex: this.getIndex(),
      isLoading: false,
      content: '',
      hash: this.getHash(),
    };
  }
  getHash() {
    let hash = window.location.hash.substring(1).split('/');
    return [hash[0] || 'index', hash[1] || ''];
  }
  getIndex() {
    let navIndex = 0;
    let categories = this.getHash()[0];
    DATA_NAV.forEach((...arg) => {
      if(arg[0].categories === categories) {
        navIndex = arg[1];
        return false;
      }
    });
    return navIndex;
  }
  hideLoading() {
    document.querySelectorAll('pre code').forEach(function(v, i) {
      Prism.highlightElement(v);
    });
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 300);
  }
  openNav() {
    this.setState({
      openNav: !this.state.openNav,
    });
  }
  renderList(categories) {
    this.setState({
      isLoading: true,
    });
    let dataList = categories === 'index' ? DATA_ARTICLE : DATA_ARTICLE.filter((...arg) => arg[0].categories === categories);
    let {hashRoot} = this.props;
    let list = dataList.map((...arg) => (
       <li key={arg[1]}>
         <a href={`${hashRoot}${arg[0].categories}/${arg[0].name}`}>{arg[0].title}</a>
       </li>
    ));
    if(['nav', 'about'].indexOf(categories) != -1) {
      this.renderArticle(categories, 'index', categories);
    }else {
      this.setState({
        content: <ul className="m-list">{list}</ul>,
      });
      this.hideLoading();
    }
  }
  getArticle(url, success, failure) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4 && xhr.status === 200) {
        success(xhr.responseText);
      }else {
        failure();
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  }
  renderArticle(categories, article, listName) {
    if(['nav', 'about'].indexOf(categories) === -1 && article !== 'index' && !DATA_ARTICLE.filter((...arg) => arg[0].categories === categories).filter((...arg) => arg[0].name === article).length) {
      console.log('文章不存在');
      return false;
    }
    let {docRoot} = this.props;
    let url = `${docRoot}${[categories, article].join('/')}.md`;
    this.setState({
      isLoading: true,
    });
    fetch(url).then(rs => {
      if(rs.ok) {
        rs.text().then(rs => {
          this.setState({
            content: listName ? (`<div class="p-${listName}">${marked(rs)}</div>`) : (`<div class="markdown"><a target="_blank" href="/docs/${[categories, article].join('/')}.md")>源码</a>${marked(rs)}</div>`),
          });
          this.hideLoading();
        });
      }else {
        this.hideLoading();
      }
    });
  }
  renderView(hash) {
    this[hash[1] ? 'renderArticle' : 'renderList'](...hash);
  }
  winResize() {
    this.setState({
      openNav: false,
    });
  }
  init() {
    this.renderView(this.getHash());
    this.setState({
      navIndex: this.getIndex(),
      openNav: false,
    });
  }
  componentDidMount() {
    this.init();
    window.addEventListener('hashchange', this.init.bind(this), false);
    window.addEventListener('resize', this.winResize.bind(this), false);
  }
  render() {
    let {hashRoot} = this.props;
    let {openNav, navIndex, content, isLoading} = this.state;
    return (
      <div>
        <nav className="g-nav">
          <div className="inner">
            <div className="wrap">
              <a className="home" href="/#">
                <svg className="logo" aria-hidden="true" width="30" height="30" version="1.1" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
                <span className="name">硕鼠宝</span>
              </a>
              <span className={`btn-navbar ${openNav ? 'active' : ''}`} onClick={this.openNav} dangerouslySetInnerHTML={{__html: '<span class="icon-bar"></span>'.repeat(4)}} />
              <ul style={{height: openNav ? (DATA_NAV.length * 40 + 20) : 0}}>
                {
                  DATA_NAV.map((...arg) => {
                    return <li key={arg[1]} className={navIndex === arg[1] ? 'active' : ''}>
                      <a href={`${hashRoot}${DATA_NAV[arg[1]].categories}`}>{arg[0].text}</a>
                    </li>;
                  })
                }
              </ul>
              <a className="btn-github" target="_blank" href={DATA_META.githubLink}>GitHub</a>
            </div>
          </div>
        </nav>
        {
          typeof content === 'string'
          ?
          <article className="g-content" ref="content" dangerouslySetInnerHTML={{__html: content}} />
          :
          <article className="g-content" ref="content">{content}</article>
        }

        <section className={`g-loading ${isLoading ? '' : 'hide'}`}>
          <div className="w-loading ">
            <div className="m-loading">
              <div className="item item-y"></div>
              <div className="item item-r"></div>
              <div className="item item-g"></div>
            </div>
            <div className="text">Loading...</div>
          </div>
        </section>
        <footer className="g-footer">
          <div className="outer">
            <div className="wrap">
              <span>©</span>
              <time>{new Date().getFullYear()} </time>
              <span>{DATA_META.title}</span>
              <span> | </span>
              <span>Powered by </span>
              <a target="_blank" href={DATA_META.githubLink}> GitHub </a>
              <a target="_blank" href="https://facebook.github.io/react/"> React </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
};

render(
  <App />
  ,document.body.appendChild(document.createElement('div'))
);