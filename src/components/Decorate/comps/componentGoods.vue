<template>
<!-- 组件-商品列表 -->
<div class="componentGoods" :class="'listStyle'+listStyle" :style="{padding:pageMargin+'px'}" v-if="currentComponentData && currentComponentData.data">
    <!-- <van-list v-model="goodListLoading" :finished="goodListFinished" finished-text="没有更多了" @load="goodListLoad" > -->
        <ul>
            <li v-for="(item,key) in goods" :key="key" :style="[goodMargin,goodWidth]" :class="['goodsStyle'+goodsStyle,{goodsChamfer:goodsChamfer!=1},'goodsRatio'+goodsRatio]">
                <div class="img" >
                    <div class="imgAbsolute">
                        <img :src="item.url" alt="" :class="{goodsFill:goodsFill!=1}">
                    </div>
                </div>
                <div class="text" v-if="showContents.length>0">
                    <p class="title" :class="[{textStyle:textStyle!=1},{textAlign:textAlign!=1}]" v-if="showContents.indexOf('1')!=-1">{{item.title}}</p>
                    <p class="fTitle" :class="[{textStyle:textStyle!=1},{textAlign:textAlign!=1}]" v-if="showContents.indexOf('3')!=-1">{{item.desc}}</p>
                    <div class="priceLine" v-if="showContents.indexOf('2')!=-1">
                        <p class="price">￥<font>{{item.price}}</font></p>
                    </div>
                    <componentButton :decorationStyle="buttonStyle" decorationText="加入购物车" v-if="showContents.indexOf('4')!=-1" class="button"></componentButton>
                </div>
            </li>
        </ul>
    <!-- </van-list> -->
