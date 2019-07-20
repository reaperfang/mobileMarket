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
        label="交易流水号">
      </el-table-column>
      <el-table-column
        prop="name2"
        label="收支类型">
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
        label="支付方式">
      </el-table-column>
      <el-table-column
        prop="name6"
        label="微信流水号">
      </el-table-column>
      <el-table-column
        prop="name7"
        label="交易金额（元）">
      </el-table-column>
      <el-table-column
        prop="name8"
        label="开票">
      </el-table-column>
      <el-table-column
        prop="name9"
        label="交易时间"
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
