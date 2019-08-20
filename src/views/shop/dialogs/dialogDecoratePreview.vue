/* 预览装修弹框 */
<template>
  <DialogBase :visible.sync="visible" width="816px" :title="(baseInfo.name || '页面名称') + '预览'">
    <div class="preview_wrapper">
      <editView :dragable="false"></editView>
      <div class="shop_info">
        <img class="shop_logo" :src="shopInfo.logo" alt />
        <div class="shop_name">{{shopInfo.name || '店铺名称'}}</div>
        <div class="shop_code">
          <h3>手机扫码访问</h3>
          <h4>微信扫一扫分享至朋友圈</h4>
          <img :src="qrCode" alt="">
        </div>
      </div>
    </div>
  </DialogBase>
</template>

<script>
import DialogBase from "@/components/DialogBase";
import editView from "@/components/Decorate/editView";
import utils from "@/utils";
export default {
  name: "dialogDecoratePreview",
  components: {DialogBase, editView},
  props: {
      data: {},
      dialogVisible: {
          type: Boolean,
          required: true
      },
      homePageData: {
        type: Object
      }
  },
  data() {
    return {
      utils,
      shopInfo: {
        logo: 'http://attachments.chyangwa.net/portal/201907/24/100734twkfbss2zsiqkki2.jpg',
        name: '源源的店铺'
      },
      qrCode: ''
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
    baseInfo() {
      return this.$store.getters.baseInfo;
    }
  },
  created() {
    this.getQrcode();
  },
  methods: {

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
  }
};
</script>

<style lang="scss" scoped>
  .preview_wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top:20px;
    /deep/.module {
      &.view {
        width: 374px;
        .phone-body {
          height: 592px;
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