<template>
    <DialogBase :visible.sync="visible" @submit="submit" title="变更会员卡" :hasCancel="hasCancel" :showFooter="false">
        <div class="c_container">
            <p class="user_id">用户ID：{{data.memberSn}}</p>
            <p class="user_id">当前会员卡等级：{{data.level}}</p>
            <div class="s_cont">
                <span>变更会员卡：</span>
                <el-select v-model="selectLevel" style="margin-bottom: 10px" @change="handleChange">
                    <el-option v-for="item in levelList" :label="item.alias" :value="item.id" :key="item.id"></el-option>
                </el-select>
            </div>
        </div>
        <div>
            <span slot="footer" class="dialog-footer fcc">
                <el-button type="primary" @click="submit" :loading="btnLoading">确 认</el-button>
                <el-button v-if="hasCancel" @click="visible = false">取 消</el-button>
            </span>
        </div>
    </DialogBase>
</template>
<script>
import clientApi from '@/api/client';
import DialogBase from '@/components/DialogBase'
export default {
    name: "changeCardDialog",
    props: ['data'],
    data() {
        return {
            hasCancel: true,
            selectLevel:"",
            levelList: [],
            canSubmit: true,
            btnLoading: false
        }
    },
    methods: {
        submit() {
            this.btnLoading = true;
            if(this.canSubmit) {
                if(this.selectLevel.length > 0 ) {
                    let levelInfoId, levelInfoName;
                    this.levelList.map((v) => {
                        if(v.id == this.selectLevel) {
                            levelInfoId = v.id;
                            levelInfoName = v.name;
                        }
                    });
                    let params = {memberInfoId: this.data.id, cardLevelInfoId: levelInfoId, name: levelInfoName};
                    this._apis.client.cardChange(params).then((response) => {
                        this.btnLoading = false;
                        this.$emit('refreshPage');
                        this.visible = false;
                        this.$notify({
                            title: '成功',
                            message: "变更会员成功",
                            type: 'success'
                        });
                    }).catch((error) => {
                        this.btnLoading = false;
                        this.visible = false;
                        console.log(error);
                    })
                }else{
                    this.btnLoading = false;
                    this.$notify({
                        title: '警告',
                        message: '请选择用户等级',
                        type: 'warning'
                    });
                }
            }
        },
        getLevelList() {
            this._apis.client.getCardList({}).then((response) => {
                let list = response.list.filter((v) => {
                    return v.enable == 0
                })
                this.levelList = [].concat(list);
            }).catch((error) => {
                console.log(error);
            })
        },
        handleChange() {
            this.levelList.map((v) => {
                if(v.id == this.selectLevel) {
                    if(v.level <= this.data.oldLevel) {
                        this.$notify({
                            title: '警告',
                            message: '只能选择高于现在等级的会员卡',
                            type: 'warning'
                        });
                        this.canSubmit = false;
                    }else{
                        this.canSubmit = true;
                    }
                }
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
        this.getLevelList();
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
.user_id{
    text-align: left;
    padding: 0 0 21px 15px;
}
.s_cont{
    text-align: left;
    padding-left: 16px;
}
.dialog-footer{
    margin-top: 20px;
}
</style>


