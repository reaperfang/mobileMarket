<template>
  <DialogBase :visible.sync="visible" width="600px" :title="title" @submit="uploadImage">
    <el-form :model="form" class="demo-form-inline" label-width="90px">
        <el-form-item label="本地上传" v-if="title == '上传图片'">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :limit="1"
            :data="{json: JSON.stringify({cid: cid})}"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="note">仅支持jpg,png格式，大小不超过3.0MB</p>
        </el-form-item>
        <el-form-item label="本地上传" v-if="title == '上传视频'">
          <el-upload class="avatar-uploader el-upload--text"
            :action="uploadUrl" 
            :data="{json: JSON.stringify({cid: cid})}"
            :show-file-list="false"
            accept=".mp4"
            :on-success="handleVideoSuccess" 
            :before-upload="beforeUploadVideo" 
            :on-progress="uploadVideoProcess"> 
          <video v-if="this.fileData.url !='' && !videoFlag"  
            :src="this.fileData.url"
            class="avatar video-avatar"
            controls="controls">您的浏览器不支持视频播放</video> 
          <i v-else-if="this.fileData.url =='' && !videoFlag"
            class="el-icon-plus avatar-uploader-icon"></i>  
          <el-progress v-if="videoFlag == true"
              type="circle"
              :percentage="videoUploadPercent"
              style="width:80px;height:80px;">
          </el-progress>
          <el-button class="video-btn"
                slot="trigger"
                size="small"
                v-if="isShowUploadVideo"
                type="primary">选取文件</el-button>
          </el-upload>
          <p v-if="isShowUploadVideo">视频大小不超过10mb，支持mp4,mov,m4v,flv,x-flv,mkv,wmv,avi,rmvb,3gp格式</p>
        </el-form-item>
        <el-form-item label="名称" v-if="title == '上传视频'">
          <el-input v-model="form.name" placeholder="请勿超过20字" style="width:195px"></el-input>
        </el-form-item>
        <el-form-item label="分组">
          <el-select v-model="form.groupValue" placeholder="请选择">
            <el-option
              v-for="item in groupList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
       <el-form-item label="封面" v-if="title == '上传视频'">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :show-file-list="false"
            :limit="1"
            :data="{json: JSON.stringify({cid: cid})}"
            :on-success="handleCoverSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.imageUrls" :src="form.imageUrls" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="note">建议尺寸：800*800，支持jpg,png格式，大小不超过3.0MB。</p>
          <p class="note">如果不添加封面，系统会默认截取视频的第一个画面作为封面</p>
        </el-form-item>
      </el-form>
  </DialogBase>
</template>

<script>
import DialogBase from "@/components/DialogBase"
import utils from "@/utils"
export default {
  name: "dialogUploadImage",
  components: {DialogBase},
  props: {
      data: {
        type:Object,
        required:true
      },
      dialogVisible: {
          type: Boolean,
          required: true
      },
  },
  data() {
    return {
      uploadUrl:`${process.env.UPLOAD_SERVER}/web-file/file-server/api_file_remote_upload.do`,
      title:this.data.txt,
      form:{
        imageUrl:'',
        name:'',
        groupValue:'',
        imageUrls:''
      },
      fileData:{},
      groupList:[],
      videoFlag:false , //是否显示进度条
		  videoUploadPercent:"", //进度条的进度，
		  isShowUploadVideo:false
    };
  },
  computed: {
    visible: {
      get() {
          return this.dialogVisible
      },
      set(val) {
          this.$emit('update:dialogVisible', val)
      }
    },
    cid(){
        let shopInfo = JSON.parse(localStorage.getItem('shopInfos'))
        return shopInfo.id
    }
  },
  created() {
    this.getGroups()
  },
  methods: {
    //查询分组
    getGroups(){
      let type = this.title == '上传图片' ? '0' : '2'
      this._apis.file.getGroup({type:type}).then((response)=>{
        this.groupList = response
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },
   //上传图片
    uploadImage(){
      if(this.title == '上传图片'){
        let query ={
          fileGroupInfoId:this.form.groupValue,
          data:[
            {
              fileName:this.fileData.original,
              filePath:this.fileData.url,
              imgPixelWidth:this.fileData.width,
              imgPixelHeight:this.fileData.height,
              fileSize:this.fileData.size,
              sign:this.fileData.sign
            }
          ]
        }
        this.$emit('submit',{uploadImage:{query:query}})
      }else{
        let query ={
          fileGroupInfoId:this.form.groupValue,
          fileName:this.fileData.original,
          filePath:this.fileData.url,
          fileSize:this.fileData.size,
          name:this.form.name,
          fileover:this.form.imageUrls,
          sign:this.fileData.sign,
        }
        this.$emit('submit',{uploadVideo:{query:query}})
      }
    },
    //上传视频
    // uploadVideo(){
      
    // },

    handleAvatarSuccess(res, file) {
      this.fileData = res.data
      this.form.imageUrl = res.data.url
    },
    handleCoverSuccess(res, file){
      this.fileData = res.data
      this.form.imageUrls = res.data.url
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 3;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 3MB!');
      }
      return isJPG && isLt2M;
    },

    //上传成功回调
	  handleVideoSuccess (res, file) {
        this.isShowUploadVideo = true;
        this.videoFlag = false;
        this.videoUploadPercent = 0;
        if (res.status == "success") {
            this.fileData.url = res.data.url;
        } else {
            this.$message.error('视频上传失败，请重新上传！');
        }
    },
    //进度条
	  uploadVideoProcess (event, file, fileList) {
        this.videoFlag = true;
        this.videoUploadPercent = file.percentage.toFixed(0) * 1;
    },
    //上传前回调
	  beforeUploadVideo (file) {
        const isLt20M = file.size / 1024 / 1024 < 10;
        if (['video/mp4'].indexOf(file.type) == -1) { //'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'
            this.$message.error('请上传正确的视频格式');
            return false;
        }
        if (!isLt20M) {
            this.$message.error('上传视频大小不能超过10MB哦!');
            return false;
        }
        this.isShowUploadVideo = false;
    },


  }
}
</script>

<style lang="scss" scoped>
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
/deep/.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
/deep/.avatar {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
}
</style>


<style lang="scss" scoped>
.note{
  font-size: 14px;
  color: #D3D8DF;
}
</style>