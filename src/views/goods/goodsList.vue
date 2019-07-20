<template>
    <div class="goods-list">
        <header class="header">
            <div class="item">新建商品</div>
            <div class="item">批量改价</div>
            <div class="item">商品导入</div>
        </header>
        <div class="search">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="商品名称">
                    <el-input v-model="formInline.goodsName" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品状态">
                    <el-select v-model="formInline.goodsState" placeholder="请选择商品状态">
                    <el-option label="下架中" value="下架中"></el-option>
                    <el-option label="上架中" value="上架中"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品分类">
                    <el-select v-model="formInline.goodsClassify" placeholder="请选择商品分类">
                        <el-option label="所有分类" value="所有分类"></el-option>
                        <el-option :label="item.label" :value="item.value" 
                            v-for="(item, index) in goodsClassifyList" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="fetch" type="primary">查询</el-button>
                </el-form-item>
                </el-form>
        </div>
        <div>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="goodsName"
                label="商品名称"
                width="180">
                </el-table-column>
                <el-table-column
                prop="state"
                label="状态"
                width="180">
                </el-table-column>
                <el-table-column
                prop="classify"
                label="商品分类">
                </el-table-column>
                <el-table-column
                prop="classify"
                label="库存">
                </el-table-column>
            </el-table>
        </div>
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
}
/deep/ .el-form-item__label {
    font-weight: normal;
}
</style>
<script>


export default {
    data() {
        return {
            formInline: {
                goodsName: '好商品',
                goodsState: '下架中',
                goodsClassify: '服饰',
            },
            goodsClassifyList: [
                {
                    label: '服饰',
                    value: '服饰'
                }
            ],
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
                }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
                }]
        }
    },
    created() {
        
    },
    methods: {
        fetch() {

        },
    }
}
</script>



