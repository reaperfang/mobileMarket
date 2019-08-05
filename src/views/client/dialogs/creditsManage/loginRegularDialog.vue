<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="登录获取积分规则" :hasCancel="hasCancel">
        <div class="c_container">
            <div class="clearfix"><span class="fl marR20">登录获取积分规则</span><el-switch class="fl" v-model="isOpen" active-color="#66CCAC"></el-switch></div>
            <div>每天首次进入小程序或微信公众号获取积分</div>
            <div>
                <span>是否区分人群发放：</span>
                <el-radio v-model="distinguishRadio" label="0">不区分</el-radio>
                <el-radio v-model="distinguishRadio" label="1">区分</el-radio>
            </div>
            <div>
                <div class="input_wrap">
                    <el-input placeholder="请输入整数"></el-input>
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
    name: "loginRegularDialog",
    data() {
        return {
            hasCancel: true,
            isOpen: false,
            distinguishRadio: '0'
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
            width: 172px;
            display: inline-block;
        }
    }
}
</style>


