<template>
    <div class="order-detail">
        <div class="header">
            <div class="lefter">
                <span>订单编号：{{orderInfo.code}} | </span>
                <span>{{orderInfo.channelInfoId}} | </span>
                <span>{{orderInfo.sendType}} | </span>
                <span>拼团编号：{{orderInfo.assembleCode}}</span>
            </div>
            <div class="righter">
                <img src="../../assets/images/order/customerImg.png" alt="">
                <span>客户ID：{{memberSn}}</span>
            </div>
        </div>
        <orderState class="order-state"></orderState>
        <div class="message">
            <el-tabs v-model="activeName">
                <el-tab-pane label="订单信息" name="order">
                    <orderInformation></orderInformation>
                </el-tab-pane>
                <el-tab-pane label="发货信息" name="delivery">
                    <deliveryInformation></deliveryInformation>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="goods-list">
            <p class="header">订单清单</p>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    label="商品"
                    width="180">
                    <template slot-scope="scope">
                        <div class="goods-detail">
                            <div class="item">
                                <img src="" alt="">
                            </div>
                            <div class="item">
                                <p></p>
                                <p></p>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="company"
                    label="单位"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="quantity"
                    label="数量">
                </el-table-column>
                <el-table-column
                    prop="unitPrice"
                    label="商品单价">
                </el-table-column>
                <el-table-column
                    prop="allPrice"
                    label="商品小计">
                </el-table-column>
            </el-table>
            <div class="goods-list-message">
                <div class="item">
                    <div class="label">运费：</div>
                    <div class="value">{{goodsListMessage.freight}}</div>
                </div>
                <div class="item">
                    <div class="label">应收金额：</div>
                    <div class="value">{{goodsListMessage.payAmount}}</div>
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
                    <div class="value">{{goodsListMessage.discount}}</div>
                </div>
                <div class="item">
                    <div class="label">会员折扣：</div>
                    <div class="value">{{goodsListMessage.memberDiscount}}</div>
                </div>
                <div class="item">
                    <div class="label">优惠套装：</div>
                    <div class="value">{{goodsListMessage.favourable}}</div>
                </div>
                <div class="item">
                    <div class="label">满包邮：</div>
                    <div class="value">{{goodsListMessage.freeShipping}}</div>
                </div>
                <div class="item reduce-price">
                    <el-select style="margin-right: 5px;" v-model="goodsListMessage.reducePriceType" placeholder="请选择">
                        <el-option
                        v-for="item in goodsListMessage.reducePriceTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <div class="value">
                         <el-input class="reduce-price-input" @change="reducePriceHandler" v-if="goodsListMessage.reducePriceVisible" v-model="goodsListMessage.reducePrice"></el-input>
                         <span v-if="!goodsListMessage.reducePriceVisible">{{goodsListMessage.reducePrice}}</span>
                        <span @click="goodsListMessage.reducePriceVisible = !goodsListMessage.reducePriceVisible">改价</span>
                    </div>
                </div>
                <div class="item">
                    <div class="label">实收金额：</div>
                    <div class="value">{{goodsListMessage.amountInHand}}</div>
                </div>
            </div>
            <div class="operate-record">
                <p class="header">操作记录</p>
                <el-table
                    :data="operateRecord"
                    style="width: 100%">
                    <el-table-column
                        prop="operate"
                        label="操作"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="operater"
                        label="操作人"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="operateTime"
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
                reducePrice: '1',
                amountInHand: '1',
                reducePriceType: '协商减价',
                reducePriceTypeList: [
                    {
                        label: '协商减价',
                        value: '协商减价'
                    },
                    {
                        label: '协商加价',
                        value: '协商加价'
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
            orderDetail: {}
        }
    },
    created() {
        this.getDetail()
    },
    methods: {
        reducePriceHandler() {

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


