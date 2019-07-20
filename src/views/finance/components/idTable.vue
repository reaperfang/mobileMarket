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
        label="积分流水号">
      </el-table-column>
      <el-table-column
        prop="name2"
        label="客户ID">
      </el-table-column>
      <el-table-column
        prop="name3"
        label="业务类型">
      </el-table-column>
      <el-table-column
        prop="name4"
        label="变动积分">
      </el-table-column>
      <el-table-column
        prop="name5"
        label="剩余积分">
      </el-table-column>
      <el-table-column
        prop="name6"
        label="交易时间"
        sortable>
      </el-table-column>
      <el-table-column
        prop="name7"
        label="备注">
      </el-table-column>
    </el-table>
  </div>
</template>

<script type='es6'>
import TableBase from "@/components/TableBase";
export default {
  name: "cbTable",
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
