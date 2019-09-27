<template>
    <div class="delivery-information">
        <!-- <div class="header">
            <ul>
                <li>· 共计{{typeNumber}}种商品，还有{{typeNumber}}种商品未发货完成 <span @click="currentDialog = 'StatisticsDialog'; dialogVisible = true" class="blue">统计详情</span></li>
                <li>· 已发货{{orderDetail.orderSendItems && orderDetail.orderSendItems.length}}单，还有{{typeNumber}}单未进行收货确认</li>
            </ul>
        </div> -->
        <div class="container">
            <div v-show="orderSendItems && orderSendItems.length" class="item" v-for="(item, index) in orderSendItems" :key="index">
                <div class="header">
                    <div class="header-lefter">
                        <div class="header-lefter-item number">{{index + 1}}</div>
                        <div class="header-lefter-item ">快递单号：{{item.expressNo}}</div>
                        <div @click="showLogistics(item.expressNo)" class="header-lefter-item  blue pointer">查看物流</div>
                    </div>
                    <div class="header-righter">
                        <div class="header-righter-item">【客户发货】</div>
                        <div class="header-righter-item">发货人：{{orderDetail.orderSendInfo.sendName}}</div>
                        <div class="header-righter-item">{{item.time}}</div>
                        <div @click="showContent(index)">
                            <i v-if="item.showContent" class="el-icon-caret-top pointer"></i>
                            <i v-if="!item.showContent" class="el-icon-caret-bottom pointer"></i>
                        </div>
                    </div>
                </div>
                <div v-show="item.showContent" class="content">
                    <el-table
                        :data="[
                            {
                                goodsImage: item.goodsImage,
                                goodsName: item.goodsName,
                                goodsSpces: item.goodsSpces,
                                goodsUnit: item.goodsUnit,
                                sendCount: item.sendCount
                            }
                        ]"
                        style="width: 100%">
                        <el-table-column
                            label="商品"
                            width="300">
                            <template slot-scope="scope">
                                <div class="goods-detail">
                                    <div class="goods-detail-item">
                                        <img width="66" :src="item.goodsImage" alt="">
                                    </div>
                                    <div class="goods-detail-item">
                                        <p>{{item.goodsName}}</p>
                                        <p>{{item.goodsSpces}}</p>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="goodsUnit"
                            label="单位"
                            width="300">
                        </el-table-column>
                        <el-table-column
                            prop="sendCount"
                            label="本次发货数量">
                        </el-table-column>
                    </el-table>
                    <div class="remark">备注: {{orderDetail.orderInfo.sellerRemark}}</div>
                </div>
            </div>
            <Empty v-show="!orderSendItems || (orderSendItems && !orderSendItems.length)"></Empty>
        </div>
        <component :is="currentDialog" :dialogVisible.sync="dialogVisible" v-if="dialogVisible" :data="currentData"></component>
    </div>
</template>
<script>
import StatisticsDialog from '@/views/order/dialogs/statisticsDialog'
import LogisticsDialog from '@/views/order/dialogs/logisticsDialog'
import Empty from '@/components/Empty'

export default {
    data() {
        return {
            typeNumber: 3,
            failNumber: 2,
            deliveryNumber: 2,
            unconfirmedNumber: 1,
            items: [
                
            ],
            currentDialog: '',
            dialogVisible: false,
            currentData: {},
            orderSendItems: []
        }
    },
    created() {
        this.orderSendItems = this.orderDetail.orderSendItems && this.orderDetail.orderSendItems.map(val => ({...val, showContent: true})) || []
    },
    watch: {
        orderDetail: {
            deep: true,
            handler() {
                this.orderSendItems = this.orderDetail.orderSendItems && this.orderDetail.orderSendItems.map(val => ({...val, showContent: true})) || []
            }
        }
    },
    computed: {
        businessFilter(value) {
            if(value.memberTeceiveGoodsTime) {
                return '【客户签收】'
            } else if(value.sendTime) {
                return '【商户发货】'
            } else {
                return ''
            }
        }
    },
    methods: {
        showLogistics(expressNo) {
            this._apis.order.orderLogistics({expressNo}).then(res => {
                this.currentDialog = 'LogisticsDialog'
                this.currentData = res.traces
                this.dialogVisible = true
            }).catch(error => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            }) 
        },
        showContent(index) {
            let _orderSendItems = [...this.orderSendItems]

            _orderSendItems.forEach((val, i) => {
                if(i == index) {
                    val.showContent = !val.showContent
                }
            })

            this.orderSendItems = _orderSendItems
        }
    },
    props: {
        orderDetail: {
            type: Object,
            default: {
                orderInfo: {},
                orderItems: [],
                orderSendItems: []
            }
        }
    },
    components: {
        StatisticsDialog,
        LogisticsDialog,
        Empty
    }
}
</script>
<style lang="scss" scoped>
    .delivery-information {
        .blue {
            color: $globalMainColor;
        }
        .header {
            ul {
                margin-bottom: 10px;
            }
            ul li {
                margin-top: 10px;
            }
        }
        .container {
            .item {
                border-radius: 10px;
                border: 1px solid #cacfcb;
                margin-bottom: 10px;
                .header {
                    height: 60px;
                    background-color: rgb(243, 244, 244);
                    border-radius: 10px;
                    padding: 0 20px;
                    line-height: 60px;
                    display: flex;
                    justify-content: space-between;
                    .header-lefter {
                        display: flex;
                        align-items: center;
                        .header-lefter-item  {
                            margin-right: 20px;
                        }
                        .number {
                            width: 20px;
                            height: 20px;
                            background-color: $globalMainColor;
                            line-height: 21px;
                            color: #fff;
                            text-align: center;
                            border-radius: 50%;
                        }
                    }
                    .header-righter {
                        display: flex;
                        align-items: center;
                        .header-righter-item  {
                            margin-right: 20px;
                        }
                    }
                }
                .content {
                    padding: 20px;
                    .goods-detail {
                        display: flex;
                        align-items: center;
                        .goods-detail-item {
                            margin-right: 5px;
                            p:last-child {
                                color: #9FA29F;
                            }
                        }
                    }
                    .remark {
                        border-top: 1px solid #CACFCB;
                        padding-top: 20px;
                    }
                }
            }
        }
    }
</style>

