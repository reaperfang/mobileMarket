<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="添加方式" prop="addType">
        <el-radio-group v-model="ruleForm.addType">
          <el-radio :label="1">手动添加</el-radio>
          <el-radio :label="2">自动获取</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" prop="addType">
        <el-button type="primary" plain @click="dialogVisible=true; currentDialog='dialogSelectCoupon'">添加优惠券(最多添加10张优惠券)</el-button>
        <el-tag
          v-for="tag in ruleForm.coupons"
          :key="tag.title"
          closable
          type="success" @close="deleteCoupon(tag)">
          {{tag.title}}
        </el-tag>
      </el-form-item>
      <el-form-item label="样式" prop="couponStyle">
        <el-radio-group v-model="ruleForm.couponStyle">
          <el-radio :label="1">样式1</el-radio>
          <el-radio :label="2">样式2</el-radio>
          <el-radio :label="3">样式3</el-radio>
          <el-radio :label="4">样式4</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="颜色" prop="couponColor">
        <el-radio-group v-model="ruleForm.couponColor">
          <el-radio :label="1">颜色1</el-radio>
          <el-radio :label="2">颜色2</el-radio>
          <el-radio :label="3">颜色3</el-radio>
          <el-radio :label="3">颜色4</el-radio>
          <el-radio :label="3">颜色5</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="更多设置" prop="hideScrambled">
        <el-checkbox v-model="ruleForm.hideScrambled">隐藏已抢完劵</el-checkbox>
      </el-form-item>
      <el-form-item label="">
        <p>当页面无可显示的优惠券时，优惠券区块将隐藏</p>
      </el-form-item>
    </div>

     <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible" @dialogDataSelected="dialogDataSelected"></component>
  </el-form>
</template>

<script>
import propertyMixin from './mixin';
import dialogSelectCoupon from '../../dialogs/dialogSelectCoupon';
export default {
  name: 'propertyCoupon',
  mixins: [propertyMixin],
  components: {dialogSelectCoupon},
  data () {
    return {
      ruleForm: {
        addType: 1,
        couponStyle: 1,
        couponColor: 1,
        hideScrambled: true,
        coupons: []
      },
      rules: {

      },
      dialogVisible: false,
      currentDialog: '',
    }
  },
  methods: {

    /* 删除优惠券 */
    deleteCoupon(item) {
      const tempCoupons = [...this.ruleForm.coupons];
      for(let i=0;i<tempCoupons.length;i++) {
        if(item === tempCoupons[i]) {
          tempCoupons.splice(i, 1);
        }
      }
      this.ruleForm.coupons = tempCoupons;
    },

    /* 弹窗选中了优惠券 */
    dialogDataSelected(coupons) {
      this.ruleForm.coupons = coupons;
    } 
  }
}
</script>

<style lang="scss">

</style>
