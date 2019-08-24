/*提现设置 */
<template>
    <div class="main">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="是否允许提现:" prop="cashOut">
          <el-radio-group v-model="form.cashOut">
            <el-radio :label="0">不允许</el-radio>
            <el-radio :label="1" style="margin-left:10px;">允许</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="save">
          <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>    
</template>

<script>
export default {
  name: 'withdrawSet',
  data() {
    return {
      form:{
        cashOut:0,
      },
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
      }).catch(error =>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },
    onSubmit(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            let id = this.$store.getters.cid || '2'
            let data = {
              id:id,
              cashOut:this.form.cashOut
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
          }
      })
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
  padding: 20px;
  .save{
    margin: 200px 0 200px;
  }
}
</style>