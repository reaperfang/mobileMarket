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
                        <!-- <div class="input_wrap">
                            <el-date-picker
                                v-model="value1"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div> -->
                        <el-radio-group v-model="dateTypeM" @change="changeDayM">
                            <el-radio-button class="btn_bor" label="1">最近7天</el-radio-button>
                            <el-radio-button class="btn_bor" label="2">最近15天</el-radio-button>
                            <el-radio-button class="btn_bor" label="3">最近30天</el-radio-button>
                            <el-radio-button class="btn_bor" label="4">查询月</el-radio-button>
                            <el-radio-button class="btn_bor" label="5">查询日</el-radio-button>
                        </el-radio-group>
                        <div class="input_wrap" v-if="dateTypeM == 4 || dateTypeM == 5">
                            <el-date-picker
                                v-model="valueM"
                                :type="dateM"
                                :value-format="formatM"
                                placeholder="选择日期"
                                @change="changeTimeM">
                            </el-date-picker>
                        </div>
                        <el-button type="primary" class="marL20">查 询</el-button>
                    </div>
                    <ip4Chart :title="'测试图表'"  ref="ip4"></ip4Chart>
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
            formatM: "yyyy-MM",
            dateM:"month",
            range: "",
            dateTypeM:1,
        }
    },
    components:{ip4Chart},
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
    },
    methods:{
        // 获取交易总况
        getTradingOverview(){
            let data ={
                visitSourceType: this.visitSourceType,
            }
            this._apis.data.tradingOverview(data).then(response => {
                console.log(response)
            }).catch(error => {
            this.$message.error(error);
            });
        },
        // 获取交易趋势
        getTradingTrendchart(){
            let data ={
                visitSourceType: this.visitSourceType,
                queryTime: this.timeM,
                dateType: this.dateTypeM == 5 ? 4 : this.dateTypeM
            }
            this._apis.data.tradingTrendchart(data).then(response => {
                this.$refs.ip4.con(response)
            }).catch(error => {
            this.$message.error(error);
            });
        },
        changeDayM(val){
            if(val == 4){
                this.formatM = "yyyy-MM"
                this.dateM = 'month'
            }else if(val == 5){
                this.formatM = "yyyy-MM-dd"
                this.dateM = 'date'
            }else if(val == 1 || val == 2 || val == 3){
                this.dateTypeM = val
                this.getTradingTrendchart()
            }
            
        },
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

