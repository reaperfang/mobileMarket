<template>
    <div class="c_container">
        <div class="c_top clearfix">
            <div class="c_top_l fl">
                <p>基本信息：</p>
                <img src="" alt="">
            </div>
            <div class="c_top_m fl">
                <p style="margin-top: 0">客户ID: <span>0012</span></p>
                <p>微信公众号关注状态: <span>已关注</span></p>
                <p>微信昵称: <span>小苗</span></p>
                <p>手机号: <span>111111</span></p>
                <p>客户渠道: <span>小程序</span></p>
                <p>成为客户时间: <span>2018-01-01 12:00</span></p>
                <p>成为会员时间: <span>2018-01-01 12:00</span></p>
                <p>客户身份: <span class="addMainColor">变更</span></p>
            </div>
            <div class="c_top_r fl">
                <div class="c_title">
                    个人资料
                    <el-button size="mini" class="btn">保存</el-button>
                </div>
                <div class="form_container">
                    <el-form ref="form" :model="form">
                        <el-form-item label="姓名：">
                            <div class="input_wrap">
                                <el-input v-model="form.name" placeholder="请输入名字"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="姓别：">
                            <div class="input_wrap">
                                <el-radio v-model="form.sex" label="1">男</el-radio>
                                <el-radio v-model="form.sex" label="2">女</el-radio>
                                <el-radio v-model="form.sex" label="3">未知</el-radio>
                            </div>
                        </el-form-item>
                        <el-form-item label="生日：">
                            <div class="input_wrap">
                                <el-input v-model="form.birthday" placeholder="请输入名字"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="微信号：">
                            <div class="input_wrap">
                                <el-input v-model="form.wechat" placeholder="请输入名字"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="邮箱：">
                            <div class="input_wrap">
                                <el-input v-model="form.email" placeholder="请输入名字"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="地区：">
                            <div class="input_wrap">
                                <div style="width: 32%; display: inline-block">
                                    <el-input v-model="form.province" placeholder="省"></el-input>
                                </div>
                                <div style="width: 32%; display: inline-block">
                                    <el-input v-model="form.city" placeholder="市"></el-input>
                                </div>
                                <div style="width: 31%; display: inline-block">
                                    <el-input v-model="form.region" placeholder="县/区"></el-input>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="input_wrap">
                                <el-input v-model="form.email" placeholder="详细地址"></el-input>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>  
            </div>
        </div>
        <div class="c_mid">
            <p>标签信息：</p>
            <div class="labels">
                <div class="label_list">
                    <p v-for="item in memberLabels" :key="item.id"><span>{{item.tag_name}}<img src="../../assets/images/client/icon_manual.png" alt=""></span><img src="../../assets/images/client/icon_remove.png" alt=""></p>
                </div>
                <img src="../../assets/images/client/icon_add.png" alt="">
            </div>
        </div>
        <div class="c_mid">
            <p>标签信息：</p>
            <div class="assets">
                <div class="assets_item">
                    <img src="../../assets/images/client/icon_vip.png" alt="">
                    <p>会员卡：<span>黄金卡</span></p>
                    <span>变更</span>
                </div>
                <div class="assets_item">
                    <img src="../../assets/images/client/icon_money.png" alt="">
                    <p>余额：<span>5元</span></p>
                    <span>变更</span>
                </div>
                <div class="assets_item">
                    <img src="../../assets/images/client/icon_coupon.png" alt="">
                    <p>可用优惠券：<span>5张</span></p>
                    <span>变更</span>
                </div>
                <div class="assets_item">
                    <img src="../../assets/images/client/icon_code.png" alt="">
                    <p>可用优惠码：<span>5个</span></p>
                    <span>变更</span>
                </div>
                <div class="assets_item rb">
                    <img src="../../assets/images/client/icon_money.png" alt="">
                    <p>积分：<span>15</span></p>
                    <span>变更</span>
                </div>
            </div>
        </div>
        <div class="c_mid" style="border-bottom: none">
            <p>交易统计：</p>
            <div class="assets">
                <div class="assets_item">
                    <p>最近下单时间</p>
                    <p>2019-09-12 05:00</p>
                </div>
                <div class="assets_item">
                    <p>客单价</p>
                    <p>¥ 50</p>
                </div>
                <div class="assets_item">
                    <p>累计消费金额</p>
                    <p>¥ 50</p>
                </div>
                <div class="assets_item rb">
                    <p>累计消费订单数</p>
                    <p>¥ 50</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="es6">
