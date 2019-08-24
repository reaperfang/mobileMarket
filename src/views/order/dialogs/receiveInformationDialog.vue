<template>
    <DialogBase class="receive-information-dialog" :visible.sync="visible" @submit="submit" :title="title" width="600px" :showFooter="showFooter">
        <template v-if="sendGoods == 'send'">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="发货人姓名" prop="receivedName">
                    <el-input v-model="ruleForm.sendName" placeholder="请选择"></el-input>
                </el-form-item>
                <el-form-item label="发货人电话" prop="receivedPhone">
                    <el-input v-model="ruleForm.sendPhone" placeholder="请输入快递单号"></el-input>
                </el-form-item>
                <el-form-item label="发货地址" prop="deliveryAddress">
                    <area-cascader type="all" :level="2" :data='$pcaa' v-model='ruleForm.deliveryAddress'></area-cascader>
                </el-form-item>
                <el-form-item label="详细地址" prop="detailAddress">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="街道、楼牌号等"
                        v-model="ruleForm.sendDetail">
                    </el-input>
                </el-form-item>
                <div class="footer">
                    <el-button>取消</el-button>
                    <el-button @click="submit('ruleForm')" type="primary">确定</el-button>
                </div>
            </el-form>
        </template>
        <template v-else>
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
        </template>
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

                sendName: '',
                sendPhone: '',
                deliveryAddress: [],
                sendDetail: '',
                sendProvinceCode: '',
                sendProvinceName: '',
                sendCityCode: '',
                sendCityName: '',
                sendAreaCode: '',
                sendAreaName: '',
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
            let obj = {}

            if(this.sendGoods == 'received') {
                obj[this.data.receivedProvinceCode] = this.data.receivedProvinceName
                obj[this.data.receivedCityCode] = this.data.receivedCityName
                obj[this.data.receivedAreaCode] = this.data.receivedAreaName
            } else {
                obj[this.data.sendProvinceCode] = this.data.sendProvinceName
                obj[this.data.sendCityCode] = this.data.sendCityName
                obj[this.data.sendAreaCode] = this.data.sendAreaName
            }
            this.ruleForm = Object.assign({}, this.ruleForm, this.data, {deliveryAddress: obj})
        },
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.ruleForm.deliveryAddress)
                    let codes = Object.values(this.ruleForm.deliveryAddress)
                    let codes0 = Object.keys(codes[0])[0]
                    let codes1 = Object.keys(codes[1])[0]
                    let codes2 = Object.keys(codes[2])[0]
                    let name0 = codes[0][codes0]
                    let name1 = codes[1][codes1]
                    let name2 = codes[2][codes2]

                    if(this.sendGoods) {
                        this.$emit('submit', {
                            ProvinceCode: codes0,
                            ProvinceName: name0,
                            CityCode: codes1,
                            CityName: name1,
                            AreaCode: codes2,
                            AreaName: name2,
                            Detail: this.sendGoods == 'send' ? this.ruleForm.sendDetail : this.ruleForm.receivedDetail,
                            Phone: this.sendGoods == 'send' ? this.ruleForm.sendPhone : this.ruleForm.receivedPhone,
                            Name: this.sendGoods == 'send' ? this.ruleForm.sendName : this.ruleForm.receivedName
                        })
                        this.visible = false
                        return
                    }

                    this._apis.order.orderUpdateReceive({
                        id: (typeof this.data) == 'string' ?  this.data : (this.$route.query.orderId || this.$route.query.id),
                        //code: this.$route.query.orderId ? this.$route.query.orderId : '',
                        receivedProvinceCode: codes0,
                        receivedProvinceName: name0,
                        receivedCityCode: codes1,
                        receivedCityName: name1,
                        receivedAreaCode: codes2,
                        receivedAreaName: name2,
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
        sendGoods: {
            type: String
        },
        title: {
            type: String,
            default: '修改收货信息'
        }
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


