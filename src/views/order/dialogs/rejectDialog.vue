<template>
    <DialogBase :visible.sync="visible" @submit="submit" :title="title" width="500px" :showFooter="showFooter">
        <div>
            <p>拒绝申请可能会受到客户ID差评，如果确定拒绝售后，请选择拒绝原因：</p>
            <el-radio v-model="refuseReason" label="1">人为破坏拒绝售后</el-radio>
            <el-radio v-model="refuseReason" label="2">其他</el-radio>
            <div class="footer">
                <el-button>取消</el-button>
                <el-button @click="submit" type="primary">确定</el-button>
            </div>
        </div>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'

export default {
    data() {
        return {
            showFooter: false,
            refuseReason: ''
        }
    },
    methods: {
        submit() {
            this.$emit('audit', this.auditStatus)
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
    },
    props: {
        data: {

        },
        dialogVisible: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
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
       margin-top: 140px;
   }
</style>


