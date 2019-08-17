<template>
  <div>
    <div class="head">
      <div>
        <el-checkbox v-model="checkedAll">全选</el-checkbox>
        <el-button type="warning" plain class="ml10" @click="deleteImage">批量删除</el-button>
        <el-button type="warning" plain class="ml10" @click="moveGroup">移动分组</el-button>
      </div>
      <div>
        <el-button type="primary" plain @click="syncImage">同步微信</el-button>
        <el-button type="primary" plain @click="uploadImage">上传视频</el-button>
      </div>
    </div>
    <div class="list">
      <p class="list_top">图片素材<span>{{num}}</span>条</p>
      <div class="list_main">
        <div class="list_img">
           <div class="item_img">
             <p class="img_head">
               <span>
                 <el-checkbox v-model="checked"></el-checkbox>
                 7月12日
                </span>
                <span>
                  <i class="wx_icon"></i>
                  8MB
                </span>
             </p>
             <div class="img_body">
               <p class="title">美丽的天空之城</p>
               <img src="" class="imgs">
             </div>
             <p class="img_bottom">
               <span><i class="el-icon-edit"></i></span>
               <span><i class="el-icon-folder"></i></span>
               <span><i class="el-icon-download"></i></span>
               <span><i class="el-icon-delete" @click="deleteImage"></i></span>
             </p>
           </div>
        </div>
        <div class="groups">
          <p class="groups_head">全部图片</p>
          <p class="item">未分组</p>
          <p class="item">
            <span>配图</span>
            <span>
              <i class="el-icon-edit" @click="newGroup"></i>
              <i class="el-icon-delete" @click="deleteImage"></i>
            </span>
          </p>
          <p class="item">
            <span>封面</span>
            <span>
              <i class="el-icon-edit" @click="newGroup"></i>
              <i class="el-icon-delete" @click="deleteImage"></i>
            </span>
          </p>
          <span class="newClass" @click="newGroup">+ 新建分组</span>
        </div>
      </div>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </div>
    <!-- 动态弹窗 -->
    <component v-if="dialogVisible" :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
  </div>
</template>

<script>
import dialogUploadVideo from '../../../dialogs/dialogUploadVideo';
import dialogUploadImage from '../../../dialogs/dialogUploadImage';
import dialogSync from '../../../dialogs/dialogSync';
import dialogDelete from '../../../dialogs/dialogDelete';
import dialogGroups from '../../../dialogs/dialogGroups';
import dialogGroupsMove from '../../../dialogs/dialogGroupsMove';
export default {
  name: 'videoMaterial',
  components: {dialogUploadVideo,dialogUploadImage,dialogSync,dialogDelete,dialogGroups,dialogGroupsMove},
  data () {
    return {
      dialogVisible: false,
      currentDialog: '',
      checkedAll:false,
      num:10,
      checked:false,
      currentPage:1,
      total:0
    }
  },
  created() {

  },
  methods: {
    newGroup(){
      this.dialogVisible = true;
      this.currentDialog = 'dialogGroups'
    },
    moveGroup(){
      this.dialogVisible = true;
      this.currentDialog = 'dialogGroupsMove'
    },
    deleteImage(){
      this.dialogVisible = true;
      this.currentDialog = 'dialogDelete'
    },
    uploadImage(){
      this.dialogVisible = true;
      this.currentDialog = 'dialogUploadImage'
    },
    syncImage(){
      this.dialogVisible = true;
      this.currentDialog = 'dialogSync'
    },
    //分页相关
    handleSizeChange(){},
    handleCurrentChange(){},
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
  .list_img{
    display: flex;
    justify-content: space-around;
    .item_img{
      width: 250px;
      border: 1px solid #e6e6e6;
      .img_head{
        height: 25px;
        line-height: 25px;
        padding: 0 10px;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        flex: 1;
        justify-content: space-between;
        span{
          font-size: 14px;
          color: #92929B;
        }
        .wx_icon{
          width: 20px;
          height: 20px;
          display: inline-block;
          vertical-align: middle;
          background: url('../../../../../assets/images/shop/wx_icon.png');
        }
      }
      .img_body{
        width:100%;
        padding:10px 10px;
        font-size: 14px;
        color: #44434B;
        .title{
          height: 25px;
          line-height: 25px;
        }
        .imgs{
          width: 100%;
          height:85px;
        }
      }
      .img_bottom{
        height: 25px;
        line-height: 25px;
        display: flex;
        justify-content:space-between;
        span{
          width: 25%;
          display: inline-block;
          background: #DDDDDD;
          text-align: center;
          color: #fff;
          cursor: pointer;
        }
        span:nth-of-type(n+2){
          border-left:1px solid #fff;
        }
      }
    }
  }
  .groups{
    width: 200px;
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
