<template>
  <DialogBase :visible.sync="visible" @submit="submit" title="手动调整余额" :hasCancel="hasCancel" :showFooter="false">
    <div class="c_container">
      <p class="marB20">客户ID: {{ data.memberSn }}</p>
      <p class="marB20">当前余额: {{ data.balance }}</p>
      <div class="marB20">
          <span><span style="color:red">*</span>增加余额：</span>
          <div class="input_wrap">
              <el-input placeholder="请输入增加余额" v-model.trim="adjustmentBalance" @blur="handleBlur"></el-input>
          </div>
      </div>
      <p class="marB20">调整后余额: {{adjustmentAfterBalance}}</p>
      <div class="marB20 clearfix">
          <span class="fl"><span style="color:red">*</span>变更原因：</span>
          <div class="input_wrap2 fl">
              <el-input placeholder="请输入变更原因" v-model.trim="remark" type="textarea" :row="3" :maxlength="50"></el-input>
          </div>
      </div>
    </div>
    <div>
      <span slot="footer" class="dialog-footer fcc">
          <el-button type="primary" @click="submit" :loading="btnLoading">确 认</el-button>
          <el-button v-if="hasCancel" @click="visible = false">取 消</el-button>
      </span>
    </div>
  </DialogBase>
</template>
<script>
import clientApi from "@/api/client";
import DialogBase from "@/components/DialogBase";
export default {
  props: ["data"],
  name: "adjustBalanceDialog",
  data() {
    return {
      hasCancel: true,
      adjustmentBalance: null,
      remark: "",
      btnLoading: false
    };
  },
  methods: {
    submit() {
      this.btnLoading = true;
      if(Number(this.adjustmentBalance) <= 0 || this.adjustmentBalance == "") {
        this.btnLoading = false;
        this.$notify({
          title: '警告',
          message: '请输入增加余额, 且不能为0或负数',
          type: 'warning'
        });
      }else if(this.remark == "") {
        this.btnLoading = false;
        this.$notify({
          title: '警告',
          message: '请输入变更原因',
          type: 'warning'
        });
      }else{
        let params = {
          id: this.data.id,
          currentBalance: this.data.balance,
          adjustmentBalance: this.adjustmentBalance,
          adjustmentAfterBalance: this.adjustmentAfterBalance,
          remark: this.remark
        }
        this._apis.client.manualChangeBalance(params).then((response) => {
          this.btnLoading = false;
          this.visible = false;
          this.$notify({
            title: '成功',
            message: "调整余额成功",
            type: 'success'
          });
          this.$emit('refreshPage');
        }).catch((error) => {
          this.btnLoading = false;
          this.visible = false;
          console.log(error);
        })
      }
    },
    handleBlur() {
      if(Number(this.adjustmentBalance) < 0) {
        this.$notify({
          title: '警告',
          message: '增加余额不能为负数',
          type: 'warning'
        });
      }
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
    },
    adjustmentAfterBalance() {
      return Number(this.data.balance) + Number(this.adjustmentBalance);
    }
  },
  watch: {
  },
  mounted() {},
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
    text-align: left;
    .marB20{
      margin-bottom: 20px;
    }
  .input_wrap{
      width: 188px;
      display: inline-block;
  }
  .input_wrap2{
      width: 500px;
      display: inline-block;
  }
}
</style>


