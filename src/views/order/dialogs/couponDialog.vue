<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="使用的优惠券/优惠码" width="346px" :showFooter="showFooter">
        <div class="coupon-box">
            <div class="coupon" v-for="(item, index) in data.usedCouponList" :key="index">
                <div class="item lefter">
                    <p>{{item.couponMoney}}</p>
                    <p>元</p>
                </div>
                <div class="item righter">
                    <p>{{item.couponName}}</p>
                    <p class="limit">使用时限:{{item.createTime.split(' ')[0]}}</p>
                </div>
            </div>
            
            <div class="coupon-code" v-for="(item, index) in data.usedPromotionList" :key="index">
                <div class="coupon-code-header">优惠码 {{item.promotionCodeId}}</div>
                <div class="coupon">
                    <div class="item lefter">
                        <p>{{item.promotionCodeMoney}}</p>
                        <p>元</p>
                    </div>
                    <div class="item righter">
                        <p>{{item.promotionCodeName}}</p>
                        <p class="limit">使用时限:{{item.createTime.split(' ')[0]}}</p>
                    </div>
                </div>
            </div>
        </div>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'

export default {
    data() {
        return {
            showFooter: false,

        }
    },
    methods: {
        submit() {
            
        }
    },
    computed: {
        visible: {
            get() {
                return this.dialogVisible
            },
            set(val) {
                this.$emit('update:dialogVisible', val)
            }
        },
        contentText() {
            return '是否确认删除？'
        }
    },
    props: {
        data: {

        },
        dialogVisible: {
            type: Boolean,
            required: true
        },
    },
    components: {
        DialogBase
    }
}
</script>
<style lang="scss" scoped>
   .coupon-box .coupon .item  {
       .lefter {
           flex-shrink: 0;
            width: 76px;
       }
       .righter {
           flex: 1;
       }
       p {
           margin-bottom: 5px;
       }
   }
   .coupon-box .coupon-code .item  {
       .lefter {
           flex-shrink: 0;
            width: 76px;
       }
       .righter {
           flex: 1;
       }
       p {
           margin-bottom: 5px;
       }
   }
</style>


