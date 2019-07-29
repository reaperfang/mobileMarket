/* 会员分析列表 */
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
        label="排序">
      </el-table-column>
      <el-table-column
        prop="channel"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="importNum"
        label="会员类型">
      </el-table-column>
      <el-table-column
        prop="successNum"
        label="手机号码"
      >
      </el-table-column>
      <el-table-column
        prop="failNum"
        label="会员昵称"
      >
      </el-table-column>
      <el-table-column
        prop="buyTime"
        label="积分"
      >
      </el-table-column>
      <el-table-column
        prop="operator"
        label="入会时间"
      >
      </el-table-column>
      <el-table-column
        prop="operator"
        label="交易次数（总）"
      >
      </el-table-column>
      <el-table-column
        prop="operator"
        label="订单（总）金额"
      >
      </el-table-column>
      <el-table-column
        prop="operator"
        label="最后交易时间"
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
  name: "mcTable",
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
