/* 商品交易热销Top5列表 */
<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="date"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="averagePayment"
        label="客单价（元）">
      </el-table-column>
      <el-table-column
        prop="orderCount"
        label="订单量（笔）">
      </el-table-column>
      <el-table-column
        prop="averageOrderPayment"
        label="人均消费金额（元）"
      >
      </el-table-column>
    </el-table>
    <div class="page_styles">
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="sizes, prev, pager, next"
        :total="listObj.totalPage">
      </el-pagination> -->
          <el-pagination @size-change="handleSizeChange" 
          @current-change="handleCurrentChange" 
          :current-page="index" 
          :page-sizes="[5, 10, 15, 20, 25, 30]" 
          :page-size="size" 
          layout="total, sizes, prev, pager, next, jumper" 
          :total="tableCopyTableList.length">
          </el-pagination>
    </div>
  </div>
</template>

<script type='es6'>
import TableBase from "@/components/TableBase";
export default {
  name: "ct1Table",
  extends: TableBase,
  data() {
    return {
      tableData:[],
      tableCopyTableList: [],
      index: 1,
      size: 10
    };
  },
  props:{
    listObj:{
      type:Object,
      default:{}
    }
  },
  created() {
    this.tableData = this.listObj.list;
    this.tableCopyTableList = JSON.parse(JSON.stringify(this.tableData));
    this.tableData = this.paging(this.size, this.index);
  },
  methods: {
    // handleCurrentChange(){

    // },
    // handleSizeChange(){

    // }
    // 页数改变事件
    handleSizeChange(size) {
      this.size = size;
      this.tableData = this.paging(size, this.index);
    },
    // 页码改变事件
    handleCurrentChange(current) {
      this.index = current;
      this.tableData = this.paging(this.size, current);
    },
    // 本地分页的方法
    paging(size, current) {
      const tableList = JSON.parse(JSON.stringify(this.tableCopyTableList));
      const tablePush = [];
      tableList.forEach((item, index) => {
        if (size * (current - 1) <= index && index <= size * current - 1) {
          tablePush.push(item);
        }
      });
      return tablePush;
    }
  },
  components: {}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .cell{
            .btns{
                span{
                    color: #655EFF;
                    margin-right: 5px;
                }
            }
        }

</style>
