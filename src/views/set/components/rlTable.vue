/* 角色列表 */
<template>
  <div>
    <el-table
      :data="dataList"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'name9', order: 'descending'}"
      @selection-change="handleSelectionChange"
      >
      <el-table-column
      type="selection"
      width="55">
      </el-table-column>
      <el-table-column
        prop="cashoutSn"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="memberInfoId"
        label="角色描述">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="包含人数">
      </el-table-column>
      <el-table-column
        prop="status"
        label="创建人">
      </el-table-column>
      <el-table-column
        prop="tradeDetailSn"
        label="创建时间">
      </el-table-column>
      <el-table-column
      label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" style="color:#FD4C2B">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button style="margin-top:10px;">批量删除</el-button>
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
  name: "rlTable",
  extends: TableBase,
  data() {
    return {
      dataList:[
        {
          cashoutSn:'123213',
          memberInfoId:'123123',
          amount:'123123',
          status:'1',
          tradeDetailSn:'123213213'
        },
      ],
      multipleSelection: [],
    };
  },
  created() {

  },
  methods: {
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    handleClick(row){

    }
  },
  components: {}
};
</script>
