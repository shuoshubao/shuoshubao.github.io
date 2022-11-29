var e = Object.defineProperty,
  t = Object.prototype.hasOwnProperty,
  a = Object.getOwnPropertySymbols,
  i = Object.prototype.propertyIsEnumerable,
  s = (t, a, i) => (a in t ? e(t, a, { enumerable: !0, configurable: !0, writable: !0, value: i }) : (t[a] = i)),
  n = (e, n) => {
    for (var o in n || (n = {})) t.call(n, o) && s(e, o, n[o])
    if (a) for (var o of a(n)) i.call(n, o) && s(e, o, n[o])
    return e
  }
import {
  c as o,
  j as r,
  t as l,
  x as c,
  a as d,
  s as p,
  l as h,
  b as g,
  p as u,
  d as m,
  e as v,
  f as b,
  m as _
} from './vendor.2676359c.js'
var f = [
  { text: 'Home', categorie: 'index' },
  { text: 'JS', categorie: 'js' },
  { text: 'Node', categorie: 'node' },
  { text: 'HTML', categorie: 'html' },
  { text: 'CSS', categorie: 'css' },
  { text: 'Tool', title: '前端工具', categorie: 'tool' },
  { text: 'Assemble', categorie: 'assemble' }
]
var y = {
  title: 'WEB前端开发',
  author: 'shuoshubao',
  qq: '759979885',
  email: '759979885@qq.com',
  description: '专注前端开发，关注用户体验',
  keywords: 'shuoshubao 硕鼠宝 FE 前端 JS',
  qqLink: 'http://sighttp.qq.com/authd?IDKEY=ac3c33ef370b9c4efc05e5660a2d2085b121007e508c595f',
  sinaLink: 'http://weibo.com/qq759979885',
  githubLink: 'https://github.com/shuoshubao/shuoshubao.github.io/',
  hostnameProd: 'shuoshubao.github.io',
  registration: '京ICP备15042742号'
}
function C(e, t, a, i, s, n, o, r) {
  var l,
    c = 'function' == typeof e ? e.options : e
  if (
    (t && ((c.render = t), (c.staticRenderFns = a), (c._compiled = !0)),
    i && (c.functional = !0),
    n && (c._scopeId = 'data-v-' + n),
    o
      ? ((l = function (e) {
          ;(e =
            e ||
            (this.$vnode && this.$vnode.ssrContext) ||
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext)) ||
            'undefined' == typeof __VUE_SSR_CONTEXT__ ||
            (e = __VUE_SSR_CONTEXT__),
            s && s.call(this, e),
            e && e._registeredComponents && e._registeredComponents.add(o)
        }),
        (c._ssrRegister = l))
      : s &&
        (l = r
          ? function () {
              s.call(this, (c.functional ? this.parent : this).$root.$options.shadowRoot)
            }
          : s),
    l)
  )
    if (c.functional) {
      c._injectStyles = l
      var d = c.render
      c.render = function (e, t) {
        return l.call(t), d(e, t)
      }
    } else {
      var p = c.beforeCreate
      c.beforeCreate = p ? [].concat(p, l) : [l]
    }
  return { exports: e, options: c }
}
const T = {}
var w = C(
  {
    props: { categorie: { type: String }, listData: { type: Object } },
    data() {
      const { categorie: e, listData: t } = this
      let a = []
      return (
        (a = ['index', ''].includes(e)
          ? f
              .map(e => e.categorie)
              .filter(e => 'index' !== e)
              .reduce((e, a) => (e.push(...t[a].map(e => n(n({}, e), { categorie: a }))), e), [])
          : t[e]),
        { list: a }
      )
    }
  },
  function () {
    var e = this,
      t = e.$createElement,
      a = e._self._c || t
    return a(
      'el-card',
      [
        a(
          'div',
          { attrs: { slot: 'header' }, slot: 'header' },
          [
            a('span', [e._v('共')]),
            e._v(' '),
            a('el-link', { attrs: { type: 'primary' } }, [e._v(e._s(e.list.length))]),
            e._v(' '),
            a('span', [e._v('篇文章')])
          ],
          1
        ),
        e._v(' '),
        e._l(e.list, function (t, i) {
          return a(
            'div',
            { key: i, staticStyle: { padding: '10px 0', 'line-height': '20px' } },
            [
              a('el-link', { attrs: { href: '#' + [t.categorie || e.categorie, t.name].join('/'), type: 'primary' } }, [
                e._v(e._s(t.title))
              ])
            ],
            1
          )
        })
      ],
      2
    )
  },
  [],
  !1,
  function (e) {
    for (let t in T) this[t] = T[t]
  },
  null,
  null,
  null
).exports
o.registerLanguage('javascript', r),
  o.registerLanguage('typescript', l),
  o.registerLanguage('xml', c),
  o.registerLanguage('css', d),
  o.registerLanguage('scss', p),
  o.registerLanguage('less', h),
  o.registerLanguage('json', g),
  o.registerLanguage('plaintext', u),
  o.registerLanguage('shell', m),
  o.registerLanguage('bash', v),
  o.registerLanguage('php', b)
