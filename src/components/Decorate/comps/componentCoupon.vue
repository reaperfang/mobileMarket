<template>
  <!-- 优惠券 -->
  <div class="componentCoupon" v-if="currentComponentData && currentComponentData.data">
    <!-- 样式一 -->
    <div class="coupon_first">
      <ul>
        <!-- status:true时候是已领取,hideScrambled:false, -->
        <template  v-for="(item, key) in list">
          <li
            v-if="currentComponentData.data.hideScrambled===false"
            :style="item.status===2?imgs1:imgs "
            :key="key"
            >
            <div class="first_money">
              <span :class="style1">{{item.name}}</span>
              <!-- <span :class="style1">元</span> -->
              <span :class="style1"></span>
            </div>
            <div :class="style2" class="first_present">
              <span v-if="item.useCondition > -1">
                满{{item.useCondition}},减{{item.useTypeFullcut}}
              </span>
              <span v-else>
                减{{item.useTypeFullcut}}
              </span>
            </div>
          </li>
          <li
            v-else-if="item.status=== 0"
            :style="item.status===2?imgs1:imgs "
            :key="key"
            >
            <div class="first_money">
              <span :class="style1">{{item.name}}</span>
              <!-- <span :class="style1">元</span> -->
              <span :class="style1"></span>
            </div>
            <div :class="style2" class="first_present">
              <span v-if="item.useCondition > -1">
                满{{item.useCondition}},减{{item.useTypeFullcut}}
              </span>
              <span v-else>
                减{{item.useTypeFullcut}}
              </span>
            </div>
          </li>
          <!-- <li :style="imgs">
            <div class="first_money">
              <span
                :class="[currentComponentData.data.couponStyle===3?'col_'+currentComponentData.data.couponColor:'',currentComponentData.data.couponColor===3?'col_1':'']"
              >100.01</span>
              <span
                :class="[currentComponentData.data.couponStyle===3?'col_'+currentComponentData.data.couponColor:'',currentComponentData.data.couponColor===3?'col_1':'']"
              >元</span>
            </div>
            <div
              :class="[currentComponentData.data.couponStyle===3?'col_'+currentComponentData.data.couponColor:'',currentComponentData.data.couponColor===3?'col_6':'']"
              class="first_present"
            >无门开使用</div>
          </li>-->
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
import componentMixin from './mixinComps';
export default {
  name: 'componentCoupon',
  mixins:[componentMixin],
  components: {},
  data () {
    return {
      list: []
    }
  },
  created() {
    this.fetch();
  },
  watch: {
    'currentComponentData.data.ids': { 
      handler(newValue) {
          this.fetch && this.fetch();
      },
      deep: true
    }
  },
  computed: {
    style1() {
      // 样式为3的时候，颜色边框是什么就是是什么颜色否则走最外层默认定义的白色字体。同时当颜色为第三种的时候（白底），颜色为红色
      return [
        this.currentComponentData.data.couponStyle === 3 ? "col_" + this.currentComponentData.data.couponColor : "",
        this.currentComponentData.data.couponColor === 3 ? "col_1" : ""
      ];
    },
    style2() {
      // 样式为3的时候，颜色边框是什么就是是什么颜色否则走最外层默认定义的白色字体。同时当颜色为第三种的时候字体为灰色。
      return [
        this.currentComponentData.data.couponStyle === 3 ? "col_" + this.currentComponentData.data.couponColor : "",
        this.currentComponentData.data.couponColor === 3 ? "col_6" : ""
      ];
    },
    imgs() {
      return {
        backgroundImage:
          "url(" +
          require(`@/assets/images/shop/coupon/cou${this.currentComponentData.data.couponStyle}_color${this.currentComponentData.data.couponColor}.png`) +
          ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      }
    },
    imgs1() {
      return {
        backgroundImage:
          "url(" +
          require(`@/assets/images/shop/coupon/cou${this.currentComponentData.data.couponStyle}_color0.png`) +
          ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%"
      }
    }
  },
  methods: {

     //根据ids拉取数据
        fetch() {
          if(this.currentComponentData && this.currentComponentData.data) {
            let params = {};
            if(this.currentComponentData.data.addType == 2) {
              if(this.currentComponentData.data.couponNumberType === 1) {
                params = {
                  couponType: 0
                };
              }else {
                params = {
                  couponType: 0,
                  limitedQuantity: this.currentComponentData.data.showNumber
                };
              }
            }else{
              if(this.currentComponentData.data.ids.length) {
                params = {
                  couponType: 0,
                  ids: this.currentComponentData.data.ids
                };
              }else{
                 params = {
                  couponType: 0
                };
              }
            }

            this.loading = true;
            this._apis.shop.getCouponListByIds(params).then((response)=>{
                this.createList(response);
                this.loading = false;
            }).catch((error)=>{
                this.$notify.error({
                    title: '错误',
                    message: error
                });
                this.loading = false;
            });
          }
        },

         /* 创建数据 */
        createList(datas) {
            this.list = datas;
        },
  }
}
</script>

<style lang="scss" scoped>
.componentCoupon {
  background: #f1f1f1;
  .coupon_first {
    & > ul {
      display: -webkit-box;
      overflow-x: scroll;
      padding: 10px 15px;
      & > li {
        width: 128px;
        height: 92px;
        margin-right: 10px;
        text-align: center;
        & > .first_money {
          padding-top: 17px;
          & > span:first-child {
            font-size: 26px;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
          }
          & > span:last-child {
            font-size: 9px;
			transform: scale(0.75);
            color: rgba(255, 255, 255, 1);
          }
        }
        & > .first_present {
          padding-top: 8px;
          font-size: 10px;
		   transform: scale(0.83);
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }
  .col_1 {
    color: #ff6666 !important;
  }
  .col_2 {
    color: #fd8246 !important;
  }
  .col_3 {
    color: #ff6666 !important;
  }
  .col_4 {
    color: #2c2e30 !important;
  }
  .col_5 {
    color: #8ed99c !important;
  }
  .col_6 {
    color: #d3d3d3 !important;
  }
}
</style>
