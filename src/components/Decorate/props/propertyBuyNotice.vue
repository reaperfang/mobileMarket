<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" :style="bodyHeight">
    <div class="block form">
      <el-form-item label="购买公告" prop="buyType">
        <el-radio-group v-model="ruleForm.buyType">
          <el-radio :label="1">真实购买公告</el-radio>
          <el-radio :label="2">模拟购买公告</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="间隔时间" v-if="ruleForm.buyType === 2">
        <el-input v-model="ruleForm.intervalStart" style="width:60px"></el-input> - 
        <el-input v-model="ruleForm.intervalEnd" style="width:60px"></el-input>秒
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
       <el-form-item label="公告商品" prop="goods">
        <div class="goods_list">
          <ul>
            <li v-for="(item, key) of list" :key="key">
              <img :src="item.member" alt="">
              <i class="delete_btn" @click.stop="deleteItem(item)"></i>
            </li>
            <li class="add_button" @click="dialogVisible=true; currentDialog='dialogSelectGoods'">
              <i class="inner"></i>
            </li>
          </ul>
        </div>
      </el-form-item>
    </div>

     <!-- 动态弹窗 -->
    <component v-if="dialogVisible" :is="currentDialog" :dialogVisible.sync="dialogVisible" @dialogDataSelected="dialogDataSelected"></component>
  </el-form>
</template>

<script>
import propertyMixin from '../mixins/mixinProps';
import mixinBuyNotice from "../mixins/mixinBuyNotice";
import dialogSelectGoods from '@/views/shop/dialogs/dialogSelectGoods';
export default {
  name: 'propertyBuyNotice',
  mixins: [propertyMixin, mixinBuyNotice],
  components: {dialogSelectGoods},
  data () {
    return {
      ruleForm: {
        buyType: 1,
        intervalStart: 10,
        intervalEnd: 60,
        backgroundColor: 'rgb(255,248,233)',
        fontColor: 'rgb(102,102,102)',
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
        this._globalEvent.$emit('fetchBuyNotice');
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
