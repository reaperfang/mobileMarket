<template>
  <div class="bulk-delivery">
    <div class="title">订单批量发货</div>
    <div class="container">
      <section>
        <div class="title">1. 选择您要进行发货的商品并填写物流信息</div>
        <div class="goods-item" v-for="(item, index) in list" :key="index">
          <div class="item-title">
            <span>商品清单</span>
            <span>订单编号 {{item.orderCode}}</span>
          </div>
          <div class="item-content">
            <div class="row align-center table-title">
              <div class="col" style="width: 660px;">
                <div class="row align-center row-margin">
                  <div class="col">
                    <i class="checkbox"></i>
                  </div>
                  <div class="col" style="width: 380px;">商品</div>
                  <div class="col" style="width: 60px;">应发数量</div>
                  <div class="col">本次发货数量</div>
                </div>
              </div>
              <div class="col">
                <div class="row align-center row-margin">
                  <div class="col" style="width: 180px;">收货信息</div>
                  <div class="col">查看物流</div>
                </div>
              </div>
            </div>
            <div class="row align-center table-container">
              <div class="col" style="width: 660px; flex-shrink: 0;">
                <div
                  class="row align-center row-margin"
                  v-for="(goods, i) in item.orderItemList"
                  :key="i"
                >
                  <div class="col">
                    <i @click="select(index, i)" class="checkbox" :class="{checked: goods.checked}"></i>
                  </div>
                  <div class="col" style="width: 380px;">
                    <div class="row align-center">
                      <div class="col">
                        <img :src="goods.goodsImage" alt />
                      </div>
                      <div class="col">
                        <p>{{goods.goodsName}}</p>
                        <p>{{goods.goodsSpecs}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col" style="width: 60px;">{{goods.goodsCount}}</div>
                  <div class="col" style="width: 100px;">
                    <el-input :disabled="true" v-model="goods.goodsCount" placeholder="请输入"></el-input>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="row row-margin">
                  <div class="col" style="width: 180px;">
                    <p>收货人: {{item.receivedName}}</p>
                    <p>联系电话: {{item.receivedPhone}}</p>
                    <p>收货地址: {{item.receivedDetail}}</p>
                  </div>
                  <div class="col">
                    <el-form :model="item" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="快递公司" prop="expressCompanys">
                            <el-select v-model="item.expressCompanyCodes" placeholder="请选择">
                                <el-option :label="item.expressCompany" :value="item.expressCompanyCode" v-for="(item, index) in expressCompanyList" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="快递单号" prop="expressNos">
                            <el-input v-model="item.expressNos"></el-input>
                        </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="container-item">
          <p>2.确认发货信息</p>
          <div class="container-item-content">
            <div class="title">
              <div class="title-list">
                <i class="deliver-icon"></i>
                <span>发货信息</span>
              </div>
              <div @click="changeSendInfo" class="blue pointer">修改发货信息</div>
            </div>
            <div class="content">
              <div class="item">
                <div class="label">发货人</div>
                <div class="value">{{list[0] && list[0].sendName}}</div>
              </div>
              <div class="item">
                <div class="label">联系电话</div>
                <div class="value">{{list[0] && list[0].sendPhone}}</div>
              </div>
              <div class="item">
                <div class="label">发货信息</div>
                <div class="value">{{list[0] && list[0].sendDetail}}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div class="footer">
          <el-button class="border-button" @click="printingElectronicForm">打印电子面单</el-button>
          <el-button class="border-button" @click="printDistributionSheet">打印配送单</el-button>
          <el-button @click="sendGoodsHandler" type="primary">确定</el-button>
      </div>
    </div>
    <component v-if="dialogVisible" :is="currentDialog" :dialogVisible.sync="dialogVisible" :data="currentData" @submit="onSubmit" :sendGoods="sendGoods" :title="title"></component>
  </div>
</template>
<script>
import ReceiveInformationDialog from '@/views/order/dialogs/receiveInformationDialog'

export default {
  data() {
    return {
      list: [

      ],
      currentDialog: '',
      dialogVisible: false,
      currentData: '',
      sendGoods: '',
      title: '',
      expressCompanyList: [],
    };
  },
  created() {
    this.getDetail();
    this.getExpressCompanyList()
  },
  methods: {
    printingElectronicForm() {
      this.$router.push('/order/printingElectronicForm?ids=' + this.$route.query.ids)
    },
    printDistributionSheet() {
      this.$router.push('/order/printDistributionSheet?ids=' + this.$route.query.ids)
    },
      sendGoodsHandler() {
          try {
              let params

            params = {
                sendInfoDtoList: this.list.map(item => {
                    let expressCompanys = ''
                    console.log(this.expressCompanyList)
                    if(this.expressCompanyList.find(val => val.expressCompanyCode == item.expressCompanyCodes)) {
                        expressCompanys = this.expressCompanyList.find(val => val.expressCompanyCode == item.expressCompanyCodes).expressCompany
                    }

                    return {
                        createTime: item.createTime,
                        createUserId: item.createUserId,
                        createUserName: item.createUserName,
                        updateTime: item.updateTime,
                        updateUserId: item.updateUserId,
                        updateUserName: item.updateUserName,
                        deleteFlag: item.deleteFlag,
                        userCache: item.userCache,
                        commodityCode: item.commodityCode,
                        id: item.id,
                        orderCode: item.orderCode,
                        memberSn: item.memberSn,
                        receivedName: item.receivedName,
                        receivedPhone: item.receivedPhone,
                        isAutoSend: item.isAutoSend,
                        status: item.status,
                        express_companys: expressCompanys,
                        express_company_codes: item.expressCompanyCodes,
                        express_nos: item.expressNos,
                        remark: item.remark,
                    }
                })
            }
            this._apis.order.orderSendInfoFillUpExpress(params).then((res) => {
                this.$notify({
                    title: '成功',
                    message: '发货成功',
                    type: 'success'
                });
                this.$router.push('/order/deliverGoodsSuccess?id=' + this.$route.query.id + '&type=batchSupplementaryLogistics')
            }).catch(error => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            })
          }catch(e) {
              console.error(e)
          }
        },
      select(index, i) {
          try {
              let _list = JSON.parse(JSON.stringify(this.list))

              _list[index].orderItemList[i].checked = !_list[index].orderItemList[i].checked

              this.list = _list
          }catch(e) {

          }
      },
      getExpressCompanyList() {
        this._apis.order.fetchExpressCompanyList().then((res) => {
            this.expressCompanyList = res
        }).catch(error => {
            this.visible = false
            this.$notify.error({
                title: '错误',
                message: error
            });
        })
    },
      onSubmit(value) {
          // if(this.isReceived) {
          //       let obj = {}
          //       for(let i in value) {
          //           obj['received' + i] = value[i]
          //       }

          //       this.list.map((val, index) => {
          //           this.list.splice(index, 1, Object.assign({}, this.list[index], obj))
          //       })
          //   } else {
          //        let obj = {}
          //       for(let i in value) {
          //           obj['send' + i] = value[i]
          //       }

          //       this.list.map((val, index) => {
          //           console.log(obj)
          //           let listi = JSON.parse(JSON.stringify(this.list[index]))

          //           listi.orderAfterSaleSendInfo = Object.assign({}, listi.orderAfterSaleSendInfo, obj)
          //           this.list.splice(index, 1, listi)
          //       })
          //   }
          let _list = JSON.parse(JSON.stringify(this.list))

          _list.forEach((val, index) => {
            _list[index] = Object.assign({}, val, value)
          })

          this.list = _list
      },
      changeSendInfo() {
            this.currentDialog = 'ReceiveInformationDialog'
            this.currentData = this.list[0].orderAfterSaleSendInfo
            this.isReceived = false
            this.title = '修改发货信息'
            this.sendGoods = 'send'
            this.dialogVisible = true
        },
    getDetail() {
      this._apis.order
        .orderSendInfoFillUpExpressPage({
          ids: this.$route.query.ids.split(",").map(val => +val)
        })
        .then(res => {
          console.log(res)
          res.forEach(val => {
              val.orderItemList.forEach(goods => {
                  goods.checked = false
              })
          })
          this.list = res;
        })
        .catch(error => {
          this.visible = false;
          this.$notify.error({
            title: "错误",
            message: error
          });
        });
    }
  },
  components: {
      ReceiveInformationDialog
  }
};
</script>
<style lang="scss" scoped>
.bulk-delivery {
  background-color: #fff;
  padding: 20px;
  > .title {
    font-size: 16px;
  }
  .container {
    padding-top: 20px;
    padding-left: 60px;
    section {
      .goods-item {
        margin-top: 20px;
        border-radius: 10px;
        border: 1px solid rgba(211, 211, 211, 1);
        .item-title {
          background-color: rgb(243, 244, 244);
          padding: 20px;
          border-radius: 10px 10px 0 0;
        }
        .item-content {
          padding: 20px;
          .checkbox {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url(../../assets/images/order/checkbox.png) no-repeat;
          }
          .checkbox.checked {
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url(../../assets/images/order/checkbox-checked.png) no-repeat;
          }
          .row-margin > .col {
            margin-right: 25px;
          }
        }
      }
    }
  }
}
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
</style>