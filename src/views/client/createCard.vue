<template>
    <div class="l_container">
        <p class="l_title">基本信息：</p><br>
        <div class="level_order"><span class="red">*</span>会员卡等级：{{cardData.alias}}</div>
        <div class="form_container">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right">
                <el-form-item label="会员卡名称：" prop="name">
                    <div class="input_wrap">
                        <el-input v-model="ruleForm.name" placeholder="请输入会员卡名称，比如金卡"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="背景设置：" prop="backgroundType">
                    <el-radio v-model="ruleForm.backgroundType" label="0">背景色：</el-radio>
                    <colorPicker v-model="ruleForm.background"></colorPicker ><br>
                    <el-radio v-model="ruleForm.backgroundType" label="1" style="margin-left: 93px">背景图：</el-radio>
                </el-form-item>
                <el-form-item label="领取条件：" prop="receiveSetting">
                    <el-radio v-model="ruleForm.receiveSetting" label="0">可直接领取</el-radio><br>
                    <el-radio v-model="ruleForm.receiveSetting" label="1" style="margin-left: 93px" @change="showSpacialDialog">满足特定条件</el-radio>
                </el-form-item>
                <div class="line"></div>
                <p class="l_title" style="margin-left: -19px;">权益礼包：</p><br>
                <el-form-item label="会员卡权益:">
                    <el-form-item v-if="getIndex(this.rightsList,'优先发货') !== -1">
                        <el-checkbox v-model="right1">优先发货</el-checkbox>
                    </el-form-item>
                    <el-form-item style="margin-left: 87px" v-if="getIndex(this.rightsList,'积分回馈倍率') !== -1">
                        <el-checkbox v-model="right2">积分回馈倍率</el-checkbox>
                        <div class="input_wrap3">
                            <el-input placeholder="请输入数字" v-model="jfhkbl"></el-input>
                        </div>
                        <span>倍</span>
                        <span class="gray">(当前积分兑换率：1元1积分)</span>
                    </el-form-item>
                </el-form-item>
                <el-form-item label="特权说明：" prop="explain">
                    <div class="input_wrap4">
                        <el-input type="textarea" :rows="5" placeholder="请输入该等级或会员卡通用的特权说明，最多不超过250个字符" v-model="ruleForm.explain"></el-input>
                    </div>
                </el-form-item>
                <p class="l_title" style="margin-left: -19px;">领取礼包:</p><br>
                <el-form-item v-if="getIndex(this.rewardList,'赠送积分') !== -1">
                    <el-checkbox v-model="upgrade1">赠送积分</el-checkbox>
                    <span>送</span>
                    <div class="input_wrap3">
                        <el-input placeholder="填写数字" v-model="zsjf"></el-input>
                    </div>
                    <span>积分</span>
                </el-form-item>
                <el-form-item v-if="getIndex(this.rewardList,'赠送红包') !== -1">
                    <el-checkbox v-model="upgrade2" @change="showRedDialog" class="fl">赠送红包</el-checkbox>
                    <div class="giftList">
                        <div v-for="(item, index) in selectedReds" :key="item.id">
                            <span>{{ item.name }}</span>
                            <span style="margin-left:20px" class="pointer" @click="deleteRed(index)">删除</span>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item v-if="getIndex(this.rewardList,'赠送赠品') !== -1">
                    <el-checkbox v-model="upgrade3" @change="showGiftDialog" class="fl">赠送赠品</el-checkbox>
                    <div class="giftList">
                        <div v-for="(item, index) in selectedGifts" :key="item.id">
                            <span>{{ item.goodsName }}</span>
                            <el-input-number v-model="item.number"></el-input-number>
                            <span style="margin-left:20px" class="pointer" @click="deleteGift(index)">删除</span>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item v-if="getIndex(this.rewardList,'赠送优惠券') !== -1">
                    <el-checkbox v-model="upgrade4" @change="showCouponDialog" class="fl">赠送优惠券</el-checkbox>
                    <div class="giftList">
                        <div v-for="(item, index) in selectedCoupons" :key="item.id">
                            <span>{{ item.name }}</span>
                            <el-input-number v-model="item.number"></el-input-number>
                            <span style="margin-left:20px" class="pointer" @click="deleteCoupon(index)">删除</span>
                        </div>
                    </div>
                </el-form-item>
                <div class="line"></div>
                <p class="l_title" style="margin-left: -19px;">同步微信卡包：</p><br>
                <el-form-item label="是否同步到微信卡包：" prop="isSyncWechat">
                    <el-radio v-model="ruleForm.isSyncWechat" label="1">是</el-radio>
                    <el-radio v-model="ruleForm.isSyncWechat" label="0">否</el-radio>
                </el-form-item>
                <el-form-item label="使用须知：" prop="notice">
                    <div class="input_wrap4">
                        <el-input type="textarea" :rows="5" placeholder="请输入会员卡通用使用须知，最多不超过100字符" v-model="ruleForm.notice"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="客户电话：" prop="phone">
                    <div class="input_wrap">
                        <el-input v-model="ruleForm.phone" placeholder="请输入联系电话"></el-input>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <div class="btn_container midText">
            <el-button type="primary" @click="save">保 存</el-button>
            <el-button @click="_routeTo('cardManage')">返 回</el-button>
        </div>
        <component 
            :is="currentDialog" 
            :dialogVisible.sync="dialogVisible" 
            :data="currentData" 
            @getCondition="getCondition"
            @getSelectedCoupon="getSelectedCoupon"
            @getSelectedRed="getSelectedRed"
            @getSelection="getSelection" 
        >
        </component>
    </div>
