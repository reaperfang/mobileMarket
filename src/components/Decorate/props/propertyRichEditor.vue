<template>
<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" :inline="true">
  <div class="block form">
    <el-form-item label="背景颜色">
      <div class="color_block">
        <el-input v-model="ruleForm.backgroundColor" :disabled="true"></el-input>
        <colorPicker  v-model="ruleForm.backgroundColor"></colorPicker>
      </div>
    </el-form-item>
    <el-form-item label="页面边距">
      <el-checkbox v-model="ruleForm.remainPageMargin">保留边距</el-checkbox>
    </el-form-item>
    <el-form-item label="">
      <RichEditor @editorValueUpdate="editorValueUpdate" :myConfig="myConfig" :richValue="ruleForm.richValue"></RichEditor>
    </el-form-item>
    </div>
  </el-form>
</template>

<script>
import propertyMixin from '../mixins/mixinProps';;
import RichEditor from '@/components/RichEditor';
export default {
  name: 'propertyRichEditor',
  mixins: [propertyMixin],
  components: {RichEditor},
  data () {
    return {
      editorData: '',  //富文本数据
      myConfig: {
          // 编辑器不自动被内容撑高
          autoHeightEnabled: false,
          // 初始容器高度
          initialFrameHeight: 320,
          // 初始容器宽度
          initialFrameWidth: 306
      },
      ruleForm: {
        backgroundColor: 'red',
        remainPageMargin: true,
        richValue: ''
      },
      rules: {

      }
    }
  },

  methods: {

    /* 富文本内容更新 */
    editorValueUpdate(html) {
      this.ruleForm.richValue = html;
    },

  }
}
</script>

<style lang="scss" scoped>
</style>