</div>
</template>
<script>
import componentButton from './componentButton';
import componentMixin from './mixin';
export default {
    name:"componentGoods",
    mixins:[componentMixin],
    data(){
        return{
            // 样式属性
            listStyle:'',
            pageMargin:'',
            goodsMargin:'',
            goodsStyle:'',
            goodsChamfer:'',
            goodsRatio:'',
            goodsFill:'',
            textStyle:'',
            textAlign:'',
            showContents:'',
            buttonStyle:'',
            showTemplate:'',
            // 商品列表
            goods:[],

            // 自定义
            goodWidth:'',
            goodMargin:'',
            // 上拉加载
            goodListLoading: false,
            goodListFinished: false
        }
    },
    components:{
        componentButton
    },
    created(){
        this.decoration();
    },
    watch: {
      data: {
        handler(newValue) {
          this.decoration();
        },
        deep: true
      }
    },
    methods:{
        decoration(){
            // 样式属性
            if(!this.currentComponentData || !this.currentComponentData.data) {
              return;
            }
            console.log(this.currentComponentData);
            this.listStyle = this.currentComponentData.data.listStyle;
            this.pageMargin = this.currentComponentData.data.pageMargin;
            this.goodsMargin = this.currentComponentData.data.goodsMargin;
            var bodyWidth = 370;
            if(this.listStyle=='1'){
                this.goodMargin = {marginTop:this.goodsMargin + 'px'};
                this.goodWidth = "100%";
            }
            else if(this.listStyle=='2'){
                this.goodMargin = {marginTop:this.goodsMargin + 'px'};
                
                if('showTemplate' in this.currentComponentData.data){
                    this.showTemplate= this.currentComponentData.data.showTemplate;
                    if(this.showTemplate!=1){
                        this.goodWidth = {width:(bodyWidth - this.pageMargin * 2 - this.goodsMargin - 100) / 2 + 'px'}
                    }
                    else{
                        this.goodWidth = {width:(bodyWidth - this.pageMargin * 2 - this.goodsMargin) / 2 + 'px'}
                    }
                }
                else{
                    this.goodWidth = {width:(bodyWidth - this.pageMargin * 2 - this.goodsMargin) / 2 + 'px'}
                }
            }
            else if(this.listStyle=='3'){
                this.goodMargin = {marginTop:this.goodsMargin + 'px',marginLeft:this.goodsMargin + 'px'};
                if('showTemplate' in this.currentComponentData.data){
                    this.showTemplate= this.currentComponentData.data.showTemplate;
                    if(this.showTemplate!=1){
                        this.goodWidth = {width:(bodyWidth - this.pageMargin * 2 - this.goodsMargin*2 - 100) / 3 + 'px'}
                    }
                    else{
                        this.goodWidth = {width:(bodyWidth - this.pageMargin * 2 - this.goodsMargin*2) / 3 + 'px'}
                    }
                }
                else{
                    this.goodWidth = {width:(bodyWidth - this.pageMargin * 2 - this.goodsMargin*2) / 3 + 'px'}
                }
            }
            else if(this.listStyle=='4'){
                this.goodMargin = {marginTop:this.goodsMargin + 'px'};
                this.goodWidth = "100%";
            }
            else if(this.listStyle=='5'){
                this.goodMargin = {marginTop:this.goodsMargin + 'px'};
                var bodyWidth = document.body.clientWidth;
                if('showTemplate' in this.currentComponentData.data){
                    this.showTemplate= this.currentComponentData.data.showTemplate;
                    if(this.showTemplate!=1){
                        this.goodWidth = {width:(bodyWidth - this.pageMargin * 2 - this.goodsMargin - 100) / 2 + 'px'}
                    }
                    else{
                        this.goodWidth = {width:(bodyWidth - this.pageMargin * 2 - this.goodsMargin) / 2 + 'px'}
                    }
                }
                else{
                    this.goodWidth = {width:(bodyWidth - this.pageMargin * 2 - this.goodsMargin) / 2 + 'px'}
                }
            }
            else if(this.listStyle=='6'){
                this.goodMargin = {marginLeft:this.goodsMargin + 'px'};
            }
            this.goodsStyle = this.currentComponentData.data.goodsStyle;
            this.goodsChamfer = this.currentComponentData.data.goodsChamfer;
            this.goodsRatio = this.currentComponentData.data.goodsRatio;
            this.goodsFill = this.currentComponentData.data.goodsFill;
            this.textStyle = this.currentComponentData.data.textStyle;
            this.textAlign = this.currentComponentData.data.textAlign;
            this.showContents = this.currentComponentData.data.showContents; 
            this.buttonStyle = this.currentComponentData.data.buttonStyle;
            // 商品列表
            if(this.currentComponentData.data.goodsGroups.length > 0){
                this.goods = this.currentComponentData.data.goodsGroups[0].goods;
            }
            else{
                this.goods = this.currentComponentData.data.goods;
            }
        },
        goodListLoad() {
        // 异步更新数据
            setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                this.goodList.push(this.goodList.length + 1);
                }
                // 加载状态结束
                this.goodListLoading = false;

                // 数据全部加载完成
                if (this.goodList.length >= 40) {
                    this.goodListFinished = true;
                }
            }, 500);
        }
    }
}
</script>

<style lang="scss" scoped>
// 商品列表
.componentGoods{
    padding:0 10px;
    overflow:hidden;
    ul{
        li{
            .img{
                background:#f6f6f6;
                position:relative;
                .imgAbsolute{
                    position:absolute;
                    top:0;
                    right:0;
                    bottom:0;
                    left:0;
                    @extend .flexCenterMiddle;
                    img{
                        width:100%;
                        height:100%;
                        object-fit: cover;
                    }
                    img.goodsFill{
                        object-fit: contain;
                    }
                }
            }
            .text{
                .title{
                    color:#333;
                }
                .fTitle{
                    color:#7C7C7C;
                }
                .title.textStyle{
                    font-weight:bold;
                }
                .fTitle.textStyle{
                    font-weight:bold;
                }
                .title.textAlign{
                    text-align:center;
                }
                .fTitle.textAlign{
                    text-align:center;
                }
                .priceLine{
                    .price{
                        color:#FC3D42;
                    }
                }
                .button{
                    position:absolute;
                    right:10px;
                    bottom:10px;
                }
            }
        }
        li.goodsStyle1{
            border:0;
            background:#fff;
        }
        li.goodsStyle2{
            background:#fff;
            box-shadow:0px 1px 3px 0px rgba(154,154,154,0.19);
        }
        li.goodsStyle3{
            border:1px solid #eee;
            background:#fff;
        }
        li.goodsStyle4{
            border:0;
            background:none;
        }
        li.goodsChamfer{
            @include borderRadius(8px);
        }
    }
    .van-list__finished-text{
        font-size:12px;
    }
    .van-list__placeholder{
        font-size:12px;
    }
}

