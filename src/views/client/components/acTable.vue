/* 全部客户列表 */
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
        prop="clientId"
        label="客户ID">
      </el-table-column>
      <el-table-column
        prop="clientInfo"
        label="客户信息">
      </el-table-column>
      <el-table-column
        prop="clientPhone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="identity"
        label="身份">
      </el-table-column>
      <el-table-column
        prop="integral"
        label="积分"
        sortable>
      </el-table-column>
      <el-table-column
        prop="accumulateSum"
        label="累计消费金额"
        sortable>
      </el-table-column>
      <el-table-column
        prop="buyTime"
        label="购买次数"
        sortable>
      </el-table-column>
      <el-table-column
        prop="unitPrice"
        label="客单价（元）"
        sortable>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <div class="btns clearfix">
                <span class="s1">详情</span>
                <span class="s2">删除</span>
                <span class="s3">标签</span>
                <span class="s4">加入黑名单</span>
            </div>
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
  name: "acTable",
  extends: TableBase,
  data() {
    return {
      dataList:[
        {
          clientId:'',
          clientInfo:'',
          clientPhone:'',
          identity:'',
          integral:'',
          accumulateSum:'',
          buyTime:'',
          unitPrice:''
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
/deep/ .cell{
            .btns{
                span{
                    display: block;
                    float: left;
                    height: 41px;
                    font-size: 12px;
                    padding-top: 22px;
                    text-align: center;
                    margin-right: 5px;
                    &.s1{
                        color:#655EFF;
                        background: url('../../../assets/images/client/icon_info.png') 0 0 no-repeat;
                    }
                    &.s2{
                        color:#F55858;
                        background: url('../../../assets/images/client/icon_delete.png') 0 0 no-repeat;
                    }
                    &.s3{
                        color:#FD932B;
                        background: url('../../../assets/images/client/icon_tag.png') 0 0 no-repeat;
                    }
                    &.s4{
                        color:#578EFA;
                        background: url('../../../assets/images/client/icon_addblack.png') 17px 0 no-repeat;
                    }
                }
            }
        }
.btns{
    span{
        display: block;
        float:left;
        height: 41px;
        &.s1{
            background: url('../../../assets/images/client/icon_info.png') 0 0 no-repeat;
            
        }
    }
}
</style>
