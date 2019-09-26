<template>
  <div>
    <div v-if="pageList.length" v-loading="loading">
      <el-tabs v-model="pageId" @tab-click="tabClick">
        <el-tab-pane v-for="(item, key) of pageList" :key="key" :label="item.name || '页面'" :name="item.id" ></el-tab-pane>
      </el-tabs>
      <Decorate panelName="页面编辑" :componentConfig="componentConfig" :saveData="saveData" :homePageData="homePageData"></Decorate>
    </div>
    <div v-else v-loading="loading" style="padding:50px;">
      暂无可用页面
    </div>
  </div>
</template>

<script>
import Decorate from '@/components/Decorate';
import decorateMixin from '@/components/Decorate/mixins/decorateMixin';
import utils from "@/utils";
export default {
  name: "templateEdit",
  mixins: [decorateMixin],
  components: { Decorate },
  data() {
    return {
      loading: true,
      id: this.$route.query.id || '',
      pageId: '',
      dataLoaded: false,
      homePageData: null,
      componentConfig: {
        type: 'pageInfo',
        isBase: true,
        hidden: true,
        title: '页面信息'
      },
      pageList: [],  //页面列表
      pageMaps: {},  //页面数据集合
      cacheData: null   //页签切换前缓存的上一个页面数据
    };
  },
  created() {
    this.getPageList();
  },
  watch: {
    pageId(newValue) {

      //异步延迟可以解决一些选中组件的问题
      this.$nextTick(() => {
        this.$nextTick(() => {
          this.cacheData = {...{
            baseInfo: this.baseInfo,
            id: this.id,
            componentDataIds: this.componentDataIds,
            componentDataMap: this.componentDataMap
          }};
          this.fetch(newValue);
        })
      })
    }
  },
  methods: {

    fetch(newValue) {
      if(newValue) {
        this.$store.commit("clearAllData");
        this.homePageData = this.pageMaps[newValue];
        this.convertDecorateData(this.pageMaps[newValue]);
      }
    },

     /* 拼装基础数据 */
    setBaseInfo(data) {
       //还原页面基础信息
      this.$store.commit('updateComponent', {
        id: this.basePropertyId,
        data: {
          name: data.name,
          title: data.title,
          explain: data.explain,
          pageCategoryInfoId: data.pageCategoryInfoId,
          colorStyle: data.colorStyle,
          pageKey: data.pageKey
        }
      });
    },

    getPageList() {
      this.loading = true;
      this._apis.shop.getPagesByTemplateId({pageTemplateId: this.id}).then((response)=>{
        this.pageList = response;
        this.loading = false;
        if(!response || !response.length) {
          return;
        }
        for(let item of response) {
          this.pageMaps[item.id] = item;
        }
        this.pageId = response[0].id;
        this.fetch(response[0].id);
      }).catch((error)=>{
        // this.$notify.error({
        //   title: '错误',
        //   message: error
        // });
        console.error(error);
        this.loading = false;
      });
    },

     /* 保存数据 */
    saveData(triggerType) {
      let resultData = this.collectData(triggerType);
      if(resultData && resultData.name) {
        resultData['status'] = '1';
        this.submit(resultData);
      }
    },

    submit(resultData) {
      if(!resultData.name || !resultData.title || !resultData.explain) {
         this.$alert('请填写基础信息后重试，点击确认返回编辑页面信息!', '警告', {
          confirmButtonText: '确定',
          callback: action => {
            //打开基础信息面板
            this.$store.commit('setCurrentComponentId', this.basePropertyId);
            this._globalEvent.$emit('decorateSaveLoading', false, this.id);
          }
        });
        return;
      }
      this.loading = true;
      this._apis.shop.createPage(resultData).then((response)=>{
        this.$notify({
          title: '成功',
          message: '创建成功！',
          type: 'success'
        });
        this._globalEvent.$emit('decorateSaveLoading', true, this.id);
        // this._routeTo('pageManageIndex');
        this.loading = false;
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
        this._globalEvent.$emit('decorateSaveLoading', false, this.id);
        this.loading = false;
      });
    },

    tabClick() {
      this.$confirm(`当前编辑内容尚未保存，切换其他页面将会清除本页面编辑数据！是否需要保存？（点击保存后，本页编辑内容将会另存为至微页面）`, '提示', {
        confirmButtonText: '保存',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.saveData('tabChange');
      }).catch(() => {
        
      })
    },

     /* 保存前收集装修数据 */
    collectData(triggerType) {
      let result = triggerType === 'tabChange' ? this.cacheData.baseInfo : this.baseInfo;
      let pageData = [];
      for(let item of triggerType === 'tabChange' ? this.cacheData.componentDataIds: this.componentDataIds) {
        const componentData = triggerType === 'tabChange' ? this.cacheData.componentDataMap[item] : this.componentDataMap[item];
        if(componentData.type === 'goods') {
          if(componentData.data.ids && !componentData.data.ids.length) {
            this.$alert('请在右侧选择真实商品后重试', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                //打开基础信息面板
                this.$store.commit('setCurrentComponentId', componentData.id);
                this._globalEvent.$emit('decorateSaveLoading', false);
              }
            });
            return;
          }
        }
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

<style lang="scss" scoped>
</style>
