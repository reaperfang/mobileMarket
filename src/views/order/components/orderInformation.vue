<template>
    <div class="order-information">
        <el-row>
            <el-col :span="8">
                <div class="grid-content lefter">
                    <div class="item">
                        <div class="label">配送方式</div>
                        <div class="value">{{expressType}}</div>
                    </div>
                    <div class="item">
                        <div class="label">收货信息</div>
                        <div class="value">{{receiveInformation}}</div>
                    </div>
                    <p @click="currentDialog = 'ReceiveInformationDialog'; dialogVisible = true" class="change"><span>修改</span></p>
                </div>
            </el-col>
            <el-col :span="8"><div class="grid-content center">
                <div class="item">
                    <div class="label">付款人</div>
                    <div class="value">{{payer}} <span class="blue">详情</span></div>
                </div>
                <div class="item">
                    <div class="label">付款方式</div>
                    <div class="value">{{payMode}}</div>
                </div>
                <div class="item">
                    <div class="label">付款时间</div>
                    <div class="value">{{payTime}}</div>
                </div>
                <div class="item">
                    <div class="label">交易流水号</div>
                    <div class="value">{{batch}}</div>
                </div>
                <div class="item">
                    <div class="label">微信流水号</div>
                    <div class="value">{{wechat}}</div>
                </div>
                <div class="item">
                    <div class="label">本单获得</div>
                    <div class="value">{{win}}</div>
                </div>
            </div></el-col>
            <el-col :span="8"><div class="grid-content righter">
                <div class="item">
                    <div class="label">发票信息</div>
                    <div class="value">{{batch}}</div>
                </div>
                <div class="item">
                    <div class="label">客户留言</div>
                    <div class="value">{{message}}</div>
                </div>
                <div class="item remark-box">
                    <div class="label">商户备注</div>
                    <div class="value">
                        <span v-if="remarkVisible" @click="remarkVisible = false" class="blue">我要备注</span>
                        <template v-if="!remarkVisible">
                            <el-input
                                type="textarea"
                                :rows="2"
                                placeholder="请输入内容"
                                v-model="remarks">
                            </el-input>
                            <p class="tr blue">
                                <span @click="remarkHandler">完成</span>
                            </p>
                        </template>
                    </div>
                </div>
            </div></el-col>
        </el-row>
        <component :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
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
            dialogVisible: false,
            remarkVisible: false
        }
    },
    methods: {
        remarkHandler() {
            this.remarkVisible = true
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


