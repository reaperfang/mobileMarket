<!-- 仅退款 -->
<template>
    <div class="after-sales-state">
        <template v-if="this.orderAfterSale.orderAfterSaleStatus == 0">
            <!-- 待审核 -->
            <div class="row align-center justity-between">
                <div class="col flex1 lefter">
                    <el-steps :active="1">
                        <el-step title="提交申请" :description="orderAfterSale.createTime"></el-step>
                        <el-step title="商户处理" description=""></el-step>
                        <el-step title="退款" description=""></el-step>
                        <el-step title="系统处理中" description=""></el-step>
                        <el-step title="完成" description=""></el-step>
                    </el-steps>
                </div>
                <div class="col righter">
                    <p>待审核</p>
                    <p class="des">客户申请售后，待审核</p>
                    <div>
                        <span @click="auth">同意</span>
                        <span @click="reject">拒绝</span>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="this.orderAfterSale.orderAfterSaleStatus == 2">
            <!-- 待处理 -->
            <div class="row align-center justity-between">
                <div class="col flex1 lefter">
                    <el-steps :active="2">
                        <el-step title="提交申请" :description="orderAfterSale.createTime"></el-step>
                        <el-step title="商户处理" :description="orderAfterSale.examineTime"></el-step>
                        <el-step title="退款" description=""></el-step>
                        <el-step title="系统处理中" description=""></el-step>
                        <el-step title="完成" description=""></el-step>
                    </el-steps>
                </div>
                <div class="col righter">
                    <p>待处理</p>
                    <p class="des">商户通过审核，未退款</p>
                    <div>
                        <span>退款</span>
                    </div>
                </div>
            </div>
        </template>
        <template v-else-if="this.orderAfterSale.orderAfterSaleStatus == 5">
            <!-- 已关闭 -->
            <div class="row align-center justity-between">
                <div class="col flex1 lefter">
                    <template v-if="customerClose">
                        <el-steps :active="3">
                            <el-step title="提交申请" :description="orderAfterSale.createTime"></el-step>
                            <el-step title="撤销申请" description=""></el-step>
                            <el-step title="申请已撤销" description=""></el-step>
                        </el-steps>
                    </template>
                    <template v-else>
                        <el-steps :active="3">
                            <el-step title="提交申请" :description="orderAfterSale.createTime"></el-step>
                            <el-step title="商户处理" :description="orderAfterSale.examineTime"></el-step>
                            <el-step title="拒绝申请，已完结" description=""></el-step>
                        </el-steps>
                    </template>
                </div>
                <div class="col righter">
                    <p>已关闭</p>
                    <p class="des">客户撤销申请或商户拒绝售后的</p>
                </div>
            </div>
        </template>
        <template v-else-if="this.orderAfterSale.orderAfterSaleStatus == 4">
            <!-- 已完成 -->
            <div class="row align-center justity-between">
                <div class="col flex1 lefter">
                    <el-steps :active="5">
                        <el-step title="提交申请" :description="orderAfterSale.createTime"></el-step>
                        <el-step title="商户处理" :description="orderAfterSale.examineTime"></el-step>
                        <el-step title="退款" description=""></el-step>
                        <el-step title="系统处理中" description=""></el-step>
                        <el-step title="完成" description=""></el-step>
                    </el-steps>
                </div>
                <div class="col righter">
                    <p>已完成</p>
                    <p class="des">商户退款完成</p>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    data() {
        return {
            customerClose: true
        }
    },
    computed: {
        active() {
            switch(this.orderAfterSale.orderAfterSaleStatus) {
                case 0: // 提交申请(待审核)
                    return 1
                case 1: // 待退货
                    return 2
                case 2: // 待处理(客户发货)
                    return 3
                case 3: // 待收货
                    return 4
                case 5: // 已关闭
                    return 3
                case 4: // 已完成
                    return 6
            }
        }
    },
    props: {
        orderAfterSale: {
            type: Object,
            required: true
        }
    }
}
</script>
<style lang="scss" scoped>
    .after-sales-state {
        .row .col.lefter {
            padding-right: 50px;
        }
        .row .col.righter {
            text-align: center;
            border-left: 2px solid #CACFCB;
            padding-left: 30px;
            p {
                margin-bottom: 20px;
                &:first-child {
                    font-size: 20px;
                }
                &.des {
                    color: #9FA29F;
                }
            }
        }
    }
</style>