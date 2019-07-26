/*微信设置 */
<template>
    <div class="main">
        <h1>微信支付信息设置</h1>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="微信商户名称:" prop="name">
                <el-input v-model="form.name" style="width:250px;" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="微信商户号:" prop="name1">
                <el-input v-model="form.name1" style="width:250px;" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="AppId:" prop="name2">
                <el-input v-model="form.name2" style="width:250px;" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="密钥:" prop="name3">
                <el-input v-model="form.name3" style="width:250px;" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="证书密码:" prop="name4">
                <el-input v-model="form.name4" style="width:250px;" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="CERT证书文件">
            <div class="upload_file">
                <el-upload
                :action="uploadUrl"
                :before-upload="handleCertFileUrlOk"
                :on-success="uploadCertFileUrl"
                :show-file-list="false"
                v-loading="loading3">
                <span class="handle" v-if="certFileUrlOk">选择文件</span>
                <!-- <span class="tip">{{formData.certFileName}}</span> -->
                </el-upload>
            </div>
            <div class="tip" v-if="certFileUrlOk">
                <span class="status">未上传</span>下载证书cert.zip中的apiclient_cert.pem文件
            </div>
            </el-form-item>

            <el-form-item label="KEY秘钥文件">
            <div class="upload_file">
                <el-upload
                :action="uploadUrl"
                :before-upload="handlKeyFileUrlOk"
                :on-success="uploadKeyFileUrl"
                :show-file-list="false"
                v-loading="loading2">
                <span class="handle" v-if="keyFileUrlOk">选择文件</span>
                <!-- <span class="tip">{{formData.keyFileName}}</span> -->
                </el-upload>
            </div>
            <div class="tip" v-if="keyFileUrlOk"><span class="status">未上传</span>下载证书cert.zip中的apiclient_key.pem文件</div>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button  @click="_routeTo('payType')">返回</el-button>
            </el-form-item>
        </el-form>
    </div>    
</template>

<script>
// import { listArea } from '@/api/area'
export default {
  name: 'wxSet',
  data() {
    return {
      form: {
          name: '',
          name1: '',
          name2: '',
          name3: '',
          name4: '',
          name5: '',
          name6: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入微信商户名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        name1:[
          { required: true, message: '请输入微信商户号', trigger: 'blur' },
        ],
        name2:[
          { required: true, message: '请输入AppId', trigger: 'blur' },
        ],
        name3:[
          { required: true, message: '请输入密钥', trigger: 'blur' },
        ],
        name4:[
          { required: true, message: '请输入证书密码', trigger: 'blur' },
        ],
      },
      imageUrl: '',
      area: [],
      uploadUrl:`${process.env.UPLOAD_SERVER}/matrix-admin/file/api_file_remote_upload.do`,
      loading2:false,
      loading3:false,
      keyFileUrlOk:true,
      certFileUrlOk:true,
    }
  },
  components: {},
  watch: {
    
  },
  created() {

  },
  destroyed() {
    
  },
  methods: {
    init(){
        // listArea({}).then(response => {
        //     this.area = response.data.data.children
        // })
    },

    handleCertFileUrlOk(){
        this.certFileUrlOk = false
        this.loading3  = true
    },

    handlKeyFileUrlOk(){
        this.keyFileUrlOk = false
        this.loading2 = true
    },
    uploadCertFileUrl(response, file, fileList){
        this.certFileUrlOk = false
        // if(file.status == "success"){
        //   this.formData.certFileName = file.name
        //   this.$message.success(response.msg);
        //   this.formData.certFileUrl = response.url;
        //   this.loading3  = false
        // }else{
        //   this.$message.error(response.msg);
        // }
      },
      uploadKeyFileUrl(response, file, fileList){
        this.keyFileUrlOk = false
        // if(file.status == "success"){
        //   this.formData.keyFileName = file.name
        //   this.$message.success(response.msg);
        //   this.formData.keyFileUrl = response.url;
        //   this.loading2 = false
        // }else{
        //   this.$message.error(response.msg);
        // }
      },

  }
}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
.main{
    width: 100%;
    background: #fff;
    padding:20px;
    h1{
        font-size: 16px;
        margin-bottom: 30px;
    }
}
 .upload_file{
    width: 637px;
    border: rgb(220, 223, 230) solid 1px;
    border-radius: 4px;
    padding-left: 8px;
    margin-bottom: 8px;
  }
  .handle{
    font-size:14px;
    color:rgba(61,67,74,1);
    background:rgba(181,189,202,1);
    border:1px solid rgba(181,189,202,1);
    padding: 2px 6px;
    cursor: pointer;
  }
  .tip{
    font-size:14px;
    font-weight:400;
    color:rgba(181,189,202,1);
    line-height:20px;
  }
  .status{
    font-size:14px;
    background-color: #FF4246;
    padding: 2px 6px;
    margin-right: 18px;
    color:rgba(255,255,255,1);
  }
</style>