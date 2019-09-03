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
        prop="enable"
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
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible" :data="currentData"></component>
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
      currentData:{},
      creditList: []
    };
  },
  computed: {
  },
  created() {

  },
  methods: {
    editCredit(row) {
      switch(row.sceneName) {
        case '登陆': 
          this.dialogVisible = true;
          this.currentDialog = "loginRegularDialog";
          this.currentData.row = row;
          break;
        case '购买': 
          this.dialogVisible = true;
          this.currentDialog = "buyRegularDialog";
          this.currentData.row = row;
          break;
        case '复购': 
          this.dialogVisible = true;
          this.currentDialog = "repurchaseRegularDialog";
          this.currentData.row = row;
          break;
        case '评价': 
          this.dialogVisible = true;
          this.currentDialog = "praiseRegularDialog";
          this.currentData.row = row;
          break;
        default:
          break;
      }
    },
    getCreditList() {
      this._apis.client.getCreditList({}).then((response) => {
        response.map((v) => {v.enable = v.enable == 0?'禁用':'启用'});
        this.creditList = [].concat(response);
      }).catch((error) => {
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    }
  },
  mounted() {
    this.getCreditList();
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
