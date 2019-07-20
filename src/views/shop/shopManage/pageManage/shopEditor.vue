<template>
  <div class="editor-wrapper">
    <widgetView></widgetView>
    <editView></editView>
    <propView></propView>
    <div style="width:500px;">
      数据映射
      <ul>
        <li v-for="(item,key) of dataList" :key="key">
          <el-tag type="success">{{item.type}}</el-tag> <el-tag>{{item}}</el-tag>
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
    dataList() {
      return this.$store.getters.dataList;
    }
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
