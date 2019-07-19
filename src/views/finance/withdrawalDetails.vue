<!--提现明细-->
<template>
  <div>
    <div class="top_part">
      <el-form ref="form" :model="form" :inline="inline" label-width="70px">
        <el-form-item>
          <el-select v-model="form.value1" placeholder="提现编号" style="width:124px;">
            <el-option label="提现编号" value="1"></el-option>
            <el-option label="交易流水号" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.value2" placeholder="请输入" style="width:226px;"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.value3" style="width:210px;">
            <el-option label="全部" value="1"></el-option>
            <el-option label="待审核" value="2"></el-option>
            <el-option label="成功" value="3"></el-option>
            <el-option label="失败" value="4"></el-option>
            <el-option label="处理中" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户ID">
          <el-input v-model="form.value5" placeholder="请输入" style="width:226px;"></el-input>
        </el-form-item>
        <el-form-item label="申请时间" style="margin-left:25px;">
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
        <span>
          <el-button type="primary">批量审批</el-button>
          <el-button>导出</el-button>
        </span>
      </div>
      <wdTable style="margin-top:20px"></wdTable>
    </div>
  </div>
</template>

<script>
import wdTable from './components/wdTable'
export default {
  name: 'revenueSituation',
  components:{ wdTable },
  data() {
    return {
      inline:true,
      form:{
        value1:'',
        value2:'',
        value3:'1',
        value4:'1',
        value5:'',
        value6:'',
        value7:''
      },
    }
  },
  watch: {

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
