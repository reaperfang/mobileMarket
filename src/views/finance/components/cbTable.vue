/* 收支明细列表 */
<template>
  <div>
    <el-table
      :data="dataList"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="tradeDetailSn"
        label="交易流水号">
      </el-table-column>
      <el-table-column
        prop="relationSn"
        label="关联单据编号">
      </el-table-column>
      <el-table-column
        prop="memberInfoId"
        label="客户ID">
      </el-table-column>
      <el-table-column
        prop="businessType"
        label="交易类型">
      </el-table-column>
      <el-table-column
        prop="changeAmount"
        label="变动金额（元）">
      </el-table-column>
      <el-table-column
        prop="surplusAmount"
        label="剩余金额（元）">
      </el-table-column>
      <el-table-column
        prop="tradeTime"
        label="交易时间"
        sortable>
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
  name: "cbTable",
  extends: TableBase,
  data() {
    return {
      dataList:[
        {
          tradeDetailSn:'',
          relationSn:'',
          memberInfoId:'',
          businessType:'',
          changeAmount:'',
          surplusAmount:'',
          tradeTime:''
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
