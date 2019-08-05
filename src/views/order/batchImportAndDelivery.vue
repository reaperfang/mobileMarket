<template>
    <div class="batch-import-and-delivery">
        <div class="title">批量导入发货</div>
        <div class="content">
            <el-steps class="steps" :space="200" :active="1" finish-status="success">
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
            </p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .batch-import-and-delivery {
        background-color: #fff;
        padding: 20px;
        .title {
            font-size: 16px;
            margin-bottom: 30px;
        }
        .content {
            padding-left: 50px;
            .steps {
                width: 500px;
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
    }
</style>


