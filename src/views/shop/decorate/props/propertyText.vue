<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="文本" prop="textContent">
        <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入要说明的文字，最多100字"
          v-model="ruleForm.textContent">
        </el-input>
      </el-form-item>
      <el-form-item label="字体大小" prop="fontSize">
        <el-radio-group v-model="ruleForm.fontSize">
          <el-radio :label="1">大</el-radio>
          <el-radio :label="2">中</el-radio>
          <el-radio :label="3">小</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文字颜色" prop="fontColor">
        <div style="display:flex;">
          <el-input v-model="ruleForm.fontColor"></el-input>
          <colorPicker  v-model="ruleForm.fontColor"></colorPicker >
          <el-button type="text">重置</el-button>
        </div>
      </el-form-item>
      <el-form-item label="背景颜色" prop="backgroundColor">
        <div style="display:flex;">
          <el-input v-model="ruleForm.backgroundColor"></el-input>
          <colorPicker  v-model="ruleForm.backgroundColor"></colorPicker >
          <el-button type="text">重置</el-button>
        </div>
      </el-form-item>
      <el-form-item label="显示设置" prop="displayStyle">
        <el-radio-group v-model="ruleForm.displayStyle">
          <el-radio :label="1">居左</el-radio>
          <el-radio :label="2">居中</el-radio>
          <el-radio :label="3">居右</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="链接" prop="linkAddress">
        <el-button type="text">选择跳转到的页面</el-button>
      </el-form-item>
      <el-form-item label="更多设置" prop="showDivider">
        <el-checkbox v-model="ruleForm.showDivider">显示底部分割线</el-checkbox>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import propertyMixin from './propertyMixin.js';
export default {
  name: 'propertyText',
  mixins: [propertyMixin],
  components: {},
  data () {
    return {
      ruleForm: {
        textContent: "",
        fontSize: 1,
        fontColor: '#000',
        backgroundColor: '#fff',
        displayStyle: 1,
        linkAddress: 'http://www.baidu.com',
        showDivider: true
      },
      rules: {

      },

    }
  },
  methods: {

  }
}
</script>

<style lang="scss">

</style>
