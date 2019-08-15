<template>
    <DialogBase class="add-sensitive-words" :visible.sync="visible" title="添加敏感词" width="500px" :showFooter="showFooter">
        <div class="content">
            <div class="content-title">请输入需要添加的敏感词，可批量输入，以逗号隔开即可：</div>
            <div class="sensitive-words-box">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入敏感词"
                    v-model="textarea">
                </el-input>
            </div>
            <div class="footer">
                <el-button @click="visible = false; textarea = ''">取 消</el-button>
                <el-button @click="submit" type="primary">确 定</el-button>
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
            textarea: ''
        }
    },
    methods: {
        submit() {
            this.$emit('submit', this.textarea)
            this.textarea = ''
            this.visible = false
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
   .add-sensitive-words {
       .content {
           .content-title {
               font-size: 18px;
           }
           .sensitive-words-box {
               margin-top: 10px;
           }
           .footer {
               text-align: center;
               margin-top: 37px;
           }
       }
   }
   /deep/ .el-textarea__inner {
       min-height: 143px!important;
   }
   /deep/ .el-input--small {
       font-size: 14px;
   }
</style>
<style lang="scss">
    .add-sensitive-words {
        .dialog-container {
            text-align: left;
        }
    }
</style>



