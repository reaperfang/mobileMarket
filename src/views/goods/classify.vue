<template>
    <div class="classify">
        <div class="search">
            <el-button @click="currentDialog = 'AddCategoryDialog'; dialogVisible = true" type="primary">新增商品分类</el-button>
            <el-form :inline="true" :model="formInline" class="form-inline">
                <el-form-item label="搜索分类：">
                    <el-input v-model="formInline.classify" placeholder="请输入分类名称..."></el-input>
                </el-form-item>
                <el-form-item label="分类状态：">
                    <el-select v-model="formInline.state" placeholder="所有状态">
                        <el-option :label="item.label" :value="item.value" v-for="(item, index) in items" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="categoryTh" style="background:'#ebeafa'; color:'#655EFF';">
			<div class="treeRow th">
			<span class="td">分类名称</span>
			<span class="td">状态</span>
			<span class="td">操作</span>
		</div>
		</div>
        <el-tree
			v-loading="loading"
			class="goodsCategory"
			:data="categoryData"
			:props="defaultProps"
			node-key="id"
			ref="category"
			:expand-on-click-node="false"
			:render-content="renderContent">
		</el-tree>
        <component :is="currentDialog" :dialogVisible.sync="dialogVisible" @submit="submit" :add="add" :data="currentData"></component>
    </div>
</template>
<script>
import AddCategoryDialog from '@/views/goods/dialogs/addCategoryDialog'

export default {
    data() {
        return {
            formInline: {
                classify: '',
                state: ''
            },
            items: [],
            loading:false,
            defaultProps: {
                children: 'childrenList',
                label: 'categoryName'
            },
            categoryData: [{
                "id": 54,
                "appId": 138,
                "parentId": 0,
                "categoryName": "热卖单品",
                "templateId": null,
                "templateName": null,
                "keywords": "",
                "location": "1",
                "sequence": null,
                "content": null,
                "summary": null,
                "imageId": null,
                "imageUrl": "",
                "state": '上架',
                "childrenList": [{
                    "id": 56,
                    "appId": 138,
                    "parentId": 54,
                    "categoryName": "热卖单品1",
                    "templateId": 69,
                    "templateName": null,
                    "keywords": "",
                    "location": "2",
                    "sequence": null,
                    "content": null,
                    "summary": null,
                    "imageId": null,
                    "imageUrl": "",
                    "childrenList": null,
                    "state": '上架',
                }]
            }, {
                "id": 55,
                "appId": 138,
                "parentId": 0,
                "categoryName": "套装组合",
                "templateId": null,
                "templateName": null,
                "keywords": "",
                "location": "1",
                "sequence": null,
                "content": null,
                "summary": null,
                "imageId": null,
                "imageUrl": "",
                "childrenList": null,
                "state": '上架',
            }],
            currentDialog: '',
            dialogVisible: false,
            add: true,
            flatArr: []
        }
    },
    created() {
        this.getList()
    },
    methods: {
        transTreeData(data, pid) {
            var result = [], temp;
            for (var i = 0; i < data.length; i++) {
                if (data[i].parentId == pid) {
                    var obj = {"categoryName": data[i].name,"id": data[i].id, parentId: data[i].parentId};
                    temp = this.transTreeData(data, data[i].id);
                    if (temp.length > 0) {
                        obj.childrenList = temp;
                    }
                    result.push(obj);
                }
            }
            return result;
        },
        flatTreeArray(array = [], childrenKey = 'childrenList') {
            var result = [];
            let flat = (array = {}, childrenKey, floor) => {
                array.forEach(item => {
                let dataItem = {
                    floor: floor,
                    name: item.categoryName,
                    id: item.id,
                    parentId: item.parentId,
                }
                result.push(dataItem);

                let childrenArr;
                if (item.hasOwnProperty(childrenKey)) {
                    childrenArr = item[childrenKey];
                    delete item[childrenKey];
                }
                if (childrenArr && childrenArr.length > 0) {
                    flat(childrenArr, childrenKey, floor + 1)
                }
                });
            }
            flat(array, childrenKey, 1);
            return result;
        },
        renderContent(h, { node, data, store }) {
            return (
                <div class="treeRow">
                    <span class="td first">{data.categoryName}</span>
                    <span class="td state">{data.state}</span>
                    <span class="td operate">
                        {
                            <span class="blue" on-click={() => this.change(node, data)}>修改</span>
                        }
                        {
                            <span class="blue" on-click={() => this.addCategory(node, data)}>新增子分类</span>
                        }
                        {
                            <span class="blue" on-click={() => this.forbidden(node, data)}>禁用</span>
                        }
                        {
                            <span class="deleteColor" on-click={() => this.delete(node, data)}>删除</span>
                        }
                    </span>
                </div>
            );
        },
        change(node, data) {
            console.log(data)
            this.currentDialog = 'AddCategoryDialog'
            this.currentData = {
                id: data.id,
                flatArr: this.flatArr
            }
            this.dialogVisible = true
        },
        addCategory(node, data) {
            this.currentDialog = 'AddCategoryDialog'
            this.dialogVisible = true
        },
        forbidden(node, data) {

        },
        delete(node, data) {
            this.confirm({title: '立即删除', icon: true, text: '删除后此分类无法展示，确认删除吗？'}).then(() => {
                
            })
        },
        submit() {

        },
        getList() {
            this._apis.goods.fetchCategoryList().then((res) => {
                let arr = this.transTreeData(res, 0)
                
                this.categoryData = arr
                this.flatArr = this.flatTreeArray(JSON.parse(JSON.stringify(arr)))
            }).catch(error => {

            })
        }
    },
    components: {
        AddCategoryDialog
    }
}
</script>
<style lang="scss">
.blue {
    color: $globalMainColor;
}
.deleteColor {
    color: #F55858;
}
.classify {
    background: #fff;
    padding: 25px 38px;
    .dialog-container {
        text-align: left;
    }
    .form-inline {
        margin-top: 23px;
    }
    .goodsCategory .el-tree-node,.categoryTh{
	position:relative;
}
.goodsCategory .el-tree-node__content{
	border-bottom:1px solid #eee;
	height:auto
}
.th .td:first-child{padding-left:10px;}
.treeRow{
	overflow:hidden;
	width:100%
}
.treeRow .td{
	line-height:36px;
	height: 36px;
	display:inline-block;
	width:33%;
	float:left;
	overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.treeRow .td .thumbImg{width:30px; height:30px; border:1px solid #efefef; display: block; overflow: hidden; margin-top: 2px}
.treeRow .td .thumbImg img{width: 100%}
.treeRow .td.short{width: 10%}
.treeRow .td:nth-child(2){position:absolute; left:35%}
.treeRow .td:nth-child(3){position:absolute; left:75%; min-width:200px}
}
.operate {
    span {
        margin-right: 26px;
    }
}
</style>



