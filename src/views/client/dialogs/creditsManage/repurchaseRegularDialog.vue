<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="复购商品获取积分规则" :hasCancel="hasCancel">
        <div class="c_container">
            <div class="clearfix"><span class="fl marR20">复购商品获取积分规则</span><el-switch class="fl" v-model="enable" active-color="#66CCAC"></el-switch></div>
            <div>复购商品，订单确认收货后，除按购买商品的金额奖励的积分外，可额外获得积分</div>
            <div>
                <span>是否区分人群发放：</span>
                <el-radio v-model="distinguish" label="0">不区分</el-radio>
                <el-radio v-model="distinguish" label="1">区分</el-radio>
            </div>
            <div v-if="distinguish == '0'">
                <span>获得</span>
                <div class="input_wrap">
                    <el-input placeholder="请输入整数"></el-input>
                </div>
                <span>积分</span>
            </div>
            <div v-if="distinguish == '1'">
                <div class="marB10">
                    <span>客户获得</span>
                    <div class="input_wrap" style="margin-left:14px">
                        <el-input placeholder="请输入整数" v-model="noMember"></el-input>
                    </div>
                </div>
                <div class="marB10">
                    <span>新会员获得</span>
                    <div class="input_wrap">
                        <el-input placeholder="请输入整数" v-model="newMember"></el-input>
                    </div>
                </div>
                <div class="marB10">
                    <span>老会员获得</span>
                    <div class="input_wrap">
                        <el-input placeholder="请输入整数" v-model="oldMember"></el-input>
                    </div>
                </div>
            </div>
        </div>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'
export default {
    props: ['data'],
    name: "repurchaseRegularDialog",
    data() {
        return {
            hasCancel: true,
            enable: false,
            distinguish: '',
            allMember:"",
            noMember:"",
            newMember:"",
            oldMember:""
        }
    },
    methods: {
        submit() {
            this.distinguish = this.distinguish == '0'? false : true;
            let params = {
                id: this.data.id,
                enable: this.enable,
                sceneRule: {
                    distinguish: this.distinguish,
                    noDistinguish: {
                        allMember: this.allMember
                    },
                    yesDistinguish: {
                        noMember: this.noMember,
                        newMember: this.newMember,
                        oldMember: this.oldMember
                    }
                }
            }
            this._apis.client.editCreditRegular(params).then((response) => {
                this.$notify({
                    title: '成功',
                    message: "保存成功",
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
    > div{
        text-align: left;
        margin-bottom: 17px;
        .input_wrap{
            width: 172px;
            display: inline-block;
        }
    }
}
</style>


