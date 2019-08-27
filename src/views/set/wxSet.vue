/*微信设置 */
<template>
    <div class="main">
        <h1>微信支付信息设置</h1>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="微信商户名称:" prop="wechatName">
                <el-input v-model="form.wechatName" style="width:250px;" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="微信商户号:" prop="wechatNum">
                <el-input v-model="form.wechatNum" style="width:250px;" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="AppId:" prop="wechatAppId">
                <el-input v-model="form.wechatAppId" style="width:250px;" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="密钥:" prop="wechatKey">
                <el-input v-model="form.wechatKey" style="width:250px;" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="证书密码:" prop="wechatValue">
                <el-input v-model="form.wechatValue" style="width:250px;" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="CERT证书文件" prop="wechatCertUrl">
            <div class="upload_file">
                <el-upload
                :action="uploadUrl"
                :data="{json: JSON.stringify({cid: 222})}"
                :before-upload="handleCertFileUrlOk"
                :on-success="uploadCertFileUrl"
                :show-file-list="false"
                v-loading="loading3"
                v-model="form.wechatCertUrl">
                <span class="handle" v-if="certFileUrlOk">选择文件</span>
                <span class="tip">{{form.certFileName}}</span>
                </el-upload>
            </div>
            <div class="tip" v-if="certFileUrlOk">
                <span class="status">未上传</span>下载证书cert.zip中的apiclient_cert.pem文件
            </div>
            </el-form-item>

            <el-form-item label="KEY秘钥文件" prop="wechatKeyFileUrl">
            <div class="upload_file">
                <el-upload
                :action="uploadUrl"
                :data="{json: JSON.stringify({cid: 222})}"
                :before-upload="handlKeyFileUrlOk"
                :on-success="uploadKeyFileUrl"
                :show-file-list="false"
                v-loading="loading2"
                v-model="form.wechatKeyFileUrl">
                <span class="handle" v-if="keyFileUrlOk">选择文件</span>
                <span class="tip">{{form.keyFileName}}</span>
                </el-upload>
            </div>
            <div class="tip" v-if="keyFileUrlOk">
              <span class="status">未上传</span>下载证书cert.zip中的apiclient_key.pem文件
            </div>
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
          wechatName: '',
          wechatNum: '',
          wechatAppId: '',
          wechatKey: '',
          wechatValue: '',
          certFileName:'',
          wechatCertUrl: '',
          keyFileName:'',
          wechatKeyFileUrl: ''
      },
      rules: {
        wechatName: [
          { required: true, message: '请输入微信商户名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        wechatNum:[
          { required: true, message: '请输入微信商户号', trigger: 'blur' },
        ],
        wechatAppId:[
          { required: true, message: '请输入AppId', trigger: 'blur' },
        ],
        wechatKey:[
          { required: true, message: '请输入密钥', trigger: 'blur' },
        ],
        wechatValue:[
          { required: true, message: '请输入证书密码', trigger: 'blur' },
        ],
        wechatCertUrl:[
          { required: true, message: '请输入CERT证书文件', trigger: 'blur' },
        ],
        wechatKeyFileUrl:[
          { required: true, message: '请输入KEY秘钥文件', trigger: 'blur' },
        ]
      },
      imageUrl: '',
      area: [],
      uploadUrl:`${process.env.UPLOAD_SERVER}/web-file/file-server/api_file_remote_upload.do`,
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
    this.getShopPayInfo()
  },
  destroyed() {
    
  },
  methods: {
    getShopPayInfo(){
      this._apis.set.getShopPayInfo().then(response =>{
        this.form = response
      }).catch(error =>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },

    onSubmit(){
      this._apis.set.updateShopPayInfo(this.form).then(response =>{
        this.$notify.success({
          title: '成功',
          message: '保存成功！'
        });
      }).catch(error =>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
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
        if(file.status == "success"){
          this.form.certFileName = file.name
          this.$message.success(response.msg);
          this.form.wechatCertUrl = response.data.url;
          this.loading3  = false
        }else{
          this.$message.error(response.msg);
        }
      },
    uploadKeyFileUrl(response, file, fileList){
      this.keyFileUrlOk = false
      if(file.status == "success"){
        this.form.keyFileName = file.name
        this.$message.success(response.msg);
        this.form.wechatKeyFileUrl = response.data.url;
        this.loading2 = false
      }else{
        this.$message.error(response.msg);
      }
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