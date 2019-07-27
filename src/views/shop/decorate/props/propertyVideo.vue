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
        <div class="img_preview">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564155770253&di=f38112c9d66f6693432e18152abe5aa7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201203%2F05%2F20120305205212_MNNcA.jpeg" alt="">
          <span @click="dialogVisible=true; currentDialog='dialogSelectVideo'">选择视频</span>
        </div>
        <div class="add_button" @click="dialogVisible=true; currentDialog='dialogSelectVideo'">
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
        <div class="img_preview">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564155770253&di=f38112c9d66f6693432e18152abe5aa7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201203%2F05%2F20120305205212_MNNcA.jpeg" alt="">
          <span @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">选择封面图</span>
        </div>
        <div class="add_button" @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">
          <i class="inner"></i>
        </div>
        建议图片宽高比16:9
      </el-form-item>
    </div>

     <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
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

  }
}
</script>

<style lang="scss">

</style>
