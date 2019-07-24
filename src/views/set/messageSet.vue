/*消息设置 */
<template>
    <div style="background:rgb(242,242,249);">
    <el-tabs v-model="currentTab" @tab-click="handleClick">
      <el-tab-pane label="买家通知" name="faceSheet"></el-tab-pane>
      <el-tab-pane label="商家通知" name="logisticsInquiry"></el-tab-pane>
    </el-tabs>
    <component :is="currentTab"></component>
  </div>   
</template>

<script>
export default {
  name: 'messageSet',
  data() {
    return {
      currentTab: 'faceSheet'
    }
  },
  components: {},
  watch: {
    
  },
  created() {

  },
  destroyed() {
    
  },
  methods: {
    handleClick(comp) {
      this.currentTab = comp.name;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>