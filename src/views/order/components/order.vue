<template>
    <div class="order">
        <div class="order-header">
            <div class="item goods">
                <div class="row justify-between">
                    <div class="col">商品信息</div>
                    <div class="col">数量</div>
                </div>
            </div>
            <div class="item">实付金额/支付方式</div>
            <div class="item">收货人及联系方式</div>
            <div class="item">配送方式</div>
            <div class="item">状态</div>
            <div class="item">操作</div>
        </div>
        <div class="order-container">
            <div class="container-item" v-for="(order, index) in list" :key="index">
                <div class="container-item-header">
                    <div class="item">
                        <el-checkbox @change="checkedChange" v-model="order.checked"></el-checkbox>
                        <span>订单编号：{{order.code}}/下单时间：{{order.createTime}}</span>
                    </div>
                    <div class="item righter">
                        <span>订单类型：{{order.orderType}}</span>
                        <span>客户：{{order.receivedName}}</span>
                        <span>订单来源：{{order.channelName}}</span>
                    </div>
                </div>
                <div class="container-item-content">
                    <div class="item goods">
                        <ul>
                            <li class="goods-li" v-for="(goods, index) in order.orderItem" :key="index">
                                <div class="row justify-between align-center goods-box">
                                    <div class="col">
                                        <div class="row align-center">
                                            <div class="col image-box">
                                                <img :src="goods.goodsImage" alt="">
                                            </div>
                                            <div class="col">
                                                <p>{{goods.goodsName}}</p>
                                                <p>{{goods.goodsSpecs}}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        {{goods.goodsCount}}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="item">
                        <p class="pay-amount">实收：¥{{order.actualMoney}}</p>
                        <p class="payment-mode">{{order.channelName}}</p>
                    </div>
                    <div class="item">{{order.receivedName}}/{{order.receivedPhone}}</div>
                    <div class="item">{{order.deliveryWay}}</div>
                    <div class="item">{{order.orderStatus | orderStatusFilter}}</div>
                    <div class="item operate">
                        <div @click="$router.push('/order/orderDetail?id=' + order.id)">查看详情</div>
                        <div class="delivery">发货信息</div>
                        <template v-if="order.orderStatus == 0">
                            <!-- 待付款 -->
                            <p>查看详情</p>
                            <p @click="$router.push('/order/orderDetail?id=' + order.orderInfo.id)">订单改价</p>
                            <p @click="currentDialog = 'CloseOrderDialog'; currentData = order.orderInfo.id; dialogVisible = true">关闭订单</p>
                            <p @click="makeCollections(order)">确认收款</p>
                        </template>
                        <template v-else-if="order.orderStatus == 1">
                            <!-- 待成团 -->
                            
                        </template>
                        <template v-else-if="order.orderStatus == 2">
                            <!-- 关闭 -->
                            <p>查看详情</p>
                        </template>
                        <template v-else-if="order.orderStatus == 3">
                            <!-- 待发货 -->
                            <p>查看详情</p>
                            <p>发货</p>
                            <p @click="currentDialog = 'CloseOrderDialog'; currentData = order.orderInfo.id; dialogVisible = true">关闭订单</p>
                        </template>
                        <template v-else-if="order.orderStatus == 4">
                            <!-- 部分发货 -->
                            <p>查看详情</p>
                            <p>继续发货</p>
                            <p>发货信息</p>
                            <p @click="currentDialog = 'CloseOrderDialog'; currentData = order.orderInfo.id; dialogVisible = true">提前关闭订单</p>
                        </template>
                        <template v-else-if="order.orderStatus == 5">
                            <!-- 待收货 -->
                            <p>查看详情</p>
                            <p>发货信息</p>
                        </template>
                        <template v-else-if="order.orderStatus == 6">
                            <!-- 完成 -->
                            <p>查看详情</p>
                            <p>发货信息</p>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <component :is="currentDialog" :dialogVisible.sync="dialogVisible" @submit="submit"></component>
    </div>
