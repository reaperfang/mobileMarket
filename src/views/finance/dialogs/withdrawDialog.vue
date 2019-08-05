/*提现审核 */
<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="提现审核" :hasCancel="hasCancel">
        <div class="c_container">
            <div class="marB20">
                <el-radio v-model="checkRadio" label="1">同意申请</el-radio>
                <el-radio v-model="checkRadio" label="2">拒绝申请</el-radio>
            </div>
            <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入拒绝原因，不超过20个字"
                v-model="textarea">
            </el-input>
        </div>
    </DialogBase>
</template>
<script>
import clientApi from '@/api/client';
import DialogBase from '@/components/DialogBase'
export default {
    name: "withdrawDialog",
    props: ['data'],
    data() {
        return {
            hasCancel: true,
            checkRadio: '1',
            textarea:""
        }
    },
    methods: {
        submit() {
            this.$emit('handleSubmit')
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
    div{
        text-align: left;
    }
}
</style>


