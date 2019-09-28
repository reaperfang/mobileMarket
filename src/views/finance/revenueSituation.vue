<!--营收状况-->
<template>
  <div>
    <div class="top_part">
      <div class="title">
        <span class="name">当日营收</span>
        <el-popover
          placement="top-start"
          title="数据说明"
          width="300"
          trigger="hover">
          <div>
            <p>1、总收入即所有线上订单支付的总金额，含所有线上支付和线下支付的所有订单，支付完成后计入；</p>
            <p>2、总支出即所有线上支出的总金额，含订单退款、客户ID提现的金额，退款成功或提现成功后计入；</p>
            <p>3、实际收入 = 总收入 - 总支出；</p>
            <p>4、每日数据为当日0时0分0秒到23时59分59秒的数据，今日数据为当日0点后的实时数据；</p>
            <p>5、最近一周，最近一个月等数据中包含今日数据；</p>
          </div>
          <el-button slot="reference" class="data_note">
            <i class="el-icon-warning-outline"></i>
            查看数据说明
          </el-button>
        </el-popover>
      </div>
      <div class="data_statistics">
        <div class="item">
          <span class="money">总收入（元）</span>
          <span class="num">
            <em>{{surveyDay.income}}</em>
          </span>
        </div>
        <div class="item">
          <span class="money">总支出（元）</span>
          <span class="num">
            <em>{{surveyDay.expend}}</em>
          </span>
        </div>
        <div class="item">
          <span class="money">实际收入（元）</span>
          <span class="num">
            <em>{{surveyDay.realIncome}}</em>
          </span>
        </div>
        <span 
        class="details" 
        @click="_routeTo('revenueExpenditureDetails')"
        v-permission="['财务', '营收状况', '默认页面', '收支明细']"
        >
        收支明细
        </span>
      </div>
    </div>
    <div class="under_part">
      <div class="title">
        <span class="name">趋势分析<em>（截止到昨日）</em></span>
        <div class="time">
          <el-radio-group v-model="days" class="mr20">
            <el-radio-button label="7">最近7天</el-radio-button>
            <el-radio-button label="15">最近15天</el-radio-button>
            <el-radio-button label="30">最近30天</el-radio-button>
          </el-radio-group>
          请选择时间段：
          <el-date-picker
            v-model="timeValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerNowDateBefore">
          </el-date-picker>
          <el-button type="primary" @click="getDataDateRs">确定</el-button>
        </div>
      </div>
      <div class="data_statistics">
        该时间段内
        <div class="item">
          <span class="money">总收入（元）</span>
          <span class="num">
            <em>{{survey.income}}</em>
            <span v-if="survey.chainRatioIncome != null">
              <i class="el-icon-top red" v-if="survey.chainRatioIncome > 0"></i>
              <i class="el-icon-top gray" v-else-if="survey.chainRatioIncome = 0"></i>
              <i class="el-icon-bottom green" v-else></i>
            </span>
          </span>
        </div>
        <div class="item">
          <span class="money">总支出（元）</span>
          <span class="num">
            <em>{{survey.expend}}</em>
            <span v-if="survey.chainRatioExpend != null">
              <i class="el-icon-top red" v-if="survey.chainRatioExpend > 0"></i>
              <i class="el-icon-top gray" v-else-if="survey.chainRatioExpend = 0"></i>
              <i class="el-icon-bottom green" v-else></i>
            </span>
          </span>
        </div>
        <div class="item">
          <span class="money">实际收入（元）</span>
          <span class="num">
            <em>{{survey.realIncome}}</em>
            <span v-if="survey.chainRatioRealIncome != null">
              <i class="el-icon-top red" v-if="survey.chainRatioRealIncome > 0"></i>
              <i class="el-icon-top gray" v-else-if="survey.chainRatioRealIncome = 0"></i>
              <i class="el-icon-bottom green" v-else></i>
            </span>
          </span>
        </div>
      </div>
      <financeChart class="financeChart" :dataList="dataList"></financeChart>
    </div>
  </div>
</template>

