<template>
  <div class="new-electronic-faceSheet">
    <div class="title">新建电子面单</div>
    <div class="content">
      <div class="row justify-between">
        <div class="col content-lefter">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="ruleForm"
          >
            <el-form-item label="电子面单名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="快递公司" prop="expressCompany">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                    v-for="item in expressCompanyList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="邮费支付" prop="postagePayment">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                    v-for="item in postagePaymentList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="快递公司账号" prop="account">
                <el-input v-model="ruleForm.account" placeholder="请输入，不超过20个字符"></el-input>
                <span class="account-explain">查看账号说明</span>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input show-password v-model="ruleForm.password" placeholder="请输入，不超过20个字符"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button>取 消</el-button>
                <el-button type="primary">提 交</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="col content-righter">
            <div class="title">电子面单样例</div>
            <div class="image-box">
                <img src="../../assets/images/order/electronic-face-sheet.png" alt="">
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            ruleForm: {
                name: ''
            },
            rules: {

            },
            expressCompanyList: [],
            postagePaymentList: []
        }
    }
};
</script>
<style lang="scss" scoped>
.new-electronic-faceSheet {
  background-color: #fff;
  padding: 20px;
  .title {
    font-size: 16px;
    color: #161617;
    margin-bottom: 30px;
  }
  .content {
    .content-lefter {
      width: 50%;
      border-right: 1px solid #cacfcb;
      .account-explain {
        margin-left: -96px;
        color: $globalMainColor;
      }
      /deep/ .el-input {
          width: auto;
      }
    }
    .content-righter {
      width: 50%;
      padding-left: 50px;
      .title {
          margin-bottom: 20px;
      }
      .image-box {
          padding-left: 30px;
      }
    }
  }
}
</style>


