<template>
    <div class="wrapper">
        <el-card>
            <div slot="header" class="clearfix">
                <span style="display: inline-block; line-height: 32px">请粘贴数据</span>
                <el-button style="float: right;" type="primary" size="small" @click="handlePretty">格式化</el-button>
            </div>
            <el-input
                type="textarea"
                :autosize="{minRows: 10}"
                placeholder="请输入内容"
                v-model="sourceCode"
            ></el-input>
        </el-card>
    </div>
</template>

<script>
import JSON5 from 'json5';

export default {
    data() {
        return {
            sourceCode: ''
        };
    },
    methods: {
        handlePretty() {
            this.sourceCode = JSON.stringify(JSON5.parse(this.sourceCode), null, 4);
        }
    }
};
</script>

<style scoped>
.wrapper {
    padding: 10px;
}
</style>
