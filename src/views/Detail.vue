<template>
    <div>
        <el-card v-loading="loading">
            <div slot="header" style="display: flex; justify-content: space-between">
                <span>{{ articleTitle }}</span>
                <el-tooltip effect="dark" content="Markdown源码" placement="top-start">
                    <i class="el-icon-share" @click="showCode" />
                </el-tooltip>
            </div>
            <div v-html="MarkdownHtml" class="markdown-container" />
        </el-card>
        <el-dialog
            :visible.sync="dialogData.visible"
            width="95%"
            top="50px"
            class="dialog-markdown"
            :title="dialogData.title"
        >
            <pre v-html="sourceCode" />
        </el-dialog>
    </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import Prism from 'prismjs';
import { createElement, generateTable } from '@nbfe/js2html';
import 'prismjs/themes/prism.css';
import '@/assets/styles/highlight-table.scss';
import '@/assets/styles/markdown.scss';
import '@/assets/styles/prism.scss';

const MarkdownItHighlight = MarkdownIt({
    highlight: (str, language) => {
        const lang = language || 'javascript';
        const content = Prism.highlight(str, Prism.languages[lang], lang).trim();
        const data = content.split('\n').map((v, i) => {
            return {
                index: i + 1,
                text: v
            };
        });
        const tableHtml = generateTable(
            [
                { prop: 'index', label: '索引' },
                { prop: 'text', label: '内容' }
            ],
            data
        );
        return createElement({
            tagName: 'pre',
            attrs: {
                class: `highlight language-${lang}`
            },
            children: [tableHtml]
        });
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
            articleTitle: '',
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
            const { categorie } = this;
            fetch(`https://raw.githubusercontent.com/shuoshubao/blog/master/article/${categorie.join('/')}.md`)
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
    async created() {
        await this.fetchData();
        const { listData } = this;
        const [categorie, articleName] = this.categorie;
        const articleTitle = listData[categorie].find(v => v.name === articleName).title;
        this.articleTitle = articleTitle;
    }
};
</script>

<style lang="scss">
.dialog-markdown {
    overflow: hidden;
    .el-dialog {
        margin-top: 50px !important;
        width: 95% !important;
    }
    .el-dialog__header {
        height: 50px;
    }
    .el-dialog__body {
        max-height: calc(100vh - 150px);
        overflow: auto;
        padding: 20px;
    }
}
</style>
