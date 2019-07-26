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
          <span>更换图片</span>
        </div>
        <div class="add_button">
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
          <span>选择封面图</span>
        </div>
        <div class="add_button">
          <i class="inner"></i>
        </div>
        建议图片宽高比16:9
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import propertyMixin from './propertyMixin.js';
export default {
  name: 'propertyVideo',
  mixins: [propertyMixin],
  components: {},
  data () {
    return {
      source: 1,
      coverType: 2,
      ruleForm: {
        videoUrl: '',
        coverUrl: ''
      },
      rules: {

      }
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
.add_button{
  border:2px dashed rgb(211,211,211);
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor:pointer;
  width: 80px;
  height: 80px;
  &:hover{
    transition: all 0.4s;
    border:2px dashed #655EFF;
  }
  .inner{
    display:block;
    width:16px;
    height:16px;
    background:url('../../../../assets/images/shop/editor/icon_+.png') no-repeat 0 0;
  }
}
.img_preview{
  width:80px;
  height:80px;
  position: relative;
  img{
    width:100%;
    height:100%;
  }
  span{
    display:block;
    width:100%;
    text-align:center;
    position:absolute;
    bottom:0;
    height:20px;
    line-height:20px;
    background:rgb(124, 124, 124);
    color:#fff;
  }
}

</style>
