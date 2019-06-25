<!-- 弹窗基础组件,所有弹窗都继承自此页面 -->

<script>
export default {
  name: 'dialogBase',
  props: ['data', 'refresh'],
  data() {
    return {
      loading: false,
      dialogFormVisible: true,
      formLabelWidth: '80px',
      dialogWidth: '548px',
    }
  },
  methods: {
    close() {
      this.$emit('dialogClose');
    },

    // 提交表单
    submitForm(formName, cbName) {
      this.$refs[formName].validate(valid => {
        //$ref类似选择器
        if (valid) {
          this[cbName]();
        }
      });
    }

  }
}
</script>
<style lang="scss" scoped>
input{
  width:150px!important;
}
</style>
