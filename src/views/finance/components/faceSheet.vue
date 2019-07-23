<!--收支明细-->
<template>
  <div>
    <div class="top_part">
      <el-form ref="form" :model="form" :inline="inline" label-width="70px">
        <el-form-item>
          <el-select v-model="form.searchType" placeholder="订单编号" style="width:124px;">
            <el-option
              v-for="item in fsTerms"
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
              v-for="item in fsTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="快递公司">
          <el-input v-model="form.expressCompany" placeholder="请输入" style="width:120px;"></el-input>
        </el-form-item>
        <el-form-item label="发货时间" style="margin-left:25px;">
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
      <fsTable style="margin-top:20px"></fsTable>
    </div>
  </div>
</template>

<script>
import Blob from '@/excel/Blob'
import Export2Excel from '@/excel/Export2Excel.js'
import fsTable from './fsTable'
import financeCons from '@/system/constant/finance'
export default {
  name: 'faceSheet',
  components:{ fsTable },
  data() {
    return {
      inline:true,
      form:{
        searchType:1,
        searchValue:'',
        businessType:1,
        expressCompany:'',
        value6:'',
        value7:''
      },
      dataList:[
        {
          expressSn:'1213',
          expressCompany:'中通',
          businessType:'1',
          relationSn:'232323',
          createUserName:'张三',
          createTime:'2019-07-22'
        }
      ],
    }
  },
  watch: {

  },
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
            const tHeader = ['快递单号','快递公司', '业务类型', '关联单据编号', '操作人','操作时间'];
            const filterVal = ['expressSn','expressCompany', 'businessType', 'relationSn', 'createUserName','createTime'];
            const list = this.dataList;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '电子面单列表');
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
