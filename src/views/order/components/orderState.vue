<template>
    <div class="order-state">
        <!-- <template v-if="orderState === 0">
            <div class="item lefter">
                <el-steps :active="2">
                    <el-step title="客户下单" description=""></el-step>
                    <el-step title="客户付款" description=""></el-step>
                    <el-step title="商户发货" description=""></el-step>
                    <el-step title="商户收货" description=""></el-step>
                    <el-step title="完成" description=""></el-step>
                </el-steps>
            </div>
            <div class="item righter">
                <p>待付款</p>
                <div class="button-box">
                    <el-button>关闭订单</el-button>
                </div>
            </div>
        </template>
        <template v-else-if="orderState === 1">
            <div class="item lefter">
                <el-steps :active="2">
                    <el-step title="客户下单" description=""></el-step>
                    <el-step title="客户付款" description=""></el-step>
                    <el-step title="商户发货" description=""></el-step>
                    <el-step title="商户收货" description=""></el-step>
                    <el-step title="完成" description=""></el-step>
                </el-steps>
            </div>
            <div class="item righter">
                <p>待成团</p>
                <div class="button-box">
                    <el-button>关闭订单</el-button>
                </div>
            </div>
        </template> -->

        <template v-if="payWay == 1">
            <!-- 线上支付 -->
            <template v-if="orderState == 0">
                <!-- 待付款 -->
                <div class="item lefter">
                    <el-steps :active="active">
                        <el-step title="客户下单" description=""></el-step>
                        <el-step title="客户付款" description=""></el-step>
                        <el-step title="商户发货" description=""></el-step>
                        <el-step title="商户收货" description=""></el-step>
                        <el-step title="完成" description=""></el-step>
                    </el-steps>
                </div>
                <div class="item righter">
                    <p>待付款</p>
                    <div class="button-box">
                        <el-button>关闭订单</el-button>
                    </div>
                </div>
            </template>
            <template v-else-if="orderState == 1">
                <!-- 待成团 -->
                <div class="item lefter">
                    <el-steps :active="active">
                        <el-step title="客户下单" description=""></el-step>
                        <el-step title="客户付款" description=""></el-step>
                        <el-step title="商户发货" description=""></el-step>
                        <el-step title="商户收货" description=""></el-step>
                        <el-step title="完成" description=""></el-step>
                    </el-steps>
                </div>
                <div class="item righter">
                    <p>拼团中</p>
                </div>
            </template>
            <template v-else-if="orderState == 3">
                <!-- 待发货 -->
                <div class="item lefter">
                    <el-steps :active="active">
                        <el-step title="客户下单" description=""></el-step>
                        <el-step title="客户付款" description=""></el-step>
                        <el-step title="商户发货" description=""></el-step>
                        <el-step title="商户收货" description=""></el-step>
                        <el-step title="完成" description=""></el-step>
                    </el-steps>
                </div>
                <div class="item righter">
                    <p>待发货</p>
                    <div>
                        <span>关闭订单</span>
                        <span>发货</span>
                    </div>
                </div>
            </template>
            <template v-else-if="orderState == 4">
                <!-- 部分发货 -->
                <div class="item lefter">
                    <el-steps :active="active">
                        <el-step title="客户下单" description=""></el-step>
                        <el-step title="客户付款" description=""></el-step>
                        <el-step title="商户发货" description=""></el-step>
                        <el-step title="商户收货" description=""></el-step>
                        <el-step title="完成" description=""></el-step>
                    </el-steps>
                </div>
                <div class="item righter">
                    <p>部分发货</p>
                    <div>
                        <span>关闭订单</span>
                        <span>发货</span>
                    </div>
                </div>
            </template>
            <template v-else-if="orderState == 5">
                <!-- 待收货 -->
                <div class="item lefter">
                    <el-steps :active="active">
                        <el-step title="客户下单" description=""></el-step>
                        <el-step title="客户付款" description=""></el-step>
                        <el-step title="商户发货" description=""></el-step>
                        <el-step title="商户收货" description=""></el-step>
                        <el-step title="完成" description=""></el-step>
                    </el-steps>
                </div>
                <div class="item righter">
                    <p>待收货</p>
                    <div>
                        <span>待收货</span>
                    </div>
                </div>
            </template>
            <template v-else-if="orderState == 6">
                <!-- 完成 -->
                <div class="item lefter">
                    <el-steps :active="active">
                        <el-step title="客户下单" description=""></el-step>
                        <el-step title="客户付款" description=""></el-step>
                        <el-step title="商户发货" description=""></el-step>
                        <el-step title="商户收货" description=""></el-step>
                        <el-step title="完成" description=""></el-step>
                    </el-steps>
                </div>
                <div class="item righter">
                    <p>已完成</p>
                </div>
            </template>
            <template v-else-if="orderState == 2">
                <!-- 关闭 -->
                <div class="item lefter">
                    <el-steps :active="active">
                        <el-step title="客户下单" description=""></el-step>
                        <el-step title="客户付款" description=""></el-step>
                        <el-step title="商户发货" description=""></el-step>
                        <el-step title="商户收货" description=""></el-step>
                        <el-step title="结束" description=""></el-step>
                    </el-steps>
                </div>
                <div class="item righter">
                    <p>已关闭</p>
                </div>
            </template>
        </template>
        <template v-else-if="payWay == 4">
            <!-- 线下支付 -->
            <template v-if="orderState == 0">
                <!-- 待付款 -->
                <div class="item lefter">
                    <el-steps :active="active">
                        <el-step title="客户下单" description=""></el-step>
                        <el-step title="客户付款" description=""></el-step>
                        <el-step title="商户发货" description=""></el-step>
                        <el-step title="商户收货" description=""></el-step>
                        <el-step title="完成" description=""></el-step>
                    </el-steps>
                </div>
                <div class="item righter">
                    <p>待付款</p>
                    <div class="button-box">
                        <el-button>关闭订单</el-button>
                    </div>
                </div>
            </template>
            <template v-else-if="orderState == 1">
                <!-- 待成团 -->
                <div class="item lefter">
                    <el-steps :active="active">
                        <el-step title="客户下单" description=""></el-step>
                        <el-step title="客户付款" description=""></el-step>
                        <el-step title="商户发货" description=""></el-step>
                        <el-step title="商户收货" description=""></el-step>
                        <el-step title="完成" description=""></el-step>
                    </el-steps>
                </div>
                <div class="item righter">
                    <p>拼团中</p>
                </div>
            </template>
            <template v-else-if="orderState == 3">
                <!-- 待发货 -->
                <div class="item lefter">
                    <el-steps :active="active">
                        <el-step title="客户下单" description=""></el-step>
                        <el-step title="客户付款" description=""></el-step>
                        <el-step title="商户发货" description=""></el-step>
                        <el-step title="商户收货" description=""></el-step>
                        <el-step title="完成" description=""></el-step>
                    </el-steps>
                </div>
                <div class="item righter">
                    <p>待发货</p>
                    <div>
                        <span>关闭订单</span>
                        <span @click="$router.push('/order/deliverGoods?id=' + $route.query.id)">发货</span>
                    </div>
                </div>
            </template>
            <template v-else-if="orderState == 4">
                <!-- 部分发货 -->
                <div class="item lefter">
                    <el-steps :active="active">
                        <el-step title="客户下单" description=""></el-step>
                        <el-step title="客户付款" description=""></el-step>
                        <el-step title="商户发货" description=""></el-step>
                        <el-step title="商户收货" description=""></el-step>
                        <el-step title="完成" description=""></el-step>
                    </el-steps>
                </div>
                <div class="item righter">
                    <p>部分发货</p>
                    <div>
                        <span>关闭订单</span>
                        <span>发货</span>
                    </div>
                </div>
            </template>
            <template v-else-if="orderState == 5">
                <!-- 待收货 -->
                <div class="item lefter">
                    <el-steps :active="active">
                        <el-step title="客户下单" description=""></el-step>
                        <el-step title="客户付款" description=""></el-step>
                        <el-step title="商户发货" description=""></el-step>
                        <el-step title="商户收货" description=""></el-step>
                        <el-step title="完成" description=""></el-step>
                    </el-steps>
                </div>
                <div class="item righter">
                    <p>待收货</p>
                    <div>
                        <span>待收货</span>
                    </div>
                </div>
            </template>
            <template v-else-if="orderState == 6">
                <!-- 完成 -->
                <div class="item lefter">
                    <el-steps :active="active">
                        <el-step title="客户下单" description=""></el-step>
                        <el-step title="客户付款" description=""></el-step>
                        <el-step title="商户发货" description=""></el-step>
                        <el-step title="商户收货" description=""></el-step>
                        <el-step title="完成" description=""></el-step>
                    </el-steps>
                </div>
                <div class="item righter">
                    <p>已完成</p>
                </div>
            </template>
            <template v-else-if="orderState == 2">
                <!-- 关闭 -->
                <div class="item lefter">
                    <el-steps :active="active">
                        <el-step title="客户下单" description=""></el-step>
                        <el-step title="客户付款" description=""></el-step>
                        <el-step title="商户发货" description=""></el-step>
                        <el-step title="商户收货" description=""></el-step>
                        <el-step title="结束" description=""></el-step>
                    </el-steps>
                </div>
                <div class="item righter">
                    <p>已关闭</p>
                </div>
            </template>
        </template>
    </div>
