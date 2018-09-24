<script>
import MarkdownIt from 'markdown-it';
import hljs from 'util/highlight.js/lib';
import 'util/highlight.js/styles/github.css';
import 'style/highlight-table.scss';
import 'style/markdown.scss';

const MarkdownItHighlight = MarkdownIt({
    highlight: (str, language) => {
        const lang = language || 'javascript';
        const {value} = hljs.highlight(lang, str);
        if (hljs.getLanguage(lang)) {
            try {
                return [
                    `<pre class="hljs language-${lang}">`,
                    `<table>`,
                    `<tbody>`,
                    value
                        .trim()
                        .split(`\n`)
                        .map((v, i) =>
                            [
                                `<tr>`,
                                `<td data-line-number=${i + 1}></td>`,
                                `<td>${v}</td>`,
                                `</tr>`
                            ].join('')
                        )
                        .join(''),
                    `</tbody>`,
                    `</table>`,
                    `</pre>`
                ].join('');
            } catch (e) {
                throw e;
            }
        }
        return '';
    }
});

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
            sourceCode: '',
            MarkdownHtml: '',
            dialogData: {
                title: 'Markdown源码',
                visible: false
            }
        };
    },
    methods: {
        fetchData() {
            const {categorie} = this;
            fetch(
                `https://raw.githubusercontent.com/shuoshubao/blog/master/article/${categorie.join(
                    '/'
                )}.md`
            )
                .then(res => res.text())
                .then(res => {
                    this.sourceCode = res;
                    this.MarkdownHtml = MarkdownItHighlight.render(res);
                    this.loading = false;
                });
        },
        showCode() {
            this.dialogData.visible = true;
        }
    },
    created() {
        this.fetchData();
    },
    render() {
        const {MarkdownHtml, categorie: categories, listData, dialogData} = this;
        const [categorie, articleName] = categories;
        const articleTitle = listData[categorie].find(v => v.name === articleName).title;
        return (
            <div>
                <el-card v-loading={this.loading}>
                    <div slot="header" style="display: flex; justify-content: space-between;">
                        <span>{articleTitle}</span>
                        <el-tooltip effect="dark" content="Markdown源码" placement="top-start">
                            <i class="el-icon-share" onClick={this.showCode} />
                        </el-tooltip>
                    </div>
                    <div domProps-innerHTML={MarkdownHtml} class="markdown" />
                </el-card>
                <el-dialog
                    width="95%"
                    top="50px"
                    class="dialog-markdown"
                    title={dialogData.title}
                    visible={dialogData.visible}
                    {...{
                        on: {
                            'update:visible': val => {
                                this.dialogData.visible = val;
                            }
                        }
                    }}
                >
                    <pre domProps-innerHTML={this.sourceCode}></pre>
                </el-dialog>
            </div>
        );
    }
};
</script>

<style lang="scss" scoped>
.dialog-markdown {
    overflow: hidden;
    /deep/ .el-dialog {
        margin-top: 50px !important;
        width: 95% !important;
    }
    /deep/ .el-dialog__header {
        height: 50px;
    }
    /deep/ .el-dialog__body {
        max-height: calc(100vh - 150px);
        overflow: auto;
        padding: 20px;
    }
}
</style>
