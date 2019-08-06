/* 失败 */
<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="提现详情" :hasCancel="hasCancel">
        <div class="c_container clearfix">
            <div class="c_top">
                <p>客户ID：13128098</p>
                <p>提现金额：<span>￥500.00</span></p>
                <p class="gray">提现编号：43746374685348536</p>
                <div class="c_status">
                    <p>失败</p>
                    <span>审核未通过</span>
                    <span>操作人：店员1</span>
                    <span>操作时间：2019-06-06 12:00:00</span>
                </div>
            </div>
            <div class="c_steps clearfix">
                <div class="c_step_l">
                    <span class="c_green"></span>
                    2019-06-01 10：56：23
                </div>
                <div class="c_step_r">
                    <p>申请驳回</p>
                    <p>提现申请被商家驳回，账户可用余额返还￥500.00</p>
                    <p>交易流水号 8236876238</p>
                </div>
            </div>
            <div class="c_steps clearfix">
                <div class="c_step_l gray">
                    <span class="c_green"></span>
                    2019-06-01 10：56：23
                </div>
                <div class="c_step_r">
                    <p>提交申请</p>
                    <p>账户可用余额冻结 ￥500.00</p>
                    <p>交易流水 8236876238</p>
                </div>
            </div>
            <div class="c_bottom clearfix">
                <div class="fl">
                    审核未通过原因：
                </div>
                <div class="fl gray">
                    为啥没有通过不拉不拉不拉得得得为啥没有通过不拉不拉不拉得得得为啥没有通过不拉不拉不拉得得得为啥没有通过不拉不拉不拉得得得为啥没有通过不拉不拉不拉得得得为啥没有通过不拉不拉不拉得得得
                </div>
            </div>
        </div> 
    </DialogBase>
</template>
<script>
import clientApi from '@/api/client';
import DialogBase from '@/components/DialogBase'
export default {
    name: "failAuditDialog",
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
.gray{
    color: #9FA29F;
}
.c_container{
    text-align: left;
    .c_top{
        border-bottom: 1px solid #CACFCB;
        padding-bottom: 20px;
        margin-bottom: 27px;
        position: relative;
        > p{
            font-size: 16px;
            margin-bottom: 10px;
            span{
                color: #FD4C2B;
            }
        }
        .c_status{
            position: absolute;
            color: #44434B;
            font-size: 24px;
            top: 0;
            right: 12px;
            span{
                display: block;
                color: #9FA29F;
                font-size: 12px;
                margin-top: 5px;
            }
        }
    }
    .c_steps{
        .c_step_l{
            float: left;
            width: 200px;
            height: 80px;
            border-right: 1px solid #dadadc;
            position: relative;
            .c_green{
                display: block;
                width: 5px;
                height: 5px;
                background-color: #3EB488;
                position: absolute;
                right: -3px;
                top: -3px;
                border-radius: 2.5px;
            }
        }
        .c_step_r{
            float: left;
            width: 336px;
            p{
                color: #9FA29F;
                margin: 0 0 5px 32px;
                overflow: hidden;
                &:first-child{
                    color: #333;
                }
            }
        }
    }
    .c_bottom{
        padding-top: 20px;
        border-top: 1px solid #dadadc;
        div:first-child{
            width: 120px;
        }
        div:last-child{
            width: 400px;
            line-height:19px;
        }
    }
}
</style>


