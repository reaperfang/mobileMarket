<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="选择套餐" prop="packages">
        <div class="goods_list">
          <ul>
            <li v-for="(item, key) of items" :key="key">
              <img :src="item.activityPic" alt="">
              <i class="delete_btn" @click.stop="deleteItem(item)"></i>
            </li>
            <li class="add_button" @click="dialogVisible=true; currentDialog='dialogSelectPackage'">
              <i class="inner"></i>
            </li>
          </ul>
        </div>
        最多添加30个活动
      </el-form-item>
      <el-form-item label="列表样式" prop="listStyle">
        <el-radio-group v-model="ruleForm.listStyle">
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
        <el-form-item label="页面边距" prop="pageMargin">
          <div class="slider-wrapper">
            <el-slider v-model="ruleForm.pageMargin" :min="0" :max="30"></el-slider>
            <span>{{ruleForm.pageMargin}}像素</span>
          </div>
        </el-form-item>
        <el-form-item label="商品间距" prop="goodsMargin">
            <div class="slider-wrapper">
            <el-slider v-model="ruleForm.goodsMargin" :min="0" :max="30"></el-slider>
            <span>{{ruleForm.goodsMargin}}像素</span>
            </div>
        </el-form-item>
    </div>


    <div class="block form">
      <el-form-item label="商品样式" prop="goodsStyle">
        <el-radio-group v-model="ruleForm.goodsStyle">
          <el-radio :label="1">无边白底</el-radio>
          <el-radio :label="2">卡片投影</el-radio>
          <el-radio :label="3">描边白底</el-radio>
          <el-radio :label="4">无边透明底</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品倒角" prop="goodsChamfer">
        <el-radio-group v-model="ruleForm.goodsChamfer">
          <el-radio :label="1">直角</el-radio>
          <el-radio :label="2">圆角</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图片比例" prop="goodsRatio">
        <el-radio-group v-model="ruleForm.goodsRatio">
          <el-radio :label="1">3:2</el-radio>
          <el-radio :label="2">1:1</el-radio>
          <el-radio :label="3">3:4</el-radio>
          <el-radio :label="4">16:9</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="图片填充" prop="goodsFill">
        <el-radio-group v-model="ruleForm.goodsFill">
          <el-radio :label="1">填充</el-radio>
          <el-radio :label="2">周边留白</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文本样式" prop="textStyle">
        <el-radio-group v-model="ruleForm.textStyle">
          <el-radio :label="1">常规体</el-radio>
          <el-radio :label="2">加粗体</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文本对齐" prop="textAlign">
        <el-radio-group v-model="ruleForm.textAlign">
          <el-radio :label="1">左对齐</el-radio>
          <el-radio :label="2">居中对齐</el-radio>
        </el-radio-group>
      </el-form-item>
    </div>

    
    <div class="block form">
      <el-form-item label="显示内容" prop="showContents">
        <el-checkbox-group v-model="ruleForm.showContents">
          <el-checkbox label="1">套餐名称</el-checkbox>
          <el-checkbox label="2">套餐内含商品</el-checkbox>
          <el-checkbox label="3">套餐价格</el-checkbox>
          <el-checkbox label="4">抢购倒计时</el-checkbox>
          <el-checkbox label="5">限制规则</el-checkbox>
          <el-checkbox label="6">购买按钮</el-checkbox>
        </el-checkbox-group>
        <el-radio-group v-if="ruleForm.showContents.includes('6')" v-model="ruleForm.buttonStyle">
          <el-radio :label="1">样式1</el-radio>
          <el-radio :label="2">样式2</el-radio>
          <el-radio :label="3">样式3</el-radio>
          <el-radio :label="4">样式4</el-radio>
          <el-radio :label="5">样式5</el-radio>
          <el-radio :label="6">样式6</el-radio>
          <el-radio :label="7">样式7</el-radio>
          <el-radio :label="8">样式8</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="更多设置">
        <el-checkbox v-model="ruleForm.hideSaledGoods">隐藏已售罄商品</el-checkbox>
        <el-checkbox v-model="ruleForm.hideEndGoods">隐藏活动结束商品</el-checkbox>
        <el-radio-group v-model="ruleForm.hideType">
          <el-radio :label="1">24小时后隐藏</el-radio>
          <el-radio :label="2">立即隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
    </div>

     <!-- 动态弹窗 -->
    <component v-if="dialogVisible" :is="currentDialog" :dialogVisible.sync="dialogVisible" @dialogDataSelected="dialogDataSelected"></component>
  </el-form>
</template>

<script>
import propertyMixin from './mixin';
import dialogSelectPackage from '@/views/shop/dialogs/dialogSelectPackage';
import uuid from 'uuid/v4';
export default {
  name: 'propertyDiscountPackage',
  mixins: [propertyMixin],
  components: {dialogSelectPackage},
  data () {
    return {
      ruleForm: {
        listStyle: 1,
        pageMargin: 15,
        goodsMargin: 10,
        goodsStyle: 1,
        goodsChamfer: 1,
        goodsRatio: 1,
        goodsFill: 1,
        textStyle: 1,
        textAlign: 1,
        showContents: [],
        buttonStyle: 1,
        hideSaledGoods: true,
        hideEndGoods: false,
        hideType: 1,
        ids: []
      },
      rules: {

      },
      dialogVisible: false,
      currentDialog: ''

    }
  },
  created() {
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