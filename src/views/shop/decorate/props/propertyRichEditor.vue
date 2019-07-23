<template>
<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" :inline="true">
    <el-form-item label="背景颜色">
      <div style="display:flex;">
        <el-input v-model="ruleForm.backgroundColor"></el-input>
        <colorPicker  v-model="ruleForm.backgroundColor"></colorPicker >
      </div>
    </el-form-item>
    <el-form-item label="页面边距">
      <el-checkbox v-model="ruleForm.remainPageMargin">保留边距</el-checkbox>
    </el-form-item>
    <el-form-item label="页面边距">
      <RickEditor @editorValueUpdate="editorValueUpdate" :myConfig="myConfig" :richValue="ruleForm.richValue"></RickEditor>
    </el-form-item>
  </el-form>
</template>

<script>
import RickEditor from '@/components/RickEditor';
export default {
  name: 'propertyRichEditor',
  props: ['data'],
  components: {RickEditor},
  data () {
    return {
      editorData: '',  //富文本数据
      myConfig: {
          // 编辑器不自动被内容撑高
          autoHeightEnabled: false,
          // 初始容器高度
          initialFrameHeight: 500,
          // 初始容器宽度
          initialFrameWidth: 326,
          // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
          serverUrl: 'http://35.201.165.105:8000/controller.php',
          // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
          UEDITOR_HOME_URL: '/static/UEditor/'
      },
      ruleForm: {
        backgroundColor: 'red',
        remainPageMargin: 0,
        richValue: ''
      },
      rules: {

      }
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

    /* 富文本内容更新 */
    editorValueUpdate(html) {
      this.ruleForm.richValue = html;
    },

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

<style lang="scss" scoped>
</style>
