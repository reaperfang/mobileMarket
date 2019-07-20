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
        prop="name1"
        label="日期"
        sortable>
      </el-table-column>
      <el-table-column
        prop="name2"
        label="收入（元）">
      </el-table-column>
      <el-table-column
        prop="name3"
        label="支出（元）">
      </el-table-column>
      <el-table-column
        prop="name4"
        label="总收入（元）">
      </el-table-column>
    </el-table>
  </div>
</template>

<script type='es6'>
import TableBase from "@/components/TableBase";
export default {
  name: "drTable",
  extends: TableBase,
  data() {
    return {
      dataList:[],
    };
  },
  created() {

  },
  methods: {
    
  },
  components: {}
};
</script>
