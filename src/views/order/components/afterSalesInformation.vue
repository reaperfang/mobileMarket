<template>
    <div class="after-sales-information">
        <section class="information">
            <p class="section-header">售后信息</p>
            <div class="row align-center justity-between">
                <div class="col">
                    <div class="row justity-between">
                        <div class="col list-lefter">
                            售后原因
                        </div>
                        <div class="col list-righter">
                            其他
                            <div class="images">
                                <img src="" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col righter-col">
                    <div class="row justity-between">
                        <div class="col list-lefter">
                            退款方式
                        </div>
                        <div class="col list-righter">
                            原支付方式退还
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section>
            <p class="section-header">售后商品清单</p>
            <div class="title-section">
                <div class="title-section-header">
                    <div class="title-section-header-lefter">
                        <span>快递单号：{{}}</span> | 
                        <span>公众号</span> | 
                        <span>拼团订单</span>
                    </div>
                </div>
                <div class="content">
                    <el-table
                        :data="tableData"
                        style="width: 100%">
                        <el-table-column
                            label="商品"
                            width="180">
                            <template slot-scope="scope">
                                <div class="row justity-between">
                                    <div class="col">
                                        
                                    </div>
                                    <div class="col">
                                        
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
                            label="数量">
                        </el-table-column>
                        <el-table-column
                            prop="total"
                            label="小计">
                        </el-table-column>
                        <el-table-column
                            prop="time"
                            label="售后有效期">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </section>
        <section class="gift">
            <p class="section-header">买家退还奖励</p>
            <div class="row">
                <div class="col">
                    积分：
                </div>
                <div class="col">
                    
                </div>
            </div>
            <div class="row">
                <div class="col">
                    赠品：
                </div>
                <div class="col">
                    
                </div>
            </div>
            <div class="row">
                <div class="col">
                    红包：
                </div>
                <div class="col">
                    
                </div>
            </div>
            <div class="row">
                <div class="col">
                    优惠券：
                </div>
                <div class="col">
                    <div class="coupon-box">
                        <div class="coupon">
                            <div class="item lefter">
                                <p>{{data.price}}</p>
                                <p>元</p>
                            </div>
                            <div class="item righter">
                                <p>{{data.detail}}</p>
                                <p class="limit">{{data.limit}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    优惠码：
                </div>
                <div class="col">
                    <div class="coupon-box">
                        <div class="coupon-code">
                            <div class="coupon-code-header">优惠码 {{data.code}}</div>
                            <div class="coupon">
                                <div class="item lefter">
                                    <p>{{data.price}}</p>
                                    <p>元</p>
                                </div>
                                <div class="item righter">
                                    <p>{{data.detail}}</p>
                                    <p class="limit">{{data.limit}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="drawback">
            <p class="section-header">卖家退款合计</p>
            <div class="row justity-between">
                <div class="col">
                    <div class="row">
                        <div class="col">
                            应退积分：
                        </div>
                        <div class="col">
                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            应退金额：
                        </div>
                        <div class="col">
                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            应退余额：
                        </div>
                        <div class="col">
                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            剩余退还余额：
                        </div>
                        <div class="col">
                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            退还优惠券：
                        </div>
                        <div class="col">
                            <div class="coupon-box">
                                <div class="coupon">
                                    <div class="item lefter">
                                        <p>{{data.price}}</p>
                                        <p>元</p>
                                    </div>
                                    <div class="item righter">
                                        <p>{{data.detail}}</p>
                                        <p class="limit">{{data.limit}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            退还优惠码：
                        </div>
                        <div class="col">
                            <div class="coupon-box">
                                <div class="coupon-code">
                                    <div class="coupon-code-header">优惠码 {{data.code}}</div>
                                    <div class="coupon">
                                        <div class="item lefter">
                                            <p>{{data.price}}</p>
                                            <p>元</p>
                                        </div>
                                        <div class="item righter">
                                            <p>{{data.detail}}</p>
                                            <p class="limit">{{data.limit}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="row">
                        <div class="col">
                            退还积分：
                        </div>
                        <div class="col">
                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            实退金额：
                        </div>
                        <div class="col">
                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            退还余额：
                        </div>
                        <div class="col">
                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            剩余退还余额：
                        </div>
                        <div class="col">
                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            退还优惠：
                        </div>
                        <div class="col">
                            <div class="coupon-box">
                                <div class="coupon">
                                    <div class="item lefter">
                                        <p>{{data.price}}</p>
                                        <p>元</p>
                                    </div>
                                    <div class="item righter">
                                        <p>{{data.detail}}</p>
                                        <p class="limit">{{data.limit}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            退还优惠码：
                        </div>
                        <div class="col">
                            <div class="coupon-box">
                                <div class="coupon-code">
                                    <div class="coupon-code-header">优惠码 {{data.code}}</div>
                                    <div class="coupon">
                                        <div class="item lefter">
                                            <p>{{data.price}}</p>
                                            <p>元</p>
                                        </div>
                                        <div class="item righter">
                                            <p>{{data.detail}}</p>
                                            <p class="limit">{{data.limit}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="record">
            <p class="section-header">操作记录</p>
            <el-table
                :data="recordList"
                style="width: 100%">
                <el-table-column
                    prop="operate"
                    label="操作"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="operater"
                    label="操作人"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="操作时间">
                </el-table-column>
            </el-table>
        </section>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [
                {}
            ],
            data: {
                price: '500',
                detail: '订单满2000元使用（不含邮费）',
                limit: '2019',
                code: '1'
            },
        }
    },
    props: {
        recordList: {
            type: Array,
            required: true
        }
    }
}
</script>
<style lang="scss" scoped>
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
            margin-top: 0;
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
</style>


