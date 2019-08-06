<template>
    <div>
        <DialogBase :visible.sync="visible" @submit="submit" :title="title" width="659px">
            <el-form :model="basicForm" :rules="basicRules" ref="basicForm" label-width="140px" size="small">
                <el-form-item label="上级分类：" prop="parentId">
                    <el-select placeholder="请选择上级分类" class="formInput" v-model="basicForm.parentId">
                        <!-- <el-option label="顶级分类" value=" "></el-option>
                        <el-option v-for="item in categoryData" :key="item.id" :label="item.categoryName" :value="item.id" :disabled="item.disabled"></el-option> -->
                        <el-option label="顶级栏目" value="0" style="paddingLeft:1em"></el-option>
                            <el-option
                                v-for="item in data.flatArr"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                                :style="{paddingLeft:`${item.floor*1.2}em`}"
                            ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类名称：" prop="categoryName">
                    <el-input placeholder="请输入分类名称" class="formInput" v-model="basicForm.categoryName"></el-input>
                    <span class="description">仅支持展示最多5个字的文本标签</span>
                </el-form-item>
                <el-form-item label="状态：" prop="state">
                    <el-radio v-model="basicForm.state" label="1">启用</el-radio>
                    <el-radio v-model="basicForm.state" label="2">禁用</el-radio>
                </el-form-item>
                <el-form-item label="排序：" prop="sequence">
                    <el-input class="formInput" v-model="basicForm.sequence"></el-input>
                </el-form-item>
                <el-form-item label="分类图片：" prop="imageUrl">
                    <ul class="upload-ul">
                        <li @click="currentDialog = 'LibraryDialog'; libraryVisible = true" class="upload">
                            <i class="el-icon-plus"><br /><span>上传图片</span></i>
                        </li>
                        <li v-if="basicForm.imageUrl" class="image">
                            <img src="" alt="">
                            <i class="el-icon-error"></i>
                        </li>
                    </ul>
                </el-form-item>
            </el-form>
        </DialogBase>
        <component :is="currentDialog" :dialogVisible.sync="libraryVisible"></component>
    </div>
</template>
<script>
import DialogBase from '@/components/DialogBase'
import LibraryDialog from '@/views/goods/dialogs/libraryDialog'

export default {
    data() {
        return {
            parentId:' ',
            basicForm: {
                categoryName:'',
                parentId:'',
                templateId:'',
                sequence:'',
                keywords:'',
                content:'',
                imageId:'',
                imageUrl:'',
                state: ''
            },
            basicRules:{

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
            libraryVisible: false
        }
    },
    created() {
        this.getCategoryDetail()
        if(this.data.id) {
            
        }
    },
    methods: {
        submit() {
            
        },
        getCategoryDetail() {
            this._apis.goods.getCategoryDetail({id: this.data.id}).then(res => {
                console.log(res)
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
        title() {
            if(this.add) {
                return '新增分类'
            } else {
                return '编辑分类'
            }
        }
    },
    props: {
        data: {

        },
        dialogVisible: {
            type: Boolean,
            required: true
        },
        add: {
            type: Boolean,
            required: true
        }
    },
    components: {
        DialogBase,
        LibraryDialog
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
    /deep/ .el-input {
        width: auto;
        margin-right: 12px;
    }
    .upload-ul {
        li {
            float: left;
            width: 60px;
            height: 60px;
            margin-right: 11px;
            &.upload {
                border: 1px dashed #d0d6e4;
                border-radius: 5px;
                text-align: center;
                box-sizing: border-box;
                padding-top: 14px;
                cursor: pointer;
                span {
                    font-size: 10px;
                    color: #D0D6E4;
                }

            }
            &.image {
                position: relative;
                .el-icon-error {
                    position: absolute;
                    right: -5px;
                    top: -5px;
                    color: rgb(254, 211, 203);
                }
            }
        }
    }
</style>