</template>
<script>
// sendType 订单类型 ,1普通订单,2拼团订单,3优惠套餐订单,4赠品订单
// payWay 付款方式 1线上支付,2货到付款,3找人代付 4线下支付
// orderStatus 订单流程状态：0待付款 1待成团 2关闭 3待发货 4部分发货 5待收货 6完成
export default {
    data() {
        return {
            
        }
    },
    computed: {
        active() {
            if(this.payWay == 1) {
                // 线上支持
                switch(this.orderState) {
                    case 0:
                        return 2
                    case 1:
                        return 3
                    case 2:
                        return 5
                    case 3:
                        return 3
                    case 5:
                        return 4
                    case 6:
                        return 5
                }
            } else if(this.payWay == 4) {
                // 线下支付
                switch(this.orderState) {
                    case 0:
                        return 2
                    case 1:
                        return 3
                    case 2:
                        return 5
                    case 3:
                        return 3
                    case 5:
                        return 4
                    case 6:
                        return 5
                }
            }
        }
    },
    props: {
        orderState: {
            type: Number | String,
            required: true
        },
        payWay: {
            type: Number | String
        },
        closeReaosn: {
            type: Number | String
        }
    }
}
</script>
<style lang="scss" scoped>
    .order-state {
        background-color: #fff;
        padding: 30px;
        display: flex;
        justify-content: space-between;
        .item {
            &.righter {
                width: 230px;
                text-align: center;
                .button-box {
                    margin-top: 20px;
                }
            }
            &.lefter {
                flex: 1;
            }
        }
    }
</style>


