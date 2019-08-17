<template>
    <div class="after-sales-state">
        <component :is="current" v-bind="$attrs" v-on="$listeners"></component>
    </div>
</template>
<script>
import AfterSalesState_1 from './afterSalesState_1'
import AfterSalesState_2 from './afterSalesState_2'
import AfterSalesState_3 from './afterSalesState_3'

export default {
    data() {
        return {
            
        }
    },
    computed: {
        current() {
            if(this.$attrs.orderAfterSale && this.$attrs.orderAfterSale.type) {
                if(this.$attrs.orderAfterSale.type == 1) {
                    return 'AfterSalesState_1'
                } else if(this.$attrs.orderAfterSale.type == 2) {
                    return 'AfterSalesState_2'
                } else if(this.$attrs.orderAfterSale.type == 3) {
                    return 'AfterSalesState_3'
                }
            }

            return ''
        }
    },
    created() {
        
    },
    components: {
        AfterSalesState_1,
        AfterSalesState_2,
        AfterSalesState_3
    }
}
</script>
<style lang="scss" scoped>
    .after-sales-state {
        .row .col.lefter {
            padding-right: 50px;
        }
        .row .col.righter {
            text-align: center;
            border-left: 2px solid #CACFCB;
            padding-left: 30px;
            p {
                margin-bottom: 20px;
                &:first-child {
                    font-size: 20px;
                }
                &.des {
                    color: #9FA29F;
                }
            }
        }
    }
</style>