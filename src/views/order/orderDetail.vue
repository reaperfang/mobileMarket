<template>
    <div class="order-detail">
        <div class="header">
            <div class="lefter">
                <span>订单编号：{{orderDetail.orderInfo.code}} | </span>
                <span>{{orderDetail.orderInfo.channelInfoId}} | </span>
                <span>{{orderDetail.orderInfo.sendType}} | </span>
                <span>拼团编号：{{orderDetail.orderInfo.assembleCode}}</span>
            </div>
            <div class="righter">
                <img src="../../assets/images/order/customerImg.png" alt="">
                <span>客户ID：{{orderDetail.orderInfo.memberSn}}</span>
            </div>
        </div>
        <orderState :orderState="orderDetail.orderInfo.orderStatus" :payWay="orderDetail.orderInfo.payWay" :closeReaosn="orderDetail.orderInfo.closeReaosn" class="order-state"></orderState>
        <div class="message">
            <el-tabs v-model="activeName">
                <el-tab-pane label="订单信息" name="order">
                    <orderInformation :orderInfo="orderDetail.orderInfo" @getDetail="getDetail"></orderInformation>
                </el-tab-pane>
                <el-tab-pane label="发货信息" name="delivery">
                    <deliveryInformation></deliveryInformation>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="goods-list">
            <p class="header">订单清单</p>
            <el-table
                :data="orderDetail.orderItems"
                style="width: 100%">
                <el-table-column
                    label="商品"
                    width="180">
                    <template slot-scope="scope">
                        <div class="goods-detail">
                            <div class="item">
                                <img :src="scope.row.goodsImage" alt="">
                            </div>
                            <div class="item">
                                <p>{{scope.row.goodsName}}</p>
                                <p>{{scope.row.goodsSpecs}}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="goodsUnit"
                    label="单位"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="goodsCount"
                    label="数量">
                </el-table-column>
                <el-table-column
                    label="商品单价">
                    <template slot-scope="scope">
                        ¥{{scope.row.goodsPrice}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="商品小计">
                    <template slot-scope="scope">
                        ¥{{scope.row.subtotalMoney}}
                    </template>
                </el-table-column>
            </el-table>
            <div class="goods-list-message">
                <div class="item">
                    <div class="label">运费：</div>
                    <div class="value">¥{{orderDetail.orderInfo.freight}}</div>
                </div>
                <div class="item">
                    <div class="label">应收金额：</div>
                    <div class="value">¥{{orderDetail.orderInfo.receivableMoney}}</div>
                </div>
                <div class="item">
                    <div class="label">优惠券金额：</div>
                    <div class="value">
                        {{goodsListMessage.coupon}}
                        <i @click="currentDialog = 'CouponDialog'; dialogVisible = true" class="coupon-img"></i>
                    </div>
                </div>
                <div class="item">
                    <div class="label">满减/满折：</div>
                    <div class="value">¥{{orderDetail.orderInfo.discountMoney}}</div>
                </div>
                <div class="item">
                    <div class="label">会员折扣：</div>
                    <div class="value">¥{{orderDetail.orderInfo.memberDiscountMoney}}</div>
                </div>
                <div class="item">
                    <div class="label">优惠套装：</div>
                    <div class="value">¥{{orderDetail.orderInfo.discountPackageMoney}}</div>
                </div>
                <div class="item">
                    <div class="label">满包邮：</div>
                    <div class="value">¥{{orderDetail.orderInfo.discountFreight}}</div>
                </div>
                <div class="item reduce-price">
                    <el-select style="margin-right: 5px;" v-model="goodsListMessage.consultType" placeholder="请选择">
                        <el-option
                        v-for="item in goodsListMessage.reducePriceTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <div class="value">
                         <el-input class="reduce-price-input" @change="reducePriceHandler" v-if="goodsListMessage.reducePriceVisible" v-model="goodsListMessage.consultMoney"></el-input>
                         <span v-if="!goodsListMessage.reducePriceVisible">{{goodsListMessage.reducePrice}}</span>
                        <span @click="goodsListMessage.reducePriceVisible = !goodsListMessage.reducePriceVisible">改价</span>
                    </div>
                </div>
                <div class="item">
                    <div class="label">实收金额：</div>
                    <div class="value">¥{{orderDetail.orderInfo.actualMoney}}</div>
                </div>
            </div>
            <div class="operate-record">
                <p class="header">操作记录</p>
                <el-table
                    :data="orderDetail.orderOperationRecordList"
                    style="width: 100%">
                    <el-table-column
                        label="操作"
                        width="180">
                        <template slot-scope="scope">
                            {{scope.row.operationType | operationTypeFilter}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="createUserName"
                        label="操作人"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="操作时间">
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <component :is="currentDialog" :dialogVisible.sync="dialogVisible" :data="currentData"></component>
    </div>
</template>
<script>
import OrderState from './components/orderState'
import OrderInformation from './components/orderInformation'
import DeliveryInformation from './components/deliveryInformation'
import CouponDialog from '@/views/order/dialogs/couponDialog'

export default {
    data() {
        return {
            orderNumber: '1',
            collageNumber: '1',
            customerId: 1,
            activeName: 'order',
            tableData: [
                
            ],
            goodsListMessage: {
                reducePriceVisible: false,
                freight: '1',
                payAmount: '1',
                coupon: '1',
                discount: '1',
                memberDiscount: '1',
                favourable: '1',
                freeShipping: '1',
                consultMoney: '',
                amountInHand: '1',
                consultType: '1',
                reducePriceTypeList: [
                    {
                        label: '协商减价',
                        value: '2'
                    },
                    {
                        label: '协商加价',
                        value: '1'
                    },
                ]
            },
            operateRecord: [
                {}
            ],
            currentDialog: '',
            dialogVisible: false,
            currentData: {
                price: '500',
                detail: '订单满2000元使用（不含邮费）',
                limit: '2019',
                code: '1'
            },
            orderDetail: {
                orderInfo: {}
            }
        }
    },
    created() {
        this.getDetail()
    },
    filters: {
        operationTypeFilter(code) {
            switch(code) {
                case 1:
                    return '确认收款'
                case 2:
                    return '改价'
                case 3:
                    return '继续发货'
                case 4:
                    return '补填物流信息'
                case 5:
                    return '发货'
                case 6:
                    return '关闭订单'
                case 7:
                    return '提前关闭订单'
            }
        }
    },
    methods: {
        reducePriceHandler() {
            this._apis.order.orderPriceChange({id: this.orderDetail.orderInfo.id, 
            consultType: this.goodsListMessage.consultType, consultMoney: this.goodsListMessage.consultMoney}).then(res => {
                this.$notify({
                    title: '成功',
                    message: '添加成功！',
                    type: 'success'
                });
            }).catch(error => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            }) 
        },
        getDetail() {
            let id = this.$route.query.id

            this._apis.order.fetchOrderDetail({id}).then((res) => {
                this.orderDetail = res
            }).catch(error => {

            })
        }
    },
    components: {
        OrderState,
        OrderInformation,
        CouponDialog,
        DeliveryInformation
    }
}
</script>
<style lang="scss" scoped>
    .order-detail {
        color: $contentColor;
        .header {
            display: flex;
            justify-content: space-between;
            background-color: #fff;
            height: 60px;
            line-height: 60px;
        }
        .order-state {
            margin-top: 20px;
        }
        .message {
            background-color: #fff;
            margin-top: 20px;
            padding: 20px;
        }
        .goods-detail {
            display: flex;
        }
        .goods-list, .operate-record {
            background-color: #fff;
            margin-top: 20px;
            padding: 20px;
            .header {
                padding-bottom: 20px;
                font-size: 16px;
                color: #161617;
            }
        }
        .goods-list-message {
            display: flex;
            align-items: flex-end;
            flex-direction: column;
            margin-top: 20px;
            padding-right: 50px;
            .item {
                display: flex;
                margin-top: 10px;
            }
            .reduce-price {
                display: flex;
                align-items: center;
                /deep/ .el-input {
                    width: 100px;
                }
            }
            .coupon-img {
                width: 14px;
                height: 14px;
                display: inline-block;
                background: url(../../assets/images/order/icon-coupon.png);
                margin-left: 14px;
            }
        }
        .operate-record {

        }
    }
    .reduce-price-input {
        width: auto;
    }
</style>


