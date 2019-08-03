<template>
    <div class="c_container">
        <el-tabs v-model="activeName">
            <el-tab-pane label="积分通用规则" name="first">
                <p class="c_title">积分使用规则：</p>
                <div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                        <el-form-item label="是否开启积分抵现：" prop="useCredits">
                            <div class="marL20">
                                <br>
                                <el-radio v-model="ruleForm.useCredits" label="1">不开启</el-radio><span class="c_warn">说明：开启用用户可以使用积分抵现（但不支持积分商城订单）</span><br>
                                <el-radio v-model="ruleForm.useCredits" label="2">开启</el-radio>
                                <div style="width: 140px; display: inline-block">
                                    <el-input placeholder="请输入整数" v-model="jf"></el-input>
                                </div>
                                <span>积分</span>
                                <div style="width: 54px; display: inline-block">
                                    <el-input v-model="yuan"></el-input>
                                </div>
                                <span>元</span>
                            </div>
                        </el-form-item>
                        <el-form-item label="积分抵现条件：">
                            <span class="marR50">订单满</span>
                            <div style="width: 222px; display: inline-block">
                                <el-input placeholder="请输入整数，不填则不生效"></el-input>
                            </div>
                            <span>元</span>
                        </el-form-item>
                        <el-form-item>
                            <span class="marL105">最高可抵现订单金额的</span>
                            <div style="width: 222px; display: inline-block; margin-left: 20px">
                                <el-input placeholder="请输入整数，不填则不生效"></el-input>
                            </div>
                            <span>%</span>
                        </el-form-item>
                        <div class="c_line"></div>
                        <p class="c_title">积分清零规则：</p>
                        <el-form-item label="是否开启积分抵现：" prop="useReset">
                            <div class="marL20">
                                <br>
                                <el-radio v-model="ruleForm.useReset" label="1">不清零</el-radio><br>
                                <el-radio v-model="ruleForm.useReset" label="2">自然年清零上一年获得的积分</el-radio><span class="c_warn">每年12月31日清空上一年获得的积分</span>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="btn_cont">
                    <el-button type="primary" class="btn_primary">保 存</el-button>
                </div>
            </el-tab-pane>
            <el-tab-pane label="获取积分规则" name="second">
                <div class="c_block">
                    <el-switch
                        v-model="isSwitch"
                        active-color="#66CCAC"
                    ></el-switch>
                    <span class="marR20">积分获取上限</span>
                    <span>每日最高获得：</span>
                    <div class="input_wrap">
                        <el-input placeholder="请输入整数"></el-input>
                    </div>
                    <span>积分</span>
                </div>
            </el-tab-pane>
        </el-tabs>
        <cmTable></cmTable>
    </div>
</template>
<script type="es6">
import cmTable from './components/creditsManage/cmTable'
export default {
    name: 'creditsManage',
    components: { cmTable },
    data() {
        return {
            ruleForm: {
                useCredits: "1",
                jf:"",
                yuan:"",
                useReset: "1"
            },
            rules: {
                useCredits: [
                    { required: true, message: '请选择是否开启积分抵现', trigger: 'blur'}
                ],
                useReset: [
                    { required: true, message: '请选择是否开启积分抵现', trigger: 'blur'}
                ]
            },
            options: [
                {label: 'test1',value: 1},
                {label: 'test2',value: 2}
            ],
            activeName: 'first',
            isSwitch: true
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.c_container{
    padding: 19px 20px 100px 20px;
    background-color: #fff;
    span{
        color: #3D434A;
    }
    .c_title{
        color: #3D434A;
        margin: 16px 0;
    }
    .c_warn{
        font-size: 12px;
        color:#92929B;
    }
    .c_line{
        width: 100%;
        height:1px;
        border-bottom: 1px dashed #D3D3D3;
    }
    .btn_cont{
        text-align: center;
        margin: 20px 0;
    }
    .primary_btn{
        background:rgba(101,94,255,0.1);
        color: #655EFF;
        border: none;
    }
    .c_block{
        margin: 16px 0;
        .input_wrap{
            width: 140px;
            display: inline-block;
        }
    }
}
</style>


