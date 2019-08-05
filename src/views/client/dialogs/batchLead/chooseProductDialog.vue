<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="购买商品获取积分规则" :hasCancel="hasCancel">
        <div class="c_container">
           <div>
               <div class="input_wrap">
                   <el-select v-model="coupon" style="margin-bottom: 10px">
                    <el-option label="分类一" value="1"></el-option>
                    <el-option label="分类2" value="2"></el-option>
                    <el-option label="分类3" value="3"></el-option>
                </el-select>
               </div>
                <div class="input_wrap">
                    <el-input placeholder="输入商品标签"></el-input>
                </div>
                <div class="input_wrap2">
                    <el-input placeholder="输入商品名称/商品编号"></el-input>
                </div>
                <el-button type="primary" class="marL10">搜索</el-button>
                <el-button>重置</el-button>
           </div>
           
        </div>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'
export default {
    props: ['data'],
    name: "chooseProductDialog",
    data() {
        return {
            hasCancel: true,
            
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
    > div{
        text-align: left;
        margin-bottom: 17px;
        .input_wrap{
            width: 109px;
            display: inline-block;
        }
        .input_wrap2{
            width: 174px;
            display: inline-block;
        }
    }
}
</style>


