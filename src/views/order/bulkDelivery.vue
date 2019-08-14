<template>
    <div class="bulk-delivery">
        <div class="title">批量发货</div>
        <div class="container">
            <section>
                <div class="title">1. 选择您要进行发货的商品并填写物流信息</div>
                <div class="goods-item">
                    <div class="item-title">商品清单</div>
                    <div class="item-content">
                        <div class="row">
                            <div class="col"><i class="checkbox"></i></div>
                            <div class="col" style="width: 370px;">商品</div>
                            <div class="col">应发数量</div>
                            <div class="col">本次发货数量</div>
                            <div class="col">收货信息</div>
                            <div class="col">查看物流</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .bulk-delivery {
        background-color: #fff;
        padding: 20px;
        >.title {
            font-size: 16px;
        }
        .container {
            padding-top: 20px;
            padding-left: 60px;
            section {
                .goods-item {
                    margin-top: 20px;
                    border-radius:10px;
                    border:1px solid rgba(211,211,211,1);
                    .item-title {
                        background-color: rgb(243, 244, 244);
                        padding: 20px;
                        border-radius: 10px 10px 0 0;
                    }
                    .item-content {
                        padding: 20px;
                        .checkbox {
                            display: inline-block;
                            width: 20px;
                            height: 20px;
                            background: url(../../assets/images/order/checkbox.png) no-repeat;
                        }
                    }
                }
            }
        }
    }
</style>