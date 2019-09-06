<template>
    <zdialog :visible.sync="visible" title="选择关联商品" width="659px" :hasCancel="hasCancel" :showFooter="showFooter">
        <div class="search">
            <el-cascader
                class="classify"
                v-model="value"
                :options="options"
                @change="handleChange">
            </el-cascader>
            <div>
                <el-input v-model="input" placeholder="请输入商品关键字"></el-input>
                <el-button><i class="el-icon-search"></i></el-button>
            </div>
        </div>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="name"
                label="商品名称"
                width="380">
                <template slot-scope="scope">
                    <div class="ellipsis" style="width: 350px;">{{scope.row.name}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="productUnit"
                label="单位"
                width="50">
            </el-table-column>
            <el-table-column
                prop="salePrice"
                label="价格（元）"
                width="90">
            </el-table-column>
            <el-table-column label="操作"
                width="70">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleAdd(scope.$index, scope.row)">添 加</el-button>
                </template>
                </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </zdialog>
</template>
<script>
import zdialog from '@/components/DialogBase'
import Pagination from '@/components/Pagination'

export default {
    data() {
        return {
            value: [],
            options: [],
            tableData: [
                {
                    id: '1',
                    name: '商品名称1',
                    unit: 'kg',
                    price: 100,
                }
            ],
            total: 1,
            listQuery: {
                page: 1,
                limit: 20,
            },
            showFooter: false
        }
    },
    created() {
        this.getList()
    },
    methods: {
        submit() {
            
        },
        handleChange(value) {

        },
        handleAdd(index, row) {
            this.$emit('submit', row)
        },
        getList(param) {
            //this.listLoading = true
            let _param
            
            _param = Object.assign({}, this.listQuery, param)

            this._apis.goods.getSPUGoodsList(_param).then((res) => {
                this.total = +res.total
                this.tableData = res.list
            }).catch(error => {
                //this.listLoading = false
            })
        },
    },
    computed: {
        visible: {
            get() {
                return this.dialogVisible
            },
            set(val) {
                this.$emit('update:dialogVisible', val)
            }
        },
        contentText() {
            return '是否确认删除？'
        }
    },
    props: {
        data: {

        },
        dialogVisible: {
            type: Boolean,
            required: true
        },
    },
    components: {
        zdialog,
        Pagination
    }
}
</script>
<style lang="scss" scoped>
    .el-icon-warning {
        font-size: 60px;
        color: rgb(245, 88, 88);
    }
    .content-text {
        font-size: 18px;
        margin-top: 20px;
    }
    .search {
        display: flex;
        justify-content: center;
        align-items: center;
        .classify {
            margin-right: 37px;
        }
    }
</style>


