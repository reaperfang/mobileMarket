/* 商品交易热销Top5列表 */
<template>
  <div>
    <el-table
      :data="listObj.shopGoodsSellInfoDataList"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        label="商品名称">
        <template slot-scope="scope">
          <div  style="height:60px; display:flex">
            <img :src="scope.row.goodsImgUrl" alt="" style="width:60px;height:60px;display:inline-block" />
             <span style="line-height:60px;display:inline-block">{{scope.row.goodsName}}</span>
            </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="browGoodsTotal"
        label="浏览量"
        sortable
       >
      </el-table-column>
      <el-table-column
        prop="visitGoodsTotal"
        label="访客量"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="addPurchasedPersonTotal"
        label="加购人数"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="orderSubmitPersonTotal"
        label="下单人数"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="payOrderPersonTotal"
        label="支付人数"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="submitOrderConversionRate"
        label="下单支付转化率"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="againBuyGoodsRate"
        label="复购率"
        sortable
        >
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
        :total="listObj.totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script type='es6'>
import TableBase from "@/components/TableBase";
export default {
  name: "ct2Table",
  extends: TableBase,
  props:{
    listObj:{
      type:Object,
      default:[]
    }
  },
  data() {
    return {
      pageSize:10
    };
  },
  created() {

  },
  methods: {
    handleCurrentChange(val){
      this.$emit('getProductDetails',val,this.pageSize)
    },
    handleSizeChange(val){
      this.pageSize = val
      this.$emit('getProductDetails',1,val)
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
