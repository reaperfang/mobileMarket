<template>
  <!-- <p>普通图文
    <el-button type="text" @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">图片素材</el-button>
    {{ruleForm.coverUrl}}
    <component v-if="dialogVisible" :is="currentDialog" :dialogVisible.sync="dialogVisible" @imageSelected="imageSelected"></component>
  </p> -->
  <div class="main">
    <p class="title">创建普通图文</p>
    <div class="content">
      <div>
        <RichEditor @editorValueUpdate="editorValueUpdate" :myConfig="myConfig"></RichEditor>
      </div>
      <div class="c_right">
        <p class="head">图文信息</p>
        <div class="bodys">
          <el-input v-model="input" placeholder="标题请勿超过64个字，必填"></el-input>
          <p class="mt10">封面图片</p>
          <p class="uploadImage">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb，建议尺寸900*500</div>
            </el-upload>
            <el-button type="primary" @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'" class="imgSource">图片素材</el-button>
          </p>
          <el-checkbox v-model="checked" class="mt10">正文中显示封面</el-checkbox>
        </div>
      </div>
    </div>
    <p class="btns">
      <el-button type="primary">预览</el-button>
      <el-button type="primary" plain>取消</el-button>
      <el-button type="primary">保存</el-button>
    </p>
    <component v-if="dialogVisible" :is="currentDialog" :dialogVisible.sync="dialogVisible" @imageSelected="imageSelected"></component>
  </div>
</template>

<script>
import dialogSelectImageMaterial from '../../dialogs/dialogSelectImageMaterial';
import RichEditor from '@/components/RichEditor';
export default {
  name: 'generalArticle',
  components: {dialogSelectImageMaterial, RichEditor},
  data () {
    return {
      dialogVisible: false,
      currentDialog: '',
      ruleForm: {
        articalTitle: '',
        coverUrl: '',
        showCover: true
      },
      rules: {},
      fileList:[],
      checked:false,
      input:'',
      myConfig: {
        // 编辑器不自动被内容撑高
        autoHeightEnabled: false,
        // 初始容器高度
        initialFrameHeight: 400,
        // 初始容器宽度
        initialFrameWidth: 700,
        // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
        serverUrl: 'http://35.201.165.105:8000/controller.php',
        // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
        UEDITOR_HOME_URL: '/static/UEditor/'
      }
    }
  },
  created() {

  },
  methods: {

     /* 
     * 富文本数据更新
    */
    editorValueUpdate(value) {
      this.editorData = value;
    },
    /* 弹框选中图片 */
    imageSelected(dialogData) {
      this.ruleForm.coverUrl= dialogData.filePath;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  background:#fff;
  padding:20px;
}
.title{
  height: 50px;
  line-height: 50px;
}
.content{
  display:flex;
  justify-content:center;
  .c_right{
    width: 250px;
    border:1px solid #e6e6e6;
    margin-left: 30px;
    .head{
      height: 25px;
      line-height: 25px;
      background: #EFEFEF;
      padding-left: 10px;
    }
    .bodys{
      padding: 10px;
      .uploadImage{
        position: relative;
        .imgSource{
          position: absolute;
          top:30px;
          right:10px;
        }
      }
    }
  }
}
.btns{
  text-align: right;
  margin-top: 10px;
  margin-right: 100px;
}
.mt10{
  margin-top: 10px;
}
</style>
