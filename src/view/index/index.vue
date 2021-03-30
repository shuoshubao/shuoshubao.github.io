<template>
    <div v-loading="loading" style="height: 100%">
        <div class="ss-topbar-mobile">
            <div class="topbar-inner">
                <span class="el-icon-s-operation" @click="onClickOpen"></span>
            </div>
        </div>
        <el-container class="ss-container">
            <el-aside width="150px" :class="['ss-aside', { open: mobileOpen }]" @click="onClickTopbar">
                <div class="aside-inner">
                    <el-menu :default-active="defaultActive" @select="onSelectMenu">
                        <el-menu-item v-for="(item, index) in DATA_NAV" :key="index" :index="item.categorie">
                            <i class="el-icon-menu"></i>
                            <span slot="title">{{ item.text }}</span>
                        </el-menu-item>
                    </el-menu>
                </div>
            </el-aside>
            <el-main class="ss-main">
                <List v-if="pageType === 'list'" :categorie="categorie" :list-data="DATA_ARTICLE"></List>
                <Detail v-if="pageType === 'detail'" :categorie="categorie" :list-data="DATA_ARTICLE"></Detail>
                <div v-if="pageType === 'error'">
                    <el-alert title="您访问的博客不存在" type="error" :closable="false"></el-alert>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { DATA_META, DATA_NAV } from '@/data';
import List from './List.vue';
import Detail from './Detail.vue';

export default {
    components: {
        List,
        Detail
    },
    data() {
        return {
            loading: true,
            mobileOpen: false,
            DATA_META,
            DATA_NAV,
            DATA_ARTICLE: {},
            validHashList: [],
            defaultActive: '',
            categorie: '',
            pageType: '' // list detail error
        };
    },
    methods: {
        onClickOpen(e) {
            this.mobileOpen = true;
            e.stopPropagation();
        },
        onClickTopbar(e) {
            e.stopPropagation();
        },
        onSelectMenu(index, indexPath) {
            window.location.hash = indexPath[0] === 'index' ? '' : indexPath[0];
        },
        async fetchData() {
            return fetch('https://raw.githubusercontent.com/shuoshubao/blog/master/data/db.json')
                .then(res => res.json())
                .then(res => {
                    this.DATA_ARTICLE = res;
                    this.loading = false;
                });
        },
        validateUrl() {
            const { DATA_ARTICLE } = this;
            this.validHashList = Object.entries(DATA_ARTICLE).reduce(
                (prev, [k, v]) => {
                    prev.push(k, ...v.map(v2 => [k, v2.name].join('/')));
                    return prev;
                },
                ['', 'index']
            );
        },
        onHashchange() {
            const hash = window.location.hash.substring(1);
            const [categorie, articleName = ''] = hash.split('/');
            if (this.validHashList.includes(hash)) {
                if (hash.includes('/')) {
                    this.renderDetail(categorie, articleName.split('?')[0]);
                } else {
                    this.renderList(categorie);
                }
            } else {
                this.renderError();
            }
        },
        renderList(categorie) {
            this.pageType = 'list';
            this.categorie = categorie;
        },
        renderDetail(categorie, articleName) {
            this.pageType = 'detail';
            this.categorie = [categorie, articleName];
        },
        renderError() {
            this.pageType = 'error';
        }
    },
    mounted() {
        document.body.addEventListener('click', () => {
            this.mobileOpen = false;
        });
    },
    async created() {
        await this.fetchData();
        this.validateUrl();
        window.addEventListener('hashchange', this.onHashchange, false);
        this.onHashchange();
    }
};
</script>

<style lang="scss" scoped>
.ss-container {
    height: 100%;
    .ss-aside-mobile {
    }
    .ss-aside {
        border-right: 1px solid #e6e6e6;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        position: relative;
        .aside-inner {
            position: sticky;
            top: 0;
        }
        .el-menu {
            width: 100%;
            border-right: none;
        }
    }
    .ss-main {
        height: 100%;
        padding: 10px;
        overflow-y: auto;
    }
}

.ss-topbar-mobile {
    display: none;
    height: 40px;
    .topbar-inner {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        height: 40px;
        padding: 5px;
        line-height: 30px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);
        background-color: #fff;
    }
}
@media screen and (min-width: 900px) {
    .ss-aside {
        overflow: initial;
    }
}

@media screen and (max-width: 900px) {
    .ss-topbar-mobile {
        display: block;
    }
    .ss-container {
        .ss-aside {
            display: none;
            &.open {
                display: block;
                position: fixed;
                left: 0;
                top: 0;
                bottom: 0;
                z-index: 2;
                background: #fff;
            }
        }
        .ss-main {
            padding: 5px;
        }
    }
}
</style>
