<!-- 富文本编辑器组件 -->

<template>
  <!-- <div style="width:900px;margin:0 auto;"> -->
    <!-- 工具栏容器 -->
    <!-- <div id="toolbar-container_A"></div> -->
    <!-- 编辑器容器 -->
    <!-- <div id="editor" style="border: 1px solid #cccccc;height: 500px">
      <p></p>
    </div> -->
  <!-- </div> -->
  <vue-ueditor-wrap v-model="msg" :config="myConfig" @ready="ready" :destroy="true" @beforeInit="addCustomButtom"></vue-ueditor-wrap>
</template>
<script>
// import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import Vue from 'vue'
import VueUeditorWrap from 'vue-ueditor-wrap' // ES6 Module
Vue.component('vue-ueditor-wrap', VueUeditorWrap)
export default {
  name: 'EditorBase',
  // compoments: {VueUeditorWrap},
  data() {
    return {
      msg: '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue + UEditor + v-model双向绑定</h2>',
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 240,
        // 初始容器宽度
        initialFrameWidth: '100%',
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: 'http://35.201.165.105:8000/controller.php',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/static/UEditor/'
      },
      editor:null,//编辑器实例
    }
  },

  mounted() {
    // this.initCKEditor();
  },

  methods: {

    ready (editorInstance) {
      console.log(`编辑器实例${editorInstance.key}: `, editorInstance)
    },

    addCustomButtom (editorId) {
      window.UE.registerUI('test-button', function (editor, uiName) {
        // 注册按钮执行时的 command 命令，使用命令默认就会带有回退操作
        editor.registerCommand(uiName, {
          execCommand: function () {
            editor.execCommand('inserthtml', `<span>这是一段由自定义按钮添加的文字</span>`)
          }
        })

        // 创建一个 button
        var btn = new window.UE.ui.Button({
          // 按钮的名字
          name: uiName,
          // 提示
          title: '鼠标悬停时的提示文字',
          // 需要添加的额外样式，可指定 icon 图标，图标路径参考常见问题 2
          cssRules: "background-image: url('/test-button.png') !important;background-size: cover;",
          // 点击时执行的命令
          onclick: function () {
            // 这里可以不用执行命令，做你自己的操作也可
            editor.execCommand(uiName)
          }
        })

        // 当点到编辑内容上时，按钮要做的状态反射
        editor.addListener('selectionchange', function () {
          var state = editor.queryCommandState(uiName)
          if (state === -1) {
            btn.setDisabled(true)
            btn.setChecked(false)
          } else {
            btn.setDisabled(false)
            btn.setChecked(state)
          }
        })

        // 因为你是添加 button，所以需要返回这个 button
        return btn
      }, 0 /* 指定添加到工具栏上的哪个位置，默认时追加到最后 */, editorId /* 指定这个 UI 是哪个编辑器实例上的，默认是页面上所有的编辑器都会添加这个按钮 */)
    }
    // initCKEditor() {
    //    CKEditor.create(document.querySelector('#editor'), {
    //       ckfinder: {
    //         uploadUrl: this.uploadUrl
    //       }
    //     }).then(editor => {
    //       const toolbarContainer = document.querySelector('#toolbar-container_A');
    //     toolbarContainer.appendChild(editor.ui.view.toolbar.element);
    //     this.editor = editor //将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
    //   }).catch(error => {
    //       console.error(error);
    //   });
    // },

    // setData(data) {
    //   this.editor.setData(response.productInfo.description);
    // },

    // getData() {
    //   return this.editor.getData();
    // }
  }
}
</script>
<style lang="scss">
#editor{
  text-align:left;
}
</style>
