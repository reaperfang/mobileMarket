<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="发放会员卡" :hasCancel="hasCancel">
        <div class="c_container">
            <p class="user_id">会员卡：金卡</p>
            <div class="clearfix">
                <p class="c_label fl">发放人群：</p>
                <div class="fl">

                </div>
            </div> 
            <p class="red">确定给女性用户、年轻用户发放会员卡：金卡吗？</p>
        </div>
    </DialogBase>
</template>
<script>
import clientApi from '@/api/client';
import DialogBase from '@/components/DialogBase'
export default {
    name: "addBlackDialog",
    props: ['data'],
    data() {
        return {
            hasCancel: true,
            blackCheck1: false,
            coupon:""
        }
    },
    methods: {
        submit() {
            
        },
        getLabels() {
            console.log(1);
            let params = { cid: 2, tagType: null }
            this._apis.client.getLabels(params).then((response) => {
                console.log(response);
            }).catch((error) => {
                this.$message.error(error);
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
        this.getLabels();
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
.user_id{
    text-align: left;
    padding: 0 0 10px 15px;
}
.c_label{
    width: 100px;
    padding-top: 7px;
}

.check_container{
    text-align: left;
    padding-left: 100px;
}
.red{
    color: #F55858;
    margin-top: 15px;
}
</style>


