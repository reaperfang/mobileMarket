<template>
  <div class="deliver-goods">
    <div class="deliver-goods-header">
      <div class="item">发货</div>
      <div class="item">
        <el-button @click="$router.go(-1)">返 回</el-button>
      </div>
    </div>
    <div class="container">
      <div class="container-item">
        <p class="deliver-goods-number">1. 选择您要进行发货的商品及数量</p>
        <div class="container-item-content deliver-goods-list">
          <div class="title">
            <div>
              <span>商品清单</span>
              <span>订单编号 {{orderInfo.orderCode}}</span>
            </div>
          </div>
          <div class="content">
            <el-table
              ref="table"
              :data="tableData"
              style="width: 100%"
              @selection-change="handleSelectionChange"
              :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
            >
              <el-table-column 
                type="selection" 
                width="55"
                :selectable="selectable"
              ></el-table-column>
              <el-table-column label="序号" width="180">
                <template slot-scope="scope">
                  <span>{{scope.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column label="商品" width="380">
                <template slot-scope="scope">
                  <div class="goods-detail">
                    <div class="goods-detail-item">
                      <img width="70" :src="scope.row.goodsImage" alt />
                    </div>
                    <div class="goods-detail-item">
                      <p class="ellipsis">{{scope.row.goodsName}}</p>
                      <p>{{scope.row.goodsSpecs | goodsSpecsFilter}}</p>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="goodsCount" label="应发数量">
                <template slot-scope="scope">{{scope.row.goodsCount - scope.row.cacheSendCount}}</template>
              </el-table-column>
              <!-- <el-table-column
                                prop="realityNumber"
                                label="可发货数量">
              </el-table-column>-->
              <el-table-column prop="sendCount" label="本次发货数量">
                <template slot-scope="scope">
                  <el-input
                    :disabled="scope.row.goodsCount - scope.row.cacheSendCount == 0"
                    type="number"
                    :max="scope.row.goodsCount - scope.row.cacheSendCount"
                    min="1"
                    v-model="scope.row.sendCount"
                  ></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="container-item">
        <p>2.确认收发货信息</p>
        <div class="container-item-content deliver-goods-address">
          <div class="title">
            <div class="title-list">
              <i class="take-in-icon"></i>
              <span>收货信息</span>
            </div>
            <div class="blue pointer" @click="changeReceivedInfo">修改收货信息</div>
          </div>
          <div class="content">
            <div class="item">
              <div class="label">收货人</div>
              <div class="value">{{orderInfo.receivedName}}</div>
            </div>
            <div class="item">
              <div class="label">联系电话</div>
              <div class="value">{{orderInfo.receivedPhone}}</div>
            </div>
            <div class="item">
              <div class="label">收货信息</div>
              <div class="value">{{orderInfo.receivedProvinceName}} {{orderInfo.receivedCityName}} {{orderInfo.receivedAreaName}} {{orderInfo.receivedDetail}}</div>
            </div>
          </div>
        </div>
        <div class="container-item-content deliver-goods-address">
          <div class="title">
            <div class="title-list">
              <i class="deliver-icon"></i>
              <span>发货信息</span>
            </div>
            <div class="blue pointer" @click="changeSendInfo">修改发货信息</div>
          </div>
          <div class="content">
            <div class="item">
              <div class="label">发货人</div>
              <div class="value">{{orderInfo.sendName}}</div>
            </div>
            <div class="item">
              <div class="label">联系电话</div>
              <div class="value">{{orderInfo.sendPhone}}</div>
            </div>
            <div class="item">
              <div class="label">发货信息</div>
              <div class="value">{{orderInfo.sendProvinceName}} {{orderInfo.sendCityName}} {{orderInfo.sendAreaName}} {{orderInfo.sendDetail}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-item">
        <p>3.填写物流信息</p>
        <div class="logistics deliver-goods-logistics">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="快递公司" prop="expressCompanyCode" :class="{'is-disabled': !express}">
              <el-select filterable @change="checkExpress" v-model="ruleForm.expressCompanyCode" placeholder="请选择">
                <el-option
                  :label="item.expressCompany"
                  :value="item.expressCompanyCode"
                  v-for="(item, index) in expressCompanyList"
                  :key="index"
                ></el-option>
              </el-select>
              <el-input v-if="ruleForm.expressCompanyCode == 'other'" v-model="ruleForm.other" placeholder="请输入快递公司名称"></el-input>
            </el-form-item>
            <el-form-item label="快递单号" prop="expressNos" :class="{'is-disabled': !express}">
              <el-input :disabled="!express" v-model="ruleForm.expressNos"></el-input>
            </el-form-item>
            <el-form-item label="物流备注" prop="sendRemark">
              <el-input
                style="width: 623px;"
                type="textarea"
                :rows="2"
                maxlength="100"
                placeholder="非必填，请输入，不超过100个字符"
                v-model="ruleForm.sendRemark"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="footer">
        <el-button :loading="sending" type="primary" @click="sendGoodsHandler('ruleForm')">发 货</el-button>
      </div>
    </div>
    <component
      v-if="dialogVisible"
      :is="currentDialog"
      :dialogVisible.sync="dialogVisible"
      :data="currentData"
      @submit="onSubmit"
      :sendGoods="sendGoods"
      :title="title"
    ></component>
  </div>
</template>
<script>
import ReceiveInformationDialog from "@/views/order/dialogs/receiveInformationDialog";

export default {
  data() {
    var expressCompanyCodeValidator = (rule, value, callback) => {
          if(this.ruleForm.expressCompanyCode != 'other') {
              if(!this.ruleForm.expressCompanyCode) {
                  callback(new Error('请选择快递公司'));
              } else {
                  callback();
              }
          } else {
              if(!this.ruleForm.other || /^\s+$/.test(this.ruleForm.other)) {
                callback(new Error('请输入快递公司名称'));
              } else {
                callback();
              }
          }
      };
    return {
      tableData: [],
      multipleSelection: [],
      ruleForm: {
        name: "",
        number: "",
        remark: "",
        sendRemark: '',
        expressCompanyCode: "",
        expressCompany: "",
        other: ''
      },
      rules: {
        expressCompanyCode: [
          { validator: expressCompanyCodeValidator, trigger: "blur" }
        ]
      },
      orderDetail: {},
      nameList: [],
      orderInfo: {},
      orderSendInfo: {},
      currentDialog: "",
      dialogVisible: false,
      currentData: {},
      expressCompanyList: [],
      sendGoods: "",
      title: "",
      express: true,
      sending: false
    };
  },
  created() {
    this.getOrderDetail();
    this.getExpressCompanyList();
  },
  filters: {
    goodsSpecsFilter(value) {
      let _value;
      if (!value) return "";
      if (typeof value == "string") {
        _value = JSON.parse(value);
      }
      let str = "";
      for (let i in _value) {
        if (_value.hasOwnProperty(i)) {
          str += i + ":";
          str += _value[i] + ",";
        }
      }
      str = str.replace(/(^.*)\,$/, '$1')
      return str;
    }
  },
  computed: {
    afterSale() {
      if (this.$route.query.afterSale) {
        return true;
      } else {
        return false;
      }
    },
    cid() {
      let shopInfo = JSON.parse(localStorage.getItem("shopInfos"));
      return shopInfo.id;
    }
  },
  methods: {
    selectable(row, index) {
      if(row.goodsCount - row.cacheSendCount == 0) {
        return false
      }
      return true
    },
    checkExpress() {
      let expressName

      if(this.ruleForm.expressNos) {
        this.ruleForm.expressNos = ''
      }
      if(this.ruleForm.other) {
        this.ruleForm.other = ''
      }
      if(this.ruleForm.expressCompanyCode == 'other') {
            expressName = 'other'
          } else {
            expressName = this.expressCompanyList.find(
              val => val.expressCompanyCode == this.ruleForm.expressCompanyCode
            ).expressCompany;
          }
      this._apis.order
        .checkExpress({expressName})
        .then(res => {
          this.express = res;
          if(this.express) {
              this.$set(this.rules, "expressNos", [
                { required: true, message: "请输入快递单号", trigger: "blur" }
              ]);
          } else {
            this.$set(this.rules, "expressNos", [
                { required: false, message: "请输入快递单号", trigger: "blur" }
              ]);

          }
        })
        .catch(error => {
          this.visible = false;
          this.$notify.error({
            title: "错误",
            message: error
          });
        });
    },
    fetchOrderAddress() {
      this._apis.order
        .fetchOrderAddress({ id: this.cid, cid: this.cid })
        .then(res => {
          this.orderInfo.sendName = res.senderName;
          this.orderInfo.sendPhone = res.senderPhone;
          this.orderInfo.sendProvinceCode = res.provinceCode;
          this.orderInfo.sendProvinceName = res.province;
          this.orderInfo.sendCityCode = res.cityCode;
          this.orderInfo.sendCityName = res.city;
          this.orderInfo.sendAreaCode = res.areaCode;
          this.orderInfo.sendAreaName = res.area;
          this.orderInfo.sendDetail = res.address;
        })
        .catch(error => {
          this.visible = false;
          this.$notify.error({
            title: "错误",
            message: error
          });
        });
    },
    getExpressCompanyList() {
      this._apis.order
        .getElectronicFaceSheetExpressCompanyList()
        .then(res => {
          res.forEach(val => {
            val.expressCompanyCode = val.expressCode
            val.expressCompany = val.expressName
          })
          res.push({
            expressCompanyCode: 'other',
            expressCompany: '其他'
          })
          this.expressCompanyList = res;
        })
        .catch(error => {
          this.visible = false;
          this.$notify.error({
            title: "错误",
            message: error
          });
        });
    },
    // 订单详情 orderId
    // 电子面单 orderId
    // 配送单 id
    sendGoodsHandler(formName) {
      if (!this.multipleSelection.length) {
        this.confirm({
          title: "提示",
          icon: true,
          text: "请选择需要发货的商品"
        });
        return;
      }

      if (this.multipleSelection.some(val => !val.sendCount)) {
        this.confirm({
          title: "提示",
          icon: true,
          text: "请填写发货商品数量"
        });
        return;
      }

      if (this.multipleSelection.some(val => +val.sendCount > val.goodsCount)) {
        this.confirm({
          title: "提示",
          icon: true,
          text: "本次发货数量不能大于应发数量"
        });
        return;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params;

          // if(!this.ruleForm.expressCompanyCode) {
          //     this.confirm({title: '提示', icon: true, text: '请选择快递公司'})
          //     return
          // }

          if(this.ruleForm.expressCompanyCode == 'other') {
            this.ruleForm.expressCompany = this.ruleForm.other
          } else {
            this.ruleForm.expressCompany = this.expressCompanyList.find(
              val => val.expressCompanyCode == this.ruleForm.expressCompanyCode
            ).expressCompany;
          }

          this.sending = true

          params = {
            sendInfoDtoList: [
              {
                orderId: this.$route.query.orderId || this.$route.query.id, // 订单id
                memberInfoId: this.orderInfo.memberInfoId,
                orderCode: this.orderInfo.orderCode,
                orderItems: this.multipleSelection.map(val => ({
                  id: val.id,
                  sendCount: val.sendCount
                })), // 发货的商品列表
                id: this.orderInfo.id,
                memberSn: this.orderInfo.memberSn,
                receivedName: this.orderInfo.receivedName,
                receivedPhone: this.orderInfo.receivedPhone,
                receivedProvinceCode: this.orderInfo.receivedProvinceCode,
                receivedProvinceName: this.orderInfo.receivedProvinceName,
                receivedCityCode: this.orderInfo.receivedCityCode,
                receivedCityName: this.orderInfo.receivedCityName,
                receivedAreaCode: this.orderInfo.receivedAreaCode,
                receivedAreaName: this.orderInfo.receivedAreaName,
                receivedDetail: this.orderInfo.receivedDetail,
                sendName: this.orderInfo.sendName, // 发货人名称
                sendPhone: this.orderInfo.sendPhone, // 发货人手机号
                sendProvinceCode: this.orderInfo.sendProvinceCode, // 发货省cdoe
                sendProvinceName: this.orderInfo.sendProvinceName, // 发货省名称
                sendCityCode: this.orderInfo.sendCityCode, // 发货城市code
                sendCityName: this.orderInfo.sendCityName, // 发货城市名称
                sendAreaCode: this.orderInfo.sendAreaCode, // 发货区县code
                sendAreaName: this.orderInfo.sendAreaName, // 发货区县名称
                sendDetail: this.orderInfo.sendDetail, // 发货人详细地址
                expressCompanys: this.ruleForm.expressCompany, // 快递公司名称
                expressNos: this.ruleForm.expressNos, // 快递单号
                expressCompanyCodes: this.ruleForm.expressCompanyCode, // 快递公司编码
                remark: this.ruleForm.remark, // 发货备注
                sendRemark: this.ruleForm.sendRemark // 发货备注
              }
            ]
          };

          this._apis.order
            .orderSendGoods(params)
            .then(res => {
              this.$notify({
                title: "成功",
                message: "发货成功",
                type: "success"
              });
              this.sending = false
              // this.$router.push(
              //   "/order/deliverGoodsSuccess?id=" +
              //     res.success[0].expressParameter.orderSendInfo.id +
              //     "&type=deliverGoods"
              // );
              this.$router.push({
                path: '/order/deliverGoodsSuccess',
                query: {
                  id: res.success[0].expressParameter.orderSendInfo.id,
                  orderId: res.success[0].expressParameter.orderSendInfo.orderId,
                  type: 'deliverGoods',
                  print: this.express
                }
              })
            })
            .catch(error => {
              this.$notify.error({
                title: "错误",
                message: error
              });
              this.sending = false
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changeReceivedInfo() {
      this.currentDialog = "ReceiveInformationDialog";
      this.currentData = this.orderInfo;
      this.sendGoods = "received";
      this.title = "修改收货信息";
      this.dialogVisible = true;
    },
    changeSendInfo() {
      this.currentDialog = "ReceiveInformationDialog";
      this.currentData = this.orderInfo;
      this.sendGoods = "send";
      this.title = "修改发货信息";
      this.dialogVisible = true;
    },
    onSubmit(value) {
      this.orderInfo = Object.assign({}, this.orderInfo, value);
    },
    _orderDetail() {
      let id = this.$route.query.id;

      this._apis.order
        .orderSendDetail({ ids: [this.$route.query.id] })
        .then(res => {
          res[0].orderItemList.forEach(val => {
            val.cacheSendCount = val.sendCount;
            val.sendCount = val.goodsCount - val.sendCount;
          });
          this.tableData = res[0].orderItemList;
          this.orderInfo = res[0];

          this.fetchOrderAddress();
        })
        .catch(error => {});
    },
    getOrderDetail() {
      this._orderDetail();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  components: {
    ReceiveInformationDialog
  }
};
</script>
<style lang="scss" scoped>
.deliver-goods {
  .blue {
    color: $globalMainColor;
  }
  background-color: #fff;
  padding: 20px;
  .deliver-goods-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
  }
  .container {
    padding-left: 60px;
    .container-item {
      margin-top: 20px;
      p {
        margin-bottom: 20px;
      }
      .container-item-content {
        border: 1px solid rgb(202, 207, 203);
        border-radius: 5px;
        margin-bottom: 20px;
        .title {
          display: flex;
          justify-content: space-between;
          height: 60px;
          line-height: 60px;
          background-color: rgb(243, 244, 244);
          border-radius: 5px 5px 0 0;
          padding: 0 20px;
          .title-list {
            display: flex;
            align-items: center;
            i {
              width: 22px;
              height: 22px;
              display: inline-block;
              margin-right: 9px;
            }
          }
          .deliver-icon {
            background: url(../../assets/images/order/deliver.png);
          }
          .take-in-icon {
            background: url(../../assets/images/order/take-in-icon.png);
          }
        }
        .content {
          padding: 20px;
          .item {
            display: flex;
            .label {
              margin-right: 20px;
            }
            .value {
              color: #9fa29f;
            }
          }
        }
      }
    }
  }
}
/deep/ .el-input {
  width: auto;
}
/deep/ .el-textarea {
  width: auto;
}
.footer {
  text-align: center;
  margin-top: 40px;
}
/deep/ label[for="expressCompanyCode"]::before {
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
}
/deep/ .el-form-item.is-disabled {
  .el-form-item__error {
    display: none;
  }
  .el-input__inner {
    border: 1px solid #DCDFE6;
  }
}
</style>

