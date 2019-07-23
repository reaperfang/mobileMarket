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
        prop="accountDate"
        label="日期"
        sortable>
      </el-table-column>
      <el-table-column
        prop="income"
        label="收入（元）">
      </el-table-column>
      <el-table-column
        prop="expend"
        label="支出（元）">
      </el-table-column>
      <el-table-column
        prop="realIncome"
        label="总收入（元）">
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
  name: "drTable",
  extends: TableBase,
  data() {
    return {
      dataList:[
        {
          accountDate:'2019-02-23',
          income:'12',
          expend:'2',
          realIncome:'10',
        },
        {
          accountDate:'2019-02-23',
          income:'12',
          expend:'2',
          realIncome:'10',
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
