<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="分类名称" prop="classifyName">
        <el-input placeholder="请勿超过10个字" v-model="ruleForm.classifyName"></el-input>
      </el-form-item>
      <el-form-item label="排序优先级" prop="sortType">
        <el-radio-group v-model="ruleForm.sortType">
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
          <el-input v-model="ruleForm.backgroundColor" :disabled="true"></el-input>
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
        <el-button type="primary" plain @click="dialogVisible=true; currentDialog='dialogSelectJumpPage'">修改</el-button>
      </el-form-item>
    </div>

     <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible" @dialogDataSelected="dialogDataSelected"></component>
  </el-form>
</template>

<script>
import propertyMixin from './mixin';
import dialogSelectJumpPage from '../../dialogs/dialogSelectJumpPage';
export default {
  name: 'propertyTitle',
  mixins: [propertyMixin],
  components: {dialogSelectJumpPage},
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

      },
      dialogVisible: false,
      currentDialog: '',
    }
  },
  methods: {

    /* 弹窗选中了跳转链接 */
    dialogDataSelected(jumpLink) {
      console.log(jumpLink);
    },
  }
}
</script>

<style lang="scss">

</style>
