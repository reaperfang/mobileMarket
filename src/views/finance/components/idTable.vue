/* 收支明细列表 */
<template>
  <div>
    <el-table
      :data="dataList"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="scoreDetailSn"
        label="积分流水号">
      </el-table-column>
      <el-table-column
        prop="memberInfoId"
        label="客户ID">
      </el-table-column>
      <el-table-column
        prop="businessTypeId"
        label="业务类型">
      </el-table-column>
      <el-table-column
        prop="changeScore"
        label="变动积分">
      </el-table-column>
      <el-table-column
        prop="surplusScore"
        label="剩余积分">
      </el-table-column>
      <el-table-column
        prop="changeTime"
        label="交易时间"
        sortable>
      </el-table-column>
      <el-table-column
        prop="remarks"
        label="备注">
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
  name: "cbTable",
  extends: TableBase,
  data() {
    return {
      dataList:[
        {
          scoreDetailSn:'123213123',
          memberInfoId:'124',
          businessTypeId:'1',
          changeScore:'12',
          surplusScore:'10',
          changeTime:'2019-02-05',
          remarks:'备注'
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
