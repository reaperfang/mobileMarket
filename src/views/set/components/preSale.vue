/*售前相关 */
<template>
  <div class="main">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <div class="item">
            <h2>自动关闭未付款订单：</h2>
            <el-form-item label="拍下未付款:" prop="autoCancelUnpayOrder">
                <el-input 
                v-model="form.autoCancelUnpayOrder" 
                style="width:260px;" 
                placeholder="当前未启动该功能，输入数值即生效">
                </el-input>
                <el-select 
                v-model="form.acuoType" 
                placeholder="请选择" 
                style="width:100px;">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                后，订单自动关闭
            </el-form-item>
        </div>
        <div class="item">
            <h2>发货方式：</h2>
            <el-form-item  prop="deliverGoodsType">
                <el-checkbox v-model="deliverGoodsTypeCheckout">快递发货</el-checkbox>
                选择计费方式：
                <el-radio-group v-model="form.transportationExpenseType">
                    <el-radio :label="0">组合运费（推荐）</el-radio>
                    <el-radio :label="1">按商品累计运费</el-radio>
                </el-radio-group>
                <el-checkbox  
                disabled 
                v-model="form.name5" 
                style="display:block;">
                自提店自提（本期暂不支持）
                </el-checkbox>
                <el-checkbox  
                disabled 
                v-model="form.name6"
                style="display:block;">
                商家自送（本期暂不支持）
                </el-checkbox>
            </el-form-item>
        </div>
        <div class="item">
            <h2>自动发货：<span>开启后立即对所有订单生效，若需要关闭该功能则清空输入框数值</span></h2>
            <el-form-item  prop="orderAutoSend" label="下单">
                <el-input 
                v-model="form.orderAutoSend" 
                style="width:260px;" 
                placeholder="当前未启动该功能，输入数值即生效">
                </el-input>
                <el-select 
                v-model="form.oasType" 
                placeholder="请选择" 
                style="width:100px;">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                后，订单状态变更为已发货
            </el-form-item>
        </div>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        </el-form-item>
    </el-form>
  </div>     
</template>

<script>
export default {
  name: 'preSale',
  data() {
    return {
      currentTab: 'preSale',
      form: {
            autoCancelUnpayOrder: '',
            acuoType: 1,
            deliverGoodsType:1,
            transportationExpenseType: 1,
            orderAutoSend: '',
            oasType: ''
        },
     rules: {
        autoCancelUnpayOrder: [
            { required: true, message: '请输入订单自动关闭时间', trigger: 'blur' }
        ],
        orderAutoSend: [
            { required: true, message: '请输入订单自动发货时间', trigger: 'blur' }
        ]
     },
     options: [
        {
          value: 1,
          label: '小时'
        }, 
        {
          value: 2,
          label: '分钟'
        }, 
     ]
    }
  },
  components: {},
  watch: {
  },
  computed:{
      deliverGoodsTypeCheckout:{
        get: function () {
            return this.form.deliverGoodsType == 1 ? true : false
        },
        set: function (newValue) {
            this.form.deliverGoodsType = newValue == true ? 1 : ''
        }
      }
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
              autoCancelUnpayOrder:this.form.autoCancelUnpayOrder,
              acuoType:this.form.acuoType,
              deliverGoodsType:this.form.deliverGoodsType,
              transportationExpenseType:this.form.transportationExpenseType,
              orderAutoSend:this.form.orderAutoSend,
              oasType:this.form.oasType
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
.item{
    border-bottom: 1px dashed #D3D3D3;
    padding-bottom: 20px;
    margin-bottom: 20px;
    h2{
        font-size: 14px;
        color: #3D434A;
        margin-bottom: 20px;
        span{
            font-size: 12px;
            color: #92929B;
        }
    }
}
</style>