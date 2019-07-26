<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="标题名" prop="mainTitle">
        <el-input placeholder="请输入标题" v-model="ruleForm.mainTitle"></el-input>
      </el-form-item>
      <el-form-item label="标题模板" prop="titleTemplate">
        <el-radio-group v-model="ruleForm.titleTemplate">
          <el-radio :label="1">传统样式</el-radio>
          <el-radio :label="2">模仿微信图文页样式</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="显示位置" prop="displayPosition">
        <el-radio-group v-model="ruleForm.displayPosition">
          <el-radio :label="1">居左显示</el-radio>
          <el-radio :label="2">居中显示</el-radio>
          <el-radio :label="3">居右显示</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="副标题" prop="subTitle">
        <el-input placeholder="请输入标题" v-model="ruleForm.subTitle"></el-input>
      </el-form-item>
      <el-form-item label="背景颜色" prop="backgroundColor">
        <div class="color_block">
          <el-input v-model="ruleForm.backgroundColor"></el-input>
          <colorPicker  v-model="ruleForm.backgroundColor"></colorPicker >
          <el-button type="text">重置</el-button>
        </div>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" plain>添加一个文本导航</el-button>
      </el-form-item>
      <el-form-item label="导航名称" prop="navName">
        <el-input placeholder="请输入名称" v-model="ruleForm.navName"></el-input>
      </el-form-item>
      <el-form-item label="链接到" prop="linkTo">
        <el-input placeholder="" v-model="ruleForm.linkTo"></el-input>
        <el-button type="primary" plain>修改</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import propertyMixin from './propertyMixin.js';
export default {
  name: 'propertyTitle',
  mixins: [propertyMixin],
  components: {},
  data () {
    return {
      ruleForm: {
        mainTitle: '',
        titleTemplate: 1,
        displayPosition: 1,
        subTitle: '',
        backgroundColor: '',
        navName: '',
        linkTo: '',
      },
      rules: {

      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">

</style>
