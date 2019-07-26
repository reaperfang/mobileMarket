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
            <span class="l_warn fl marL10 marT18">大小不超过2M</span>
        </div>
        <div class="level_order"><span class="red">*</span>等级序号：VIP1<span class="l_warn">（等级序号为等级在系统的排序，不展示给用户）</span></div>
        <div class="form_container">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right">
                <el-form-item label="等级称谓：" prop="title">
                    <div class="input_wrap">
                        <el-input v-model="ruleForm.title" placeholder="请输入等级名称，比如普通会员"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="等级称谓：">
                    <div class="input_wrap">
                        <el-input v-model="ruleForm.explain" placeholder="请输入等级名称，比如普通会员"></el-input>
                    </div>
                </el-form-item>
                <div class="line"></div>
                <p class="l_title" style="margin-left: -19px;">升级条件：</p><br>
                <el-form-item>
                    <el-checkbox v-model="ruleForm.check1">完善信息</el-checkbox>
                    <span>已选： 绑定手机号</span>
                    <p style="margin-left:115px;">姓名 <span class="addMainColor marL20" @click="openDialog">选择变更</span></p>
                </el-form-item>
                <el-form-item>
                    <div class="radio_line">
                        <el-radio v-model="ruleForm.radio1" label="1">消费金额满：</el-radio>
                        <div class="input_wrap2">
                            <el-input placeholder="请输入数字"></el-input>
                        </div>
                        <span>元</span>
                        <span>即可升级</span>
                    </div>
                    <div class="radio_line">
                        <el-radio v-model="ruleForm.radio1" label="2">消费次数满：</el-radio>
                        <div class="input_wrap2">
                            <el-input placeholder="请输入数字"></el-input>
                        </div>
                        <span>元</span>
                        <span>即可升级</span>
                    </div>
                    <div class="radio_line">
                        <el-radio v-model="ruleForm.radio1" label="2">积分获得满：</el-radio>
                        <div class="input_wrap2">
                            <el-input placeholder="请输入数字"></el-input>
                        </div>
                        <span>元</span>
                        <span>即可升级</span>
                    </div>
                </el-form-item>
                <div class="line"></div>
                <p class="l_title" style="margin-left: -19px;">等级权益：</p><br>
                <el-form-item>
                    <el-checkbox v-model="ruleForm.check2">满包邮</el-checkbox>
                    <span>订单金额满</span>
                    <div class="input_wrap3">
                        <el-input placeholder="请输入数字"></el-input>
                    </div>
                    <span>包邮</span>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="ruleForm.check2">会员折扣</el-checkbox>
                    <span>享受后买商品售价</span>
                    <div class="input_wrap3">
                        <el-input placeholder="请输入数字"></el-input>
                    </div>
                    <span>折</span>
                    <span class="l_warn">（仅对支仅持参加会员折扣的商品生效）</span>
                </el-form-item>
                <div class="line"></div>
                <p class="l_title" style="margin-left: -19px;">等级权益：</p><br>
                <el-form-item>
                    <el-checkbox v-model="ruleForm.check2">赠送积分</el-checkbox>
                    <span>送</span>
                    <div class="input_wrap3">
                        <el-input placeholder="填写数字"></el-input>
                    </div>
                    <span>积分</span>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="ruleForm.check2">赠送红包</el-checkbox>
                    <span>送</span>
                    <div class="input_wrap3">
                        <el-input placeholder="填写数字"></el-input>
                    </div>
                    <span>元给包1个</span>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="ruleForm.check2">赠送赠品</el-checkbox>
                    <div class="input_wrap2">
                        <el-select v-model="ruleForm.status" placeholder="选择优惠券">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </div>
                    <div class="input_wrap3">
                        <el-input placeholder="填写数字"></el-input>
                    </div>
                    <span>个</span>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="ruleForm.check2">赠送优惠券</el-checkbox>
                    <div class="input_wrap2">
                        <el-select v-model="ruleForm.status" placeholder="选择优惠券">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </div>
                    <div class="input_wrap3">
                        <el-input placeholder="填写数字"></el-input>
                    </div>
                    <span>张</span>
                </el-form-item>
            </el-form>
        </div>
        <div class="btn_container">
            <el-button type="primary">保 存</el-button>
            <el-button>返 回</el-button>
        </div>
        <component :is="currentDialog" :dialogVisible.sync="dialogVisible" :data="currentData"></component>
    </div>
</template>
<script type="es6">
import levelInfoDialog from './dialogs/levelInfoDialog'
export default {
    components: { levelInfoDialog },
    data() {
        return {
            fileList: [],
            ruleForm:{
                title: "",
                explain:"",
                check1: false,
                radio1: "1",
                check2: false,
                status: ""
            },
            rules: {
                title: [
                    {required: true, message: '请输入等级称谓', trigger: 'blur' }
                ]
            },
            currentDialog:"",
            currentData: '',
            dialogVisible: false
        }
    },
    methods: {
        handlePicturePreview(file) {
            console.log(file);
        },
        openDialog() {
            this.currentDialog = "levelInfoDialog";
            this.dialogVisible = true;
        }
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
    }
    
}
</style>