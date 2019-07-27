<template>
  <p>视频素材
    <el-button type="text" @click="dialogVisible=true; currentDialog='dialogUploadVideo'">上传视频</el-button>
    <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
  </p>
</template>

<script>
import dialogUploadVideo from '../../dialogs/dialogUploadVideo';
export default {
  name: 'videoMaterial',
  components: {dialogUploadVideo},
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
