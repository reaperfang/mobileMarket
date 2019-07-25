<template>
  <div class="editor-wrapper" v-loading="loading">
    <widgetView></widgetView>
    <editView></editView>
    <propView></propView>
    <div style="width:500px;">
      页面基础数据：
      <el-tag type="primary">{{baseInfo}}</el-tag>
      <hr />组件数据映射：
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
import widgetView from "../../decorate/widgetView";
import editView from "../../decorate/editView";
import propView from "../../decorate/propView";
import decorateDemo from "@/assets/json/decorateDemo.json";
export default {
  name: "shopEditor",
  props: ["pageId"],
  components: { widgetView, editView, propView },
  data() {
    return {
      loading: false,
      currentPageId: this.pageId || this.$route.query.pageId
    };
  },
  created() {
    if (this.currentPageId) {
      this.getDecorateInfo();
    } else {
      this.$store.commit("clearAllData");
    }
  },
  mounted() {},
  computed: {
    baseInfo() {
      return this.$store.getters.baseInfo;
    },
    componentDataIds() {
      return this.$store.getters.componentDataIds;
    },
    componentDataMap() {
      return this.$store.getters.componentDataMap;
    }
  },
  watch: {
    pageId(newValue) {
      if (newValue) {
        this.currentPageId = newValue;
        this.getDecorateInfo();
      } else {
        this.$store.commit("clearAllData");
      }
    }
  },
  methods: {
    /* 获取店铺装修数据 */
    getDecorateInfo() {
      const _self = this;
      const currentPageId = this.currentPageId;
      this.loading = true;
      setTimeout(() => {
        _self.loading = false;
        if (decorateDemo[currentPageId]) {
          _self.convertDecorateData(decorateDemo[currentPageId]);
        }
      }, 200);
    },

    /* 转换装修数据 */
    convertDecorateData(data) {
      let baseInfo = data.pageInfo;
      let componentDataIds = [];
      let componentDataMap = {};
      for (let item of data.components) {
        componentDataIds.push(item.id);
        componentDataMap[item.id] = item;
      }
      this.$store.commit("setBaseInfo", baseInfo);
      this.$store.commit("setComponentDataIds", componentDataIds);
      this.$store.commit("setComponentDataMap", componentDataMap);
    }
  }
};
</script>

<style lang="scss" scoped>
.editor-wrapper {
  display: flex;
  flex-direction: row;
}
</style>
