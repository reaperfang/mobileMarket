/* 商品交易热销Top5列表 */
<template>
  <div>
    <el-table
      :data="listObj.list"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="date"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="averagePayment"
        label="客单价（元）">
      </el-table-column>
      <el-table-column
        prop="orderCount"
        label="订单量（笔）">
      </el-table-column>
      <el-table-column
        prop="averageOrderPayment"
        label="人均消费金额（元）"
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
        :total="listObj.totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script type='es6'>
import TableBase from "@/components/TableBase";
export default {
  name: "ct1Table",
  extends: TableBase,
  data() {
    return {
      listObj:{
        list:[],
        totalPage:100,
      }
    };
  },
  props:{
  },
  created() {

  },
  methods: {
    handleCurrentChange(){

    },
    handleSizeChange(){

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
