import React from 'react'
import ReactDOM from 'react-dom'
import marked from 'marked'
import Prism from 'prismjs'
import data from '../data/data'
require('../less/app.less')


const App = React.createClass({
  getDefaultProps() {
    return {
      docRoot: '/docs/',
      hashRoot: '/#',
    };
  },
  getInitialState() {
    return {
      navIndex: this.getIndex(),
      Loading: false,
      content: '',
      hash: this.getHash(),
    };
  },
  getHash() {
    let hash = window.location.hash.substring(1).split('/');
    return [hash[0] || 'index', hash[1] || ''];
  },
  getIndex() {
    let navIndex = 0;
    let categories = this.getHash()[0];
    data.nav.forEach((...arg) => {
      if(arg[0].categories === categories) {
        navIndex = arg[1];
        return false;
      }
    });
    return navIndex;
  },
  hideLoading() {
    document.querySelectorAll('pre code').forEach(function(v, i) {
      Prism.highlightElement(v);
    });
    setTimeout(() => {
      this.setState({
        isLoading: false
      });
    }, 300);
  },
  openNav() {
    this.setState({
      openNav: !this.state.openNav,
    });
  },
  renderList(categories) {
    this.setState({
      isLoading: true,
    });
    let dataList = categories === 'index' ? data.article : data.article.filter((...arg) => {
      return arg[0].categories === categories;
    });
    let list = dataList.map((...arg) => {
      return (
        <li key={arg[1]}>
          <a href={`${this.props.hashRoot}${arg[0].categories}/${arg[0].name}`}>{arg[0].title}</a>
        </li>
      );
    });
    if(['nav', 'about'].indexOf(categories) != -1) {
      this.renderArticle(categories, 'index', categories);
    }else {
      this.setState({
        content: <ul className="m-list">{list}</ul>,
      });
      this.hideLoading();
    }
  },
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
  },
  renderArticle(categories, article, listName) {
    if(['nav', 'about'].indexOf(categories) === -1 && article !== 'index' && !data.article.filter((...arg) => {
        return arg[0].categories === categories;
      }).filter((...arg) => {
        return arg[0].name === article;
      }).length) {
      console.log('文章不存在');
      return false;
    }
    let url = `${this.props.docRoot}${[categories, article].join('/')}.md`;
    this.setState({
      isLoading: true,
    });
    if(window.fetch) {
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
    }else {
      this.getArticle(url, rs => {
        this.setState({
          content: listName ? (`<div class="p-${listName}">${marked(rs)}</div>`) : (`<div class="markdown"><a target="_blank" href="/docs/${[categories, article].join('/')}.md")>源码</a>${marked(rs)}</div>`),
        });
        this.hideLoading();
      }, () => {
        this.hideLoading();
      });
    }
  },
  renderView(hash) {
    this[hash[1] ? 'renderArticle' : 'renderList'](...hash);
  },
  winResize() {
    this.setState({
      openNav: false,
    });
  },
  init() {
    this.renderView(this.getHash());
    this.setState({
      navIndex: this.getIndex(),
      openNav: false,
    });
  },
  componentDidMount() {
    this.init();
    window.addEventListener('hashchange', this.init, false);
    window.addEventListener('resize', this.winResize, false);
  },
  render() {
    let {hashRoot} = this.props;
    let {openNav, navIndex, content, isLoading} = this.state;
    return (
      <div>
        <nav className="g-nav">
          <div className="inner">
            <div className="wrap">
              <a className="home" href={`${hashRoot}index`}>
                <img className="logo" width="36" height="36" src="./img/logo.svg" />
                <span className="name">硕鼠宝</span>
              </a>
              <span className={`btn-navbar ${openNav ? 'active' : ''}`} onClick={this.openNav}>
                {
                  (new Array(4).fill(1)).map((...arg) => <span key={arg[1]} className="icon-bar"></span>)
                }
              </span>
              <ul style={{height: openNav ? (data.nav.length * 40 + 20) : 0}}>
                {
                  data.nav.map((...arg) => {
                    return <li key={arg[1]} className={navIndex === arg[1] ? 'active' : ''}>
                      <a href={`${hashRoot}${data.nav[arg[1]].categories}`}>{arg[0].text}</a>
                    </li>;
                  })
                }
              </ul>
              <a className="btn-github" target="_blank" href={data.meta.githubLink}>GitHub</a>
            </div>
          </div>
        </nav>
        {(() => {
          if(typeof content === 'string') {
            return <article className="g-content" ref="content" dangerouslySetInnerHTML={{__html: content}} />;
          }else {
            return <article className="g-content" ref="content">{content}</article>;
          }
        })()}
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
              <span>{data.meta.title}</span>
              <span> | </span>
              <span>Powered by </span>
              <a target="_blank" href={data.meta.githubLink}> GitHub </a>
              <a target="_blank" href="https://facebook.github.io/react/"> React </a>
            </div>
          </div>
        </footer>
      </div>
    );
  },
});

const appDiv = document.createElement('div');
document.body.appendChild(appDiv);

ReactDOM.render(
  <App />
  ,appDiv
);