.componentGoods.listStyle1{
    ul{
        li{
            overflow:hidden;
            &:first-child{
                margin-top:0 !important;
            }
            .img{
                padding-bottom:100%;
                height:0;
                position:relative;
                overflow:hidden;
            }
            .text{
                overflow:hidden;
                padding:10px;
                position:relative;
                .title{
                    font-size:13px;
                    line-height:16px;
                    height:32px;
                    @include lineClamp(2);
                }
                .fTitle{
                    font-size:12px;
                    line-height:15px;
                    height:15px;
                    margin-top:5px;
                    @extend .ellipsis;
                }
                .priceLine{
                    margin-top:12.5px;
                    overflow:hidden;
                    .price{
                        float:left;
                        font-size:11px;
                        margin-right:12.5px;
                        font{
                            font-size:16px;
                        }
                    }
                }
                .button{
                    right:10px;
                    bottom:10px;
                }
            }
        }  
        li.goodsRatio1{
            .img{
                padding-bottom:66.66%;
            }
        }
        li.goodsRatio2{
            .img{
                padding-bottom:100%;
            }
        }
        li.goodsRatio3{
            .img{
                padding-bottom:133.33%;
            }
        }
        li.goodsRatio4{
            .img{
                padding-bottom:56.25%;
            }
        }
    } 
}

