<template>
    <div class="p_container">
        <div class="clearfix">
          <div class="fr">
            <el-radio-group class="fr" v-model="visitSourceType" @change="all">
              <el-radio-button class="btn_bor" label="0">全部</el-radio-button>
              <el-radio-button class="btn_bor" label="1">小程序</el-radio-button>
              <el-radio-button class="btn_bor" label="2">公众号</el-radio-button>
            </el-radio-group>
          </div>
      </div>
                <div class="pane_container">
                    <div class="p_line">
                    <el-radio-group v-model="dateType" @change="changeDay">
                        <el-radio-button class="btn_bor" label="1">最近7天</el-radio-button>
                        <el-radio-button class="btn_bor" label="2">最近15天</el-radio-button>
                        <el-radio-button class="btn_bor" label="3">最近30天</el-radio-button>
                        <el-radio-button class="btn_bor" label="4">自定义时间</el-radio-button>
                        </el-radio-group>
                        <div class="input_wrap" v-if="dateType == 4">
                        <el-date-picker
                            v-model="range"
                            type="daterange"
                            range-separator="—"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="changeTime"
                        ></el-date-picker>
                        </div>
                    </div>
                    
                    <div class="chart_container">
                        <div class="path_line clearfix">
                            <div class="p_l">
                                <p>第一步</p>
                                <p>访客（人）</p>
                            </div>
                            <div class="p_r p_1">
                                <div v-for="(item,index) in dataObj.oneDataArr">
                                    <p>{{item.pageDescribe}}</p>
                                    <p>{{item.uniqueViewCount}}</p>
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
                                    <p  v-for="(item,index) in dataObj.twoDataArr">{{item.inversionRate}}</p>
                                </div>
                                <div class="p_bottom">
                                    <p v-for="(item,index) in dataObj.twoDataArr">{{item.pageDescribe}}</p>
                                    <p v-for="(item,index) in dataObj.twoDataArr">{{item.uniqueViewCount}}</p>
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
                                    <p  v-for="(item,index) in dataObj.threeDataArr">{{item.inversionRate}}</p>
                                </div>
                                <div class="p_bottom">
                                    <div v-for="(item,index) in dataObj.threeDataArr">
                                        <p>{{item.pageDescribe}}</p>
                                        <p>{{item.uniqueViewCount}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
</template>
<script>
import apChart from './components/apChart'
export default {
    name: 'accessPath',
    components: { apChart },
    data() {
        return {
            range: "",
            visitSourceType:0,
            nearDay:'',
            startTime:'',
            endTime:'',
            dateType:1,
            dataObj:{}
        }
    },
    methods:{
        getPathConversion(){
           let data = {
            startTime: this.startTime,
            endTime: this.endTime,
            visitSourceType: this.visitSourceType,
        };      
      this._apis.data.transformation(data).then(response => {
          this.dataObj = response
        }).catch(error => {
          this.$message.error(error);
        }); 
        },
        changeTime(val){
        this.startTime = val[0]
        this.endTime = val[1]
        this.getPathConversion();
        },
    all(){
        this.getPathConversion();
    },
    changeDay(val){
        if(val != 4){
         this.getPathConversion();
        }
    }
    },
    created(){
        this.getPathConversion()
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
                            justify-content: space-evenly;
                        }
                        .p_bottom{
                            padding: 0 180px 0 190px;
                            display: flex;
                            flex-wrap: nowrap;
                            justify-content: space-evenly;
                            // p:first-child{
                            //     font-size: 16px;
                            // }
                            // p:last-child{
                            //     font-size: 24px;
                            // }
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
                                // p:first-child{
                                //     font-size: 16px;
                                // }
                                // p:last-child{
                                //     font-size: 24px;
                                // }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

