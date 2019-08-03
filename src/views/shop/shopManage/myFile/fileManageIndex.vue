<template>
  <div>
     <el-tabs v-model="currentTab" @tab-click="handleClick">
      <el-tab-pane label="编辑普通图文" name="generalArticle"></el-tab-pane>
      <el-tab-pane label="编辑微信图文" name="wechatArticle"></el-tab-pane>
    </el-tabs>
    <component :is="currentTab"></component>
  </div>
</template>

<script>
import generalArticle from './generalArticle';
import wechatArticle from './wechatArticle';
export default {
  name: 'fileManageIndex',
  components: {generalArticle, wechatArticle},
  data () {
    return {
      currentTab: 'generalArticle'
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
