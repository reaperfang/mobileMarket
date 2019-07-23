<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="添加方式">
        <el-radio-group v-model="radio">
          <el-radio :label="1">手动添加</el-radio>
          <el-radio :label="2">自动获取</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-button type="info" plain>添加优惠券(最多添加10张优惠券)</el-button>
      <el-form-item label="样式">
        <el-radio-group v-model="radio">
          <el-radio :label="1">样式1</el-radio>
          <el-radio :label="2">样式2</el-radio>
          <el-radio :label="3">样式3</el-radio>
          <el-radio :label="4">样式4</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="颜色" prop="pageBackground">
        <el-radio-group v-model="radio2">
          <el-radio :label="1">颜色1</el-radio>
          <el-radio :label="2">颜色2</el-radio>
          <el-radio :label="3">颜色3</el-radio>
          <el-radio :label="3">颜色4</el-radio>
          <el-radio :label="3">颜色5</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="更多设置">
        <el-checkbox v-model="checked">隐藏已抢完劵</el-checkbox>
      </el-form-item>
      <p>当页面无可显示的优惠券时，优惠券区块将隐藏</p>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'propertyCoupon',
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
