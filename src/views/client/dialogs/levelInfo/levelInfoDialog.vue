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
                    <el-switch v-model="info.name" active-color="#66CCAC"></el-switch>
                </span>
            </p>
            <p>
                <span>微信</span>
                <span>
                    <el-switch v-model="info.wechart_sn" active-color="#66CCAC"></el-switch>
                </span>
            </p>
            <p>
                <span>性别</span>
                <span>
                    <el-switch v-model="info.gender" active-color="#66CCAC"></el-switch>
                </span>
            </p>
            <p>
                <span>生日</span>
                <span>
                    <el-switch v-model="info.birthday" active-color="#66CCAC"></el-switch>
                </span>
            </p>
            <p>
                <span>邮箱</span>
                <span>
                    <el-switch v-model="info.email" active-color="#66CCAC"></el-switch>
                </span>
            </p>
            <p>
                <span>地区</span>
                <span>
                    <el-switch v-model="info.area" active-color="#66CCAC"></el-switch>
                </span>
            </p>
            <p>
                <span>爱好</span>
                <span>
                    <el-switch v-model="info.hobby" active-color="#66CCAC"></el-switch>
                </span>
            </p>
        </div>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'
export default {
    name: 'levelInfoDialog',
    props: ['data'],
    data() {
        return {
            hasCancel: true,
            info: {
                name: true,
                wechart_sn: true,
                gender: true,
                birthday: false,
                email: false,
                area: false,
                hobby: false,
                phone: true
            }
        }
    },
    methods: {
        submit() {
            this.$emit('getSelectedInfo', this.info);
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
    },
    mounted() {
        this.info = this.data.info;
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


