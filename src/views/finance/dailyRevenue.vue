<!--每日营收-->
<template>
  <div>
    <div class="top_part">
      <el-form ref="form" :model="form" :inline="inline">
        <el-form-item label="日期" style="margin-bottom:0px;">
          <el-date-picker
            v-model="timeValue"
            type="daterange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']"
            :picker-options="pickerNowDateBefore">
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
      <drTable style="margin-top:20px"></drTable>
    </div>
  </div>
</template>

<script>
import utils from "@/utils";
import Blob from '@/excel/Blob'
import Export2Excel from '@/excel/Export2Excel.js'
import drTable from './components/drTable'
export default {
  name: 'revenueSituation',
  components:{ drTable },
  data() {
    return {
      pickerNowDateBefore: {
          disabledDate: (time) => {
                return time.getTime() > new Date();
              }
      },
      inline:true,
      form:{},
      timeValue:'',
      dataList:[
        {
          accountDate:'2019-02-23',
          income:'12',
          expend:'2',
          realIncome:'10',
        },
        {
          accountDate:'2019-02-23',
          income:'12',
          expend:'2',
          realIncome:'10',
        },
      ],
    }
  },
  watch: {
    timeValue(){
      let time = utils.formatDate(this.timeValue[0], "yyyy-MM-dd")
      console.log('11111111',time)
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
            const tHeader = ['日期','收入（元）', '支出（元）', '总收入（元）'];
            const filterVal = ['accountDate','income', 'expend', 'realIncome'];
            const list = this.dataList;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '每日营收列表');
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
