<template>
  <div class="group-wrapper">
    <div class="module view" ref="groupWrapper" :style="fontStyle">
      <div class="phone-head" @click="clickTitle(null)" title="点击编辑页面信息">
        <img :src="require('@/assets/images/shop/editor/phone_head.png')" alt="">
        <span>页面广告</span>
      </div>
      <div class="phone-body">
        <div class="img_wrapper">
          <img :src="ruleForm.adImg" alt="">
          <i></i>
        </div>
      </div>
    </div>
    <div class="module props">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <div class="block header">
          <p class="title">启动设置</p>
          <p class="state">生效中</p>
        </div>
        <div class="block form">
          <el-form-item label="出现样式" prop="showPage">
            <el-radio-group v-model="ruleForm.showPage">
              <el-radio :label="1">首页</el-radio>
              <el-radio :label="2">微页面</el-radio>
              <el-radio :label="3">微页面分类</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="广告名称" prop="adName">
             <el-input v-model="ruleForm.adName" placeholder="请输入广告标题"></el-input>
          </el-form-item>
          <el-form-item label="广告图片" prop="adImg">
            <div class="img_preview" v-if="ruleForm.adImg">
              <img :src="ruleForm.adImg" alt="">
              <span @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">更换图片</span>
            </div>
            <div class="add_button" v-if="!ruleForm.adImg" @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">
              <i class="inner"></i>
            </div>
            <span class="upload_tips">建议尺寸:640 * 350 , 请将所有广告图片尺寸保持一致，图片只能选择一张</span>
          </el-form-item>
          <el-form-item label="广告链接" prop="adLink">
            <el-button type="text" @click="dialogVisible=true; currentDialog='dialogSelectJumpPage'">选择跳转到的页面</el-button>
          </el-form-item>
          <el-form-item label="展示时间" prop="">
            <div>
              <el-date-picker
                v-model="ruleForm.showTimeStart"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            至
            <div>
              <el-date-picker
                v-model="ruleForm.showTimeEnd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </div>

        <div class="block button">
          <el-button @click="routeTo('ADManageIndex')">取    消  </el-button>
          <el-button @click="saveData">保    存</el-button>
        </div>

      </el-form>
    </div>
    <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible" @imageSelected="imageSelected" @dialogDataSelected="dialogDataSelected"></component>
  </div>
</template>

<script>
import dialogSelectImageMaterial from '../../dialogs/dialogSelectImageMaterial';
import dialogSelectJumpPage from '../../dialogs/dialogSelectJumpPage';
export default {
  name: 'shopIndex',
  components: {dialogSelectImageMaterial, dialogSelectJumpPage},
  data () {
    return {
      id: this.$route.query.ADId || '',
      dialogVisible: false,
      currentDialog: '',
      ruleForm: {
        showPage: 1,
        adName: '',
        adImg: '',
        adLink: '',
        showTimeStart: '',
        showTimeEnd: '',
      },
      rules: {}
    }
  },
  created() {

  },
  methods: {
    /* 弹框选中图片 */
    imageSelected(dialogData) {
      this.ruleForm.adImg= dialogData.src;
    },

    /* 弹窗选中了跳转链接 */
    dialogDataSelected(jumpLink) {
      console.log(jumpLink);
    },

    /* 保存图片广告数据 */
    saveData() {
      console.log(this.id, this.ruleForm);
    }
  }
}
</script>

<style lang="scss" scoped>
.group-wrapper{
  display:flex;
  flex-direction: row;
  .content {
    padding: 10px 0 0 10px;
    box-sizing: border-box;
    width: 100%;
    .wrapper {
      background: #fff;
      margin-bottom: 10px;
      p {
        background: rgba(247, 247, 247, 1);
        padding: 10px;
        margin-bottom: 20px;
      }
      ul.group {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
          cursor:pointer;
          img {
            width: 65px;
            height: 65px;
          }
          span {
            margin-top: 20px;
          }
        }
      }
    }
  }
}
.upload_tips{
  color:rgba(211,211,211,1);
}
.module {
  &.view {
    width: 374px;
    .phone-body {
      background: rgb(217,217,223);
      width:100%;
      height:100%;
      position:relative;
      .img_wrapper{ 
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%, -50%);
        display:flex;
        flex-direction: column;
        width:calc(100% - 80px);
        align-items: center;
        img{
          max-width: 100%;
        }
        i{
          background: url('../../../../assets/images/shop/icon_close.png') no-repeat 0 0;
          width:44px;
          height:44px;
          margin-top:22px;
        }
      }
    }
  }
  &.props{
    width:346px;
    .block{
      &.button{
        padding: 30px 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
    }
  }
}
</style>
