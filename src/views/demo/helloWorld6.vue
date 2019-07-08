<template>
  <div class="hello">
    <h1>{{ msg }}</h1>


    <!-- 富文本编辑器demo -->
    <el-card>
      <h1>富文本编辑器</h1>
      <CKEditor></CKEditor>
      <el-button @click="currentDialog='demoDialog'">获取富文本数据</el-button>
    </el-card>

     <!-- 动态弹窗 -->
    <component :is="currentDialog" :data="editorData" @dialogClose="dialogClose" :refresh="fetch"></component>
  </div>
</template>

<script>
import utils from '@/utils';
import demoDialog from './dialogs/demoDialog';
import CKEditor from '@/bizComps/CKEditor';
export default {
  name: 'HelloWorld6',
  components: {demoDialog, CKEditor},
  data () {
    return {
      msg: '中企电商VUE框架',
      currentDialog: '',  //当前弹窗
      editorData: '文章AZNG艾萨克牛顿京卡是南方'  //富文本数据
    }
  },

  methods:{
    /* 
     * 关闭弹窗,移除当前显示的弹窗组件
    */
    dialogClose() {
      this.currentDialog = '';
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
