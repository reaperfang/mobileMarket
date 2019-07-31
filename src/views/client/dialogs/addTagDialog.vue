<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="加标签" :hasCancel="hasCancel">
        <div class="c_container">
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
}
</style>


