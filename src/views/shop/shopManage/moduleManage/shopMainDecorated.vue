<template>
  <div class="preview_wrapper">
    <div class="module view" :style="{backgroundColor: baseInfo&&baseInfo.pageBackground}">
      <div class="phone-head">
        <img :src="require('@/assets/images/shop/editor/phone_head.png')" alt />
        <span>{{baseInfo.pageTitle || '页面标题'}}</span>
      </div>
      <div class="phone-body">
        <div class="component_wrapper" v-for="(item, key) of componentDataIds" :key="key">
          <component
            v-if="allTemplateLoaded"
            :is="templateList[getComponentData(item).type]"
            :key="key"
            :data="getComponentData(item)"
          ></component>
          {{getComponentData(item).title}}
        </div>
      </div>
    </div>
    <div class="shop_info">
      <div class="shop_code">
        <h3>店铺手机预览</h3>
        <h4>使用微信扫描二维码，预览店铺效果</h4>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564648928&di=dca17a8e2becd36980fd621ef6965f60&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F20%2F20180120123551_mE8UG.thumb.700_0.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import utils from "@/utils";
import widget from "@/system/constant/widget";
export default {
  name: "shopMainDecorated",
  data() {
    return {
      utils,
      allTemplateLoaded: false,
      templateList: {} //模板对象列表
    };
  },
  computed: {
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
      for (let item of widgetList) {
        import(`@/views/shop/decorate/comps/component${this.utils.titleCase(item)}.vue`)
          .then(loadedComponent => {
            this.templateList[item] = loadedComponent.default;
            loadedLength++;
            if (loadedLength >= widgetList.length) {
              this.allTemplateLoaded = true;
            }
          })
          .catch(e => {
            console.log(e);
            loadedLength++;
            if (loadedLength >= widgetList.length) {
              this.allTemplateLoaded = true;
            }
          });
      }
    }
  }
};
</script>

<style lang="scss">
  .preview_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-top:20px;
    .module {
      &.view {
        width: 374px;
        .phone-body {
          height: 592px;
          .component_wrapper{
            cursor:text;
          }
        }
      }
    }
    .shop_info{
      width:336px;
      margin-left:40px;
      .shop_logo{
        height:100px;
        width:100%;
      }
      .shop_name{
        margin-top:18px;
        font-size:18px;
        text-align:center;
      }
      .shop_code{
        padding:30px;
        box-sizing: border-box;
        text-align:center;
        border:1px solid rgba(211,211,211,1);
        background:rgba(248,248,248,1);
        h3{
          font-size:18px;
        }
        h4{
           font-size:16px;
           margin-top:30px;
        }
        img{
          width:100%;
          margin-top:40px;
        }
      }
    }
  }
// }
</style>