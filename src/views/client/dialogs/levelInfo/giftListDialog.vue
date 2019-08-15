<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="选择赠品" :hasCancel="hasCancel">
        <div class="table_container">
            <div class="fr">
                <div class="input_wrap">
                    <el-input placeholder="赠品编号/名称" v-model="key"></el-input>
                </div>
                <el-button type="primary">搜索</el-button>
            </div>
            <div>
                
            </div>
        </div>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'

export default {
    name: 'levelInfoDialog',
    data() {
        return {
            hasCancel: true,
            key:""
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
.table_container{
    width: 100%;
    margin: 0 auto;
    .input_wrap{
        display: inline-block;
        width: 230px;
    }
}
</style>


