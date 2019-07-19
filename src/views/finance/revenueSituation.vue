<!--营收状况-->
<template>
  <div>
    <div class="top_part">
      <div class="title">
        <span class="name">当日营收</span>
        <span class="data_note">
          <i class="el-icon-warning-outline"></i>
          查看数据说明
        </span>
      </div>
      <div class="data_statistics">
        <div class="item">
          <span class="money">总收入（元）</span>
          <span class="num">
            <em>10000.00</em>
            <!-- <i class="el-icon-top red"></i> -->
            <i class="el-icon-bottom green"></i>
          </span>
        </div>
        <div class="item">
          <span class="money">总支出（元）</span>
          <span class="num">
            <em>5</em>
            <i class="el-icon-top red"></i>
          </span>
        </div>
        <div class="item">
          <span class="money">实际收入（元）</span>
          <span class="num">
            <em>150</em>
            <i class="el-icon-top red"></i>
          </span>
        </div>
        <span class="details">收支明细</span>
      </div>
    </div>
    <div class="under_part">
      <div class="title">
        <span class="name">趋势分析</span>
        <ul>
          <li class="active">最近7天</li>
          <li>最近15天</li>
          <li>最近30天</li>
        </ul>
        <div class="time">
          请选择时间段：
          <el-date-picker
            v-model="timeValue"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']">
          </el-date-picker>
        </div>
      </div>
      <div class="data_statistics">
        该时间段内
        <div class="item">
          <span class="money">总收入（元）</span>
          <span class="num">
            <em>10000.00</em>
          </span>
        </div>
        <div class="item">
          <span class="money">总支出（元）</span>
          <span class="num">
            <em>5</em>
          </span>
        </div>
        <div class="item">
          <span class="money">实际收入（元）</span>
          <span class="num">
            <em>150</em>
          </span>
        </div>
      </div>
      <financeChart class="financeChart"></financeChart>
    </div>
  </div>
</template>

<script>
import financeChart from './components/financeChart';
export default {
  name: 'revenueSituation',
  data() {
    return {
      timeValue:''
    }
  },
  components: {financeChart},
  watch: {

  },
  created() {
    
  },
  destroyed() {
    
  },
  methods: {
    
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

</style>
