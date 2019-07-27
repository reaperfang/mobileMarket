<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="显示标题" prop="title">
        <el-input
          placeholder="请输入标题"
          v-model="ruleForm.title">
        </el-input>
      </el-form-item>
      <el-form-item label="选择活动" prop="promotion">
        <div class="goods_list">
          <ul>
            <li v-for="(item, key) of goodsList" :key="key">
              <img :src="item.url" alt="">
              <i class="delete_btn" @click.stop="deleteItem(item)"></i>
            </li>
            <li class="add_button">
              <i class="inner"></i>
            </li>
          </ul>
        </div>
        最多可选5个活动
      </el-form-item>
      <el-form-item label="展示样式" prop="displayStyle">
        <el-radio-group v-model="ruleForm.displayStyle">
          <el-radio :label="1">样式1</el-radio>
          <el-radio :label="2">样式2</el-radio>
          <el-radio :label="3">样式3</el-radio>
        </el-radio-group>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import propertyMixin from './propertyMixin.js';
import uuid from 'uuid/v4';
export default {
  name: 'propertyFullReduction',
  mixins: [propertyMixin],
  components: {},
  data () {
    return {
      ruleForm: {
        title: '',
        promotion: '',
        displayStyle: 1
      },
      rules: {

      },
      goodsList: [
        {
          id: uuid(),
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564155770253&di=f38112c9d66f6693432e18152abe5aa7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201203%2F05%2F20120305205212_MNNcA.jpeg',
          title: '这是活动标题',
          desc: '这是活动描述',
          price: 20
        },
        {
          id: uuid(),
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564155770253&di=f38112c9d66f6693432e18152abe5aa7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201203%2F05%2F20120305205212_MNNcA.jpeg',
          title: '这是活动标题2',
          desc: '这是活动描述2',
          price: 37
        },
        {
          id: uuid(),
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564155770253&di=f38112c9d66f6693432e18152abe5aa7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201203%2F05%2F20120305205212_MNNcA.jpeg',
          title: '这是活动标题2',
          desc: '这是活动描述2',
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
.goods_list{
  background:rgb(247,247,249);
  ul{
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    li{
      width:80px;
      height:80px;
      margin-right:20px;
      margin-bottom:20px;
      position:relative;
      &.add_button{
        border:2px dashed rgb(211,211,211);
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        cursor:pointer;
        &:hover{
          transition: all 0.4s;
          border:2px dashed #655EFF;
        }
        .inner{
          display:block;
          width:16px;
          height:16px;
          background:url('../../../../assets/images/shop/editor/icon_+.png') no-repeat 0 0;
        }
      }
      img{
        width:100%;
        height:100%;
      }
      i.delete_btn{
        width:20px;
        height:20px;
        border-radius:50%;
        background:url('../../../../assets/images/shop/editor/delete.png') no-repeat 0 0;
        position:absolute;
        top:0;
        right:0;
        cursor:pointer;
      }
    }
  }
}
</style>
