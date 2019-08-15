<template>
  <!-- <p>视频素材
    <el-button type="text" @click="dialogVisible=true; currentDialog='dialogUploadVideo'">上传视频</el-button>
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
  </p> -->
  <div>
    <div class="head">
      <div>
        <el-checkbox v-model="checkedAll">全选</el-checkbox>
        <el-button type="warning" plain class="ml10">批量删除</el-button>
      </div>
      <div>
        <el-button type="primary" plain>移动分组</el-button>
        <el-button type="primary" plain>同步微信</el-button>
        <el-button type="primary" plain>上传视频</el-button>
      </div>
    </div>
    <div class="list">
      <p class="list_top">图片素材<span>{{num}}</span>条</p>
      <div class="list_main">
        <div class="list_img">
           
        </div>
        <div class="groups">
          <p class="groups_head">全部图片</p>
          <p class="item">未分组</p>
          <p class="item">
            <span>配图</span>
            <span>
              <i class="el-icon-edit"></i>
              <i class="el-icon-delete"></i>
            </span>
          </p>
          <p class="item">
            <span>封面</span>
            <span>
              <i class="el-icon-edit"></i>
              <i class="el-icon-delete"></i>
            </span>
          </p>
          <span class="newClass">+ 新建分组</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dialogUploadVideo from '../../../dialogs/dialogUploadVideo';
export default {
  name: 'videoMaterial',
  components: {dialogUploadVideo},
  data () {
    return {
      dialogVisible: false,
      currentDialog: '',
      checkedAll:false,
      num:10,
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.head{
  display: flex;
  justify-content: space-between;
}
.list_top{
  height: 80px;
  line-height: 80px;
  font-size: 14px;
  color: #92929B;
  span{
    color: #44434B;
    margin: 0 5px;
  }
}
.list_main{
  display: flex;
  justify-content: space-between;
  .groups{
    width: 300px;
    border: 1px solid #e6e6e6;
    font-size: 14px;
    color: #44434B;
    .groups_head{
      height: 30px;
      line-height: 30px;
      background: #EFEFEF;
      padding-left: 20px;
    }
    .item{
      height: 35px;
      line-height: 35px;
      padding:0 20px;
      display: flex;
      justify-content: space-between;
      i{
        margin: 0 5px;
        cursor: pointer;
      }
    }
    .item:hover{
      background: #E0E0fc;
      cursor: pointer;
    }
    .newClass{
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      cursor: pointer;
    }
  }
}
.ml10{
  margin-left: 10px;
}
</style>
