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
                    <p class="p_title">商品总况：</p>
                    <div class="p_blocks">
                        <div class="p_item" v-for="item in Condition" :key="item.id" >
                            <img :src="item.url" alt="" class="fl">
                            <div class="fr">
                                <p>{{item.text}}</p>
                                <p :style="{color: item.color}">{{item.num}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="title_line clearfix">
                        <p class="fl" style="font-size: 16px">热销TOP5商品榜单：</p>
                    </div>
                    <ct1Table  :hotData="hotData"></ct1Table>
                    <div class="c_line">
                        <span class="c_title">商品详情</span>
                        <span class="c_label">筛选日期：</span>
                         <el-radio-group v-model="dateType" @change="changeDayM">
                            <el-radio-button class="btn_bor" label="1">最近7天</el-radio-button>
                            <el-radio-button class="btn_bor" label="2">最近15天</el-radio-button>
                            <el-radio-button class="btn_bor" label="3">最近30天</el-radio-button>
                            <el-radio-button class="btn_bor" label="4">自定义</el-radio-button>
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
                    <ct2Table style="margin-top: 26px" :listObj="listObj" @getProductDetails="getProductDetails"></ct2Table>
                </div>
    </div>
</template>
<script>
import datumCont from '@/system/constant/datum';
import ct1Table from './components/ct1Table'
import ct2Table from './components/ct2Table'
export default {
    name: 'commodityTransaction',
    components: { ct1Table, ct2Table },
    data() {
        return {
            activeName: "first", 
            value:'',
            range: "",
            visitSourceType:0,
            dateType:1,
            queryTime:'',
            startTime:'',
            endTime:'',
            startIndex:1,
            pageSize:10,
            dataObj:{},
            Condition:[],
            hotData:[],
            listObj:{}
        }
    },
    computed: {},
    methods:{
        //获取商品总况
        getGeneralCondition(){
            let data ={
                visitSourceType:this.visitSourceType
            }
            this._apis.data.generalCondition(data).then(response => {
                let nums = response.shopGoodsSurveyView;
                datumCont.goodsTotleData.forEach(e => {
                    switch (e.id){
                        case '001': e.num = nums.saleGoodsTotal
                         break;
                        case '002': e.num = nums.visitGoodsTotal
                         break;
                        case '003': e.num = nums.addPurchasesTotal
                         break;
                        case '004': e.num = nums.submitOrderTotal
                         break;
                        case '005': e.num = nums.rightsGoodsTotal
                         break;
                        case '006': e.num = nums.goodsSoldOutTotal
                         break;
                        case '007': e.num = nums.payGoodsTotal
                         break;
                        case '008': e.num = nums.againBuyGoodsTotal
                         break;
                    }                        
                    this.Condition = datumCont.goodsTotleData
                });
        }).catch(error => {
          this.$message.error(error);
        });
        },
        // 获取热销商品
        getHotGoods(){
            let data ={
                visitSourceType:this.visitSourceType
            }
            this._apis.data.hotGoods(data).then(response => {
                this.hotData = response.shopHotSellGoodsList
        }).catch(error => {
          this.$message.error(error);
        });
        },
        // 获取商品详情
        getProductDetails(idx,pages){
            this.startIndex = idx;
            this.pageSize = pages;
            let data ={
                visitSourceType:this.visitSourceType,
                dateType:this.dateType,
                // queryTime:this.queryTime,
                startTime:this.startTime,
                endTime:this.endTime,
                pageSize:this.pageSize,
                startIndex:this.startIndex
            }
            this._apis.data.productDetails(data).then(response => {
                this.listObj = response
        }).catch(error => {
          this.$message.error(error);
        });
        },
        changeDayM(val){
            if(val != 4){
                this.getProductDetails(1,10)
            }
        },
        changeTime(val){
            this.startTime = val[0];
            this.endTime = val[1];
            this.getProductDetails(1,10)
        },
        all(){
            this.getGeneralCondition()
            this.getHotGoods()
            this.getProductDetails(1,10)
        }
    },
    created(){
        this.getGeneralCondition()
        this.getHotGoods()
        this.getProductDetails(1,10)
    }
}
</script>
<style lang="scss" scoped>
.p_container{
    padding: 20px;
    background-color: #fff;
    .pane_container{
        color: #3D434A;
        padding: 23px 38px;
        .p_title{
            font-size: 16px;
        }
        .p_blocks{
            width: 900px;
            display: flex;
            flex-wrap: wrap;
            margin-top: 15px;
        }
        .title_line{
            height: 86px;
            line-height: 86px;
            margin: 5px 0;
        }
        .p_item{
            width: 176px;
            height: 86px;
            border: 1px solid #CCCCCC;
            margin: 0 34px 12px 0;
            border-radius:4px;
            img{
                margin: 19px 0 0 8px;
            }
            div{
                width: 105px;
                margin:19px 6px 0 0;
                p{
                    text-align: center;
                    &:last-child{
                        font-size: 22px;
                        margin-top: 8px;
                    }
                }
            }
        }
        .c_line{
            padding-top: 30px;
            border-top: 1px dashed #D3D3D3;
            .input_wrap{
                width: 220px;
                display: inline-block;
            }
            span{
                color: #655EFF;
                margin-left: 20px;
                &.c_title{
                    font-weight: bold;
                    color: #474C53;
                }
                &.c_label{
                    margin-left: 300px;
                    color: #474C53;
                }
            }
        }
    }
}
</style>

