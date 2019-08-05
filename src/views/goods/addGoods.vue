<template>
<div class="app-container add-goods">
    <!-- <header class="header">
        <div :class="{active: index == 0}" @click="scrollTo(0)" class="item">基本信息</div>
        <div :class="{active: index == 1}" @click="scrollTo(1)" class="item">销售信息</div>
        <div :class="{active: index == 2}" @click="scrollTo(2)" class="item">物流/售后</div>
        <div :class="{active: index == 3}" @click="scrollTo(3)" class="item">详情描述</div>
    </header> -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="138px" class="demo-ruleForm">
        <section class="form-section">
            <h2>基本信息</h2>
            <el-form-item label="商品类目" prop="productCategoryInfoId">
                <el-cascader
                    :options="itemCatList"
                    v-model="ruleForm.itemCat"
                    @change="itemCatHandleChange">
                </el-cascader>
                <span class="category-display">您当前的选择是：食品 ＞ 休闲零食</span>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="ruleForm.name" maxlength="60" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="商品描述" prop="des">
                <el-input type="textarea" v-model="ruleForm.des" maxlength="100" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="商品图片" prop="images">
                <el-upload
                    :action="uploadUrl"
                    :limit="6"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :on-success="centerFileUrl"
                    class="p_imgsCon">
                    <i class="el-icon-plus"></i>
                    <p style="line-height: 21px; margin-top: -39px; color: #92929B;">上传图片</p>
                </el-upload>
                <span @click="currentDialog = 'LibraryDialog'; dialogVisible = true" class="material">素材库</span>
                <p class="description prompt">最多支持上传6张商品图片，默认第一张为主图；尺寸建议750x750（正方形模式）或750×1000（长图模式）像素以上，大小2M以下。</p>
            </el-form-item>
            <el-form-item label="商品分类" prop="productCategoryInfoId">
                <div class="block" style="display: inline-block;margin-left: 5px">
                    <el-cascader
                        :options="optionsTypeList"
                        v-model="ruleForm.productCategoryInfoId"
                        @change="handleChange">
                    </el-cascader>
                </div>
                <div @click="currentDialog = 'AddCategoryDialog'; dialogVisible = true" class="blue pointer" style="display: inline-block; margin-left: 24px;">新增分类</div>
            </el-form-item>
            <el-form-item label="商品标签" prop="productLabelId">
                <div class="add-tag">
                    <div class="item">
                        <el-input v-model="ruleForm.productLabelId"></el-input>
                    </div>
                    <div @click="currentDialog = 'AddTagDialog'; dialogVisible = true" class="item tag">新增标签</div>
                    <div @mouseenter="imageVisible = true" @mouseleave="imageVisible = false" class="item example">查看样例</div>
                    <div v-show="imageVisible" class="item images">
                        <img src="../../assets/images/goods/example.png" alt="">
                    </div>
                </div>
            </el-form-item>
        </section>
        <section class="form-section">
            <h2>销售信息</h2>
            <el-form-item label="规格信息" prop="specifications">
                <el-button class="border-button selection-specification" @click="currentDialog = 'SelectSpecifications'; dialogVisible = true">选择规格</el-button>
                <template>
                    <el-table
                    class="spec-information"
                    :data="specArr"
                    :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
                    style="width: 100%">
                    <el-table-column
                        prop="label"
                        label="组合"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="成本价"
                        width="180">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.price" placeholder="请输入内容"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="salePrice"
                        label="层售卖价">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.salePrice" placeholder="请输入内容"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="stock"
                        label="库存">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.stock" placeholder="请输入内容"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="warning"
                        label="库存预警">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.warning" placeholder="请输入内容"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="weight"
                        label="重量">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.weight" placeholder="请输入内容"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="tiji"
                        label="体积">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.tiji" placeholder="请输入内容"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作">
                        <template slot-scope="scope">
                            
                        </template>
                    </el-table-column>
                    </el-table>
                </template>
                <div>
                    <el-checkbox v-model="ruleForm.residueStock">商品详情显示剩余库存</el-checkbox>
                    <span class="prompt">库存为0时，商品会自动放到“已售罄"列表里，保存有效库存数字后，买家看到的商品可售库存同步更新</span>
                </div>
                <el-button class="border-button" @click="currentDialog = 'AddSpecifications'; dialogVisible = true">新增规格</el-button>
            </el-form-item>
            <el-form-item label="起售数量" prop="number">
                <div class="input-number">
                    <span @click="reduce">-</span>
                    <el-input v-model="ruleForm.number"></el-input>
                    <span @click="increase">+</span>
                </div>
            </el-form-item>
            <el-form-item label="已售出数量" prop="quantitySold">
                <el-input type="number" v-model="ruleForm.quantitySold"></el-input>
                <el-checkbox v-model="ruleForm.displaySold">商品详情显示已售出数量</el-checkbox>
                    <span class="prompt">库存为0时，商品会自动放到“已售罄"列表里，保存有效库存数字后，买家看到的商品可售库存同步更新</span>
            </el-form-item>
            <el-form-item label="单位计量" prop="unitMeasurement">
                <el-select v-model="ruleForm.unitMeasurement" placeholder="请选择">
                    <el-option
                        v-for="item in unitMeasurementList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button class="border-button new-units">新增单位</el-button>
                <div style="margin-top: 21px;">
                    <el-checkbox v-model="ruleForm.other">其他</el-checkbox>
                    <el-input v-model="ruleForm.otherUnit" placeholder="请输入计量单位"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="商品品牌" prop="brand">
                <el-select v-model="ruleForm.brand" placeholder="请选择">
                    <el-option
                        v-for="item in brandList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </section>
        <section class="form-section">
            <h2>物流/售后</h2>
            <el-form-item label="上架时间" prop="time">
                <span>定时上架的商品在上架前请到“仓库中的宝贝”里编辑商品。</span>
                <div>
                    <el-radio-group v-model="ruleForm.time">
                        <el-radio :label="1">放入仓库</el-radio>
                        <el-radio :label="2">立即上架</el-radio>
                        <span @click="timelyShelvingHandler"><el-radio :label="3">定时上架</el-radio></span>
                    </el-radio-group>
                </div>
            </el-form-item>
            <el-form-item label="会员打折" prop="dazhe">
                <el-radio-group v-model="ruleForm.dazhe">
                    <el-radio :label="1">参与会员打折</el-radio>
                    <el-radio :label="2">不参与会员打折</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="积分赠送" prop="zhengsong">
                <el-radio-group v-model="ruleForm.zhengsong">
                    <el-radio :label="1">赠送</el-radio>
                    <el-radio :label="2">不赠送</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="开具发票" prop="fapiao">
                <el-radio-group v-model="ruleForm.fapiao">
                    <el-radio :label="1">支持</el-radio>
                    <el-radio :label="2">不支持</el-radio>
                </el-radio-group>
                <span class="prompt">此功能在交易设置中开启后，可选择是否支持开具发票</span>
            </el-form-item>
            <el-form-item label="是否支持货到付款" prop="cashOnDelivery">
                <el-radio-group v-model="ruleForm.cashOnDelivery">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="运费设置" prop="freightSettings">
                <div>
                    <el-radio v-model="ruleForm.freightSettings" label="1">选择运费模板</el-radio>
                    <el-select v-model="ruleForm.shippingTemplatesValue" placeholder="请选择">
                        <el-option
                            v-for="item in shippingTemplates"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                </div>
                <div>
                    <el-radio v-model="ruleForm.freightSettings" label="2">包邮</el-radio>
                </div>
            </el-form-item>
            <el-form-item label="是否支持售后维权" prop="rights">
                <el-radio-group v-model="ruleForm.rights">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </section>
        <section class="form-section">
            <h2>详情描述</h2>
            <el-form-item label="是否显示关联商品" prop="associatedGoods">
                <el-radio v-model="ruleForm.associatedGoods" label="1">否</el-radio>
                <el-radio v-model="ruleForm.associatedGoods" label="2">是</el-radio>
                <el-button class="border-button" @click="currentDialog = 'ChoosingGoodsDialog'; dialogVisible = true">选择关联商品</el-button>
            </el-form-item>
            <div class="associated-goods">
                <el-table
                    :data="tableData"
                    :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
                    style="width: 590px;">
                    <el-table-column
                        prop="name"
                        label="商品名称"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="unit"
                        label="单位"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="price"
                        label="价格（元）">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">移 除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-form-item label="商品详情" prop="brand">
                <rickEditor @editorValueUpdate="editorValueUpdate" :myConfig="myConfig"></rickEditor>
            </el-form-item>
        </section>
    </el-form>
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible" @submit="submit"></component>
</div>
</template>
<script>
import SelectSpecifications from '@/views/goods/dialogs/selectSpecifications'
import AddSpecifications from '@/views/goods/dialogs/addSpecifications'
import RichEditor from '@/components/RichEditor';
import ChoosingGoodsDialog from '@/views/goods/dialogs/choosingGoodsDialog'
import TimelyShelvingDialog from '@/views/goods/dialogs/timelyShelvingDialog'
import LibraryDialog from '@/views/goods/dialogs/libraryDialog'
import AddCategoryDialog from '@/views/goods/dialogs/addCategoryDialog'
import AddTagDialog from '@/views/goods/dialogs/addTagDialog'

