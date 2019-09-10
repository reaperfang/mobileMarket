<template>
    <div class="p_container">
        <div class="clearfix">
          <div class="fr">
            <el-radio-group class="fr" v-model="visitSourceType" @change="all">
              <el-radio-button class="btn_bor" label="0">全部</el-radio-button>
              <el-radio-button class="btn_bor" label="1">小程序</el-radio-button>
              <el-radio-button class="btn_bor" label="2">公众号</el-radio-button>
            </el-radio-group>
          </div>
      </div>
        <div class="pane_container">
            <div class="i_line">
                <div class="input_wrap">
                    <el-select placeholder="排序" v-model="value" @change="changeSelet">
                        <el-option label="全部" value="0"></el-option>
                        <el-option label="订单数" value="1"></el-option>
                        <el-option label="消费金额" value="2"></el-option>
                    </el-select>
                </div>
                <div class="input_wrap">
                    <el-input placeholder="手机号" v-model="keyWords">
                        <el-button slot="append" icon="el-icon-search" @click="changKeyWord(keyWords)"></el-button>
                    </el-input>
                </div>
            </div>
            <mcTable style="margin-top: 50px" :dataObj="dataObj" @getMember="getMemberConsumption"></mcTable>
        </div>
    </div>
</template>
<script>
import mcTable from './components/mcTable'
export default {
    name: 'memberConsumption',
    components: { mcTable },
    data() {
        return {
            value:'',
            visitSourceType:0,
            startIndex:1,
            pageSize:15,
            orderSortType:0,
            keyWords:'',
            dataObj:{
            }
        }
    },
    methods:{
        getMemberConsumption(idx,pages){
            this.startIndex = idx;
            this.pageSize = pages;
            let data = {
                visitSourceType: this.visitSourceType,
                pageSize: this.pageSize,
                orderSortType: this.orderSortType,
                startIndex: this.startIndex,
                keyWords: this.keyWords,
            };
      this._apis.data.memberConsumption(data).then(response => {
           this.dataObj = response;
        }).catch(error => {
          this.$message.error(error);
        });
        },
        all(){
            this.value = '';
            this.keyWords = '';
            this.orderSortType = 0;
            this.getMemberConsumption(1,10)
        },
        changeSelet(val){
            this.startIndex = 1
            this.orderSortType = val
            this.getMemberConsumption()
        },
        changKeyWord(val){
            console.log(val)
            this.getMemberConsumption(1,10)
        }
    },
    created(){
        this.getMemberConsumption(1,10)
    }
}
</script>
<style lang="scss" scoped>
.p_container{
    padding: 20px;
    background-color: #fff;
    .pane_container{
        color: #3D434A;
        .i_line{
            padding-left: 35px;
            .input_wrap{
                width: 320px;
                display: inline-block;
            }
        }
    }
}
</style>

