<template>
    <div class="batch-import-and-delivery">
        <div class="title">批量导入发货</div>
        <div class="content">
            <!-- <el-steps class="steps" :space="500" :active="1" finish-status="success">
                <el-step title="上传模板"></el-step>
                <el-step title="批量发货"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
            <p class="progress">
                <span>批量发货模板导入文件.xlsx</span>
                <span>（100%）</span>
            </p>
            <p class="upload"><a href="javascript:;">重新上传</a></p>
            <p>
                <el-button>取 消</el-button>
                <el-button type="primary">批量发货</el-button>
            </p> -->
            <section class="step_1" v-if="active == 1">
                <el-steps class="steps" :space="500" :active="active" finish-status="success">
                    <el-step title="上传模板"></el-step>
                    <el-step title="批量发货"></el-step>
                    <el-step title="完成"></el-step>
                </el-steps>
                <div class="row justify-center align-center upload-container">
                    <div class="col upload-col">
                        <el-upload
                            :action="uploadUrl"
                            :limit="1"
                            :show-file-list="false"
                            :data="{json: JSON.stringify({cid: 2})}"
                            :on-success="uploadSuccess"
                            class="p_imgsCon"
                            :before-upload="beforeUpload">
                            <i class="el-icon-plus"></i>
                            <p style="line-height: 21px; margin-top: -39px; color: #92929B;">请选择上传文件</p>
                        </el-upload>
                    </div>
                    <div class="col">
                        <p>说明：请按下载模板格式上传文件，最大支持1M的EXCEL文件</p>
                        <p class="blue pointer">下载批量发货模板</p>
                    </div>
                </div>
            </section>
            <section class="step_2" v-if="active == 2">
                <el-steps class="steps" :space="500" :active="active" finish-status="success">
                    <el-step title="上传模板"></el-step>
                    <el-step title="批量发货"></el-step>
                    <el-step title="完成"></el-step>
                </el-steps>
                <div class="content">
                    <p>{{original}} (100%)</p>
                    <p><a href="javascript:;" @click="uploadAgin">重新上传</a></p>
                    <p>
                        <el-button @click="cancelImport">取 消</el-button>
                        <el-button type="primary">批量发货</el-button>
                    </p>
                </div>
            </section>
        </div>
        <component :is="currentDialog" :dialogVisible.sync="dialogVisible" @submit="onSubmit"></component>
    </div>
</template>
<script>
import CancelImportDialog from '@/views/order/dialogs/cancelImportDialog'

export default {
    data() {
        return {
            uploadUrl: `${process.env.UPLOAD_SERVER}/web-file/file-server/api_file_remote_upload.do`,
            url: '',
            active: 1,
            original: '',
            currentDialog: '',
            dialogVisible: false,

        }
    },
    methods: {
        onSubmit() {

        },
        cancelImport() {
            this.currentDialog = 'CancelImportDialog'
            this.dialogVisible = true
        },
        uploadSuccess(response, file, fileList){
            if(file.status == "success"){
                this.$message.success(response.msg);
                this.url = response.data.url;
                this.original = response.data.original
                this.active = 2
            }else{
                this.$message.error(response.msg);
            }
        },
        beforeUpload(file) {
            console.log(file)
            if(file.size > 1048576) {
                this.confirm({title: '提示', icon: true, text: '文件过大，请重新上传', confirmText: '我知道了'})
                return false
            }
        },
        uploadAgin() {
            this.active = 1
        }
    },
    components: {
        CancelImportDialog
    }
}
</script>
<style lang="scss" scoped>
    .batch-import-and-delivery {
        color: #44434B;
        background-color: #fff;
        padding: 20px;
        padding-right: 70px;
        .title {
            font-size: 16px;
            margin-bottom: 30px;
        }
        .content {
            padding-left: 50px;
            .steps {
                margin: 0 auto;
            }
            p {
                text-align: center;
            }
            .progress {
                margin-top: 74px;
            }
            .upload {
                margin-top: 10px;
                margin-bottom: 40px;
                color: $globalMainColor;
            }
        }

        .step_1 {
            .upload-container {
                margin-top: 50px;
                .upload-col {
                    margin-right: 30px;
                }
                .col:last-child {
                    p {
                        text-align: left;
                        line-height: 21px;
                    }
                }
            }
        }
        .step_2 {
            .content  {
                margin-top: 74px;
                p {
                        text-align: center;
                        line-height: 21px;
                        &:nth-child(2) {
                            margin-top: 15px;
                            a {
                                color: #655EFF;
                            }
                        }
                        &:last-child {
                            margin-top: 40px;
                        }
                    }
            }
        }
    }
    /deep/ .el-steps .el-step:last-child {
        flex: 0;
        flex-basis: 40px!important;
    }
    /deep/ .el-upload {
        width: 173px !important;
        height: 94px !important;
    }
    /deep/ .el-icon-plus:before {
        content: ''
    }
    /deep/ .el-icon-plus {
        display: inline-block;
        width: 44px;
        height: 30px;
        background: url(../../assets/images/order/upload.png) no-repeat;
    }
    /deep/ .el-upload p {
        margin-top: -35px;;
    }
    /deep/ .el-upload {
        border: 1px solid #d3d3d3;
        border-radius:10px;
    }
</style>


