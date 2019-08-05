/*待审核 */
<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="提现详情" :hasCancel="hasCancel">
        <div class="c_container clearfix">
            <div class="c_top">
                <p>客户ID：13128098</p>
                <p>提现金额：<span>￥500.00</span></p>
                <p>提现编号：43746374685348536</p>
            </div>
            <div class="c_steps">
                <el-steps direction="vertical" :active="1">
                    <el-step title="提交申请" description="账户可用余额冻结 ￥500.00 交易流水 8236876238"></el-step>
                    <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
                </el-steps>
            </div>
        </div> 
    </DialogBase>
</template>
<script>
import clientApi from '@/api/client';
import DialogBase from '@/components/DialogBase'
export default {
    name: "withdrawDialog",
    props: ['data'],
    data() {
        return {
            hasCancel: true
        }
    },
    methods: {
        submit() {
            this.$emit('handleSubmit')
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
        }
    },
    mounted() {
        
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
/deep/.el-step__icon.is-text{
    border-radius: 0; 
    border: none;
    border-color: none;
}
.c_container{
    text-align: left;
    .c_top{
        border-bottom: 1px solid #CACFCB;
        padding-bottom: 20px;
        p{
            font-size: 16px;
            margin-bottom: 10px;
            span{
                color: #FD4C2B;
            }
            &.gray{
                color: #9FA29F;
            }
        }
    }
    .c_steps{
        float: right;
        padding-top: 17px;
        width: 54%;
        height: 160px;
        text-align: center;
    }
}
</style>


