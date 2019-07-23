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
        prop="tradeDetailSn"
        label="交易流水号">
      </el-table-column>
      <el-table-column
        prop="tradeType"
        label="收支类型">
      </el-table-column>
      <el-table-column
        prop="businessType"
        label="业务类型">
      </el-table-column>
      <el-table-column
        prop="relationSn"
        label="关联单据编号">
      </el-table-column>
      <el-table-column
        prop="payWay"
        label="支付方式">
      </el-table-column>
      <el-table-column
        prop="wechatTradeSn"
        label="微信流水号">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="交易金额（元）">
      </el-table-column>
      <el-table-column
        prop="isInvoice"
        label="开票">
      </el-table-column>
      <el-table-column
        prop="tradeTime"
        label="交易时间"
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
  name: "reTable",
  extends: TableBase,
  data() {
    return {
      dataList:[
        {
          tradeDetailSn:'123231',
          tradeType:'123231',
          businessType:'123231',
          relationSn:'123231',
          payWay:'123231',
          wechatTradeSn:'123231',
          amount:'123231',
          isInvoice:'123231',
          tradeTime:'123231'
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
<style lang="scss">

</style>

