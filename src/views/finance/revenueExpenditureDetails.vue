<!--收支明细-->
<template>
  <div>
    <div class="top_part">
      <el-form ref="form" :model="form" :inline="inline" label-width="70px">
        <el-form-item>
          <el-select v-model="form.searchType" placeholder="交易流水号" style="width:124px;">
            <el-option
              v-for="item in revenueExpenditureTerms"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.searchValue" placeholder="请输入" style="width:226px;"></el-input>
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select v-model="form.businessType" style="width:210px;">
            <el-option
              v-for="item in rebusinessTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="支付方式">
          <el-select v-model="form.payWay" style="width:210px;">
            <el-option
              v-for="item in payTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易金额">
          <el-input v-model="form.amountMin" placeholder="请输入" style="width:120px;"></el-input>
          -
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.amountMax" placeholder="请输入" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="交易时间" style="margin-left:25px;">
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
        <el-button icon="document" @click='exportToExcel()'>导出</el-button>
      </div>
      <reTable style="margin-top:20px"></reTable>
    </div>
  </div>
</template>

<script>
import Blob from '@/excel/Blob'
import Export2Excel from '@/excel/Export2Excel.js'
import reTable from './components/reTable'
import financeCons from '@/system/constant/finance'
export default {
  name: 'revenueExpenditureDetails',
  components:{ reTable },
  data() {
    return {
      inline:true,
      form:{
        searchType:1,
        searchValue:'',
        businessType:1,
        payWay:1,
        amountMin:'',
        amountMax:'',
        value7:''
      },
      dataList:[
        {
          tradeDetailSn:'123231',
          tradeType:'123231',
          businessType:'123231',
          relationSn:'123231',
          payWay:'123231',
          wechatTradeSn:'123231',
          amount:'123231',
          isInvoice:'123231',
          tradeTime:'123231'
        },
      ]
    }
  },
  watch: {

  },
  computed:{
    revenueExpenditureTerms(){
      return financeCons.revenueExpenditureTerms;
    },
    rebusinessTypes(){
      return financeCons.rebusinessTypes;
    },
    payTypes(){
      return financeCons.payTypes;
    }
  },
  created() {    
  },
  destroyed() {
  },
  methods: {
    onSubmit(){},
    //导出
    exportToExcel() {
        //excel数据导出
        require.ensure([], () => {
            const {
                export_json_to_excel
            } = require('@/excel/Export2Excel.js');
            const tHeader = ['序号','省份', '投资总额', '收益总额', '主要投资项目','投资周期', '投资人数', '投资年变化率','备注'];
            const filterVal = ['index','provinces', 'orderMoney', 'incomeMoney', 'payType','orderPeriod', 'orderPersonConunt', 'orderYearRate', 'remarks'];
            const list = this.dataList;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '列表excel');
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
