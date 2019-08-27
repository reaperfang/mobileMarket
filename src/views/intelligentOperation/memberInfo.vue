<template>
<div class="m_container">
        <div class="pane_container">
                    <el-form ref="form" :model="form" class="clearfix">
                        <el-form-item label="交易时间">
                            <div class="input_wrap">
                                <el-radio-group v-model="form.time" @change="changeDay">
                                    <el-radio-button class="btn_bor" label="1">7天</el-radio-button>
                                    <el-radio-button class="btn_bor" label="2">15天</el-radio-button>
                                    <el-radio-button class="btn_bor" label="3">30天</el-radio-button>
                                    <el-radio-button class="btn_bor" label="4">本季度</el-radio-button>
                                </el-radio-group>
                            </div>
                            <el-date-picker
                                v-model="form.daterange"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                @change="getData"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="会员类型">
                            <div class="input_wrap2">
                                <el-select v-model="form.memberType"  @change="getData">
                                    <el-option v-for="item in customType" :label="item.name" :value="item.id" :key="item.id"></el-option>
                                </el-select>
                            </div>
                            <span class="span_label">交易次数</span>
                            <div class="input_wrap2 marR20">
                                <el-select v-model="form.tradeCountRange"  @change="getData">
                                    <el-option v-for="item in tradeCount" :label="item.name" :value="item.id" :key="item.id"></el-option>
                                </el-select>
                            </div>
                            <el-checkbox-group v-model="form.queryRepeatPaymentRatio">
                                <el-checkbox label="是否查询复购率" name="type"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="订单金额">
                            <div class="input_wrap3">
                                <el-radio v-model="form.queryOrderMoneyType" label="0" @change="getData">单次</el-radio>
                                <el-radio v-model="form.queryOrderMoneyType" label="1" @change="getData">总额</el-radio>
                            </div>
                            <div class="input_wrap2">
                                <el-input placeholder="最低金额（元）" v-model="form.lowprice"></el-input>
                            </div>
                            <span>—</span>
                            <div class="input_wrap2">
                                <el-input placeholder="最高金额（元）" v-model="form.highprice"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item class="fr marT20">
                            <el-button class="minor_btn" icon="el-icon-search" @click="goSearch">查询</el-button>
                            <el-button class="border_btn">重 置</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="m_line clearfix">
                        <p class="fl">该筛选条件下：会员共计<span>326</span>人；占会员总数的<span>76%</span>; 复购率为<span>23%</span>。</p>
                        <div class="fr marT20">
                            <el-button class="minor_btn">重新筛选</el-button>
                            <el-button class="yellow_btn" icon="el-icon-share">导出</el-button>
                        </div>
                    </div>
                    <maTable class="marT20"></maTable>
        </div>
        </div>
</template>
<script>
import maTable from './components/maTable';
export default {
    name: 'memberInfo',
    components: { maTable },
    data() {
        return {
            form: {
                time:['7天'],
                cid:"",
                startTime:"",
                endTime:"",
                daterange:"",
                memberType:"",
                tradeCountRange:"",

                queryRepeatPaymentRatio: false,
                queryOrderMoneyType: "",
                MoneyRange:""
            },
            customType: [
                {
                    id: "",
                    name: "全部"
                },
                {
                    id: "0",
                    name: "非会员"
                },{
                    id: "1",
                    name: "新会员"
                },{
                    id: "2",
                    name: "老会员"
                }
            ],
            tradeCount: [
                {
                    id: "",
                    name: "不限"
                },
                {
                    id: "1",
                    name: "1次"
                },{
                    id: "2-5",
                    name: "2-5次"
                },{
                    id: "6-8",
                    name: "6-8次"
                },{
                    id: "8",
                    name: "8次以上"
                }
            ],

        }
    },
    methods: {
        checkDay(item) {
            this.day = item;
        },
        changeDay(){
            console.log(this.form)
        },
        //获取筛选数据
        getData(){
            if(this.form.daterange){
                Object.assign(this.form,{
                    startTime:this.form.daterange[0].getTime(),
                    endTime:this.form.daterange[1].getTime()
                });
            }else{
                Object.assign(this.form,{
                    startTime:"",
                    endTime:""
                });
            }
            console.log(this.form)
        },

        //查询
        goSearch(){
            if(this.form.lowprice&&this.form.highprice){
                this.form.MoneyRange =  String(this.form.lowprice)+'-'+String(this.form.highprice);
            }
            console.log(this.form)
            this._apis.data.memberInformation(this.form).then(res => {
                console.log(res)
            }).catch(error => {
            this.$message.error(error);
            });
        }
    }
}
</script>
<style lang="scss" scoped>
/deep/.el-checkbox.is-bordered{
    border: none;
}
/deep/.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner{
    display: none;
}
/deep/.el-checkbox.is-bordered.el-checkbox--small{
    padding: 5px 10px 5px 10px;
    background:rgba(211,211,211,0.3);
}
/deep/.el-checkbox__label{
    padding-left: 0;
}
/deep/.el-checkbox.is-bordered+.el-checkbox.is-bordered{
    margin-left: 0;
}
/deep/.el-checkbox.is-bordered.is-checked{
    background:rgba(101,94,255,0.1);
}
.m_container{
    background-color: #fff;
    padding: 10px 20px;
    .pane_container{
        color:#3D434A;
        padding: 10px;
        .input_wrap{
            display: inline-block;
            width: 450px;
        }
        .input_wrap2{
            display: inline-block;
            width: 140px;
        }
        .input_wrap3{
            display: inline-block;
            width: 200px;
        }
        .span_label{
            margin: 0 10px 0 25px;
        }
        .m_line{
            border-top: 1px dashed #D3D3D3;
            p{
                line-height: 70px;
                span{
                    color: #655EFF;
                }
            }
        }
    }
}
</style>


