/*提现设置 */
<template>
    <div class="main">
      <el-form ref="form" :model="form" label-width="140px">
        <el-form-item label="是否允许提现:" prop="cashOut">
          <el-radio-group v-model="form.cashOut">
            <el-radio :label="0">不允许</el-radio>
            <el-radio :label="1" style="margin-left:10px;">允许</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="pdl100" v-if="form.cashOut == 1">
          <p class="note note1">提示：请确认您在微信支付中开通了【商户支付】功能，否则用户将无法提现！</p>
          <p class="note note2">开通教程链接：https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_1</p>
          <el-form-item label="单笔提现金额上限" prop="cashOutUpper">
            <el-input-number v-model="form.cashOutUpper" :min="0" label="请输入整数">
            </el-input-number> 元
          </el-form-item>
          <el-form-item label="单笔最低提现金额" prop="cashOutLower">
            <el-input-number v-model="form.cashOutLower" :min="0" label="请输入整数">
            </el-input-number> 元
          </el-form-item>
          <el-form-item label="每日提现次数上限" prop="cashOutTimes">
            <el-input-number v-model="form.cashOutTimes" :min="0" label="请输入整数">
            </el-input-number> 次
          </el-form-item>
          <el-form-item label="余额满" prop="cashOutMoney">
            <el-input-number v-model="form.cashOutMoney" :min="0" label="请输入整数">
            </el-input-number> 元,可提现
          </el-form-item>
        </div>
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
        cashOutUpper:0,
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
      this.$msgbox({
        title: '确认提示',
        message: '请确认开通了【商户支付】功能，否则将可能会产生相关客诉，因此产生的法律风险商家需要自行承担',
        showCancelButton: true,
        confirmButtonText: '确认已开通，继续保存',
        cancelButtonText: '返回',
      }).then(() => {
        this.save(formName)
      })
    },

    save(formName){
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
  .note{
    font-size: 12px;
    line-height: 30px;
  }
  .note1{
    color: #E94D49;
  }
  .note2{
    color: #ccc;
  }
  .save{
    margin: 200px 0 200px;
  }
  .pdl100{
    padding-left: 100px;
  }
}
</style>