<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="商品来源" prop="source">
        <el-radio-group v-model="ruleForm.source">
          <el-radio :label="1">手动添加</el-radio>
          <el-radio :label="2">自动获取</el-radio>
        </el-radio-group>
      </el-form-item>
     <el-form-item label="选择商品" v-if="ruleForm.source === 1" prop="goods">
        <div class="goods_list">
          <ul>
            <li v-for="(item, key) of goodsList" :key="key">
              <img :src="item.url" alt="">
              <i class="delete_btn" @click.stop="deleteItem(item)"></i>
            </li>
            <li class="add_button" @click="dialogVisible=true; currentDialog='dialogSelectGoods'">
              <i class="inner"></i>
            </li>
          </ul>
        </div>
      </el-form-item>
      <el-form-item label="显示个数" v-if="ruleForm.source === 2" prop="showNumber">
        <el-input  v-model="ruleForm.showNumber" placeholder="请输入个数"></el-input>
        最多显示30个  
      </el-form-item>
      <el-form-item label="" v-if="ruleForm.source === 2" prop="showAllBtns">
        <el-checkbox v-model="ruleForm.showAllBtns">查看全部按钮</el-checkbox>
        <el-button type="text" @click="dialogVisible=true; currentDialog='dialogMultiPersonDemo'">查看示例</el-button>
      </el-form-item>
      <el-form-item label="排序规则" v-if="ruleForm.source === 2" prop="sortRule">
        <el-select v-model="ruleForm.sortRule" placeholder="请选择排序规则">
          <el-option label="1" value="销量越高越靠前"></el-option>
          <el-option label="2" value="浏览次数越多越靠前"></el-option>
          <el-option label="3" value="开始时间越晚越靠前"></el-option>
          <el-option label="4" value="结束时间越早越靠前"></el-option>
        </el-select>
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
          <el-checkbox label="3">拼团价</el-checkbox>
          <el-checkbox label="4">单买价</el-checkbox>
          <el-checkbox label="5">抢购倒计时</el-checkbox>
          <el-checkbox label="6">已团人数</el-checkbox>
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
      <el-form-item label="更多设置" prop="hideSaledGoods">
        <el-checkbox v-model="ruleForm.hideSaledGoods">隐藏已售罄拼团商品</el-checkbox>
        只展示活动进行中的拼团商品
      </el-form-item>
    </div>

     <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
  </el-form>
</template>

<script>
import propertyMixin from './mixin';
import dialogSelectGoods from '../../dialogs/dialogSelectGoods';
import dialogMultiPersonDemo from '../../dialogs/dialogMultiPersonDemo';
import uuid from 'uuid/v4';
export default {
  name: 'propertyMultiPerson',
  mixins: [propertyMixin],
  components: {dialogSelectGoods, dialogMultiPersonDemo},
  data () {
    return {
      ruleForm: {
        source: 1,
        goods: '',
        showNumber: '',
        showAllBtns: true,
        sortRule: 1,
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
        hideSaledGoods: true,
        buttonStyle: 1
      },
      rules: {

      },
      dialogVisible: false,
      currentDialog: '',
      goodsList: [
        {
          id: uuid(),
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564155770253&di=f38112c9d66f6693432e18152abe5aa7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201203%2F05%2F20120305205212_MNNcA.jpeg',
          title: '这是商品标题',
          desc: '这是商品描述',
          price: 20
        },
        {
          id: uuid(),
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564155770253&di=f38112c9d66f6693432e18152abe5aa7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201203%2F05%2F20120305205212_MNNcA.jpeg',
          title: '这是商品标题2',
          desc: '这是商品描述2',
          price: 37
        },
        {
          id: uuid(),
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564155770253&di=f38112c9d66f6693432e18152abe5aa7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201203%2F05%2F20120305205212_MNNcA.jpeg',
          title: '这是商品标题2',
          desc: '这是商品描述2',
          price: 78
        }
      ]
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

    /* 删除项 */
    deleteItem(item) {
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
    }
  }
}
</script>

<style lang="scss">
</style>
