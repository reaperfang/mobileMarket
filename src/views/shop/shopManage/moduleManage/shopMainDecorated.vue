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
        </div>
      </div>
    </div>
    <div class="shop_info">
      <div class="shop_code">
        <h3>店铺手机预览</h3>
        <h4>使用微信扫描二维码，预览店铺效果</h4>
        <div class="qrcode_wrapper">
          <img :src="qrCode" alt="">
        </div>
      </div>
      <div class="tools">
        <h3>店铺工具</h3>
        <ul class="tile-list n3">
          <li>
            <el-button type="primary" plain @click="_routeTo('ADManageIndex')">首页广告</el-button>
            <!-- <p>{{toolsData.status1 === '1' ? '已开启' : '已关闭'}}</p> -->
          </li>
          <li>
            <el-button type="primary" plain @click="_routeTo('shopNav')">店铺导航</el-button>
            <!-- <p>{{toolsData.status2 === '1' ? '已开启' : '已关闭'}}</p> -->
          </li>
          <li>
            <el-button type="primary" plain @click="_routeTo('shopStyle')">店铺风格</el-button>
            <div class="color_wrapper">
              <div class="style_block" v-for="(item, key) of color.colors" :key="key" :style="{'backgroundColor': item}"></div>
            </div>
          </li>
          <li>
            <el-button type="primary" plain @click="_routeTo('shopEditor', {pageId: homePageId})">首页装修</el-button>
          </li>
          <li>
            <el-button type="primary" plain  @click="_routeTo('templateManageIndex')">店铺模板</el-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "@/utils";
import widget from "@/system/constant/widget";
export default {
  name: "shopMainDecorated",
  props: ['homePageData'],
  data() {
    return {
      utils,
      allTemplateLoaded: false,  //所有模板是否加载结束
      templateList: {}, //模板对象列表
      color: {
        type: 1,
        mainColor:'',
        colors: ['rgba(251,68,67,1)', 'rgba(253,135,84,1)', 'rgba(255,255,255,1)'],
      },
      shopInfo: {  //店铺信息
        logo: 'http://attachments.chyangwa.net/portal/201907/24/100734twkfbss2zsiqkki2.jpg',
        name: '源源的店铺'
      },
      qrCode: '',
      toolsData: null  //工具数据
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
    this.getQrcode();
    this.getTools();
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
    },

      /* 获取二维码 */
    getQrcode(codeType, callback) {
      this._apis.shop.getQrcode({
        url: this.homePageData.shareUrl,
        width: '250',
        height: '250',
        logoUrl: this.shopInfo.logo
      }).then((response)=>{
        this.qrCode = `data:image/png;base64,${response}`;
        callback && callback(response);
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      });
    },

      /* 获取工具状态 */
    getTools() {
      //  this._apis.shop.getTools({}).then((response)=>{
      //   this.toolsData = response;
      //   this.loading = false;
      // }).catch((error)=>{
      //   this.$notify.error({
      //     title: '错误',
      //     message: error
      //   });
      //   this.loading = false;
      // });
    },

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
        .qrcode_wrapper{
          padding:5px;
          img{
            width: 250px;
            height: 250px;
            display: block;
            border: 1px solid #ddd;
            margin: 40px auto 0;
          }
        }
      }
      .tools{
        margin-top:20px;
        padding:30px;
        box-sizing: border-box;
        text-align:center;
        border:1px solid rgba(211,211,211,1);
        background:rgba(248,248,248,1);
        h3{
          text-align:center;
          font-size:18px;
          color:rgba(68,67,75,1);
        }
        ul{
          margin-top:30px;
          li{
            p{
              margin-top: 12px;
              color:rgba(211,211,211,1);
            }
            .color_wrapper{
              margin: 12px 0 0 10px;
              display:flex;
              flex-direction: row;
              justify-content: flex-start;
              cursor:pointer;
              border: 2px dashed transparent;
              .style_block{
                width:18px;
                height:18px;
              }
            }
          }
        }
      }
    }
  }
</style>