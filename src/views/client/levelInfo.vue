<template>
    <div class="l_container">
        <p class="l_title">等级信息：</p><br>
        <div class="clearfix">
            <span class="icon_title">等级图标：</span>
            <el-upload
                style="float: left"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :limit="1"
                :file-list="fileList">
                <el-button size="small">上传图片</el-button>
            </el-upload>
            <span class="l_warn fl marL10 marT10">大小不超过2M</span>
        </div>
    </div>
</template>
<script type="es6">
export default {
    data() {
        return {
            fileList: []
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .el-upload{
    height: 30px !important;
    line-height: 30px !important;
}
.l_container{
    padding: 20px;
    background-color: #fff;
    .icon_title{
        float: left;
        margin: 10px 0 0 30px;
        color:#44434B;
    }
    .l_warn{
        color: #92929B;
        font-size: 12px;
    }
}
</style>