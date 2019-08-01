/* 会员等级列表 */
<template>
  <div>
    <el-table
      :data="dataList"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        type="selection"
      >
      </el-table-column>
      <el-table-column
        prop="tagName"
        label="等级排序">
      </el-table-column>
      <el-table-column
        prop="tagType"
        label="等级名称">
      </el-table-column>
      <el-table-column
        prop="importNum"
        label="说明">
      </el-table-column>
      <el-table-column
        prop="tagCondition"
        label="等级条件">
      </el-table-column>
      <el-table-column
        prop="tagCondition"
        label="升级奖励">
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
            <el-switch></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <span class="edit_span">编辑</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="single_check">
        <el-checkbox v-model="checked"></el-checkbox>
        <el-button class="other_btn">批量禁用</el-button>
    </div>
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
  name: "cvTable",
  extends: TableBase,
  data() {
    return {
      dataList:[
        {
            choose: true,
            importTime:"",
            channel:"",
            importNum:"",
            successNum:"",
            failNum:"",
            buyTime:"",
            operator:""
        },
      ],
      checked: false
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
        background: url("../../../assets/images/client/icon_edit.png") 0 0 no-repeat;
    }
}
.single_check{
    padding: 10px 0 0 14px;
}
.other_btn{
    color: #655EFF;
    border-color: #655EFF;
}
</style>
