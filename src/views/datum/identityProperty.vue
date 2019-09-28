<template>
    <div class="p_container">
        <div class="clearfix">
          <div class="fr">
            <el-radio-group class="fr" v-model="visitSourceType" @change="all">
              <el-radio-button class="btn_bor" label="0" v-permission="['数据', '身份属性', '全部']">全部</el-radio-button>
              <el-radio-button class="btn_bor" label="1" v-permission="['数据', '身份属性', '小程序']">小程序</el-radio-button>
              <el-radio-button class="btn_bor" label="2" v-permission="['数据', '身份属性', '公众号']">公众号</el-radio-button>
            </el-radio-group>
          </div>
      </div>
                <div class="pane_container">
                    <p class="i_title">属性比例：</p>
                    <div class="chart1_container clearfix">
                        <div class="chart1">
                            <ip1Chart :title="'测试图表'" ref="ip1"></ip1Chart>
                        </div>
                        <div class="chart1_info">
                            <p>累计客户数：{{grandTotal}}</p>
                            <p v-for="(item,index) in oneData">{{item.name}} 占比{{item.ratioValue}}<span>{{item.value}}</span></p>
                        </div>
                    </div>
                    <p class="i_title">会员增长趋势:</p>
                    <div class="i_line">
                        <el-radio-group v-model="nearDay" @change="changeDayM">
                            <el-radio-button class="btn_bor" label="1">最近7天</el-radio-button>
                            <el-radio-button class="btn_bor" label="2">最近15天</el-radio-button>
                            <el-radio-button class="btn_bor" label="3">最近30天</el-radio-button>
                            <el-radio-button class="btn_bor" label="4">查询月</el-radio-button>
                            <el-radio-button class="btn_bor" label="5">查询日</el-radio-button>
                        </el-radio-group>
                        <div class="input_wrap" v-if="nearDay == 4 || nearDay == 5">
                            <el-date-picker
                                v-model="valueM"
                                :type="nearDay"
                                :value-format="formatM"
                                placeholder="选择日期"
                                @change="changeTimeM">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="chart2_container">
                        <ip2Chart :title="'测试图表'" ref="ip2"></ip2Chart>
                    </div>
                    <p class="i_title">支付趋势：</p>
                    <div class="i_line clearfix" >
                        <el-radio-group v-model="nearDay" @change="changeDayPay">
                            <el-radio-button class="btn_bor" label="1">最近7天</el-radio-button>
                            <el-radio-button class="btn_bor" label="2">最近15天</el-radio-button>
                            <el-radio-button class="btn_bor" label="3">最近30天</el-radio-button>
                            <el-radio-button class="btn_bor" label="4">查询月</el-radio-button>
                            <el-radio-button class="btn_bor" label="5">查询日</el-radio-button>
                        </el-radio-group>
                        <div class="input_wrap" v-if="nearDay == 4 || nearDay == 5">
                            <el-date-picker
                                v-model="valuePay"
                                :type="nearDay"
                                :value-format="formatPay"
                                placeholder="选择日期"
                                @change="changeTimePay">
                            </el-date-picker>
                        </div>
                         <span class="fr" @click="toLink()">会员消费</span>
                    </div>
                   
                    <div class="chart3_container clearfix">
                        <div class="chart3">
                            <ip3Chart :title="'测试图表'" ref="ip3"></ip3Chart>
                        </div>
                        <div class="chart3_info">
                            <el-row :gutter="20">
                                <el-col :span="4">
                                    <p><span class="color_block" style="background-color:#A1E174 "></span></p>
                                    <p><span class="color_block" style="background-color:#578EFA "></span></p>
                                    <p><span class="color_block" style="background-color:#FD932B "></span></p>
                                    <p><span class="color_block" style="background-color:#FD4C2B "></span></p>
                                 </el-col>
                                <el-col :span="8"><p class="color_block" v-for="(item,index) in threeData.yAxis"> 支付 {{item}} 次 </p></el-col>
                                <el-col :span="6"><p class="color_block" v-for="(item,index) in threeData.xAxis"{{item}}人</p></el-col>
                            </el-row>
                        </div>
                    </div>
                </div>
    </div>