.componentGoods.listStyle2{
    ul{
        display:flex;
        display:-webkit-flex;
        justify-content:space-between;
        flex-wrap:wrap;
        li{
            margin-top:15px;
            width:170px;
            overflow:hidden;
            &:nth-of-type(1){
                margin-top:0 !important;
            }
            &:nth-of-type(2){
                margin-top:0 !important;
            }
            .img{
                position:relative;
                overflow:hidden;
                padding-bottom:100%;
                height:0;
            }
            .text{
                overflow:hidden;
                padding:10px;
                position:relative;
                .title{
                    font-size:13px;
                    line-height:16px;
                    height:32px;
                    @include lineClamp(2);
                }
                .fTitle{
                    font-size:12px;
                    line-height:15px;
                    height:15px;
                    margin-top:5px;
                    @extend .ellipsis;
                }
                .priceLine{
                    margin-top:12.5px;
                    overflow:hidden;
                    .price{
                        float:left;
                        font-size:11px;
                        margin-right:12.5px;
                        font{
                            font-size:16px;
                        }
                    }
                }
                .button{
                    right:10px;
                    bottom:10px;
                }
            }
        }  
        li.goodsRatio1{
            .img{
                padding-bottom:66.66%;
            }
        }
        li.goodsRatio2{
            .img{
                padding-bottom:100%;
            }
        }
        li.goodsRatio3{
            .img{
                padding-bottom:133.33%;
            }
        }
        li.goodsRatio4{
            .img{
                padding-bottom:56.25%;
            }
        }
    } 
}
.componentGoods.listStyle3{
    ul{
        display:flex;
        display:-webkit-flex;
        flex-wrap:wrap;
        li{
            margin-top:15px;
            width:110px;
            overflow:hidden;
            &:nth-of-type(3n+1){
                margin-left:0 !important;
            }
            &:nth-of-type(1){
                margin-top:0 !important;
            }
            &:nth-of-type(2){
                margin-top:0 !important;
            }
            &:nth-of-type(3){
                margin-top:0 !important;
            }
            .img{
                height:0;
                padding-bottom:100%;
                position:relative;
                overflow:hidden;
            }
            .text{
                overflow:hidden;
                padding:10px;
                position:relative;
                .title{
                    font-size:13px;
                    line-height:16px;
                    height:32px;
                    @include lineClamp(2);
                }
                .fTitle{
                    font-size:12px;
                    line-height:15px;
                    height:15px;
                    margin-top:5px;
                    @extend .ellipsis;
                }
                .priceLine{
                    margin-top:12.5px;
                    overflow:hidden;
                    .price{
                        float:left;
                        font-size:11px;
                        margin-right:12.5px;
                        font{
                            font-size:16px;
                        }
                    }
                }
                .button{
                    right:10px;
                    bottom:10px;
                }
            }
        } 
        li.goodsRatio1{
            .img{
                padding-bottom:66.66%;
            }
        }
        li.goodsRatio2{
            .img{
                padding-bottom:100%;
            }
        }
        li.goodsRatio3{
            .img{
                padding-bottom:133.33%;
            }
        }
        li.goodsRatio4{
            .img{
                padding-bottom:56.25%;
            }
        } 
    } 
}
.componentGoods.listStyle4{
    ul{
        li{
            margin-top:15px;
            overflow:hidden;
            position:relative;
            padding:10px 15px;
            &:first-child{
                margin-top:0 !important;
            }
            .img{
                width:36%;
                height:0;
                padding-bottom:36%;
                float:left;
                margin-right:12.5px;
                position:relative;
                @include borderRadius(8px);
                overflow:hidden;
            }
            .text{
                overflow:hidden;
                position:relative;
                height:100%;
                .title{
                    font-size:14px;
                    line-height:17px;
                    height:34px;
                    @include lineClamp(2);
                    margin-top:2.5px;
                }
                .fTitle{
                    font-size:12px;
                    line-height:15px;
                    height:15px;
                    margin-top:8.5px;
                    @extend .ellipsis;
                }
                .priceLine{
                    margin-top:37.5px;
                    overflow:hidden;
                    .price{
                        float:left;
                        font-size:11px;
                        margin-right:13.5px;
                        font{
                            font-size:16px;
                        }
                    }
                }
                .button{
                    right:10px;
                    bottom:0;
                }
            }
        }  
        li.goodsRatio1{
            .img{
                padding-bottom:24%;
            }
            .text{
                .title{
                    height:17px;
                    @include lineClamp(1);
                    margin-top:2.5px;
                }
                .fTitle{
                    margin-top:5px;
                }
                .priceLine{
                    margin-top:10px;
                }
            }
        }
        li.goodsRatio2{
            .img{
                padding-bottom:36%;
            }
            .text{
                .title{
                    height:17px;
                    @include lineClamp(1);
                    margin-top:2.5px;
                }
                .fTitle{
                    margin-top:17px;
                }
                .priceLine{
                    margin-top:30px;
                }
            }
        }
        li.goodsRatio3{
            .img{
                padding-bottom:48%;
            }
            .text{
                .title{
                    height:51px;
                    @include lineClamp(3);
                }
                .fTitle{
                    margin-top:10px;
                }
                .priceLine{
                    margin-top:35px;
                }
            }
        }
        li.goodsRatio4{
            .img{
                padding-bottom:20.25%;
            }
            .text{
                .title{
                    margin-top:0;
                    height:17px;
                    @include lineClamp(1);
                }
                .fTitle{
                    margin-top:4px;
                }
                .priceLine{
                    margin-top:4px;
                }
            }
        }  
    }
}
.componentGoods.listStyle5{
    ul{
        display:flex;
        display:-webkit-flex;
        justify-content:space-between;
        flex-wrap:wrap;
        li{
            &:first-child{
                margin-top:0 !important;
                width:100% !important;
            }
            &:nth-of-type(3n+1){
                overflow:hidden;
                .img{
                    padding-bottom:100%;
                    height:0;
                    position:relative;
                    overflow:hidden;
                }
                .text{
                    overflow:hidden;
                    padding:10px;
                    position:relative;
                    .title{
                        font-size:13px;
                        line-height:16px;
                        height:32px;
                        @include lineClamp(2);
                    }
                    .fTitle{
                        font-size:12px;
                        line-height:15px;
                        height:15px;
                        margin-top:5px;
                        @extend .ellipsis;
                    }
                    .priceLine{
                        margin-top:12.5px;
                        overflow:hidden;
                        .price{
                            float:left;
                            font-size:11px;
                            margin-right:12.5px;
                            font{
                                font-size:16px;
                            }
                        }
                    }
                    .button{
                        right:10px;
                        bottom:10px;
                    }
                }
            }
            &:nth-of-type(3n+2){
                margin-top:15px;
                width:170px;
                overflow:hidden;
                .img{
                    position:relative;
                    overflow:hidden;
                    padding-bottom:100%;
                    height:0;
                }
                .text{
                    overflow:hidden;
                    padding:10px;
                    position:relative;
                    .title{
                        font-size:13px;
                        line-height:16px;
                        height:32px;
                        @include lineClamp(2);
                    }
                    .fTitle{
                        font-size:12px;
                        line-height:15px;
                        height:15px;
                        margin-top:5px;
                        @extend .ellipsis;
                    }
                    .priceLine{
                        margin-top:12.5px;
                        overflow:hidden;
                        .price{
                            float:left;
                            font-size:11px;
                            margin-right:12.5px;
                            font{
                                font-size:16px;
                            }
                        }
                    }
                    .button{
                        right:10px;
                        bottom:10px;
                    }
                }
            }
            &:nth-of-type(3n+3){
                margin-top:15px;
                width:170px;
                overflow:hidden;
                .img{
                    position:relative;
                    overflow:hidden;
                    padding-bottom:100%;
                    height:0;
                }
                .text{
                    overflow:hidden;
                    padding:10px;
                    position:relative;
                    .title{
                        font-size:13px;
                        line-height:16px;
                        height:32px;
                        @include lineClamp(2);
                    }
                    .fTitle{
                        font-size:12px;
                        line-height:15px;
                        height:15px;
                        margin-top:5px;
                        @extend .ellipsis;
                    }
                    .priceLine{
                        margin-top:12.5px;
                        overflow:hidden;
                        .price{
                            float:left;
                            font-size:11px;
                            margin-right:12.5px;
                            font{
                                font-size:16px;
                            }
                        }
                    }
                    .button{
                        right:10px;
                        bottom:10px;
                    }
                }
            }
        }  
        li.goodsRatio1{
            .img{
                padding-bottom:66.66%;
            }
        }
        li.goodsRatio2{
            .img{
                padding-bottom:100%;
            }
        }
        li.goodsRatio3{
            .img{
                padding-bottom:133.33%;
            }
        }
        li.goodsRatio4{
            .img{
                padding-bottom:56.25%;
            }
        }
    } 
}

