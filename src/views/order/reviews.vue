<template>
    <div class="reviews">
        <div class="search">
            <el-form ref="form" :inline="true" :model="formInline" class="form-inline">
                <el-form-item label="订单编号">
                    <el-input v-model="formInline.orderNumber" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="formInline.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select v-model="formInline.orderState">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in orderStateList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="评价星级">
                    <el-select v-model="formInline.orderState">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in orderStateList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请时间">
                    <el-date-picker
                        v-model="formInline.applicationDate"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="售后类型">
                    <el-select v-model="formInline.afterSalesType">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in afterSalesTypeList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="formInline.orderState">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in orderStateList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
                <div class="buttons">
                    <div class="lefter">
                        <el-button>导出</el-button>
                        <el-button>批量审核</el-button>
                    </div>
                    <div class="righter">
                        <span @click="resetForm('form')" class="resetting">重置</span>
                        <el-button type="primary">搜 索</el-button>
                    </div>
                </div>
            </el-form>
        </div>
        <div class="content">
            <p>已选择 {{multipleSelection.length}} 项，全部{{total}}项</p>
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                    prop="id"
                    label="售后单编号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="afterSalesType"
                    label="售后类型"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="afterSalesType"
                    label="售后类型"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="orderNumber"
                    label="订单编号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="orderNumber"
                    label="订单编号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="account"
                    label="买家账号">
                </el-table-column>
                <el-table-column
                    prop="state"
                    label="状态">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="申请时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span>查看</span>
                        <span>同意</span>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </div>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'

export default {
    data() {
        return {
            formInline: {
                orderNumber: '',
                name: '',
                orderState: '',
                orderState: '',
                goodsName: '',
                orderTime: '',
                applicationDate: '',
                afterSalesType: ''
            },
            orderStateList: [
                {
                    label: '全部',
                    value: ''
                },
                {
                    label: '待处理',
                    value: '待处理'
                },
                {
                    label: '部分发货',
                    value: '部分发货'
                },
                {
                    label: '已收货',
                    value: '已收货'
                },
                {
                    label: '全部发货',
                    value: '全部发货'
                },
                {
                    label: '已拒收',
                    value: '已拒收'
                },
                {
                    label: '已关闭',
                    value: '已关闭'
                },
            ],
            afterSalesTypeList: [
                {
                    label: '全部',
                    value: ''
                },
                {
                    label: '退货退款',
                    value: '退货退款'
                },
                {
                    label: '换货',
                    value: '换货'
                },
                {
                    label: '仅退款',
                    value: '仅退款'
                },
            ],
            orderStateList: [],
            multipleSelection: [],
            multipleTable: [
                {}
            ],
            total: 0,
            listQuery: {
                page: 1,
                limit: 20,
            },
        }
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        getList() {

        }
    },
    components: {
        Pagination
    }
}
</script>
<style lang="scss" scoped>
.reviews {
    .search {
        background-color: #fff;
        .form-inline {
            padding: 20px;
        }
        .buttons {
            display: flex;
            justify-content: space-between;
            .resetting {
                color: #FD932B;
                margin-right: 40px;
            }
        }
    }
    .content {
        background-color: #fff;
        padding: 20px;
        p {
            font-size: 16px;
            color: #B6B5C8;
            margin: 23px 0 20px 0;
        }
    }
}
/deep/ .el-input {
    width: auto;
}
</style>


