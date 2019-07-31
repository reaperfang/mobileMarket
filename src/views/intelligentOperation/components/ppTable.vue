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
        label="时间">
      </el-table-column>
      <el-table-column
        prop="channel"
        label="客单价（元）">
      </el-table-column>
      <el-table-column
        prop="importNum"
        label="单次购买金额（元）">
      </el-table-column>
      <el-table-column
        prop="importNum"
        label="购买频次（次）">
      </el-table-column>
      <el-table-column
        prop="importNum"
        label="订单量（笔）">
      </el-table-column>
      <el-table-column
        prop="successNum"
        label="人均消费金额（元）"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script type='es6'>
import TableBase from "@/components/TableBase";
export default {
  name: "ct1Table",
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
