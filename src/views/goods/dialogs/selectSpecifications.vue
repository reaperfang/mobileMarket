<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="选择规格" :showFooter="showFooter">
        <el-cascader
            :options="data"
            :props="props"
            @change="handleChange"
            clearable>
        </el-cascader>

        <div class="footer">
            <el-button @click="submit" type="primary">确认</el-button>
        </div>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'

export default {
    data() {
        return {
            showFooter: false,
            props: { 
                multiple: true,
                value: 'id',
				label: 'name',
				children: 'list'
            },
            options: [],
            arr: []
        }
    },
    methods: {
        submit() {
            this.$emit('submit', this.arr)
            this.visible = false
        },
        handleChange(val) {
            this.arr = val
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
        DialogBase
    }
}
</script>
<style lang="scss">
    ul li {
        margin: 10px 0;
    }
    /deep/ .el-button.el-button--small {
        color: #fff!important;
    }
    .footer {
        text-align: center;
        margin-top: 10px;
    }
</style>


