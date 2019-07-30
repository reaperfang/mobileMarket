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
                    <!-- <div class="btn_tabs clearfix">
                        <el-button class="fr marL10" round>访问来源</el-button>
                        <el-button class="fr" round>到店时段</el-button>
                        <el-button class="fr" round>访问次数</el-button>
                        <el-button class="active_btn fr" round>浏览量/访问量</el-button>
                    </div> -->
                    <div class="chart_container">
                        <div class="path_line clearfix">
                            <div class="p_l">
                                <p>第一步</p>
                                <p>访客（人）</p>
                            </div>
                            <div class="p_r p_1">
                                <div>
                                    <p>首页</p>
                                    <p>560</p>
                                </div>
                                <div>
                                    <p>商品列表页</p>
                                    <p>567</p>
                                </div>
                                <div>
                                    <p>购物车</p>
                                    <p>230</p>
                                </div>
                                <div>
                                    <p>商详页</p>
                                    <p>567</p>
                                </div>
                                <div>
                                    <p>其他页</p>
                                    <p>567</p>
                                </div>
                            </div>
                        </div>
                        <div class="path_line clearfix">
                            <div class="p_l">
                                <p>第二步</p>
                                <p>下单（人）</p>
                            </div>
                            <div class="p_r p_2">
                                <div class="p_top">
                                    <p>4.35%</p>
                                    <p>0.00%</p>
                                    <p>0.00%</p>
                                    <p>25.45%</p>
                                    <p>25.45%</p>
                                </div>
                                <div class="p_bottom">
                                    <p>商品列表页</p>
                                    <p>567</p>
                                </div>
                            </div>
                        </div>
                        <div class="path_line clearfix">
                            <div class="p_l">
                                <p>第三步</p>
                                <p>支付（人）</p>
                            </div>
                            <div class="p_r p_3">
                                <div class="p_top">
                                    <p>4.35%</p>
                                    <p>0.00%</p>
                                    <p>0.00%</p>
                                </div>
                                <div class="p_bottom">
                                    <div>
                                        <p>支付成功</p>
                                        <p>567</p>
                                    </div>
                                    <div>
                                        <p>直接退出</p>
                                        <p>567</p>
                                    </div>
                                    <div>
                                        <p>其他</p>
                                        <p>567</p>
                                    </div>
                                </div>
                            </div>
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
import apChart from './components/apChart'
export default {
    components: { apChart },
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
                cursor: pointer;
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
            padding: 100px 0 50px 20px;
            height: 400px;
            .path_line{
                .p_l{
                    color: #333;
                    font-size: 19px;
                    float: left;
                    width: 107px;
                    p:first-child{
                        margin-top: 26px;
                    }
                }
                .p_r{
                    float: left;
                    width: 750px;
                    color: #fff;
                    &.p_1{
                        height: 87px;
                        background: url("../../assets/images/datum/path_01.png") 0 0 no-repeat;
                        padding: 0 90px 0 82px;
                        display: flex;
                        flex-wrap: nowrap;
                        justify-content: space-between;
                        div{
                            padding: 0 10px;
                            text-align: center;
                            p:first-child{
                                font-size: 16px;
                                margin-top: 17px;
                            }
                            p:last-child{
                                font-size: 24px;
                                margin-top: 5px;
                            }
                        }
                    }
                    &.p_2{
                        height: 82px;
                        background: url("../../assets/images/datum/path_02.png") 99px 0 no-repeat;
                        .p_top{
                            height: 36px;
                            line-height: 36px;
                            padding: 0 180px 0 190px;
                            display: flex;
                            flex-wrap: nowrap;
                            justify-content: space-between;
                        }
                        .p_bottom{
                            text-align: center;
                            p:first-child{
                                font-size: 16px;
                            }
                            p:last-child{
                                font-size: 24px;
                            }
                        }
                    }
                    &.p_3{
                        height: 82px;
                        background: url("../../assets/images/datum/path_03.png") 199px 0 no-repeat;
                        .p_top{
                            height: 36px;
                            line-height: 36px;
                            padding: 0 238px 0 250px;
                            display: flex;
                            flex-wrap: nowrap;
                            justify-content: space-between;
                        }
                        .p_bottom{
                            padding: 0 240px 0 264px;
                            display: flex;
                            justify-content: space-between;
                            div{
                                width: 70px;
                                text-align: center;
                                p:first-child{
                                    font-size: 16px;
                                }
                                p:last-child{
                                    font-size: 24px;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

