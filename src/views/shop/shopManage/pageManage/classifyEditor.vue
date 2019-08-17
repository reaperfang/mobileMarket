<template>
  <Decorate panelName="分类编辑" :componentConfig="componentConfig" :saveData="saveData" :saveAndApplyData="saveAndApplyData" :homePageData="homePageData"></Decorate>
</template>

<script>
import utils from "@/utils";
import decorate from '@/components/Decorate';
export default {
  name: "classifyEditor",
  components: {decorate},
  data() {
    return {
      loading: false,
      id: this.$route.query.classifyId,
      homePageData: null,
      componentConfig: {
        type: 'classify',
        isBase: true,
        hidden: true,
        title: '微页面分类信息'
      }
    };
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

    init() {
      this.$store.commit("clearAllData");
      if (this.id) {
        this.fetch();
      }
    },

    /* 获取分类装修数据 */
    fetch() {
      const _self = this;
      this.loading = true;
      this._apis.shop.getClassifyInfo({id: this.id}).then((response)=>{
         this.loading = false;
         this.homePageData = response;
         this.convertDecorateData(response);
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      });
    },

     /* 拼装基础数据 */
    setBaseInfo(data) {
      this.$store.commit("setBaseInfo", {
        name: data.name,
        sortType: data.sortType,
        explain: utils.uncompileStr(data.explain),
        showType: data.showType,
        pageIdList: data.pageIdList
      });
    },

    /* 保存数据 */
    saveData() {
      const resultData = this.collectData();
      resultData['explain'] = utils.compileStr(JSON.stringify(resultData.explain || {}));
       if(!resultData.name) {
         this.$alert('请填写基础信息后重试，点击确认开始编辑分类信息!', '警告', {
          confirmButtonText: '确定',
          callback: action => {
            //打开基础信息面板
            this.$store.commit('setCurrentComponentId', this.baseProperty.id);
          }
        });
        return;
      }
      this.loading = true;
      if(this.id) {
        this._apis.shop.editClassifyInfo(resultData).then((response)=>{
          this.$notify({
            title: '成功',
            message: '编辑成功！',
            type: 'success'
          });
          this._routeTo('pageManageIndex');
          this.loading = false;
        }).catch((error)=>{
          this.$notify.error({
            title: '错误',
            message: error
          });
          this.loading = false;
        });
      }else{
        this._apis.shop.createClassify(resultData).then((response)=>{
          this.$notify({
            title: '成功',
            message: '创建成功！',
            type: 'success'
          });
          this._routeTo('pageManageIndex');
          this.loading = false;
        }).catch((error)=>{
          this.$notify.error({
            title: '错误',
            message: error
          });
          this.loading = false;
        });
      }
    },

    /* 保存并生效数据 */
    saveAndApplyData() {
      const resultData = this.collectData();
      console.log(JSON.stringify({...resultData}));
      this._routeTo('pageManageIndex');
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
