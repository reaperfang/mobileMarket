<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="评价获取积分规则" :hasCancel="hasCancel">
        <div class="c_container">
            <div class="clearfix"><span class="fl marR20">评价获取积分规则</span><el-switch class="fl" v-model="isBuy" active-color="#66CCAC"></el-switch></div>
            <div>评价订单五星好评且满足以下条件可获得积分
                <p>（条件1和条件3可独立启用，条件2需在条件1基础上启用）</p>
            </div>
            <div>
                <span>条件1：    文字满</span>
                <div class="input_wrap">
                    <el-input></el-input>
                </div>
                <span>字  获得</span>
                <div class="input_wrap">
                    <el-input></el-input>
                </div>
                <span>积分&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-checkbox v-model="checked1">区分人群奖励</el-checkbox>
            </div>
            <div>
                <span>条件2：    满</span>
                <div class="input_wrap">
                    <el-input></el-input>
                </div>
                <span>字  额外获得</span>
                <div class="input_wrap">
                    <el-input></el-input>
                </div>
                <span>积分&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-checkbox v-model="checked2">区分人群奖励</el-checkbox>
            </div>
            <div>
                <span>条件3：    图片/视频满</span>
                <div class="input_wrap">
                    <el-input></el-input>
                </div>
                <span>张/条  可获得</span>
                <div class="input_wrap">
                    <el-input></el-input>
                </div>
                <span>积分&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <el-checkbox v-model="checked3">区分人群奖励</el-checkbox>
            </div>
        </div>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'
export default {
    props: ['data'],
    name: "repurchaseRegularDialog",
    data() {
        return {
            hasCancel: true,
            isBuy: false,
            checked1: false,
            checked2: false,
            checked3: false
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


