<template>
<div>propertyArticleAD

  <el-button type="text" @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">选择图片</el-button>
  <el-button type="text" @click="dialogVisible=true; currentDialog='dialogSelectJumpPage'">选择跳转链接</el-button>
   <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
</div>
</template>

<script>
import propertyMixin from './mixin';
import dialogSelectJumpPage from '../../dialogs/dialogSelectJumpPage';
import dialogSelectImageMaterial from '../../dialogs/dialogSelectImageMaterial';
export default {
  name: 'propertyArticleAD',
  mixins: [propertyMixin],
  components: {dialogSelectJumpPage, dialogSelectImageMaterial},
  data () {
    return {
      dialogVisible: false,
      currentDialog: '',
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>
