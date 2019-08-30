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
      <el-button type="primary" @click="dialogVisible=true; currentDialog='dialogSelectJumpPage'">添加页面</el-button>
    </div>

     <!-- 动态弹窗 -->
    <component v-if="dialogVisible" :is="currentDialog" :dialogVisible.sync="dialogVisible" @dialogDataSelected="dialogDataSelected"></component>
  </el-form>
</template>

<script>
import propertyMixin from '../mixins/mixinProps';
import dialogSelectJumpPage from '@/views/shop/dialogs/dialogSelectJumpPage';
import RichEditor from '@/components/RichEditor';
export default {
  name: 'propertyTitle',
  mixins: [propertyMixin],
  components: {dialogSelectJumpPage, RichEditor},
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
        explain: '',
        isBaseComponent: true
      },
      rules: {

      },
      dialogVisible: false,
      currentDialog: '',
    }
  },
  methods: {

    /* 弹窗选中了跳转链接 */
    dialogDataSelected(jumpLink) {
      console.log(jumpLink);
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