.componentGoods.listStyle6{
    ul{
        display:flex;
        overflow-x:scroll;
        li{
            flex:0 0 95px;
            overflow:hidden;
            &:first-child{
                margin-left:0 !important;
            }
            .img{
                height:0;
                padding-bottom:100%;
                position:relative;
                overflow:hidden;
            }
            .text{
                overflow:hidden;
                padding:10px;
                position:relative;
                .title{
                    font-size:13px;
                    line-height:16px;
                    height:32px;
                    @include lineClamp(2);
                }
                .fTitle{
                    font-size:12px;
                    line-height:15px;
                    height:15px;
                    margin-top:5px;
                    @extend .ellipsis;
                }
                .priceLine{
                    margin-top:12.5px;
                    overflow:hidden;
                    .price{
                        float:left;
                        font-size:11px;
                        margin-right:12.5px;
                        font{
                            font-size:16px;
                        }
                    }
                }
                .button{
                    right:10px;
                    bottom:10px;
                }
            }
        } 
        li.goodsRatio1{
            .img{
                padding-bottom:66.66%;
            }
        }
        li.goodsRatio2{
            .img{
                padding-bottom:100%;
            }
        }
        li.goodsRatio3{
            .img{
                padding-bottom:133.33%;
            }
        }
        li.goodsRatio4{
            .img{
                padding-bottom:56.25%;
            }
        } 
    } 
}
</style>
