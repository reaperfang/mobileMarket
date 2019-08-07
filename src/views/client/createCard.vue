<template>
    <div class="l_container">
        <p class="l_title" @click="openDialog">基本信息：</p><br>
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
                    <el-radio v-model="ruleForm.receiveSetting" label="1" style="margin-left: 93px">满足特定条件</el-radio>
                </el-form-item>
                <div class="line"></div>
                <p class="l_title" style="margin-left: -19px;">权益礼包：</p><br>
                <el-form-item label="会员卡权益:" prop="rightsDtoList">
                    <el-checkbox-group v-model="rightsDtoList">
                        
                    </el-checkbox-group>
                </el-form-item>
                <!-- <el-form-item>
                    <el-checkbox v-model="ruleForm.check2" style="margin-left: 86px;">积分回馈倍率</el-checkbox>
                    <div class="input_wrap3">
                        <el-input placeholder="填写数字"></el-input>
                    </div>
                    <span>倍</span>
                    <span class="l_warn">（当前积分兑换率：1元1积分）</span>
                </el-form-item> -->
                <el-form-item label="特权说明：" prop="remark">
                    <div class="input_wrap4">
                        <el-input type="textarea" :rows="5" placeholder="请输入该等级或会员卡通用的特权说明，最多不超过250个字符" v-model="ruleForm.remark"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="领取礼包：">
                    <el-checkbox v-model="ruleForm.check2">赠送优惠券</el-checkbox><br>
                    <el-checkbox v-model="ruleForm.check2" style="margin-left: 86px;">赠送积分</el-checkbox><br>
                    <el-checkbox v-model="ruleForm.check2" style="margin-left: 86px;">赠送红包</el-checkbox><br>
                    <el-checkbox v-model="ruleForm.check2" style="margin-left: 86px;">赠送赠品</el-checkbox>
                </el-form-item>
                <div class="line"></div>
                <p class="l_title" style="margin-left: -19px;">同步微信卡包：</p><br>
                <el-form-item label="是否同步到微信卡包：" prop="radio3">
                    <el-radio v-model="ruleForm.radio3" label="1">是</el-radio>
                    <el-radio v-model="ruleForm.radio3" label="2">否</el-radio>
                </el-form-item>
                <el-form-item label="使用须知：" prop="remark2">
                    <div class="input_wrap4">
                        <el-input type="textarea" :rows="5" placeholder="请输入会员卡通用使用须知，最多不超过100字符" v-model="ruleForm.remark2"></el-input>
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
            <el-button type="primary">保 存</el-button>
            <el-button>返 回</el-button>
        </div>
        <component :is="currentDialog" :dialogVisible.sync="dialogVisible" :data="currentData"></component>
    </div>
</template>
<script type="es6">
import createCardDialog from './dialogs/createCard/createCardDialog'
export default {
    name: 'createCard',
    components: { createCardDialog },
    data() {
        return {
            fileList: [],
            ruleForm:{
                name: "",
                backgroundType: "0",
                background: "",
                receiveSetting:"0",

                check1: false,
                radio1: "1",
                radio2: "1",
                check2: false,
                status: "",
                remark:"",
                remark2:"",
                phone:"",
                color:""
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
                radio3: [
                    {required: true, message: '请输入等级称谓', trigger: 'blur' }
                ],
                remark: [
                    {required: true, message: '请输入等级称谓', trigger: 'blur' }
                ],
                remark2: [
                    {required: true, message: '请输入等级称谓', trigger: 'blur' }
                ],
                phone: [
                    {required: true, message: '请输入等级称谓', trigger: 'blur' }
                ]
            },
            currentDialog:"",
            currentData: '',
            dialogVisible: false,
            cardData: this.$route.query.cardData,
            rightsList: []
        }
    },
    methods: {
        handlePicturePreview(file) {
            console.log(file);
        },
        openDialog() {
            this.currentDialog = "createCardDialog";
            this.dialogVisible = true;
        },
        getRightsList() {
            this._apis.client.getRightsList({cid: 2, rightsType:1}).then((response) => {
                this.rightsList = [].concat(response);
            }).catch((error) => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            })
        }
    },
    mounted() {
        this.getRightsList();
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
    }
    
}
</style>