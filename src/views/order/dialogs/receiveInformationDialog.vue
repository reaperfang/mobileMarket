<template>
    <DialogBase class="receive-information-dialog" :visible.sync="visible" @submit="submit" title="修改收货信息" width="600px" :showFooter="showFooter">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="发货人姓名" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请选择"></el-input>
            </el-form-item>
            <el-form-item label="发货人电话" prop="mobile">
                <el-input v-model="ruleForm.name" placeholder="请输入快递单号"></el-input>
            </el-form-item>
            <el-form-item label="发货地址" prop="deliveryAddress">
                <area-cascader :level="2" :data='$pcaa' v-model='ruleForm.deliveryAddress'></area-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="detailAddress">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="街道、楼牌号等"
                    v-model="ruleForm.detailAddress">
                </el-input>
            </el-form-item>
            <div class="footer">
                <el-button>关闭订单</el-button>
                <el-button type="primary">发 货</el-button>
            </div>
        </el-form>
    </DialogBase>
</template>
<script>
import DialogBase from '@/components/DialogBase'

export default {
    data() {
        return {
            ruleForm: {
                name: '',
                mobile: '',
                deliveryAddress: [],
                detailAddress: ''
            },
            rules: {

            },
            showFooter: false
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
    /deep/.el-input {
        width: 100%;
    }
    /deep/ .receive-information-dialog .area-select.large {
        width: 100%;
    }
</style>
<style lang="scss">
    .receive-information-dialog {
        .dialog-container {
            text-align: left;
        }
        /deep/ .area-select .area-selected-trigger {
            padding: 0;
            padding-left: 5px;
        }
        /deep/ .area-select.large {
            width: 100%;
        }
        .footer {
            text-align: center;
        }
    }
</style>


