<template>
  <div class="editor-wrapper">
    <widgetView></widgetView>
    <editView></editView>
    <propView :panelName="panelName" :saveData="saveData" :saveAndApplyData="saveAndApplyData" :parentScope="this" :homePageData="homePageData"></propView>
    <!-- <div style="width:500px;">
      页面基础数据：
      <el-tag type="primary">{{baseInfo}}</el-tag>
      <hr />组件数据映射：
      <ul style="height:770px;overflow-y:auto;">
        <li v-for="(item,key) of componentDataIds" :key="key">
          <el-tag type="success">{{componentDataMap[item].title}}</el-tag>
          <el-tag type="success">{{componentDataMap[item].data}}</el-tag>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import widgetView from "./widgetView";
import editView from "./editView";
import propView from "./propView";
import utils from "@/utils";
export default {
  name: "decorate",
  components: { widgetView, editView, propView },
  props: ["componentConfig", "panelName", "saveData", "saveAndApplyData", "homePageData"],
  data() {
    return {
    };
  },
  created() {
    this.$store.commit('addComponent', this.componentConfig);
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

    baseProperty() {
      return this.$store.getters.baseProperty;
    },
  },
  methods: {

  },

};
</script>
<style lang="scss" scoped>
.editor-wrapper {
  display: flex;
  flex-direction: row;
}
</style>

