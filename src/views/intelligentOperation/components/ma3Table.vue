/* 渠道转化列表 */
<template>
  <div>
    <el-table
      :data="listObj.members"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="orderNumber"
        label="订单号">
      </el-table-column>
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="memberType"
        label="会员类型">
      </el-table-column>
      <el-table-column
        prop="name"
        label="会员昵称">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="tradeTime"
        label="维权时间">
      </el-table-column>
      <el-table-column
        prop="protectionGoodsCount"
        label="维权商品数">
      </el-table-column>
      <el-table-column
        prop="protectionType"
        label="维权类型"
        >
      </el-table-column>
      <el-table-column
        prop="protectionReason"
        label="维权原因"
        >
      </el-table-column>
    </el-table>
    <div class="page_styles">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="sizes, prev, pager, next"
        :total="listObj.count">
      </el-pagination>
    </div>
  </div>
</template>

<script type='es6'>
import TableBase from "@/components/TableBase";
export default {
  name: "mcTable",
  extends: TableBase,
  data() {
    return { 
      pageSize:10
    };
  },
  props:{
    listObj:{
      type:Object,
      default:{}
    }
  },
  created() {

  },
  methods: {
    handleSizeChange(val){
      this.pageSize = val;
      this.$emit('getRightsProtection',1,val)
    },
    handleCurrentChange(val){
      this.$emit('getRightsProtection',val,this.pageSize)
    }
  },
  components: {}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .cell{
            .btns{
                span{
                    color: #655EFF;
                    margin-right: 5px;
                }
            }
        }

</style>
