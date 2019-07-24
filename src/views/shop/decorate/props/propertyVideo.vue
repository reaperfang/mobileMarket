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
        <el-button type="primary" plain>从视频库选择视频</el-button>
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
        <el-button type="primary" plain>选择封面图</el-button>
        建议图片宽高比16:9
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'propertyVideo',
  props: ['data'],
  components: {},
  data () {
    return {
      source: 1,
      coverType: 1,
      ruleForm: {
        videoUrl: '',
        coverUrl: ''
      },
      rules: {

      }
    }
  },
  created() {
    this.initRuleForm();
  },
  watch: {
    ruleForm: {
      handler(newValue) {
        this.emitChangeRuleForm(newValue);
      },
      deep: true
    }
  },
  methods: {

    /* 初始化表单数据 */
    initRuleForm() {
      if(this.data){
        this.ruleForm = this.data;
      }
       this.$emit('change', {
        id: this.$parent.currentComponentId,
        data: this.ruleForm
      });
    },

    /* 发送数据改变事件 */
    emitChangeRuleForm(newValue) {
      this.$emit('change', {
        id: this.$parent.currentComponentId,
        data: newValue
      });
    }
  }
}
</script>

<style lang="scss">
.slider-wrapper{
  width:100%;
  display:flex;
  justify-content: space-between;
  .el-slider{
    width:66%;
  }
  span{
    margin-right:20px;
  }
}
.el-upload{
  width:80px!important;
  height:80px!important;
  line-height:90px!important;
}
.el-upload-list__item{
  width:80px!important;
  height:80px!important;
}
</style>
