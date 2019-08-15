<template>
    <div class="after-sales">
        <div class="search">
            <el-form ref="form" :inline="true" :model="formInline" class="form-inline">
                <el-form-item>
                    <el-input placeholder="请输入内容" v-model="listQuery.searchValue" class="input-with-select">
                        <el-select v-model="listQuery.searchType" slot="prepend" placeholder="请输入">
                            <el-option label="售后单编号" value="code"></el-option>
                            <el-option label="订单编号" value="orderInfoCode"></el-option>
                            <el-option label="客户ID" value="memberSn"></el-option>
                        </el-select>
                    </el-input>
                </el-form-item>
                <el-form-item label="申请时间">
                    <el-date-picker
                        v-model="listQuery.applicationDate"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="售后类型">
                    <el-select v-model="listQuery.type">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="退货退款" value="1"></el-option>
                        <el-option label="换货" value="2"></el-option>
                        <el-option label="仅退款" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="listQuery.sellerStatus">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in orderStateList" :key="index"></el-option>
                        <el-option label="全部" value=""></el-option>
                        <el-option label="提交申请" value="0"></el-option>
                        <el-option label="取消申请" value="1"></el-option>
                        <el-option label="审核通过" value="2"></el-option>
                        <el-option label="审核拒绝" value="3"></el-option>
                        <el-option label="客户发货" value="4"></el-option>
                        <el-option label="确认收货" value="5"></el-option>
                        <el-option label="商户发货" value="6"></el-option>
                        <el-option label="客户收货" value="7"></el-option>
                        <el-option label="退款" value="8"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList">查询</el-button>
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
                    prop="code"
                    label="售后单编号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="售后类型"
                    width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.type | typeFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderInfoCode"
                    label="订单编号"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="memberSn"
                    label="客户ID"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="sellerStatus"
                    label="状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.sellerStatus | sellerStatusFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="createTimeStart"
                    label="申请时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span @click="$router.push('/order/afterSalesDetails?id=' + scope.row.id)">查看</span>
                        <span @click="updateStatus(scope.row)">同意</span>
                        <span @click="updateRejectStatus(scope.row)">拒绝</span>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.startIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
        </div>
        <component :is="currentDialog" :dialogVisible.sync="dialogVisible" @submit="onSubmit"></component>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import RejectDialog from '@/views/order/dialogs/rejectDialog'

export default {
    data() {
        return {
            formInline: {
                orderNumber: '',
                orderState: '',
                goodsName: '',
                orderNumberType: '订单编号',
                orderTime: '',
                applicationDate: '',
                afterSalesType: ''
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
            multipleSelection: [],
            multipleTable: [
                {}
            ],
            total: 0,
            tableData: [],
            listQuery: {
                startIndex: 1,
                pageSize: 20,
                searchValue: '',
                searchType: '',
                applicationDate: []
            },
            currentDialog: '',
            dialogVisible: false
        }
    },
    created() {
        this.getList()
    },
    filters: {
        typeFilter(code) {
            if(code == 1) {
                return '退货退款'
            } else if(code == 2) {
                return '换货'
            } else if(code == 3) {
                return '仅退款'
            }
        },
        sellerStatusFilter(code) {
            if(code == 0) {
                return '提交申请'
            } else if(code == 1) {
                return '取消申请 '
            } else if(code == 2) {
                return '审核通过'
            }
             else if(code == 3) {
                return '审核拒绝'
            }
             else if(code == 4) {
                return '客户发货'
            }
             else if(code == 5) {
                return '确认收货'
            }else if(code == 6) {
                return '商户发货'
            }else if(code == 7) {
                return '客户收货'
            }else if(code == 8) {
                return '退款'
            }
        }
    },
    methods: {
        onSubmit() {
            
        },
        updateRejectStatus(row) {

        },
        updateStatus(row) {
            this._apis.order.orderAfterSaleUpdateStatus({id: row.id, orderAfterSaleStatus: 1}).then((res) => {
                console.log(res)
                this.getList()
                this.$notify({
                    title: '成功',
                    message: '审核成功！',
                    type: 'success'
                });
            }).catch(error => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            })
        },
        onSubmit() {

        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        getList(param) {
            //this.listLoading = true
            let _param
            
            _param = Object.assign({}, this.listQuery, param)

            this._apis.order.getOrderAfterSalePageList(_param).then((res) => {
                this.total = +res.total
                console.log(res)
                this.tableData = res.list
            }).catch(error => {
                //this.listLoading = false
            })
        },
    },
    components: {
        Pagination,
        RejectDialog
    }
}
</script>
<style lang="scss" scoped>
.after-sales {
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
/deep/ .input-with-select .el-input__inner {
  width: 139px;
}
</style>


