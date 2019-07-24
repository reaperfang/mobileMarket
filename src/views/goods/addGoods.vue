<template>
<div class="app-container add-goods">
    <header class="header">
        <div class="item">基本信息</div>
        <div class="item">销售信息</div>
        <div class="item">物流/售后</div>
        <div class="item">详情描述</div>
    </header>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <section class="form-section">
            <el-form-item label="商品类目" prop="leimu">
                <el-input v-model="ruleForm.leimu"></el-input>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
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
                </el-upload>
                <span class="material">素材库</span>
                <p class="description">最多支持上传6张商品图片，默认第一张为主图；尺寸建议750x750（正方形模式）或750×1000（长图模式）像素以上，大小2M以下。</p>
            </el-form-item>
            <el-form-item label="商品分类" prop="productCategoryInfoId">
                <div class="block" style="display: inline-block;margin-left: 5px">
                    <el-cascader
                        :options="optionsTypeList"
                        v-model="ruleForm.productCategoryInfoId"
                        @change="handleChange">
                    </el-cascader>
                </div>
                <div class="blue pointer" style="display: inline-block; margin-left: 24px;">新增分类</div>
            </el-form-item>
            <el-form-item label="商品标签" prop="productLabelId">
                <div class="add-tag">
                    <div class="item">
                        <el-input v-model="ruleForm.productLabelId"></el-input>
                    </div>
                    <div class="item tag">新增标签</div>
                    <div @mouseenter="imageVisible = true" @mouseleave="imageVisible = false" class="item example">查看样例</div>
                    <div v-show="imageVisible" class="item images">
                        <img src="../../assets/images/goods/example.png" alt="">
                    </div>
                </div>
            </el-form-item>
        </section>
        <section class="form-section">
            <el-form-item label="规格信息" prop="specifications">
                <el-button>选择规格</el-button>

                <div>
                    <el-checkbox v-model="checked">商品详情显示剩余库存</el-checkbox>
                    <span style="font-size: 12px; color: #92929B;">库存为0时，商品会自动放到“已售罄"列表里，保存有效库存数字后，买家看到的商品可售库存同步更新</span>
                </div>
                <el-button>新增规格</el-button>
            </el-form-item>
            <el-form-item label="起售数量" prop="number">
                <div class="input-number">
                    <span>-</span>
                    <el-input type="number" v-model="ruleForm.number"></el-input>
                    <span>+</span>
                </div>
            </el-form-item>
            <el-form-item label="已售出数量" prop="quantitySold">
                <el-input type="number" v-model="ruleForm.quantitySold"></el-input>
                <el-checkbox v-model="checked">商品详情显示已售出数量</el-checkbox>
                    <span style="color: #92929B;">库存为0时，商品会自动放到“已售罄"列表里，保存有效库存数字后，买家看到的商品可售库存同步更新</span>
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
                <div style="margin-top: 21px;">
                    <el-checkbox v-model="checked">其他</el-checkbox>
                    <el-input v-model="input" placeholder="请输入内容"></el-input>
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
            <el-form-item label="上架时间" prop="time">
                <span>定时上架的商品在上架前请到“仓库中的宝贝”里编辑商品。</span>
                <div>
                    <el-radio-group v-model="ruleForm.time">
                        <el-radio :label="1">放入仓库</el-radio>
                        <el-radio :label="2">立即上架</el-radio>
                        <el-radio :label="3">定时上架</el-radio>
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
                <span>此功能在交易设置中开启后，可选择是否支持开具发票</span>
            </el-form-item>
            <el-form-item label="是否支持货到付款" prop="fapiao">
                <el-radio-group v-model="ruleForm.fapiao">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="运费设置" prop="fapiao">
                <div>
                    <el-radio v-model="ruleForm.fapiao" label="1">选择运费模板</el-radio>
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                            v-for="item in brandList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                </div>
                <div>
                    <el-radio v-model="ruleForm.fapiao" label="1">选择运费模板</el-radio>
                </div>
            </el-form-item>
            <el-form-item label="是否支持售后维权" prop="fapiao">
                <el-radio-group v-model="ruleForm.fapiao">
                    <el-radio :label="1">是</el-radio>
                    <el-radio :label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
        </section>
        <section class="form-section">
            <el-form-item label="是否显示关联商品" prop="brand">
                <el-radio v-model="radio" label="1">备选项</el-radio>
                <el-radio v-model="radio" label="2">备选项</el-radio>
                <el-button>选择关联商品</el-button>
            </el-form-item>
            <div class="associated-goods">
                <el-table
                    :data="tableData"
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
                <RickEditor @editorValueUpdate="editorValueUpdate" :myConfig="myConfig"></RickEditor>
            </el-form-item>
        </section>
    </el-form>
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
</div>
</template>
<script>
import SelectSpecifications from '@/views/goods/dialogs/selectSpecifications'
import RickEditor from '@/components/RickEditor';

export default {
    data() {
        return {
            ruleForm: {
                leimu: '',
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
                fapiao: 1
            },
            rules: {
                leimu: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                name: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                productCategoryInfoId: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
            },
            uploadUrl: '#',
            optionsTypeList: [],
            imageVisible: false,
            currentDialog: 'SelectSpecifications',
            dialogVisible: false,
            checked: false,
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
            }
        }
    },
    methods: {
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
    },
    components: {
        SelectSpecifications,
        RickEditor
    }
}
</script>
<style lang="scss" scoped>
$blue: #655EFF;
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
.add-goods {
    background-color: #fff;
    .header {
        display: flex;
        align-items: center;
        border-bottom: 2px solid #CACFCB;
        padding-bottom: 18px;
        .item {
            margin-right: 40px;
        }
    }
    .material {
        color: $globalMainColor;
        cursor: pointer;
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
.description {
    color: #92929B;
    font-size: 12px;
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
    width: 56px;
    height: 34px;
    padding-left: 15px;
}
</style>


