<template>
  <div>
    <el-card v-loading="loading">
      <div slot="header" style="display: flex; justify-content: space-between">
        <span>{{ articleTitle }}</span>
        <el-tooltip effect="dark" content="Markdown源码" placement="top-start">
          <i class="el-icon-view" @click="showCode" />
        </el-tooltip>
      </div>
      <div v-html="MarkdownHtml" class="markdown-body" />
    </el-card>
    <el-dialog
      :visible.sync="dialogData.visible"
      width="95%"
      top="50px"
      class="dialog-markdown"
      :title="dialogData.title"
    >
      <pre v-html="sourceCode" style="margin: 0" />
    </el-dialog>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import scss from 'highlight.js/lib/languages/scss'
import less from 'highlight.js/lib/languages/less'
import json from 'highlight.js/lib/languages/json'
import plaintext from 'highlight.js/lib/languages/plaintext'
import shell from 'highlight.js/lib/languages/shell'
import bash from 'highlight.js/lib/languages/bash'
import php from 'highlight.js/lib/languages/php'
import '@/assets/styles/markdown.scss'

const copyText = (text = '') => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('css', css)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('less', less)
hljs.registerLanguage('json', json)
hljs.registerLanguage('plaintext', plaintext)
hljs.registerLanguage('shell', shell)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('php', php)

const MarkdownItHighlight = MarkdownIt({
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const { code, value } = hljs.highlight(str.trim(), { language: lang })
        return [
          '<pre>',
          `<code class="hljs language-${lang}" lang="${lang}">`,
          ...value.split('\n').map(v => {
            return `<div class="line">${v}</div>`
          }),
          '<span class="markdown-code-btns">',
          `<span class="btn-lang">${lang}</span>`,
          `<span class="el-icon-document-copy btn-copycode" data-code="${btoa(encodeURIComponent(code))}"></span>`,
          '</span>',
          '</code>',
          '</pre>'
        ].join('')
      } catch (__) {}
    }

    return ''
  }
})

export default {
  props: {
    categorie: {
      type: Array
    },
    listData: {
      type: Object
    }
  },
  data() {
    return {
      loading: true,
      articleTitle: '',
      sourceCode: '',
      MarkdownHtml: '',
      dialogData: {
        title: 'Markdown源码',
        visible: false
      }
    }
  },
  methods: {
    async fetchData() {
      const { categorie } = this
      const md = await fetch(
        `https://raw.githubusercontent.com/shuoshubao/blog/master/article/${categorie.join('/')}.md`
      ).then(res => res.text())
      this.sourceCode = md
      this.MarkdownHtml = MarkdownItHighlight.render(md)
      this.loading = false
      await this.$nextTick()
      document.querySelectorAll('.btn-copycode').forEach(v => {
        v.addEventListener('click', () => {
          const code = decodeURIComponent(atob(v.dataset.code))
          copyText(code)
          this.$message({
            message: '代码复制成功',
            type: 'success',
            duration: 2000
          })
          return false
        })
      })
    },
    showCode() {
      this.dialogData.visible = true
    }
  },
  async created() {
    await this.fetchData()
    const { listData } = this
    const [categorie, articleName] = this.categorie
    const articleTitle = listData[categorie].find(v => v.name === articleName).title
    this.articleTitle = articleTitle
  }
}
</script>

<style lang="scss">
.dialog-markdown {
  overflow: hidden;
  .el-dialog {
    margin-top: 50px !important;
    width: 95% !important;
    .el-dialog__body {
      max-height: calc(100vh - 154px);
      overflow: auto;
      padding: 10px;
      background-color: #f8f8f8;
    }
  }
}
</style>
