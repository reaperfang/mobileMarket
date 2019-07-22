/* 电子面单列表 */
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
        label="快递单号">
      </el-table-column>
      <el-table-column
        prop="name2"
        label="快递公司">
      </el-table-column>
      <el-table-column
        prop="name3"
        label="业务类型">
      </el-table-column>
      <el-table-column
        prop="name4"
        label="关联单据编号">
      </el-table-column>
      <el-table-column
        prop="name5"
        label="操作人">
      </el-table-column>
      <el-table-column
        prop="name6"
        label="操作时间"
        sortable>
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
    };
  },
  created() {

  },
  methods: {
    
  },
  components: {}
};
</script>
