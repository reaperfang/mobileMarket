<!--积分明细-->
<template>
  <div>
    <div class="top_part">
      <el-form ref="form" :model="form" :inline="inline">
        <el-form-item label="客户ID">
          <el-input v-model="form.value2" placeholder="请输入" style="width:226px;"></el-input>
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select v-model="form.value3" style="width:100px;">
            <el-option label="全部" value="1"></el-option>
            <el-option label="登陆" value="2"></el-option>
            <el-option label="购买" value="3"></el-option>
            <el-option label="复购" value="4"></el-option>
            <el-option label="红包" value="5"></el-option>
            <el-option label="互动" value="6"></el-option>
            <el-option label="多人拼团" value="6"></el-option>
            <el-option label="限时秒杀" value="6"></el-option>
            <el-option label="评价" value="6"></el-option>
            <el-option label="填写信息" value="6"></el-option>
            <el-option label="签到" value="6"></el-option>
            <el-option label="节日有礼" value="6"></el-option>
            <el-option label="积分兑换" value="6"></el-option>
            <el-option label="手动调整" value="6"></el-option>
            <el-option label="清空" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="获取时间" style="margin-left:25px;">
          <el-date-picker
            v-model="form.value7"
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
      <idTable style="margin-top:20px"></idTable>
    </div>
  </div>
</template>

<script>
import idTable from './components/idTable'
export default {
  name: 'integralDetails',
  components:{ idTable },
  data() {
    return {
      inline:true,
      form:{
        value2:'',
        value3:'1',
        value7:''
      },
    }
  },
  watch: {

  },
  created() {
    
  },
  destroyed() {
    
  },
  methods: {
    onSubmit(){},
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.top_part{
  width: 100%;
  background: #fff;
  border-radius: 3px;
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
