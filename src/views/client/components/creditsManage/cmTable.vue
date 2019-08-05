/* 获取积分规则列表 */
<template>
  <div>
    <el-table
      :data="creditList"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="sceneName"
        label="获取积分场景">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <span class="edit_span" @click="editCredit(scope.row)">
                <i class="edit_i"></i>
                查看&编辑
            </span>
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
      <component :is="currentDialog" :dialogVisible.sync="dialogVisible" :data="currentData"></component>
    </div>
  </div>
</template>

<script type='es6'>
import clientApi from '@/api/client';
import TableBase from "@/components/TableBase";
import loginRegularDialog from '../../dialogs/creditsManage/loginRegularDialog';
import buyRegularDialog from '../../dialogs/creditsManage/buyRegularDialog';
import repurchaseRegularDialog from '../../dialogs/creditsManage/repurchaseRegularDialog';
import praiseRegularDialog from '../../dialogs/creditsManage/praiseRegularDialog';
export default {
  name: "cmTable",
  extends: TableBase,
  components: { loginRegularDialog, buyRegularDialog, repurchaseRegularDialog, praiseRegularDialog },
  data() {
    return {
      currentDialog:"",
      dialogVisible: false,
      currentData:{}
    };
  },
  computed: {
    creditList() {
      return clientApi.creditList
    }
  },
  created() {

  },
  methods: {
    editCredit(row) {
      switch(row.sceneName) {
        case '登录': 
          this.dialogVisible = true;
          this.currentDialog = "loginRegularDialog";
          break;
        case '购买商品': 
          this.dialogVisible = true;
          this.currentDialog = "buyRegularDialog";
          break;
        case '复购商品': 
          this.dialogVisible = true;
          this.currentDialog = "repurchaseRegularDialog";
          break;
        case '评价': 
          this.dialogVisible = true;
          this.currentDialog = "praiseRegularDialog";
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.edit_span{
    color: #655EFF;
    cursor: pointer;
    .edit_i{
        display: inline-block;
        width: 14px;
        height: 14px;
        margin-right: 8px;
        background: url("../../../../assets/images/client/icon_edit.png") 0 0 no-repeat;
    }
}

</style>
