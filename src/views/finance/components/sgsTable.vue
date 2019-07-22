/* 物流查询列表 */
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
        label="消息内容">
      </el-table-column>
      <el-table-column
        prop="name2"
        label="消息类型">
      </el-table-column>
      <el-table-column
        prop="name3"
        label="是否拆分">
      </el-table-column>
      <el-table-column
        prop="name4"
        label="消息数量">
      </el-table-column>
      <el-table-column
        prop="name4"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="name5"
        label="发送时间"
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
