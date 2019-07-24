<template>
    <zdialog :visible.sync="visible" @submit="submit" title="选择规格" :showFooter="showFooter">
        <!-- <ul>
            <li v-for="(item, index) in specData" :key="index">
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </li>
        </ul> -->
    </zdialog>
</template>
<script>
import zdialog from '@/components/Dialog'

export default {
    data() {
        return {
            showFooter: false,
            list: [],
            specData: [
                {
                    label: '颜色',
                    values: ['红色', '黄色']
                },
                {
                    label: '尺寸',
                    values: ['L', 'XL']
                }
            ]
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
    
</style>


