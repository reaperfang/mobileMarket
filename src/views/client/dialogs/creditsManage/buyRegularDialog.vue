<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="购买商品获取积分规则" :hasCancel="hasCancel">
        <div class="c_container">
            <div class="clearfix"><span class="fl marR20">购买商品获取积分规则</span><el-switch class="fl" v-model="enable" active-color="#66CCAC"></el-switch></div>
            <div>购买获得积分，订单确认收货后按规则发放积分</div>
            <div>
                <span>赠送积分的商品：</span>
                <el-radio v-model="radio1" label="0">全部商品</el-radio>
                <el-radio v-model="radio1" label="1">指定商品</el-radio>
            </div>
            <div>
                <span>是否区分人群发放：</span>
                <el-radio v-model="radio2" label="0">不区分</el-radio>
                <el-radio v-model="radio2" label="1">区分</el-radio>
            </div>
            <div>
                <span>每消费</span>
                <div class="input_wrap">
                    <el-input></el-input>
                </div>
                <span>元  获得</span>
                <div class="input_wrap">
                    <el-input></el-input>
                </div>
                <span>积分</span>
            </div>
        </div>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'
export default {
    props: ['data'],
    name: "buyRegularDialog",
    data() {
        return {
            hasCancel: true,
            enable: false,
            radio1: '0',
            radio2: '0'
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
        }
    },
    mounted() {
        
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
.c_container{
    > div{
        text-align: left;
        margin-bottom: 17px;
        .input_wrap{
            width: 80px;
            display: inline-block;
        }
    }
}
</style>


