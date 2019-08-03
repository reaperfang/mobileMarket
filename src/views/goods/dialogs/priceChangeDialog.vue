<template>
    <DialogBase class="price-change" :visible.sync="visible" @submit="submit" title="一键改价" width="523px">
        <el-form :model="ruleForm" ref="ruleForm" label-width="130px" class="demo-ruleForm">
            <el-form-item label="" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="批量修改价格：" prop="price">
                <el-input v-model="ruleForm.price"></el-input> 元
            </el-form-item>
        </el-form>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'

export default {
    data() {
        return {
            ruleForm: {
                name: '',
                price: '',
            },
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
    /deep/ .el-input {
        width: auto;
    }
</style>
<style lang="scss">
    .price-change {
        .dialog-container {
            text-align: left;
        }
    }
</style>



