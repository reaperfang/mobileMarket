<template>
    <div class="c_container">
        <el-tabs v-model="activeName">
            <el-tab-pane label="会员卡管理" name="first">
                <div class="pane_container">
                    <div class="c_card">
                        <el-button size="mini" class="mini_1">待上传</el-button>
                        <el-button size="mini" class="mini_2">更改</el-button>
                    </div>
                    <p class="c_warn">建议上传图片尺寸1000*630像素，不超过2M，格式支持JPG、PNG、JPEG</p>
                </div>
                <cdTable></cdTable>
            </el-tab-pane>
            <el-tab-pane label="领卡记录" name="second">
                <div class="c_line">
                    <span>卡名称：</span>
                    <div class="input_wrap">
                        <el-select placeholder="全部">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </div>
                    <span style="margin-left: 200px;">领取时间：</span>
                    <el-date-picker
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button type="primary" class="marL20">查 询</el-button>
                    <el-button class="border_btn">重 置</el-button>
                </div>
                <lkTable style="margin-top: 39px"></lkTable>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script type="es6">
import cdTable from './components/cardManage/cdTable';
import lkTable from './components/cardManage/lkTable';
export default {
    name: "cardManage",
    components: { cdTable, lkTable },
    data() {
        return {
            activeName: 'first',
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .el-button--mini{
    padding: 5px 10px;
}
.c_container{
    padding: 20px;
    background-color: #fff;
}
.pane_container{
    padding: 12px 20px;
    .c_card{
        width: 324px;
        height: 140px;
        background: url("../../assets/images/client/card.png") 0 0 no-repeat;
        position: relative;
        .mini_1{
            position: absolute;
            border-color: #655EFF;
            color:#655EFF;
            background: transparent;
            right: 7px;
            bottom: 35px;
        }
        .mini_2{
            position: absolute;
            border-color: #FD4C2B;
            color:#FD4C2B;
            background: transparent;
            right: 7px;
            bottom: 6px;
            padding: 5px 16px;
        }
    }
    .c_warn{
        color: #92929B;
        font-size: 12px;
        margin: 7px 0 27px 0;
    }
}
.c_line{
    .input_wrap{
        display: inline-block;
        width: 182px;
    }
}
</style>


