<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="解除黑名单" :hasCancel="hasCancel">
        <div class="c_container">
            <p>ID:<span>{{ data.memberSn }}</span></p>
            <p>当前冻结：</p>
            <div class="clearfix" v-for="item in disableItemValue" :key="item.id">
                <p class="fl">{{item.blackInfoName}}</p>
                <div class="fl">
                    <span class="d_span" v-for="(i, index) in item.disableItemText" :key="index">{{ i }}</span>
                </div>
            </div>
            <p class="red">确定将该客户冻结权限全部解冻吗？</p>
        </div>
    </DialogBase>
</template>
<script>
import clientApi from '@/api/client';
import DialogBase from '@/components/DialogBase'
export default {
    name: 'removeBlackDialog',
    props: ['data'],
    data() {
        return {
            hasCancel: true,
            disableItemValue: []
        }
    },
    methods: {
        submit() {
            this._apis.client.removeFromBlack({memberInfoId: this.data.id}).then((response) => {
                this.$notify({
                    title: '成功',
                    message: "解除黑名单成功",
                    type: 'success'
                });
                this.$emit('refreshPage');
            }).catch((error) => {
                console.log(error);
            })
        },
        getFreezeList() {
            this._apis.client.getFreezeList({memberInfoId: this.data.id}).then((response) => {
                response.map((v) => {
                    v.disableItemValue = v.disableItemValue.split(',');
                    v.disableItemText = [];
                    v.disableItemValue.map((item) => {
                        if(item.split(':')[1]) {
                            v.disableItemText.push(item.split(':')[1])
                        }
                    });
                });
                this.disableItemValue = [].concat(response);
            }).catch((error) => {
                console.log(error);
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
        }
    },
    mounted() {
        this.getFreezeList();
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
.c_container{
    p{
        text-align: left;
        margin: 0 20px 20px 0;
        &.red{
            text-align: center;
            color: #F55858;
            margin: 20px 0 5px 0;
        }
    }
    .d_span{
        margin-right: 20px;
    }
}
</style>


