<template>
  <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0" :inline="true">
          <div class="inline-head">
            <el-form-item label="" prop="name">
              <el-select v-if="classifyList.length" v-model="ruleForm.pageCategoryInfoId" placeholder="请选择活动类型">
                <el-option label="全部分类" value=""></el-option>
                <el-option v-for="(item, key) of classifyList" :key="key" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入活动名称"></el-input>
            </el-form-item>
            <el-form-item label="" prop="">
              <el-button type="primary" @click="fetch">搜  索</el-button>
            </el-form-item>
          </div>
        </el-form>
        <el-table :data="tableData[currentTab]" stripe ref="multipleTable" @selection-change="handleSelectionChange" @row-click="rowClick">
          <el-table-column
            type="selection"  
            width="55">
          </el-table-column>
          <el-table-column prop="activityName" label="活动名称"></el-table-column>
          <el-table-column prop="activityType" label="活动类型"></el-table-column>
          <el-table-column prop="visitor" label="访客数"></el-table-column>
          <el-table-column prop="browse" label="浏览数"></el-table-column>
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
  name: "marketCampaign",
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
        pageType: 'marketCampaign',
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