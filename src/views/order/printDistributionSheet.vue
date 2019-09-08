<template>
    <div class="print-distribution-sheet">
        <div class="header">
            打印配送单预览
        </div>
        <div class="content print-content" style="color: #161617;">
            <div v-for="(item, index) in tableData" :key="index" style="page-break-after:always;">
                <div class="title" style="color: #161617; font-size: 18px; text-align: center; margin-bottom: 18px;">配送单</div>
                <div class="table-head" style="border: 1px solid #ccc; border-bottom: none; color: #161617; font-size: 14px; padding: 20px 25px; padding-bottom: 10px;">
                    <template v-if="$route.query.afterSale">
                        <div style="display: flex; margin-bottom: 15px;">
                            <div class="item" style="width: 280px;">订单编号：{{item.orderAfterSaleSendInfo.orderAfterSaleCode}}</div>
                            <div class="item">发货日期：{{item.orderAfterSaleSendInfo.sendTime}}</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px;">
                            <div class="item" style="width: 280px;">客户ID：{{item.orderAfterSaleSendInfo.memberSn}}</div>
                            <div class="item">客户昵称：{{item.orderAfterSaleSendInfo.nickName}}</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px;">
                            <div class="item" style="width: 280px;">收货人：{{item.orderAfterSaleSendInfo.receivedName}}</div>
                            <div class="item">收货地址：{{item.orderAfterSaleSendInfo.receivedDetail}}</div>
                        </div>
                    </template>
                    <template v-else>
                        <div style="display: flex; margin-bottom: 15px;">
                            <div class="item" style="width: 280px;">订单编号：{{item.orderCode}}</div>
                            <div class="item">发货日期：{{item.updateTime}}</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px;">
                            <div class="item" style="width: 280px;">客户ID：{{item.memberSn}}</div>
                            <div class="item">客户昵称：{{item.memberName}}</div>
                        </div>
                        <div style="display: flex; margin-bottom: 15px;">
                            <div class="item" style="width: 280px;">收货人：{{item.receivedName}}</div>
                            <div class="item">收货地址：{{item.receivedDetail}}</div>
                        </div>
                    </template>
                </div>
                <table border="1" style="border-collapse:collapse; width: 100%; border-color: rgb(205, 208, 206); border: 1px solid rgb(205, 208, 206);">
                    <tr style="background: rgba(243, 244, 243);">
                        <td style="height: 45px; text-align: center;">序号</td>
                        <td style="height: 45px; text-align: center;">商品名称</td>
                        <td style="height: 45px; text-align: center;">数量</td>
                        <td style="height: 45px; text-align: center;">单价</td>
                        <td style="height: 45px; text-align: center;">优惠</td>
                        <td style="height: 45px; text-align: center;">金额</td>
                    </tr>
                    <tr v-for="(sendItem, index) in item.orderSendItemViewList" :key="index">
                        <td style="height: 45px; text-align: center;">{{index + 1}}</td>
                        <td style="height: 45px; text-align: center;">{{sendItem.goodsName}}</td>
                        <td style="height: 45px; text-align: center;">{{sendItem.sendCount}}</td>
                        <td style="height: 45px; text-align: center;">1</td>
                        <td style="height: 45px; text-align: center;">¥80.00</td>
                        <td style="height: 45px; text-align: center;">$100</td>
                    </tr>
                </table>
                <div class="table-footer" style="border: 1px solid rgb(205, 208, 206); border-top: none; color: #161617; font-size: 14px; padding: 20px 25px; padding-bottom: 10px;">
                    <div style="display: flex;">
                        <!-- <div class="item" style="margin-right: 40px;">商户账号：11111111</div> -->
                        <div class="item" style="margin-right: 40px;">店铺名称：{{item.tcShopInfo.shopName}}</div>
                        <div class="item">商户联系方式：{{item.tcShopInfo.phone}}</div>
                    </div>
                </div>
                <div class="footer" style="color: #161617; text-align: right; padding-top: 12px;">
                    <p>打印时间：{{printTime}}</p>
                </div>
            </div>
        </div>
        <div class="tc" style="margin-top: 20px;">
            <el-button @click="print" type="primary">打印</el-button>
        </div>
    </div>  
</template>
<script>
import utils from "@/utils";

export default {
    data() {
        return {
            tableData: [],
            printTime: utils.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss")
        }
    },
    created() {
        this.getPrintInfo()
    },
    methods: {
        getPrintInfo() {
            if(this.$route.query.afterSale) {
                this._apis.order.afterSalePrintSendInfo({ids: this.$route.query.ids.split(',')}).then((res) => {
                    this.tableData = res
                }).catch(error => {
                    this.$notify.error({
                        title: '错误',
                        message: error
                    });
                })
            } else {
                this._apis.order.orderSendInfoPrint({ids: this.$route.query.ids.split(',')}).then((res) => {
                    this.tableData = res
                }).catch(error => {
                    this.$notify.error({
                        title: '错误',
                        message: error
                    });
                })
            }
        },
        print() {
            this.printTime = utils.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss")
            setTimeout(() => {
                let _href = window.location.href
                //1.获取当前页的html代码  

                var body = window.document.body.innerHTML; 

                //2.要打印的部分（#print里面的内容就是要打印的内容）

                window.document.body.innerHTML = document.getElementsByClassName("print-content")[0].innerHTML; 

                window.print();

                window.document.body.innerHTML = body;

                //重新载入当前文档:

                window.location.href = _href
            }, 0)
        }
    }
}
</script>
<style lang="scss" scoped>
    .print-distribution-sheet {
        background-color: #fff;
        padding: 20px;
        color: rgb(205, 208, 206);
        .header {
            margin-bottom: 20px;
        }
    }
</style>


