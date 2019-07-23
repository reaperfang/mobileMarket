/* 收支明细列表 */
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
        label="提现编号">
      </el-table-column>
      <el-table-column
        prop="memberInfoId"
        label="客户ID">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="提现金额（元）">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="tradeDetailSn"
        label="交易流水号">
      </el-table-column>
      <el-table-column
        prop="applyTime"
        label="申请时间"
        sortable>
      </el-table-column>
      <el-table-column
      label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">审核</el-button>
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
  name: "reTable",
  extends: TableBase,
  data() {
    return {
      dataList:[
        {
          cashoutSn:'123213',
          memberInfoId:'123123',
          amount:'123123',
          status:'1',
          tradeDetailSn:'123213213',
          applyTime:'2019-05-23'
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
