<template>
  <div>
    <el-tabs v-model="currentTab" @tab-click="handleClick">
      <el-tab-pane label="自定义页面1" name="custom1"></el-tab-pane>
      <el-tab-pane label="自定义页面2" name="custom2"></el-tab-pane>
      <el-tab-pane label="自定义页面3" name="custom3"></el-tab-pane>
    </el-tabs>
    <component :is="'shopEditor'" :pageId="currentTab"></component>
  </div>
</template>

<script>
import shopEditor from "../pageManage/shopEditor";
export default {
  name: "templateEdit",
  components: { shopEditor },
  data() {
    return {
      currentTab: "custom1"
    };
  },
  created() {},
  methods: {
    handleClick(tab) {
      this.$store.commit("clearAllData");
      this.currentTab = tab.name;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
