/* cardManage 领卡记录列表 */
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
        label="会员卡名称">
      </el-table-column>
      <el-table-column
        prop="channel"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="importNum"
        label="卡号">
      </el-table-column>
      <el-table-column
        prop="successNum"
        label="领取人ID"
      >
      </el-table-column>
      <el-table-column
        prop="failNum"
        label="领取时间"
      >
      </el-table-column>
      <el-table-column
        prop="buyTime"
        label="获取方式"
      >
      </el-table-column>
      <el-table-column
        prop="operator"
        label="发放人"
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
  name: "acTable",
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
