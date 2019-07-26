<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="设置领取条件" :hasCancel="hasCancel">
        <div class="c_container">
            <div class="c_line">
                <el-radio v-model="radio1" label="1">消费金额满：</el-radio>
                <div class="input_wrap">
                    <el-input placeholder="请输入数字"></el-input>
                </div>
                <span>元</span>
            </div>
            <div class="c_line">
                <el-radio v-model="radio1" label="2">消费次数满：</el-radio>
                <div class="input_wrap">
                    <el-input placeholder="请输入数字"></el-input>
                </div>
                <span>元</span>
            </div>
            <div class="c_line">
                <el-radio v-model="radio1" label="3">获得积分满：</el-radio>
                <div class="input_wrap">
                    <el-input placeholder="请输入数字"></el-input>
                </div>
                <span>元</span>
            </div>
        </div>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'

export default {
    data() {
        return {
            hasCancel: true,
            radio1: "1"

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
/deep/ .el-radio{
    margin-right: 0;
}
.c_container{
    width: 350px;
    .c_line{
        margin-bottom: 10px;
        .input_wrap{
            width: 100px;
            display: inline-block;
        }
    }
}

</style>


