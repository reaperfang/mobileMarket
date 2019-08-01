<template>
    <div class="p_container">
        <el-tabs v-model="activeName">
            <el-tab-pane label="全部" name="first">
                <div class="pane_container">
                    <p class="p_title">商品总况：</p>
                    <div class="p_blocks">
                        <div class="p_item" v-for="item in goodsTotleData" :key="item.id" >
                            <img :src="item.url" alt="" class="fl">
                            <div class="fr">
                                <p>{{item.text}}</p>
                                <p :style="{color: item.color}">43</p>
                            </div>
                        </div>
                    </div>
                    <div class="title_line clearfix">
                        <p class="fl" style="font-size: 16px">热销TOP5商品榜单：</p>
                        <div class="p_item fr" style="background:rgba(101,94,255,0.5);">
                            <img src="../../assets/images/datum/c_08.png" alt="" class="fl">
                            <div class="fr">
                                <p style="line-height: 20px; color: #fff">复购商品数</p>
                                <p style="line-height: 20px; color: #fff">43</p>
                            </div>
                        </div>
                    </div>
                    <ct1Table></ct1Table>
                    <div class="c_line">
                        <span class="c_title">商品详情</span>
                        <span class="c_label">筛选日期：</span>
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
                    <ct2Table style="margin-top: 26px"></ct2Table>
                </div>
            </el-tab-pane>
            <el-tab-pane label="公众号" name="second">公众号</el-tab-pane>
            <el-tab-pane label="小程序" name="third">角色管理</el-tab-pane>
        </el-tabs>
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
            range: ""
        }
    },
    computed: {
        goodsTotleData() {
            return datumCont.goodsTotleData;
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

