<template>
    <div class="order-state">
        <template v-if="orderState == '待发货'">
            <div class="item lefter">
                <el-steps :active="1">
                    <el-step title="客户下单" description=""></el-step>
                    <el-step title="客户付款" description=""></el-step>
                    <el-step title="商户发货" description=""></el-step>
                    <el-step title="商户收货" description=""></el-step>
                    <el-step title="订单完成" description=""></el-step>
                </el-steps>
            </div>
            <div class="item righter">
                <p>待发货</p>
                <div class="button-box">
                    <el-button>关闭订单</el-button>
                    <el-button type="primary">发 货</el-button>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        orderState() {
            return '待发货'
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


