<template>
    <div class="wrapper">
        <el-card>
            <div slot="header" class="clearfix">
                <span style="display: inline-block; line-height: 32px">格式化JSON数据</span>
                <el-button style="float: right;" type="primary" size="small" @click="handlePretty">运行</el-button>
            </div>
            <el-input
                type="textarea"
                :autosize="{minRows: 10}"
                placeholder="请粘贴JSON数据"
                @focus="clearError"
                v-model="sourceCode"
            ></el-input>
            <div v-if="errMsg">
                <div>错误信息:</div>
                <div style="color: #F56C6C;">{{errMsg}}</div>
            </div>
        </el-card>
    </div>
</template>

<script>
import JSON5 from 'json5';

export default {
    data() {
        return {
            sourceCode: '',
            errMsg: '',
        };
    },
    methods: {
        handlePretty() {
            try {
                this.sourceCode = JSON.stringify(JSON5.parse(this.sourceCode), null, 4);
            } catch (e) {
                console.log(e);
                console.log(e.message);
                this.errMsg = e.message;
            }
        },
        clearError() {
            this.errMsg = '';
        },
    },
};
</script>

<style scoped>
.wrapper {
    padding: 10px;
}
</style>
