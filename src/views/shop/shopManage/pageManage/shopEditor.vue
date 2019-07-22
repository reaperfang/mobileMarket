<template>
  <div class="editor-wrapper">
    <widgetView></widgetView>
    <editView></editView>
    <propView></propView>
    <div style="width:500px;">
      数据映射
      <ul>
        <li v-for="(item,key) of componentDataIds" :key="key">
          <el-tag type="success">{{componentDataMap[item].title}}</el-tag>
          <el-tag type="success">{{componentDataMap[item].data}}</el-tag>
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
