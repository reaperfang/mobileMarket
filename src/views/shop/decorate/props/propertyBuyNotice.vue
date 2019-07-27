<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="购买公告" prop="buyType">
        <el-radio-group v-model="ruleForm.buyType">
          <el-radio :label="1">真实购买公告</el-radio>
          <el-radio :label="2">模拟购买公告</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="间隔时间" v-if="ruleForm.buyType === 2">
        <el-input v-model="ruleForm.intervalStart"></el-input> - 
        <el-input v-model="ruleForm.intervalEnd"></el-input>秒
      </el-form-item>
      <el-form-item label="背景颜色" prop="backgroundColor">
        <div class="color_block">
          <el-input v-model="ruleForm.backgroundColor" :disabled="true"></el-input>
          <colorPicker  v-model="ruleForm.backgroundColor"></colorPicker >
          <el-button type="text">重置</el-button>
        </div>
      </el-form-item>
      <el-form-item label="文字颜色" prop="fontColor">
        <div class="color_block">
          <el-input v-model="ruleForm.fontColor" :disabled="true"></el-input>
          <colorPicker  v-model="ruleForm.fontColor"></colorPicker >
          <el-button type="text">重置</el-button>
        </div>
      </el-form-item>
      <el-form-item label="公告商品" prop="goodsType">
        <el-radio-group v-model="ruleForm.goodsType">
          <el-radio :label="1">商品</el-radio>
          <el-radio :label="2">商品分组</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品" prop="goods">
        <div class="img_preview">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564155770253&di=f38112c9d66f6693432e18152abe5aa7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201203%2F05%2F20120305205212_MNNcA.jpeg" alt="">
          <span @click="dialogVisible=true; currentDialog='dialogSelectGoods'">选择商品</span>
        </div>
        <div class="add_button" @click="dialogVisible=true; currentDialog='dialogSelectGoods'">
          <i class="inner"></i>
        </div>
        建议图片宽高比16:9
      </el-form-item>
    </div>

     <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
  </el-form>
</template>

<script>
import propertyMixin from './mixin';
import dialogSelectGoods from '../../dialogs/dialogSelectGoods';
import dialogSelectGoodsGroup from '../../dialogs/dialogSelectGoodsGroup';
export default {
  name: 'propertyBuyNotice',
  mixins: [propertyMixin],
  components: {dialogSelectGoods, dialogSelectGoodsGroup},
  data () {
    return {
      ruleForm: {
        buyType: 1,
        intervalStart: 10,
        intervalEnd: 60,
        backgroundColor: '',
        fontColor: '',
        goodsType: 1,
        goods: ''
      },
      rules: {

      },
      dialogVisible: false,
      currentDialog: '',
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
</style>
