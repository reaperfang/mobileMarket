<template>
    <div>
        <el-dialog
        title=""
        :visible.sync="showShopsDialog"
        width="40%"
        :before-close="handleClose"
        style="margin-top:20vh;">
        <span slot="title" class="dialog_title">
            <a>返回官网</a> | <a>选择店铺</a>
        </span>
        <div class="content">
            <div class="content_top">
            <el-input placeholder="请输入店铺名称" v-model="shopName" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" class="search"></el-button>
            </el-input>
            <el-button>创建店铺</el-button>
            </div>
            <div class="content_main">
            <div>
                <span>好利来海淀黄庄店</span>
                <span>移动商城</span>
            </div>
            <div>
                <span>好利来海淀黄庄店</span>
                <span>移动商城</span>
            </div>
            <div>
                <span>好利来海淀黄庄店</span>
                <span>移动商城</span>
            </div>
            </div>
        </div>
        </el-dialog>
    </div>
</template>

<script>
import DialogBase from "@/components/DialogBase";
export default {
  name: 'shopsDialog',
  data() {
      return {
          shopName:'',
          showDialog:false
      }
  },
  props:['showShopsDialog'],
  watch: {
      showShopsDialog(newValue,oldValue){
          this.showDialog = newValue
      }
  },
  created() {},
  methods: {
    handleClose(){
        this.showDialog = false
        this.$emit('handleClose')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.content{
  .content_top{
    display: flex;
    justify-content: space-between;
  }
  .content_main{
    display:flex;
    justify-content: space-between;
    flex: 1;
    margin:20px 0px 30px 0px;
    div{
      width: 143px;
      height: 60px;
      border-radius:4px;
      background:rgba(101,94,255,1);
      opacity:0.5;
      span{
        padding:10px;
        height: 20px;
        line-height: 20px;
        display: block;
        font-size: 14px;
        color: #FFFFFF;
        text-align: left;
      }
    }
  }
}
/deep/ .el-dialog__body{
  padding:10px 20px;
}
</style>
