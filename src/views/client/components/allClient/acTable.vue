/* 全部客户列表 */
<template>
  <div>
    <el-table
      :data="allUserList"
      ref="allClientTable"
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
                <span class="s1" @click="_routeTo('clientInfo')">详情</span>
                <span class="s2" @click="handelDelete(scope.row.memberSn)">删除</span>
                <span class="s3" @click="addTag(scope.row.cid)">标签</span>
                <span class="s4" @click="addBlackList(scope.row.cid)" v-if="scope.row.status == 0">加入黑名单</span>
                <span class="s5" @click="removeBlack(scope.row.memberSn)" v-if="scope.row.status == 2">解除黑名单</span>
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
    <div class="a_line">
      <el-checkbox v-model="checkAll" @change="handleChange"></el-checkbox>
      <el-button type="primary" @click="batchDelete">批量删除</el-button>
      <el-button class="border_btn" @click="batchAddTag">打标签</el-button>
      <el-button class="border_btn" @click="batchAddBlack">加入黑名单</el-button>
      <el-button class="border_btn" @click="batchRemoveBlack">取消黑名单</el-button>
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
      checkAll: false
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
    batchDelete() {
      this.$emit('batchDelete');
    },
    batchAddTag() {
      this.$emit('batchAddTag');
    },
    addTag(cid) {
      this.$emit('addTag',cid);
    },
    addBlackList(cid) {
      this.$emit('addBlackList');
    },
    removeBlack(id) {
      this.$emit('removeBlack');
    },
    batchAddBlack() {
      this.$emit('batchAddBlack');
    },
    batchRemoveBlack() {
      this.$emit('batchRemoveBlack');
    },
    handleChange() {
      this.allUserList.forEach(row => {
        this.$refs.allClientTable.toggleRowSelection(row)
      });
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
                        background: url('../../../../assets/images/client/icon_info.png') 0 0 no-repeat;
                    }
                    &.s2{
                        color:#F55858;
                        background: url('../../../../assets/images/client/icon_delete.png') 0 0 no-repeat;
                    }
                    &.s3{
                        color:#FD932B;
                        background: url('../../../../assets/images/client/icon_tag.png') 0 0 no-repeat;
                    }
                    &.s4{
                        color:#578EFA;
                        background: url('../../../../assets/images/client/icon_addblack.png') 17px 0 no-repeat;
                    }
                    &.s5{
                        color:#578EFA;
                        background: url('../../../../assets/images/client/icon_relieve.png') 17px 0 no-repeat;
                    }
                }
            }
        }
.a_line{
  padding-left: 17px;
}
</style>
