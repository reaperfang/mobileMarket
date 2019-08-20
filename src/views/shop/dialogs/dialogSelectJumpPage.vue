/* 选择页面跳转弹框 */
<template>
  <DialogBase :visible.sync="visible" width="816px" :title="'选择跳转页面'" @submit="submit">
    <div class="jump_wrapper" style="background:rgb(242,242,249);">
      <el-tabs v-model="currentTab">
        <el-tab-pane label="微页面" name="microPage"></el-tab-pane>
        <el-tab-pane label="微页面分类" name="microPageClassify"></el-tab-pane>
        <el-tab-pane label="商品分组" name="goodsGroup"></el-tab-pane>
        <el-tab-pane label="商品详情" name="goodsDetail"></el-tab-pane>
        <el-tab-pane label="营销活动" name="marketCampaign"></el-tab-pane>
        <el-tab-pane label="系统页面" name="systemPage"></el-tab-pane>
      </el-tabs>
      <component :is="currentTab" @seletedRow="rowSeleted"></component>
    </div>
  </DialogBase>
</template>

<script>
import DialogBase from "@/components/DialogBase";
import microPage from "./jumpLists/microPage";
import microPageClassify from "./jumpLists/microPageClassify";
import goodsDetail from "./jumpLists/goodsDetail";
import goodsGroup from "./jumpLists/goodsGroup";
import marketCampaign from "./jumpLists/marketCampaign";
import systemPage from "./jumpLists/systemPage";
export default {
  name: "dialogSelectJumpPage",
  components: {DialogBase, microPage, microPageClassify, goodsDetail, goodsGroup, marketCampaign, systemPage},
  props: {
      dialogVisible: {
          type: Boolean,
          required: true
      },
  },
  data() {
    return {
      currentTab: 'microPage',
      seletedRow: null
    };
  },
  computed: {
    visible: {
      get() {
          return this.dialogVisible
      },
      set(val) {
          this.$emit('update:dialogVisible', val)
      }
    }
  },
  created() {
  },
  methods: {

    rowSeleted(row) {
      this.seletedData = row;
    },

    /* 向父组件提交选中的数据 */
    submit() {
      if(this.seletedData) {
        this.$emit('seletedPage',  this.seletedData);
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.jump_wrapper{
  padding:0 20px;
}
.name_wrapper{
    display: flex;
    flex-direction: row;
    align-items: center;
    img{
      width:50px;
      height:30px;
      margin-right:10px;
    }
}
</style>