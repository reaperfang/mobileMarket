<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="添加方式" prop="addType">
        <el-radio-group v-model="ruleForm.addType">
          <el-radio :label="1">手动添加</el-radio>
          <el-radio :label="2">自动获取</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" prop="addType" v-if="ruleForm.addType === 1">
        <el-button type="primary" plain @click="dialogVisible=true; currentDialog='dialogSelectCoupon'">添加优惠券(最多添加10张优惠券)</el-button>
        <el-tag
          v-for="tag in items"
          :key="tag.title"
          closable
          style="margin-right:5px;"
          type="success" @close="deleteItem(tag)">
          {{tag.title}}
        </el-tag>
      </el-form-item>
      <el-form-item label="券活动数" prop="couponNumberType" v-if="ruleForm.addType === 2">
        <el-radio-group v-model="ruleForm.couponNumberType">
          <el-radio :label="1">全部</el-radio>
          <el-radio :label="2">
            <el-input
              style="width:200px;"
              placeholder="请输入显示的券活动数"
              v-model="ruleForm.showNumber" :disabled="ruleForm.couponNumberType === 1">
            </el-input>
          </el-radio>
        </el-radio-group>
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
          <el-radio :label="4">颜色4</el-radio>
          <el-radio :label="5">颜色5</el-radio>
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
    <component v-if="dialogVisible" :is="currentDialog" :dialogVisible.sync="dialogVisible" @dialogDataSelected="dialogDataSelected"></component>
  </el-form>
</template>

<script>
import propertyMixin from './mixin';
import dialogSelectCoupon from '@/views/shop/dialogs/dialogSelectCoupon';
export default {
  name: 'propertyCoupon',
  mixins: [propertyMixin],
  components: {dialogSelectCoupon},
  data () {
    return {
      ruleForm: {
        addType: 2,
        showNumber: 5,   //券活动数
        couponNumberType: 1,  //券活动数类型
        couponStyle: 1,
        couponColor: 1,
        hideScrambled: false,
        ids: []
      },
      rules: {

      },
      dialogVisible: false,
      currentDialog: '',
    }
  },
   watch: {
    'items': {
      handler(newValue) {
        this.ruleForm.ids = [];
        for(let item of newValue) {
          this.ruleForm.ids.push(item.id);
        }
      },
      deep: true
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">

</style>
