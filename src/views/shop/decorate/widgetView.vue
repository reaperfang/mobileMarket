<template>
   <div class="module widget">
      <div class="block" v-for="(item, key) of widgetList" :key="key">
        <div class="widget-title">{{item.title}}</div>
        <div class="widget-list">
          <ul class="tile-list n3">
            <li v-for="(item2, key2) of item.list" :key="key2" @click="selectWidget(item2)">
              <i :class="item2.iconClass"></i>
              <p>{{item2.title}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'widgetView',
  components: {},
  data () {
    return {
      widgetList: {

        //基础组件
        baseWidget: {
          title:'基础组件',
          list: [
            {
              name: 'richEditor',
              iconClass: 'rich-editor',
              title: '富文本'
            },
            {
              name: 'goods',
              iconClass: 'goods',
              title: '商品'
            },
            {
              name: 'goodsGroup',
              iconClass: 'goods-group',
              title: '商品分组'
            },
            {
              name: 'articleAD',
              iconClass: 'article-ad',
              title: '图文广告'
            },
            {
              name: 'cube',
              iconClass: 'cube',
              title: '魔方'
            },
            {
              name: 'articleNav',
              iconClass: 'article-nav',
              title: '图文导航'
            },
            {
              name: 'text',
              iconClass: 'text',
              title: '文本'
            },
            {
              name: 'title',
              iconClass: 'title',
              title: '标题'
            }
          ]
        },

        //营销组件
        saleWidget: {
          title: '营销组件',
          list: [
            {
              name: 'coupon',
              iconClass: 'coupon',
              title: '优惠券'
            },
            {
              name: 'multiPerson',
              iconClass: 'multi-person',
              title: '多人拼团'
            },
            {
              name: 'secondkill',
              iconClass: 'second-kill',
              title: '限时秒杀'
            },
            {
              name: 'discount',
              iconClass: 'discount',
              title: '限时折扣'
            },
            {
              name: 'discountPackage',
              iconClass: 'discountPackage',
              title: '优惠套餐'
            },
            {
              name: 'fullReduction',
              iconClass: 'full-reduction',
              title: '满减满折'
            },
            {
              name: 'nyuan',
              iconClass: 'nyuan',
              title: 'N元N件'
            }
          ]
        },


        //其他组件
        otherWidget: {
          title: '其他组件',
          list: [
            {
              name: 'shopInfo',
              iconClass: 'shop-info',
              title: '店铺信息'
            },
            {
              name: 'enterShop',
              iconClass: 'enter-shop',
              title: '进入店铺'
            },
            {
              name: 'goodsSearch',
              iconClass: 'goods-search',
              title: '商品搜索'
            },
            {
              name: 'notice',
              iconClass: 'notice',
              title: '公告'
            },
            {
              name: 'helpLine',
              iconClass: 'help-line',
              title: '辅助线'
            },
            {
              name: 'video',
              iconClass: 'video',
              title: '视频'
            },
            {
              name: 'helpBlank',
              iconClass: 'help-blank',
              title: '辅助空白'
            },
            {
              name: 'buyNotice',
              iconClass: 'buy-notice',
              title: '购买公告'
            }
          ]
        },

      }
    }
  },
  created() {

  },
  computed: {
    currentComponentName() {
      return this.$store.getters.currentComponentName;
    },
  },
  methods: {
    selectWidget(item) {
      this.$store.dispatch('addComponent', item.name);
      this.$store.commit('setCurrentComponentName', item.name);
    }
  }
}
</script>

<style lang="scss" scoped>
 .module{
    margin-right:20px;
  }
  .block{
    margin-bottom:10px;
    background:#fff;
  }
  .widget{
    width: 220px;
    .widget-title{
      height:40px;
      line-height:22px;
      padding:10px 20px;
      box-sizing: border-box;
      background:rgba(230,228,255,1);
    }
    .widget-list{
      padding:30px 20px;
      ul{
        li{
          display:flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          i{
            width:30px;
            height:30px;
            &{
              background:url('../../../assets/images/shop/editor/fuwenben.png') no-repeat 0 0;
            }
            &.goods{
              background:url('../../../assets/images/shop/editor/shangpin.png') no-repeat 0 0;
            }
            &.goods-group{
              background:url('../../../assets/images/shop/editor/shangpinfenzu.png') no-repeat 0 0;
            }
            &.article-ad{
              background:url('../../../assets/images/shop/editor/tuwenguanggao.png') no-repeat 0 0;
            }
            &.cube{
              background:url('../../../assets/images/shop/editor/mofang.png') no-repeat 0 0;
            }
            &.article-nav{
              background:url('../../../assets/images/shop/editor/tuwendaohang.png') no-repeat 0 0;
            }
            &.text{
              background:url('../../../assets/images/shop/editor/wenben.png') no-repeat 0 0;
            }
            &.title{
              background:url('../../../assets/images/shop/editor/biaoti.png') no-repeat 0 0;
            }

            &.coupon{
              background:url('../../../assets/images/shop/editor/youhuiquanzu.png') no-repeat 0 0;
            }
            &.multi-person{
              background:url('../../../assets/images/shop/editor/duorenpintuan.png') no-repeat 0 0;
            }
            &.second-kill{
              background:url('../../../assets/images/shop/editor/miaoshazu.png') no-repeat 0 0;
            }
            &.discount{
              background:url('../../../assets/images/shop/editor/xianshizhekou.png') no-repeat 0 0;
            }
            &.discount-package{
              background:url('../../../assets/images/shop/editor/youhuitaocan.png') no-repeat 0 0;
            }
            &.full-reduction{
              background:url('../../../assets/images/shop/editor/manjianmanzhe.png') no-repeat 0 0;
            }
            &.nyuan{
              background:url('../../../assets/images/shop/editor/NyuanNjian.png') no-repeat 0 0;
            }

            &.shop-info{
              background:url('../../../assets/images/shop/editor/dianpuxinxi.png') no-repeat 0 0;
            }
            &.enter-shop{
              background:url('../../../assets/images/shop/editor/jinrudianpu.png') no-repeat 0 0;
            }
            &.goods-search{
              background:url('../../../assets/images/shop/editor/shangpinsousuo.png') no-repeat 0 0;
            }
            &.notice{
              background:url('../../../assets/images/shop/editor/gonggao.png') no-repeat 0 0;
            }
            &.help-line{
              background:url('../../../assets/images/shop/editor/fuzhuxian.png') no-repeat 0 0;
            }
            &.video{
              background:url('../../../assets/images/shop/editor/shipin.png') no-repeat 0 0;
            }
            &.help-blank{
              background:url('../../../assets/images/shop/editor/fuzhukongbai.png') no-repeat 0 0;
            }
            &.buy-notice{
              background:url('../../../assets/images/shop/editor/goumaigonggao.png') no-repeat 0 0;
            }
          }
          p{
            color:rgba(58,64,72,1);
            margin-top:10px;
          }
        }
      }
    }
  }
</style>
