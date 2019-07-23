<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="标题名">
        <el-input placeholder="请输入标题" v-model="textarea"></el-input>
      </el-form-item>
      <el-form-item label="标题模板">
        <el-radio-group v-model="radio">
          <el-radio :label="1">传统样式</el-radio>
          <el-radio :label="2">模仿微信图文页样式</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="显示位置" prop="pageBackground">
        <el-radio-group v-model="radio">
          <el-radio :label="1">居左显示</el-radio>
          <el-radio :label="2">居中显示</el-radio>
          <el-radio :label="3">居右显示</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="副标题">
        <el-input placeholder="请输入标题" v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="背景颜色" prop="pageBackground">
        <div style="display:flex;">
          <el-input v-model="ruleForm.pageBackground"></el-input>
          <colorPicker  v-model="ruleForm.pageBackground"></colorPicker >
          <el-button type="text">重置</el-button>
        </div>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'propertyTitle',
  components: {},
  data () {
    return {
      ruleForm: {
      },
      rules: {

      },
      checkList: []

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
