<script>
import utils from "@/utils";
export default {
  name: "decorateMixin",
  data() {
    return {};
  },
  created() {
    this.$store.commit("clearAllData");
    this.fetch();
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

    /* 转换接口获取的装修数据 */
    convertDecorateData(data) {
      this.setBaseInfo(data);
      
      //打开基础信息面板
      this.$store.commit('setCurrentComponentId', this.baseProperty.id);
      
      //还原组件列表
      let componentDataIds = [];
      let componentDataMap = {};
      const string = utils.uncompileStr(data.pageData);
      if(string.indexOf('id') < 0) {
        return;
      }
      let pageData = JSON.parse(string);
      if(!Array.isArray(pageData)) {
        return;
      }
      for (let item of pageData) {
        componentDataIds.push(item.id);
        componentDataMap[item.id] = item;
      }
      this.$store.commit("setComponentDataIds", componentDataIds);
      this.$store.commit("setComponentDataMap", componentDataMap);
    },

    /* 保存前收集装修数据 */
    collectData() {
      let result = this.baseInfo;
      result['id'] = this.id;
      let pageData = [];
      for(let item of this.componentDataIds) {
        const componentData = this.componentDataMap[item];
        if(componentData) {
          pageData.push(componentData);
        }
      }
      result['pageData'] = utils.compileStr(JSON.stringify(pageData));;
      return result;
    }
  }
};
</script>
