<template>
    <DialogBase class="logistics" :visible.sync="visible" @submit="submit" :title='title' width="714px" :showFooter="showFooter">
        <div class="container">
            <!-- <div class="header">
                <div class="item">时间</div>
                <div class="item">状态</div>
            </div> -->
            <div class="content">
                <el-timeline>
                    <el-timeline-item
                    v-for="(activity, index) in activities"
                    :key="index"
                    :icon="activity.icon"
                    :type="activity.type"
                    :color="activity.color"
                    :size="activity.size"
                    :timestamp="activity.timestamp">
                    {{activity.content}}
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'

export default {
    data() {
        return {
            showFooter: false,
            activities: [{
                content: '支持使用图标',
                timestamp: '2018-04-12 20:46',
                size: 'large',
                type: 'primary',
                icon: 'el-icon-more'
                }, {
                content: '支持自定义颜色',
                timestamp: '2018-04-03 20:46',
                color: '#0bbd87'
                }, {
                content: '支持自定义尺寸',
                timestamp: '2018-04-03 20:46',
                size: 'large'
                }, {
                content: '默认样式的节点',
                timestamp: '2018-04-03 20:46'
            }]
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




