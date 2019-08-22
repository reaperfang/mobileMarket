<template>
    <div>
        <el-dialog
        title=""
        :visible.sync="showShopsDialog"
        width="40%"
        :before-close="handleClose"
        style="margin-top:20vh;">
        <span slot="title" class="dialog_title">
            <a>返回官网</a> | <a>创建店铺</a>
        </span>
        <div class="content">
            <div class="content_top">
            <!-- <el-input placeholder="请输入店铺名称" v-model="shopName" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" class="search"></el-button>
            </el-input> -->
            <!-- <el-button>创建店铺</el-button> -->
            </div>
            <div class="content_main">
            <div v-for="item in shopLists" :key="item.id" @click="toShop(item.id)">
                <span>{{item.shopName}}</span>
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
          showDialog:false,
          shopLists:[]
      }
  },
  props:['showShopsDialog','shopList'],
  watch: {
      showShopsDialog(newValue,oldValue){
          this.showDialog = newValue
      },
      shopList(newValue,oldValue){
          this.init()
      },
  },
  created(){
    this.init()
  },
  methods: {
    //获取店铺列表
    init(){
      for(let key in this.shopList){
        // let num = key.substring(4,5)
        let shopObj = this.shopList[key]
        // Object.assign(shopObj, {'key':num})
        this.shopLists.push(shopObj)
      }
    },
    //进入店铺
    toShop(id){
      this.$store.dispatch('getCid',id).then(() => {
        this.handleClose()
        // this.$router.push('/profile/profile')
        this.$router.push({ path: '/profile/profile' })
      }).catch(error => {
        this.$notify.error({
          title: '失败',
          message: error
        })
      })
    },

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
.dialog_title a{
  cursor: pointer;
}
.dialog_title a:hover{
  text-decoration: underline;
}
</style>
