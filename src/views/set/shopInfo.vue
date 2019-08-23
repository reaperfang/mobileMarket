/*店铺信息 */
<template>
    <div class="shopInfo">
        <h1>基本信息</h1>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="商户名称:" prop="shopName">
                <el-input v-model="form.shopName" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="主营类目:">
              {{form.business}}
            </el-form-item>
            <el-form-item label="创建日期:">
                <!-- {{form}} -->
            </el-form-item>
            <el-form-item label="商户LOGO:">
                <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="form.logo" :src="form.logo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="客服电话:" prop="phone">
                <!-- <el-input v-model="form.phone" placeholder="区号" style="width:70px;"></el-input>
                —— -->
                <el-input v-model="form.phone" placeholder="如输入手机号，不填区号" style="width:190px;"></el-input>
            </el-form-item>
            <el-form-item label="联系地址:" prop="address">
                <area-cascader :level="2" :data='$pcaa' v-model='form.addressCode' style="display:inline-block"></area-cascader>
                <!-- <el-cascader :options="area" v-model="form.address" expand-trigger="hover"/> -->
                <el-input v-model="form.address" style="width: 70%;" placeholder="详细地址"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>    
</template>

<script>
// import { listArea } from '@/api/area'
export default {
  name: 'shopInfo',
  data() {
    return {
      form: {
          shopName: '',
          logo:'',
          phone:'',
          addressCode:[],
          address:'',
      },
      rules: {
        shopName: [
          { required: true, message: '请输入商户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        phone:[
          { required: true, message: '请输入电话号码', trigger: 'blur' },
        ],
        address:[
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
      },
      imageUrl: '',
      area: [],
      shopInfo:{}
    }
  },
  components: {},
  watch: {
    
  },
  created() {
    this.getShopInfo()
  },
  destroyed() {
    
  },
  methods: {
    getShopInfo(){
      let id = this.$store.getters.cid || '2'
      this._apis.set.getShopInfo({id:id}).then(response =>{
        this.form = response
        this.form.shopName = response.shopName
        this.form.logo = response.logo
        this.form.phone = response.phone
        this.form.address = response.address
        if(response.provinceCode){
          let arr = []
          arr.push(response.provinceCode)
          arr.push(response.cityCode)
          arr.push(response.areaCode)
          this.form.addressCode = arr
        }
      }).catch(error =>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },

    onSubmit(){
      let id = this.$store.getters.cid || '2'
      let data = {
        shopName:this.form.shopName,
        logo:this.form.logo,
        phone:this.form.phone,
        provinceCode:this.form.addressCode[0],
        cityCode:this.form.addressCode[1],
        areaCode:this.form.addressCode[2],
        address:this.form.address
      }
      this._apis.set.updateShopInfo(data).then(response =>{
        this.$notify.error({
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

    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.shopInfo{
   width: 100%;
   height: 100%;
   background: #fff; 
   padding: 20px;
   h1{
       font-size:14px;
       color: #3D434A;
       font-weight:500;
       margin-bottom: 30px;
     }
}
/deep/ .area-select .area-selected-trigger{
  padding:0 0 0 10px;
}
</style>
