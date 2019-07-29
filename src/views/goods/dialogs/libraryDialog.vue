<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="素材库" width="659px">
        <div style="text-align: left;">
            <ul style="overflow: hidden;">
                <li v-for="(item, index) in items" :key="index">
                    <img src="../../../assets/images/goods/libraryImage.png" alt="">
                    <p>1.jpg</p>
                    <p><span>图片地址</span><span>复制</span></p>
                </li>
            </ul>
            <el-button class="upload">图片上传</el-button>
        </div>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'

export default {
    data() {
        return {
            items: [
                {},{}
            ],
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
    .el-icon-warning {
        font-size: 60px;
        color: rgb(245, 88, 88);
    }
    .content-text {
        font-size: 18px;
        margin-top: 20px;
    }
    ul li {
        float: left;
        margin-right: 18px;
        font-size: 12px;
        p {
            margin: 2px 0;
            color: #92929B;
            span:first-child {
                margin-right: 16px;
            }
            span:last-child {
                color: #655EFF;
            }
        }
    }
    .upload {
        margin-top: 30px;
    }
</style>


