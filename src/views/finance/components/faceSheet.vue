<!--电子面单-->
<template>
  <div>
    <div class="top_part">
      <el-form ref="ruleForm" :model="ruleForm" :inline="inline" label-width="70px">
        <el-form-item>
          <el-select v-model="ruleForm.searchType" placeholder="订单编号" style="width:124px;">
            <el-option
              v-for="item in fsTerms"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="ruleForm.searchValue" placeholder="请输入" style="width:226px;"></el-input>
        </el-form-item>
        <el-form-item label="业务类型">
          <el-select v-model="ruleForm.businessType" style="width:210px;">
            <el-option
              v-for="item in fsTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递公司">
          <el-input v-model="ruleForm.expressCompany" placeholder="请输入" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="发货时间" style="margin-left:25px;">
          <el-date-picker
            v-model="ruleForm.timeValue"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '00:00:00']"
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
        <span>全部 <em>{{total}}</em> 项</span>
        <el-button icon="document" @click='exportToExcel()'>导出</el-button>
      </div>
      <el-table
        :data="dataList"
        class="table"
        :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
        :default-sort = "{prop: 'date', order: 'descending'}"
        >
        <el-table-column
          prop="expressSn"
          label="快递单号">
        </el-table-column>
        <el-table-column
          prop="expressCompany"
          label="快递公司">
        </el-table-column>
        <el-table-column
          prop="businessType"
          label="业务类型">
        </el-table-column>
        <el-table-column
          prop="relationSn"
          label="关联单据编号">
        </el-table-column>
        <el-table-column
          prop="createUserName"
          label="操作人">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="操作时间"
          sortable>
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
  </div>
</template>

<script>
import utils from "@/utils";
import TableBase from "@/components/TableBase";
import financeCons from '@/system/constant/finance'
export default {
  name: 'faceSheet',
  extends: TableBase,
  data() {
    return {
      pickerNowDateBefore: {
          disabledDate: (time) => {
                return time.getTime() > new Date();
              }
      },
      inline:true,
      ruleForm:{
        searchType:'relationSn',
        searchValue:'',
        businessType:1,
        expressCompany:'',
        timeValue:''
      },
      dataList:[ ],
      total:0
    }
  },
  watch: {},
  computed:{
    fsTerms(){
      return financeCons.fsTerms;
    },
    fsTypes(){
      return financeCons.fsTypes;
    }
  },
  created() {    
  },
  methods: {
    init(){
      let query = {
        queryType:'',
        relationSn:'',
        expressSn:'',
        expressCompany:'',
        businessType:'',
        startTime:'',
        endTime:'',
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
        query.startTime = utils.formatDate(timeValue[0], "yyyy-MM-dd hh:mm:ss")
        query.endTime = utils.formatDate(timeValue[1], "yyyy-MM-dd hh:mm:ss")
      }
      return query;
    },

    fetch(){
      let query = this.init();
      this._apis.finance.getListFs(query).then((response)=>{
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
        searchType:'relationSn',
        searchValue:'',
        businessType:1,
        expressCompany:'',
        timeValue:''
      }
    },
    //导出
    exportToExcel() {
      // let query = this.init();
      // this._apis.finance.exportTaRe(query).then((response)=>{
      //   window.location.href = response
      // }).catch((error)=>{
      //   this.$notify.error({
      //     title: '错误',
      //     message: error
      //   });
      // })
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
.table{
  width: 100%; 
  margin-top:20px;
}
</style>
