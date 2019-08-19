<template>
  <Decorate :componentConfig="componentConfig" :saveData="saveData" :saveAndApplyData="saveAndApplyData" :homePageData="homePageData"></Decorate>
</template>

<script>
import Decorate from '@/components/Decorate';
import decorateMixin from '@/components/Decorate/decorateMixin';
export default {
  name: "shopEditor",
  props: ["pageId"],
  mixins: [decorateMixin],
  components: {Decorate},
  data() {
    return {
      loading: false,
      id: this.pageId || this.$route.query.pageId,
      dataLoaded: false,
      homePageData: null,
      componentConfig: {
        type: 'pageInfo',
        isBase: true,
        hidden: true,
        title: '页面信息'
      }
    };
  },
  watch: {
    pageId(newValue) {
      if (newValue) {
        this.id = newValue;
      }
      this.$store.commit("clearAllData");
      this.fetch();
    }
  },
  methods: {

    /* 获取店铺装修数据 */
    fetch() {
      if(!this.id) {
        return;
      }
      this.loading = true;
      this._apis.shop.getPageInfo({id: this.id}).then((response)=>{
         this.loading = false;
         this.dataLoaded = true;
         this.homePageData = response;
         this.convertDecorateData(response);
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
        this.loading = false;
      });
    },

    /* 检查数据可用性 */
    checkData(data) {
      const string = utils.uncompileStr(data.pageData);
      if(string.indexOf('id') < 0) {
        return;
      }
      let pageData = JSON.parse(string);
      if(!Array.isArray(pageData)) {
        return;
      }
      return pageData;
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

    /* 保存数据 */
    saveData() {
      let resultData = this.collectData();
      resultData['status'] = '1';
      this.submit(resultData);
    },

    /* 保存并生效数据 */
    saveAndApplyData() {
      let resultData = this.collectData();
      resultData['status'] = '0';
      this.submit(resultData);
    },

    submit(resultData) {
      if(!resultData.name) {
         this.$alert('请填写基础信息后重试，点击确认开始编辑页面信息!', '警告', {
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
        this._apis.shop.editPageInfo(resultData).then((response)=>{
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
        this._apis.shop.createPage(resultData).then((response)=>{
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
    }

  },

};
</script>

