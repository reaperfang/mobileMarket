<template>
    <zdialog :visible.sync="visible" title="新增规格" :showFooter="showFooter">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
        </el-form>

        <div style="margin-top: 10px;">
            <el-button @click="submit" type="primary">确认</el-button>
        </div>
    </zdialog>
</template>
<script>
import zdialog from '@/components/Dialog'

export default {
    data() {
        return {
            showFooter: false,
            ruleForm: {
                name: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        submit() {
            this.$emit('submit', this.arr)
            this.visible = false
        },
        handleChange(val) {
            this.arr = val
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
            return '是否将此分类其下的全部商品转移到其他分类中？'
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
        zdialog
    }
}
</script>
<style lang="scss">
    ul li {
        margin: 10px 0;
    }
    /deep/ .el-button.el-button--small {
        color: #fff!important;
    }
</style>


