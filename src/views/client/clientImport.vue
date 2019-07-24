<template>
    <div class="c_container">
        <p class="c_title">批量导入：</p>
        <div class="c_top">
            <div class="form_container">
                <el-form ref="form" :model="form">
                    <el-form-item label="所属渠道：">
                        <div class="input_wrap">
                            <el-select v-model="form.channel" placeholder="选择渠道">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </el-form-item>
                    <el-form-item label="身份：">
                        <div class="input_wrap">
                            <el-radio v-model="form.identity" label="1">会员</el-radio>
                            <el-radio v-model="form.identity" label="2">非会员</el-radio>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <div class="input_wrap marL">
                            <el-button type="primary">上传文件</el-button>
                            <el-button>下载导入模板</el-button>
                        </div>
                        <p class="c_support">支持文件格式：.csv .xsl ，单个文件不能超过10M</p>
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
                    v-model="value1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <span>渠道：</span>
                <el-select v-model="form.channel" placeholder="选择渠道">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary">查 询</el-button>
                <el-button>重 置</el-button>
            </div>
            <ciTable style="margin-top: 68px"></ciTable>
        </div>
    </div>
</template>
<script type="es6">
import clientCont from '@/system/constant/client';
import ciTable from './components/ciTable';
export default {
    components: { ciTable },
    data() {
        return {
            form: {
                channel:"",
                identity: "1"
            },
            options: [
                {label: '渠道1',value: 1},
                {label: '渠道2',value: 2}
            ],
            value1:""
        }
    },
    computed: {
        memberLabels() {
            return clientCont.memberLabels
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/.el-form-item__label{
    width: 100px;
}
.c_container{
    background-color: #fff;
    padding: 16px 20px;
    .c_title{
        color: #3D434A;
    }
    .c_top{
        padding-top: 17px;
        border-bottom: 1px dashed #D3D3D3;
        .form_container{
            .input_wrap{
                display: inline-block;
                width: 202px;
                &.marL{
                    margin-left: 100px;
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
