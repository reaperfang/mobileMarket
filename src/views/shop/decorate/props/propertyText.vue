<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="文本">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </el-form-item>
      <el-form-item label="字体大小">
        <el-radio-group v-model="radio">
          <el-radio :label="1">大</el-radio>
          <el-radio :label="2">中</el-radio>
          <el-radio :label="3">小</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="背景颜色" prop="pageBackground">
        <div style="display:flex;">
          <el-input v-model="ruleForm.pageBackground"></el-input>
          <colorPicker  v-model="ruleForm.pageBackground"></colorPicker >
          <el-button type="text">重置</el-button>
        </div>
      </el-form-item>
      <el-form-item label="文字颜色" prop="pageBackground">
        <div style="display:flex;">
          <el-input v-model="ruleForm.pageBackground"></el-input>
          <colorPicker  v-model="ruleForm.pageBackground"></colorPicker >
          <el-button type="text">重置</el-button>
        </div>
      </el-form-item>
      <el-form-item label="跳转链接">
        <el-button type="text">选择跳转到的页面</el-button>
      </el-form-item>
      <el-form-item label="跟多设置">
        <el-radio-group v-model="radio4">
          <el-radio :label="1">正常模式</el-radio>
          <el-radio :label="2">滚动至顶部固定</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="列表样式">
        <el-checkbox v-model="checked">显示底部分割线</el-checkbox>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'propertyText',
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
