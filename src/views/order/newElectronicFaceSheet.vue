<template>
  <div class="new-electronic-faceSheet">
    <div v-if="!$route.query.detail" class="title">{{$route.query.id ? '编辑' : '新建'}}电子面单</div>
    <div class="content">
      <div class="row justify-between">
        <div class="col content-lefter">
          <el-form
            :disabled="$route.query.detail"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="ruleForm"
          >
            <el-form-item label="电子面单名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="快递公司" prop="expressCompanyCode">
              <el-select v-model="ruleForm.expressCompanyCode" placeholder="请选择">
                <el-option
                    v-for="item in expressCompanyList"
                    :key="item.id"
                    :label="item.expressCompany"
                    :value="item.expressCompanyCode">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="邮费支付" prop="payType">
              <el-select v-model="ruleForm.payType" placeholder="请选择">
                <el-option
                    v-for="item in postagePaymentList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="快递公司账号" prop="expressCompanyAccount">
                <el-input v-model="ruleForm.expressCompanyAccount" placeholder="请输入，不超过20个字符"></el-input>
                <span class="account-explain">查看账号说明</span>
            </el-form-item>
            <el-form-item label="密码" prop="expressCompanyPassword">
                <el-input show-password v-model="ruleForm.expressCompanyPassword" placeholder="请输入，不超过20个字符"></el-input>
            </el-form-item>
            <el-form-item v-if="!$route.query.detail">
                <el-button>取 消</el-button>
                <el-button type="primary" @click="submit">提 交</el-button>
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
                name: '',
                expressCompany: '',
                expressCompanyAccount: '',
                expressCompanyPassword: '',
                expressCompanyCode: '',
                payType: ''
            },
            rules: {

            },
            expressCompanyList: [],
            postagePaymentList: [
              {
                label: '请选择',
                value: ''
              },
              {
                label: '现付',
                value: '1'
              },
              {
                label: '到付',
                value: '2'
              },
              {
                label: '月结',
                value: '3'
              },
              {
                label: '第三方支付（仅顺丰支持）',
                value: '4'
              },
            ]
        }
    },
    created() {
      this.getExpressCompanyList()
      if(this.$route.query.id) {
        this.getDetail()
      }
    },
    methods: {
      getExpressCompanyList() {
        this._apis.order
        .fetchExpressCompanyList()
        .then(res => {
          this.expressCompanyList = res
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: error
          });
        });
      },
      editor() {
        let expressCompanyCode = this.ruleForm.expressCompanyCode
        let expressCompany = this.expressCompanyList.find(val => val.expressCompanyCode == expressCompanyCode).expressCompany

        this.ruleForm.expressCompany = expressCompany
        this._apis.order
        .editorElectronicFaceSheet(this.ruleForm)
        .then(res => {
          this.$notify({
            title: "成功",
            message: "编辑成功！",
            type: "success"
          });
        })
        .catch(error => {
          this.visible = false;
          this.$notify.error({
            title: "错误",
            message: error
          });
        });
      },
      add() {
        let expressCompanyCode = this.ruleForm.expressCompanyCode
        let expressCompany = this.expressCompanyList.find(val => val.expressCompanyCode == expressCompanyCode).expressCompany

        this.ruleForm.expressCompany = expressCompany
        this._apis.order
        .addElectronicFaceSheet(this.ruleForm)
        .then(res => {
          this.$notify({
            title: "成功",
            message: "添加成功！",
            type: "success"
          });
          this.$router.push('/order/electronicFaceSheet')
        })
        .catch(error => {
          this.visible = false;
          this.$notify.error({
            title: "错误",
            message: error
          });
        });
      },
      submit() {
        if(!this.$route.query.id) {
          this.add()
        } else {
          this.editor()
        }
      },
      getDetail() {
        this._apis.order
        .getElectronicFaceSheetDetail({expressCompanyCode: this.$route.query.id})
        .then(res => {
          console.log(res)
          this.ruleForm = Object.assign({}, res)
        })
        .catch(error => {
          this.visible = false;
          this.$notify.error({
            title: "错误",
            message: error
          });
        });
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


