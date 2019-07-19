/* 收支明细列表 */
<template>
  <div>
    <el-table
      :data="dataList"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'name9', order: 'descending'}"
      @selection-change="handleSelectionChange"
      >
      <el-table-column
      type="selection"
      width="55">
      </el-table-column>
      <el-table-column
        prop="name1"
        label="提现编号">
      </el-table-column>
      <el-table-column
        prop="name2"
        label="客户ID">
      </el-table-column>
      <el-table-column
        prop="name3"
        label="提现金额（元）">
      </el-table-column>
      <el-table-column
        prop="name4"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="name5"
        label="交易流水号">
      </el-table-column>
      <el-table-column
        prop="name9"
        label="申请时间"
        sortable>
      </el-table-column>
      <el-table-column
      label="操作">
      </el-table-column>
    </el-table>
  </div>
</template>

<script type='es6'>
import TableBase from "@/components/TableBase";
export default {
  name: "reTable",
  extends: TableBase,
  data() {
    return {
      dataList:[],
      multipleSelection: [],
    };
  },
  created() {

  },
  methods: {
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
  },
  components: {}
};
</script>
