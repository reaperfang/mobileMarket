<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="颜色" prop="lineColor">
        <div style="display:flex;">
          <el-input v-model="ruleForm.lineColor"></el-input>
          <colorPicker  v-model="ruleForm.lineColor"></colorPicker >
          <el-button type="text">重置</el-button>
        </div>
      </el-form-item>
      <el-form-item label="边距" prop="lineMargin">
        <el-radio-group v-model="ruleForm.lineMargin">
          <el-radio :label="1">无边距</el-radio>
          <el-radio :label="2">左右留边</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="样式" prop="lineStyle">
        <el-radio-group v-model="ruleForm.lineStyle">
          <el-radio :label="1">实线</el-radio>
          <el-radio :label="2">虚线</el-radio>
          <el-radio :label="3">点线</el-radio>
        </el-radio-group>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'propertyHelpLine',
  components: {},
  data () {
    return {
      ruleForm: {
        lineColor: '',
        lineMargin: 2,
        lineStyle: 1
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
.el-upload{
  width:80px!important;
  height:80px!important;
  line-height:90px!important;
}
.el-upload-list__item{
  width:80px!important;
  height:80px!important;
}
</style>
