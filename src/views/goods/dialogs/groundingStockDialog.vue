<template>
    <zdialog :visible.sync="visible" @submit="submit" title="批量上架" :hasCancel="hasCancel">
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
            return '当前商品中“XXXXXX”的库存为“0”，无法进行批量上架操作'
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


