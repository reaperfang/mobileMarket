<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="收发货统计" width="714px" :showFooter="showFooter">
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                label="商品"
                width="180">
                <template slot-scope="scope">
                    <div class="goods-detail">
                        <div class="goods-detail-item">
                            <img src="" alt="">
                        </div>
                        <div class="goods-detail-item">
                            <p></p>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="unit"
                label="单位"
                width="180">
            </el-table-column>
            <el-table-column
                prop="quantity"
                label="数量">
            </el-table-column>
            <el-table-column
                prop="deliveried"
                label="已发货">
            </el-table-column>
            <el-table-column
                prop="leftGoods"
                label="剩余待发">
            </el-table-column>
        </el-table>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'

export default {
    data() {
        return {
            showFooter: false,
            tableData: [
                {}
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
   .goods-detail {
       display: flex;
   }
</style>


