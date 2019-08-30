<template>
    <div class="delivery-management">
        <section>
            <el-tabs v-model="activeName">
                <el-tab-pane label="订单发货" name="order">
                    <orderDelivery></orderDelivery>
                </el-tab-pane>
                <el-tab-pane label="售后发货" name="service">
                    <afterSales></afterSales>
                </el-tab-pane>
            </el-tabs>
        </section>
    </div>
</template>
<script>
import OrderDelivery from './components/orderDelivery'
import AfterSales from './components/afterSales'

export default {
    data() {
        return {
            activeName: 'order'
        }
    },
    components: {
        OrderDelivery,
        AfterSales
    }
}
</script>
<style lang="scss" scoped>
    .delivery-management {
        background-color: #fff;
        section {
          padding: 20px;
          padding-top: 0;
        }
    }
    /deep/ .el-tabs__nav-scroll {
        background-color: #fff;
    }
    /deep/ #tab-order {
        padding-left: 20px;
    }
    /deep/ .el-tabs__header {
        margin-bottom: 0;
    }
    /deep/ #tab-order {
        padding-left: 0;
    }
</style>