import clientCont from '@/system/constant/client';
import {test} from '@/api/client';
export default {
    data() {
        return {
            form: {
                name: "",
                sex: '1',
                birthday:"",
                wechat:"",
                email:"",
                province:"",
                city:"",
                region:""
            }
        }
    },
    computed: {
        memberLabels() {
            return clientCont.memberLabels
        },
        test() {
            return test
        }
    },
    mounted() {
        console.log(test)
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/.el-button--mini{
    border-color: #655EFF;
    color: #655EFF;
}
/deep/.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
    margin-bottom: 10px;
}
.c_container{
    background-color: #fff;
    padding: 13px 20px 44px 20px;
    .c_top{
        padding-bottom: 15px;
        border-bottom: 1px dashed #D3D3D3;
        color: #3D434A;
        .c_top_l{
            p{
                font-weight: bold;
            }
            img{
                display: block;
                width: 52px;
                height: 52px;
                border-radius: 26px;
                margin-top: 17px;
                background-color: #eee;
            }
        }
        .c_top_m{
            width: 226px;
            margin-left: 26px;
            p{
                margin-top: 10px;
            }
        }
        .c_top_r{
            width:415px;
            padding-bottom: 17px;
            box-shadow:0px 0px 14px 0px rgba(208,214,228,1);
            border-radius:10px;
            border:1px solid rgba(204,204,204,1);
            margin-left: 102px;
            .c_title{
                height: 48px;
                line-height: 48px;
                padding-left: 20px;
                font-size: 18px;
                background:rgba(101,94,255,0.09);
                border-radius:10px 10px 0px 0px;
                .btn{
                    float: right;
                    margin: 10px 10px 0 0;
                }
            }
            .form_container{
                padding: 11px 0 0 20px;
                .input_wrap{
                    float: right;
                    display: inline-block;
                    width: 205px;
                    margin-right: 120px;
                }
            }
        }
    }
    .c_mid{
        border-bottom: 1px dashed #D3D3D3;
        padding: 20px 0 38px 0;
        .labels{
            display: flex;
            margin: 12px 0 0 30px;
            .label_list{
                width: 500px;
                display: flex;
                p{
                    width: 105px;
                    margin-right: 15px;
                    display: flex;
                    span{
                        display: block;
                        width: 78px;
                        height: 30px;
                        line-height: 30px;
                        text-align: center;
                        border-radius:4px;
                        border:1px solid rgba(101,94,255,1);
                        color: #655EFF;
                        position: relative;
                        img{
                            position: absolute; 
                            bottom: 0;
                            right: 0;
                            width: 14px;
                            height: 14px;
                        }
                    }
                    img{
                        width: 25px;
                        height: 25px;
                        margin-top: 3px;
                    }
                }
            }
            img{
                width: 26px;
                height: 26px;
            }
        }
    }
    .assets{
        display: flex;
        margin: 16px 0 0 15px;
        .assets_item{
            text-align: center;
            border-left: 1px dashed #DFDFDF;
            padding: 0 30px;
            > span{
                display: block;
                color: #655EFF;
                margin-top: 5px;
            }
            &.rb{
                border-right: 1px dashed #DFDFDF;
            }
            p{
                margin-bottom: 5px;
            }
        }
    }
}
</style>
