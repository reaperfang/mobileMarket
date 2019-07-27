<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="选择需要完善的信息" :hasCancel="hasCancel">
        <div class="table_container">
            <p class="head">
                <span>信息</span>
                <span>选择</span>
            </p>
            <p>
                <span>绑定手机号</span>
                <span>是</span>
            </p>
            <p>
                <span>姓名</span>
                <span>
                    <el-switch v-model="name" active-color="#66CCAC"></el-switch>
                </span>
            </p>
            <p>
                <span>性别</span>
                <span>
                    <el-switch v-model="sex" active-color="#66CCAC"></el-switch>
                </span>
            </p>
            <p>
                <span>性别</span>
                <span>
                    <el-switch v-model="sex" active-color="#66CCAC"></el-switch>
                </span>
            </p>
            <p>
                <span>生日</span>
                <span>
                    <el-switch v-model="sex" active-color="#66CCAC"></el-switch>
                </span>
            </p>
            <p>
                <span>邮箱</span>
                <span>
                    <el-switch v-model="sex" active-color="#66CCAC"></el-switch>
                </span>
            </p>
            <p>
                <span>地区</span>
                <span>
                    <el-switch v-model="sex" active-color="#66CCAC"></el-switch>
                </span>
            </p>
            <p>
                <span>爱好</span>
                <span>
                    <el-switch v-model="sex" active-color="#66CCAC"></el-switch>
                </span>
            </p>
        </div>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'

export default {
    data() {
        return {
            hasCancel: true,
            name: true,
            sex: true,

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
    width: 277px;
    margin: 0 auto;
    p{
        width: 277px;
        height: 46px;
        overflow: hidden;
        border-bottom: 1px solid #CACFCB;
        &.head{
            background:rgba(101,94,255,0.1);
        }
        span{
            text-align: center;
            line-height: 46px;
            display: inline-block;
            &:first-child{
                width: 116px;
                border-right: 1px solid #D5D9D5;
                float: left;
            }
            &:last-child{
                width: 160px;
            }
        }
    }
}
</style>


