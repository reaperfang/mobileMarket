<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="立即删除" :hasCancel="hasCancel">
        <i class="el-icon-warning"></i>
        <p class="content-text">{{contentText}}</p>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'

export default {
    data() {
        return {
            
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
    .el-icon-warning {
        font-size: 60px;
        color: rgb(245, 88, 88);
    }
    .content-text {
        font-size: 18px;
        margin-top: 20px;
    }
</style>


