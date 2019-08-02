/* 获取积分规则列表 */
<template>
  <div>
    <el-table
      :data="dataList"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="tagName"
        label="获取积分场景">
      </el-table-column>
      <el-table-column
        prop="tagType"
        label="状态">
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
  </div>
</template>

<script type='es6'>
import TableBase from "@/components/TableBase";
export default {
  name: "cmTable",
  extends: TableBase,
  data() {
    return {
      dataList:[
        {
            importTime:"",
            channel:"",
            importNum:"",
            successNum:"",
            failNum:"",
            buyTime:"",
            operator:""
        },
      ],
    };
  },
  created() {

  },
  methods: {
    
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

</style>
