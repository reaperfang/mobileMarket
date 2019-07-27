<template>
  <p>图片素材
    <el-button type="text" @click="dialogVisible=true; currentDialog='dialogUploadImage'">上传图片</el-button>
    <el-button type="text" @click="dialogVisible=true; currentDialog='dialogCutImage'">剪裁</el-button>
    <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
  </p>
</template>

<script>
import dialogCutImage from '../../dialogs/dialogCutImage';
import dialogUploadImage from '../../dialogs/dialogUploadImage';
export default {
  name: 'imageMaterial',
  components: {dialogCutImage, dialogUploadImage},
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
