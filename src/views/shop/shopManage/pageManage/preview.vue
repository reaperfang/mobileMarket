<template>
  <div class="module view" :style="{backgroundColor: baseInfo&&baseInfo.pageBackground}">
    <div class="phone-head">
      <img :src="require('@/assets/images/shop/editor/phone_head.png')" alt="">
      <span>{{baseInfo.pageTitle || '页面编辑'}}</span>
    </div>
    <div class="phone-body">
      <div class="component_wrapper" v-for="(item, key) of componentDataIds">
            <component v-if="allTemplateLoaded" :is='templateList[getComponentData(item).type]' :key="key" :data="getComponentData(item)"></component>
            {{getComponentData(item).title}}
          </div>
    </div>
  </div>
</template>

<script>
import utils from '@/utils';
import widget from '@/system/constant/widget';
export default {
  name: 'preview',
  components: {},
  data () {
    return {
      utils,
      allTemplateLoaded: false,
      templateList: {}  //模板对象列表
    }
  },
  computed:{
    currentComponentId() {
      return this.$store.getters.currentComponentId;
    },
    componentDataIds() {
      return this.$store.getters.componentDataIds;
    },
    componentDataMap() {
      return this.$store.getters.componentDataMap;
    },
    baseInfo() {
      return this.$store.getters.baseInfo;
    }
  },
  created() {
    this.loadTemplateLists();
  },
  methods: {

    /* 获取组件数据 */
    getComponentData(id) {
      return this.componentDataMap[id];
    },

    //加载模板列表
    loadTemplateLists() {
      let loadedLength = 0;
      const widgetList = widget.getWidgetList();
      for(let item of widgetList) {
        import(`../../decorate/comps/component${this.utils.titleCase(item)}.vue`).then(loadedComponent => {
          this.templateList[item] = loadedComponent.default;
          loadedLength ++;
          if(loadedLength >= widgetList.length) {
            this.allTemplateLoaded = true;
          }
        }).catch(e => {
          console.log(e);
          loadedLength ++;
          if(loadedLength >= widgetList.length) {
            this.allTemplateLoaded = true;
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 .module{
    margin-right:20px;
 }
 .view {
    width: 374px;
    border: 1px solid #e2e1e1;
    .phone-head {
      width: 100%;
      height: 64px;
      text-align: center;
      line-height: 64px;
      background: #fff;
      position:relative;
      img{
        width:100%;
      }
      span{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-40%);
        font-size:18px;
      }
    }
    .phone-body {
      .component_wrapper{
        background:#fff;
        min-height:50px;
        line-height:50px;
        border:1px solid #d6d6d6;
        text-align:center;
        position:relative;
      }
    }
  }
</style>
