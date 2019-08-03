<template>
    <div class="deliver-goods">
        <div class="deliver-goods-header">
            <div class="item">补填物流信息</div>
            <div class="item"><el-button>返 回</el-button></div>
        </div>
        <div class="container">
            <div class="container-item">
                <p>1. 选择您要进行发货的商品及数量</p>
                <div class="container-item-content">
                    <div class="title">
                        <div>
                            <span>商品清单</span>
                            <span>订单编号 {{}}</span>
                        </div>
                    </div>
                    <div class="content">
                        <el-table
                            ref="table"
                            :data="tableData"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column
                                prop="number"
                                label="序号"
                                width="180">
                            </el-table-column>
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
                                prop="theoryNumber"
                                label="应发数量">
                            </el-table-column>
                            <el-table-column
                                prop="realityNumber"
                                label="可发货数量">
                            </el-table-column>
                            <el-table-column
                                prop="thisNumber"
                                label="本次发货数量">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.thisNumber"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div class="container-item">
                <p>2.确认收发货信息</p>
                <div class="container-item-content title-section">
                    <div class="title title-section-header">
                        <div class="title-list title-section-header-lefter">
                            <i class="take-in-icon"></i>
                            <span>收货信息</span>
                        </div>
                        <div class="blue title-section-header-righter">修改收货信息</div>
                    </div>
                    <div class="content">
                        <div class="item">
                            <div class="label">收货人</div>
                            <div class="value">{{}}</div>
                        </div>
                        <div class="item">
                            <div class="label">联系电话</div>
                            <div class="value">{{}}</div>
                        </div>
                        <div class="item">
                            <div class="label">收货信息</div>
                            <div class="value">{{}}</div>
                        </div>
                    </div>
                </div>
                <div class="container-item-content">
                    <div class="title">
                        <div class="title-list">
                            <i class="deliver-icon"></i>
                            <span>发货信息</span>
                        </div>
                        <div class="blue">修改发货信息</div>
                    </div>
                    <div class="content">
                        <div class="item">
                            <div class="label">发货人</div>
                            <div class="value">{{}}</div>
                        </div>
                        <div class="item">
                            <div class="label">联系电话</div>
                            <div class="value">{{}}</div>
                        </div>
                        <div class="item">
                            <div class="label">发货信息</div>
                            <div class="value">{{}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-item">
                <p>3.填写物流信息</p>
                <div class="logistics">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="快递公司" prop="name">
                            <el-select v-model="ruleForm.name" placeholder="请选择">
                                <el-option :label="item.label" :value="item.value" v-for="(item, index) in nameList" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="快递单号" prop="number">
                            <el-input v-model="ruleForm.number"></el-input>
                        </el-form-item>
                        <el-form-item label="物流备注" prop="remarks">
                            <el-input
                                style="width: 623px;"
                                type="textarea"
                                :rows="2"
                                placeholder="非必填，请输入，不超过100个字符"
                                v-model="ruleForm.remarks">
                            </el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="footer">
                <el-button>打印电子面单</el-button>
                <el-button>打印配送单</el-button>
                <el-button type="primary">发 货</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [
                {}
            ],
            multipleSelection: [],
            ruleForm: {
                name: '',
                number: '',
                remarks: ''
            },
            rules: {

            }
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
}
</script>
<style lang="scss" scoped>
    .deliver-goods {
        .blue {
            color: $globalMainColor;
        }
        background-color: #fff;
        padding: 20px;
        .deliver-goods-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .container {
            .container-item {
                margin-top: 20px;
                p {
                    margin-bottom: 20px;
                }
                .container-item-content {
                    border: 1px solid rgb(202, 207, 203);
                    border-radius: 5px;
                    margin-bottom: 20px;
                    .title {
                        display: flex;
                        justify-content: space-between;
                        height: 60px;
                        line-height: 60px;
                        background-color: rgb(243, 244, 244);
                        border-radius: 5px 5px 0 0;
                        padding: 0 20px;
                        .title-list {
                            display: flex;
                            align-items: center;
                            i {
                                width: 22px;
                                height: 22px;
                                display: inline-block;
                                margin-right: 9px;
                            }
                        }
                        .deliver-icon {
                            background: url(../../assets/images/order/deliver.png);
                        }
                        .take-in-icon {
                            background: url(../../assets/images/order/take-in-icon.png);
                        }
                    }
                    .content {
                        padding: 20px;
                        .item {
                            display: flex;
                            .label {
                                margin-right: 20px;
                            }
                            .value {
                                color: #9FA29F;
                            }
                        }
                    }
                }
            }
        }
    }
    /deep/ .el-input  {
        width: auto;
    }
    /deep/ .el-textarea {
        width: auto;
    }
    .footer {
        text-align: center;
        margin-top: 40px;
    }
</style>

