<!-- 富文本编辑器组件 -->

<template>
  <div style="width:900px;margin:0 auto;">
    <!-- 工具栏容器 -->
    <div id="toolbar-container_A"></div>
    <!-- 编辑器容器 -->
    <div id="editor" style="border: 1px solid #cccccc;height: 500px">
      <p></p>
    </div>
  </div>
</template>
<script>
import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document';
export default {
  name: 'EditorBase',
  data() {
    return {
       editor:null,//编辑器实例
    }
  },

  mounted() {
    this.initCKEditor();
  },

  methods: {

    initCKEditor() {
       CKEditor.create(document.querySelector('#editor'), {
          ckfinder: {
            uploadUrl: this.uploadUrl
          }
        }).then(editor => {
          const toolbarContainer = document.querySelector('#toolbar-container_A');
        toolbarContainer.appendChild(editor.ui.view.toolbar.element);
        this.editor = editor //将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
      }).catch(error => {
          console.error(error);
      });
    },

    setData(data) {
      this.editor.setData(response.productInfo.description);
    },

    getData() {
      return this.editor.getData();
    }
  }
}
</script>
<style lang="scss">
#editor{
  text-align:left;
}
</style>
