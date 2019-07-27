<template>
    <div class="p_container">
        <el-tabs v-model="activeName">
            <el-tab-pane label="全部" name="first">
                <div class="pane_container">
                    <div class="p_line">
                        <div class="input_wrap">
                            <el-date-picker
                                v-model="range"
                                type="daterange"
                                range-separator="—"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </div>
                        <span>最近7天</span>
                        <span>最近15天</span>
                        <span>最近30天</span>
                    </div>
                    <div class="btn_tabs clearfix">
                        <el-button class="fr marL10" round>访问来源</el-button>
                        <el-button class="fr" round>到店时段</el-button>
                        <el-button class="fr" round>访问次数</el-button>
                        <el-button class="active_btn fr" round>浏览量/访问量</el-button>
                    </div>
                    <div class="chart_container">
                        <pfChart :title="'测试图表'"></pfChart>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="公众号" name="second">公众号</el-tab-pane>
            <el-tab-pane label="小程序" name="third">角色管理</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import pfChart from './components/pfChart'
export default {
    components: { pfChart },
    data() {
        return {
            activeName: "first", 
            range: ""
        }
    }
}
</script>
<style lang="scss" scoped>
.p_container{
    padding: 20px;
    background-color: #fff;
    .pane_container{
        .p_line{
            .input_wrap{
                width: 350px;
                display: inline-block;
            }
            span{
                color: #655EFF;
                margin-left: 20px;
            }
        }
        .btn_tabs{
            margin: 30px 0 22px 0;
            .active_btn{
                background:rgba(101,94,255,0.1);
                color: #655EFF;
            }
        }
        .chart_container{
            padding-top: 20px;
            border-top: 1px dashed #D3D3D3;
        }
    }
}
</style>

