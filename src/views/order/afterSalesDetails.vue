<template>
    <div class="after-sales-details">
        <div class="header">
            <el-row>
                <el-col :span="12">
                    <span>售后单编号：{{orderAfterSale.code}}</span>
                    <span>【退货退款】</span>
                </el-col>
                <el-col class="header-righter" :span="12">
                    <span>客户ID：{{orderAfterSale.memberSn}}</span>
                </el-col>
            </el-row>
        </div>
        <section class="flow-path">
            <div class="row align-center justity-between">
                <div class="col flex1 lefter">
                    <el-steps :active="1">
                        <el-step title="提交申请" description=""></el-step>
                        <el-step title="商户处理" description=""></el-step>
                        <el-step title="客户退货" description=""></el-step>
                        <el-step title="商户退款" description=""></el-step>
                        <el-step title="系统处理中" description=""></el-step>
                        <el-step title="完成" description=""></el-step>
                    </el-steps>
                </div>
                <div class="col righter">
                    <p>待发货</p>
                    <p class="des">客户已发起售后申请，请您审核！</p>
                    <div>
                        <el-button>拒绝申请</el-button>
                        <el-button type="primary">同意申请</el-button>
                    </div>
                </div>
            </div>
        </section>
        <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="售后信息" name="afterSalesInformation"></el-tab-pane>
            <el-tab-pane label="发货信息" name="aftermarketDeliveryInformation"></el-tab-pane>
        </el-tabs>
        <component :is="currentView" :orderList="recordList"></component>
    </div>
</template>
<script>
import AfterSalesInformation from './components/afterSalesInformation'
import AftermarketDeliveryInformation from './components/aftermarketDeliveryInformation'

export default {
    data() {
        return {
            activeName: 'afterSalesInformation',
            currentView: 'afterSalesInformation',
            itemList: [],
            orderAfterSale: {},
            recordList: [],
            sendItemList: []
        }
    },
    created() {
        this.getDetail()
    },
    methods: {
        getDetail() {
            this._apis.order.getOrderAfterSaleDetail({id: this.$route.query.id}).then((res) => {
                console.log(res)
                this.itemList = res.itemList
                this.orderAfterSale = res.orderAfterSale
                this.recordList = res.recordList
                this.sendItemList = res.sendItemList
                this.$notify({
                    title: '成功',
                    message: '查询成功！',
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
        handleClick(tab, event) {
            this.currentView = this.activeName
        }
    },
    components: {
        AfterSalesInformation,
        AftermarketDeliveryInformation
    }   
}
</script>
<style lang="scss" scoped>
    .after-sales-details {
        color: $contentColor;
        .header {
            height: 60px;
            line-height: 60px;
            background-color: #fff;
            padding: 0 20px;
            box-shadow:5px 5px 10px 0px rgba(227,233,228,1);
            .header-righter {
                text-align: right;
            }
        }

        section {
            background-color: #fff;
            padding: 20px;
            margin-top: 20px;
            .row {
                margin: 10px 0;
            }
            .section-header {
                margin: 20px 0;
                color: #161617;
                font-size: 16px;
            }
            &.flow-path {
                margin-top: 50px;
            }
            &.information {
                margin-top: 20px;
                .list-lefter {
                    margin-right: 20px;
                }
                .list-righter {
                  color: #9FA29F;  
                }
                .righter-col {
                    border-left: 2px solid #CACFCB;
                    padding: 10px 20px;
                }
            }
        }

        .flow-path {
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
    }
    .tabs {
        margin-top: 20px;
    }
    /deep/ .el-tabs__nav-scroll {
        background-color: #fff;
    }
    /deep/ .el-tabs__header {
        margin-bottom: 0;
    }
</style>


