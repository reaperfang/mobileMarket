<template>
  <div class="editor-wrapper" v-loading="loading">
    <widgetView></widgetView>
    <editView></editView>
    <propView panelName="分类编辑" editorType="propertyClassify" :saveData="saveData" :saveAndApplyData="saveAndApplyData" :parentScope="this"></propView>
    <div style="width:500px;">
      分类基础数据：
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
import editorMixin from '../pageManage/editorMixin';
import utils from "@/utils";
export default {
  name: "personCenter",
  mixins: [editorMixin],
  data() {
    return {
      loading: false,
      id: this.$route.query.classifyId
    };
  },
  methods: {
    /* 获取分类装修数据 */
    fetch() {
      const _self = this;
      this.loading = true;
      this._apis.shop.getClassifyInfo({id: this.id}).then((response)=>{
         this.loading = false;
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
        explain: utils.compileStr(data.explain),
        showType: data.showType,
        pageIdList: data.pageIdList
      });
    },

    /* 保存数据 */
    saveData() {
      this.loading = true;
      const resultData = this.collectData();
      resultData['explain'] = utils.compileStr(JSON.stringify(resultData.explain));
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
    }

  }
};
</script>
