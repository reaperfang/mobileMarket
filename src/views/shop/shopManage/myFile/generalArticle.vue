<template>
  <p>普通图文
    <el-button type="text" @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">图片素材</el-button>
    <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
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
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>
