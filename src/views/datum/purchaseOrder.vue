<template>
    <div class="p_container">
        <div class="clearfix">
          <div class="fr">
            <el-radio-group class="fr" v-model="visitSourceType" @change="all">
              <el-radio-button class="btn_bor" label="0">全部</el-radio-button>
              <el-radio-button class="btn_bor" label="1">小程序</el-radio-button>
              <el-radio-button class="btn_bor" label="2">公众号</el-radio-button>
            </el-radio-group>
          </div>
      </div>
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
                        <el-radio-group v-model="dateTypeM" @change="changeDayM">
                            <el-radio-button class="btn_bor" label="1">最近7天</el-radio-button>
                            <el-radio-button class="btn_bor" label="2">最近15天</el-radio-button>
                            <el-radio-button class="btn_bor" label="3">最近30天</el-radio-button>
                            <el-radio-button class="btn_bor" label="4">自定义</el-radio-button>
                        </el-radio-group>
                        <div class="input_wrap" v-if="dateTypeM == 4">
                            <el-date-picker
                                v-model="range"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                @change="changeTime">
                            </el-date-picker>
                        </div>
                    </div>
                    <ip4Chart :title="'测试图表'" ref="ip4"></ip4Chart>
                </div>
    </div>
</template>
<script>
import ip4Chart from "./components/ip4Chart";
import datumCont from '@/system/constant/datum';

export default {
    name: 'purchaseOrder',
    data() {
        return {
            range: "",
            dateTypeM:1,
            visitSourceType:0,
            startTime: "",
            endTime: "",
            placeOrderData:[],
            nonPaymentData:[],
            paymentData:[],
            orderProbabilityData:[]
        }
    },
    components:{ip4Chart},
    computed: {
    },
    methods:{
        // 获取交易总况
        getTradingOverview(){
            let data ={
                visitSourceType: this.visitSourceType,
                dateType:1
            }
            this._apis.data.tradingOverview(data).then(response => {
                let nums = response.shopTradingSurvey
                    datumCont.placeOrderData.forEach(e => {
                          switch (e.id){
                        case '01': e.num = nums.submitOrderPersonTotal
                         break;
                        case '02': e.num = nums.submitOrderTotal
                         break;
                        case '03': e.num = nums.submitOrderAmountTotal
                         break;
                        case '04': e.num = nums.visitSubmitOrderConversionRate
                         break;
                         }
                    });
                    datumCont.nonPaymentData.forEach(e => {
                          switch (e.id){
                        case '01': e.num = nums.nonPayOrderPersonTotal
                         break;
                        case '02': e.num = nums.nonPayOrderTotal
                         break;
                        case '03': e.num = nums.nonPayOrderAmountTotal
                         break;
                         }
                    });
                    datumCont.paymentData.forEach(e => {
                          switch (e.id){
                        case '01': e.num = nums.payOrderPersonTotal
                         break;
                        case '02': e.num = nums.payOrderTotal
                         break;
                        case '03': e.num = nums.payOrderAmountTotal
                         break;
                        case '04': e.num = nums.submitOrderPayAmountConversionRate
                         break;
                         }
                    });
                    datumCont.orderProbabilityData.forEach(e => {
                        console.log(e)
                          switch (e.id){
                        case '001': e.num = nums.shopRepurchaseRate
                         break;
                        case '002': e.num = nums.shopPayConversionRate
                         break;
                         }
                    });
                    this.placeOrderData = datumCont.placeOrderData;
                    this.nonPaymentData = datumCont.nonPaymentData;
                    this.paymentData = datumCont.paymentData;
                    this.orderProbabilityData = datumCont.orderProbabilityData;
            }).catch(error => {
            this.$message.error(error);
            });
        },
        // 获取交易趋势
        getTradingTrendchart(){
            let data ={
                visitSourceType: this.visitSourceType,
                // queryTime: this.timeM | 2019-8-9,
                startTime:this.startTime,
                endTime:this.endTime,
                dateType: this.dateTypeM
            }
            this._apis.data.tradingTrendchart(data).then(response => {
                this.$refs.ip4.con(response)
            }).catch(error => {
            this.$message.error(error);
            });
        },
        changeDayM(val){
             if(val !=4 ){
                this.dateTypeM = val
                this.getTradingTrendchart()
            }
        },
        changeTime(val){
            this.startTime = val[0];
            this.endTime = val[1];
            this.getTradingTrendchart()
        },
        all(){
            this.getTradingOverview()
            this.getTradingTrendchart()
        }
    },
    created(){
        this.getTradingOverview()
        this.getTradingTrendchart()
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

