<template>
    <div class="wrap-content">
        <el-row :gutter="20">
            <el-col :span="12">
                <div>源码</div>
                <el-input
                    spellcheck="false"
                    type="textarea"
                    :rows="20"
                    placeholder="请输入内容"
                    v-model="sourceCode"
                    @input="changeSourceCode"
                >
                </el-input>
            </el-col>
            <el-col :span="12">
                <div>格式化后的代码</div>
                <el-input
                    type="textarea"
                    :rows="20"
                    :disabled="true"
                    v-model="formatCode"
                >
                </el-input>
            </el-col>
        </el-row>
        <el-row style="margin-top: 10px;">
            <el-col :span="24">
                <el-card header="代码 Diff">
                    <div v-html="diffCode"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import format from './format';
import diff from './diff';


export default {
    data() {
        return {
            sourceCode: '',
            formatCode: '',
            diffCode: ''
        };
    },
    methods: {
        changeSourceCode() {
            try {
                this.formatCode = format(this.sourceCode);
                this.diffCode = diff(this.sourceCode, this.formatCode);
            } catch(e) {
                console.log(e);
                this.formatCode = e;
                this.diffCode = '';
            }
        }
    }
};
</script>

<style lang="scss">
.wrap-content {
    padding: 10px;
}
.text-danger {
    color: #b30000;
    background: #fadad7;
}
.text-success {
    color: #406619;
    background: #eaf2c2;
}
</style>
