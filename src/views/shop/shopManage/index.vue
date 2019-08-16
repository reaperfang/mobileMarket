<template>
  <div style="background:rgb(242,242,249);" v-loading="loading">
    <el-tabs v-model="currentTab" @tab-click="handleClick">
      <el-tab-pane label="店铺主页" :name="shopMain"></el-tab-pane>
      <el-tab-pane label="个人中心" name="personCenter"></el-tab-pane>
      <el-tab-pane label="商品分组" name="goodsGroup"></el-tab-pane>
    </el-tabs>
    <component :is="currentTab"></component>
  </div>
</template>

<script>
import shopMainDefault from './moduleManage/shopMainDefault';
import shopMainDecorated from './moduleManage/shopMainDecorated';
import personCenter from './moduleManage/personCenter';
import goodsGroup from './moduleManage/goodsGroup';
import utils from "@/utils";
export default {
  name: 'index',
  components: {shopMainDefault, shopMainDecorated, personCenter, goodsGroup},
  data () {
    return {
      currentTab: 'shopMainDefault',
      shopMain: 'shopMainDefault',
      loading: true,
      hasHomePage: false,
      homePageDecorateData: null
    }
  },
  created() {
    this.getHomePage();
  },

  methods: {
    handleClick(comp) {
      this.currentTab = comp.name;
    },

    /* 获取首页数据 */
    getHomePage() {
      this.loading = true;
      this._apis.shop.getHomePage({}).then((response)=>{

        //没有装修首页
        if(!response) {
          this.hasHomePage = false;
          this.shopMain = 'shopMainDefault';
          this.currentTab = 'shopMainDefault';
        }else{  //装修了首页
          this.hasHomePage = true;
          this.shopMain = 'shopMainDecorated';
          this.currentTab = 'shopMainDecorated';
          this.convertDecorateData(response);
        }
        this.loading = false;
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
        this.loading = false;
      });
    },

     /* 转换接口获取的装修数据 */
    convertDecorateData(data) {
      this.setBaseInfo(data);
      
      //打开基础信息面板
      this.$store.commit('showBaseProperty');
      
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

     /* 拼装基础数据 */
    setBaseInfo(data) {
       //还原页面基础信息
      this.$store.commit("setBaseInfo", {
        name: data.name,
        title: data.title,
        explain: data.explain,
        pageCategoryInfoId: data.pageCategoryInfoId,
        colorStyle: data.colorStyle,
        pageKey: data.pageKey
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.el-tabs{
  // background:#fff;
  padding:20px;
  padding-bottom: 0;
}
</style>
