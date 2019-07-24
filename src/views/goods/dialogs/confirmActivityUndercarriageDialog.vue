<template>
    <zdialog :visible.sync="visible" @submit="submit" title="立即下架" :hasCancel="hasCancel">
        <i class="el-icon-warning"></i>
        <p class="content-text">{{contentText}}</p>
    </zdialog>
</template>
<script>
import zdialog from '@/components/Dialog'

export default {
    data() {
        return {
            hasCancel: false
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
            return '当前商品正在参与营销活动， 活动有效期内商品不得“下架”。'
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
        zdialog
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


