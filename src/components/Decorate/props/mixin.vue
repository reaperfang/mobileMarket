<script>
export default {
  name: "propertyMixin",
  props: ["data"],
  created() {
    this.initRuleForm();
  },
  watch: {
    ruleForm: {
      handler(newValue) {
        this.emitChangeRuleForm(newValue);
      },
      deep: true
    }
  },
  methods: {
    /* 初始化表单数据 */
    initRuleForm() {
      if (this.data) {
        this.ruleForm = this.data;
      }
      this.$emit("change", {
        id: this.$parent.currentComponentId,
        data: this.ruleForm
      });
    },

    /* 发送数据改变事件 */
    emitChangeRuleForm(newValue) {
      this.$emit("change", {
        id: this.$parent.currentComponentId,
        data: newValue
      });
    }
  }
};
</script>
