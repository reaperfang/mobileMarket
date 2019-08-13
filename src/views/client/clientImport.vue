<template>
    <div class="c_container">
        <p class="c_title">批量导入：</p>
        <div class="c_top">
            <div class="form_container">
                <el-form ref="ruleForm" :rules="rules" :model="ruleForm">
                    <el-form-item label="所属渠道：" prop="channelId">
                        <div class="input_wrap">
                            <el-select v-model="ruleForm.channelId" placeholder="选择渠道">
                                <el-option
                                    v-for="item in channelOptions"
                                    :key="item.id"
                                    :label="item.channerlName"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <span class="addMainColor pointer">新建</span>
                    </el-form-item>
                    <el-form-item label="身份：" prop="memberType">
                        <div class="input_wrap">
                            <el-radio v-model="ruleForm.memberType" label="1">会员</el-radio>
                            <el-radio v-model="ruleForm.memberType" label="0">非会员</el-radio>
                        </div>
                    </el-form-item>
                    <el-form-item label="上传文件：">
                        <div class="input_wrap marL">
                            <el-upload
                                class="upload-block"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                multiple
                                :file-list="fileList">
                                <el-button size="small" type="primary">点击上传</el-button>
                                <div slot="tip" class="el-upload__tip">支持文件格式：.csv .xsl ，单个文件不能超过10M</div>
                            </el-upload>
                            <el-button class="download_btn">下载导入模板</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <div class="btn_container btns">
                <el-button type="primary">导入</el-button>
                <el-button>取消</el-button>
            </div>
        </div>
        <div class="table_container clearfix">
            <p class="c_title">导入记录：</p>
            <div class="fr marR">
                <span>导入时间：</span>
                <el-date-picker
                    v-model="importTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <span class="marL20">渠道：</span>
                <el-select v-model="channelId2" placeholder="选择渠道">
                    <el-option
                        v-for="item in channelOptions"
                        :key="item.id"
                        :label="item.channerlName"
                        :value="item.id">
                    </el-option>
                </el-select>
                <el-button type="primary" class="marL20" @click="handleCheck">查 询</el-button>
                <el-button>重 置</el-button>
            </div>
            <ciTable style="margin-top: 68px" :params="params"></ciTable>
        </div>
    </div>
</template>
<script type="es6">
import Blob from '@/excel/Blob'
import Export2Excel from '@/excel/Export2Excel.js'
import clientCont from '@/system/constant/client';
import ciTable from './components/clientImport/ciTable';
import utils from "@/utils";
export default {
    components: { ciTable },
    name: 'clientImport',
    data() {
        return {
            ruleForm: {
                channelId:"",
                memberType: "1"
            },
            rules: {
                channelId: [
                    { required: true, message: "请选择渠道" }
                ],
                memberType: [
                    { required: true, message: "请选择身份" }
                ]
            },
            //上传参数
            fileList: [],
            //查询导入记录所需要的参数：
            importTime: '',
            channelId2:"",
            channelOptions:[],
            params: {}
        }
    },
    methods: {
        handleCheck() {
            if(this.importTime == "") {
                this.$notify({
                    title: '警告',
                    message: '请选择导入时间',
                    type: 'warning'
                });
            }else if(this.channelId2 == "") {
                this.$notify({
                    title: '警告',
                    message: '请选择渠道',
                    type: 'warning'
                });
            }else{
                let params = {
                    importTimeStart: this.importTime[0],
                    importTimeEnd: this.importTime[1],
                    channelId: this.channelId2
                }
                this.params = Object.assign({}, params);
            }
        },
        //获取渠道下拉
        getChannels() {
            this._apis.client.getChannels({}).then((response) => {
                this.channelOptions = [].concat(response);
            }).catch((error) => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            })
        }
    },
    computed: {
        memberLabels() {
            return clientCont.memberLabels
        },
        handleRemove(file, fileList) {
            //console.log(file, fileList);
        },
        handlePreview(file) {
           // console.log(file);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        importTimeStart() {
            if(this.importTime) {
                return this.importTime[0]
            }
        },
        importTimeEnd() {
            if(this.importTime) {
                return this.importTime[1]
            }
        }
    },
    mounted() {
        this.getChannels();
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/.el-form-item__label{
    width: 100px;
}
/deep/ .el-upload{
    line-height: 0 !important;
    height: 30px !important;
}
/deep/ .el-upload__tip{
    font-size: 12px;
    color: #92929B;
}
/deep/ .el-upload-list__item{
    width: 300px !important;
}
.c_container{
    background-color: #fff;
    padding: 16px 20px;
    .c_title{
        color: #3D434A;
        font-weight: 600;
    }
    .c_top{
        padding-top: 17px;
        border-bottom: 1px dashed #D3D3D3;
        .form_container{
            .input_wrap{
                position: relative;
                display: inline-block;
                width: 202px;
                .upload-block{
                    width: 300px;
                }
                .download_btn{
                    position: absolute;
                    right: 0;
                    top: 0;
                }
            }
            .c_support{
                font-size: 12px;
                color: #92929B;
                margin-left: 100px;
            }
        }
        .btns{
            margin-left: 100px;
        }
    }
    .table_container{
        padding-top: 18px;
    }
}
</style>
