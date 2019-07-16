<template>
  <div style="background:rgb(242,242,249);">
    <el-tabs v-model="currentTab" @tab-click="handleClick">
      <el-tab-pane label="店铺主页" name="shopMain"></el-tab-pane>
      <el-tab-pane label="个人中心" name="personCenter"></el-tab-pane>
      <el-tab-pane label="商品分组" name="goodsGroup"></el-tab-pane>
    </el-tabs>
    <component :is="currentTab"></component>
  </div>
</template>

<script>
import shopMain from './moduleManage/shopMain';
import personCenter from './moduleManage/personCenter';
import goodsGroup from './moduleManage/goodsGroup';
export default {
  name: 'index',
  components: {shopMain, personCenter, goodsGroup},
  data () {
    return {
      currentTab: 'shopMain'
    }
  },
  created() {

  },
  methods: {
    handleClick(comp) {
      this.currentTab = comp.name;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
