/*支付方式 */
<template>
    <div class="main">
        <div class="pay_item">
          <div class="left_cont">
            <img src="@/assets/images/set/set-pay1.png"/>
            <div class="note">
              <h3>微信支付</h3>
              <p>资金结算至店铺余额，结算微信会扣除对应的交易手续费</p>
            </div>
          </div>
          <div class="right_cont">
            <el-switch
              v-model="value1"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
            <a class="wxinfo_set" @click="dialogVisible = true">设置支付信息</a>
          </div>
        </div>
        <div class="pay_item">
          <div class="left_cont">
            <img src="@/assets/images/set/set-pay2.png"/>
            <div class="note">
              <h3>微信支付</h3>
              <p>资金结算至店铺余额，结算微信会扣除对应的交易手续费</p>
            </div>
          </div>
          <div class="right_cont">
            <el-switch
              v-model="value2"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </div>
        </div>
        <div class="pay_item">
          <div class="left_cont">
            <img src="@/assets/images/set/set-pay3.png"/>
            <div class="note">
              <h3>微信支付</h3>
              <p>资金结算至店铺余额，结算微信会扣除对应的交易手续费</p>
            </div>
          </div>
          <div class="right_cont">
            <el-switch
              v-model="value3"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </div>
        </div>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%">
          <span>未设置支付信息</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="_routeTo('wxSet')">去设置</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </span>
        </el-dialog>
    </div>    
</template>

<script>
export default {
  name: 'payType',
  data() {
    return {
      value1:'',
      value2:'',
      value3:'',
      dialogVisible:false
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
    
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.main{
  width: 100%;
  background: #fff;
  padding: 20px 20px 300px 20px;
}
.pay_item{
  width: 100%;
  border-radius: 10px;
  background: #F5F5F5;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .left_cont{
    display: flex;
    img{
      width: 40px;
      height: 40px;
    }
    .note{
      font-size: 14px;
      color: #3D434A;
      margin-left: 15px;
      h3{
        font-weight:500;
      }
      p{
        font-weight:400;
        line-height: 25px;
      }
    }
  }
  .right_cont{
    width: 100px;
    text-align: right;
    .wxinfo_set{
      font-size: 14px;
      color: #655EFF;
      display: block;
      margin-top: 10px;
    }
  }
}
</style>