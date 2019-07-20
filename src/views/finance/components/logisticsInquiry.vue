<!--收支明细-->
<template>
  <div>
    <div class="top_part">
      <el-form ref="form" :model="form" :inline="inline" label-width="70px">
        <el-form-item>
          <el-select v-model="form.value1" placeholder="订单编号" style="width:124px;">
            <el-option
              v-for="item in fsTerms"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.value2" placeholder="请输入" style="width:226px;"></el-input>
        </el-form-item>
        <el-form-item label="查询时间" style="margin-left:25px;">
          <el-date-picker
            v-model="form.value3"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="快递公司">
          <el-input v-model="form.value2" placeholder="请输入" style="width:200px;"></el-input>
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
      <liTable style="margin-top:20px"></liTable>
    </div>
  </div>
</template>

<script>
import liTable from './liTable'
import financeCons from '@/system/constant/finance'
export default {
  name: 'logisticsInquiry',
  components:{ liTable },
  data() {
    return {
      inline:true,
      form:{
        value1:1,
        value2:'',
        value3:'',
      },
    }
  },
  watch: {

  },
  computed:{
    fsTerms(){
      return financeCons.fsTerms;
    },
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
