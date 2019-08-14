<template>
    <DialogBase :visible.sync="visible" title="定时上架" :showFooter="showFooter">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
            <el-form-item label="设定上架时间" prop="time">
                <el-date-picker
                    v-model="ruleForm.time"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd hh:mm:ss">
                </el-date-picker>
            </el-form-item>
            <el-form-item class="footer">
                <el-button @click="onSubmit" type="primary">上 架</el-button>
                <el-button @click="visible = false">取 消</el-button>
            </el-form-item>
        </el-form>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'

export default {
    data() {
        return {
            showFooter: false,
            ruleForm: {
                time: ''
            },
            rules: {
                time: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        onSubmit() {
           this.$emit('submit', this.ruleForm.time)
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
        margin-top: 85px;
    }
</style>


