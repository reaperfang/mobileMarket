/*评价 */
<template>
    <div class="m_container">
         <div class="pane_container">
                    <el-form class="clearfix">
                        <el-form-item label="交易时间">
                            <div class="p_line">
                    <el-radio-group v-model="form.timeType">
                        <el-radio-button class="btn_bor" label="1">7天</el-radio-button>
                        <el-radio-button class="btn_bor" label="2">15天</el-radio-button>
                        <el-radio-button class="btn_bor" label="3">30天</el-radio-button>
                        <el-radio-button class="btn_bor" label="5">最近一季度</el-radio-button>
                        <el-radio-button class="btn_bor" label="4">自定义时间</el-radio-button>
                        </el-radio-group>
                        <div class="input_wrap" v-if="form.timeType == 4">
                        <el-date-picker
                            v-model="dateRange"
                            type="daterange"
                            :picker-options="pickerOptions"
                            range-separator="—"
                            value-format="yyyy-MM-dd"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="changeTime"
                        ></el-date-picker>
                        </div>
                    </div>
                        </el-form-item>
                        <el-form-item label="满意率">
                            <div class="input_wrap2">
                                <el-select v-model="form.niceRatioRange" @change="changeTime">
                                  <el-option v-for="item in satisfaction" :label="item.name" :value="item.value" :key="item.id"></el-option>
                                </el-select>
                            </div>
                            <span class="span_label">差评率</span>
                            <div class="input_wrap2 marR20">
                                <el-select v-model="form.badRatioRange" @change="changeTime">
                                  <el-option v-for="item in badreviews" :label="item.name" :value="item.value" :key="item.id"></el-option>
                                </el-select>
                            </div>
                            <span class="span_label">客户类型</span>
                            <div class="input_wrap2 marR20">
                                <el-select v-model="form.memberType">
                                    <el-option label="全部" value="null"></el-option>
                                    <el-option label="非会员" value="0"></el-option>
                                    <el-option label="新会员" value="1"></el-option>
                                    <el-option label="老会员" value="2"></el-option>
                                </el-select>
                            </div>
                            <el-button class="minor_btn" icon="el-icon-search" @click="getEvaluation()">查询</el-button>
                            <el-button class="border_btn" @click="resetAll()">重 置</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="m_line clearfix" v-if="listObj">
                        <p style="line-height:40px;">该筛选条件下：会员共计<span>{{listObj.memberCount || 0}}</span>人，
                        占客户总数的<span>{{listObj.ratio ? (listObj.ratio*100).toFixed(2) : 0}}</span>%；</p>
                        <p style="line-height:40px;">其中订单总计<span>{{listObj.orderCount || 0}}</span>个，
                        商品总计<span>{{listObj.goodsCount || 0}}</span>个，
                        满意商品数共计<span>{{listObj.niceGoodsCount}}</span>个,
                        满意率<span>{{listObj.niceGoodsRatio ? (listObj.niceGoodsRatio*100).toFixed(2) : 0}}%</span>；
                        差评商品数共计<span>{{listObj.badGoodsCount || 0}}</span>个，
                        差评率<span>{{listObj.badGoodsRatio ? (listObj.badGoodsRatio*100).toFixed(2) : 0}}</span>%;</p>
                    </div>
                    <div class="m_line clearfix">
                        <div class="fr marT20">
                            <el-button class="minor_btn" @click="rescreen()">重新筛选</el-button>
                            <el-tooltip content="当前最多支持导出1000条数据" placement="top">
                            <el-button class="yellow_btn" icon="el-icon-share" @click="exportExl()">导出</el-button>
                            </el-tooltip>
                        </div>
                    </div>
                    <ma4Table class="marT20s" :listObj="listObj" @getEvaluation="getEvaluation"></ma4Table>
                </div>
                <div v-if="listObj.members != undefined && (note || note1)">
                    <p>运营建议:</p>
                    <p v-if="note == '0.00-1.00'" class="proposal"><b>"满意率0-1%/满意个数1个"：</b>建议针对此类用户客服即时回复，和用户提升互动性，从而来提升满意率。</p>                
                    <p v-if="note == '2.00-5.00'" class="proposal"><b>"满意率2%-5%/满意个数2-5个"：</b>建议针对此类用户客服即时回复，和用户提升互动性，还可以赠送商品优惠券，代金券，从而来提升满意率</p>
                    <p v-if="note == '5.00-100.00'" class="proposal"><b>"满意率5%以上/满意个数5个以上"：</b>建议针对此类用户客服即时回复，和用户提升互动性，还可以赠送商品优惠券，代金券，从而来提升满意率</p>
                    <p v-if="note == '30.00-80.00'" class="proposal"><b>"满意率30%-80%/满意个数30-80个"：</b>建议针对此类用户客服即时回复，和用户提升互动性，还可以赠送商品优惠券，代金券，从而来提升满意率</p>
                    <p v-if="note == '12.00-20.00'" class="proposal"><b>"满意率12%-20%/满意个数12-20个"：</b>建议针对此类用户客服即时回复，和用户提升互动性，还可以赠送商品优惠券，代金券，从而来提升满意率</p>
                    <p v-if="note == '80.00-90.00'" class="proposal"><b>"满意率80%-90%/满意个数80-90个"：</b>建议针对此类用户客服即时回复，和用户提升互动性，还可以赠送商品优惠券，代金券，从而来提升满意率</p>
                
                    <p v-if="note1 == '0.00-1.00'"  class="proposal"><b>"差评率0-1%/差评个数1个"：</b>建议针对此类用户客服即时回复，发放现金红包补偿，从而降低差评率。</p>                
                    <p v-if="note1 == '2.00-5.00'"  class="proposal"><b>"差评率2%-5%/差评个数2-5个"：</b>建议针对此类用户赠送礼品，提升认可度，整体改进，提升售后服务，从而降低差评率。</p>
                    <p v-if="note1 == '5.00-100.00'"  class="proposal"><b>"差评率5%以上/差评个数5个以上"：</b>建议针对此类用户进行退换货处理，赠送礼品，提升认可度，整体改进，提升售后服务，发放现金红包补偿，从而降低差评率。</p>
                    <p v-if="note1 == '10.00-15.00'"  class="proposal"><b>"差评率10%-15%/差评个数10-15个"：</b>建议针对此类用户进行退换货处理，赠送礼品，提升认可度，整体改进，提升售后服务，发放现金红包补偿，从而降低差评率。</p>
                    <p v-if="note1 == '70.00-90.00'"  class="proposal"><b>"差评率70%-90%/差评个数70-90个"：</b>建议针对此类用户进行退换货处理，赠送礼品，提升认可度，整体改进，提升售后服务，发放现金红包补偿，从而降低差评率。</p>
                </div>
                <div class="contents"></div>
                <div v-if ="form.loads == true" class="loadings"><img src="../../assets/images/loading.gif" alt=""></div>
    </div>
