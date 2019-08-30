<template>
  <div>
     <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0" :inline="true">
          <div class="inline-head">
            <el-form-item label="" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入分类名称"></el-input>
            </el-form-item>
            <el-form-item label="" prop="">
              <el-button type="primary" @click="fetch">搜  索</el-button>
            </el-form-item>
          </div>
        </el-form>
        <el-table :data="tableData" stripe ref="multipleTable" @selection-change="handleSelectionChange" @row-click="rowClick" v-loading="loading">
          <el-table-column
            type="selection"  
            width="55">
          </el-table-column>
          <el-table-column prop="name" label="分类名称"></el-table-column>
          <el-table-column prop="pageNum" label="页面数量"></el-table-column>
          <el-table-column prop="updateTime" label="更新时间"></el-table-column>
          <el-table-column prop="updateUserName" label="操作账户"></el-table-column>
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
  name: "microPageClassify",
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
      this.loading = true;
      this._apis.shop.getClassifyList(this.ruleForm).then((response)=>{
        this.tableData = response.list;
        this.total = response.total;
        this.loading = false;
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
        this.loading = false;
      });
    },

    /* 选中某一行 */
    rowClick(row, column, event) {
      this.$emit('seletedRow',  {
        pageType: 'microPageClassify',
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