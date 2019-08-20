<template>
    <div class="after-sales">
        <div class="search">
            <div class="top">说明：当前已开启订单自动发货，自动发货后请尽快补充物流信息，您也可以到</div>
            <el-form ref="form" :inline="true" :model="formInline" class="form-inline">
                <el-form-item label="售后单编号">
                    <el-select v-model="formInline.orderNumberType">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in orderNumberTypeList" :key="index"></el-option>
                    </el-select>
                    <el-input v-model="formInline.orderNumber" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="订单状态">
                    <el-select v-model="formInline.orderState">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in orderStateList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="formInline.goodsNameType">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in goodsNameTypeList" :key="index"></el-option>
                    </el-select>
                    <el-input v-model="formInline.goodsName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-select v-model="formInline.orderTimeType">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in orderTimeTypeList" :key="index"></el-option>
                    </el-select>
                    <el-date-picker
                        v-model="formInline.orderTime"
                        type="datetimerange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
                <div class="buttons">
                    <div class="lefter">
                        <el-button>批量导入发货</el-button>
                        <el-button>批量发货</el-button>
                        <el-button>批量打印配送单</el-button>
                        <el-button>批量打印电子面单</el-button>
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
                    prop="code"
                    label="售后单编号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="memberSn"
                    label="客户ID"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="receivedName"
                    label="收货人">
                </el-table-column>
                <el-table-column
                    prop="receivedPhone"
                    label="收货人电话">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.status | statusFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="最新发货时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span @click="$router.push('/order/orderDetail?id=' + scope.row.id)">查看</span>
                        <span @click="$router.push('/order/deliverGoods?id=' + scope.row.id + '&orderId=' + scope.row.orderId)">发货</span>
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
                orderState: '',
                goodsName: '',
                orderNumberType: '订单编号',
                goodsNameType: '商品名称',
                orderTimeType: '发货时间',
                orderTime: ''
            },
            orderNumberTypeList: [
                {
                    label: '订单编号',
                    value: '订单编号'
                },
                {
                    label: '收货人联系电话',
                    value: '收货人联系电话'
                },
                {
                    label: '快递单号',
                    value: '快递单号'
                },
                {
                    label: '客户ID',
                    value: '客户ID'
                },
            ],
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
            goodsNameTypeList: [
                {
                    label: '商品名称',
                    value: '商品名称'
                },
                {
                    label: '快递公司',
                    value: '快递公司'
                },
                {
                    label: '收货人',
                    value: '收货人'
                },
            ],
            orderTimeTypeList: [
                {
                    label: '发货时间',
                    value: '发货时间'
                },
                {
                    label: '下单时间',
                    value: '下单时间'
                },
                {
                    label: '售后时间',
                    value: '售后时间'
                },
            ],
            multipleSelection: [],
            multipleTable: [
                {}
            ],
            total: 0,
            listQuery: {
                startIndex: 1,
                pageSize: 20,
            },
            tableData: []
        }
    },
    created() {
        this.getList()
    },
    filters: {
        statusFilter(code) {
            switch(code) {
                case 3:
                    return '待发货'
                case 4:
                    return '部分发货'
                case 5:
                    return '待收货'
                case 6:
                    return '完成'
            }
        },
    },
    methods: {
        onSubmit() {

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        getList() {
            this._apis.order.getOrderAfterSaleList(this.listQuery).then((res) => {
                console.log(res)
                this.total = +res.total
                this.tableData = res.list
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
        }
    },
    components: {
        Pagination
    }
}
</script>
<style lang="scss" scoped>
.after-sales {
    .search {
        background-color: #fff;
        .top {
            background-color: rgb(255, 247, 238);
            color: rgb(254, 121, 95);
            height: 44px;
            line-height: 44px;
            padding: 0 20px;
        }
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


