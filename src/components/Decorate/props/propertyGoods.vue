<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="商品来源" prop="source">
        <el-radio-group v-model="ruleForm.source">
          <el-radio :label="1">商品</el-radio>
          <el-radio :label="2">商品分组</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品" v-if="ruleForm.source === 1" prop="goods">
        <div class="goods_list">
          <ul>
            <li v-for="(item, key) of list" :key="key">
              <img :src="item.mainImage" alt="">
              <i class="delete_btn" @click.stop="deleteItem(item)"></i>
            </li>
            <li class="add_button" @click="dialogVisible=true; currentDialog='dialogSelectGoods'">
              <i class="inner"></i>
            </li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="商品分组" v-if="ruleForm.source === 2" prop="goodsGroup">
        <el-button type="text"  @click="dialogVisible=true; currentDialog='dialogSelectGoodsGroup'">从商品分组中选择</el-button>
        <div class="goods_groups">
          <el-tag
            v-for="tag in ruleForm.goodsGroups"
            :key="tag.title"
            closable
            type="success" @close="deleteGoodsGroup(tag)">
            {{tag.title}}
          </el-tag>
        </div>
      </el-form-item>
      <el-form-item label="显示个数" v-if="ruleForm.source === 2" prop="showNumber">
        <el-input  v-model="ruleForm.showNumber" placeholder="请输入个数"></el-input>
        最多显示50个
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
      <el-form-item label="商品倒角"  prop="goodsChamfer">
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
          <el-checkbox label="2">商品价格</el-checkbox>
          <el-checkbox label="3">商品描述</el-checkbox>
          <el-checkbox label="4">购买按钮</el-checkbox>
        </el-checkbox-group>
        <el-radio-group v-if="ruleForm.showContents.includes('4')" v-model="ruleForm.buttonStyle">
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
    </div>
    
    <!-- 动态弹窗 -->
    <component v-if="dialogVisible" :is="currentDialog" :dialogVisible.sync="dialogVisible" @dialogDataSelected="dialogDataSelected" @dialogGoodsGroupSelected="dialogGoodsGroupSelected"></component>
  </el-form>
</template>

<script>
import propertyMixin from '../mixins/mixinProps';
import mixinGoods from '../mixins/mixinGoods';
import dialogSelectGoods from '@/views/shop/dialogs/dialogSelectGoods';
import dialogSelectGoodsGroup from '@/views/shop/dialogs/dialogSelectGoodsGroup';
export default {
  name: 'propertyGoods',
  mixins: [propertyMixin, mixinGoods],
  components: {dialogSelectGoods, dialogSelectGoodsGroup},
  data () {
    return {
      ruleForm: {
        source: 1,
        goodsGroups: [],
        showNumber: 0,
        listStyle: 1,
        pageMargin: 15,
        goodsMargin: 10,
        goodsStyle: 1,
        goodsChamfer: 1,
        goodsRatio: 1,
        goodsFill: 2,
        textStyle: 1,
        textAlign: 1,
        showContents: ['1', '2', '3', '4'],
        buttonStyle: 1,
        ids: []
      },
      rules: {

      },
      list: [],
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
        this._globalEvent.$emit('fetchGoods');
      },
      deep: true
    }
  },
  methods: {

    /* 弹窗选中了商品分组 */
    dialogGoodsGroupSelected(goodsGroup) {
      this.ruleForm.goodsGroups = goodsGroup;
    },

     /* 删除项 */
    deleteGoodsGroup(item) {
      const tempGoodsGroups = [...this.ruleForm.goodsGroups];
      for(let i=0;i<tempGoodsGroups.length;i++) {
        if(item === tempGoodsGroups[i]) {
          tempGoodsGroups.splice(i, 1);
        }
      }
      this.ruleForm.goodsGroups = tempGoodsGroups;
    }
  }
}
</script>

<style lang="scss">
</style>
