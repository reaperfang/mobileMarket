<template>
    <div class="p_container">
        <el-tabs v-model="activeName">
            <el-tab-pane label="全部" name="first">
                <div class="pane_container">
                    <p class="i_title">属性比例：</p>
                    <div class="chart1_container clearfix">
                        <div class="chart1">
                            <ip1Chart :title="'测试图表'"></ip1Chart>
                        </div>
                        <div class="chart1_info">
                            <p>累计客户数：7600</p>
                            <p>非会员：占比 60% <span>人数 1200</span></p>
                            <p>会员：占比 40% <span>人数 6400</span></p>
                        </div>
                    </div>
                    <p class="i_title">会员增长趋势：</p>
                    <div class="i_line">
                        <div class="input_wrap">
                            <el-date-picker
                                v-model="value1"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <span>最近7天</span>
                        <span>最近15天</span>
                        <span>最近30天</span>
                        <el-button type="primary" class="marL20">查 询</el-button>
                    </div>
                    <div class="chart2_container">
                        <ip2Chart :title="'测试图表'"></ip2Chart>
                    </div>
                    <p class="i_title">支付趋势：</p>
                    <div class="i_line">
                        <div class="input_wrap">
                            <el-date-picker
                                v-model="value1"
                                type="date"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                        <span>最近7天</span>
                        <span>最近15天</span>
                        <span>最近30天</span>
                        <el-button type="primary" class="marL20">查 询</el-button>
                        <span>会员消费</span>
                    </div>
                    <div class="chart3_container clearfix">
                        <div class="chart3">
                            <ip3Chart :title="'测试图表'"></ip3Chart>
                        </div>
                        <div class="chart3_info">
                            <p><span class="color_block" style="background-color:#A1E174"></span><span>支付0次</span><span>12765人</span></p>
                            <p><span class="color_block" style="background-color:#578EFA"></span><span>支付 1-3 次</span><span>676人</span></p>
                            <p><span class="color_block" style="background-color:#FD932B"></span><span>支付 4-10 次</span><span>43人</span></p>
                            <p><span class="color_block" style="background-color:#FD4C2B"></span><span>支付 11 次及以上</span><span>374人</span></p>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="公众号" name="second">公众号</el-tab-pane>
            <el-tab-pane label="小程序" name="third">角色管理</el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import ip1Chart from './components/ip1Chart';
import ip2Chart from './components/ip2Chart';
import ip3Chart from './components/ip3Chart';
export default {
    components: { ip1Chart, ip2Chart, ip3Chart },
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
        color: #3D434A;
        .i_title{
            margin: 23px 0 32px 38px;
        }
        .chart1_container{
            padding-bottom: 32px;
            border-bottom: 1px dashed #D3D3D3;
            .chart1{
                float: left;
                width: 500px;
            }
            .chart1_info{
                float: left;
                margin: 176px 0 0 91px;
                p{
                    margin-bottom: 20px;
                    &:first-child{
                        font-weight: bold;
                    }
                    span{
                        margin-left: 20px;
                    }
                }
            }
        }
        .i_line{
            padding-left: 35px;
            .input_wrap{
                width: 220px;
                display: inline-block;
            }
            span{
                color: #655EFF;
                margin-left: 20px;
            }
        }
        .chart2_container{
            padding-top: 20px;
        }
        .chart3_container{
            padding-top: 20px;
            .chart3{
                float: left;
                width: 700px;
            }
            .chart3_info{
                float: left;
                width: 400px;
                margin-top: 150px;
                p{
                    margin-bottom: 20px;
                    span{
                        display: inline-block;
                        &:first-child {
                            width: 16px;
                            height: 16px;
                            margin-right: 10px;
                        }
                        &:nth-child(2) {
                            width: 150px;
                        }
                    }
                }
            }
        }
    }
}
</style>

