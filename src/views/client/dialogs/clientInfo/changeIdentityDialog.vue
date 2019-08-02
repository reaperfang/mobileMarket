<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="变更客户身份" :hasCancel="hasCancel">
        <div class="c_container">
            <p class="user_id">用户ID：0001</p>
            <p class="user_id">当前身份：非会员身份</p>
            <div class="s_cont">
                <span>变更为：</span>
                <el-select v-model="identities" style="margin-bottom: 10px">
                    <el-option label="VIP1" value="1"></el-option>
                    <el-option label="VIP2" value="2"></el-option>
                    <el-option label="VIP3" value="3"></el-option>
                </el-select>
            </div>
        </div>
    </DialogBase>
</template>
<script>
import clientApi from '@/api/client';
import DialogBase from '@/components/DialogBase'
export default {
    name: "changeIdentityDialog",
    props: ['data'],
    data() {
        return {
            hasCancel: true,
            identities:""
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
.user_id{
    text-align: left;
    padding: 0 0 21px 15px;
}
.s_cont{
    text-align: left;
    padding-left: 16px;
}
</style>