</template>
<script type="es6">
import createCardDialog from './dialogs/createCard/createCardDialog';
import redListDialog from './dialogs/levelInfo/redListDialog';
import giftListDialog from './dialogs/levelInfo/giftListDialog';
import couponListDialog from './dialogs/levelInfo/couponListDialog';
export default {
    name: 'createCard',
    components: { createCardDialog, redListDialog, giftListDialog, couponListDialog },
    data() {
        return {
            fileList: [],
            ruleForm:{
                name: "",
                backgroundType: "",
                background: "",
                receiveSetting:"",
                explain:"",
                isSyncWechat: "",
                notice:"",
                phone:""
            },
            rules: {
                name: [
                    {required: true, message: '请输入会员卡名称', trigger: 'blur' },
                    {max: 9, message: "不能超过9个文字",trigger: 'blur'}
                ],
                backgroundType: [
                    {required: true, message: '请选择背景设置', trigger: 'blur' }
                ],
                receiveSetting: [
                    {required: true, message: '请选择领取条件', trigger: 'blur' }
                ],
                explain: [
                    {required: true, message: '请输入特权说明', trigger: 'blur' }
                ],
                isSyncWechat: [
                    {required: true, message: '请选择是否同步到微信卡包', trigger: 'blur' }
                ],
                notice: [
                    {required: true, message: '请输入使用须知', trigger: 'blur' }
                ],
                phone: [
                    {required: true, message: '请输入客户电话', trigger: 'blur' }
                ]
            },
            right1:"",
            right2:"",
            jfhkbl:"",
            zsjf:"",
            upgrade1:"",
            upgrade2:"",
            upgrade3:"",
            upgrade4:"",

            currentDialog:"",
            currentData: {},
            dialogVisible: false,
            cardData: this.$route.query.cardData,
            rightsList: [],
            conditionList: [],
            rewardList:[],
            selectedCoupons:[],
            selectedGifts:[],
            selectedReds:[],
            levelConditionValueDto:{}
        }
    },
    methods: {
        getCardInfo() {
            let id = this.$route.query.cardData.id;
            this._apis.client.getCardInfo({id: id}).then((response) => {
                response.backgroundType = response.backgroundType.toString();
                response.isSyncWechat = response.isSyncWechat.toString();
                response.receiveSetting = response.receiveSetting.toString();
                this.ruleForm = Object.assign({}, response);
                console.log(this.ruleForm);
                //用于回显领取条件
                this.currentData.conditionData = { name: this.ruleForm.levelConditionInfoView.name, value: this.ruleForm.levelConditionValueView.conditionValue};
                console.log(this.currentData.conditionData);
            }).catch((error) => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            })
        },
        getIndex(arr, val) {
            let i = arr.findIndex((value,index,arr) => {
                return value.name == val;
            });
            return i;
        },
        getId(arr, val) {
            let id = "";
            arr.map((v) => {
                if(v.name == val) {
                    id = v.id
                }
            });
            return id;
        },
        handlePicturePreview(file) {
            console.log(file);
        },
        getRightsList() {
            this._apis.client.getRightsList({rightsType:1}).then((response) => {
                let _arr = [];
                response.map((v) => {
                    let _obj = {}
                    _obj.name = v.name;
                    _obj.id = v.id;
                    _arr.push(_obj);
                })
                this.rightsList = [].concat(_arr);
            }).catch((error) => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            })
        },
        getConditionList() {
            this._apis.client.levelConditionList({type: 1}).then((response) => {
                let _arr = [];
                response.map((v) => {
                    let _obj = {}
                    _obj.name = v.name;
                    _obj.id = v.id;
                    _arr.push(_obj);
                })
                this.conditionList = [].concat(_arr);
            }).catch((error) => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            })
        },
        getRewardList() {
            this._apis.client.getRewardList({type: 1}).then((response) => {
                let _arr = [];
                response.map((v) => {
                    let _obj = {}
                    _obj.name = v.name;
                    _obj.id = v.id;
                    _arr.push(_obj);
                })
                this.rewardList = [].concat(_arr);
            }).catch((error) => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            })
        },
        showSpacialDialog(val) {
            this.dialogVisible = true;
            this.currentDialog = "createCardDialog";
            this.currentData.conditionList = this.conditionList;
        },
        showRedDialog(val) {
            if(val) {
                this.dialogVisible = true;
                this.currentDialog = "redListDialog";
            }else{
                this.dialogVisible = false;
            }
        },
        showGiftDialog(val) {
            if(val) {
                this.dialogVisible = true;
                this.currentDialog = "giftListDialog";
            }else{
                this.dialogVisible = false;
            }
        },
        showCouponDialog(val) {
            if(val) {
                this.dialogVisible = true;
                this.currentDialog = "couponListDialog";
            }else{
                this.dialogVisible = false;
            }
        },
        getCondition(val) {
            this.levelConditionValueDto = Object.assign({}, val);
        },
        getSelectedCoupon(obj) {
            obj.selection.map((v) => {
                v.number = 1
            });
            this.selectedCoupons = [].concat(obj.selection);
        },
        getSelectedRed(obj) {
            this.selectedReds = [].concat(obj.selection);
        },
        getSelection(obj) {
            obj.selection.map((v) => {
                v.number = 1
            });
            this.selectedGifts = [].concat(obj.selection);
        },
        deleteRed(index) {
            this.selectedReds.splice(index, 1);
        },
        deleteCoupon(index) {
            this.selectedCoupons.splice(index, 1);
        },
        deleteGift(index) {
            this.selectedGifts.splice(index,1);
        },
        save() { 
            if(this.ruleForm.id) {
                let formObj = {}
                formObj.id = this.ruleForm.id;
                formObj.alias = this.ruleForm.alias;
                formObj.level = this.ruleForm.level;
                formObj.enable = this.ruleForm.enable;
                formObj.backgroundType = this.ruleForm.backgroundType;
                formObj.background = this.ruleForm.background;
                formObj.receiveSetting = this.ruleForm.receiveSetting;
                formObj.isSyncWechat = this.ruleForm.isSyncWechat;
                formObj.notice = this.ruleForm.notice;
                formObj.phone = this.ruleForm.phone;
                formObj.explain = this.ruleForm.explain;
                formObj.levelConditionValueDto = this.levelConditionValueDto;
                formObj.receiveConditionsRemarks = "" + this.levelConditionValueDto.label + this.levelConditionValueDto.conditionValue;
                delete formObj.levelConditionValueDto.label;
                let rightsDtoList = [];
                if(this.right1) {
                    let rightParam1 = {};
                    rightParam1.rightsInfoId = this.getId(this.rightsList, '优先发货');
                    rightParam1.levelType = 1;
                    rightParam1.label = "优先发货";
                    rightsDtoList.push(rightParam1);
                }
                if(this.right2) {
                    if(this.jfhkbl == "") {
                        this.$notify({
                            title: '警告',
                            message: '请输入积分回馈倍率数',
                            type: 'warning'
                        });
                    }else{
                        let rightParam2 = {};
                        rightParam2.rightsInfoId = this.getId(this.rightsList, '积分回馈倍率');
                        rightParam2.levelType = 1;
                        rightParam2.rightsValue = this.jfhkbl;
                        rightParam2.label = "积分回馈倍率";
                        rightsDtoList.push(rightParam2);
                    }
                }
                let rights = "";
                rightsDtoList.map((v) => {
                    rights += "" + v.label + v.rightsValue + ','
                });
                rights = rights.replace(/undefined/g,'');
                rightsDtoList.map((v) => { delete v.label });
                let upgradeRewardDtoList = [];
                if(this.upgrade1) {
                    if(this.zsjf == "") {
                        this.$notify({
                            title: '警告',
                            message: '请输入赠送积分数',
                            type: 'warning'
                        });
                    }else{
                        let upgradeParams1 = {};
                        upgradeParams1.upgradeRewardInfoId = this.getId(this.rewardList,'赠送积分');
                        upgradeParams1.levelType = 1;
                        upgradeParams1.giftNumber = this.zsjf;
                        upgradeParams1.label = "赠送积分";
                        upgradeRewardDtoList.push(upgradeParams1);
                    }
                }
                if(this.upgrade2) {
                    if(this.selectedReds.length == 0) {
                        this.$notify({
                            title: '警告',
                            message: '请选择红包',
                            type: 'warning'
                        });
                    }else{
                        this.selectedReds.map((v) => {
                            let obj = {};
                            obj.upgradeRewardInfoId = this.getId(this.rewardList,'赠送红包');
                            obj.levelType = 1;
                            obj.giftProduct = v.id;
                            obj.label = "赠送红包";
                            upgradeRewardDtoList.push(obj);
                        })
                    }
                }
                if(this.upgrade3) {
                    if(this.selectedGifts.length == 0) {
                        this.$notify({
                            title: '警告',
                            message: '请选择赠品',
                            type: 'warning'
                        });
                    }else{
                        this.selectedGifts.map((v) => {
                            let obj = {};
                            obj.upgradeRewardInfoId = this.getId(this.rewardList,'赠送赠品');
                            obj.giftProduct = v.id;
                            obj.levelType = 1;
                            obj.label = "赠送赠品";
                            obj.giftNumber = v.number;
                            upgradeRewardDtoList.push(obj);
                        })
                    }
                }
                if(this.upgrade4) {
                    if(this.selectedCoupons.length == 0) {
                        this.$notify({
                            title: '警告',
                            message: '请选择优惠券',
                            type: 'warning'
                        });
                    }else{
                        this.selectedCoupons.map((v) => {
                            let obj = {};
                            obj.upgradeRewardInfoId = this.getId(this.rewardList,'赠送优惠券');
                            obj.giftProduct = v.id;
                            obj.levelType = 1;
                            obj.giftNumber = v.number;
                            obj.label = "赠送优惠券"
                            upgradeRewardDtoList.push(obj);
                        })
                    }
                }
                let upgradePackage = "";
                let upgradeArr = [];
                upgradeRewardDtoList.map((v) => {
                    if(upgradeArr.indexOf(v.label) == -1) {
                        upgradeArr.push(v.label);
                        upgradePackage += "" + v.label + ','
                    }
                });
                upgradePackage = upgradePackage.replace(/undefined/g,'');
                upgradeRewardDtoList.map((v) => {
                    if(v.label) {
                        delete v.label;
                    }
                });
                formObj.upgradePackage = upgradePackage;
                formObj.rights = rights;
                formObj.levelRightsInfoDtoList = [].concat(rightsDtoList);
                formObj.upgradeRewardDtoList = [].concat(upgradeRewardDtoList);
                console.log(formObj);
                this._apis.client.editCard(formObj).then((response) => {
                    this.$notify({
                        title: '成功',
                        message: "编辑成功",
                        type: 'success'
                    });
                }).catch((error) => {
                    this.$notify.error({
                        title: '错误',
                        message: error
                    });
                })
            }
        }
    },
    mounted() {
        this.getCardInfo();
        this.getRightsList();
        this.getConditionList();
        this.getRewardList();
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .el-upload{
    height: 30px !important;
    line-height: 30px !important;
}
.l_container{
    padding: 20px;
    background-color: #fff;
    .level_order{
        color:#3D434A;
        margin: 20px;
        .red{
            color: #FD4C2B;
        }
    }
    .icon_title{
        float: left;
        margin: 17px 0 0 30px;
        color:#44434B;
    }
    .upload_btn{
        float: left;
        margin: 8px 0 0 13px;
    }
    .l_warn{
        color: #92929B;
        font-size: 12px;
    }
    .level_icon{
        float: left;
        width: 45px;
        height: 45px;
        display: block;
        background-color: #eee;
        border-radius: 22.5px;
    }
    .form_container{
        color: #44434B;
        padding: 0 20px;
        .input_wrap{
            width: 338px;
            display: inline-block;
        }
        .input_wrap2{
            width: 160px;
            display: inline-block;
            .color_block{
                display: inline-block;
                width: 24px;
                height: 24px;
                background-color: #FD4C2B;
            }
        }
        .input_wrap3{
            width: 100px;
            display: inline-block;
        }
        .input_wrap4{
            width: 588px;
            display: inline-block;
        }
        .line{
            height: 1px;
            border-bottom: 1px dashed #D3D3D3;
            margin-bottom: 18px;
        }
        .radio_line{
            margin: 0 0 10px 20px;
        }
        .giftList{
            float: left;
            width: 500px;
            margin-left: 10px;
            > div{
                margin-bottom: 10px;
            }
        }
    }
    
}
</style>