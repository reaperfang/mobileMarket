/*修改密码 */
<template>
    <div class="shopInfo">
        <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="请输入旧密码:" prop="name">
                <el-input v-model="form.nickName" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="请输入新密码:" prop="nickName">
                <el-input v-model="form.nickName" style="width:200px;"></el-input>
            </el-form-item>
            <el-form-item label="重复新密码:" prop="qq">
                <el-input v-model="form.qq" style="width:200px;"></el-input>
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
  name: 'passwordChange',
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

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
.mtb200{
    margin: 200px 0;
}
</style>
