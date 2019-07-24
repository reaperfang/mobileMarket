<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="显示样式" prop="displayStyle">
        <el-radio-group v-model="ruleForm.displayStyle">
          <el-radio :label="1">样式1</el-radio>
          <el-radio :label="2">样式2</el-radio>
          <el-radio :label="3">样式3</el-radio>
          <el-radio :label="4">样式4</el-radio>
          <el-radio :label="5">样式5</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="背景图片" prop="backgroundImage">
        <el-button type="primary" plain>选择背景图片</el-button>
        建议尺寸：750*370，尺寸不匹配时，图片将被压缩或拉伸以铺满四周
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import propertyMixin from './propertyMixin.js';
export default {
  name: 'propertyShopInfo',
  mixins: [propertyMixin],
  components: {},
  data () {
    return {
      ruleForm: {
        displayStyle: 1,
        backgroundImage: ''
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
