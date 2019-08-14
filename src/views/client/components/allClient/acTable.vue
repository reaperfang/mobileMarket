/* 全部客户列表 */
<template>
  <div>
    <el-table
      :data="memberList"
      ref="allClientTable"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="memberSn" label="客户ID"></el-table-column>
      <el-table-column prop="nickName" label="客户信息"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="memberType" label="身份"></el-table-column>
      <el-table-column prop="score" label="积分" sortable></el-table-column>
      <el-table-column prop="totalDealMoney" label="累计消费金额" sortable></el-table-column>
      <el-table-column prop="dealTimes" label="购买次数" sortable></el-table-column>
      <el-table-column prop="perUnitPrice" label="客单价（元）" sortable></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="btns clearfix">
            <span class="s1" @click="_routeTo('clientInfo',{id: scope.row.id})">详情</span>
            <span class="s2" @click="handelDelete(scope.row.id)">删除</span>
            <span class="s3" @click="addTag(scope.row.id)">标签</span>
            <span class="s4" @click="addBlackList(scope.row.id)" v-if="scope.row.status == 0">加入黑名单</span>
            <span class="s5" @click="removeBlack(scope.row.id)" v-if="scope.row.status == 2">解除黑名单</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="page_styles">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="Number(startIndex) || 1"
        :page-sizes="[5, 10, 20, 50, 100, 200, 500]"
        :page-size="pageSize*1"
        :total="total*1"
        layout="total, sizes, prev, pager, next, jumper"
      ></el-pagination>
    </div>
    <div class="a_line">
      <el-checkbox v-model="checkAll" @change="handleChange"></el-checkbox>
      <el-button type="primary" @click="batchDelete">批量删除</el-button>
      <el-button class="border_btn" @click="batchAddTag">打标签</el-button>
      <el-button class="border_btn" @click="batchAddBlack">加入黑名单</el-button>
      <el-button class="border_btn" @click="batchRemoveBlack">取消黑名单</el-button>
    </div>
    <component
      :is="currentDialog"
      :dialogVisible.sync="dialogVisible"
      :data="currentData"
      @deleteFeedback="deleteFeedback"
    ></component>
  </div>
</template>

<script type='es6'>
import TableBase from "@/components/TableBase";
import deleteUserDialog from "../../dialogs/allClient/deleteUserDialog";
import addTagDialog from "../../dialogs/allClient/addTagDialog";
import addBlackDialog from "../../dialogs/allClient/addBlackDialog";
import removeBlackDialog from "../../dialogs/allClient/removeBlackDialog";
import batchDeleteUserDialog from "../../dialogs/allClient/batchDeleteUserDialog";
import batchAddBlackDialog from "../../dialogs/allClient/batchAddBlackDialog";
import batchAddTagDialog from "../../dialogs/allClient/batchAddTagDialog";
import batchRemoveBlackDialog from "../../dialogs/allClient/batchRemoveBlackDialog";
export default {
  name: "acTable",
  props: ["newForm"],
  extends: TableBase,
  components: {
    deleteUserDialog,
    addTagDialog,
    addBlackDialog,
    removeBlackDialog,
    batchDeleteUserDialog,
    batchAddBlackDialog,
    batchAddTagDialog,
    batchRemoveBlackDialog
  },
  data() {
    return {
      checkAll: false,
      memberList: [],
      currentDialog: "",
      dialogVisible: false,
      currentData: {}
    };
  },
  computed: {
    allUserList() {
      return clientApi.allUserList;
    }
  },
  mounted() {
    this.getMembers();
  },
  methods: {
    handelDelete(id) {
      this.dialogVisible = true;
      this.currentDialog = "deleteUserDialog";
      this.currentData.userId = id;
    },
    batchDelete() {
      if (this.checkAll) {
        this.dialogVisible = true;
        this.currentDialog = "batchDeleteUserDialog";
      } else {
        this.$notify.info({
          title: "消息",
          message: "请选择客户"
        });
      }
      this.currentData.checkedItem = this.$refs.allClientTable.selection;
    },
    batchAddTag() {
      if (this.checkAll) {
        this.dialogVisible = true;
        this.currentDialog = "batchAddTagDialog";
      } else {
        this.$notify.info({
          title: "消息",
          message: "请选择客户"
        });
      }
      this.currentData.checkedItem = this.$refs.allClientTable.selection;
    },
    addTag(id) {
      this.dialogVisible = true;
      this.currentDialog = "addTagDialog";
      this.currentData.id = id;
    },
    addBlackList(cid) {
      this.dialogVisible = true;
      this.currentDialog = "addBlackDialog";
    },
    removeBlack(id) {
      this.dialogVisible = true;
      this.currentDialog = "removeBlackDialog";
    },
    batchAddBlack() {
      this.dialogVisible = true;
      this.currentDialog = "batchAddBlackDialog";
    },
    batchRemoveBlack() {
      this.dialogVisible = true;
      this.currentDialog = "batchRemoveBlackDialog";
    },
    handleChange(val) {
      this.memberList.forEach(row => {
        this.$refs.allClientTable.toggleRowSelection(row);
      });
    },
    getMembers() {
      this._apis.client
        .getMemberList(this.newForm)
        .then(response => {
          this.memberList = [].concat(response.list);
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: error
          });
        });
    },
    deleteFeedback(msg) {
      if (msg == "success") {
        this.getMembers();
      }
    }
  },
  watch: {
    newForm() {
      this.getMembers();
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .cell {
  .btns {
    span {
      display: block;
      float: left;
      height: 41px;
      font-size: 12px;
      padding-top: 22px;
      text-align: center;
      margin-right: 5px;
      cursor: pointer;
      &.s1 {
        color: #655eff;
        background: url("../../../../assets/images/client/icon_info.png") 0 0
          no-repeat;
      }
      &.s2 {
        color: #f55858;
        background: url("../../../../assets/images/client/icon_delete.png") 0 0
          no-repeat;
      }
      &.s3 {
        color: #fd932b;
        background: url("../../../../assets/images/client/icon_tag.png") 0 0
          no-repeat;
      }
      &.s4 {
        color: #578efa;
        background: url("../../../../assets/images/client/icon_addblack.png")
          17px 0 no-repeat;
      }
      &.s5 {
        color: #578efa;
        background: url("../../../../assets/images/client/icon_relieve.png")
          17px 0 no-repeat;
      }
    }
  }
}
.a_line {
  padding-left: 17px;
}
</style>
