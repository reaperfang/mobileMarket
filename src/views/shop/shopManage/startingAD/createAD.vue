<template>
  <p>创建广告
    <el-button type="text" @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">图片选择</el-button>
    <el-button type="text" @click="dialogVisible=true; currentDialog='dialogSelectJumpPage'">跳转页面选择</el-button>
    {{ruleForm.adImg}}
    <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible" @imageSelected="imageSelected"></component>
  </p>
</template>

<script>
import dialogSelectImageMaterial from '../../dialogs/dialogSelectImageMaterial';
import dialogSelectJumpPage from '../../dialogs/dialogSelectJumpPage';
export default {
  name: 'shopIndex',
  components: {dialogSelectImageMaterial, dialogSelectJumpPage},
  data () {
    return {
      dialogVisible: false,
      currentDialog: '',
      ruleForm: {
        showPage: '',
        adName: '',
        adImg: '',
        adLink: '',
        showTimeStart: '',
        showTimeEnd: ''
      },
      rules: {}
    }
  },
  created() {

  },
  methods: {
    /* 弹框选中图片 */
    imageSelected(dialogData) {
      this.ruleForm.adImg= dialogData.src;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
