<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="使用的优惠券/优惠码" width="346px" :showFooter="showFooter">
        <div class="coupon-box">
            <div class="coupon">
                <div class="item lefter">
                    <p>{{data.price}}</p>
                    <p>元</p>
                </div>
                <div class="item righter">
                    <p>{{data.detail}}</p>
                    <p class="limit">{{data.limit}}</p>
                </div>
            </div>
            
            <div class="coupon-code">
                <div class="coupon-code-header">优惠码 {{data.code}}</div>
                <div class="coupon">
                    <div class="item lefter">
                        <p>{{data.price}}</p>
                        <p>元</p>
                    </div>
                    <div class="item righter">
                        <p>{{data.detail}}</p>
                        <p class="limit">{{data.limit}}</p>
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
   
</style>


