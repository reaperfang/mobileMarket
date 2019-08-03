<template>
    <div class="print-distribution-sheet">
        <div class="header">
            打印配送单预览
        </div>
        <div class="content">
            <div class="title">配送单</div>
            <div class="table-box">
                <div class="table-headers">
                    <div class="row">
                        <div class="col">
                            <div class="row">
                                <div class="col">
                                    订单编号：
                                </div>
                                <div class="col">
                                    
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    客户ID：
                                </div>
                                <div class="col">
                                    
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    收货人： 
                                </div>
                                <div class="col">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row">
                                <div class="col">
                                    发货日期：
                                </div>
                                <div class="col">
                                    
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    客户昵称：
                                </div>
                                <div class="col">
                                    
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    收货地址： 
                                </div>
                                <div class="col">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                    prop="number"
                    label="序号"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="商品名称"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="quantity"
                    label="数量">
                    </el-table-column>
                    <el-table-column
                    prop="price"
                    label="单价">
                    </el-table-column>
                    <el-table-column
                    prop="money"
                    label="金额">
                    </el-table-column>
                </el-table>
                <div class="table-footer">
                    <span>商户账号：</span>
                    <span>店铺名称：</span>
                    <span>商户联系方式：</span>
                </div>
            </div>
        </div>
        <div class="footer">
            <p>打印时间：</p>
            <p><el-button type="primary">打印</el-button></p>
        </div>
    </div>  
</template>
<script>
export default {
    data() {
        return {
            tableData: []
        }
    }
}
</script>
<style lang="scss" scoped>
    .print-distribution-sheet {
        background-color: #fff;
        padding: 20px;
        .content {
            padding: 20px 40px;
            .title {
                text-align: center;
                padding: 20px 15px;
                font-size: 18px;
            }
            .table-box {
                border: 1px solid #EBEEF5;
                .table-headers {
                    padding: 20px 25px;
                }
                .table-footer {
                    padding: 20px 15px;
                }
            }
        }
        .footer {
            padding: 0 40px;
            p:first-child {
                text-align: right;
            }
            p:last-child {
                text-align: center;
                margin-top: 40px;
            }
        }
    }
    
</style>


