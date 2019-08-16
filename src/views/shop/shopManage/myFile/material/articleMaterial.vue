<template>
  <div>
    <div>
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="form.timeValue"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerNowDateBefore">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.name" placeholder="请填写标题、描述或作者"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button type="primary" plain @click="_routeTo('generalArticle')">新建图文素材</el-button>
      <el-button type="primary" plain @click="syncImage">同步图文</el-button>
    </div>
    <div class="list">
      <p class="list_top">图片素材<span>{{num}}</span>条</p>
      <div class="list_main">
        <div class="list_img">
           <div class="item_img" @mouseenter="onMouseOver" @mouseleave="onMouseOut">
             <p class="img_head">
               <span>7月12日</span>
               <i class="wx_icon"></i>
             </p>
             <div class="img_body">
               <p class="title">美丽的天空之城</p>
               <img src="" class="imgs">
               <p class="content">
                 内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试内容测试
               </p>
             </div>
             <p class="img_bottom">
               <span><i class="el-icon-edit"></i></span>
               <span><i class="el-icon-delete"></i></span>
             </p>
             <div ref="operate">
               <i class="el-icon-view lookArticle"> 预览文章</i>
             </div>
           </div>
        </div>
      </div>
    </div>
    <!-- 动态弹窗 -->
    <component v-if="dialogVisible" :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
  </div>
</template>

<script>
import dialogSync from '../../../dialogs/dialogSync';
export default {
  name: 'articleMaterial',
  components: {dialogSync},
  data () {
    return {
      pickerNowDateBefore: {
        disabledDate: (time) => {
          return time.getTime() > new Date();
        }
      },
      dialogVisible: false,
      currentDialog: '',
      form:{
        timeValue:'',
        
      },
      num:10,
    }
  },
  created() {

  },
  methods: {
    onSubmit(){},
    syncImage(){
      this.dialogVisible = true;
      this.currentDialog = 'dialogSync'
    },
    onMouseOver(){
      this.$refs.operate.style.display="block"
    },
    onMouseOut(){
      this.$refs.operate.style.display="none"
    },
  }
}
</script>

<style lang="scss" scoped>
.list_top{
  height: 80px;
  line-height: 80px;
  font-size: 14px;
  color: #92929B;
  span{
    color: #44434B;
    margin: 0 5px;
  }
}
.list_main{
  display: flex;
  justify-content: space-between;
  .list_img{
    display: flex;
    justify-content: space-around;
    .item_img{
      width: 250px;
      border: 1px solid #e6e6e6;
      position: relative;
      .img_head{
        height: 25px;
        line-height: 25px;
        padding: 0 10px;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        flex: 1;
        span{
          font-size: 14px;
          color: #92929B;
        }
        .wx_icon{
          width: 20px;
          height: 20px;
          display: inline-block;
          vertical-align: middle;
          background: url('../../../../../assets/images/shop/wx_icon.png');
        }
      }
      .img_body{
        width:100%;
        padding:10px 10px;
        font-size: 14px;
        color: #44434B;
        .title{
          height: 25px;
          line-height: 25px;
        }
        .imgs{
          width: 100%;
          height:85px;
        }
        .content{
          line-height: 20px;
          height: 60px;
        }
      }
      .img_bottom{
        height: 25px;
        line-height: 25px;
        display: flex;
        justify-content:space-between;
        span{
          width: 50%;
          display: inline-block;
          background: #DDDDDD;
          text-align: center;
          color: #fff;
          cursor: pointer;
        }
        span:nth-of-type(2){
          border-left:1px solid #fff;
        }
      }
      .lookArticle{
        width: 100%;
        height: 218px;
        position: absolute;
        top:0;
        left:0;
        z-index: 2;
        background-color:rgba(0,0,0,0.2);
        padding: 90px 0px 0px 80px;
        color: #fff;
        cursor: pointer;
        // display:none;
      }
    }
  }
}
</style>
