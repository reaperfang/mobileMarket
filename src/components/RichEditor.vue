<!-- 富文本编辑器组件 -->

<template>
  <div>
    <vue-ueditor-wrap v-if="config" ref="editor" v-model="richValue" :config="config" @ready="ready" :init="init"></vue-ueditor-wrap>
  </div>
</template>
<script>
import Vue from 'vue'
import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
Vue.component('vue-ueditor-wrap', VueUeditorWrap)
import utils from '@/utils';
export default {
  name: 'RichEditor',
  props: ['richValue', 'myConfig'],
  data() {
    return {
      editor:null,//编辑器实例,
      defaultConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: '100%',
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: 'http://35.201.165.105:8000/controller.php',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: process.env.NODE_ENV === 'testing' ? '/bp/static/UEditor/' : '/static/UEditor/'
      },
      config: null
    }
  },
  created() {
    this.config = Object.assign(this.defaultConfig, this.myConfig);
  },
  mounted() {
  },

  watch: {
    richValue(newValue, oldValue) {
      const target = 'http://statics.xiumi.us/stc/';
      const convertData = newValue.replace(new RegExp(target,'g'),"https://statics.xiumi.us/stc/");
      this.$emit('editorValueUpdate', convertData);
    },

  },

  methods: {

    init() {
      const _self = this;
      //注册秀米编辑器按钮和弹窗
      UE.registerUI('dialog', function (editor, uiName) {
        var btn = new UE.ui.Button({
          name   : 'xiumi-connect',
          title  : '秀米',
          cssRules : "background-image: url('" + _self.config.UEDITOR_HOME_URL + "themes/default/images/xiumi_logo.png') !important;background-size: cover;",
          onclick: function () {
              var dialog = new UE.ui.Dialog({
                  iframeUrl: _self.config.UEDITOR_HOME_URL + 'dialogs/xiumi/xiumi-ue-dialog-v5.html',
                  editor   : editor,
                  name     : 'xiumi-connect',
                  title    : "秀米图文消息助手",
                  cssRules : "width: " + (window.innerWidth - 60) + "px;" + "height: " + (window.innerHeight - 60) + "px;",
              });
              dialog.render();
              dialog.open();
          }
      });

      return btn;
      });
    },

     ready (editorInstance) {
      this.$emit('ready');
      this.editor = editorInstance;
      const iframe = editorInstance.iframe;
      const document = iframe.contentDocument;

      utils.asyncLoadCss(document, this.myConfig.UEDITOR_HOME_URL + 'dialogs/xiumi/xiumi-ue-v5.css').then(()=>{
        console.log('秀米编辑器样式加载成功！')
      }).catch(()=>{
        console.log('秀米编辑器样式加载失败！')
      });
    }
  }
}
</script>
<style lang="scss">
#editor{
  text-align:left;
}
iframe{
  width:99%;
}
</style>
