/* 推客奖励列表 */
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
        label="客户ID">
      </el-table-column>
      <el-table-column
        prop="name2"
        label="奖励方式">
      </el-table-column>
      <el-table-column
        prop="name3"
        label="奖励内容">
      </el-table-column>
      <el-table-column
        prop="name4"
        label="时间"
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
  name: "taTable",
  extends: TableBase,
  props:['query'],
  data() {
    return {
      dataList:[],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(){
      // console.log('222222',this.query)
      this._apis.finance.getList(this.query).then((response)=>{
        // console.log('11111',response)
      }).catch((error)=>{
        this.$message.error(error);
      })
    }
  },
  components: {}
};
</script>
