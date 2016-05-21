let React = require('react');
let ReactDOM = require('react-dom');

let marked = require('marked');
let data = require('./data.jsx');
require('../less/app.less');

const isProd = window.location.hostname === data.meta.hostnameProd;

let App = React.createClass({
  getDefaultProps: function() {
    return {
      isProd: isProd,
      docRoot: '/docs/',
      hashRoot: '/#',
    };
  },
  getInitialState: function() {
    return {
      navIndex: this.getIndex(),
      Loading: false,
      content: '',
      hash: this.getHash(),
    };
  },
  getHash: function() {
    let hash = window.location.hash.substring(1).split('/');
    return [hash[0] || 'index', hash[1] || ''];
  },
  getIndex: function() {
    let navIndex = 0;
    let categories = this.getHash()[0];
    data.nav.forEach(function(v, k) {
      if(v.categories === categories) {
        navIndex = k;
        return false;
      }
    });
    return navIndex;
  },
  hideLoading: function() {
    setTimeout(function() {
      this.setState({
        isLoading: false
      });
    }.bind(this), 300);
  },
  renderList: function(categories) {
    this.setState({
      isLoading: true
    });
    let dataList = categories === 'index' ? data.article : data.article.filter(function(v, k) {
      return v.categories === categories;
    });
    let list = dataList.map((v, k)=>{
      return (
        <li key={k}>
          <a href={this.props.hashRoot + v.categories + '/' + v.name}>{v.title}</a>
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
  getArticle: function(url, success, failure) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
        success(xhr.responseText);
      }else {
        failure();
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
  },
  renderArticle: function(categories, article, listName) {
    let url = this.props.docRoot + [categories, article].join('/') + '.md';
    this.setState({
      isLoading: true
    });
    if(window.fetch) {
      fetch(url).then(function(rs) {
        if(rs.ok) {
          rs.text().then(rs => {
            this.setState({
              content: listName ? ('<div class="p-'+listName+'">'+marked(rs)+'</div>') : ('<div class="markdown">'+marked(rs)+'</div>'),
            });
            this.hideLoading();
          });
        }else {
          this.hideLoading();
        }
      }.bind(this));
    }else {
      this.getArticle(url, function(rs) {
        this.setState({
          content: listName ? ('<div class="p-'+listName+'">'+marked(rs)+'</div>') : ('<div class="markdown">'+marked(rs)+'</div>'),
        });
        this.hideLoading();
      }.bind(this), function() {
        this.hideLoading();
      }.bind(this));
    }
  },
  renderView: function(hash) {
    this[hash[1]?'renderArticle':'renderList'](...hash);
  },
  init: function() {
    this.renderView(this.getHash());
    this.setState({
      navIndex: this.getIndex()
    });
  },
  componentDidMount: function() {
    if(this.props.isProd) {
      let _hmt = _hmt || [];
      (()=>{
        let hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?12f2656ca2bbd3123c8d0ef2e3d2ef0a";
        document.head.appendChild(hm)
      })();
    }
    this.init();
    window.addEventListener('hashchange', this.init, false);
  },
  render: function() {
    return (
      <div>
        <nav className="g-nav">
          <div className="inner">
            <div className="wrap">
              <a className="home" href={this.props.hashRoot + 'index'}>
                <img className="logo" width="36" height="36" src="http://facebook.github.io/react/img/logo.svg" />
                <span className="name">React</span>
              </a>
              <ul>
                {
                  data.nav.map(function(v, i) {
                    return <li key={i} className={this.state.navIndex === i ? 'active' : ''}>
                      <a href={this.props.hashRoot + data.nav[i].categories}>{v.text}</a>
                    </li>;
                  }.bind(this))
                }
              </ul>
              <a className="btn-github" target="_blank" href={data.meta.githubLink}>GitHub</a>
            </div>
          </div>
        </nav>
        {(()=>{
          if(typeof this.state.content === 'string') {
            return <article className="g-content" ref="content" dangerouslySetInnerHTML={{__html: this.state.content}} />;
          }else {
            return <article className="g-content" ref="content">{this.state.content}</article>;
          }
        })()}


        <section className={'g-loading ' + (this.state.isLoading ? '' : 'hide')}>
          <div className="w-loading ">
            <div className="m-loading">
              <div className="item item-y"></div>
              <div className="item item-r"></div>
              <div className="item item-g"></div>
            </div>
            <div className="text">数据加载中</div>
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

ReactDOM.render(
  <App />
  ,document.getElementById('app')
);