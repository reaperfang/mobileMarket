<template>
    <div class="reviews">
        <div class="search">
            <el-form ref="form" :inline="true" :model="formInline" class="form-inline">
                <el-form-item label="订单编号">
                    <el-input v-model="formInline.orderNumber" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="formInline.goodsName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select v-model="formInline.orderState">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in orderStateList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="评价星级">
                    <el-select v-model="formInline.star">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in orderStateList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="下单时间">
                    <el-date-picker
                        v-model="formInline.orderDate"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <div class="buttons">
                    <div class="lefter">
                        <el-button class="border-button">批量审核</el-button>
                        <el-button class="border-button">批量回复</el-button>
                        <el-button @click="$router.push('/order/sensitiveWords')" class="border-button">敏感词设置</el-button>
                    </div>
                    <div class="righter">
                        <span @click="resetForm('form')" class="resetting">重置</span>
                        <el-button type="primary">搜 索</el-button>
                    </div>
                </div>
            </el-form>
        </div>
        <div class="content">
            <p class="statistics">已选择<span>{{multipleSelection.length}}</span>项，全部<span>{{total}}</span>项</p>
            <div class="table-box">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                    :header-cell-style="{background:'#ebeafa', color:'#655EFF'}">
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>
                    <el-table-column
                        prop="tag"
                        label="全部"
                        width="120"
                        :filters="[{ text: '精选', value: '精选' }, { text: '普通', value: '普通' }]"
                        :filter-method="filterTag"
                        filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag color="#FF4B1C">{{scope.row.tag}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="star"
                        label="评价星级"
                        width="120"
                        :filters="[{ text: '1星', value: '1' }, { text: '2星', value: '2' }, { text: '3星', value: '3' }, { text: '4星', value: '4' }, { text: '5星', value: '5' }]"
                        :filter-method="filterStar"
                        filter-placement="bottom-end">
                        <template slot-scope="scope">
                            {{scope.row.star}}星
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="goodsName"
                        label="商品名称"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="orderNumber"
                        label="订单编号">
                    </el-table-column>
                    <el-table-column
                        prop="customerId"
                        label="客户ID">
                    </el-table-column>
                    <el-table-column
                        prop="orderState"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        prop="reply"
                        label="回复">
                    </el-table-column>
                    <el-table-column
                        prop="time"
                        label="最新发货时间">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <span @click="$router.push({ path: '/order/reviewsDetail?id=' +  scope.row.id})" class="blue">查看</span>
                            <span class="blue">同意</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
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
                orderNumber: '', // 订单编号
                goodsName: '', //  商品名称
                orderState: '', //  订单状态
                star: '', //   评价星级
                orderDate: '', //  下单时间
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
            multipleSelection: [],
            multipleTable: [
                {}
            ],
            total: 0,
            listQuery: {
                page: 1,
                limit: 20,
            },
            tableData: [
                {
                    id: 1,
                    tag: '精选',
                    star: '5',
                    goodsName: '商品名称',
                    orderNumber: 1,
                    customerId: 1,
                    orderState: '审核通过',
                    reply: '是',
                    time: '2019'
                }
            ]
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

        },
        filterTag(value, row) {
            return row.tag === value;
        },
        filterStar(value, row) {
            return row.star === value;
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
        margin-top: 20px;
        p {
            font-size: 16px;
            color: #B6B5C8;
            margin: 23px 0 20px 0;
            span {
                color: rgb(76, 75, 83);
            }
        }
        .table-box {
            margin-left: 60px;
        }
    }
}
/deep/ .el-input {
    width: auto;
}
/deep/ .el-table__column-filter-trigger .el-icon-arrow-down:before {
    content: '';
}
/deep/ .el-table__column-filter-trigger {
    margin-left: 8px;
}
/deep/ .el-table__column-filter-trigger .el-icon-arrow-down {
    width: 10px;
    height: 10px;
    background: url(../../assets/images/order/filter.png);
}
/deep/ .el-tag {
    color: #fff;
}
</style>


