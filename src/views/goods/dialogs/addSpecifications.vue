<template>
    <zdialog :visible.sync="visible" title="新增规格" :showFooter="showFooter">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入规格名称"></el-input>
                <el-button @click="plus">添加规格值</el-button>
            </el-form-item>
        </el-form>
        <div class="spec-value">
            <ul>
                <li v-for="(item, index) in items" :key="index">
                    <el-input v-model="item.value" placeholder="请输入规格名称"></el-input>
                    <i @click="reduce(index)" class="icon el-icon-error" size="26px"></i>
                    <i @click="plus" class="icon el-icon-circle-plus"></i>
                </li>
            </ul>
        </div>
        <div style="margin-top: 10px;">
            <el-button @click="submit" type="primary">确认</el-button>
        </div>
    </zdialog>
</template>
<script>
import zdialog from '@/components/DialogBase'

export default {
    data() {
        return {
            showFooter: false,
            ruleForm: {
                name: '',
            },
            rules: {
                name: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
            },
            items: [
                {
                    value: ''
                }
            ]
        }
    },
    methods: {
        submit() {
            this.$emit('submit', this.arr)
            this.visible = false
        },
        handleChange(val) {
            this.arr = val
        },
        reduce(index) {
            this.items.splice(index, 1)
        },
        plus() {
            if(this.items.length == 0) {
                this.items.push({})
            } else {
                this.items.push({})
            }
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
            return '是否将此分类其下的全部商品转移到其他分类中？'
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
        zdialog
    }
}
</script>
<style lang="scss" scoped>
    ul li {
        margin: 10px 0;
        text-align: center;
        .icon {
            font-size: 26px;
        }
        .el-icon-error {
            color: #F55858;
            margin-left: 14px;
            margin-right: 12px;
        }
        .el-icon-circle-plus {
            color: #655EFF;
        }
        display: flex;
        align-items: center;
    }
    /deep/ .el-button.el-button--small {
        color: #fff!important;
    }
    .spec-value {
        margin-left: 108px;
    }
</style>


