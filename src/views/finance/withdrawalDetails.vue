<!--提现明细-->
<template>
  <div>
    <div class="top_part">
      <el-form ref="form" :model="form" :inline="inline">
        <el-form-item>
          <el-select v-model="form.searchType" placeholder="提现编号" style="width:124px;">
            <el-option
              v-for="item in presentations"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.searchValue" placeholder="请输入" style="width:226px;"></el-input>
        </el-form-item>
        <el-form-item label="申请时间" style="margin-left:25px;">
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
        <el-form-item label="状态">
          <el-select v-model="form.status" style="width:210px;">
            <el-option
              v-for="item in presentationStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户ID">
          <el-input v-model="form.memberInfoId" placeholder="请输入" style="width:226px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm">重置</el-button>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="under_part">
      <div class="total">
        <span>全部 <em>{{total}}</em> 项</span>
        <span>
          <el-button type="primary" @click="batchCheck">批量审批</el-button>
          <el-button icon="document" @click='exportToExcel()'>导出</el-button>
        </span>
      </div>
      <wdTable style="margin-top:20px"></wdTable>
    </div>
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible" :data="currentData" @handleSubmit="handleSubmit"></component>
  </div>
</template>

<script>
import Blob from '@/excel/Blob'
import Export2Excel from '@/excel/Export2Excel.js'
import wdTable from './components/wdTable'
import financeCons from '@/system/constant/finance'
import withdrawDialog from './dialogs/withdrawDialog'
import auditSuccessDialog from './dialogs/auditSuccessDialog'
import warnDialog from './dialogs/warnDialog'
import waitAuditDialog from './dialogs/waitAuditDialog'
export default {
  name: 'revenueSituation',
  components:{ wdTable, withdrawDialog, auditSuccessDialog, warnDialog, waitAuditDialog },
  data() {
    return {
      pickerNowDateBefore: {
          disabledDate: (time) => {
                return time.getTime() > new Date();
              }
      },
      inline:true,
      form:{
        searchType:1,
        searchValue:'',
        status:1,
        memberInfoId:'',
        value6:'',
        value7:''
      },
      dataList:[
        {
          cashoutSn:'123213',
          memberInfoId:'123123',
          amount:'123123',
          status:'1',
          tradeDetailSn:'123213213',
          applyTime:'2019-05-23'
        },
      ],
      total:700,
      currentDialog:"",
      dialogVisible: false,
      currentData:{}
    }
  },
  watch: {

  },
  computed:{
    presentations(){
      return financeCons.presentations;
    },
    presentationStatus(){
      return financeCons.presentationStatus;
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
            const tHeader = ['提现编号','客户ID', '提现金额（元）', '状态', '交易流水号','申请时间'];
            const filterVal = ['cashoutSn','memberInfoId', 'amount', 'status', 'tradeDetailSn','applyTime'];
            const list = this.dataList;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '提现明细列表');
        })
    },
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
    },
    batchCheck() {
      this.dialogVisible = true;
      this.currentDialog = "waitAuditDialog";
      this.currentData.text = "请选择需要审核的数据";
    },
    handleSubmit() {
      this.dialogVisible = true;
      this.currentDialog = "auditSuccessDialog";
    }
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
