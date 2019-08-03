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
                        <span @click="(currentDialog = 'EditorStock') && (dialogVisible = true) && (currentData = scope.row)" class="store">{{scope.row.store}}<i @click="editorStore(scope.row)" class="i-bg"></i></span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="price"
                    label="售卖价（元）">
                    <template slot-scope="scope">
                        <span @click="(currentDialog = 'EditorPrice') && (dialogVisible = true) && (currentData = scope.row)" class="price">{{scope.row.price}}<i class="i-bg"></i></span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span class="operate-editor"><i class="i-bg"></i>编辑</span>
                        <span @click="deleleHandler(scope.row)" class="operate-delete"><i class="i-bg"></i>删除</span>
                    </template>
                </el-table-column>
            </el-table>
            <div class="table-footer">
                <el-button @click="moreManageHandler" type="primary">批量管理</el-button>
                <el-button v-if="showTableCheck" @click="checkAllHandler">全选</el-button>
                <div v-if="showTableCheck" class="image-box">
                    <div class="item">
                        <i class="i-bg up"></i>
                        <p>上架</p>
                    </div>
                    <div class="item">
                        <i class="i-bg down"></i>
                        <p>下架</p>
                    </div>
                    <div class="item">
                        <i class="i-bg delete"></i>
                        <p>删除</p>
                    </div>
                </div>
                <el-button v-if="showTableCheck" @click="cancelHandler">取消</el-button>
            </div>
        </div>
        <div class="footer">
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </div>
        <component :is="currentDialog" :dialogVisible.sync="dialogVisible" :data="currentData"></component>
    </div>
</template>
<style lang="scss">
    .confirm {
        width: 500px;
        padding-bottom: 30px;
    }
    .confirm-big {
        width: 523px;
    }
    .confirm .el-message-box__header {
        background-color: rgb(241, 240, 255);
        .el-message-box__title {
            color: $contentColor
        }
    }
    .confirm .el-message-box__content {
        padding-top: 30px;
        padding-left: 10px;
        padding-right: 10px;
        .el-message-box__message {
            text-align: center;
            .el-icon-warning {
                font-size: 60px;
                color: rgb(245, 88, 88);
            }
            .content-text {
                font-size: 18px;
                margin-top: 20px;
            }
        }
    }
    .confirm .el-message-box__btns {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 33px;
        button {
            order: 1;
        }
        .el-button--primary {
            order: 0;
            margin-right: 30px;
        }
    }
</style>
<style lang="scss" scoped>
.table-footer {
    display: flex;
    align-items: center;
    margin-top: 35px;
    button {
        margin-left: 0;
        margin-right: 28px;
    }
    .image-box {
        display: flex;
        align-items: center;
        margin-right: 18px;
        .item {
            margin-right: 22px;
            .i-bg {
                position: relative;
                display: inline-block;
                width: 13px;
                height: 13px;
                left: 7px;
            }
            .up {
                background:url('../../assets/images/goods/undercarriage.png') no-repeat;
            }
            .down {
                background:url('../../assets/images/goods/grounding.png') no-repeat;
            }
            .delete {
                background:url('../../assets/images/goods/delete.png') no-repeat;
                background-size: 13px;
            }
        }
    }
}
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
        margin-bottom: 10px;
    }
    .i-bg {
        position: relative;
        display: inline-block;
        width: 13px;
        height: 13px;
        top: 1px;
    }
    .up {
        .i-bg {
            background:url('../../assets/images/goods/grounding.png') no-repeat;
        }
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
            background-size: 13px;
            margin-right: 6px;
        }
    } 
}
/deep/ .el-form-item__label {
    font-weight: normal;
}
.footer {
    margin-top: 10px;
}
</style>

<script>
import Pagination from '@/components/Pagination'
import DeleteDialog from '@/views/goods/dialogs/deleteDialog'
import EditorPrice from '@/views/goods/dialogs/editorPrice'
import EditorStock from '@/views/goods/dialogs/editorStock'

export default {
    data() {
        return {
            multipleSelection: [],
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
            currentDialog: '',
            dialogVisible: false,
            currentData: '',
            state: '',
            showTableCheck: false
        }
    },
    created() {
        
    },
    methods: {
        moreManageHandler() {
            this.showTableCheck = true
        },
        cancelHandler() {
           this.showTableCheck = false
        },
        checkAllHandler() {
            this.$refs.table.clearSelection();
            this.list.forEach(row => {
                this.$refs.table.toggleRowSelection(row);
            })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        stateHandler(val) {
            this.state = val
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
        editorStore(row) {

        },
        deleleHandler(row) {
            if(row.activity) {
                this.$confirm('<i class="el-icon-warning"></i><p class="content-text">当前商品正在参与营销活动，活动有效期内商品不得“删除”。</p>', '立即删除', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true,
                    width: '522px',
                    customClass: 'confirm confirm-big',
                    }).then(() => {
                    
                    }).catch(() => {
                    
                });
            } else {
                this.$confirm('<i class="el-icon-warning"></i><p class="content-text">是否确认删除?</p>', '立即删除', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    dangerouslyUseHTMLString: true,
                    customClass: 'confirm',
                    }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    },
    components: {
        Pagination,
        DeleteDialog,
        EditorPrice,
        EditorStock
    }
}
</script>



