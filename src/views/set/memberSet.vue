/*会员设置 */
<template>
    <div class="main">
        <h1>成为老会员条件：</h1>
        <el-form ref="form" :model="form" :rules="rules">
            <el-form-item label="新会员交易次数达到" prop="num">
                <el-input 
                v-model="form.num" 
                style="width:200px;" 
                placeholder="请输入阿拉伯数字进行设置">
                </el-input>
                即为老会员
                <span class="note">（交易次数：已付款订单数量）</span>
            </el-form-item>
            <el-form-item class="mtb200">
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'memberSet',
  data() {
    return {
        form:{
            num:''
        },
        rules:{
            num:[
                { required: true, message: '请输入阿拉伯数字进行设置', trigger: 'blur' }
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
.note{
    font-size: 12px;
    color: #92929B;
}
.mtb200{
    margin: 200px 0;
}
</style>