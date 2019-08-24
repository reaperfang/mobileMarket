<template>
    <div class="order-information">
        <el-row>
            <el-col :span="8">
                <div class="grid-content lefter">
                    <div class="item">
                        <div class="label">配送方式</div>
                        <div class="value">{{orderInfo.deliveryWay | deliveryWayFilter}}</div>
                    </div>
                    <div class="item">
                        <div class="label">收货信息</div>
                        <div class="value">
                            <p>{{orderInfo.receivedName}} / {{orderInfo.receivedPhone}}</p>
                            <p>{{orderInfo.receivedDetail}}</p>
                        </div>
                    </div>
                    <p @click="currentDialog = 'ReceiveInformationDialog'; currentData =orderInfo.id; dialogVisible = true" class="change"><span>修改</span></p>
                </div>
            </el-col>
            <el-col :span="8"><div class="grid-content center">
                <div class="item">
                    <div class="label">付款人</div>
                    <div class="value">{{orderDetail.orderSendInfo && orderDetail.orderSendInfo.sendName}}</div> <!-- <span class="blue">详情</span> -->
                </div>
                <div class="item">
                    <div class="label">付款方式</div>
                    <div class="value">{{orderInfo.payWay | payWayFilter}}</div>
                </div>
                <div class="item">
                    <div class="label">付款时间</div>
                    <div class="value">{{orderInfo.payComplateTime}}</div>
                </div>
                <div class="item">
                    <div class="label">交易流水号</div>
                    <div class="value">{{orderInfo.transactionCode}}</div>
                </div>
                <div class="item">
                    <div class="label">本单获得</div>
                    <div class="value">
                        <p>积分 {{orderInfo.gainScore}}</p>
                        <p>赠品 {{orderInfo.gift}}</p>
                        <p>优惠券 {{gainCoupon}}</p>
                        <p>优惠码 {{gainPromotionCode}}</p>
                    </div>
                </div>
            </div></el-col>
            <el-col :span="8"><div class="grid-content righter">
                <div class="item">
                    <div class="label">发票信息</div>
                    <div class="value">
                        <p>发票类型 {{orderInfo.invoiceType | invoiceTypeFilter}}</p>
                        <p>发票抬头 {{orderInfo.invoiceTitle}}</p>
                        <p>发票内容 商品明细</p>
                        <p>电子发票将在订单完成后1-2天内开具</p>
                    </div>
                </div>
                <div class="item">
                    <div class="label">客户备注</div>
                    <div class="value">{{orderInfo.buyerRemark}}</div>
                </div>
                <div class="item remark-box">
                    <div class="label">商户备注</div>
                    <div class="value">
                        <span v-if="!remarkVisible" @click="remarkVisible = true" class="blue">我要备注</span>
                        <template v-if="remarkVisible">
                            <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="orderInfo.sellerRemark">
                            </el-input>
                            <p class="tr blue">
                                <span @click="remarkHandler">完成</span>
                            </p>
                        </template>
                    </div>
                </div>
            </div></el-col>
        </el-row>
        <component :is="currentDialog" :dialogVisible.sync="dialogVisible" :data="currentData" @submit="submit"></component>
    </div>
</template>
<script>
import ReceiveInformationDialog from '@/views/order/dialogs/receiveInformationDialog'

export default {
    data() {
        return {
            expressType: '普通快递',
            receiveInformation: '北京市',
            payer: '张三',
            payMode: '微信支付',
            payTime: '2019',
            batch: '1',
            wechat: '1',
            win: '礼物',
            receiptInformation: '普通发票',
            message: 'message',
            remarks: 'remarks',
            currentDialog: '',
            currentData: '',
            dialogVisible: false,
            remarkVisible: false,
            //replacePayWechatNames: ''
        }
    },
    created() {
        //this.getOrderPayRecordList()
    },
    computed: {
        gainCoupon() {
            // couponType 0:获得优惠券 1:使用优惠券
            let couponStr = ''

            if(this.orderDetail.orderCouponList) {
                let gainCouponList = this.orderDetail.orderCouponList.filter(val => val.couponType == 0)

                if(gainCouponList && gainCouponList.length) {
                    gainCouponList.forEach(coupon => {
                        couponStr += coupon.couponName + ' 有效期至 ' + coupon.endTime
                    })
                }
            }

            return couponStr
            
        },
        gainPromotionCode() {
            // promotionCodeType 0:获得优惠码 1:使用优惠码
            let promotionCodeStr = ''

            if(this.orderDetail.orderPromotionCodeList) {
                let gainPromotionCodeList = this.orderDetail.orderPromotionCodeList.filter(val => val.promotionCodeType == 0)

                if(gainPromotionCodeList && gainPromotionCodeList.length) {
                    gainPromotionCodeList.forEach(promotionCode => {
                        promotionCodeStr += promotionCode.promotionCodeName + ' 有效期至 ' + promotionCode.endTime
                    })
                }
            }

            return promotionCodeStr
            
        },
    },
    methods: {
        // getOrderPayRecordList() {
        //     this._apis.order.getOrderPayRecordList({id: this.$route.query.id}).then(res => {
        //         let str = ''

        //         let namesList = res.map(val => val.replacePayWechatName)

        //         namesL
        //         this.$notify({
        //             title: '成功',
        //             message: '查询成功！',
        //             type: 'success'
        //         });
        //     }).catch(error => {
        //         this.$notify.error({
        //             title: '错误',
        //             message: error
        //         });
        //     }) 
        // },
        submit() {
            this.$emit('getDetail')
        },
        remarkHandler() {
            this.remarkVisible = true
            this._apis.order.orderRemark({id: this.orderInfo.id, sellerRemark: this.orderInfo.sellerRemark}).then(res => {
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
        }
    },
    filters: {
        deliveryWayFilter(code) {
            if(code === 1) {
                return '普通快递'
            } else if(code === 2) {
                return '商家自送'
            }
        },
        payWayFilter(code) {
            if(code === 1) {
                return '线上支付'
            } else if(code === 2) {
                return '货到付款'
            } else if(code === 3) {
                return '找人代付'
            } else if(code === 4) {
                return '线下支付'
            }
        },
        invoiceTypeFilter(code) {
            if(code === 1) {
                return '个人'
            } else if(code === 2) {
                return '公司'
            }
        }
    },
    props: {
        orderInfo: {
            type: Object,
            required: true
        },
        orderDetail: {
            type: Object,
            required: true
        }
    },
    components: {
        ReceiveInformationDialog
    }
}
</script>
<style lang="scss" scoped>
    .order-information {
        .blue {
            color: $globalMainColor;
        }
        .grid-content {
            margin-right: 19px;
            padding-right: 19px;
            p {
                line-height: 21px;
            }
            &.lefter {
                height: 146px;
                .change {
                    color: $globalMainColor;
                    text-align: right;
                    margin-top: 10px;
                }
            }
            &.righter {
                border: none;
                .remark-box {
                    p {
                        margin-top: 8px;
                    }
                }
            }
            &.center {
                padding-left: 10px;
                border-left: 1px solid #9FA29F;
                border-right: 1px solid #9FA29F;
            }
            .item {
                display: flex;
                margin-top: 10px;
                .label {
                    margin-right: 20px;
                }
                .value {
                    color: #9FA29F;
                }
            }
        }
    }
</style>


