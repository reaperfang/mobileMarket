<template>
  <div class="editor-wrapper" v-loading="loading">
    <widgetView></widgetView>
    <editView></editView>
    <propView></propView>
    <div style="width:500px;">
      页面基础数据：
      <el-tag type="primary">{{baseInfo}}</el-tag>
      <hr />组件数据映射：
      <ul style="height:770px;overflow-y:auto;">
        <li v-for="(item,key) of componentDataIds" :key="key">
          <el-tag type="success">{{componentDataMap[item].title}}</el-tag>
          <el-tag type="success">{{componentDataMap[item].data}}</el-tag>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import widgetView from "@/views/shop/decorate/widgetView";
import editView from "@/views/shop/decorate/editView";
import propView from "@/views/shop/decorate/propView";
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
      this._apis.shop.getPageInfo({id: currentPageId}).then((response)=>{
         this.loading = false;
         this.convertDecorateData(response);
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      });
    },

    /* 转换装修数据 */
    convertDecorateData(data) {
      let componentDataIds = [];
      let componentDataMap = {};
      let pageData = JSON.parse(data.pageData);
      if(!Array.isArray(pageData)) {
        return;
      }
      for (let item of pageData) {
        componentDataIds.push(item.id);
        componentDataMap[item.id] = item;
      }
      this.$store.commit("setBaseInfo", {
        name: data.name,
        title: data.title,
        explain: data.explain,
        pageCategoryInfoId: data.pageCategoryInfoId,
        colorStyle: data.colorStyle,
        pageKey: data.pageKey
      });
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
