<template>
    <DialogBase :visible.sync="visible" title="提示" width="500px" :showFooter="showFooter">
        <div class="content">
            <i class="el-icon-warning"></i>
            <p>取消后批量发货将终止，您确定要停止发货吗？</p>
            <div class="footer">
                <el-button @click="goList">停止发货</el-button>
                <el-button @click="submit" type="primary">继续发货</el-button>
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
        }
    },
    methods: {
        goList() {
            this.visible = false
            this.$router.push('/order/query')
        },
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
   .footer {
       text-align: center;
       margin-top: 40px;
   }
   .content {
       text-align: center;
       p {
           margin-top: 20px;
           font-size: 18px;
       }
   }
</style>


