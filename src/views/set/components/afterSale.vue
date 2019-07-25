/*售后相关 */
<template>
  <div class="main">
    <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <div class="item">
            <h2>自动收货： <span>说明：仅对有物流信息的订单生效，对没有物流信息的订单需要手动确认</span></h2>
            <el-form-item label="买家自动确认收货时间："></el-form-item>
            <el-form-item label="买家物流签收" prop="name1">
                <el-input 
                v-model="form.name1" 
                style="width:260px;" 
                placeholder="请输入整数，清空数值则关闭该功能">
                </el-input>
                天后，自动确认收货
            </el-form-item>
            <el-form-item label="卖家自动确认收货时间："></el-form-item>
            <el-form-item label="卖家物流签收" prop="name2">
                <el-input 
                v-model="form.name2" 
                style="width:260px;" 
                placeholder="请输入整数，清空数值则关闭该功能">
                </el-input>
                天后，自动确认收货
            </el-form-item>
        </div>
        <div class="item">
            <h2>售后自动关闭时间：</h2>
            <el-form-item label="订单完成" prop="name3">
                <el-input 
                v-model="form.name3" 
                style="width:260px;" 
                placeholder="请输入整数，清空数值则关闭该功能">
                </el-input>
                天后，售后自动关闭
            </el-form-item>
        </div>
        <div class="item">
            <h2>评价相关：</h2>
            <el-form-item label="评价功能开启" prop="name4">
                <el-radio-group v-model="form.name4">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                </el-radio-group>
                说明：启用后买家可以对购买商品进行评论，您可以根据评论内容进行回复。
            </el-form-item>
            <el-form-item label="订单完成" prop="name5">
                <el-input 
                v-model="form.name5" 
                style="width:96px;" 
                placeholder="请输入整数，清空数值则关闭该功能">
                </el-input>
                天后,自动评价为好评
            </el-form-item>
        </div>
        <div class="item">
            <h2>资产相关：</h2>
            <el-form-item label="发票功能开启" prop="name6">
                <el-radio-group v-model="form.name6">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                </el-radio-group>
                说明：启用后买家可以申请开发票。
            </el-form-item>
            <el-form-item label="整笔订单退款"></el-form-item>
            <el-form-item label="是否退回优惠券" prop="name7">
                <el-radio-group v-model="form.name7">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="是否退回优惠码" prop="name8">
                <el-radio-group v-model="form.name8">
                    <el-radio :label="3">是</el-radio>
                    <el-radio :label="6">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </div>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
    </el-form>
  </div>     
</template>

<script>
export default {
  name: 'afterSale',
  data() {
    return {
      currentTab: 'afterSale',
      form: {
            name1: '',
            name2: '',
            name3: '',
            name4: '',
            name5: '',
            name6: '',
            name7: '',
            name8: ''
        },
     rules: {
        name1: [
        // { required: true, message: '请输入活动名称', trigger: 'blur' },
        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
     },
     options: [
        {
          value: '1',
          label: '小时'
        }, 
        {
          value: '2',
          label: '分钟'
        }, 
     ]
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
      onSubmit(){},
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