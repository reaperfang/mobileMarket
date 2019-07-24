<!--积分明细-->
<template>
  <div>
    <div class="top_part">
      <el-form ref="form" :model="form" :inline="inline">
        <el-form-item label="客户ID">
          <el-input v-model="form.memberInfoId" placeholder="请输入" style="width:226px;"></el-input>
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select v-model="form.businessTypeId" style="width:100px;">
            <el-option
              v-for="item in idbusinessTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="获取时间" style="margin-left:25px;">
          <el-date-picker
            v-model="form.value7"
            type="datetimerange"
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
      <idTable style="margin-top:20px"></idTable>
    </div>
  </div>
</template>

<script>
import utils from "@/utils";
import Blob from '@/excel/Blob'
import Export2Excel from '@/excel/Export2Excel.js'
import idTable from './components/idTable'
import financeCons from '@/system/constant/finance'
export default {
  name: 'integralDetails',
  components:{ idTable },
  data() {
    return {
      pickerNowDateBefore: {
        disabledDate: (time) => {
          return time.getTime() > new Date();
        }
      },
      inline:true,
      form:{
        memberInfoId:'',
        businessTypeId:1,
        value7:''
      },
      dataList:[
        {
          scoreDetailSn:'123213123',
          memberInfoId:'124',
          businessTypeId:'1',
          changeScore:'12',
          surplusScore:'10',
          changeTime:'2019-02-05',
          remarks:'备注'
        },
      ]
    }
  },
  watch: {

  },
  computed:{
    idbusinessTypes(){
      return financeCons.idbusinessTypes;
    }
  },
  created() {
    
  },
  destroyed() {
    
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
            const tHeader = ['交易流水号','收支类型', '业务类型', '关联单据编号', '支付方式','微信流水号', '交易金额（元）', '开票','交易时间'];
            const filterVal = ['tradeDetailSn','tradeType', 'businessType', 'relationSn', 'payType','wechatTradeSn', 'amount', 'isInvoice', 'tradeTime'];
            const list = this.dataList;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '收支明细列表');
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
