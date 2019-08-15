<template>
    <div class="reviews">
        <div class="search">
            <el-form ref="form" :inline="true" :model="listQuery" class="form-inline">
                <el-form-item label="订单编号">
                    <el-input v-model="listQuery.orderCode" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input v-model="listQuery.goodsName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="审核状态">
                    <el-select v-model="listQuery.auditStatus">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="待审核" value="0"></el-option>
                        <el-option label="审核通过" value="1"></el-option>
                        <el-option label="审核未通过" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="评价星级">
                    <el-select v-model="listQuery.starNum">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="1星" value="1"></el-option>
                        <el-option label="2星" value="2"></el-option>
                        <el-option label="3星" value="3"></el-option>
                        <el-option label="4星" value="4"></el-option>
                        <el-option label="5星" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="评论时间">
                    <el-date-picker
                        v-model="listQuery.orderDate"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd hh:mm:ss">
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
                        <el-button @click="getList" type="primary">搜 索</el-button>
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
                        prop="isChoiceness"
                        label="全部"
                        width="120"
                        :filters="[{ text: '精选', value: 1 }, { text: '普通', value: 0 }]"
                        :filter-method="filterTag"
                        filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag v-if="scope.row.isChoiceness == 1" color="#FF4B1C">{{scope.row.isChoiceness | isChoicenessFilter}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="starNum"
                        label="评价星级"
                        width="120"
                        :filters="[{ text: '1星', value: 1 }, { text: '2星', value: 2 }, { text: '3星', value: 3 }, { text: '4星', value: 4 }, { text: '5星', value: 5 }]"
                        :filter-method="filterStar"
                        filter-placement="bottom-end">
                        <template slot-scope="scope">
                            {{scope.row.starNum}}星
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="goodsName"
                        label="商品名称"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="orderInfoCode"
                        label="订单编号">
                    </el-table-column>
                    <el-table-column
                        prop="customerId"
                        label="客户ID">
                    </el-table-column>
                    <el-table-column
                        prop="auditStatus"
                        label="状态">
                    </el-table-column>
                    <el-table-column
                        prop="isReply"
                        label="回复"
                        :filters="[{ text: '是', value: 1 }, { text: '否', value: 0 }]"
                        :filter-method="replyFilterTag"
                        filter-placement="bottom-end">
                    </el-table-column>
                    <el-table-column
                        prop="createTime"
                        label="评价时间">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <span @click="$router.push({ path: '/order/reviewsDetail?id=' +  scope.row.id})" class="blue">查看</span>
                            <span class="blue">同意</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.startIndex" :limit.sync="listQuery.pageSize" @pagination="getList" />
        </div>
    </div>
</template>
<script>
import Pagination from '@/components/Pagination'

export default {
    data() {
        return {
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
                startIndex: 1,
                pageSize: 20,
                orderCode: '', // 订单号
                goodsName: '', // 商品名称
                orderDate: '',
                createTimeStart: '', // 评论查询开始时间
                creaTetimeEnd: '', // 评论查询结束时间
                auditStatus: '', // 审核状态
                starNum: '', // 星级数量
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
    created() {
        this.getList()
    },
    filters: {
        isChoicenessFilter(code) {
            if(code == 1) {
                return '精选'
            }
        }
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        filterTag(value, row) {
            return row.isChoiceness === value;
        },
        replyFilterTag(value, row) {
            return row.isReply == +value;
        },
        filterStar(value, row) {
            return row.starNum === +value;
        },
        getList(param) {
            //this.listLoading = true
            let _param
            
            _param = Object.assign({}, this.listQuery, param, {
                createTimeStart: this.listQuery.orderDate[0],
                creaTetimeEnd: this.listQuery.orderDate[1]
            })

            this._apis.order.getCommentList(_param).then((res) => {
                this.total = +res.total
                this.tableData = res.list
                console.log(res)
            }).catch(error => {
                //this.listLoading = false
            })
        },
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
    padding-left: 2px;
    padding-right: 2px;
}
</style>


