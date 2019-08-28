<template>
    <DialogBase class="logistics" :visible.sync="visible" @submit="submit" :title='title' width="714px" :showFooter="showFooter">
        <div class="container">
            <!-- <div class="header">
                <div class="item">时间</div>
                <div class="item">状态</div>
            </div> -->
            <div class="content">
                <el-timeline v-show="data.length" :reverse="reverse">
                    <el-timeline-item
                    v-for="(activity, index) in data"
                    :key="index"
                    :timestamp="activity.AcceptTime">
                    {{activity.AcceptStation}}
                    </el-timeline-item>
                </el-timeline>
                <Empty v-show="!data.length"></Empty>
            </div>
        </div>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'
import Empty from '@/components/Empty'

export default {
    data() {
        return {
            showFooter: false,
            reverse: true,
            activities: []
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
        title() {
            return '提示'
        }
    },
    props: {
        data: {
            type: Array,
            default: []
        },
        dialogVisible: {
            type: Boolean,
            required: true
        },
    },
    components: {
        DialogBase,
        Empty
    }
}
</script>
<style lang="scss" scoped>
   
</style>
<style lang="scss">
    .logistics {
        .dialog-container {
            text-align: left;
        }
        .container {
          display: flex;
          justify-content: center;  
        }
    }
</style>




