<template>
    <div class="query">
        <section>
            <el-form :inline="true" :model="formInline" ref="formInline" class="form-inline">
                <el-form-item label="">
                    <el-select v-model="formInline.orderNumber" placeholder="">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in orderNumberList" :key="index"></el-option>
                    </el-select>
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="订单来源">
                    <el-select v-model="formInline.origin" placeholder="">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in orderOriginList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单类型">
                    <el-select v-model="formInline.type" placeholder="">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in orderTypeList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付方式">
                    <el-select v-model="formInline.paymentMode" placeholder="">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in paymentModeList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="发货类型">
                    <el-select v-model="formInline.deliveryMode" placeholder="">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in deliveryModeList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select v-model="formInline.orderStatus" placeholder="">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in orderStatusList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="formInline.orderTime" placeholder="">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in orderTimeList" :key="index"></el-option>
                    </el-select>
                    <el-date-picker
                        v-model="formInline.orderTimeValue"
                        type="daterange"
                        range-separator="-"
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
                <el-button>导出订单</el-button>
                <el-button>批量导入发货</el-button>
                <el-button>批量发货</el-button>
                <el-button>批量补填物流</el-button>
            </div>
        </section>
        <section>
            <p>已选择 {{checkedLength}} 项，全部{{total}}项</p>
            <el-tabs v-model="activeName">
                <el-tab-pane label="商城订单" name="shop">
                    <shop></shop>
                </el-tab-pane>
                <el-tab-pane label="积分商城订单" name="integralShop">
                    
                </el-tab-pane>
            </el-tabs>
        </section>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import Shop from './components/shop'
import IntegralShop from './components/integralShop'

export default {
    data() {
        return {
            formInline: {
                orderNumber: '',
                origin: '',
                type: '',
                paymentMode: '',
                deliveryMode: '',
                orderStatus: '',
                orderTime: '',
                orderTimeValue: ''
            },
            orderNumberList: [],
            orderOriginList: [],
            orderTypeList: [],
            paymentModeList: [],
            deliveryModeList: [],
            orderStatusList: [],
            orderTimeList: [],
            checkedLength: '',
            total: 0,
            listQuery: {
                page: 1,
                limit: 20,
            },
            activeName: 'shop'
        }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
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
        }
    }
    /deep/ .el-input {
        width: auto;
    }
    .resetting {
        color: #FD932B;
        margin-right: 7px;
    }
</style>

