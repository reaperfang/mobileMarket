<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
    <div class="block form">
      <el-form-item label="分类名称" prop="name">
        <el-input placeholder="请勿超过10个字" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="排序优先级" prop="sortType">
        <el-radio-group v-model="ruleForm.sortType">
          <el-radio :label="1">创建时间越晚越靠前</el-radio>
          <el-radio :label="2">创建时间越早越靠前</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="展示方式" prop="showType">
        <el-radio-group v-model="ruleForm.showType">
          <el-radio :label="1">名称列表</el-radio>
          <el-radio :label="2">期刊列表</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <RichEditor @editorValueUpdate="editorValueUpdate" :myConfig="myConfig" :richValue="ruleForm.explain"></RichEditor>
    </div>

    <div class="block form">
      <el-button type="primary" @click="dialogVisible=true">添加页面</el-button>
      <p v-for="(item, key) of ruleForm.pageList" :key="key">{{item.name}}</p>
    </div>

     <DialogBase :visible.sync="dialogVisible" width="816px" title="选择微页面" @submit="seletePage">
        <component v-if="dialogVisible" :is="'microPage'" @seletedRow="rowSeleted"></component>
    </DialogBase>
  </el-form>
</template>

<script>
import propertyMixin from '../mixins/mixinProps';
import microPage from "@/views/shop/dialogs/jumpLists/microPage";
import RichEditor from '@/components/RichEditor';
import DialogBase from "@/components/DialogBase";
export default {
  name: 'propertyTitle',
  mixins: [propertyMixin],
  components: {DialogBase, microPage, RichEditor},
  data () {
    return {
      editorData: '',  //富文本数据
      myConfig: {
          // 编辑器不自动被内容撑高
          autoHeightEnabled: false,
          // 初始容器高度
          initialFrameHeight: 320,
          // 初始容器宽度
          initialFrameWidth: 306
      },
      ruleForm: {
        name: '微页面分类',
        sortType: 1,
        showType: 1,
        colorStyle: '#fff',
        explain: '',
        isBaseComponent: true,
        pageList: []
      },
      rules: {

      },
      dialogVisible: false,
      currentDialog: '',
      tempSelectPage: null  //临时页面
    }
  },
  methods: {

    rowSeleted(row) {
      this.tempSelectPage = row;
    },

    /* 向父组件提交选中的数据 */
    seletePage() {
      if(this.tempSelectPage) {
        this.ruleForm.pageList = this.tempSelectPage;
      }
    },

     /* 富文本内容更新 */
    editorValueUpdate(html) {
      this.ruleForm.explain = html;
    },
  }
}
</script>

<style lang="scss">

</style>
