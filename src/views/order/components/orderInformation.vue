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
                    <div class="value">{{orderInfo.payer}} <span class="blue">详情</span></div>
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
                    <div class="value">{{orderInfo.transactionCodeList && orderInfo.transactionCodeList.join(',')}}</div>
                </div>
                <div class="item">
                    <div class="label">本单获得</div>
                    <div class="value">
                        <p>积分 {{orderInfo.gainScore}}</p>
                        <p>赠品 {{orderInfo.gift}}</p>
                        <p>优惠券 </p>
                        <p>优惠码 </p>
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
                    <div class="label">客户留言</div>
                    <div class="value">{{message}}</div>
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
            remarkVisible: false
        }
    },
    methods: {
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
            border-right: 1px solid #9FA29F;
            margin-right: 19px;
            padding-right: 19px;
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


