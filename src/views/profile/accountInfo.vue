/*账号信息 */
<template>
    <div class="main">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="登录账号:" >
                17625412586
            </el-form-item>
            <el-form-item label="昵称:" prop="nickName">
                <el-input v-model="form.nickName" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="性别:">
                <el-radio-group v-model="form.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                    <el-radio :label="3">保密</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="QQ:" >
                <el-input v-model="form.qq" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="邮箱:" >
                <el-input v-model="form.email" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" class="mtb200">确认修改</el-button>
            </el-form-item>
        </el-form>
    </div>    
</template>

<script>
// import { listArea } from '@/api/area'
export default {
  name: 'accountInfo',
  data() {
    return {
      form: {
          name: '',
          nickName: '',
          sex: 1,
          qq: '',
          email: ''
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
    // 修改账号信息
    onSubmit(){}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.main{
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
.mtb200{
    margin: 200px 0;
}
</style>
