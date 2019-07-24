<template>
    <zdialog :visible.sync="visible" @submit="submit" title="转移商品">
        <i class="el-icon-warning"></i>
        <p class="content-text">{{contentText}}</p>
    </zdialog>
</template>
<script>
import zdialog from '@/components/Dialog'

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
            return '是否将此分类其下的全部商品转移到其他分类中？'
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


