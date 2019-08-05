/*店铺分配 */
<template>
    <div class="main">
        <h1>店铺分配</h1>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="管理员姓名:" prop="name">
                <el-input v-model="form.name" style="width:182px;" placeholder="10个汉字"></el-input>
            </el-form-item>
            <el-form-item label="管理员手机号:" prop="phone">
                <el-input v-model="form.phone" style="width:182px;" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="分配店铺:" prop="role">
                <el-checkbox-group v-model="form.role" class="inline" @change="handleCheckedCitiesChange">
                    <el-checkbox 
                    v-for="item in options" 
                    :label="item.label"
                    :key="item.label">
                    {{item.label}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item class="mtb200">
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="_routeTo('shopManages')">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// import { listArea } from '@/api/area'
export default {
  name: 'shopDistribute',
  data() {
    return {
      form: {
          name: '',
          phone: '',
          role: ['运营']
      },
      options:[
          {
              label:'店铺1',
              value:1
          },
          {
              label:'店铺2',
              value:2
          },
          {
              label:'店铺3',
              value:3
          },
          {
              label:'店铺4',
              value:4
          }
      ],
      rules:{
        name: [
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        phone:[
          { required: true, message: '请输入管理员手机号', trigger: 'blur' },
        ],
        role:[
          { required: true, message: '请选择店铺', trigger: 'blur' },
        ]
      }

    }
  },
  methods:{
     
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