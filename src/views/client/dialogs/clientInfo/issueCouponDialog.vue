<template>
  <DialogBase :visible.sync="visible" @submit="submit" title="发放优惠券" :hasCancel="hasCancel">
    <div class="c_container">
      <p class="marB20">客户ID: 0001</p>
      <div class="clearfix">
        <div class="fl l_block">
          选择优惠券：
        </div>
        <div class="fl r_block">

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
  name: "issueCouponDialog",
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
    .l_block{
      width: 86px;
    }
    
}
</style>


