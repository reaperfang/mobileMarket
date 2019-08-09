<!--提现明细-->
<template>
  <div>
    <div class="top_part">
      <el-form ref="ruleForm" :model="ruleForm" :inline="inline">
        <el-form-item>
          <el-select v-model="ruleForm.searchType" placeholder="提现编号" style="width:124px;">
            <el-option
              v-for="item in presentations"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="ruleForm.searchValue" placeholder="请输入" style="width:226px;"></el-input>
        </el-form-item>
        <el-form-item label="申请时间" style="margin-left:25px;">
          <el-date-picker
            v-model="ruleForm.timeValue"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']"
            :picker-options="pickerNowDateBefore">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="ruleForm.status" style="width:210px;">
            <el-option
              v-for="item in presentationStatus"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户ID">
          <el-input v-model="ruleForm.memberInfoId" placeholder="请输入" style="width:226px;"></el-input>
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
      <el-table
        :data="dataList"
        class="table"
        :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
        :default-sort = "{prop: 'applyTime', order: 'descending'}"
        @selection-change="handleSelectionChange"
        >
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
          prop="cashoutSn"
          label="提现编号">
        </el-table-column>
        <el-table-column
          prop="memberInfoId"
          label="客户ID">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="提现金额（元）">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="tradeDetailSn"
          label="交易流水号">
        </el-table-column>
        <el-table-column
          prop="applyTime"
          label="申请时间"
          sortable>
        </el-table-column>
        <el-table-column
        label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">审核</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page_styles">
         <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="Number(ruleForm.pageNum) || 1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize*1"
          layout="sizes, prev, pager, next"
          :total="total*1">
        </el-pagination>
      </div>
    </div>
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible" :data="currentData"></component>
  </div>
</template>

<script>
import utils from "@/utils";
import TableBase from "@/components/TableBase"
import financeCons from '@/system/constant/finance'
import withdrawDialog from './dialogs/withdrawDialog'
import auditSuccessDialog from './dialogs/auditSuccessDialog'
import warnDialog from './dialogs/warnDialog'
import waitAuditDialog from './dialogs/waitAuditDialog'
import auditingDialog from './dialogs/auditingDialog'
import handleAuditDialog from './dialogs/handleAuditDialog'
import failAuditDialog from './dialogs/failAuditDialog'
import successAuditDialog from './dialogs/successAuditDialog'
export default {
  name: 'revenueSituation',
  extends: TableBase,
  components:{ withdrawDialog, auditSuccessDialog, warnDialog, waitAuditDialog, auditingDialog, handleAuditDialog, failAuditDialog, successAuditDialog },
  data() {
    return {
      pickerNowDateBefore: {
        disabledDate: (time) => {
          return time.getTime() > new Date();
        }
      },
      inline:true,
      ruleForm:{
        searchType:1,
        searchValue:'',
        timeValue:'',
        status:1,
        memberInfoId:''
      },
      dataList:[ ],
      total:0,
      currentDialog:"",
      dialogVisible: false,
      currentData:{}
    }
  },
  watch: { },
  computed:{
    presentations(){
      return financeCons.presentations;
    },
    presentationStatus(){
      return financeCons.presentationStatus;
    },
  },
  created() { },
  methods: {
    init(){
      let query = {
        memberInfoId:'',
        tradeDetailSn:'',
        cashoutSn:'',
        applyTimeStart:'',
        applyTimeEnd:'',
        status:'',
        startIndex:this.ruleForm.startIndex,
        pageSize:this.ruleForm.pageSize
      }
      for(let key  in query){
        if(this.ruleForm.searchType == key){
          query[key] = this.ruleForm.searchValue
        }
        for(let item in this.ruleForm){
          if(item == key){
            query[key] = this.ruleForm[item]
          }
        }
      }
      let timeValue = this.ruleForm.timeValue
      if(timeValue){
        query.applyTimeStart = utils.formatDate(timeValue[0], "yyyy-MM-dd hh:mm:ss")
        query.applyTimeEnd = utils.formatDate(timeValue[1], "yyyy-MM-dd hh:mm:ss")
      }
      return query;
    },

    fetch(){
      let query = this.init();
      this._apis.finance.getListWd(query).then((response)=>{
        this.dataList = response.list
        this.total = response.total || 0
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },
    //搜索
    onSubmit(){
      this.fetch()
    },
    //重置
    resetForm(){
      this.ruleForm = {
        searchType:1,
        searchValue:'',
        timeValue:'',
        status:1,
        memberInfoId:''
      }
    },
    //导出
    exportToExcel() {
      let query = this.init();
      this._apis.finance.exportTaRe(query).then((response)=>{
        window.location.href = response
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },
    batchCheck() {
      this.dialogVisible = true;
      this.currentDialog = "withdrawDialog";
      this.currentData.text = "请选择需要审核的数据";
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
.table{
  width: 100%; 
  margin-top:20px;
}
</style>
