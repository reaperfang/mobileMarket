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
import propertyMixin from './mixin';;
export default {
  name: 'propertyBase',
  mixins: [propertyMixin],
  components: {},
  data () {
    return {
      classifyList: [],
      ruleForm: {
        name: '',
        title: '',
        explain: '',
        pageCategoryInfoId: '',
        colorStyle: '#fff',
        pageKey: '',
        status: 0
      },
      rules: {
        name: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        title: [
          { required: true, message: "请输入内容", trigger: "blur" }
        ],
        explain: [
          { required: true, message: "请输入内容", trigger: "blur" }
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
    },

    //获取分类列表
    getClassifyList() {
      this._apis.shop.getClassifyList({startIndex: 1, pageSise: 100}).then((response)=>{
        this.classifyList = response.list;
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
