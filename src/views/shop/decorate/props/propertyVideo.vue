<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="视频" prop="source">
        <el-radio-group v-model="source">
          <el-radio :label="1">选择视频</el-radio>
          <el-radio :label="2">粘贴视频地址(小程序v2.15及以上版本支持)</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" v-if="source === 1" prop="videoUrl">
        <div class="img_preview" v-if="ruleForm.videoUrl">
          <img :src="ruleForm.videoUrl" alt="">
          <span @click="dialogVisible=true; currentDialog='dialogSelectVideo'">选择视频</span>
        </div>
        <div class="add_button" v-else @click="dialogVisible=true; currentDialog='dialogSelectVideo'">
          <i class="inner"></i>
        </div>
        建议视频宽高比16：9
      </el-form-item>
      <el-form-item label="" v-if="source === 2" prop="videoUrl">
        <el-input  v-model="ruleForm.videoUrl" placeholder="此处粘贴视频播放地址"></el-input>
        仅支持.mp4格式的播放地址
      </el-form-item>
      <el-form-item label="封面图">
        <el-radio-group v-model="coverType">
          <el-radio :label="1">原视频封面</el-radio>
          <el-radio :label="2">自定义封面</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" v-if="coverType === 2" prop="coverUrl">
        <div v-if="ruleForm.coverUrl" class="img_preview">
          <img :src="ruleForm.coverUrl" alt="">
          <span @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">更换图片</span>
        </div>
        <div v-else class="add_button" @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">
          <i class="inner"></i>
        </div>
        建议图片宽高比16:9
      </el-form-item>
    </div>

     <!-- 动态弹窗 -->
    <component v-if="dialogVisible" :is="currentDialog" :dialogVisible.sync="dialogVisible" @imageSelected="imageSelected" @videoSelected="videoSelected"></component>
  </el-form>
</template>

<script>
import propertyMixin from './mixin';
import dialogSelectVideo from '../../dialogs/dialogSelectVideo';
import dialogSelectImageMaterial from '../../dialogs/dialogSelectImageMaterial';
export default {
  name: 'propertyVideo',
  mixins: [propertyMixin],
  components: {dialogSelectVideo, dialogSelectImageMaterial},
  data () {
    return {
      source: 1,
      coverType: 2,
      ruleForm: {
        videoUrl: '',
        coverUrl: ''
      },
      rules: {

      },
      dialogVisible: false,
      currentDialog: '',
    }
  },
  methods: {
    /* 弹框选中图片 */
    imageSelected(dialogData) {
      this.ruleForm.coverUrl= dialogData.filePath;
    },


    /* 弹框选中视频 */
    videoSelected(dialogData) {
      this.ruleForm.videoUrl= dialogData.videoUrl;
    }
  }
}
</script>

<style lang="scss">

</style>