</template>
<script>
import ip1Chart from './components/ip1Chart';
import ip2Chart from './components/ip2Chart';
import ip3Chart from './components/ip3Chart';
export default {
    name: 'identityProperty',
    components: { ip1Chart, ip2Chart, ip3Chart },
    data() {
        return {
            cid:2,
            oneData:[],
            dateM:'month',
            datePay:'month',
            formatM:'yyyy-MM',
            formatPay:'yyyy-MM',
            visitSourceType:0,
            nearDay:7,
            valueM:'',
            valuePay:'',
            timeM:'',
            timePay:'',
            attrData:{},
            membeData:{},
            payData:{},
            dataChart:{},
            threeData:{},
            grandTotal:'',
        }
    },
    methods:{
        /*
        **属性比例
         */ 
        getAttributeRatio(){
             let data = {
                 visitSourceType:this.visitSourceType,
            };
            this._apis.data.attributeRatio(data).then(response => {
                    this.oneData = response;
                    this.grandTotal = response[0].value + response[1].value
                    let oneArr = response;
                    oneArr.forEach(e => {
                        delete e.ratioValue
                    });
                    this.$refs.ip1.con(oneArr)
                }).catch(error => {
                this.$message.error(error);             
                });
         },
        /*  
        **会员增长趋势
         */ 
        getMemberTrend(){ 
            let data ={
                startTime: this.startTime,
                endTime: this.endTime,
                nearDay:this.nearDay,
                visitSourceType: this.visitSourceType,
                queryTime: this.timeM,
                nearDay: this.nearDay == 5 ? 4 : this.nearDay
            }
            this._apis.data.memberTrend(data).then(response => {
                this.dataChart = response
                this.$refs.ip2.con(response,this.title,this.startTime,this.endTime)
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
                this.nearDay = val
                this.getMemberTrend()
            }            
        },
        changeTimeM(val){
            this.timeM = val
            this.startTime = val[0]
            this.endTime = val[1]
            this.getMemberTrend()
        },
        /*
        **支付趋势
         */
        getPaymentTrend(){ 
            let data ={
                visitSourceType: this.visitSourceType,
                queryTime: this.timePay,
                nearDay: this.nearDay  == 5 ? 4 : this.nearDay,
                startTime:this.startTime,
                endTime:this.endTime,
                chanell :this.chanell,
                // nearDay:this.nearDay
            }
            this._apis.data.paymentTrend(data).then(response => {
                this.threeData = response;
                this.$refs.ip3.con(response,this.title,this.startTime,this.endTime,this.chanell)
            }).catch(error => {
            this.$message.error(error);
            });
        },
        changeDayPay(val){
            if(val == 4){
                this.formatPay = "yyyy-MM"
                this.nearDay = 'month'
            }else if(val == 5){
                this.formatPay = "yyyy-MM-dd"
                this.nearDay = 'date'
            }else if(val == 1 || val == 2 || val == 3){
                this.nearDay = val
                this.getPaymentTrend()
            }
        },
        changeTimePay(val){
            this.timePay = val
            this.getPaymentTrend()
        },
        // 全部
        all(){
            this.getAttributeRatio()
            this.getMemberTrend()
            this.getPaymentTrend()
        },
        // 会员消费跳转
        toLink(){
            this.$router.push({ path: '/datum/memberConsumption'})
        }
    },
    created(){
        this.getAttributeRatio();
        this.getMemberTrend();
        this.getPaymentTrend();
        this.all()
    }
}
</script>
<style lang="scss" scoped>
.p_container{
    padding: 20px;
    background-color: #fff;
    .pane_container{
        color: #3D434A;
        .i_title{
            margin: 23px 0 32px 38px;
        }
        .chart1_container{
            padding-bottom: 32px;
            border-bottom: 1px dashed #D3D3D3;
            .chart1{
                float: left;
                width: 500px;
            }
            .chart1_info{
                float: left;
                margin: 176px 0 0 91px;
                p{
                    margin-bottom: 20px;
                    &:first-child{
                        font-weight: bold;
                    }
                    span{
                        margin-left: 20px;
                    }
                }
            }
        }
        .i_line{
            padding-left: 35px;
            .input_wrap{
                width: 220px;
                display: inline-block;
            }
            span{
                color: #655EFF;
                margin-left: 20px;
            }
        }
        .chart2_container{
            padding-top: 20px;
        }
        .chart3_container{
            padding-top: 20px;
            .chart3{
                float: left;
                width: 700px;
            }
            .chart3_info{
                float: left;
                width: 400px;
                margin-top: 150px;
                p{
                    margin-bottom: 20px;
                    span{
                        display: inline-block;
                        &:first-child {
                            width: 16px;
                            height: 16px;
                            margin-right: 10px;
                        }
                        &:nth-child(2) {
                            width: 240px;
                        }
                    }
                }
            }
        }
    }
}
</style>

