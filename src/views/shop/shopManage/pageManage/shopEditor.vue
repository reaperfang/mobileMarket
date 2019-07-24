<template>
  <div class="editor-wrapper">
    <widgetView></widgetView>
    <editView></editView>
    <propView></propView>
    <div style="width:500px;">
      页面基础数据：
      <el-tag type="primary">{{baseInfo}}</el-tag>
      <hr>
      组件数据映射：
      <ul>
        <li v-for="(item,key) of componentDataIds" :key="key">
          <el-tag type="success">{{componentDataMap[item].title}}</el-tag>
          <el-tag type="success">{{item}}</el-tag>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import widgetView from '../../decorate/widgetView';
import editView from '../../decorate/editView';
import propView from '../../decorate/propView';
export default {
  name: "shopEditor",
  components: {widgetView, editView, propView},
  data() {
    return {
    };
  },
  mounted() {
  },
  computed: {
    baseInfo() {
      return this.$store.getters.baseInfo;
    },
    componentDataIds() {
      return this.$store.getters.componentDataIds;
    },
    componentDataMap() {
      return this.$store.getters.componentDataMap;
    },
  },
  watch:{

  }
};
</script>

<style lang="scss" scoped>
.editor-wrapper{
  display:flex;
  flex-direction: row;
}
</style>
