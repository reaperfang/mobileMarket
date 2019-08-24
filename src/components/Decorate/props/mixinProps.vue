<script>
export default {
  name: "propertyMixin",
  props: ["data"],
  data() {
    return {
      items: []
    }
  },
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
      this.emitChangeRuleForm(this.ruleForm);
    },

    /* 发送数据改变事件 */
    emitChangeRuleForm(newValue) {
      this.$emit("change", {
        id: this.$parent.currentComponentId,
        data: newValue
      });
    },

     /* 删除数据项 */
    deleteItem(item) {
      const tempItems = [...this.items];
      for(let i=0;i<tempItems.length;i++) {
        if(item === tempItems[i]) {
          tempItems.splice(i, 1);
        }
      }
      this.items = tempItems;
    },

    /* 弹窗选中了数据项 */
    dialogDataSelected(items) {
      this.items = items;
    } 
  }
};
</script>
