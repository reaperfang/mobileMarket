/* 审核 */
<template>
  <DialogBase :visible.sync="visible" @submit="submit" title="审核" :hasCancel="hasCancel">
    <div class="c_container">
      <div class="clearfix">
        <span class="fl c_label">提现申请</span>
        <div class="fl">
          <div class="c_top">
            <p>客户ID：13128098</p>
            <p>
              提现金额：
              <span>￥500.00</span>
            </p>
            <p>提现编号：43746374685348536</p>
          </div>
          <div class="c_steps clearfix">
            <div class="c_step_l">
              <span class="c_green"></span>
              2019-06-01 10：56：23
            </div>
            <div class="c_step_r">
              <p>提交申请</p>
              <p>账户可用余额冻结 ￥500.00</p>
              <p>交易流水 8236876238</p>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix marT30">
        <span class="fl c_label">提现申请</span>
        <div class="fl">
            <el-radio v-model="radio" label="1">同意申请</el-radio>
            <el-radio v-model="radio" label="2">拒绝申请</el-radio>
            <el-input
                type="textarea"
                :rows="3"
                class="marT20"
                placeholder="请输入拒绝原因，不超过20个字"
                v-model="textarea">
            </el-input>
        </div>
      </div>
    </div>
  </DialogBase>
</template>
<script>
import clientApi from "@/api/client";
import DialogBase from "@/components/DialogBase";
export default {
  name: "auditingDialog",
  props: ["data"],
  data() {
    return {
      hasCancel: true,
      radio: "1"
    };
  },
  methods: {
    submit() {
      this.$emit("handleSubmit");
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
/deep/.el-step__icon.is-text {
  border-radius: 0;
  border: none;
  border-color: none;
}
.c_container {
  text-align: left;
  .c_label{
    font-size: 16px;
    display: block;
    width: 107px;
  }
  .c_top {
    border-bottom: 1px solid #cacfcb;
    padding-bottom: 20px;
    position: relative;
    p {
      font-size: 16px;
      margin-bottom: 10px;
      span {
        color: #fd4c2b;
      }
      &.gray {
        color: #9fa29f;
      }
      &.c_status {
        position: absolute;
        color: #44434b;
        font-size: 24px;
        top: 0;
        right: 56px;
      }
    }
  }
  .c_steps {
    padding-top: 23px;
    .c_step_l {
      float: left;
      width: 200px;
      height: 80px;
      border-right: 1px solid #dadadc;
      position: relative;
      .c_green {
        display: block;
        width: 5px;
        height: 5px;
        background-color: #3eb488;
        position: absolute;
        right: -3px;
        top: -3px;
        border-radius: 2.5px;
      }
    }
    .c_step_r {
      float: left;
      p {
        color: #9fa29f;
        margin: 0 0 5px 32px;
        &:first-child {
          color: #333;
        }
      }
    }
  }
}
</style>


