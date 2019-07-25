/*微信设置 */
<template>
    <div class="shopInfo">
        <h1>基本信息</h1>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="商户名称:" prop="name">
                <el-input v-model="form.name" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="主营类目:">
                食品
            </el-form-item>
            <el-form-item label="创建日期:">
                2019-07-23 20:50:00
            </el-form-item>
            <el-form-item label="商户LOGO:">
                <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="客服电话:" prop="name4">
                <el-input v-model="form.name4" placeholder="区号" style="width:70px;"></el-input>
                ——
                <el-input v-model="form.name5" placeholder="如输入手机号，不填区号" style="width:190px;"></el-input>
            </el-form-item>
            <el-form-item label="联系地址:" prop="address">
                <el-cascader :options="area" v-model="form.address" expand-trigger="hover"/>
                <el-input v-model="form.addressDetail" style="width: 70%;" placeholder="详细地址"/>
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
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        name4:[
          { required: true, message: '请输入区号', trigger: 'blur' },
        ],
        name5:[
          { required: true, message: '请输入电话号码', trigger: 'blur' },
        ],
        address:[
          { required: true, message: '请输入电话号码', trigger: 'blur' },
        ],
      },
      imageUrl: '',
      area: [],
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

</style>