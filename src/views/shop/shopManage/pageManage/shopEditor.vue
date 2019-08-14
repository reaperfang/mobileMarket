<template>
  <div class="editor-wrapper" v-loading="loading">
    <widgetView></widgetView>
    <editView></editView>
    <propView panelName="页面编辑" editorType='propertyBase' :saveData="saveData" :saveAndApplyData="saveAndApplyData" :parentScope="this"></propView>
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
import editorMixin from './editorMixin';
export default {
  name: "shopEditor",
  mixins: [editorMixin],
  props: ["pageId"],
  data() {
    return {
      loading: false,
      id: this.pageId || this.$route.query.pageId,
      dataLoaded: false
    };
  },
  watch: {
    pageId(newValue) {
      if (newValue) {
        this.id = newValue;
      }
      this.init();
    }
  },
  methods: {
    /* 获取店铺装修数据 */
    fetch() {
      const _self = this;
      this.loading = true;
      this._apis.shop.getPageInfo({id: this.id}).then((response)=>{
         this.loading = false;
         this.dataLoaded = true;
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

