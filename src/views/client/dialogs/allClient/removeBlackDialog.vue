<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="解除黑名单" :hasCancel="hasCancel">
        <div class="c_container">
            <p>ID:<span>{{ data.memberSn }}</span></p>
            <p>当前冻结：</p>
            <div class="clearfix">
                <p class="fl">优惠券：</p>
                <div class="fl">
                    <span>漏洞优惠券</span>
                    <span>漏洞优惠券</span>
                    <span>漏洞优惠券</span>
                </div>
            </div>
            <p class="red">确定将该客户冻结权限全部解冻吗？</p>
        </div>
    </DialogBase>
</template>
<script>
import clientApi from '@/api/client';
import DialogBase from '@/components/DialogBase'
export default {
    name: 'removeBlackDialog',
    props: ['data'],
    data() {
        return {
            hasCancel: true
        }
    },
    methods: {
        submit() {
            this._apis.client.removeFromBlack({memberInfoId: this.data.id}).then((response) => {
                this.$notify({
                    title: '成功',
                    message: "解除黑名单成功",
                    type: 'success'
                });
            }).catch((error) => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            })
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
.c_container{
    p{
        text-align: left;
        margin-bottom: 20px;
        &.red{
            text-align: center;
            color: #F55858;
            margin: 20px 0 5px 0;
        }
    }
}
</style>


