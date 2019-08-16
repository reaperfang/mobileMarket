<template>
    <div class="l_container">
        <p class="l_title">等级信息：</p><br>
        <div class="clearfix">
            <span class="icon_title">等级图标：</span>
            <img src="../../assets/images/client/icon_level.png" alt="" class="level_icon">
            <el-upload
                class="upload_btn"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :on-preview="handlePicturePreview"
                :limit="1"
                :file-list="fileList">
                <el-button size="small" class="border_btn">上传图片</el-button>
            </el-upload>
            <span class="l_warn fl" style="margin: 16px 0 0 10px">大小不超过2M</span>
        </div>
        <div class="level_order"><span class="red">*</span>等级序号：{{ levelName }}<span class="l_warn">（等级序号为等级在系统的排序，不展示给用户）</span></div>
        <div class="form_container">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right">
                <el-form-item label="等级称谓：" prop="name">
                    <div class="input_wrap">
                        <el-input v-model="ruleForm.name" placeholder="请输入等级名称，比如普通会员"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="等级说明：">
                    <div class="input_wrap">
                        <el-input v-model="ruleForm.explain" placeholder="请输入等级描述"></el-input>
                    </div>
                </el-form-item>
                <div class="line"></div>
                <p class="l_title" style="margin-left: -19px;">升级条件：</p><br>
                <el-form-item v-if="getIndex(this.conditionList,'完善信息') !== -1">
                    <el-checkbox v-model="condition1">完善信息</el-checkbox>
                    <span>已选： 绑定手机号</span>
                    <p style="margin-left:115px;">姓名 <span class="addMainColor marL20 pointer" @click="openDialog">选择变更</span></p>
                </el-form-item>
                <el-form-item>
                    <div class="radio_line" v-if="getIndex(this.conditionList,'消费金额满') !== -1">
                        <el-radio v-model="condition2" label="消费金额满">消费金额满：</el-radio>
                        <div class="input_wrap2">
                            <el-input placeholder="请输入数字" v-model="xfjem"></el-input>
                        </div>
                        <span>元</span>
                        <span>即可升级</span>
                    </div>
                    <div class="radio_line" v-if="getIndex(this.conditionList,'消费次数满') !== -1">
                        <el-radio v-model="condition2" label="消费次数满">消费次数满：</el-radio>
                        <div class="input_wrap2">
                            <el-input placeholder="请输入数字" v-model="xfcsm"></el-input>
                        </div>
                        <span>元</span>
                        <span>即可升级</span>
                    </div>
                    <div class="radio_line" v-if="getIndex(this.conditionList,'积分获得满') !== -1">
                        <el-radio v-model="condition2" label="积分获得满">积分获得满：</el-radio>
                        <div class="input_wrap2">
                            <el-input placeholder="请输入数字" v-model="jfhdm"></el-input>
                        </div>
                        <span>元</span>
                        <span>即可升级</span>
                    </div>
                </el-form-item>
                <div class="line"></div>
                <p class="l_title" style="margin-left: -19px;">等级权益（最少选1个）：</p><br>
                <el-form-item v-if="getIndex(this.rightsList,'满包邮') !== -1">
                    <el-checkbox v-model="right1">满包邮</el-checkbox>
                    <span>订单金额满</span>
                    <div class="input_wrap3">
                        <el-input placeholder="请输入数字" v-model="mby"></el-input>
                    </div>
                    <span>包邮</span>
                </el-form-item>
                <el-form-item v-if="getIndex(this.rightsList,'会员折扣') !== -1">
                    <el-checkbox v-model="right2">会员折扣</el-checkbox>
                    <span>享受后买商品售价</span>
                    <div class="input_wrap3">
                        <el-input placeholder="请输入数字" v-model="hyzk"></el-input>
                    </div>
                    <span>折</span>
                    <span class="l_warn">（仅对支仅持参加会员折扣的商品生效）</span>
                </el-form-item>
                <div class="line"></div>
                <p class="l_title" style="margin-left: -19px;">升级奖励（非必选，可多选）：</p><br>
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
            </el-form>
        </div>
        <div class="btn_container" style="text-align: center">
            <el-button type="primary" @click="save">保 存</el-button>
            <el-button>返 回</el-button>
        </div>
        <component 
            :is="currentDialog" 
            :dialogVisible.sync="dialogVisible" 
            :data="currentData" 
            @getSelection="getSelection" 
            @getSelectedCoupon="getSelectedCoupon"
            @getSelectedRed="getSelectedRed"
            @getSelectedInfo="getSelectedInfo"
        ></component>
    </div>
