<template>
    <zdialog :visible.sync="visible" width="500px" :showFooter="showFooter" title="编辑售卖价">
        <zform class="zform" :ruleForm="ruleForm" :rules="rules" :formItems="formItems" label-width="100px" :data="$data" @submit="submit">
            <template v-slot:name>
                <span style="color: red;">{{ruleForm.name}}</span>
            </template>
        </zform>
    </zdialog>
</template>
<script>
import Zdialog from '@/components/Dialog'
import Zform from '@/components/Form'

export default {
    data() {
        return {
            ruleForm: {
                name: '',
                price: ''
            },
            rules: {
                price: [
                    { required: true, message: '请输入售卖价', trigger: 'blur' },
                ],
            },
            formItems: [
                {
                    label: '商品标题',
                    prop: 'name',
                    type: 'slot'
                },
                {
                    label: '售卖价',
                    prop: 'price',
                    type: 'input'
                },
            ],
            showFooter: false
        }
    },
    created() {
        this.getCurrent()
    },
    watch: {
        data: {
            deep: true,
            handler(val, oldVal) {
                this.getCurrent()
            }
        }
    },
    methods: {
        submit(val) {
            console.log(val)
        },
        getCurrent() {
            this.ruleForm = Object.assign({}, {
                name: this.data.goodsName,
                price: this.data.price
            })
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
        }
    },
    components: {
        Zdialog,
        Zform
    }
}
</script>
<style lang="scss" scoped>
    
</style>


