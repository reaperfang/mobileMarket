<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="显示标题" prop="title">
        <el-input
          placeholder="请输入标题"
          v-model="ruleForm.title">
        </el-input>
      </el-form-item>
      <el-form-item label="选择活动" prop="promotions">
        <div class="goods_list">
          <ul>
            <li v-for="(item, key) of ruleForm.promotions" :key="key">
              <img :src="item.url" alt="">
              <i class="delete_btn" @click.stop="deleteFullReduction(item)"></i>
            </li>
            <li class="add_button" @click="dialogVisible=true; currentDialog='dialogSelectFullReduction'">
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

     <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible" @dialogDataSelected="dialogDataSelected"></component>
  </el-form>
</template>

<script>
import propertyMixin from './mixin';
import dialogSelectFullReduction from '../../dialogs/dialogSelectFullReduction';
import uuid from 'uuid/v4';
export default {
  name: 'propertyFullReduction',
  mixins: [propertyMixin],
  components: {dialogSelectFullReduction},
  data () {
    return {
      ruleForm: {
        title: '满减/满折',
        promotions: '',
        displayStyle: 1
      },
      rules: {

      },
      dialogVisible: false,
      currentDialog: ''
    }
  },
  created() {
  },
  methods: {

    /* 删除满减活动 */
    deleteFullReduction(item) {
      const tempGoodsList = [...this.ruleForm.promotions];
      for(let i=0;i<tempGoodsList.length;i++) {
        if(item === tempGoodsList[i]) {
          tempGoodsList.splice(i, 1);
        }
      }
      this.ruleForm.promotions = tempGoodsList;
    },

     /* 弹窗选中了商品 */
    dialogDataSelected(list) {
      this.ruleForm.promotions = list;
    },
  }
}
</script>

<style lang="scss">
</style>
