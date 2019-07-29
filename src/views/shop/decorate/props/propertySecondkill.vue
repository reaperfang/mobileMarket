<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="选择商品" prop="goods">
        <div class="goods_list">
          <ul>
            <li v-for="(item, key) of goodsList" :key="key">
              <img :src="item.url" alt="">
              <i class="delete_btn" @click.stop="deleteSecondkill(item)"></i>
            </li>
            <li class="add_button" @click="dialogVisible=true; currentDialog='dialogSelectGoods'">
              <i class="inner"></i>
            </li>
          </ul>
        </div>
        最多添加30个商品
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
            <el-slider v-model="ruleForm.pageMargin"></el-slider>
            <span>{{ruleForm.pageMargin}}像素</span>
          </div>
        </el-form-item>
        <el-form-item label="商品间距" prop="goodsMargin">
            <div class="slider-wrapper">
            <el-slider v-model="ruleForm.goodsMargin"></el-slider>
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
          <el-checkbox label="1">商品名称</el-checkbox>
          <el-checkbox label="2">商品描述</el-checkbox>
          <el-checkbox label="3">商品价格</el-checkbox>
          <el-checkbox label="4">商品原价</el-checkbox>
          <el-checkbox label="5">抢购倒计时</el-checkbox>
          <el-checkbox label="6">剩余库存</el-checkbox>
          <el-checkbox label="7">限制规则</el-checkbox>
          <el-checkbox label="8">购买按钮</el-checkbox>
        </el-checkbox-group>
        <el-radio-group v-if="ruleForm.showContents.includes('8')" v-model="ruleForm.buttonStyle">
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
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible"  @dialogDataSelected="dialogDataSelected"></component>
  </el-form>
</template>

<script>
import propertyMixin from './mixin';
import dialogSelectGoods from '../../dialogs/dialogSelectGoods';
import uuid from 'uuid/v4';
export default {
  name: 'propertySecondkill',
  mixins: [propertyMixin],
  components: {dialogSelectGoods},
  data () {
    return {
      ruleForm: {
        goods: '',
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
        hideType: 1
      },
      rules: {

      },
      dialogVisible: false,
      currentDialog: '',
      goodsList: []
    }
  },
  created() {
    this.convertGoodsId();
  },
  watch: {
    goodsList: {
      handler(newValue) {
        this.convertGoodsId();
      },
      deep: true
    }
  },
  methods: {

    /* 删除秒杀活动 */
    deleteSecondkill(item) {
      const tempGoodsList = [...this.goodsList];
      for(let i=0;i<tempGoodsList.length;i++) {
        if(item === tempGoodsList[i]) {
          tempGoodsList.splice(i, 1);
        }
      }
      this.goodsList = tempGoodsList;
    },

    /* 转换商品id */
    convertGoodsId() {
      const array = [];
      for(let item of this.goodsList) {
        array.push(item.id);
      }
      this.ruleForm.goods = array.join(',');
    },

    /* 弹窗选中了商品 */
    dialogDataSelected(goods) {
      this.goodsList = goods;
    },
  }
}
</script>

<style lang="scss">
</style>