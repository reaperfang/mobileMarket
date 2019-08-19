<template>
    <DialogBase class="receive-information-dialog" :visible.sync="visible" @submit="submit" title="修改收货信息" width="600px" :showFooter="showFooter">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="收货人姓名" prop="receivedName">
                <el-input v-model="ruleForm.receivedName" placeholder="请选择"></el-input>
            </el-form-item>
            <el-form-item label="收货人电话" prop="receivedPhone">
                <el-input v-model="ruleForm.receivedPhone" placeholder="请输入快递单号"></el-input>
            </el-form-item>
            <el-form-item label="收货地址" prop="deliveryAddress">
                <area-cascader type="all" :level="2" :data='$pcaa' v-model='ruleForm.deliveryAddress'></area-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="detailAddress">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="街道、楼牌号等"
                    v-model="ruleForm.receivedDetail">
                </el-input>
            </el-form-item>
            <div class="footer">
                <el-button>取消</el-button>
                <el-button @click="submit('ruleForm')" type="primary">确定</el-button>
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
                receivedName: '',
                receivedPhone: '',
                deliveryAddress: [],
                receivedDetail: '',
                receivedProvinceCode: '',
                receivedProvinceName: '',
                receivedCityCode: '',
                receivedCityName: '',
                receivedAreaCode: '',
                receivedAreaName: '',
            },
            rules: {

            },
            showFooter: false
        }
    },
    created() {
        this.getDetail()
    },
    watch: {
        data: {
            deep: true,
            handler() {
                this.getDetail()
            }
        }
    },
    methods: {
        getDetail() {
            this.ruleForm = Object.assign({}, this.ruleForm, this.data)
        },
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let codes = Object.keys(this.ruleForm.deliveryAddress)

                    this._apis.order.orderUpdateReceive({
                        id: (typeof this.data) == 'string' ?  this.data : (this.$route.query.orderId || this.$route.query.id),
                        //code: this.$route.query.orderId ? this.$route.query.orderId : '',
                        receivedProvinceCode: codes[0],
                        receivedProvinceName: this.ruleForm.deliveryAddress[0][codes[0]],
                        receivedCityCode: codes[1],
                        receivedCityName: this.ruleForm.deliveryAddress[1][codes[1]],
                        receivedAreaCode: codes[2],
                        receivedAreaName: this.ruleForm.deliveryAddress[2][codes[2]],
                        receivedDetail: this.ruleForm.receivedDetail,
                        receivedPhone: this.ruleForm.receivedPhone,
                        receivedName: this.ruleForm.receivedName
                    }).then(res => {
                        this.$emit('submit')
                        this.visible = false
                        this.$notify({
                            title: '成功',
                            message: '修改成功！',
                            type: 'success'
                        });
                    }).catch(error => {
                        this.visible = false
                        this.$notify.error({
                            title: '错误',
                            message: error
                        });
                    }) 
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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


