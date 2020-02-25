<template>
  <div class="hello">
    <h1>{{ msg }}</h1>


    <!-- 富文本编辑器demo -->
    <el-card>
      <h1>富文本编辑器(已成功集成秀米编辑器)&nbsp;<el-button type="primary" @click="dialogVisible=true; currentDialog='demoDialog'">点击查看富文本内容(实时)</el-button></h1>
      <RichEditor @editorValueUpdate="editorValueUpdate" :myConfig="myConfig"></RichEditor>
    </el-card>

     <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible" :data="editorData"></component>
  </div>
</template>

<script>
import utils from '@/utils';
import demoDialog from './dialogs/demoDialog';
import RichEditor from '@/components/RichEditor';
export default {
  name: 'HelloWorld6',
  components: {demoDialog, RichEditor},
  data () {
    return {
      msg: '中企电商VUE框架',
      currentDialog: '',  //当前弹窗
      dialogVisible: false,
      editorData: '',  //富文本数据
      myConfig: {
          // 编辑器不自动被内容撑高
          autoHeightEnabled: false,
          // 初始容器高度
          initialFrameHeight: 400,
          // 初始容器宽度
          initialFrameWidth: 500
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
