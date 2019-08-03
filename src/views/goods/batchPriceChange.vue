<template>
    <div class="batch-price-change">
        <section class="header">
            <el-row type="flex" align="center">
                <el-col :span="12">
                    <div class="grid-content header-lefter">
                        <el-button type="primary">新建商品</el-button>
                        <el-button>批量改价</el-button>
                        <span>导入记录</span>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content header-righter">
                        <span class="span-box"><span>刷新</span><i></i></span>
                    </div>
                </el-col>
            </el-row>
            <div class="search">
                <el-form :inline="true" :model="formInline" class="form-inline">
                    <el-form-item label="商品名称：">
                        <el-input v-model="formInline.name" placeholder="请输入关键字…"></el-input>
                    </el-form-item>
                    <el-form-item label="商品状态：">
                        <el-select v-model="formInline.region" placeholder="所有状态">
                            <el-option :label="item.label" :value="item.value" v-for="(item, index) in stateiIems" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </section>
        <section>
            <div>
                <el-button @click="moreManageHandler" type="primary">批量改价</el-button>
                <el-button @click="isCategory = true; showTableCheck = true">类目改价</el-button>
            </div>
            <div class="table-header">
                <div :class="{active: state == 0}" @click="stateHandler(0)" class="item">出售中</div>
                <div :class="{active: state == 1}" @click="stateHandler(1)" class="item">仓库中</div>
                <div :class="{active: state == 2}" @click="stateHandler(2)" class="item">已售罄</div>
            </div>
            <el-table
                :data="list"
                ref="table"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                    v-if="showTableCheck"
                    type="selection"
                    width="55">
                </el-table-column>
                <el-table-column
                prop="goodsName"
                label="商品名称"
                width="180">
                </el-table-column>
                <el-table-column
                    prop="goodsState"
                    label="状态"
                    width="180">
                </el-table-column>
                <el-table-column
                prop="goodsClassify"
                label="商品分类">
                </el-table-column>
                <el-table-column
                    prop="store"
                    label="库存">
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="售卖价（元）">
                </el-table-column>
            </el-table>
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
            <div class="table-footer">
                <el-button v-if="showTableCheck" @click="checkAllHandler">全选</el-button>
                <span v-if="isCategory">商品分类：</span>
                <el-cascader
                    v-if="isCategory"
                    v-model="value"
                    :options="options"
                    @change="handleChange">
                </el-cascader>
                <div class="tc">
                    <el-button @click="currentDialog = 'PriceChangeDialog'; dialogVisible = true" v-if="showTableCheck" type="primary">一键改价</el-button>
                </div>
            </div>
        </section>
        <component :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
    </div>
</template>
<script>
import PriceChangeDialog from '@/views/goods/dialogs/priceChangeDialog'
import Pagination from '@/components/Pagination'

export default {
    data() {
        return {
            formInline: {
                name: '',
                region: ''
            },
            stateiIems: [],
            list: [{
                    goodsName: '小红花',
                    goodsState: '上架',
                    goodsClassify: '服饰',
                    store: '100',
                    price: '15',
                    activity: true
                }, {
                    goodsName: '小红花小红花',
                    goodsState: '下架',
                    goodsClassify: '服饰',
                    store: '100',
                    price: '16',
                    activity: false
                }],
            total: 50,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20,
                goodsName: '好商品',
                goodsState: '下架中',
                goodsClassify: '服饰',
            },
            state: '',
            showTableCheck: false,
            currentDialog: '',
            dialogVisible: false,
            value: '',
            options: '',
            isCategory: false
        }
    },
    methods: {
        handleChange() {

        },
        onSubmit() {

        },
        stateHandler(val) {
            this.state = val
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        checkAllHandler() {
            this.$refs.table.clearSelection();
            this.list.forEach(row => {
                this.$refs.table.toggleRowSelection(row);
            })
        },
        moreManageHandler() {
            this.showTableCheck = true
            this.isCategory = false
        },
        async getList() {
            try {
                this.listLoading = true
                let res = await this._apis.goods.fetchList(this.listQuery)

                if(res) {
                    this.list = res.data.list
                    this.total = res.data.total
                    this.listLoading = false
                }
            } catch(e) {
                
            }
        },
    },
    components: {
        PriceChangeDialog,
        Pagination
    }
}
</script>
<style lang="scss" scoped>
    .batch-price-change {
        background-color: #fff;
        padding: 32px 63px;
        section {
            border-bottom: 1px dashed #d3d3d3;
            padding-top: 15px;
            padding-bottom: 22px;
        }
        .header {
            .header-righter {
                text-align: right;
                .span-box {
                    display: inline-flex;
                    align-items: center;
                    padding: 7px 13px;
                    background:rgb(234, 249, 242);
                    color: rgb(178, 230, 209);
                    i {
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        background: url(../../assets/images/goods/renovate.png) no-repeat;
                        margin-left: 4px;
                    }
                }
            }
            .search {
                margin-top: 23px;
            }
        }
        .table-header {
            margin-top: 38px;
        }
        .table-footer {
            margin-top: 43px;
        }
    }
</style>


