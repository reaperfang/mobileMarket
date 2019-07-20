<template>
    <el-dialog
        :visible.sync="dialogVisible"
        v-bind="$attrs">
        <slot></slot>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        dialogVisible: {
            get() {
                return this.visible
            },
            set(val) {
                this.$emit('update:visible', val)
            }
        }
    },
    created() {
        alert(this.width)
    },
    props: {
        visible: {
            type: Boolean,
            required: true
        },
    }
}
</script>
<style lang="scss" scoped>

</style>




