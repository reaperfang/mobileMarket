/* 全部客户列表 */
<template>
  <div>
    <el-table
      :data="allUserList"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        type="selection"
        prop="memberSn"
        label="客户ID">
      </el-table-column>
      <el-table-column
        prop="nickName"
        label="客户信息">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="memberType"
        label="身份">
      </el-table-column>
      <el-table-column
        prop="score"
        label="积分"
        sortable>
      </el-table-column>
      <el-table-column
        prop="totalDealMoney"
        label="累计消费金额"
        sortable>
      </el-table-column>
      <el-table-column
        prop="dealTimes"
        label="购买次数"
        sortable>
      </el-table-column>
      <el-table-column
        prop="perUnitPrice"
        label="客单价（元）"
        sortable>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <div class="btns clearfix">
                <span class="s1">详情</span>
                <span class="s2" @click="handelDelete(scope.row.memberSn)">删除</span>
                <span class="s3" @click="addTag(scope.row.cid)">标签</span>
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
import clientApi from '@/api/client';
import TableBase from "@/components/TableBase";
export default {
  name: "acTable",
  extends: TableBase,
  data() {
    return {
      dataList:[
        {
          memberSn:'',
          nickname:'',
          phone:'',
          memberType:'',
          score:'',
          totalDealMoney:'',
          dealTimes:'',
          perUnitPrice:''
        },
      ],
    };
  },
  computed: {
    allUserList() {
      return clientApi.allUserList
    }
  },
  mounted() {
    //console.log(this.allUserList);
  },
  methods: {
    handelDelete(id) {
      this.$emit('delete',id);
    },
    addTag(cid) {
      this.$emit('addTag',cid);
    }
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
                    cursor: pointer;
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
