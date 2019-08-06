/* cardManage列表 */
<template>
  <div>
    <el-table
      :data="cardList"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        type="selection"
        prop="choose"
        label="选择">
      </el-table-column>
      <el-table-column
        prop="alias"
        label="会员卡等级">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column
        prop="receiveConditionsRemarks"
        label="领取条件"
      >
      </el-table-column>
      <el-table-column
        prop="rights"
        label="权益"
      >
      </el-table-column>
      <el-table-column
        prop="upgradePackage"
        label="升级礼包"
      >
      </el-table-column>
      <el-table-column
        prop="validity"
        label="有效期"
      >
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enable" @change="changeSwitch($event,scope)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <div class="btns clearfix">
                <span v-if="scope.row.name">编辑</span>
                <span v-if="scope.row.name" @click="sendCard(scope.row)">发卡</span>
                <span v-if="!scope.row.name">待配置</span>
            </div>
        </template>
      </el-table-column>
    </el-table>
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible" :data="currentData"></component>
  </div>
</template>
<script type='es6'>
import TableBase from "@/components/TableBase";
import sendCardDialog from '../../dialogs/cdTable/sendCardDialog'
export default {
  name: "cdTable",
  extends: TableBase,
  components: { sendCardDialog },
  props: ['cardList'],
  data() {
    return {
      currentDialog: "",
      dialogVisible: false,
      currentData: {}
    };
  },
  methods: {
    getCardList() {
      this.cardList.map((v) => {
        v.validity = "永久有效";
      });
    },
    changeSwitch(event,scope) {
      console.log(event);
    },
    sendCard(row) {
      this.dialogVisible = true;
      this.currentDialog = "sendCardDialog";
    },
    test() {
      this.dialogVisible = true;
      this.currentDialog = "sendCardDialog";
    }
  },
  computed: {
    
  },
  created() {

  },
  mounted() {
    this.getCardList();
    //console.log(this.cardList);
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .cell{
            .btns{
                span{
                    color: #655EFF;
                    margin-right: 5px;
                    cursor: pointer;
                }
            }
        }

</style>
