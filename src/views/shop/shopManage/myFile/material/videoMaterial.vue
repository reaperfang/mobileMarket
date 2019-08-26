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
      <p class="list_top">视频素材<span>{{total*1}}</span>条</p>
      <div class="list_main">
        <div class="list_img">
           <div class="imgs">
            <div class="item_img" v-for="item in list" :key="item.id">
              <p class="img_head">
                <span>
                  <el-checkbox v-model="checked"></el-checkbox>
                  {{item.updateTime}}
                  </span>
                  <span>
                    <i class="wx_icon" v-if="item.isSyncWechat"></i>
                    {{item.fileSize}} MB
                  </span>
              </p>
              <div class="img_body">
                <p class="title">{{item.title}}</p>
                <video v-if="item.filePath !=''"  
                :src="item.filePath"
                class="avatar video-avatar"
                controls="controls">您的浏览器不支持视频播放</video> 
                <!-- <img :src="item.filePath" class="imgs"> -->
              </div>
              <p class="img_bottom">
                <!-- <span @click="uploadImage(item.id,'videoId')"><i class="el-icon-edit"></i></span> -->
                <span @click="moveGroups(item.id)"><i class="el-icon-folder"></i></span>
                <span @click="downVideo(item.filePath,item.fileName)"><i class="el-icon-download"></i></span>
                <span @click="deleteImage(item.id,'videoId')"><i class="el-icon-delete"></i></span>
              </p>
            </div>
           </div>
           <p class="pages">
              <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total*1"
              class="page_nav">
              </el-pagination>
           </p>
        </div>
        <div class="groups">
          <p class="groups_head">全部视频</p>
          <p class="item" v-for="item in groupList" :key="item.id">
            <span @click="getList(item.id)">{{item.name}}</span>
            <span v-if="item.id != -1">
              <i class="el-icon-edit" @click="newGroup(item.id,item.name,'edit')"></i>
              <i class="el-icon-delete" @click="deleteImage(item.id,'groupId')"></i>
            </span>
          </p>
          <span class="newClass" @click="newGroup('','','new')">+ 新建分组</span>
        </div>
      </div>
    </div>
    <!-- 动态弹窗 -->
    <component v-if="dialogVisible" :is="currentDialog" :dialogVisible.sync="dialogVisible" :data="data" :arrayData="arrayData" @submit="handleSubmit"></component>
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
      total:0,

      data:'',
      arrayData:[],
      dialogVisible: false,
      currentDialog: '',
      checkedAll:false,
      imgsArr:[ ],
      loading:false,
      checked:false,
      list:[],
      groupList:[],
      currentPage:1,
      pageSize:10,
      total:0,
    }
  },
  created() {
    this.getList()
    this.getGroups()
  },
  methods: {
    //获取视频列表
    getList(id){
      let query ={
        fileGroupInfoId:id || '',
        fileGroupInfoId:'',
        startIndex:this.currentPage,
        pageSize:this.pageSize,
        sourceMaterialType:'2'
      }
      this._apis.file.getMaterialList(query).then((response)=>{
        response.list.map((item) => {
          item.updateTime = item.updateTime.slice(0,10)
        })
        this.list = [].concat(response.list)
        this.total = response.total
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },
    /**********************************        分组相关      **********************/
    //查询分组
    getGroups(){
      let query ={
        type:'2'
      }
      this._apis.file.getGroup(query).then((response)=>{
        this.groupList = response
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },
    //添加分组
    addGroup(groupName){
      let query ={
        name:groupName,
        parentId:'0',
        type:'2'
      }
      this._apis.file.newGroup(query).then((response)=>{
        this.$notify.success({
          title: '成功',
          message: '添加成功！'
        });
        this.getGroups()
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })      
    },
    //编辑分组
    editGroup(groupId,groupName){
      let query ={
        id:groupId,
        name:groupName,
        type:'2'
      }
      this._apis.file.editGroup(query).then((response)=>{
        this.$notify.success({
          title: '成功',
          message: '操作成功！'
        });
        this.getGroups()
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })      
    },
    //删除分组
    deleteGroup(id){
      let query ={
        id:id,
        type:'2'
      }
      this._apis.file.deleteGroup(query).then((response)=>{
        this.$notify.success({
          title: '成功',
          message: '操作成功！'
        });
        this.getGroups()
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },

  /**********************************        弹窗相关      **********************/
    //弹窗反馈
    handleSubmit(data){
      for(let key in data){
        switch (key) {
          case 'add': 
            this.addGroup(data.add.groupName) 
          break;
          case 'edit':
            this.editGroup(data.edit.groupId,data.edit.groupName)
          break;
          case 'deleteGroup':
            this.deleteGroup(data.deleteGroup.groupId)
          break;
          case 'moveGroup':
            this.moveGroup(data.moveGroup.imageId,data.moveGroup.groupId)
          break;
          case 'deleteImage':
            this.deleteVideo(data.deleteImage.imageId)
          break;
          case 'syncImage':
            this.handleSyncImage()
          break;
          case 'uploadVideo':
            this.uploadVideo(data.uploadVideo.query)
          break;
        }
      }
    },

    newGroup(id,name,type){
      this.dialogVisible = true;
      this.currentDialog = 'dialogGroups'
      this.data = {
        type:type,
        id:id || '',
        name:name || ''
      }
    },
    deleteImage(id,type){
      this.dialogVisible = true;
      this.currentDialog = 'dialogDelete'
      if(type == 'groupId'){
        this.data = {
          id:id || '',
          type:type
        }
      }else{
        this.arrayData=[]
        this.arrayData.push(id)
      }
    },
    moveGroups(id){
      this.dialogVisible = true;
      this.currentDialog = 'dialogGroupsMove'
      this.data = 'video'
      this.arrayData = []
      this.arrayData.push(id)
    },
    uploadImage(id,type){
      this.dialogVisible = true;
      this.currentDialog = 'dialogUploadImage'
      this.data = {
        txt:'上传视频',
      }
    },
    syncImage(){
      this.dialogVisible = true;
      this.currentDialog = 'dialogSync'
    },
    /**********************************        单个视频      **********************/
    //下载视频
    downVideo(filepath,fileName){
      let a = document.createElement('a')
          a.download = fileName || '图片名称'
          a.href = filepath;
          a.click();
    },
    //分组
    moveGroup(id,groupId){
      let query ={
        ids:id,
        toFileGroupInfoId:groupId
      }
      this._apis.file.moveGroup(query).then((response)=>{
        this.$notify.success({
          title: '成功',
          message: '移动分组成功！'
        });
        this.getGroups()
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },
    //删除视频
    deleteVideo(id){
      let query ={
        ids:id,
      }
      this._apis.file.deleteMaterial(query).then((response)=>{
        this.$notify.success({
          title: '成功',
          message: '删除成功！'
        });
        this.getList()
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },
    //上传视频
    uploadVideo(query){
      this._apis.file.uploadVideo(query).then((response)=>{
        this.$notify.success({
          title: '成功',
          message: '上传图片成功！'
        });
        this.getList()
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },
    /**********************************        分页相关      **********************/
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
    width: 100%;
    .imgs{
      display: flex;
      flex-flow: row wrap;
      .item_img{
        width: 250px;
        border: 1px solid #e6e6e6;
        margin:0px 30px 50px 0px;
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
            width: 33%;
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
  }
  .groups{
    width: 200px;
    border: 1px solid #e6e6e6;
    font-size: 14px;
    color: #44434B;
    margin-left: 30px;
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
.pages{
  width: 100%;
  margin-top: 50px;
  text-align: right;
  .page_nav{
    display: inline-block;
  }
}
.ml10{
  margin-left: 10px;
}
</style>