</template>
<script type="es6">
import levelInfoDialog from './dialogs/levelInfo/levelInfoDialog';
import giftListDialog from './dialogs/levelInfo/giftListDialog';
import couponListDialog from './dialogs/levelInfo/couponListDialog';
import redListDialog from './dialogs/levelInfo/redListDialog';
export default {
    name: 'levelInfo',
    components: { levelInfoDialog, giftListDialog, couponListDialog, redListDialog },
    data() {
        return {
            fileList: [],
            ruleForm:{
                id: this.$route.query.id,
                name: "",
                levelImageUrl:"",
                explain:"",
                upgradePackage:"",
                receiveConditionsRemarks:"",
                rights:"",
                levelConditionList: [],
                rightsList: [],
                upgradeRewardList:[]
            },
            rules: {
                name: [
                    {required: true, message: '请输入等级称谓', trigger: 'blur' }
                ]
            },

            condition1: "",
            condition2: "",
            xfjem:"",
            xfcsm:"",
            jfhdm:"",
            right1:"",
            right2:"",
            mby:"",
            hyzk:"",
            upgrade1:"",
            upgrade2:"",
            upgrade3:"",
            upgrade4:"",
            zsjf:"",

            currentDialog:"",
            currentData: '',
            dialogVisible: false,
            levelName: "",
            conditionList: [],
            rightsList: [],
            rewardList: [],
            selectedGifts: [],
            selectedCoupons: [],
            selectedReds: [],
            selectedInfos: {}
        }
    },
    methods: {
        handlePicturePreview(file) {
            console.log(file);
        },
        openDialog() {
            this.currentDialog = "levelInfoDialog";
            this.dialogVisible = true;
        },
        getLevelsInfo(id) {
            this._apis.client.getLevelsInfo({id:id}).then((response) => {
                this.levelName = response.alias;
                this.ruleForm = Object.assign({}, response);
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
        //获取升级条件
        getLevelCondition() {
            this._apis.client.levelConditionList({type: 0}).then((response) => {
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
        //获取等级权益
        getRightsList() {
            this._apis.client.getRightsList({ rightsType: 0}).then((response) => {
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
        //获取升级奖励
        getRewardList() {
            this._apis.client.getRewardList({type: 0}).then((response) => {
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
        showRedDialog(val) {
            if(val) {
                this.dialogVisible = true;
                this.currentDialog = "redListDialog";
            }else{
                this.dialogVisible = false;
            }
        },
        getSelection(obj) {
            obj.selection.map((v) => {
                v.number = 1
            });
            this.selectedGifts = [].concat(obj.selection);
        },
        deleteGift(index) {
            this.selectedGifts.splice(index,1);
        },
        getSelectedCoupon(obj) {
            obj.selection.map((v) => {
                v.number = 1
            });
            this.selectedCoupons = [].concat(obj.selection);
        },
        deleteCoupon(index) {
            this.selectedCoupons.splice(index, 1);
        },
        getSelectedRed(obj) {
            this.selectedReds = [].concat(obj.selection);
        },
        deleteRed(index) {
            this.selectedReds.splice(index, 1);
        },
        getSelectedInfo(obj) {
            this.selectedInfos = Object.assign({}, obj);
        },
        save() {
            let levelConditionList = [];
            if(this.condition1) {
                if(Object.keys(this.selectedInfos).length == 0) {
                    this.$notify({
                        title: '警告',
                        message: '请选择变更',
                        type: 'warning'
                    });
                }else{
                    let params1 = {};
                    params1.levelConditionId = this.getId(this.conditionList,'完善信息');
                    params1.conditionValue = this.selectedInfos;
                    params1.label = "完善信息";
                    levelConditionList.push(params1);
                }
            }
            if(this.condition2) {
                let params2 = {};
                switch(this.condition2) {
                    case '消费金额满':
                        params2.levelConditionId = this.getId(this.conditionList,'消费金额满');
                        params2.conditionValue = this.xfjem;
                        params2.label = "消费金额满";
                        break;
                    case '消费次数满':
                        params2.levelConditionId = this.getId(this.conditionList,'消费次数满');
                        params2.conditionValue = this.xfcsm;
                        params2.label = "消费次数满";
                        break;
                    case '积分获得满':
                        params2.levelConditionId = this.getId(this.conditionList,'积分获得满');
                        params2.conditionValue = this.jfhdm;
                        params2.label = "积分获得满";
                        break;
                    default:
                        break;
                }
                levelConditionList.push(params2);
            }
            console.log(levelConditionList);
            let receiveConditionsRemarks = "";
            levelConditionList.map((v) => {
                receiveConditionsRemarks = "" + v.label + ','
            });
            console.log(receiveConditionsRemarks);
            let rightsList = [];
            if(this.right1) {
                if(this.mby == "") {
                    this.$notify({
                        title: '警告',
                        message: '请输入满包邮数',
                        type: 'warning'
                    });
                }else{
                    let params3 = {};
                    params3.rightsInfoId = this.getId(this.rightsList,'满包邮');
                    params3.rightsValue = this.mby;
                    rightsList.push(params3);
                }
            } 
            if(this.right2) {
                if(this.hyzk == "") {
                    this.$notify({
                        title: '警告',
                        message: '请输入会员折扣数',
                        type: 'warning'
                    });
                }else{
                    let params4 = {};
                    params4.rightsInfoId = this.getId(this.rightsList,'会员折扣');
                    params4.rightsValue = this.hyzk;
                    rightsList.push(params4);
                }
            }
            //console.log(rightsList);
            let upgradeRewardList = [];
            if(this.upgrade1) {
                if(this.zsjf == "") {
                    this.$notify({
                        title: '警告',
                        message: '请输入赠送积分数',
                        type: 'warning'
                    });
                }else{
                    let params5 = {};
                    params5.upgradeRewardInfoId = this.getId(this.rewardList,'赠送积分');
                    params5.giftNumber = this.zsjf;
                    upgradeRewardList.push(params5);
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
                        obj.giftProduct = v.id;
                        upgradeRewardList.push(obj);
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
                        obj.giftNumber = v.number;
                        upgradeRewardList.push(obj);
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
                        obj.giftNumber = v.number;
                        upgradeRewardList.push(obj);
                    })
                }
            }
            //console.log(upgradeRewardList);
        }
    },
    mounted() {
        this.getLevelsInfo(this.$route.query.id);
        this.getLevelCondition();
        this.getRightsList();
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
        }
        .input_wrap3{
            width: 100px;
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