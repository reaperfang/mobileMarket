<template>
<div class="m_container">
        <div class="pane_container">
                    <el-form ref="form" :model="form" class="clearfix">
                        <el-form-item label="交易时间">
                            <div class="input_wrap">
                                <el-radio-group v-model="form.timeType" @change="changeDay">
                                    <el-radio-button class="btn_bor" label="1">7天</el-radio-button>
                                    <el-radio-button class="btn_bor" label="2">15天</el-radio-button>
                                    <el-radio-button class="btn_bor" label="3">30天</el-radio-button>
                                    <el-radio-button class="btn_bor" label="5">本季度</el-radio-button>
                                </el-radio-group>
                            </div>
                            <el-date-picker
                                v-model="form.daterange"
                                type="daterange"
                                value-format="yyyy-MM-dd hh:mm:ss"
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
                        <el-form-item label="订单金额" prop="lowprice">
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
                            <el-button class="border_btn" @click="reSet">重 置</el-button>
                        </el-form-item>
                    </el-form>

                    <div class="m_line clearfix">
                        <p class="fl" v-if="textTips">该筛选条件下：<i v-if="form.memberType==1" style="font-style:normal">新</i><i v-if="form.memberType==2" style="font-style:normal">老</i>会员共计<span>{{memberNum}}</span>人；占会员总数的<span>{{memberCount}}%</span>; 复购率为<span>{{repeatPaymentRatio}}</span>。</p>
                        <p class="fl" v-else>-</p>
                        <div class="fr marT20">
                            <el-button class="minor_btn" @click="reScreening">重新筛选</el-button>
                            <el-button class="yellow_btn" icon="el-icon-share" @click="mIexport">导出</el-button>
                        </div>
                    </div>

                    <maTable class="marT20" 
                        @sizeChange = "sizeChange"
                        @currentChange = "currentChange"                   
                        :listObj="listObj" 
                        :totalCount="totalCount">
                    </maTable>
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
                cid:"",
                startTime:null, //2019-08-07 12:12:12
                endTime:null,
                daterange:null,
                memberType:null,  //客户是0，新会员是1，老会员是2

                tradeCountRange:null,
                queryRepeatPaymentRatio: 0,
                queryOrderMoneyType: null, // 单次和总额 0和1
                MoneyRange:null,
                timeType:1,
                startIndex:1,
                pageSize:10
            },
            textTips:false,
            repeatPaymentRatio:0.1, //复购率
            memberNum:0, //会员人数
            memberCount:0, //会员占比
            listObj:{},//会员信息列表
            totalCount:0,//总条数
            customType: [
                {
                    id: null,
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
                    id: null,
                    name: "不限"
                },
                {
                    id: "0-1",
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
            rules: {
                lowprice: [
                    { required: true, message: '最低和最高金额必须同时输入', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            }

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
                this.form.timeType = 4;
                Object.assign(this.form,{
                    startTime:this.form.daterange[0],
                    endTime:this.form.daterange[1]
                });
            }else{
                Object.assign(this.form,{
                    startTime:null,
                    endTime:null
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

            let memberType = this.form.memberType;
            this._apis.data.memberInformation(this.form).then(res => {
                this.repeatPaymentRatio = res.repeatPaymentRatio;
                this.listObj = res; //信息列表数据
                this.totalCount = res.totalPage * this.form.pageSize;
                if(memberType == 1){ //新会员
                    this.textTips = true;
                    this.memberNum = res.newMemberCount;
                    this.memberCount = res.newMemberRatio;
                }else if(memberType == 2){ //老会员
                    this.textTips = true;
                    this.memberNum = res.oldMemberCount;
                    this.memberCount = res.oldMemberRatio;
                }else{ //其他
                    this.textTips = false;
                }
                console.log(res)
                console.log(this.repeatPaymentRatio)
            }).catch(error => {
                this.$message.error(error);
            });
        },
        // 重置
        reSet(){
            this.form = {
                startTime:null, //2019-08-07 12:12:12
                endTime:null,
                daterange:null,
                memberType:null,  //客户是0，新会员是1，老会员是2

                tradeCountRange:null,
                queryRepeatPaymentRatio: false,
                queryOrderMoneyType: null, // 单次和总额 0和1
                MoneyRange:null,
                timeType:1,
                startIndex:1,
                pageSize:10
            }
            this.goSearch();
        },
        //重新筛选
        reScreening(){
            console.log(11)
            this.$router.push('/intelligentOperation/memberInfo');
        },
        //导出
        mIexport(){
            let data = {};
            data.cid = ""
            data.startTime = this.form.startTime || null
            data.endTime = this.form.endTime || null
            data.memberType = this.form.memberType
            data.tradeCountRange = this.form.tradeCountRange
            data.queryRepeatPaymentRatio = this.form.queryRepeatPaymentRatio
            data.queryOrderMoneyType = this.form.queryOrderMoneyType
            data.MoneyRange = this.form.MoneyRange
            data.timeType = this.form.timeType

            console.log(data)
            this._apis.data.memberInformationExport(data)
            .then(res => {
                window.open(res);
            })
            .catch(err=>{
                this.$message.error(err);
            })
        },
        sizeChange(val){
            this.form.pageSize = val;
            this.goSearch();
        },
        currentChange(val){
            this.form.startIndex = val;
            this.goSearch();
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


