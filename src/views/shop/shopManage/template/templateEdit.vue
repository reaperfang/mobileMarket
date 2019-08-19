<template>
  <div>
    <div v-if="pageList.length" v-loading="loading">
      <el-tabs v-model="id">
        <el-tab-pane v-for="(item, key) of pageList" :key="key" :label="item.name || '页面'" :name="item.id"></el-tab-pane>
      </el-tabs>
      <Decorate panelName="页面编辑" :componentConfig="componentConfig" :saveData="saveData" :saveAndApplyData="saveAndApplyData" :homePageData="homePageData"></Decorate>
    </div>
    <div v-else v-loading="loading" style="padding:50px;">
      暂无可用页面
    </div>
  </div>
</template>

<script>
import Decorate from '@/components/Decorate';
import decorateMixin from '@/components/Decorate/decorateMixin';
export default {
  name: "templateEdit",
  mixins: [decorateMixin],
  components: { Decorate },
  data() {
    return {
      loading: true,
      id: '',
      dataLoaded: false,
      homePageData: null,
      componentConfig: {
        type: 'pageInfo',
        isBase: true,
        hidden: true,
        title: '页面信息'
      },
      pageList: []  //页面列表
    };
  },
  created() {
    this.getPageList();
  },
  watch: {
    id(newValue) {
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
         this.dataLoaded = true;
         this.homePageData = response;
         this.convertDecorateData(response);
         this.loading = false;
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
        this.loading = false;
      });
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

    getPageList() {
      this.loading = true;
      this._apis.shop.getPageList({
        status: '0',
        pageCategoryInfoId: '',
        name: '',
        pageSize: 50,
        startIndex: 1
      }).then((response)=>{
        this.id= response.list[0].id;
        this.pageList = response.list;
        // this.loading = false;
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
        // this.loading = false;
      });
    },

     /* 保存数据 */
    saveData() {
      // let resultData = this.collectData();
      // resultData['status'] = '1';
      // this.submit(resultData);
    },

    /* 保存并生效数据 */
    saveAndApplyData() {
      // let resultData = this.collectData();
      // resultData['status'] = '0';
      // this.submit(resultData);
    },

    submit(resultData) {
      // if(!resultData.name) {
      //    this.$alert('请填写基础信息后重试，点击确认开始编辑页面信息!', '警告', {
      //     confirmButtonText: '确定',
      //     callback: action => {
      //       //打开基础信息面板
      //       this.$store.commit('setCurrentComponentId', this.baseProperty.id);
      //     }
      //   });
      //   return;
      // }
      // this.loading = true;
      // if(this.id) {
      //   this._apis.shop.editPageInfo(resultData).then((response)=>{
      //     this.$notify({
      //       title: '成功',
      //       message: '编辑成功！',
      //       type: 'success'
      //     });
      //     this._routeTo('pageManageIndex');
      //     this.loading = false;
      //   }).catch((error)=>{
      //     this.$notify.error({
      //       title: '错误',
      //       message: error
      //     });
      //     this.loading = false;
      //   });
      // }else{
      //   this._apis.shop.createPage(resultData).then((response)=>{
      //     this.$notify({
      //       title: '成功',
      //       message: '创建成功！',
      //       type: 'success'
      //     });
      //     this._routeTo('pageManageIndex');
      //     this.loading = false;
      //   }).catch((error)=>{
      //     this.$notify.error({
      //       title: '错误',
      //       message: error
      //     });
      //     this.loading = false;
      //   });
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