const x = _({
    highlight: (e, t) => {
      if (t && o.getLanguage(t))
        try {
          const { code: a, value: i } = o.highlight(e.trim(), { language: t })
          return [
            '<pre>',
            `<code class="hljs language-${t}" lang="${t}">`,
            ...i.split('\n').map(e => `<div class="line">${e}</div>`),
            '<span class="markdown-code-btns">',
            `<span class="btn-lang">${t}</span>`,
            `<span class="el-icon-document-copy btn-copycode" data-code="${btoa(encodeURIComponent(a))}"></span>`,
            '</span>',
            '</code>',
            '</pre>'
          ].join('')
        } catch (a) {}
      return ''
    }
  }),
  L = {}
var A = C(
  {
    props: { categorie: { type: Array }, listData: { type: Object } },
    data: () => ({
      loading: !0,
      articleTitle: '',
      sourceCode: '',
      MarkdownHtml: '',
      dialogData: { title: 'Markdown源码', visible: !1 }
    }),
    methods: {
      async fetchData() {
        const { categorie: e } = this,
          t = await fetch(`https://raw.githubusercontent.com/shuoshubao/blog/master/article/${e.join('/')}.md`).then(
            e => e.text()
          )
        ;(this.sourceCode = t),
          (this.MarkdownHtml = x.render(t)),
          (this.loading = !1),
          await this.$nextTick(),
          document.querySelectorAll('.btn-copycode').forEach(e => {
            e.addEventListener(
              'click',
              () => (
                ((e = '') => {
                  const t = document.createElement('textarea')
                  ;(t.value = e),
                    document.body.appendChild(t),
                    t.select(),
                    document.execCommand('copy'),
                    document.body.removeChild(t)
                })(decodeURIComponent(atob(e.dataset.code))),
                this.$message({ message: '代码复制成功', type: 'success', duration: 2e3 }),
                !1
              )
            )
          })
      },
      showCode() {
        this.dialogData.visible = !0
      }
    },
    async created() {
      await this.fetchData()
      const { listData: e } = this,
        [t, a] = this.categorie,
        i = e[t].find(e => e.name === a).title
      this.articleTitle = i
    }
  },
  function () {
    var e = this,
      t = e.$createElement,
      a = e._self._c || t
    return a(
      'div',
      [
        a(
          'el-card',
          { directives: [{ name: 'loading', rawName: 'v-loading', value: e.loading, expression: 'loading' }] },
          [
            a(
              'div',
              {
                staticStyle: { display: 'flex', 'justify-content': 'space-between' },
                attrs: { slot: 'header' },
                slot: 'header'
              },
              [
                a('span', [e._v(e._s(e.articleTitle))]),
                e._v(' '),
                a('el-tooltip', { attrs: { effect: 'dark', content: 'Markdown源码', placement: 'top-start' } }, [
                  a('i', { staticClass: 'el-icon-view', on: { click: e.showCode } })
                ])
              ],
              1
            ),
            e._v(' '),
            a('div', { staticClass: 'markdown-body', domProps: { innerHTML: e._s(e.MarkdownHtml) } })
          ]
        ),
        e._v(' '),
        a(
          'el-dialog',
          {
            staticClass: 'dialog-markdown',
            attrs: { visible: e.dialogData.visible, width: '95%', top: '50px', title: e.dialogData.title },
            on: {
              'update:visible': function (t) {
                return e.$set(e.dialogData, 'visible', t)
              }
            }
          },
          [a('pre', { staticStyle: { margin: '0' }, domProps: { innerHTML: e._s(e.sourceCode) } })]
        )
      ],
      1
    )
  },
  [],
  !1,
  function (e) {
    for (let t in L) this[t] = L[t]
  },
  null,
  null,
  null
).exports
const k = {}
var D = C(
  {
    components: { List: w, Detail: A },
    data: () => ({
      loading: !0,
      mobileOpen: !1,
      DATA_META: y,
      DATA_NAV: f,
      DATA_ARTICLE: {},
      validHashList: [],
      defaultActive: '',
      categorie: '',
      pageType: ''
    }),
    methods: {
      onClickOpen(e) {
        ;(this.mobileOpen = !0), e.stopPropagation()
      },
      onClickTopbar(e) {
        e.stopPropagation()
      },
      onSelectMenu(e, t) {
        window.location.hash = 'index' === t[0] ? '' : t[0]
      },
      async fetchData() {
        return fetch('https://raw.githubusercontent.com/shuoshubao/blog/master/data/db.json')
          .then(e => e.json())
          .then(e => {
            ;(this.DATA_ARTICLE = e), (this.loading = !1)
          })
          .catch(() => {
            this.loading = !1
          })
      },
      validateUrl() {
        const { DATA_ARTICLE: e } = this
        this.validHashList = Object.entries(e).reduce(
          (e, [t, a]) => (e.push(t, ...a.map(e => [t, e.name].join('/'))), e),
          ['', 'index']
        )
      },
      onHashchange() {
        const e = window.location.hash.substring(1),
          [t, a = ''] = e.split('/')
        this.validHashList.includes(e)
          ? e.includes('/')
            ? this.renderDetail(t, a.split('?')[0])
            : this.renderList(t)
          : this.renderError()
      },
      renderList(e) {
        ;(this.pageType = 'list'), (this.categorie = e)
      },
      renderDetail(e, t) {
        ;(this.pageType = 'detail'), (this.categorie = [e, t])
      },
      renderError() {
        this.pageType = 'error'
      }
    },
    mounted() {
      document.body.addEventListener('click', () => {
        this.mobileOpen = !1
      })
    },
    async created() {
      await this.fetchData(),
        this.validateUrl(),
        window.addEventListener('hashchange', this.onHashchange, !1),
        this.onHashchange()
    }
  },
  function () {
    var e = this,
      t = e.$createElement,
      a = e._self._c || t
    return a(
      'div',
      {
        directives: [{ name: 'loading', rawName: 'v-loading', value: e.loading, expression: 'loading' }],
        staticStyle: { height: '100%' }
      },
      [
        a('div', { staticClass: 'ss-topbar-mobile' }, [
          a('div', { staticClass: 'topbar-inner' }, [
            a('span', { staticClass: 'el-icon-s-operation', on: { click: e.onClickOpen } })
          ])
        ]),
        e._v(' '),
        a(
          'el-container',
          { staticClass: 'ss-container' },
          [
            a(
              'el-aside',
              {
                class: ['ss-aside', { open: e.mobileOpen }],
                attrs: { width: '150px' },
                on: { click: e.onClickTopbar }
              },
              [
                a(
                  'div',
                  { staticClass: 'aside-inner' },
                  [
                    a(
                      'el-menu',
                      { attrs: { 'default-active': e.defaultActive }, on: { select: e.onSelectMenu } },
                      e._l(e.DATA_NAV, function (t, i) {
                        return a('el-menu-item', { key: i, attrs: { index: t.categorie } }, [
                          a('i', { staticClass: 'el-icon-menu' }),
                          e._v(' '),
                          a('span', { attrs: { slot: 'title' }, slot: 'title' }, [e._v(e._s(t.text))])
                        ])
                      }),
                      1
                    )
                  ],
                  1
                )
              ]
            ),
            e._v(' '),
            a(
              'el-main',
              { key: [e.pageType, e.categorie].join('_'), staticClass: 'ss-main' },
              [
                'list' === e.pageType
                  ? a('List', { attrs: { categorie: e.categorie, 'list-data': e.DATA_ARTICLE } })
                  : e._e(),
                e._v(' '),
                'detail' === e.pageType
                  ? a('Detail', { attrs: { categorie: e.categorie, 'list-data': e.DATA_ARTICLE } })
                  : e._e(),
                e._v(' '),
                'error' === e.pageType
                  ? a('div', [a('el-empty', { attrs: { description: '您访问的博客不存在' } })], 1)
                  : e._e()
              ],
              1
            )
          ],
          1
        )
      ],
      1
    )
  },
  [],
  !1,
  function (e) {
    for (let t in k) this[t] = k[t]
  },
  '03978c61',
  null,
  null
).exports
new Vue({ render: e => e(D) }).$mount('#app')
