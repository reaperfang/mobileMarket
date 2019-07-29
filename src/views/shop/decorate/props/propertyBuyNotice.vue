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
       <el-form-item label="商品" v-if="ruleForm.goodsType === 1" prop="goods">
        <div class="goods_list">
          <ul>
            <li v-for="(item, key) of goodsList" :key="key">
              <img :src="item.url" alt="">
              <i class="delete_btn" @click.stop="deleteGoods(item)"></i>
            </li>
            <li class="add_button" @click="dialogVisible=true; currentDialog='dialogSelectGoods'">
              <i class="inner"></i>
            </li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="商品分组" v-if="ruleForm.goodsType === 2" prop="goodsGroup">
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
    </div>

     <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible" @dialogDataSelected="dialogDataSelected" @dialogGoodsGroupSelected="dialogGoodsGroupSelected"></component>
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
        goods: '',
        goodsGroups: []
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

     /* 删除商品 */
    deleteGoods(item) {
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
    },
  }
}
</script>

<style lang="scss">
</style>
