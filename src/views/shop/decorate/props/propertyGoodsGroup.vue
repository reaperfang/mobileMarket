<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="商品分组">
        最多添加15个商品分组
        <el-button type="info" plain>添加商品分组</el-button>
      </el-form-item>
      <el-form-item label="全部分组">
        全部分组为商品的集合分组，增加消费者逛的体验
        <el-radio-group v-model="radio">
          <el-radio :label="1">展示</el-radio>
          <el-radio :label="2">不展示</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="展示模板">
        <el-radio-group v-model="radio2">
          <el-radio :label="1">顶部菜单</el-radio>
          <el-radio :label="2">左侧菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单样式">
        <el-radio-group v-model="radio3">
          <el-radio :label="1">样式1</el-radio>
          <el-radio :label="2">样式2</el-radio>
          <el-radio :label="2">样式3</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单位置">
        <el-radio-group v-model="radio4">
          <el-radio :label="1">正常模式</el-radio>
          <el-radio :label="2">滚动至顶部固定</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="列表样式">
        <el-radio-group v-model="radio5">
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
        <el-radio-group v-model="radio6">
          <el-radio :label="1">无边白底</el-radio>
          <el-radio :label="2">卡片投影</el-radio>
          <el-radio :label="3">描边白底</el-radio>
          <el-radio :label="4">无边透明底</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品倒角">
        <el-radio-group v-model="radio7">
          <el-radio :label="1">直角</el-radio>
          <el-radio :label="2">圆角</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图片比例">
        <el-radio-group v-model="radio8">
          <el-radio :label="1">3:2</el-radio>
          <el-radio :label="2">3:2</el-radio>
          <el-radio :label="3">3:4</el-radio>
          <el-radio :label="4">16:9</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图片填充">
        <el-radio-group v-model="radio9">
          <el-radio :label="1">填充</el-radio>
          <el-radio :label="2">周边留白</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文本样式">
        <el-radio-group v-model="radio10">
          <el-radio :label="1">常规体</el-radio>
          <el-radio :label="2">加粗体</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文本对齐">
        <el-radio-group v-model="radio11">
          <el-radio :label="1">左对齐</el-radio>
          <el-radio :label="2">居中对齐</el-radio>
        </el-radio-group>
      </el-form-item>
    </div>

    
    <div class="block form">
      <el-form-item label="商品样式">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="1">商品名称</el-checkbox>
          <el-checkbox label="2">商品价格</el-checkbox>
          <el-checkbox label="3">商品描述</el-checkbox>
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
  name: 'propertyGoodsGroup',
  components: {},
  data () {
    return {
      ruleForm: {
      },
      rules: {

      },
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