<script>
import utils from "@/utils";
import financeChart from './components/financeChart';
export default {
  name: 'revenueSituation',
  data() {
    return {
      pickerNowDateBefore: {
        disabledDate: (time) => {
          return time.getTime() > new Date();
        }
      },
      timeValue:['2019-06-05','2019-06-07'],
      surveyDay:{
        income:0,
        expend:0,
        realIncome:0
      },
      survey:{
        income:0,
        expend:0,
        realIncome:0,
        chainRatioExpend:0, 
        chainRatioIncome:0,
        chainRatioRealIncome:0 
      },
      dataList:[],
      days:7
    }
  },
  components: {financeChart},
  watch: {
    // timeValue(){
    //   this.getDataDateRs()
    // },
    days(){
      this.getDataNumRs()
    }
  },
  created() {
    this.init();
    this.getDataDateRs()
    this.getSurveyDay();
  },
  methods: {
    //初始化数据
    init(){
      let date = new Date()
      let endDate = utils.formatDate(date, "yyyy-MM-dd")
      let startDate = utils.countDate(-7)
      this.timeValue = [startDate,endDate]
    },
    //概况
    getSurveyDay(){
      this._apis.finance.getSurveyDayRs({}).then((response)=>{
        this.surveyDay = response
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },
    //时间段趋势
    getDataDateRs(){
      let queryDate = {
        accountDateStart:this.timeValue[0],
        accountDateEnd:this.timeValue[1]
      }
      this._apis.finance.getDataDateRs(queryDate).then((response)=>{
        if(response){
          this.survey = response
          this.dataList = response.accountList
        }else{
          this.$notify.info({
            title: '消息',
            message: "查询结果集为空，没有可以显示的数据"
          });
          this.init()
        }
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },
    //最近天数趋势
    getDataNumRs(){
      this._apis.finance.getDataNumRs({recentDays:this.days}).then((response)=>{
        if(response){
          this.survey.expend = response.expend
          this.survey.income = response.income
          this.survey.realIncome = response.realIncome
          this.dataList = response.accountList
        }else{
          this.$notify.info({
            title: '消息',
            message: "查询结果集为空，没有可以显示的数据"
          });
          this.days = 7
        }
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.red{
  color: red;
}
.green{
  color:green;
}
.top_part{
  width: 100%;
  height: 160px;
  background: #fff;
  border-radius: 3px;
  padding: 15px 20px;
    .title{
      display: flex;
      flex: 1;
      flex-direction:row;
      justify-content: space-between;
      .name{
        color: #161617;
        font-size: 16px;
      }
      .data_note{
        color: #655EFF;
        font-size: 14px;
        cursor: pointer;
        border:none;
      }
    }
  .data_statistics{
    display: flex;
    flex: 1;
    flex-direction:row;
    justify-content: space-between;
    margin-top: 30px;
    .item{
      .money{
        height: 21px;
        line-height: 21px;
        display: block;
        font-size: 16px;
        color: #A7ABC3;
      }
      .num{
        height: 40px;
        line-height: 40px;
        display: block;
        font-size: 28px;
        color: #655EFF;
        em{
          font-style: normal;
        }
      }
    }
    .details{
      width: 80px;
      height: 34px;
      line-height: 34px;
      border:1px solid #655EFF;
      border-radius: 4px;
      font-size: 14px;
      text-align: center;
      color: #655EFF;
      cursor: pointer;
    }
  }
}
.under_part{
  width: 100%;
  background: #fff;
  margin-top: 56px;
  padding: 0px 20px;
  .title{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #CACFCB;
    display: flex;
    justify-content: space-between;
    .name{
      color: #161617;
      font-size: 16px;
      em{
        font-size: 12px;
        color: #666;
        text-decoration: none;
      }
    }
    ul{
      width: 123px;
      height: 50px;
      line-height: 50px;
      display: inline-flex;
      flex: 1;
      margin:10px 0 0 64px;
      li{
        width: 60px;
        text-align: center;
        margin-right: 30px;
        cursor: pointer;
      }
      li:hover{
        border-bottom:2px solid #655EFF;
      }
    }
    .time{
      display: inline-block;
    }
  }
  .data_statistics{
    width: 700px;
    display: flex;
    flex: 1;
    flex-direction:row;
    justify-content: space-between;
    margin-top: 30px;
    .item{
      .money{
        height: 21px;
        line-height: 21px;
        display: block;
        font-size: 16px;
        color: #A7ABC3;
      }
      .num{
        height: 40px;
        line-height: 40px;
        display: block;
        font-size: 28px;
        color: #655EFF;
        em{
          font-style: normal;
        }
      }
    }
  }  
}
.financeChart{
  margin-top: 30px;
}
.mr20{
  margin-right: 20px;
}

</style>