</template>
<script>
import CloseOrderDialog from '@/views/order/dialogs/closeOrderDialog'

export default {
    data() {
        return {
            orderList: [
                {
                    number: '1',
                    orderTime: '2019-06-04 12:00:00',
                    orderMode: '拼团',
                    customer: '小李',
                    origin: '小程序',
                    checked: false,
                    payAmount: '1000',
                    paymentMode: '微信支付',
                    receiver: '张三',
                    mobile: '13800000000',
                    shippingMethod: '普通快递',
                    state: '已完成',
                    goodsList: [
                        {
                            goodsName: '苹果',
                            spec: '5斤',
                            quantity: 10,
                        },
                        {
                            goodsName: '梨',
                            spec: '5斤',
                            quantity: 10,
                            state: '已完成'
                        }
                    ]
                }
            ],
            currentDialog: '',
            currentData: '',
            dialogVisible: false
        }
    },
    created() {
        
    },
    watch: {

    },
    methods: {
        submit(value) {
            this._apis.order.orderClose({...value, id: this.currentData}).then((res) => {
                this.$emit('getList')
                this.visible = false
                this.$notify({
                    title: '成功',
                    message: '关闭成功！',
                    type: 'success'
                });
            }).catch(error => {
                this.visible = false
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            })
        },
        makeCollections(order) {
           this.confirm({title: '确认收款提示', icon: true, text: `确定收款后无法撤销，您要确认收款吗？`}).then(() => {
                this._apis.order.makeCollections({id: order.orderInfo.id, payWay: 4}).then((res) => {
                    this.$emit('getList')
                    this.visible = false
                    this.$notify({
                        title: '成功',
                        message: '收款成功！',
                        type: 'success'
                    });
                }).catch(error => {
                    this.visible = false
                    this.$notify.error({
                        title: '错误',
                        message: error
                    });
                })
            }) 
        },
        checkedChange() {
            let len = this.list.filter(val => val.checked).length

            this._globalEvent.$emit('checkedLength', len)
        }
    },
    props: {
        list: {
            type: Array
        },
    },
    components: {
        CloseOrderDialog
    }
}
</script>
<style lang="scss" scoped>
    .order {
        .order-header {
            display: flex;
            color: $globalMainColor;
            background-color: rgb(240, 239, 255);
            padding: 12px 20px;
            .item {
                width: 130px;
                margin-right: 20px;
                &.goods {
                    flex: 1;
                }
            }
        }
        .order-container {
            margin-top: 20px;
            .container-item {
                border: 1px solid rgb(202, 207, 203);
                border-radius:10px;
                margin-bottom: 20px;
                .container-item-header {
                    display: flex;
                    justify-content: space-between;
                    background-color: rgb(243, 244, 244);
                    height: 60px;
                    line-height: 60px;
                    padding: 0 20px;
                    color: $contentColor;
                    border-radius: 10px 10px 0 0;
                    .righter {
                        color: rgb(173, 174, 177);
                    }
                }
                .container-item-content {
                    display: flex;
                    align-items: center;
                    padding: 22px 20px;
                    color: #333333;
                    .pay-amount {
                        text-align: center;
                        padding-bottom: 2px;
                        width: 100px;
                    }
                    .payment-mode {
                        border-top: 1px solid #CACFCB;
                        width: 100px;
                        text-align: center;
                        padding-top: 2px;
                    }
                    >.item {
                        width: 130px;
                        margin-right: 20px;
                        &.goods {
                            flex: 1;
                            ul li {
                                display: flex;
                                align-items: center;
                                .item {
                                    margin-right: 10px;
                                }
                            }
                            .goods-box {
                                width: 100%;
                                .image-box {
                                    margin-right: 10px;
                                }
                            }
                            .goods-li {
                                border-bottom: 1px solid #CACFCB;
                                padding: 9px 0;
                                &:last-child {
                                    border: none;
                                }
                            }
                        }
                        &.operate {
                            color: $globalMainColor;
                            .delivery {
                                margin-top: 6px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>


