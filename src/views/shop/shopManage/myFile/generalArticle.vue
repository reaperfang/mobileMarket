<template>
  <p>普通图文
    <el-button type="text" @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">图片素材</el-button>
    {{ruleForm.coverUrl}}
    <!-- 动态弹窗 -->
    <component v-if="dialogVisible" :is="currentDialog" :dialogVisible.sync="dialogVisible" @imageSelected="imageSelected"></component>
  </p>
</template>

<script>
import dialogSelectImageMaterial from '../../dialogs/dialogSelectImageMaterial';
export default {
  name: 'generalArticle',
  components: {dialogSelectImageMaterial},
  data () {
    return {
      dialogVisible: false,
      currentDialog: '',
      ruleForm: {
        articalTitle: '',
        coverUrl: '',
        showCover: true
      },
      rules: {}
    }
  },
  created() {

  },
  methods: {
    /* 弹框选中图片 */
    imageSelected(dialogData) {
      this.ruleForm.coverUrl= dialogData.src;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
