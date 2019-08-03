/* 客户标签列表 */
<template>
  <div>
    <el-table
      :data="tagList"
      style="width: 100%"
      ref="clientLabelTable"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        type="selection"
      >
      </el-table-column>
      <el-table-column
        prop="tagName"
        label="标签名称">
      </el-table-column>
      <el-table-column
        prop="tagType"
        label="标签类型">
      </el-table-column>
      <el-table-column
        prop="importNum"
        label="包含人数">
      </el-table-column>
      <el-table-column
        prop="labelCondition"
        label="标签条件">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <span class="edit_span">
                <i class="edit_i"></i>
                查看&编辑
            </span>
        </template>
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
    <div class="a_line">
      <el-checkbox v-model="checkAll" @change="handleChange"></el-checkbox>
      <el-button type="primary">批量删除</el-button>
    </div>
  </div>
</template>

<script type='es6'>
import clientApi from '@/api/client'
import TableBase from "@/components/TableBase";
export default {
  name: "clTable",
  extends: TableBase,
  data() {
    return {
      checkAll: false
    };
  },
  computed: {
    tagList() {
      return clientApi.tagList
    }
  },
  created() {

  },
  methods: {
    handleChange() {
      this.tagList.forEach(row => {
        this.$refs.clientLabelTable.toggleRowSelection(row)
      });
    }
  },
  components: {}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.edit_span{
    color: #655EFF;
    .edit_i{
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 8px;
        background: url("../../../../assets/images/client/icon_edit.png") 0 0 no-repeat;
    }
}
.a_line{
  padding-left: 17px;
}
</style>
