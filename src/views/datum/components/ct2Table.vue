/* 商品交易热销Top5列表 */
<template>
  <div>
    <el-table
      :data="dataList"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="importTime"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="channel"
        label="浏览量"
        sortable
       >
      </el-table-column>
      <el-table-column
        prop="importNum"
        label="访客量"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="importNum"
        label="加购人数"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="importNum"
        label="下单人数"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="importNum"
        label="支付人数"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="importNum"
        label="下单支付转化率"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="importNum"
        label="复购率"
        sortable
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
        :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script type='es6'>
import TableBase from "@/components/TableBase";
export default {
  name: "ct2Table",
  extends: TableBase,
  data() {
    return {
      dataList:[
        {
            choose: true,
            importTime:"",
            channel:"",
            importNum:"",
            successNum:"",
            failNum:"",
            buyTime:"",
            operator:""
        },
      ],
    };
  },
  created() {

  },
  methods: {
    
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
