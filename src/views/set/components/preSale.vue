/*售前相关 */
<template>
  <div class="main">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <div class="item">
            <h2>自动关闭未付款订单：</h2>
            <el-form-item label="拍下未付款:" prop="name1">
                <el-input 
                v-model="form.name1" 
                style="width:260px;" 
                placeholder="当前未启动该功能，输入数值即生效">
                </el-input>
                <el-select 
                v-model="form.name2" 
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
            <el-form-item  prop="name2">
                <el-checkbox v-model="form.name3">快递发货</el-checkbox>
                选择计费方式：
                <el-radio-group v-model="form.name4">
                    <el-radio :label="1">组合运费（推荐）</el-radio>
                    <el-radio :label="2">按商品累计运费</el-radio>
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
            <el-form-item  prop="name7" label="下单">
                <el-input 
                v-model="form.name7" 
                style="width:260px;" 
                placeholder="当前未启动该功能，输入数值即生效">
                </el-input>
                <el-select 
                v-model="form.name8" 
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
            <el-button type="primary" @click="onSubmit">保存</el-button>
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