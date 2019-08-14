<template>
  <div>
      <el-table :data="tableData[currentTab]" stripe ref="multipleTable" @selection-change="handleSelectionChange" @row-click="rowClick">
          <el-table-column
            type="selection"  
            width="55">
          </el-table-column>
          <el-table-column prop="pageName" label="页面名称"></el-table-column>
        </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="Number(startIndex) || 1"
          :page-sizes="[5, 10, 20, 50, 100, 200, 500]"
          :page-size="pageSize*1"
          :total="total*1"
          layout="total, sizes, prev, pager, next, jumper"
          >
        </el-pagination>
      </div>
  </div>
</template>

<script>
import tableBase from '@/components/TableBase';
export default {
  name: "systemPage",
  extends: tableBase,
  components: {},
  props: {
     
  },
  data() {
    return {
      ruleForm: {
        name: ''
      },
      rules: {},
      tableData: [],
    };
  },
  created() {
  },
  methods: {
    fetch() {
      this._apis.shop.getClassifyList(this.ruleForm).then((response)=>{
        this.tableData = response.list;
        this.total = response.total;
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      });
    },

   /* 选中某一行 */
    rowClick(row, column, event) {
      this.$emit('seletedRow',  {
        pageType: 'systemPage',
        data: {
          id: row.id,
          name: row.name,
          title: row.title
        }
      });
    },

  }
};
</script>

<style lang="scss">
.inline-head{
  justify-content: flex-end;
}
</style>