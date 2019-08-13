<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="加入黑名单" :hasCancel="hasCancel">
        <div class="c_container">
            <p class="user_id">用户ID：0001</p>
            <div class="clearfix">
                <p class="c_label fl">禁用选择：</p>
                <el-checkbox v-model="blackCheck1" label="优惠券" class="fl marT10"></el-checkbox>
                <div class="form_container fl">
                    <div class="a_d">
                        <el-select v-model="coupon" style="margin-bottom: 10px">
                            <el-option label="漏洞优惠券" value="1"></el-option>
                            <el-option label="优惠券1" value="2"></el-option>
                            <el-option label="优惠券2" value="3"></el-option>
                        </el-select>
                        <span class="marL20 addMainColor">删除</span>
                    </div>
                </div>
                <span class="add">添加</span>
            </div>
            <div class="check_container">
                <el-checkbox v-model="blackCheck1" label="积分冻结" class="marB10"></el-checkbox><br>
                <el-checkbox v-model="blackCheck1" label="冻结余额" class="marB10"></el-checkbox><br>
                <el-checkbox v-model="blackCheck1" label="下单购买" class="marB10"></el-checkbox><br>
                <el-checkbox v-model="blackCheck1" label="登录系统" class="marB10"></el-checkbox>
            </div>
            <p class="red">提示：积分、余额和优惠券属于虚拟资产，冻结可能会产品生法律风险，请谨慎操作。</p>
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
        getBlackChecks() {
            this._apis.client.blackChecks({}).then((response) => {
                console.log(response);
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
        this.getBlackChecks();
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
.form_container{
    width: 266px;
    .a_d{
        text-align: left;
    }
}
.add{
    float: left;
    color: #655EFF;
    margin: 8px 0 0 5px;
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


