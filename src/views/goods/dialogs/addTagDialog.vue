<template>
    <DialogBase :visible.sync="visible" title="新增标签" :showFooter="showFooter">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标签名称：" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
                <p class="description">仅支持展示最多2个字的文本标签</p>
            </el-form-item>
            <el-form-item label="状态：" prop="state">
                <el-radio v-model="ruleForm.state" label="1">启用</el-radio>
                <el-radio v-model="ruleForm.state" label="2">禁用</el-radio>
            </el-form-item>
        </el-form>
        <div class="footer">
            <el-button @click="submit" type="primary">保 存</el-button>
            <el-button @click="visible = false">取 消</el-button>
        </div>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'

export default {
    data() {
        return {
            showFooter: false,
            ruleForm: {
                name: '',
                state: ''
            },
            rules: {
                name: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
                state: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        submit() {
            this.visible = false
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
    .footer {
        text-align: center;
        margin-top: 47px;
    }
    /deep/ .el-input {
        width: auto;
    }
</style>


