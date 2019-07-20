<!--推客奖励-->
<template>
  <div>
    <div class="top_part1">
      <div class="title">
        <div>
          <span class="name">概况分析</span>
          <el-select v-model="svalue" placeholder="开店以来">
            <el-option
              v-for="item in surveyStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <span class="data_note">
          <i class="el-icon-warning-outline"></i>
          查看数据说明
        </span>
      </div>
      <div class="data_statistics">
        <div class="item">
          <span class="money">累计发放红包</span>
          <span class="num">
            <em>1000元</em>
          </span>
        </div>
        <div class="item">
          <span class="money">累计发放积分</span>
          <span class="num">
            <em>1000</em>
          </span>
        </div>
        <div class="item">
          <span class="money">累计发放优惠券</span>
          <span class="num">
            <em>100张</em>
          </span>
        </div>
        <div class="item">
          <span class="money">累计发放优惠码</span>
          <span class="num">
            <em>100个</em>
          </span>
        </div>
        <div class="item">
          <span class="money">累计发放赠品</span>
          <span class="num">
            <em>100个</em>
          </span>
        </div>
      </div>
    </div>
    <div class="top_part">
      <el-form ref="form" :model="form" :inline="inline" label-width="70px">
        <el-form-item label="客户ID">
          <el-input v-model="form.value1" placeholder="请输入" style="width:226px;"></el-input>
        </el-form-item>
        <el-form-item label="订单编号">
          <el-input v-model="form.value2" placeholder="请输入" style="width:226px;"></el-input>
        </el-form-item>
        <el-form-item label="奖励方式">
          <el-select v-model="form.value4" style="width:200px;">
            <el-option label="全部" value="1"></el-option>
            <el-option label="积分" value="2"></el-option>
            <el-option label="优惠券" value="3"></el-option>
            <el-option label="红包" value="4"></el-option>
            <el-option label="优惠码" value="5"></el-option>
            <el-option label="赠品" value="6"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="时间">
          <el-date-picker
            v-model="form.value3"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button>重置</el-button>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="under_part">
      <div class="total">
        <span>全部 <em>700</em> 项</span>
        <el-button>导出</el-button>
      </div>
      <taTable style="margin-top:20px"></taTable>
    </div>
  </div>
</template>

<script>
import taTable from './components/taTable'
import financeCons from '@/system/constant/finance'
export default {
  name: 'twitterAward',
  components:{ taTable },
  data() {
    return {
      inline:true,
      form:{
        value1:'',
        value2:'',
        value3:'',
        value4:'1'
      },
      svalue:'',
    }
  },
  watch: {

  },
  computed:{
    surveyStatus(){
      return financeCons.surveyStatus;
    }
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
    
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    onSubmit(){},
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.top_part1{
  width: 100%;
  background: #fff;
  border-radius: 3px;
  padding: 15px 20px;
    .title{
      height: 74px;
      line-height: 74px;
      display: flex;
      flex: 1;
      flex-direction:row;
      justify-content: space-between;
      border-bottom: 1px solid #CACFCB;
      .name{
        color: #161617;
        font-size: 16px;
      }
      .data_note{
        color: #655EFF;
        font-size: 14px;
      }
    }
  .data_statistics{
    display: flex;
    flex: 1;
    flex-direction:row;
    justify-content: space-between;
    margin-top: 30px;
    padding: 0 20px;
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
.top_part{
  width: 100%;
  background: #fff;
  border-radius: 3px;
  margin-top: 20px;
  padding: 15px 20px;
}
.under_part{
  width: 100%;
  background: #fff;
  margin-top: 20px;
  padding: 15px 20px;
  .total{
    display: flex;
    justify-content: space-between;
    span{
      font-size: 16px;
      color: #B6B5C8;
      em{
        font-style: normal;
        color: #000;
      }
    }
  }
}
</style>
