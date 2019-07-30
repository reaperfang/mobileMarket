<template>
    <div class="p_container">
        <el-tabs v-model="activeName">
            <el-tab-pane label="全部" name="first">
                <div class="pane_container">
                    <p class="p_title">交易总况：</p>
                    <div class="order_list">
                        <div class="order_line">
                            <div class="clearfix">
                                <img src="../../assets/images/datum/icon_order.png" alt="" class="fl order_img">
                                <span>下单</span>
                            </div>
                            <div v-for="item in placeOrderData" :key="item.id">
                                <span class="marR10">{{item.text}}</span>
                                <span class="addMainColor">{{item.num}}{{item.unit}}</span>
                            </div>
                        </div>
                        <div class="order_line">
                            <div class="clearfix">
                                <img src="../../assets/images/datum/icon_pay.png" alt="" class="fl order_img">
                                <span>未支付</span>
                            </div>
                            <div v-for="item in nonPaymentData" :key="item.id">
                                <span class="marR10">{{item.text}}</span>
                                <span class="addMainColor">{{item.num}}{{item.unit}}</span>
                            </div>
                        </div>
                        <div class="order_line">
                            <div class="clearfix">
                                <img src="../../assets/images/datum/icon_money.png" alt="" class="fl order_img">
                                <span>支付</span>
                            </div>
                            <div v-for="item in paymentData" :key="item.id">
                                <span class="marR10">{{item.text}}</span>
                                <span class="addMainColor">{{item.num}}{{item.unit}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="p_blocks">
                        <div class="p_item" v-for="item in orderProbabilityData" :key="item.id" >
                            <img :src="item.url" alt="" class="fl">
                            <div class="fr">
                                <p>{{item.text}}</p>
                                <p :style="{color: item.color}">{{item.num}}%</p>
                            </div>
                        </div>
                    </div>
                    <div class="c_line">
                        <span class="c_title">交易趋势</span>
                        <span class="c_label">筛选日期：</span>
                        <div class="input_wrap">
                            <el-date-picker
                                v-model="value1"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <span>最近7天</span>
                        <span>最近15天</span>
                        <span>最近30天</span>
                        <el-button type="primary" class="marL20">查 询</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="公众号" name="second">公众号</el-tab-pane>
            <el-tab-pane label="小程序" name="third">角色管理</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import datumCont from '@/system/constant/datum';
export default {
    data() {
        return {
            activeName: "first", 
            range: ""
        }
    },
    computed: {
        placeOrderData() {
            return datumCont.placeOrderData;
        },
        nonPaymentData() {
            return datumCont.nonPaymentData;
        },
        paymentData() {
            return datumCont.paymentData;
        },
        orderProbabilityData() {
            return datumCont.orderProbabilityData
        }
    }
}
</script>
<style lang="scss" scoped>
.p_container{
    padding: 20px;
    background-color: #fff;
    .pane_container{
        color: #3D434A;
        padding: 23px 38px;
        .p_title{
            font-size: 16px;
        }
        .p_blocks{
            width: 900px;
            display: flex;
            flex-wrap: wrap;
            margin: 15px 0;
        }
        .title_line{
            height: 86px;
            line-height: 86px;
            margin: 5px 0;
        }
        .p_item{
            width: 176px;
            height: 86px;
            border: 1px solid #CCCCCC;
            margin: 0 34px 12px 0;
            border-radius:4px;
            img{
                margin: 19px 0 0 8px;
            }
            div{
                width: 105px;
                margin:19px 6px 0 0;
                p{
                    text-align: center;
                    &:last-child{
                        font-size: 22px;
                        margin-top: 8px;
                    }
                }
            }
        }
        .c_line{
            padding-top: 30px;
            border-top: 1px dashed #D3D3D3;
            .input_wrap{
                width: 220px;
                display: inline-block;
            }
            span{
                color: #655EFF;
                margin-left: 20px;
                &.c_title{
                    font-weight: bold;
                    color: #474C53;
                }
                &.c_label{
                    margin-left: 300px;
                    color: #474C53;
                }
            }
        }
        .order_list{
            width: 866px;
            margin: 22px 0;
            border-top: 1px solid #CACFCB;
            .order_line{
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-between;
                height: 60px;
                line-height: 60px;
                border-bottom: 1px solid #CACFCB;
                .order_img{
                    margin:20px 5px 0 0;
                }
            }
        }
    }
}
</style>

