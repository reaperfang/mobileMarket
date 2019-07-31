<template>
    <div>
        <p class="u_title">微商城</p>
        <div class="u_item">
            <div class="u_t p1">
                <p>标准版</p>
                <div>立即订购</div>
            </div>
            <div class="u_b">
                <p class="main">标准版功能</p>
                <p>拼团、特全价、支付推广多种营销玩法</p>
                <p>分销裂变，让粉丝替你卖货</p>
                <p>多重有礼，实现精细化会员营销</p>
                <p>全平台数据分析</p>
            </div>
        </div>
        <div class="u_item">
            <div class="u_t p2">
                <p>高级版</p>
                <div>立即订购</div>
            </div>
            <div class="u_b">
                <p class="main">高级版功能</p>
                <p>周期购，一次卖掉一年的货</p>
                <p>渠道追踪，筛选最佳投放地</p>
                <p>积分商城，会员营销再升级</p>
                <p>直播，360度展示商品</p>
            </div>
        </div>
        <div class="u_item">
            <div class="u_t p3">
                <p>豪华版</p>
                <div>立即订购</div>
            </div>
            <div class="u_b">
                <p class="main">豪华版功能</p>
                <p>10个我的报表，多维度对比数据</p>
                <p>20位客服坐席，买家咨询轻松对接</p>
                <p>（功能持续上线中…）</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<style lang="scss" scoped>
.u_title{
    color: #3D434A;
    font-size: 26px;
    margin: 23px 0 42px 458px;
}
.u_item{
    float: left;
    width: 294px;
    height: 469px;
    border-radius: 10px;
    margin-left: 38px;
    background-color: #fff;
    .u_t{
        height: 211px;
        &.p1{
            background: url('../../assets/images/profile/b_1.png') 0 0 no-repeat;
        }
        &.p2{
            background: url('../../assets/images/profile/b_2.png') 0 0 no-repeat;
        }
        &.p3{
            background: url('../../assets/images/profile/b_3.png') 0 0 no-repeat;
        }
        p{
            color: #fff;
            font-size: 28px;
            text-align: center;
            margin-bottom:29px;
            padding-top: 54px;
        }
        div{
            width: 169px;
            height: 44px;
            line-height: 44px;
            border-radius: 22px;
            background:rgba(255,255,255,0.45);
            color: #fff;
            margin: 0 auto;
            text-align: center;
            font-size: 22px;
        }
    }
    .u_b{
        padding: 22px 20px;
        p{
            color: #92929B;
            margin-bottom: 17px;
            &.main{
                color: #3D434A;
            }
        }
    }
}
</style>


