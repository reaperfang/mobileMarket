<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="block header">
          <p class="title">个人信息页设置</p>
          <p class="state">生效中</p>
        </div>
        <div class="block form">
          <el-form-item label="背景图片" prop="backgroundImage">
            <div class="img_preview" v-if="ruleForm.backgroundImage">
              <img :src="ruleForm.backgroundImage" alt="">
              <span @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">更换图片</span>
            </div>
            <div class="add_button" v-if="!ruleForm.backgroundImage" @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">
              <i class="inner"></i>
            </div>
            建议尺寸：750*370，尺寸不匹配时，图片将被压缩或拉伸以铺满四周
          </el-form-item>
          <el-form-item label="背景渐变" prop="backgroundGradients">
            <el-radio-group v-model="ruleForm.backgroundGradients">
              <el-radio :label="1">无渐变</el-radio>
              <el-radio :label="2">白色渐变</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="block form">
          <el-form-item label="头像位置" prop="avatarPosition">
             <el-radio-group v-model="ruleForm.avatarPosition">
              <el-radio :label="1">居左</el-radio>
              <el-radio :label="2">居中</el-radio>
              <el-radio :label="3">居右</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="个人昵称颜色" prop="nickColor">
            <div class="color_block">
              <el-input v-model="ruleForm.nickColor" :disabled="true"></el-input>
              <colorPicker  v-model="ruleForm.nickColor"></colorPicker >
              <el-button type="text">重置</el-button>
            </div>
          </el-form-item>
          <el-form-item label="会员栏样式" prop="memberColumeStyle">
             <el-radio-group v-model="ruleForm.memberColumeStyle">
              <el-radio :label="1">样式一</el-radio>
              <el-radio :label="2">样式二</el-radio>
              <el-radio :label="3">样式三</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="block button">
          <el-button @click="resetData">重    置</el-button>
          <el-button @click="save">保    存</el-button>
          <el-button type="primary" @click="saveAndApply">保存并生效</el-button>
          <el-button>预    览  </el-button>
        </div>
        <!-- 动态弹窗 -->
        <component v-if="dialogVisible" :is="currentDialog" :dialogVisible.sync="dialogVisible" @imageSelected="imageSelected"></component>
      </el-form>
</template>

<script>
import dialogSelectImageMaterial from '../../dialogs/dialogSelectImageMaterial';
export default {
  name: 'propertyUserCenter',
  components: {dialogSelectImageMaterial},
  props: ['saveAndApply', 'save', 'resetData', 'data'],
  data () {
    return {
      dialogVisible: false,
      currentDialog: '',
      ruleForm: {
        backgroundImage: '',  //背景图
        backgroundGradients: 1,  //背景渐变
        avatarPosition: 1,  //头像位置
        nickColor: '#000000',  //昵称颜色
        memberColumeStyle: 1  //会员栏样式
      },
      rules: {}
    }
  },
  watch:{
    data:{
      handler(newValue) {
        this.ruleForm = newValue;
      },
      deep: true
    },
    ruleForm: {
      handler(newValue) {
        this.$emit('userCenterDataChanged', newValue);
      },
      deep: true
    }
  },
  created() {
    this.$emit('userCenterDataChanged', this.ruleForm);
  },
  computed: {
    
  },
  methods: {

     /* 弹框选中图片 */
    imageSelected(dialogData) {
      this.ruleForm.backgroundImage = dialogData.filePath;
    }
  }
}
</script>

<style lang="scss" scoped>
 .block{
      &.button{
        padding: 30px 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
    }
</style>