export default {
    data() {
        return {
            ruleForm: {
                productCategoryInfoId: '',
                name: '',
                images: '',
                productCategoryInfoId: '',
                productCategoryInfoIds: '',
                productLabelId: '',
                number: 0,
                quantitySold: 0,
                brand: '',
                time: 1,
                dazhe: 1,
                zhengsong: 1,
                fapiao: 1,
                residueStock: false,
                displaySold: '',
                unitMeasurement: '',
                other: false,
                otherUnit: '',
                cashOnDelivery: '',
                freightSettings: '',
                rights: '',
                associatedGoods: '',
                shippingTemplatesValue: '',
                itemCat: ''
            },
            rules: {
                productCategoryInfoId: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                productCategoryInfoId: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                images: [
                    { required: true, message: '请上传商品图片', trigger: 'blur' },
                ],
                quantitySold: [
                    { required: true, message: '请上传商品图片', trigger: 'blur' },
                ],
                unitMeasurement: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
                brand: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
                time: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
                dazhe: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
                zhengsong: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
                fapiao: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
                cashOnDelivery: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
                freightSettings: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
                rights: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
                associatedGoods: [
                    { required: true, message: '请选择', trigger: 'blur' },
                ],
            },
            uploadUrl: '#',
            optionsTypeList: [],
            imageVisible: false,
            currentDialog: '',
            dialogVisible: true,
            unitMeasurementList: [],
            brandList: [],
            myConfig: {
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 400,
                // 初始容器宽度
                initialFrameWidth: 500,
                // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                serverUrl: 'http://35.201.165.105:8000/controller.php',
                // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                UEDITOR_HOME_URL: '/static/UEditor/'
            },
            index: 0,
            specArr: [],
            shippingTemplates: [],
            tableData: [],
            itemCatList: []
        }
    },
    methods: {
        itemCatHandleChange(value) {

        },
        timelyShelvingHandler() {
            this.currentDialog = 'TimelyShelvingDialog'
            this.dialogVisible = true
        },
        increase() {
            this.ruleForm.number++
        },
        reduce() {
            if(this.ruleForm.number > 0) {
                this.ruleForm.number--
            }
        },
        submit(arr) {
            let results = [];
            let result = [];

            var doExchange = function(arr, index) {
                for (var i = 0; i<arr[index].length; i++) {
                    result[index] = arr[index][i];
                    if (index != arr.length - 1) {
                        doExchange(arr, index + 1)
                    } else {
                        results.push(result.join(','))
                    }
                } 
            }

            if(arr.length) {
                let _arr = []
                let obj = {}

                arr.forEach(val => {
                    if(!obj[val[0]]) {
                        obj[val[0]] = []
                        obj[val[0]].push(val[1])
                    } else {
                        obj[val[0]].push(val[1])
                    }
                })

                for(let i in obj) {
                    _arr.push(obj[i])
                }

                doExchange(_arr, 0);
                let _results = results.map(val => ({
                    label: val,
                    price: '',
                    salePrice: '',
                    stock: '',
                    warning: '',
                    weight: '',
                    tiji: '',
                }))
                this.specArr = _results
                console.log(_results)
            }

            if(this.currentDialog == 'ChoosingGoodsDialog') {
                this.tableData.push(arr)
            }
        },
        editorValueUpdate(value) {
            this.editorData = value;
        },
        handlePictureCardPreview(file) {
            
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        centerFileUrl(response, file, fileList){
            if(file.status == "success"){
                this.$message.success(response.msg);
                this.ruleForm.images = response.url;
            }else{
                this.$message.error(response.msg);
            }
        },
        handleChange(value) {
            this.typeId=value[value.length-1];
            this.typeIds=value.toString();
            this.ruleForm.productCategoryInfoId=this.typeId;
            this.ruleForm.productCategoryInfoIds=this.typeIds;
        },
        handleScroll() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || 
                document.body.scrollTop
            
            if(scrollTop > 21) {
                document.querySelector('.add-goods .header').style.position = 'fixed'
                document.querySelector('.add-goods .header').style.background = '#fff'
                document.querySelector('.add-goods .header').style.zIndex = 1000
                document.querySelector('.add-goods .header').style.top = '60px'
            } else {
                document.querySelector('.add-goods .header').style.position = 'static'
            }

            if(scrollTop < 385) {
                this.index = 0
            } else if(scrollTop >= 385 && scrollTop < 811) {
                this.index = 1
            } else if(scrollTop >= 811 && scrollTop < 1282) {
                this.index = 2
            } else {
                this.index = 3
            }
        },
        scrollTo(index) {
            if(index == 0) {
                window.scrollTo(0,0)
                this.index = 0
            } else if(index == 1) {
                window.scrollTo(0,385)
                this.index = 1
            } else if(index == 2) {
                window.scrollTo(0,811)
                this.index = 2
            } else if(index == 3) {
                window.scrollTo(0,1282)
                this.index = 3
            }
        }
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll)
    },
    components: {
        SelectSpecifications,
        AddSpecifications,
        RichEditor,
        ChoosingGoodsDialog,
        TimelyShelvingDialog,
        LibraryDialog,
        AddCategoryDialog,
        AddTagDialog
    }
}
</script>
<style lang="scss" scoped>
$blue: #655EFF;
.gray {
    color: $grayColor;
}
.prompt {
    color: $grayColor;
    font-size: 12px;
    margin-top: -27px;
}
.blue {
    color: $blue;
}
.pointer {
    cursor: pointer;
}
.flc {
    display: flex;
    align-items: center;
}
.app-main .content-box .content-main {
    margin-top: 2px;
}
.add-goods {
    padding: 18px 21px;
    padding-top: 2px;
    background-color: #fff;
    section {
        h2 {
            margin-bottom: 20px;
            font-size: 18px;
        }
    }
    .header {
        display: flex;
        align-items: center;
        border-bottom: 2px solid #CACFCB;
        width: 100%;
        height: 56px;
        .item {
            margin-right: 40px;
            height: 100%;
            line-height: 56px;
            &.active {
                border-bottom: 1px solid $blue;
                color: $blue;
            }
        }
    }
    .material {
        color: $globalMainColor;
        cursor: pointer;
        margin-left: -53px;
        position: relative;
        top: -54px;
    }
    .add-tag {
        display: flex;
        .item {
            margin-right: 24px;
            &.tag {
                margin-right: 72px;
                color: $blue;
                cursor: pointer;
            }
            &.example {
                color: $blue;
                cursor: pointer;
            }
            &.images {
                border: 1px solid #d0d6e4;
            }
        }
    }
    .form-section {
        border-bottom: 1px dashed #d3d3d3;
        padding-bottom: 30px;
        padding-top: 24px;
        .new-units {
            margin-left: 30px;
        }
        .category-display {
            margin-left: 10px;
        }
        .selection-specification {
            margin-bottom: 35px;
        }
    }
}
/deep/ .el-input {
    width: auto;
}
/deep/ .el-upload--picture-card {
    width: 66px;
    height: 66px;
    line-height: 74px;
}
/deep/ .el-upload-list--picture-card .el-upload-list__item {
    width: 66px;
    height: 66px;
}
.input-number {
    span {
        display: inline-block;
        width: 34px;
        height: 34px;
        background-color: rgb(239, 238, 255);
        text-align: center;
        line-height: 34px;
    }
}
/deep/ .input-number .el-input--small .el-input__inner {
    width: 34px;
    height: 34px;
    padding-left: 2px;
    padding-right: 2px;
    text-align: center;
}
/deep/ .el-checkbox {
    margin-right: 23px;
}
/deep/ .el-radio-group {
    margin-right: 20px;
}
/deep/ .el-textarea {
    width: auto;
}
/deep/ .spec-information thead th:nth-child(2) .cell,
    /deep/ .spec-information thead th:nth-child(3) .cell,
    /deep/ .spec-information thead th:nth-child(4) .cell,
    /deep/ .spec-information thead th:nth-child(5) .cell {
    position: relative;
    &:before {
        content: '*';
        display: block;
        color: #FD4C2B;
        position: absolute;
        left: 1px;
        top: 2px;
    }
}
</style>


