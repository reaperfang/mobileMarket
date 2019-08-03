<template>
    <div class="sensitive-words">
        <div class="title">
            <div class="row">
                <div class="col words-label">敏感词设置</div>
                <div class="col des">说明：设定敏感词后，评论内容包含敏感词相对应的内容时会显示星号“*”代替。</div>
            </div>
        </div>
        <div class="content">
            <section>
                <div class="content-title">
                    <div class="row">
                        <div class="col">自定义敏感词</div>
                        <div @click="currentDialog = 'AddSensitiveWordsDialog'; dialogVisible = true" class="col add">+添加</div>
                    </div>
                </div>
                <div class="content-sensitive">
                    <span v-for="(item, index) in sensitiveList" :key="index">
                        {{item}}, <span @click="deleteSensitive(index)" class="delete">删除</span>
                    </span>
                </div>  
            </section>
            <section>
                <div class="content-title">
                    系统敏感词库
                </div>
                <div class="content-sensitive">
                    <span v-for="(item, index) in systomSensitiveList" :key="index">
                        {{item}},
                    </span>
                </div>  
            </section>
        </div>
        <component :is="currentDialog" :dialogVisible.sync="dialogVisible" @submit="onSubmit"></component>
    </div>
</template>
<script>
import AddSensitiveWordsDialog from '@/views/order/dialogs/addSensitiveWordsDialog'

export default {
    data() {
        return {
            sensitiveList: [
                'zzz',
                'zzzzzz'
            ],
            systomSensitiveList: [
                'zzz',
                'zzzzzz'
            ],
            currentDialog: '',
            dialogVisible: false
        }
    },
    methods: {
        deleteSensitive(index) {
            this.sensitiveList.splice(index, 1)
        },
        onSubmit(words) {
            words = words.replace(/^\s+|\s+$/g, '')
            let wordsArr = words.split(/\s*,\s*/)
            this.sensitiveList = this.sensitiveList.concat(wordsArr)
        }
    },
    components: {
        AddSensitiveWordsDialog
    }
}
</script>
<style lang="scss" scoped>
    .sensitive-words {
        background-color: #fff;
        padding: 20px;
        .title {
            .words-label {
                font-size: 16px;
                margin-right: 20px;
            }
            .des {
                color: #9FA29F;
            }
        }
        .content {
            padding-left: 60px;
            section {
                margin-top: 30px;
                .content-title {
                    font-size: 16px;
                    margin-bottom: 20px;
                    .add {
                        font-size: 14px;
                        margin-left: 20px;
                        color: $globalMainColor;
                        cursor: pointer;
                    }
                }
                .content-sensitive {
                    border:1px solid rgba(202,207,203,1);
                    border-radius:4px;
                    padding: 10px;
                    color: #44434B;
                    min-height: 200px;
                    >span {
                        margin-right: 40px;
                    }
                    .delete {
                        color: $globalMainColor;
                        margin-left: 3px;
                    }
                }
            }
        }
    }
</style>

