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
        <el-button type="primary" plain @click="dialogVisible=true; currentDialog='dialogSelectFullReduction'">选择活动</el-button>
        <div>
          <el-tag
            v-for="tag in items"
            :key="tag.name"
            closable
            style="margin-right:5px;"
            type="success" @close="deleteItem(tag)">
            {{tag.name}}
          </el-tag>
        </div>
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
    <component v-if="dialogVisible" :is="currentDialog" :dialogVisible.sync="dialogVisible" @dialogDataSelected="dialogDataSelected"></component>
  </el-form>
</template>

<script>
import propertyMixin from './mixin';
import dialogSelectFullReduction from '@/views/shop/dialogs/dialogSelectFullReduction';
import uuid from 'uuid/v4';
export default {
  name: 'propertyFullReduction',
  mixins: [propertyMixin],
  components: {dialogSelectFullReduction},
  data () {
    return {
      ruleForm: {
        title: '满减/满折',
        displayStyle: 1,
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
