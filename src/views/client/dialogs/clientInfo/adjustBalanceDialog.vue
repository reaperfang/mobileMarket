<template>
  <DialogBase :visible.sync="visible" @submit="submit" title="手动调整余额" :hasCancel="hasCancel">
    <div class="c_container">
      <p class="marB20">客户ID: 0001</p>
      <p class="marB20">当前余额: 30</p>
      <div class="marB20">
          <span>增加积分：</span>
          <div class="input_wrap">
              <el-input placeholder="请输入"></el-input>
          </div>
      </div>
      <p class="marB20">调整后余额: 30</p>
      <div class="marB20">
          <span>变更原因：</span>
          <div class="input_wrap">
              <el-input placeholder="请输入"></el-input>
          </div>
      </div>
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
      hasCancel: true
    };
  },
  methods: {
    submit() {}
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
.c_container {
    text-align: left;
  .input_wrap{
      width: 188px;
      display: inline-block;
  }
}
</style>


