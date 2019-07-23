<!--全部客户-->
<template>
  <div>
    <div class="all_container">
        <div class="form_container">
            <el-form ref="form" :model="form">
                <el-row>
                    <el-col :span="4">
                        <el-form-item>
                            <el-select v-model="form.userId" placeholder="用户ID">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-input v-model="form.name" placeholder="昵称/姓名/手机号码/用户ID"><el-button slot="append" icon="el-icon-search"></el-button></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="客户身份：">
                    <el-checkbox-group v-model="form.clientStatus">
                        <el-checkbox v-for="item in clientStatusOps" :label="item" :key="item" border>{{item}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="客户身份：">
                    <el-checkbox-group v-model="form.clientSign">
                        <el-checkbox v-for="item in clientSignOps" :label="item" :key="item" border>{{item}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </div>
    </div>
  </div>
</template>
<script>
import clientCont from '@/system/constant/client';
export default {
  name: 'allClient',
  data() {
    return {
      form: {
            userId:"",
            name:"",
            clientStatus:['非会员客户'],
            clientSign: ['年轻用户'],
        },
      
    }
  },
  watch: {

  },
  computed:{
    clientStatusOps() {
        return clientCont.clientStatusOps
    },
    clientSignOps() {
        return clientCont.clientSignOps
    }
  }, 
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
    
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner{
    display: none;
}
/deep/.el-checkbox.is-bordered.el-checkbox--small{
    padding: 5px 10px 5px 10px;
    background:rgba(211,211,211,0.3);
}
/deep/.el-checkbox__label{
    padding-left: 0;
}
/deep/.el-checkbox.is-bordered+.el-checkbox.is-bordered{
    margin-left: 0;
}
/deep/.el-checkbox.is-bordered.is-checked{
    background:rgba(101,94,255,0.1);
}
.el-input-group__append button.el-button{
    color: #5D78FF;
}
.all_container{
    padding: 19px;
    background-color: #fff;

}
</style>
