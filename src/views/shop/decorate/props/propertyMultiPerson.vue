<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="商品来源">
        <el-radio-group v-model="ruleForm.source">
          <el-radio :label="1">手动添加</el-radio>
          <el-radio :label="2">自动获取</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品" v-if="ruleForm.source === 1">
        <el-upload
          action="#"
          list-type="picture-card"
          :auto-upload="false">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <i class="el-icon-download"></i>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
        </el-upload>
        最多添加30个商品
      </el-form-item>
      <el-form-item label="显示个数" v-if="ruleForm.source === 2">
        <el-input  v-model="input" placeholder="请输入个数"></el-input>
        最多显示30个
      </el-form-item>
      <el-form-item label="" v-if="ruleForm.source === 2">
        <el-checkbox v-model="checked">查看全部按钮</el-checkbox>
        <el-button type="text">查看示例</el-button>
      </el-form-item>
      <el-form-item label="列表样式">
        <el-radio-group v-model="radio2">
          <el-radio :label="1">大图模式</el-radio>
          <el-radio :label="2">一行两个</el-radio>
          <el-radio :label="3">一行三个</el-radio>
          <el-radio :label="4">详细列表</el-radio>
          <el-radio :label="5">一大两小</el-radio>
          <el-radio :label="6">横向滑动</el-radio>
        </el-radio-group>
      </el-form-item>
    </div>

    <div class="block form">
        <el-form-item label="页面边距" prop="groupStyle">
          <div class="slider-wrapper">
            <el-slider v-model="ruleForm.pageMargin"></el-slider>
            <span>{{ruleForm.pageMargin}}像素</span>
          </div>
        </el-form-item>
        <el-form-item label="商品间距" prop="groupFont">
            <div class="slider-wrapper">
            <el-slider v-model="ruleForm.groupMargin"></el-slider>
            <span>{{ruleForm.groupMargin}}像素</span>
            </div>
        </el-form-item>
    </div>


    <div class="block form">
      <el-form-item label="商品样式">
        <el-radio-group v-model="radio3">
          <el-radio :label="1">无边白底</el-radio>
          <el-radio :label="2">卡片投影</el-radio>
          <el-radio :label="3">描边白底</el-radio>
          <el-radio :label="4">无边透明底</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品倒角">
        <el-radio-group v-model="radio4">
          <el-radio :label="1">直角</el-radio>
          <el-radio :label="2">圆角</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图片比例">
        <el-radio-group v-model="radio5">
          <el-radio :label="1">3:2</el-radio>
          <el-radio :label="2">1:1</el-radio>
          <el-radio :label="3">3:4</el-radio>
          <el-radio :label="4">16:9</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图片填充">
        <el-radio-group v-model="radio6">
          <el-radio :label="1">填充</el-radio>
          <el-radio :label="2">周边留白</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文本样式">
        <el-radio-group v-model="radio7">
          <el-radio :label="1">常规体</el-radio>
          <el-radio :label="2">加粗体</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文本对齐">
        <el-radio-group v-model="radio8">
          <el-radio :label="1">左对齐</el-radio>
          <el-radio :label="2">居中对齐</el-radio>
        </el-radio-group>
      </el-form-item>
    </div>

    
    <div class="block form">
      <el-form-item label="商品样式">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="1">商品名称</el-checkbox>
          <el-checkbox label="2">商品描述</el-checkbox>
          <el-checkbox label="3">拼团价</el-checkbox>
          <el-checkbox label="4">单买价</el-checkbox>
          <el-checkbox label="4">抢购倒计时</el-checkbox>
          <el-checkbox label="4">已团人数</el-checkbox>
          <el-checkbox label="4">限制规则</el-checkbox>
          <el-checkbox label="4">购买按钮</el-checkbox>
        </el-checkbox-group>
        <el-radio-group v-model="radio8">
          <el-radio :label="1">样式一</el-radio>
          <el-radio :label="2">样式二</el-radio>
          <el-radio :label="3">样式三</el-radio>
          <el-radio :label="4">样式四</el-radio>
          <el-radio :label="5">样式五</el-radio>
          <el-radio :label="6">样式六</el-radio>
          <el-radio :label="7">样式七</el-radio>
          <el-radio :label="8">样式八</el-radio>
        </el-radio-group>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'propertyMultiPerson',
  components: {},
  data () {
    return {
      ruleForm: {
        source: 1,
      },
      rules: {

      },

      //上传相关
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,

      checkList: []

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
