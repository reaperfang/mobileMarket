<template>
    <div class="after-sales">
        <div class="search">
            <el-form ref="form" :inline="true" :model="listQuery" class="form-inline">
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
                    <el-select v-model="listQuery.orderAfterSaleStatus">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="提交申请" value="0"></el-option>
                        <el-option label="待退货" value="1"></el-option>
                        <el-option label="待处理" value="2"></el-option>
                        <el-option label="待收货" value="3"></el-option>
                        <el-option label="已完成" value="4"></el-option>
                        <el-option label="已关闭" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <div class="buttons">
                    <div class="lefter">
                        <el-button class="border-button" @click="exportOrder">导出</el-button>
                        <el-button class="border-button" @click="batchUpdateStatus">批量审核</el-button>
                    </div>
                    <div class="righter">
                        <span @click="resetForm('form')" class="resetting">重置</span>
                        <el-button @click="getList" type="primary">搜 索</el-button>
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
                    prop="orderAfterSaleStatus"
                    label="状态">
                    <template slot-scope="scope">
                        <span>{{scope.row.orderAfterSaleStatus | orderAfterSaleStatusFilter}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="createTime"
                    label="申请时间">
                </el-table-column>
                <el-table-column label="操作" width="220">
                    <template slot-scope="scope">
                        <span class="blue pointer" @click="$router.push('/order/afterSalesDetails?id=' + scope.row.id)">查看</span>
                        <span class="blue pointer" v-if="scope.row.orderAfterSaleStatus == 0" @click="updateStatus(scope.row)">同意</span>
                        <span class="blue pointer" v-if="scope.row.orderAfterSaleStatus == 0" @click="updateRejectStatus(scope.row)">拒绝</span>
                        <span class="blue pointer" @click="showLogistics(scope.row)" v-if="scope.row.orderAfterSaleStatus == 2">查看物流</span>
                        <span class="blue pointer" @click="confirmReceived(scope.row)" v-if="scope.row.orderAfterSaleStatus == 2">确认收货</span>
                        <span class="blue pointer" @click="drawback(scope.row)" v-if="scope.row.orderAfterSaleStatus == 2">退款</span>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.startIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
        </div>
        <component :is="currentDialog" :dialogVisible.sync="dialogVisible" @submit="onSubmit" :title="title" @reject="rejectHandler" @confirm="confirmHandler" :data="currentData"></component>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import RejectDialog from '@/views/order/dialogs/rejectDialog'
import AuditDialog from '@/views/order/dialogs/auditDialog'
import BatchUpdateStatusDialog from '@/views/order/dialogs/batchUpdateStatusDialog'
import ExchangeGoodsDialog from '@/views/order/dialogs/exchangeGoodsDialog'
import LogisticsDialog from '@/views/order/dialogs/logisticsDialog'

export default {
    data() {
        return {
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
                applicationDate: [],
                orderAfterSaleStatus: ''
            },
            currentDialog: '',
            dialogVisible: false,
            title: '',
            currentData: ''
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
        orderAfterSaleStatusFilter(code) {
            if(code == 0) {
                return '提交申请'
            } else if(code == 1) {
                return '待退货 '
            } else if(code == 2) {
                return '待处理'
            }
             else if(code == 3) {
                return '待收货'
            }
             else if(code == 4) {
                return '已完成'
            }
             else if(code == 5) {
                return '已关闭'
            }
        }
    },
    methods: {
        confirmReceived(row) {
            this._apis.order.orderConfirmReceived({id: row.id, isSellerReceived: 1}).then(res => {
                this.$notify({
                    title: '成功',
                    message: '确认收货成功',
                    type: 'success'
                });
            }).catch(error => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            }) 
        },
        showLogistics(row) {
            this._apis.order.orderLogistics({expressNo: row.returnExpressNo}).then(res => {
                this.currentDialog = 'LogisticsDialog'
                this.currentData = res.traces
                this.dialogVisible = true
            }).catch(error => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            }) 
        },
        drawback(row) {
            this._apis.order.orderAfterSaleDrawback({ids: this.multipleSelection.map(val => val.id)}).then((res) => {
                console.log(res)
                this.$notify({
                    title: '成功',
                    message: '已发起退款，系统处理中。',
                    type: 'success'
                });
            }).catch(error => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            }) 
            // this.confirm({title: '提示', text: '微信账户余额不足，无法退款。'}).then(() => {
                
            // })
        },
        exportOrder() {
           this._apis.order.orderAfterSaleExport({ids: this.multipleSelection.map(val => val.id)}).then((res) => {
                console.log(res)
                this.$notify({
                    title: '成功',
                    message: '导出成功！',
                    type: 'success'
                });
            }).catch(error => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            }) 
        },
        batchUpdateStatus() {
            if(!this.multipleSelection.length) {
                this.confirm({title: '提示', icon: true, text: '请勾选需要批量审核的售后单', confirmText: '我知道了'})
                return
            } else {
                if(this.multipleSelection.filter(val => val.orderAfterSaleStatus != 0).length) {
                    this.confirm({title: '提示', icon: true, text: '选择的数据中包含已经审核过的售后单， 无法批量审核，请重新选择', confirmText: '我知道了'})
                    return
                }
            }

            this.currentDialog = 'BatchUpdateStatusDialog'
            this.title = '批量审核'
            this.dialogVisible = true
        },
        onSubmit(value) {
            console.log(value)
            if(value.status == 1) {
                // 通过
                this._apis.order.orderAfterSaleUpdateStatus({ids: this.multipleSelection.map(val => val.id), orderAfterSaleStatus: 1}).then((res) => {
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
            } else {
                this._apis.order.orderAfterSaleUpdateStatus({ids: this.multipleSelection.map(val => val.id), orderAfterSaleStatus: 5, refuseReason: value.refuseReason}).then((res) => {
                    console.log(res)
                    this.getList()
                    this.$notify({
                        title: '成功',
                        message: '拒绝审核成功！',
                        type: 'success'
                    });
                }).catch(error => {
                    this.$notify.error({
                        title: '错误',
                        message: error
                    });
                })
            }
        },
        updateRejectStatus(row) {
            this.currentDialog = 'RejectDialog'
            this.currentData = row
            this.title = '拒绝审核'
            this.dialogVisible = true
        },
        rejectHandler(value) {
            this._apis.order.orderAfterSaleUpdateStatus({id: this.currentData.id, orderAfterSaleStatus: 5, refuseReason: value.refuseReason}).then((res) => {
                this.getList()
                this.$notify({
                    title: '成功',
                    message: '拒绝审核成功！',
                    type: 'success'
                });
            }).catch(error => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            })
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
                // this.confirm({title: '换货确认', icon: true, text: `是否确认${_title}？`}).then(() => {
                    
                // })
                this.currentDialog = 'ExchangeGoodsDialog'
                this.currentData = row
                this.dialogVisible = true
            }).catch(error => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            })
        },
        // 换货确认
        confirmHandler(value) {
            this._apis.order.orderAfterSaleConfirmExchange({id: this.currentData.id, exchangeConfirmation: value.exchangeConfirmation}).then((res) => {
                this.$notify({
                    title: '成功',
                    message: '换货确认成功！',
                    type: 'success'
                });
            }).catch(error => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            })
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
            
            _param = Object.assign({}, this.listQuery, param, {
                [this.listQuery.searchType]: this.listQuery.searchValue,
                createTimeStart: this.listQuery.applicationDate && this.listQuery.applicationDate.length ? this.listQuery.applicationDate[0] : '',
                createTimeEnd: this.listQuery.applicationDate && this.listQuery.applicationDate.length ? this.listQuery.applicationDate[1] : ''
            })

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
        RejectDialog,
        AuditDialog,
        BatchUpdateStatusDialog,
        ExchangeGoodsDialog,
        LogisticsDialog
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


