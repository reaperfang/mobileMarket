<template>
    <div class="query">
        <section>
            <el-form :inline="true" :model="formInline" ref="formInline" class="form-inline">
                <el-form-item label="">
                    <el-input placeholder="请输入内容" v-model="formInline.searchValue" class="input-with-select">
                        <el-select v-model="formInline.searchType" slot="prepend" placeholder="请输入">
                            <el-option label="订单编号" value="code"></el-option>
                            <el-option label="商品名称" value="goodsName"></el-option>
                            <el-option label="客户ID" value="memberSn"></el-option>
                            <el-option label="收货人联系电话" value="receivedPhone"></el-option>
                            <el-option label="收货人" value="receivedName"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
                <el-form-item label="订单来源">
                    <el-select v-model="formInline.channelInfoId" placeholder="">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="小程序" :value="1"></el-option>
                        <el-option label="公众号" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单类型">
                    <el-select v-model="formInline.orderType" placeholder="">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="普通订单" :value="1"></el-option>
                        <el-option label="拼团订单" :value="2"></el-option>
                        <el-option label="优惠套餐订单" :value="3"></el-option>
                        <el-option label="赠品订单" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付方式">
                    <el-select v-model="formInline.payWay" placeholder="">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="线上支付" :value="1"></el-option>
                        <el-option label="货到付款" :value="2"></el-option>
                        <el-option label="找人代付" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发货类型">
                    <el-select v-model="formInline.sendType" placeholder="">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="正常发货" :value="1"></el-option>
                        <el-option label="自动发货" :value="2"></el-option>
                        <el-option label="优先发货" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select v-model="formInline.orderStatus" placeholder="">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="待付款" :value="0"></el-option>
                        <el-option label="待成团" :value="1"></el-option>
                        <el-option label="关闭" :value="2"></el-option>
                        <el-option label="待发货" :value="3"></el-option>
                        <el-option label="部分发货" :value="4"></el-option>
                        <el-option label="待收货" :value="5"></el-option>
                        <el-option label="完成" :value="6"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select class="date-picker-select" v-model="formInline.searchTimeType" placeholder="">
                        <el-option label="下单时间" value="createTime"></el-option>
                        <el-option label="完成时间" value="complateTime"></el-option>
                        <el-option label="发货时间" value="sendTime"></el-option>
                    </el-select>
                    <el-date-picker
                        v-model="formInline.orderTimeValue"
                        type="daterange"
                        range-separator="-"
                        value-format="yyyy-MM-dd hh:mm:ss"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item style="float: right;">
                    <span @click="resetForm('formInline')" class="resetting">重置</span>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
            <div>
                <el-button class="border-button">导出订单</el-button>
                <el-button class="border-button" @click="$router.push('/order/batchImportAndDelivery')">批量导入发货</el-button>
                <el-button class="border-button" @click="$router.push('/order/deliverGoods')">批量发货</el-button>
                <el-button class="border-button" @click="$router.push('/order/richLogistics')">批量补填物流</el-button>
            </div>
        </section>
        <section>
            <p class="statistics">已选择<span>{{checkedLength}}</span>项，全部<span>{{total}}</span>项</p>
            <el-tabs class="tabs" v-model="activeName">
                <el-tab-pane label="商城订单" name="shop">
                    <shop ref="shop" :params="formInline"></shop>
                </el-tab-pane>
                <el-tab-pane label="积分商城订单" name="integralShop">
                    <integralShop></integralShop>
                </el-tab-pane>
            </el-tabs>
        </section>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import Shop from './components/shop'
import IntegralShop from './components/integralShop'
import { fetchOrderList } from "@/api/order";

export default {
    data() {
        return {
            formInline: {
                searchType: 'code', 
                searchValue: '',
                code: '', // 订单编号
                goodsName: '', // 商品名称
                memberSn: '', // 客户ID
                receivedPhone: '', // 收货人手机号
                receivedName: '', // 收货人姓名
                channelInfoId: '', // 订单来源
                orderType: '', // 订单类型 1普通订单,2拼团订单,3优惠套餐订单,4赠品订单
                payWay: '', // 付款方式:1线上支付,2货到付款,3找人代付
                sendType: '', // 发货类型:1正常发货,2自动发货,3优先发货
                orderStatus: '', // 订单流程状态：0待付款 1待成团 2关闭 3待发货 4部分发货 5待收货 6完成
                searchTimeType: 'createTime', // 下单时间: createTime 完成时间: complateTime 发货时间: sendTime
                orderTimeValue: ''
            },
            list: [
                {
                    number: '1',
                    orderTime: '2019-06-04 12:00:00',
                    orderMode: '拼团',
                    customer: '小李',
                    origin: '小程序',
                    checked: false,
                    payAmount: '1000',
                    paymentMode: '微信支付',
                    receiver: '张三',
                    mobile: '13800000000',
                    shippingMethod: '普通快递',
                    state: '已完成',
                    goodsList: [
                        {
                            goodsName: '苹果',
                            spec: '5斤',
                            quantity: 10,
                        },
                        {
                            goodsName: '梨',
                            spec: '5斤',
                            quantity: 10,
                            state: '已完成'
                        }
                    ]
                }
            ],
            checkedLength: 0,
            total: 0,
            listQuery: {
                page: 1,
                limit: 20,
            },
            activeName: 'shop'
        }
    },
    created() {
        // fetchOrderList()
        // .then(res => {
        //     console.log(res)
        // })
        // .catch(error => {
            
        // });
        this._globalEvent.$on('checkedLength', number => {
            this.checkedLength = number
        })
        this._globalEvent.$on('total', number => {
            this.total = number
        })
    },
    methods: {
      onSubmit() {
        this.$refs['shop'].getList()
      },
      resetForm(formName) {
          this.$refs[formName].resetFields();
      }
    },
    components: {
        Pagination,
        Shop,
        IntegralShop
    }
}
</script>
<style lang="scss" scoped>
    .query {
        section {
            background-color: #fff;
            padding: 20px;
            margin-bottom: 20px;
            border-radius:4px;
            .statistics {
                color: #e0dee8;
                span {
                    color: #aaa9ad;
                }
            }
            .tabs {
                margin-left: 60px;
            }
        }
    }
    /deep/ .el-input {
        width: auto;
    }
    .resetting {
        color: #FD932B;
        margin-right: 7px;
    }
    /deep/ .input-with-select .el-input__inner {
        width: 139px;
    }
    /deep/ .el-date-editor {
        margin-left: -6px;
        border-radius: 0 0 4px 4px;
    }
    /deep/ .date-picker-select .el-input__inner {
        border-radius: 4px 0 0 4px;
    }
    /deep/ .date-picker-select .el-input__inner:focus {
        border-color: #DCDFE6;
    }
</style>

