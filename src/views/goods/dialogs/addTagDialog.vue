<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="新增标签">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标签名称：" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
                <p class="description">仅支持展示最多2个字的文本标签</p>
            </el-form-item>
            <el-form-item label="状态：" prop="state">
                <el-radio v-model="ruleForm.state" label="1">启用</el-radio>
                <el-radio v-model="ruleForm.state" label="2">禁用</el-radio>
            </el-form-item>
        </el-form>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'

export default {
    data() {
        return {
            ruleForm: {
                name: '',
                state: ''
            },
            rules: {

            }
        }
    },
    methods: {
        submit() {
            
        }
    },
    computed: {
        visible: {
            get() {
                return this.dialogVisible
            },
            set(val) {
                this.$emit('update:dialogVisible', val)
            }
        },
        contentText() {
            return '是否确认删除？'
        }
    },
    props: {
        data: {

        },
        dialogVisible: {
            type: Boolean,
            required: true
        },
    },
    components: {
        DialogBase
    }
}
</script>
<style lang="scss" scoped>
    .el-icon-warning {
        font-size: 60px;
        color: rgb(245, 88, 88);
    }
    .content-text {
        font-size: 18px;
        margin-top: 20px;
    }
</style>


