<template>
    <div class="aftermarketDeliveryInformation">
        <div class="delivery-information-header">
            客户发货
        </div>
        <div class="container">
            <div class="item" v-for="(item, index) in items" :key="index">
                <div class="header">
                    <div class="header-lefter">
                        <div class="header-lefter-item number">{{index + 1}}</div>
                        <div class="header-lefter-item ">快递单号：{{item.expressNumber}}</div>
                        <div @click="currentDialog = 'logisticsDialog'; dialogVisible = true; currentData = item" class="header-lefter-item  blue">查看物流</div>
                    </div>
                    <div class="header-righter">
                        <div class="header-righter-item">【客户发货】</div>
                        <div class="header-righter-item">发货人：{{item.deliverier}}</div>
                        <div class="header-righter-item">{{item.time}}</div>
                        <div @click="item.showContent = !item.showContent">
                            <i v-if="item.showContent" class="el-icon-caret-top"></i>
                            <i v-if="!item.showContent" class="el-icon-caret-top"></i>
                        </div>
                    </div>
                </div>
                <div v-if="item.showContent" class="content">
                    <el-table
                        :data="item.list"
                        style="width: 100%">
                        <el-table-column
                            label="商品"
                            width="180">
                            <template slot-scope="scope">
                                <div class="goods-detail">
                                    <div class="goods-detail-item">
                                        <img src="" alt="">
                                    </div>
                                    <div class="goods-detail-item">
                                        <p></p>
                                        <p></p>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="unit"
                            label="单位"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="quantity"
                            label="本次发货数量">
                        </el-table-column>
                    </el-table>
                    <div class="remark">快递单号：{{}}</div>
                </div>
            </div>
        </div>
        <component :is="currentDialog" :dialogVisible.sync="dialogVisible" :data="currentData"></component>
    </div>
</template>
<script>
import StatisticsDialog from '@/views/order/dialogs/statisticsDialog'
import LogisticsDialog from '@/views/order/dialogs/logisticsDialog'

export default {
    data() {
        return {
            typeNumber: 3,
            failNumber: 2,
            deliveryNumber: 2,
            unconfirmedNumber: 1,
            items: [
                {
                    expressNumber: 1,
                    deliverier: '小王',
                    time: '',
                    showContent: true,
                    list: [
                        {}
                    ]
                }
            ],
            currentDialog: '',
            dialogVisible: false,
            currentData: {}
        }
    },
    components: {
        StatisticsDialog,
        LogisticsDialog
    }
}
</script>
<style lang="scss" scoped>
    .aftermarketDeliveryInformation {
        background-color: #fff;
        padding: 30px;
        .blue {
            color: $globalMainColor;
        }
        .delivery-information-header {
            margin: 20px 0;
            margin-top: 0;
        }
        .container {
            .item {
                border-radius: 10px;
                border: 1px solid #cacfcb;
                .header {
                    height: 60px;
                    background-color: rgb(243, 244, 244);
                    border-radius: 10px 10px 0 0;
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
                        .goods-detail-item {

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


