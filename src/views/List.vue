<template>
    <el-card>
        <div slot="header">
            <span>共</span>
            <el-link type="primary">{{ list.length }}</el-link>
            <span>篇文章</span>
        </div>
        <div v-for="(v, i) in list" style="padding: 10px 0; line-height: 20px" :key="i">
            <el-link :href="`#${[v.categorie || categorie, v.name].join('/')}`" type="primary">{{ v.title }}</el-link>
        </div>
    </el-card>
</template>
<script>
import { DATA_NAV } from '@/config';

export default {
    props: {
        categorie: {
            type: String
        },
        listData: {
            type: Object
        }
    },
    data() {
        const { categorie, listData } = this;
        let list = [];
        if (['index', ''].includes(categorie)) {
            list = DATA_NAV.map(v => v.categorie)
                .filter(v => v !== 'index')
                .reduce((prev, cur) => {
                    prev.push(
                        ...listData[cur].map(v => {
                            return {
                                ...v,
                                categorie: cur
                            };
                        })
                    );
                    return prev;
                }, []);
        } else {
            list = listData[categorie];
        }
        return {
            list
        };
    }
};
</script>
