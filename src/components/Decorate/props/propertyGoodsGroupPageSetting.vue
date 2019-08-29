<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="block header">
          <p class="title">商品分组页设置</p>
          <p class="state">生效中</p>
        </div>
        <div class="block form">
          <el-form-item label="分组样式" prop="groupStyle">
            <el-radio-group v-model="ruleForm.groupStyle">
              <el-radio :label="1">左侧样式</el-radio>
              <el-radio :label="2">顶部样式</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="分组字体" prop="groupFont">
             <el-radio-group v-model="ruleForm.groupFont">
              <el-radio :label="1">常规体</el-radio>
              <el-radio :label="2">加粗体</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="分组图片" prop="groupImg">
             <el-radio-group v-model="ruleForm.groupImg">
              <el-radio :label="1">直角</el-radio>
              <el-radio :label="2">圆角</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="block form">
          <el-form-item label="页面边距" prop="groupStyle">
            <div class="slider-wrapper">
             <el-slider v-model="ruleForm.pageMargin" :min="0" :max="30"></el-slider>
             <span>{{ruleForm.pageMargin}}像素</span>
            </div>
          </el-form-item>
          <el-form-item label="分组间距" prop="groupFont">
             <div class="slider-wrapper">
              <el-slider v-model="ruleForm.groupMargin" :min="0" :max="30"></el-slider>
              <span>{{ruleForm.groupMargin}}像素</span>
             </div>
          </el-form-item>
        </div>

        <div class="block button">
          <el-button @click="resetData">重    置</el-button>
          <el-button @click="save">保    存</el-button>
          <el-button type="primary" @click="saveAndApply">保存并生效</el-button>
          <el-button>预    览  </el-button>
        </div>

      </el-form>
</template>

<script>
export default {
  name: 'propertyGoodsGroupPageSetting',
  components: {},
  props: ['saveAndApply', 'save', 'resetData', 'data'],
  data () {
    return {
      ruleForm: {
        groupStyle: 1,  //分组样式
        groupFont: 1,  //分组字体
        groupImg: 1,  //图片圆角
        pageMargin: 15,  //页面边距
        groupMargin: 20  //分组间距
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
        this.$emit('goodsGroupPageDataChanged', newValue);
      },
      deep: true
    }
  },
  created() {
    this.$emit('goodsGroupPageDataChanged', this.ruleForm);
  },
  computed: {
    
  },
  methods: {
    
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

.el-radio-group{
  margin-top: 9px;
  .el-radio {
      margin-bottom: 10px;
      margin-right: 10px;
  }
}
.el-checkbox-group{
  .el-checkbox{
    margin-right: 10px;
  }
}
</style>
