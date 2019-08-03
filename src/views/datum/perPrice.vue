<template>
    <div>
        <div class="p_block">
            <p class="p_title">实时概况
                <span class="lb">更新时间：</span>
                <i class="el-icon-time"></i>
                <span>2019-03-25 16:00:00</span>
            </p>
            <div class="clearfix marT20">
                <img src="../../assets/images/datum/icon_head.png" alt="" class="fl">
                <div class="fl">
                    <p class="p1">253.5</p>
                    <p class="p2">客单价（元）</p>
                </div>
            </div>
            <div>
                <pp1Chart :title="'测试图表'"></pp1Chart>
            </div>
        </div>
        <div class="p_block marT20">
            <p class="p_title">历史记录</p>
            <div class="p_line">
                <div class="pl">
                    <p>按时间筛选</p>
                    <span v-for="item in days" :key="item"  @click="checkDay(item)" :class="[day == item ? 'active':'']">{{item}}</span>
                </div>
                <div class="pr">
                    <el-button class="minor_btn" icon="el-icon-search">查询</el-button>
                    <el-button class="border_btn">重 置</el-button>
                </div> 
            </div>
        </div>
        <div class="p_block marT20">
            <p class="p_title">关键指标详解</p>
            <el-button class="export_btn" icon="el-icon-share">导出</el-button>
            <el-button class="minor_btn fr" style="margin: 20px -78px 0 0">重新筛选</el-button>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="客单价" name="first">
                    <div class="pane_container">
                        <div>
                            <pp1Chart :title="'测试图表'"></pp1Chart>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="订单量" name="second"></el-tab-pane>
                <el-tab-pane label="人均消费金额趋势" name="third"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="p_block marT20">
            <p class="p_title">详细数据</p>
            <ppTable style="margin-top: 20px"></ppTable>
        </div>
    </div>
</template>
<script>
import pp1Chart from './components/pp1Chart';
import ppTable from './components/ppTable';
export default {
    name: 'perPrice',
    components: { pp1Chart, ppTable },
    data() {
        return {
            day: "",
            days: ['7天','15天','30天'],
            activeName:"first"
        }
    },
    methods: {
        checkDay(item) {
            this.day = item;
        }
    }
}
</script>
<style lang="scss" scoped>
/deep/ .el-tabs__nav{
    float: right;
}
/deep/ .el-tabs{
    padding-right: 140px;
    margin-top: -30px;
}
/deep/ .el-tabs__nav-wrap::after{
    height: 0;
}
/deep/ .el-tabs__item.is-active{
    color: #FFB723
}
/deep/ .el-tabs__active-bar{
    background-color: #FFB723;
}
.p_block{
    background-color: #fff;
    padding: 15px 20px;
    .p_title{
        font-size: 16px;
        span{
            color: #92929B;
            font-size: 12px;
            &.lb{
                display: inline-block;
                border-left: 1px solid #92929B;
                margin-left: 10px;
                padding-left: 6px;
            }
        }
        i{
            color: #92929B;
            font-size: 12px;
        }
    }
    .p1{
        font-size: 30px;
        color: #6ACEA8;
        margin: 0 0 1px 10px;
    }
    .p2{
        color: #92929B;
        margin-left: 14px;
    }
    .p_line{
        padding: 32px 26px;
        .pl{
            width: 323px;
            float: left;
            p{
                font-size: 16px;
                display: inline-block;
            }
            span{
                display: inline-block;
                padding: 0 20px;
                height: 34px;
                line-height: 34px;
                margin-left: 10px;
                cursor: pointer; 
                &.active{
                    color: #655EFF;
                    background:#E6E4FF;
                    border-radius:4px;
                }
            }
        }
        .pr{
            float: right;
            width: 200px;
        }
    }
    .pane_container{
        position: relative;
        
    }
    .export_btn{
        float: right;
        margin-top: -20px;
        background-color:#FFF8EA;
        color: #FFB723;
        border: none;
    }
}
</style>


