/* 选择图文素材弹框 */
<template>
  <DialogBase :visible.sync="visible" width="816px" :title="'选择图文'">
  </DialogBase>
</template>

<script>
import DialogBase from "@/components/DialogBase";
import utils from "@/utils";
export default {
  name: "dialogSelectArticleMaterial",
  components: {DialogBase},
  props: {
      data: {},
      dialogVisible: {
          type: Boolean,
          required: true
      },
  },
  data() {
    return {
    };
  },
  computed: {
    visible: {
      get() {
          return this.dialogVisible
      },
      set(val) {
          this.$emit('update:dialogVisible', val)
      }
    }
  },
  created() {
  },
  methods: {
  }
};
</script>

<style lang="scss">
</style>