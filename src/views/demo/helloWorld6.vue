<template>
  <div class="hello">
    <h1>{{ msg }}</h1>


    <!-- 富文本编辑器demo -->
    <el-card>
      <h1>富文本编辑器(已成功集成秀米编辑器)&nbsp;<el-button type="primary" @click="currentDialog='demoDialog'">点击查看富文本内容(实时)</el-button></h1>
      <RickEditor @editorValueUpdate="editorValueUpdate" :myConfig="myConfig"></RickEditor>
    </el-card>

     <!-- 动态弹窗 -->
    <component :is="currentDialog" :data="editorData" @dialogClose="dialogClose" :refresh="fetch"></component>
  </div>
</template>

<script>
import utils from '@/utils';
import demoDialog from './dialogs/demoDialog';
import RickEditor from '@/bizComps/RickEditor';
export default {
  name: 'HelloWorld6',
  components: {demoDialog, RickEditor},
  data () {
    return {
      msg: '中企电商VUE框架',
      currentDialog: '',  //当前弹窗
      editorData: '',  //富文本数据
      myConfig: {
          // 编辑器不自动被内容撑高
          autoHeightEnabled: false,
          // 初始容器高度
          initialFrameHeight: 400,
          // 初始容器宽度
          initialFrameWidth: 500,
          // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
          serverUrl: 'http://35.201.165.105:8000/controller.php',
          // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
          UEDITOR_HOME_URL: '/static/UEditor/'
        }
    }
  },

  methods:{
    /* 
     * 关闭弹窗,移除当前显示的弹窗组件
    */
    dialogClose() {
      this.currentDialog = '';
    },

    /* 
     * 富文本数据更新
    */
    editorValueUpdate(value) {
      this.editorData = value;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
