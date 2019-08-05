<template>
    <div class="tag">
        <div class="search">
            <div>
                <el-button @click="currentDialog = 'AddTagDialog'; dialogVisible = true" type="primary">新建标签</el-button>
                <el-button class="border-button" @click="moreManageHandler">批量管理</el-button>
            </div>
            <el-form :inline="true" :model="formInline" class="form-inline">
                <el-form-item label="搜索标签：">
                    <el-input v-model="formInline.classify" placeholder="请输入分类名称..."></el-input>
                </el-form-item>
                <el-form-item label="标签状态：">
                    <el-select v-model="formInline.state" placeholder="所有状态">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in items" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
            :data="list"
            ref="table"
            :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
            style="width: 100%">
            <el-table-column
                v-if="showTableCheck"
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                prop="name"
                label="标签名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="number"
                label="绑定商品数量"
                width="180">
            </el-table-column>
            <el-table-column
                prop="state"
                label="状态">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <span class="operate-span blue" @click="change(scope.row)">修改</span>
                    <span class="operate-span blue" @click="hide(scope.row)">隐藏</span>
                    <span class="operate-span deleteColor" @click="deleteTag(scope.row)">删除</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="table-footer">
            <el-button v-if="showTableCheck" @click="checkAllHandler">全选</el-button>
            <div v-if="showTableCheck" class="button-box">
                <el-button class="border-button">隐 藏</el-button>
                <el-button type="primary">显 示</el-button>
                <el-button @click="deleteTags" class="delete-button">删 除</el-button>
                <el-button type="primary">完 成</el-button>
            </div>
        </div>
        <component :is="currentDialog" :dialogVisible.sync="dialogVisible" @submit="submit"></component>
    </div>
</template>
<script>
import AddTagDialog from '@/views/goods/dialogs/addTagDialog'

export default {
    data() {
        return {
            formInline: {
                classify: '',
                state: ''
            },
            items: [],
            list: [
                {}
            ],
            multipleSelection: [],
            showTableCheck: false,
            currentDialog: '',
            dialogVisible: ''
        }
    },
    methods: {
        submit() {

        },
        change(row) {

        },
        hide(row) {

        },
        deleteTag(row) {

        },
        handleSelectionChange() {
            this.multipleSelection = val;
        },
        moreManageHandler() {
            this.showTableCheck = true
        },
        checkAllHandler() {
            this.$refs.table.clearSelection();
            this.list.forEach(row => {
                this.$refs.table.toggleRowSelection(row);
            })
        },
        deleteTags() {
            this.confirm({title: '批量删除', icon: true, text: '删除后将不可恢复，确认删除所选标签吗？'}).then(() => {
                
            })
        }
    },
    components: {
        AddTagDialog
    }
}
</script>
<style lang="scss" scoped>
.blue {
    color: $globalMainColor;
}
.deleteColor {
    color: #F55858;
}
.tag {
    background-color: #fff;
    padding: 25px 38px;
    .dialog-container {
        text-align: left;
    }
}
.operate-span {
    margin-right: 40px;
}
.form-inline {
    margin-top: 23px;
}
.table-footer {
    display: flex;
    align-items: center;
    margin-top: 35px;
    justify-content: space-between;
    button {
        margin-left: 0;
        margin-right: 28px;
    }
}
</style>
<style lang="scss" scoped>
    .tag {
        /deep/ .delete-button {
            background-color: #F55858;
            color: #fff;
        }
    }
</style>



