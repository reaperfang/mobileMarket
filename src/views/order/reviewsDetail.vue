<template>
    <div class="reviews-detail">
        <section class="customer-reviews">
            <div class="title">
                <div class="row justify-between">
                    <div class="clo">客户评价</div>
                    <div class="clo">
                        <el-button>返 回</el-button>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="row justify-between">
                    <div class="clo reviews-lefter">
                        <div class="row">
                            <div class="col reviews-label">商品信息</div>
                            <div class="col">
                                <div class="row align-center">
                                    <div class="col reviews-image"><img :src="customerReviews.url" alt=""></div>
                                    <div class="col">
                                        <div class="goods-name">
                                            <p>{{customerReviews.goodsName}}</p>
                                            <p>{{customerReviews.spec}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col reviews-label">评论等级</div>
                            <div class="col">
                                <el-rate :colors="colors" v-model="customerReviews.level"></el-rate>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col reviews-label">评价内容</div>
                            <div class="col gray reviews-content">
                                <p>{{customerReviews.reviewsContent}}</p>
                                <div class="row">
                                    <div class="col">
                                        <img :src="item.url" alt="" v-for="(item, index) in customerReviews.reviewsImages" :key="index">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clo reviews-righter">
                        <div class="row">
                            <div class="col reviews-label">订单编号</div>
                            <div class="col gray">{{customerReviews.orderNumber}}</div>
                        </div>
                        <div class="row">
                            <div class="col reviews-label">客户ID</div>
                            <div class="col gray">{{customerReviews.customerId}}</div>
                        </div>
                        <div class="row">
                            <div class="col reviews-label">评价时间</div>
                            <div class="col gray">{{customerReviews.reviewsTime}}</div>
                        </div>
                        <div class="row">
                            <div class="col reviews-label">评论获得积分</div>
                            <div class="col gray">{{customerReviews.integral}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="replay">
            <div class="title">
                <div class="row">
                    <div class="col replay-label">商户回复</div>
                    <div @click="showReplayBox = true" class="col">我要回复评论</div>
                </div>
            </div>
            <div v-if="showReplayBox" class="replay-box">
                <RichEditor @editorValueUpdate="editorValueUpdate" :myConfig="myConfig"></RichEditor>
                <div class="footer">
                    <el-button @click="showReplayBox = fase; textarea = ''">取 消</el-button>
                    <el-button @click="showReplayBox = fase" type="primary">确 定</el-button>
                </div>
            </div>
        </section>
        <section class="record">
            <div class="title">操作记录</div>
            <div class="table-box">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    :header-cell-style="{background:'#ebeafa', color:'#655EFF'}">
                    <el-table-column
                        prop="operate"
                        label="操作"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="operater"
                        label="操作人"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="operateTime"
                        label="操作时间">
                    </el-table-column>
                </el-table>
            </div>
        </section>
    </div>
</template>
<script>
import RichEditor from '@/components/RichEditor';

export default {
    data() {
        return {
            colors: ['#655EFF', '#655EFF', '#655EFF'],
            customerReviews: {
                url: require('../../assets/images/order/apple.png'),
                goodsName: '商品名称',
                spec: '属性1',
                level: 4,
                reviewsContent: '声音小',
                reviewsImages: [
                    {
                        url: require('../../assets/images/order/reviewsImages.png')
                    },
                    {
                        url: require('../../assets/images/order/reviewsImages.png')
                    },
                ],
                orderNumber: 1,
                customerId: 1,
                reviewsTime: '2019',
                integral: '2019'
            },
            textarea: '',
            tableData: [
                {}
            ],
            showReplayBox: false,
            myConfig: {
                // 编辑器不自动被内容撑高
                autoHeightEnabled: false,
                // 初始容器高度
                initialFrameHeight: 400,
                // 初始容器宽度
                initialFrameWidth: 500,
                // 上传文件接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                serverUrl: 'http://35.201.165.105:8000/controller.php',
                // UEditor 资源文件的存放路径，如果你使用的是 vue-cli 生成的项目，通常不需要设置该选项，vue-ueditor-wrap 会自动处理常见的情况，如果需要特殊配置，参考下方的常见问题2
                UEDITOR_HOME_URL: '/static/UEditor/'
            }
        }
    },
    methods: {
        editorValueUpdate(value) {
            this.textarea = value;
        }
    },
    components: {
        RichEditor
    }
}
</script>
<style lang="scss" scoped>
.reviews-detail {
    .gray {
        color: #9FA29F;
    }
    color: #333333;
    section {
        background-color: #fff;
        padding: 20px;
        margin-bottom: 20px;
        &.customer-reviews {
            .title {
                font-size: 16px;
            }
            .content {
               margin-top: 20px; 
               .reviews-label {
                    margin-right: 20px;
                }
               .reviews-lefter {
                   >.row {
                       margin-bottom: 10px;
                   }
                   .reviews-image {
                       margin-right: 10px;
                   }
                   .goods-name {
                       p {
                           margin-bottom: 10px;
                       }
                       p:last-child {
                           color: #9FA29F;
                       }
                   }
                   .reviews-content {
                       p {
                           margin-bottom: 20px;
                       }
                       img {
                           margin-right: 10px;
                       }
                   }
               }
               .reviews-righter {
                   border-left: 1px solid #CACFCB;
                   padding: 10px 20px;
                   .reviews-label {
                       width: 84px;
                   }

               }
            }
        }
        &.replay {
            .title {
                font-size: 16px;
                margin-bottom: 30px;
                .replay-label {
                    margin-right: 20px;
                }
                .col:last-child {
                    color: $globalMainColor;
                }
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                width: 500px;
            }
        }
        &.record {
            .title {
                font-size: 16px;
                margin-bottom: 20px;
            }
        }
    }
}
/deep/ .el-textarea__inner {
    min-height: 167px!important;
}
</style>


