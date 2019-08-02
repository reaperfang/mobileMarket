<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="批量加标签" :hasCancel="hasCancel">
        <div class="c_container">
            <p class="c_info">当前选中共20个客户，批量添加以下标签：</p>
            <el-checkbox-group
                v-model="checkedItems"
                :max="5">
                <el-checkbox v-for="tag in tagNames" :label="tag" :key="tag">{{tag}}</el-checkbox>
            </el-checkbox-group>
        </div>
    </DialogBase>
</template>
<script>
import clientApi from '@/api/client';
import DialogBase from '@/components/DialogBase'
export default {
    props: ['data'],
    name: "batchAddTagDialog",
    data() {
        return {
            hasCancel: true,
            checkedItems:[]
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
        tagNames() {
            let arr = [];
            clientApi.tagData.map((item) => {
                arr.push(item.tagName)
            })
            return arr;
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
/deep/ .el-checkbox-group{
    text-align: left;
}
/deep/ .el-checkbox{
    margin-bottom: 9px;
}
.c_container{
    padding: 0 30px;
    .c_info{
        text-align: left;
        font-size: 18px;
        margin-bottom: 20px;
    }
}
</style>


