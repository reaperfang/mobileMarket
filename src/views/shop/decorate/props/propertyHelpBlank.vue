<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="空白高度" prop="blankHeight">
          <div class="slider-wrapper">
            <el-slider v-model="ruleForm.blankHeight"></el-slider>
            <span>{{ruleForm.blankHeight}}像素</span>
          </div>
        </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'propertyHelpBlank',
  props: ['data'],
  components: {},
  data () {
    return {
      ruleForm: {
        blankHeight: 10
      },
      rules: {

      },

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
      if(this.data){
        this.ruleForm = this.data;
      }
       this.$emit('change', {
        id: this.$parent.currentComponentId,
        data: this.ruleForm
      });
    },

    /* 发送数据改变事件 */
    emitChangeRuleForm(newValue) {
      this.$emit('change', {
        id: this.$parent.currentComponentId,
        data: newValue
      });
    }
  }
}
</script>

<style lang="scss">
.slider-wrapper{
  width:100%;
  display:flex;
  justify-content: space-between;
  .el-slider{
    width:66%;
  }
  span{
    margin-right:20px;
  }
}
</style>
