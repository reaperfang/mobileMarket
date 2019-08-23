/* 会员消费列表 */
<template>
  <div>
    <el-table
      :data="dataObj.shopMemberConsumerList"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        type="index"
        label="排行">
      </el-table-column>
      <el-table-column
        prop="memberNickName"
        label="会员昵称">
      </el-table-column>
      <el-table-column
        prop="memberPhone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="memberLevel"
        label="等级"
      >
      </el-table-column>
      <el-table-column
        prop="integral"
        label="积分（余额）"
      >
      </el-table-column>
      <el-table-column
        prop="totalConsumerAmount"
        label="消费金额（累计）"
      >
      </el-table-column>
      <el-table-column
        prop="totalOrder"
        label="计单数（累计）"
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
        :total="dataObj.totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script type='es6'>
import TableBase from "@/components/TableBase";
export default {
  name: "mcTable",
  extends: TableBase,
  data() {
    return {
      
    };
  },
  props:{
    dataObj:{
      type:Object,
      default:{}
    }
  },
  created() {

  },
  methods: {
    handleSizeChange(val){
      console.log(1,val)
      this.$emit('getMember',1,val)
    },
    handleCurrentChange(val){
      console.log(2,val)
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
