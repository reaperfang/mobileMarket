<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <el-form-item label="页面名称" prop="pageName">
      <el-input v-model="ruleForm.pageName" placeholder="请输入页面名称"></el-input>
    </el-form-item>
    <el-form-item label="页面标题" prop="pageTitle">
      <el-input v-model="ruleForm.pageTitle" placeholder="请输入页面标题"></el-input>
    </el-form-item>
    <el-form-item label="页面描述" prop="pageDesc">
      <el-input v-model="ruleForm.pageDesc" placeholder="请输入页面描述" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="页面分类" prop="pageClassify">
      <el-select v-model="ruleForm.pageClassify" placeholder="请选择分类">
        <el-option label="未分类" value="1"></el-option>
        <el-option label="常用页面" value="2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="背景颜色" prop="pageBackground">
      <div style="display:flex;">
        <el-input v-model="ruleForm.pageBackground"></el-input>
        <colorPicker  v-model="ruleForm.pageBackground"></colorPicker >
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'propertyGoods',
  props: ['data'],
  components: {},
  data () {
    return {
      ruleForm: {
        pageName: '',
        pageTitle: '',
        pageDesc: '',
        pageClassify: '1',
        pageBackground: ''
      },
      rules: {
        pageName: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        pageTitle: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        pageDesc: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        pageClassify: [
          { required: true, message: "请输入内容", trigger: "change" }
        ],
        pageBackground: [
          { required: true, message: "请输入内容", trigger: "change" }
        ],
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
        type: 'base',
        data: this.ruleForm
      });
    },

    /* 发送数据改变事件 */
    emitChangeRuleForm(newValue) {
      this.$emit('change', {
        type: 'base',
        data: newValue
      });
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
