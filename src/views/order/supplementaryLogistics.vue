<template>
    <div class="deliver-goods">
        <div class="deliver-goods-header">
            <div class="item">补填物流信息</div>
            <div class="item"><el-button>返 回</el-button></div>
        </div>
        <div class="container">
            <div class="container-item">
                <p>1. 选择您要进行补填物流的商品及数量</p>
                <div class="container-item-content">
                    <div class="title">
                        <div>
                            <span>商品清单</span>
                            <span>订单编号 {{orderInfo.code}}</span>
                        </div>
                    </div>
                    <div class="content">
                        <el-table
                            ref="table"
                            :data="tableData"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column
                                label="序号"
                                width="180">
                                <template slot-scope="scope">
                                    <span>{{scope.$index + 1}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="商品"
                                width="180">
                                <template slot-scope="scope">
                                    <div class="goods-detail">
                                        <div class="goods-detail-item">
                                            <img src="" alt="">
                                        </div>
                                        <div class="goods-detail-item">
                                            <p>{{scope.row.goodsName}}</p>
                                            <p>{{scope.row.goodsSpecs}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="goodsCount"
                                label="应发数量">
                            </el-table-column>
                            <!-- <el-table-column
                                prop="realityNumber"
                                label="可发货数量">
                            </el-table-column> -->
                            <el-table-column
                                prop="sendCount"
                                label="本次发货数量">
                                <template slot-scope="scope">
                                    <el-input :disabled="true" v-model="scope.row.goodsCount"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="container-item">
                <p>2.确认收发货信息</p>
                <div class="container-item-content">
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
                            <div class="value">{{orderInfo.receivedDetail}}</div>
                        </div>
                    </div>
                </div>
                <div class="container-item-content">
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
                            <div class="value">{{orderInfo.sendRemark}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-item">
                <p>3.填写物流信息</p>
                <div class="logistics">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="快递公司" prop="expressCompanys">
                            <el-select v-model="ruleForm.expressCompanyCode" placeholder="请选择">
                                <el-option :label="item.expressCompany" :value="item.expressCompanyCode" v-for="(item, index) in expressCompanyList" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="快递单号" prop="expressNos">
                            <el-input v-model="ruleForm.expressNos"></el-input>
                        </el-form-item>
                        <el-form-item label="物流备注" prop="remark">
                            <el-input
                                style="width: 623px;"
                                type="textarea"
                                :rows="2"
                                placeholder="非必填，请输入，不超过100个字符"
                                v-model="ruleForm.remark">
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="footer">
                <el-button class="border-button" @click="printingElectronicForm">打印电子面单</el-button>
                <el-button class="border-button" @click="printDistributionSheet">打印配送单</el-button>
                <el-button type="primary" @click="sendGoodsHandler">确定</el-button>
            </div>
        </div>
        <component v-if="dialogVisible" :is="currentDialog" :dialogVisible.sync="dialogVisible" :data="currentData" @submit="onSubmit" :sendGoods="sendGoods"></component>
    </div>
</template>
<script>
import ReceiveInformationDialog from '@/views/order/dialogs/receiveInformationDialog'

export default {
    data() {
        return {
            tableData: [
                {}
            ],
            multipleSelection: [],
            ruleForm: {
                name: '',
                number: '',
                remark: '',
                expressCompanyCode: '',
                expressCompany: '',
                expressNos: ''
            },
            rules: {

            },
            orderDetail: {},
            nameList: [],
            orderInfo: {},
            orderSendInfo: {},
            currentDialog: '',
            dialogVisible: false,
            currentData: {},
            expressCompanyList: [],
            sendGoods: ''
        }
    },
    created() {
        this.getOrderDetail()
        this.getExpressCompanyList()
    },
    computed: {
        afterSale() {
            if(this.$route.query.afterSale) {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        printDistributionSheet() {
            this.$router.push('/order/printDistributionSheet?ids=' + this.$route.query.id)
        },
        printingElectronicForm() {
            this.$router.push('/order/printingElectronicForm?ids=' + this.$route.query.id)
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
        sendGoodsHandler() {
            let params

            this.ruleForm.expressCompany = this.expressCompanyList.find(val => val.expressCompanyCode == this.ruleForm.expressCompanyCode).expressCompany

            params = {
                sendInfoDtoList: [
                    {
                        createTime: this.orderInfo.createTime,
                        createUserId: this.orderInfo.createUserId,
                        createUserName: this.orderInfo.createUserName,
                        updateTime: this.orderInfo.updateTime,
                        updateUserId: this.orderInfo.updateUserId,
                        updateUserName: this.orderInfo.updateUserName,
                        deleteFlag: this.orderInfo.deleteFlag,
                        userCache: this.orderInfo.userCache,
                        commodityCode: this.orderInfo.commodityCode,
                        id: this.orderInfo.id,
                        orderCode: this.orderInfo.orderCode,
                        memberSn: this.orderInfo.memberSn,
                        receivedName: this.orderInfo.receivedName,
                        receivedPhone: this.orderInfo.receivedPhone,
                        isAutoSend: this.orderInfo.isAutoSend,
                        status: this.orderInfo.status,
                        express_companys: this.ruleForm.expressCompany,
                        express_company_codes: this.ruleForm.expressCompanyCode,
                        express_nos: this.ruleForm.expressNos,
                        remark: this.orderInfo.remark,
                    }
                ],
            }
            this._apis.order.orderSendInfoFillUpExpress(params).then((res) => {
                this.$notify({
                    title: '成功',
                    message: '发货成功',
                    type: 'success'
                });
                this.$router.push('/order/deliverGoodsSuccess?id=' + this.$route.query.id + '&type=supplementaryLogistics')
            }).catch(error => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            })
        },
        changeReceivedInfo() {
            this.currentDialog = 'ReceiveInformationDialog'
            this.currentData = this.orderInfo
            this.sendGoods = 'received'
            this.dialogVisible = true
        },
        changeSendInfo() {
            this.currentDialog = 'ReceiveInformationDialog'
            this.currentData = this.orderInfo
            this.sendGoods = 'send'
            this.dialogVisible = true
        },
        onSubmit(value) {
            //this.getOrderDetail()
            this.orderInfo = Object.assign({}, this.orderInfo, value)
        },
        _orderDetail() {
            let id = this.$route.query.id

            this._apis.order.orderSendInfoFillUpExpressPage({ids: [this.$route.query.id]}).then((res) => {
                this.orderDetail = res[0]
                this.tableData = this.orderDetail.orderItemList
                this.orderInfo = res[0]
                this.orderSendInfo = res[0]
            }).catch(error => {

            })
        },
        afterSaleOrderDetail() {
            let id = this.$route.query.id

            this._apis.order.getOrderAfterSaleDetail({id}).then((res) => {
                this.orderDetail = res
                this.tableData = this.orderDetail.orderItems
                this.orderInfo = res.orderInfo
                this.orderSendInfo = res.orderSendInfo
            }).catch(error => {

            })
        },
        getOrderDetail() {
            if(this.afterSale) {
                this.afterSaleOrderDetail()
            } else {
                this._orderDetail()
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    },
    components: {
        ReceiveInformationDialog
    }
}
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
                                color: #9FA29F;
                            }
                        }
                    }
                }
            }
        }
    }
    /deep/ .el-input  {
        width: auto;
    }
    /deep/ .el-textarea {
        width: auto;
    }
    .footer {
        text-align: center;
        margin-top: 40px;
    }
</style>