</template>
<script>
import ma4Table from './components/ma4Table';
export default {
    name: 'rightsProtection',
    components: { ma4Table },
    data() {
        return {
            form: {
                niceRatioRange:null,
                badRatioRange: null,
                endTime:'',
                startTime:'',
                timeType:1,
                memberType:null,
                pageSize:10,
                loads:false,
                startIndex:1,
            },
            range:'',
            listObj:{
               
            },
            satisfaction:[],  //满意率
            badreviews:[],  //差评率       
            pickerMinDate: '',
            dateRange: [],
            pickerOptions: {
                onPick: ({ maxDate, minDate }) => {
                    this.pickerMinDate = minDate.getTime()
                    if (maxDate) {
                    this.pickerMinDate = ''
                    }
                },
                disabledDate: (time) => {
                    if (this.pickerMinDate !== '') {
                    const day30 = (90 - 1) * 24 * 3600 * 1000
                    let maxTime = this.pickerMinDate + day30
                    if (maxTime > new Date()) {
                        maxTime = new Date() - 8.64e7
                    }
                    return time.getTime() > maxTime || time.getTime() == this.pickerMinDate
                    }
                    return time.getTime() > Date.now() - 8.64e7
                }
            },
            note:'',
            note1:''
        }
    },
    methods: {
        // 查询
        getEvaluation(idx,pageS){
            this.form.loads = true
            this.note = ''
            this.note1 = ''
            this.form.pageSize = pageS;
            this.form.startIndex = idx;
            this.form.memberType == 'null' && (this.form.memberType = null)
            this.form.niceRatioRange == 'null' && (this.form.niceRatioRange = null)
            this.form.badRatioRange == 'null' && (this.form.badRatioRange = null)
            this._apis.data.evaluation(this.form).then(response => {
                this.listObj = response;
                this.form.loads = false
                this.note = this.form.niceRatioRange
                this.note1 = this.form.badRatioRange
            })
        },
        //获取口碑满意率
         memberInforNum(){
            this._apis.data.memberInforNum({type:5}).then(res => { 
                let pleased = [];
                for(let item of res){
                    pleased.push({
                        id: item.id,
                        value: item.minNum+'-'+ item.maxNum,
                        name: item.name
                    })
                }
                // console.log('res',res)
                // console.log(pleased)
                this.satisfaction = pleased
            }).catch(error =>{
                console.log('error',error)
            })
        },
        //获取口碑差评率
          membercha(){
            this._apis.data.memberInforNum({type:7}).then(res => { 
                let differences = [];
                for(let item of res){
                    differences.push({
                        id: item.id,
                        value: item.minNum+'-'+item.maxNum,
                        name: item.name
                    })
                }
                // console.log('res',res)
                // console.log(differences)
                this.badreviews = differences
            }).catch(error =>{
                console.log('error',error)
            })
        },
        changeTime(val){
            this.form.startTime = val[0]
            this.form.endTime = val[1]
            // console.log(this.form)
        },
        // 重置
        resetAll(){
            this.form = {
                niceRatioRange:null,
                badRatioRange: null,
                endTime:'',
                startTime:'',
                timeType:1,
                pageSize:10,
                startIndex:1,
            },
            this.getEvaluation(1,10)
        },
        // 重新筛选
        rescreen(){
            this.getEvaluation()
        },
        // 导出
        exportExl(){
            this._apis.data.evaluationExport(this.form).then(response => {
                window.open(response);
            })
        },
         getDay(day){
        　　var today = new Date();  
        　　var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
        　　today.setTime(targetday_milliseconds); //注意，这行是关键代码
        　　var tYear = today.getFullYear();
        　　var tMonth = today.getMonth();
        　　var tDate = today.getDate();
        　　tMonth = doHandleMonth(tMonth + 1);
        　　tDate = doHandleMonth(tDate);
        　　return tYear+"-"+tMonth+"-"+tDate;
        },
        doHandleMonth(month){
        　　var m = month;
        　　if(month.toString().length == 1){
        　　　　m = "0" + month;
        　　}
        　　return m;
        }
    },
    created(){
        this.getEvaluation();
        this.memberInforNum();
        this.membercha();
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
.proposal{
    margin-left: 65px;
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
.marT20s{
    position: relative;
    top:10px;
}
.contents{
    width: 100%;
    height: 45px;
    background: #fff;
}
.loadings{
    width: 220px;
    height: 220px;
    position: absolute;
    left: 53%;
    top: 34%;
    transform: translate(-50%,-50%);
}
.loadings>img{
     width: 220px;
     height: 220px;
}
</style>
