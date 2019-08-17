<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="加入黑名单" :hasCancel="hasCancel">
        <div class="c_container">
            <p class="user_id">用户ID：{{ data.memberSn }}</p>
            <div class="clearfix">
                <p class="c_label fl">禁用选择：</p>
                <el-checkbox v-model="checks[0].checked" label="优惠券" class="fl marT10"></el-checkbox>
                <div class="form_container fl">
                    <div class="a_d" v-for="(i,index) in couponIds" :key="index">
                        <el-select v-model="i.id" style="margin-bottom: 10px">
                            <el-option v-for="item in allCoupons" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                        <span class="marL20 addMainColor pointer" @click="deleteCoupon(index)">删除</span>
                    </div>
                </div>
                <span class="add" @click="addCouponSel">添加</span>
            </div>
            <div class="clearfix">
                <el-checkbox v-model="checks[1].checked" label="优惠码" class="fl marT10"></el-checkbox>
                <div class="form_container fl">
                    <div class="a_d" v-for="(i,index) in codeIds" :key="index">
                        <el-select v-model="i.id" style="margin-bottom: 10px">
                            <el-option v-for="item in allCodes" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                        <span class="marL20 addMainColor pointer" @click="deleteCode(index)">删除</span>
                    </div>
                </div>
                <span class="add" @click="addCodeSel">添加</span>
            </div>
            <div class="check_container">
                <el-checkbox v-for="item in checks.slice(2,checks.length)" :key="item.id" v-model="item.checked" :label="item.name" class="check_item"></el-checkbox><br>
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
            checks: [],
            couponIds: [{id:""}],
            codeIds: [{id:""}]
        }
    },
    methods: {
        submit() {
            let params = {};
            let blackListMapDtos = [];
            this.checks.map((v) => {
                if(v.checked) {
                    if(v.name == "优惠券" && this.couponIds.length !== 0) {
                        let arr = [];
                        this.couponIds.map((item) => {
                            this.allCoupons.map((i) => {
                                let obj = {};
                                if(item.id == i.id) {
                                    obj[item.id] = i.name;
                                    arr.push(obj);
                                }
                            })
                        })
                        let str = "";
                        arr.map((v) => {str += "" + JSON.stringify(v) + ','});
                        str = str.replace(/{|}/g, "");
                        str = str.substring(0, str.length - 1);
                        let obj = {
                            blackInfoId: v.id,
                            blackInfoName: v.name,
                            disableItemValue: str
                        }
                        blackListMapDtos.push(obj);
                    }else if(v.name == "优惠码" && this.codeIds.length !== 0) {
                        let arr = [];
                        this.codeIds.map((item) => {
                            this.allCodes.map((i) => {
                                let obj = {};
                                if(item.id == i.id) {
                                    obj[item.id] = i.name;
                                    arr.push(obj);
                                }
                            })
                        })
                        let str = "";
                        arr.map((v) => {str += "" + JSON.stringify(v) + ','});
                        str = str.replace(/{|}/g, "");
                        str = str.substring(0, str.length - 1);
                        let obj = {
                            blackInfoId: v.id,
                            blackInfoName: v.name,
                            disableItemValue: str
                        }
                        blackListMapDtos.push(obj);
                    }else{
                        let obj = {
                            blackInfoId: v.id,
                            disableItemValue: "1"
                        }
                        blackListMapDtos.push(obj);
                    }
                }
            });
            params.memberInfoId = this.data.id;
            params.blackListMapDtos = [].concat(blackListMapDtos);
            this._apis.client.addToBlack(params).then((response) => {
                this.$notify({
                    title: '成功',
                    message: "加入黑名单成功",
                    type: 'success'
                });
            }).catch((error) => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            })
        },
        getBlackChecks() {
            this._apis.client.blackChecks({}).then((response) => {
                response.map((v) => {
                    this.$set(v, 'checked', false);
                });
                this.checks = [].concat(response);
            }).catch((error) => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            })
        },
        addCouponSel() {
            this.couponIds.push({id: ""});
        },
        addCodeSel() {
            this.codeIds.push({id: ""});
        },
        deleteCoupon(index) {
            this.couponIds.splice(index, 1);
        },
        deleteCode(index) {
            this.codeIds.splice(index, 1);
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
        allCoupons() {
            return JSON.parse(localStorage.getItem('allCoupons'));
        },
        allCodes() {
            return JSON.parse(localStorage.getItem('allCodes'));
        }
    },
    created() {
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
    margin: 5px 0 0 15px;
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
    cursor: pointer;
}
.check_container{
    text-align: left;
    padding-left: 100px;
    .check_item{
        display: block;
        margin: 10px 0;
    }
}
.red{
    color: #F55858;
    margin-top: 15px;
}
</style>


