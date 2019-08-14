/*新建子账号 */
<template>
    <div class="main">
        <h1>创建角色</h1>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <!-- <el-form-item label="店铺名称:" prop="shopName">
                <el-input v-model="form.shopName" style="width:182px;" placeholder="10个汉字"></el-input>
            </el-form-item> -->
            <el-form-item label="角色名称:" prop="name">
                <el-input v-model="form.name" style="width:182px;" placeholder="10个汉字"></el-input>
            </el-form-item>
            <el-form-item label="角色描述:" prop="remack">
                <el-input v-model="form.remack" style="width:182px;" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="同步店铺:" prop="role">
                <el-checkbox-group v-model="form.role" class="inline">
                    <el-checkbox
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    style="display:block;">
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item class="mtb200">
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="_routeTo('roleManage')">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// import { listArea } from '@/api/area'
export default {
  name: 'createRole',
  data() {
    return {
      form: {
          shopName:'',
          name: '',
          remack: '',
          role: ''
      },
      options:[
          {
              label:'运营',
              value:1
          },
          {
              label:'财务',
              value:2
          },
          {
              label:'库管',
              value:3
          }
      ],
      rules:{
        shopName: [
          { required: true, message: '请输入商铺名称', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入人员名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        remack:[
          { required: true, message: '请输入登录手机号', trigger: 'blur' },
        ],
        role:[
          { required: true, message: '请选择角色', trigger: 'blur' },
        ]
      }

    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main{
    width: 100%;
    background: #fff;
    padding: 20px;
    h1{
        font-size: 14px;
        color: #3D434A;
        margin-bottom: 30px;
    }
}
.inline{
    display: inline;
}
.ml20{
    margin-left: 20px;
}
.mtb200{
    margin: 200px 0;
}
</style>