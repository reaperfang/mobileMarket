<!--客户ID余额-->
<template>
  <div>
    <div class="top_part">
      <el-form ref="form" :model="form" :inline="inline" label-width="90px">
        <el-form-item label="交易流水号">
          <el-input v-model="form.relationSn" placeholder="请输入" style="width:226px;"></el-input>
        </el-form-item>
        <el-form-item label="交易类型">
          <el-select v-model="form.businessType" style="width:100px;">
            <el-option
              v-for="item in transactionTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易时间" style="margin-left:25px;">
          <el-date-picker
            v-model="form.tradeTime"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="under_part">
      <div class="total">
        <span>全部 <em>700</em> 项</span>
        <el-button icon="document" @click='exportToExcel()'>导出</el-button>
      </div>
      <cbTable style="margin-top:20px"></cbTable>
    </div>
  </div>
</template>

<script>
import Blob from '@/excel/Blob'
import Export2Excel from '@/excel/Export2Excel.js'
import cbTable from './components/cbTable'
import financeCons from '@/system/constant/finance'
export default {
  name: 'revenueSituation',
  components:{ cbTable },
  data() {
    return {
      inline:true,
      form:{
        relationSn:'',
        businessType:1,
        tradeTime:''
      },
      dataList:[
        {
          tradeDetailSn:'',
          relationSn:'',
          memberInfoId:'',
          businessType:'',
          changeAmount:'',
          surplusAmount:'',
          tradeTime:''
        },
      ],
    }
  },
  watch: {

  },
  computed:{
    transactionTypes(){
      return financeCons.transactionTypes;
    },
  },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
    
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    onSubmit(){},
    //重置
    resetForm(){
      
    },
    //导出
    exportToExcel() {
        //excel数据导出
        require.ensure([], () => {
            const {
                export_json_to_excel
            } = require('@/excel/Export2Excel.js');
            const tHeader = ['交易流水号','关联单据编号', '客户ID', '交易类型', '变动金额（元）','剩余金额（元）', '交易时间'];
            const filterVal = ['tradeDetailSn','relationSn', 'memberInfoId', 'businessType', 'changeAmount','surplusAmount', 'tradeTime'];
            const list = this.dataList;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '客户余额列表');
        })
    },
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
    },
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
