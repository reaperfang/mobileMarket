<template>
  <DialogBase :visible.sync="visible" width="816px" :title="(baseInfo.pageName || '页面名称') + '预览'">
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
        <img
          class="shop_logo"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564055788117&di=a4408d2b8d4ceadc964a30088db9f8fc&imgtype=0&src=http%3A%2F%2Fpic35.nipic.com%2F20131122%2F3347542_102208318000_2.jpg"
          alt
        />
        <div class="shop_name">{{baseInfo.shopName || '店铺名称'}}</div>
        <div class="shop_code">
          <h3>手机扫码访问</h3>
          <h4>微信扫一扫分享至朋友圈</h4>
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564648928&di=dca17a8e2becd36980fd621ef6965f60&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201801%2F20%2F20180120123551_mE8UG.thumb.700_0.png" alt="">
        </div>
      </div>
    </div>
  </DialogBase>
</template>

<script>
import DialogBase from "@/components/DialogBase";
import utils from "@/utils";
import widget from "@/system/constant/widget";
export default {
  name: "dialogDecoratePreview",
  components: {DialogBase},
  props: {
      data: {},
      dialogVisible: {
          type: Boolean,
          required: true
      },
  },
  data() {
    return {
      utils,
      allTemplateLoaded: false,
      templateList: {} //模板对象列表
    };
  },
  computed: {
    visible: {
      get() {
          return this.dialogVisible
      },
      set(val) {
          this.$emit('update:dialogVisible', val)
      }
    },
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
        import(`../decorate/comps/component${this.utils.titleCase(item)}.vue`)
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

// .preview_dialog .el-dialog__header{
//   background:rgb(241,240,255);
// }
// .preview_dialog .el-dialog__body {
//   padding: 0 !important;
//   height:717px;
  .preview_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top:20px;
    .module {
      margin-right: 20px;
      &.view {
        width: 374px;
        border: 1px solid #e2e1e1;
        .phone-head {
          width: 100%;
          height: 64px;
          text-align: center;
          line-height: 64px;
          background: #fff;
          position: relative;
          img {
            width: 100%;
          }
          span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -40%);
            font-size: 18px;
          }
        }
        .phone-body {
          height: 592px;
          overflow-y: auto;
          .component_wrapper {
            background: #fff;
            min-height: 50px;
            line-height: 50px;
            border: 1px solid #d6d6d6;
            text-align: center;
            position: relative;
          }
        }
      }
    }
    .shop_info{
      width:336px;
      margin-left:64px;
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
        margin-top:70px;
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