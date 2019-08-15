<template>
  <DialogBase :visible.sync="visible" width="816px" :title="'推广'">
     <el-tabs v-model="currentType">
      <el-tab-pane label="H5" name="h5"></el-tab-pane>
      <el-tab-pane label="小程序" name="mini"></el-tab-pane>
      <div class="popularize_wrapper">
        <div class="preview">
          <div class="one">
            <img src="https://img.yzcdn.cn/upload_files/2019/08/12/FjFkru6olMLUuEvfhRx3ZDggz7E2.jpg" alt="">
            <h3>数据库的房价快速</h3>
            <p>谁都不能飞机看风景看到房价快速的那附近</p>
          </div>
          <div class="two">
            <div class="left">
              <h3>数据库的房价快速</h3>
              <p>谁都不能飞机看风景看到房价快速的那附近</p>
            </div>
            <div class="right">
              <img src="https://img.yzcdn.cn/upload_files/2019/08/12/FjFkru6olMLUuEvfhRx3ZDggz7E2.jpg" alt="">
            </div>
          </div>
        </div>
        <div class="setting">
          <div>
            <el-input v-model="input" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <el-button type="text">更多设置</el-button>
            <el-button type="text">下载海报图片</el-button>
            <el-button type="text">下载二维码</el-button>
          </div>
           <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
              <el-form-item label="分享样式" prop="shareStyle">
                <el-radio-group v-model="ruleForm.shareStyle">
                  <el-radio :label="1">海报</el-radio>
                  <el-radio :label="2">微信好友</el-radio>
                  <el-radio :label="3">微信朋友圈</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="分享标题" prop="title">
                <el-input
                  :rows="5"
                  placeholder="请输入分享标题，最多10字"
                  v-model="ruleForm.title">
                </el-input>
              </el-form-item>
              <el-form-item label="分享描述" prop="desc">
                <el-input
                  :rows="5"
                  placeholder="请输入分享标题，最多10字"
                  v-model="ruleForm.desc">
                </el-input>
              </el-form-item>
              <el-form-item label="分享图片" prop="shareImage">
                <div class="img_preview" v-if="ruleForm.shareImage">
                  <img :src="ruleForm.shareImage" alt="">
                  <span @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">更换图片</span>
                </div>
                <div class="add_button" v-if="!ruleForm.shareImage" @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">
                  <i class="inner"></i>
                </div>
                建议尺寸：750*370，尺寸不匹配时，图片将被压缩或拉伸以铺满四周
              </el-form-item>
          </el-form>
        </div>
      </div>
    </el-tabs>
    <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible" @seletedPage="seletedPage"></component>
  </DialogBase>
</template>

<script>
import DialogBase from "@/components/DialogBase";
import dialogSelectImageMaterial from './dialogSelectImageMaterial';
import utils from "@/utils";
export default {
  name: "dialogPopularize",
  components: {DialogBase, dialogSelectImageMaterial},
  props: {
      data: {},
      dialogVisible: {
          type: Boolean,
          required: true
      },
  },
  data() {
    return {
      currentType: 'h5',
      dialogVisible: false,
      currentDialog: '',
      ruleForm: {
        shareStyle: 1,
        title: '',
        desc: '',
        shareImage: ''
      },
      rules: {

      }
    };
  },
  computed: {
    visible: {
      get() {
          return this.dialogVisible
      },
      set(val) {
          this.$emit('update:dialogVisible', val)
      }
    }
  },
  created() {
  },
  methods: {
  }
};
</script>

<style lang="scss">
</style>