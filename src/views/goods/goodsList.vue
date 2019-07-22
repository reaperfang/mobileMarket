<template>
    <div class="goods-list">
        <header class="header">
            <div class="item">新建商品</div>
            <div class="item">批量改价</div>
            <div class="item">商品导入</div>
        </header>
        <div class="search">
            <el-form :inline="true" :model="listQuery" class="demo-form-inline">
                <el-form-item label="商品名称">
                    <el-input v-model="listQuery.goodsName" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品状态">
                    <el-select v-model="listQuery.goodsState" placeholder="请选择商品状态">
                    <el-option label="下架中" value="下架中"></el-option>
                    <el-option label="上架中" value="上架中"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品分类">
                    <el-select v-model="listQuery.goodsClassify" placeholder="请选择商品分类">
                        <el-option label="所有分类" value="所有分类"></el-option>
                        <el-option :label="item.label" :value="item.value" 
                            v-for="(item, index) in goodsClassifyList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="getList" type="primary">查询</el-button>
                </el-form-item>
                </el-form>
        </div>
        <div>
            <el-table
                :data="list"
                border
                style="width: 100%">
                <el-table-column
                prop="goodsName"
                label="商品名称"
                width="180">
                </el-table-column>
                <el-table-column
                    prop="goodsState"
                    label="状态"
                    width="180">
                    <template slot-scope="scope">
                        <span class="goods-state">{{scope.row.goodsState}}
                            <i :class="{grounding: scope.row.goodsState == '上架', undercarriage: scope.row.goodsState == '下架'}" class="i-bg"></i>
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="goodsClassify"
                label="商品分类">
                </el-table-column>
                <el-table-column
                    prop="store"
                    label="库存">
                    <template slot-scope="scope">
                        <span class="store">{{scope.row.store}}<i @click="editorStore(scope.row)" class="i-bg"></i></span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="售卖价（元）">
                    <template slot-scope="scope">
                        <span class="price">{{scope.row.price}}<i class="i-bg"></i></span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                        <span class="operate-editor"><i class="i-bg"></i>编辑</span>
                        <span class="operate-delete"><i class="i-bg"></i>删除</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer">
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </div>
        <component :is="currentDialog" :visible.sync="dialogVisible" :title="title" :width="width">ssf</component>
    </div>
</template>
<style lang="scss" scoped>
.goods-list {
    background-color: #fff;
    padding: 20px;
    color: $contentColor;
    .header {
        display: flex;
        align-items: center;
        border-bottom: 2px solid #CACFCB;
        padding-bottom: 18px;
        .item {
            margin-right: 40px;
        }
    }
    .search {
        margin-top: 26px;
    }
    .i-bg {
        position: relative;
        display: inline-block;
        width: 13px;
        height: 13px;
        top: 1px;
    }
    .goods-state {
        .i-bg {
            &.grounding {
                background:url('../../assets/images/goods/grounding.png') no-repeat;
            }
            &.undercarriage {
                background:url('../../assets/images/goods/undercarriage.png') no-repeat;
            }
        }
    }
    .store, .price {
        .i-bg {
            background:url('../../assets/images/goods/editor.png') no-repeat;
            margin-left: 6px;
        }
    }
    .operate-editor {
        margin-right: 20px;
        .i-bg {
            background:url('../../assets/images/goods/editor.png') no-repeat;
            margin-right: 6px;
        }
    }
    .operate-delete {
        color: #F55858;
        .i-bg {
            background:url('../../assets/images/goods/delete.png') no-repeat;
            margin-right: 6px;
        }
    } 
}
/deep/ .el-form-item__label {
    font-weight: normal;
}
</style>
<script>
import Pagination from '@/components/Pagination'
import ddialog from '@/components/Dialog'

export default {
    data() {
        return {
            goodsClassifyList: [
                {
                    label: '服饰',
                    value: '服饰'
                }
            ],
            list: [{
                    goodsName: '小红花',
                    goodsState: '上架',
                    goodsClassify: '服饰',
                    store: '库存',
                    price: '15'
                }, {
                    goodsName: '小红花',
                    goodsState: '下架',
                    goodsClassify: '服饰',
                    store: '库存',
                    price: '15'
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
            currentDialog: 'ddialog',
            dialogVisible: true,
            title: 'sfsf',
            width: '10px'
        }
    },
    created() {
        
    },
    methods: {
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
        editorStore(row) {

        }
    },
    components: {
        Pagination,
        ddialog
    }
}
</script>



