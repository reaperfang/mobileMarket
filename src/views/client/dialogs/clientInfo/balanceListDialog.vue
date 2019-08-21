<template>
  <DialogBase :visible.sync="visible" @submit="submit" title="余额记录" :hasCancel="hasCancel">
    <div class="c_container">
      <p class="marB20">总金额: {{data.balance}}</p>
      <div>
        <el-table
          :data="dataList"
          style="width: 100%"
          :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column prop="createUserName" label="操作人"></el-table-column>
          <el-table-column prop="tradeTime" label="操作时间"></el-table-column>
          <el-table-column prop="changeReason" label="原因"></el-table-column>
          <el-table-column prop="changeAmount" label="数量"></el-table-column>
        </el-table>
      </div>
    </div>
  </DialogBase>
</template>
<script>
import clientApi from "@/api/client";
import DialogBase from "@/components/DialogBase";
export default {
  props: ["data"],
  name: "balanceListDialog",
  data() {
    return {
      hasCancel: true,
      dataList: []
    };
  },
  methods: {
    submit() {},
    getBalanceList() {
      this._apis.finance.getListCb({memberInfoId: this.data.id, startIndex: 1, pageSize: 10}).then((response) => {
        this.dataList = [].concat(response.list);
      }).catch((error) => {
        this.$notify.error({
          title: "错误",
          message: error
        });
      })
    }
  },
  computed: {
    visible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this.$emit("update:dialogVisible", val);
      }
    }
  },
  mounted() {
    this.getBalanceList();
  },
  props: {
    data: {},
    dialogVisible: {
      type: Boolean,
      required: true
    }
  },
  components: {
    DialogBase
  }
};
</script>
<style lang="scss" scoped>
.c_container {
  p {
    text-align: left;
  }
  .marB20{
    margin-bottom: 20px;
  }
}
</style>


