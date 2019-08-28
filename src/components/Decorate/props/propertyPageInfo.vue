<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="页面名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入页面名称"></el-input>
      </el-form-item>
      <el-form-item label="页面标题" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入页面标题"></el-input>
      </el-form-item>
      <el-form-item label="页面描述" prop="explain">
        <el-input v-model="ruleForm.explain" placeholder="请输入页面描述" type="textarea" :rows="5"></el-input>
      </el-form-item>
      <el-form-item label="页面分类" prop="pageCategoryInfoId">
        <el-select v-if="classifyList.length" v-model="ruleForm.pageCategoryInfoId" placeholder="请选择分类">
          <el-option v-for="(item, key) of classifyList" :key="key" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="背景颜色" prop="colorStyle">
        <div class="color_block">
          <el-input v-model="ruleForm.colorStyle" :disabled="true"></el-input>
          <colorPicker  v-model="ruleForm.colorStyle"></colorPicker >
        </div>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import propertyMixin from './mixinProps';
export default {
  name: 'propertyPageInfo',
  mixins: [propertyMixin],
  components: {},
  data () {
    return {
      classifyList: [],
      ruleForm: {
        name: '微页面名称',
        title: '微页面标题',
        explain: '',
        pageCategoryInfoId: '',
        colorStyle: 'rgb(242,242,249)',
        pageKey: '',
        status: 0,
        isBaseComponent: true
      },
      rules: {
        name: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        title: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        explain: [
          { required: false, message: "请输入内容", trigger: "blur" }
        ],
        pageCategoryInfoId: [
          { required: true, message: "请输入内容", trigger: "change" }
        ],
        colorStyle: [
          { required: true, message: "请输入内容", trigger: "change" }
        ],
      },
    }
  },
  created() {
    this.getClassifyList();
  },
  methods: {

    //获取分类列表
    getClassifyList() {
      this._apis.shop.selectAllClassify({}).then((response)=>{
        this.classifyList = response;
        // this.ruleForm.pageCategoryInfoId = response[0].id;
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      });
    }
  }
}
</script>

<style lang="scss">

</style>
