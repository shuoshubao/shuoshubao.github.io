var t = Object.defineProperty,
  e = Object.prototype.hasOwnProperty,
  i = Object.getOwnPropertySymbols,
  a = Object.prototype.propertyIsEnumerable,
  s = (e, i, a) => (i in e ? t(e, i, { enumerable: !0, configurable: !0, writable: !0, value: a }) : (e[i] = a)),
  n = (t, n) => {
    for (var o in n || (n = {})) e.call(n, o) && s(t, o, n[o])
    if (i) for (var o of i(n)) a.call(n, o) && s(t, o, n[o])
    return t
  }
import { m as o, p as r, g as l, c, V as d, E as h } from './vendor.213dfe9a.js'
var p = [
  { text: 'Home', categorie: 'index' },
  { text: 'JS', categorie: 'js' },
  { text: 'Node', categorie: 'node' },
  { text: 'HTML', categorie: 'html' },
  { text: 'CSS', categorie: 'css' },
  { text: 'Tool', title: '前端工具', categorie: 'tool' },
  { text: 'Assemble', categorie: 'assemble' }
]
var u = {
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
function g(t, e, i, a, s, n, o, r) {
  var l,
    c = 'function' == typeof t ? t.options : t
  if (
    (e && ((c.render = e), (c.staticRenderFns = i), (c._compiled = !0)),
    a && (c.functional = !0),
    n && (c._scopeId = 'data-v-' + n),
    o
      ? ((l = function (t) {
          ;(t =
            t ||
            (this.$vnode && this.$vnode.ssrContext) ||
            (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext)) ||
            'undefined' == typeof __VUE_SSR_CONTEXT__ ||
            (t = __VUE_SSR_CONTEXT__),
            s && s.call(this, t),
            t && t._registeredComponents && t._registeredComponents.add(o)
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
      c.render = function (t, e) {
        return l.call(e), d(t, e)
      }
    } else {
      var h = c.beforeCreate
      c.beforeCreate = h ? [].concat(h, l) : [l]
    }
  return { exports: t, options: c }
}
const v = {}
var m = g(
  {
    props: { categorie: { type: String }, listData: { type: Object } },
    data() {
      const { categorie: t, listData: e } = this
      let i = []
      return (
        (i = ['index', ''].includes(t)
          ? p
              .map(t => t.categorie)
              .filter(t => 'index' !== t)
              .reduce((t, i) => (t.push(...e[i].map(t => n(n({}, t), { categorie: i }))), t), [])
          : e[t]),
        { list: i }
      )
    }
  },
  function () {
    var t = this,
      e = t.$createElement,
      i = t._self._c || e
    return i(
      'el-card',
      [
        i(
          'div',
          { attrs: { slot: 'header' }, slot: 'header' },
          [
            i('span', [t._v('共')]),
            t._v(' '),
            i('el-link', { attrs: { type: 'primary' } }, [t._v(t._s(t.list.length))]),
            t._v(' '),
            i('span', [t._v('篇文章')])
          ],
          1
        ),
        t._v(' '),
        t._l(t.list, function (e, a) {
          return i(
            'div',
            { key: a, staticStyle: { padding: '10px 0', 'line-height': '20px' } },
            [
              i('el-link', { attrs: { href: '#' + [e.categorie || t.categorie, e.name].join('/'), type: 'primary' } }, [
                t._v(t._s(e.title))
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
  function (t) {
    for (let e in v) this[e] = v[e]
  },
  null,
  null,
  null
).exports
const _ = o({
    highlight: (t, e) => {
      const i = e || 'javascript',
        a = r
          .highlight(t, r.languages[i], i)
          .trim()
          .split('\n')
          .map((t, e) => ({ index: e + 1, text: t })),
        s = l(
          [
            { prop: 'index', label: '索引' },
            { prop: 'text', label: '内容' }
          ],
          a
        )
      return c({ tagName: 'pre', attrs: { class: `highlight language-${i}` }, children: [s] })
    }
  }),
  f = {}
var b = g(
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
      fetchData() {
        const { categorie: t } = this
        fetch(`https://raw.githubusercontent.com/shuoshubao/blog/master/article/${t.join('/')}.md`)
          .then(t => t.text())
          .then(t => {
            ;(this.sourceCode = t), (this.MarkdownHtml = _.render(t)), (this.loading = !1)
          })
      },
      showCode() {
        this.dialogData.visible = !0
      }
    },
    async created() {
      await this.fetchData()
      const { listData: t } = this,
        [e, i] = this.categorie,
        a = t[e].find(t => t.name === i).title
      this.articleTitle = a
    }
  },
  function () {
    var t = this,
      e = t.$createElement,
      i = t._self._c || e
    return i(
      'div',
      [
        i(
          'el-card',
          { directives: [{ name: 'loading', rawName: 'v-loading', value: t.loading, expression: 'loading' }] },
          [
            i(
              'div',
              {
                staticStyle: { display: 'flex', 'justify-content': 'space-between' },
                attrs: { slot: 'header' },
                slot: 'header'
              },
              [
                i('span', [t._v(t._s(t.articleTitle))]),
                t._v(' '),
                i('el-tooltip', { attrs: { effect: 'dark', content: 'Markdown源码', placement: 'top-start' } }, [
                  i('i', { staticClass: 'el-icon-share', on: { click: t.showCode } })
                ])
              ],
              1
            ),
            t._v(' '),
            i('div', { staticClass: 'markdown-container', domProps: { innerHTML: t._s(t.MarkdownHtml) } })
          ]
        ),
        t._v(' '),
        i(
          'el-dialog',
          {
            staticClass: 'dialog-markdown',
            attrs: { visible: t.dialogData.visible, width: '95%', top: '50px', title: t.dialogData.title },
            on: {
              'update:visible': function (e) {
                return t.$set(t.dialogData, 'visible', e)
              }
            }
          },
          [i('pre', { domProps: { innerHTML: t._s(t.sourceCode) } })]
        )
      ],
      1
    )
  },
  [],
  !1,
  function (t) {
    for (let e in f) this[e] = f[e]
  },
  null,
  null,
  null
).exports
const y = {}
var T = g(
  {
    components: { List: m, Detail: b },
    data: () => ({
      loading: !0,
      mobileOpen: !1,
      DATA_META: u,
      DATA_NAV: p,
      DATA_ARTICLE: {},
      validHashList: [],
      defaultActive: '',
      categorie: '',
      pageType: ''
    }),
    methods: {
      onClickOpen(t) {
        ;(this.mobileOpen = !0), t.stopPropagation()
      },
      onClickTopbar(t) {
        t.stopPropagation()
      },
      onSelectMenu(t, e) {
        window.location.hash = 'index' === e[0] ? '' : e[0]
      },
      async fetchData() {
        return fetch('https://raw.githubusercontent.com/shuoshubao/blog/master/data/db.json')
          .then(t => t.json())
          .then(t => {
            ;(this.DATA_ARTICLE = t), (this.loading = !1)
          })
          .catch(() => {
            this.loading = !1
          })
      },
      validateUrl() {
        const { DATA_ARTICLE: t } = this
        this.validHashList = Object.entries(t).reduce(
          (t, [e, i]) => (t.push(e, ...i.map(t => [e, t.name].join('/'))), t),
          ['', 'index']
        )
      },
      onHashchange() {
        const t = window.location.hash.substring(1),
          [e, i = ''] = t.split('/')
        this.validHashList.includes(t)
          ? t.includes('/')
            ? this.renderDetail(e, i.split('?')[0])
            : this.renderList(e)
          : this.renderError()
      },
      renderList(t) {
        ;(this.pageType = 'list'), (this.categorie = t)
      },
      renderDetail(t, e) {
        ;(this.pageType = 'detail'), (this.categorie = [t, e])
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
    var t = this,
      e = t.$createElement,
      i = t._self._c || e
    return i(
      'div',
      {
        directives: [{ name: 'loading', rawName: 'v-loading', value: t.loading, expression: 'loading' }],
        staticStyle: { height: '100%' }
      },
      [
        i('div', { staticClass: 'ss-topbar-mobile' }, [
          i('div', { staticClass: 'topbar-inner' }, [
            i('span', { staticClass: 'el-icon-s-operation', on: { click: t.onClickOpen } })
          ])
        ]),
        t._v(' '),
        i(
          'el-container',
          { staticClass: 'ss-container' },
          [
            i(
              'el-aside',
              {
                class: ['ss-aside', { open: t.mobileOpen }],
                attrs: { width: '150px' },
                on: { click: t.onClickTopbar }
              },
              [
                i(
                  'div',
                  { staticClass: 'aside-inner' },
                  [
                    i(
                      'el-menu',
                      { attrs: { 'default-active': t.defaultActive }, on: { select: t.onSelectMenu } },
                      t._l(t.DATA_NAV, function (e, a) {
                        return i('el-menu-item', { key: a, attrs: { index: e.categorie } }, [
                          i('i', { staticClass: 'el-icon-menu' }),
                          t._v(' '),
                          i('span', { attrs: { slot: 'title' }, slot: 'title' }, [t._v(t._s(e.text))])
                        ])
                      }),
                      1
                    )
                  ],
                  1
                )
              ]
            ),
            t._v(' '),
            i(
              'el-main',
              { key: [t.pageType, t.categorie].join('_'), staticClass: 'ss-main' },
              [
                'list' === t.pageType
                  ? i('List', { attrs: { categorie: t.categorie, 'list-data': t.DATA_ARTICLE } })
                  : t._e(),
                t._v(' '),
                'detail' === t.pageType
                  ? i('Detail', { attrs: { categorie: t.categorie, 'list-data': t.DATA_ARTICLE } })
                  : t._e(),
                t._v(' '),
                'error' === t.pageType
                  ? i(
                      'div',
                      [i('el-alert', { attrs: { title: '您访问的博客不存在', type: 'error', closable: !1 } })],
                      1
                    )
                  : t._e()
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
  function (t) {
    for (let e in y) this[e] = y[e]
  },
  '5cedb52f',
  null,
  null
).exports
d.use(h), new d({ render: t => t(T) }).$mount('#app')
