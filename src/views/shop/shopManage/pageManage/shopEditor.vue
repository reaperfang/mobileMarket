<template>
  <div class="group-wrapper" :style="fontStyle" ref="groupWrapper">
    <div class="module widget">
      <div class="block">
        <div class="widget-title">基础组件</div>
        <div class="widget-list">
          <ul class="tile-list n3">
            <li>
              <i class="rich-editor"></i>
              <p>富文本</p>
            </li>
            <li>
              <i class="goods"></i>
              <p>商品</p>
            </li>
            <li>
              <i class="goods-group"></i>
              <p>商品分组</p>
            </li>
            <li>
              <i class="article-ad"></i>
              <p>图文广告</p>
            </li>
            <li>
              <i class="cube"></i>
              <p>魔方</p>
            </li>
            <li>
              <i class="article-nav"></i>
              <p>图文导航</p>
            </li>
            <li>
              <i class="text"></i>
              <p>文本</p>
            </li>
            <li>
              <i class="title"></i>
              <p>标题</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="block">
        <div class="widget-title">营销组件</div>
        <div class="widget-list">
          <ul class="tile-list n3">
            <li>
              <i class="coupon"></i>
              <p>优惠券</p>
            </li>
            <li>
              <i class="multi-person"></i>
              <p>多人拼团</p>
            </li>
            <li>
              <i class="secondkill"></i>
              <p>限时秒杀</p>
            </li>
            <li>
              <i class="discount"></i>
              <p>限时折扣</p>
            </li>
            <li>
              <i class="discountPackage"></i>
              <p>优惠套餐</p>
            </li>
            <li>
              <i class="fullReduction"></i>
              <p>满减满折</p>
            </li>
            <li>
              <i class="Nyuan"></i>
              <p>N元N件</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="block">
        <div class="widget-title">其他</div>
        <div class="widget-list">
          <ul class="tile-list n3">
            <li>
              <i class="shop-info"></i>
              <p>店铺信息</p>
            </li>
            <li>
              <i class="enter-shop"></i>
              <p>进入店铺</p>
            </li>
            <li>
              <i class="goods-search"></i>
              <p>商品搜索</p>
            </li>
            <li>
              <i class="notice"></i>
              <p>公告</p>
            </li>
            <li>
              <i class="help-line"></i>
              <p>辅助线</p>
            </li>
            <li>
              <i class="video"></i>
              <p>视频</p>
            </li>
            <li>
              <i class="help-blank"></i>
              <p>辅助空白</p>
            </li>
            <li>
              <i class="buy-notice"></i>
              <p>购买公告</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="module view">
      <div class="phone-head">
        <img src="../../../../assets/images/shop/phone-head.png" alt="">
      </div>
      <div class="phone-body">
      </div>
    </div>
    <div class="module props">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="block header">
          <p class="title">页面编辑</p>
          <p class="state"></p>
        </div>
        <div class="block form">
          <el-form-item label="分组样式" prop="groupStyle">
            <el-radio-group v-model="ruleForm.groupStyle">
              <el-radio label="left">左侧样式</el-radio>
              <el-radio label="top">顶部样式</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="分组字体" prop="groupFont">
             <el-radio-group v-model="ruleForm.groupFont">
              <el-radio label="normal">常规体</el-radio>
              <el-radio label="bold">加粗体</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="分组图片" prop="groupImg">
             <el-radio-group v-model="ruleForm.groupImg">
              <el-radio label="rightAngle">直角</el-radio>
              <el-radio label="circleAngle">圆角</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>

        <div class="block form">
          <el-form-item label="页面边距" prop="groupStyle">
            <div class="slider-wrapper">
             <el-slider v-model="ruleForm.pageMargin"></el-slider>
             <span>{{ruleForm.pageMargin}}像素</span>
            </div>
          </el-form-item>
          <el-form-item label="分组间距" prop="groupFont">
             <div class="slider-wrapper">
              <el-slider v-model="ruleForm.groupMargin"></el-slider>
              <span>{{ruleForm.groupMargin}}像素</span>
             </div>
          </el-form-item>
        </div>

        <div class="block button">
          <el-button type="primary">保存并生效</el-button>
          <el-button>保    存</el-button>
          <el-button>预    览  </el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopEditor",
  components: {},
  data() {
    return {
      fontStyle: {fontWeight: 500},  //动态字体样式对象
      pageMargin: {padding: '10px 0 0 10px'},  //动态页面边距对象
      ruleForm: {
        groupStyle: 'left',  //分组样式
        groupFont: 'bold',  //分组字体
        groupImg: 'circleAngle',  //图片圆角
        pageMargin: 15,  //页面边距
        groupMargin: 20  //分组间距
      },
      rules: {}
    };
  },
  mounted() {
    this.setFont();
    this.setImgRadius();
  },
  watch:{

    /* 监听样式类型改变 */
    'ruleForm.groupStyle'() {
      this.$nextTick(()=>{
        this.setFont();
        this.setImgRadius();
      })
    },

    /* 监听字体粗细改变 */
    'ruleForm.groupFont'(newValue) {
      this.setFont(newValue);
    },

    /* 监听图片圆角改变 */
    'ruleForm.groupImg'(newValue) {
      this.setImgRadius(newValue);
    },

    /* 监听页面边距改变 */
    'ruleForm.pageMargin'(newValue) {
      this.pageMargin = {padding: `${newValue}px 0 0 ${newValue}px`};
    },

    /* 监听分组边距改变 */
    'ruleForm.groupMargin'(newValue) {
      this.groupMargin = {marginBottom: `${newValue}px`};
    }
  },
  methods: {

    /* 设置字体粗细 */
    setFont(value = this.ruleForm.groupFont) {
      if(value === 'normal') {
        this.fontStyle = {fontWeight: 500};
      }else if(value === 'bold') {
        this.fontStyle = {fontWeight: 700};
      }
    },

    /* 设置图片圆角 */
    setImgRadius(value = this.ruleForm.groupImg) {
      const imgs = this.$refs.groupWrapper.querySelectorAll('img');
      for(let i=0;i<imgs.length;i++){
        if(value === 'rightAngle'){
          imgs[i].style.borderRadius = '0%';
        }else if(value === 'circleAngle') {
          imgs[i].style.borderRadius = '10px';
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
ul.nav {
  width: 100%;
  background: #fff;
  li {
    font-size: 15px;
    padding: 4px;
    text-align: center;
    line-height: 30px;
    margin-bottom: 0;
    color: #92929b;
    cursor: pointer;
    &:hover{
      color:#000;
      transition:all 0.4s;
    }
    &:first-child{
      color:#000;
      transition:all 0.4s;
      position:relative;
      &:after{
        content: "";
        display: block;
        background: #ff7068;
        position: absolute;
      }
    }
  }
}
.group-wrapper{
  display:flex;
  flex-direction: row;
  .module{
    margin-right:20px;
  }
}
.block{
  margin-bottom:10px;
  background:#fff;
}
.widget{
  width: 220px;
  .widget-title{
    height:40px;
    line-height:22px;
    padding:10px 20px;
    box-sizing: border-box;
    background:rgba(230,228,255,1);
  }
  .widget-list{
    padding:30px 20px;
    ul{
      li{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        i{
          width:30px;
          height:30px;
          &{
            background:url('../../../../assets/images/shop/editor/fuwenben.png') no-repeat 0 0;
          }
          &.goods{
            background:url('../../../../assets/images/shop/editor/shangpin.png') no-repeat 0 0;
          }
          &.goods-group{
            background:url('../../../../assets/images/shop/editor/shangpinfenzu.png') no-repeat 0 0;
          }
          &.article-ad{
            background:url('../../../../assets/images/shop/editor/tuwenguanggao.png') no-repeat 0 0;
          }
          &.cube{
            background:url('../../../../assets/images/shop/editor/mofang.png') no-repeat 0 0;
          }
          &.article-nav{
            background:url('../../../../assets/images/shop/editor/tuwendaohang.png') no-repeat 0 0;
          }
          &.text{
            background:url('../../../../assets/images/shop/editor/wenben.png') no-repeat 0 0;
          }
          &.title{
            background:url('../../../../assets/images/shop/editor/biaoti.png') no-repeat 0 0;
          }

          &.coupon{
            background:url('../../../../assets/images/shop/editor/youhuiquanzu.png') no-repeat 0 0;
          }
          &.multi-person{
            background:url('../../../../assets/images/shop/editor/duorenpintuan.png') no-repeat 0 0;
          }
          &.secondkill{
            background:url('../../../../assets/images/shop/editor/miaoshazu.png') no-repeat 0 0;
          }
          &.discount{
            background:url('../../../../assets/images/shop/editor/xianshizhekou.png') no-repeat 0 0;
          }
          &.discountPackage{
            background:url('../../../../assets/images/shop/editor/youhuitaocan.png') no-repeat 0 0;
          }
          &.fullReduction{
            background:url('../../../../assets/images/shop/editor/manjianmanzhe.png') no-repeat 0 0;
          }
          &.Nyuan{
            background:url('../../../../assets/images/shop/editor/NyuanNjian.png') no-repeat 0 0;
          }

          &.shop-info{
            background:url('../../../../assets/images/shop/editor/dianpuxinxi.png') no-repeat 0 0;
          }
          &.enter-shop{
            background:url('../../../../assets/images/shop/editor/jinrudianpu.png') no-repeat 0 0;
          }
          &.goods-search{
            background:url('../../../../assets/images/shop/editor/shangpinsousuo.png') no-repeat 0 0;
          }
          &.notice{
            background:url('../../../../assets/images/shop/editor/gonggao.png') no-repeat 0 0;
          }
          &.help-line{
            background:url('../../../../assets/images/shop/editor/fuzhuxian.png') no-repeat 0 0;
          }
          &.video{
            background:url('../../../../assets/images/shop/editor/shipin.png') no-repeat 0 0;
          }
          &.help-blank{
            background:url('../../../../assets/images/shop/editor/fuzhukongbai.png') no-repeat 0 0;
          }
          &.buy-notice{
            background:url('../../../../assets/images/shop/editor/goumaigonggao.png') no-repeat 0 0;
          }
        }
        p{
          color:rgba(58,64,72,1);
          margin-top:10px;
        }
      }
    }
  }
}
.content {
  padding: 10px 0 0 10px;
  box-sizing: border-box;
  width: 100%;
  .wrapper {
    background: #fff;
    margin-bottom: 10px;
    p {
      background: rgba(247, 247, 247, 1);
      padding: 10px;
      margin-bottom: 20px;
    }
    ul.group {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        cursor:pointer;
        img {
          width: 65px;
          height: 65px;
        }
        span {
          margin-top: 20px;
        }
      }
    }
  }
}
.view {
  width: 374px;
  border: 1px solid #e2e1e1;
  .phone-head {
    width: 100%;
    height: 64px;
    text-align: center;
    line-height: 64px;
    background: #fff;
    img{
      width:100%;
    }
  }
  .phone-body {
    .left-style {
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      ul.nav{
        width: 98px;
        li{
          margin-bottom: 10px;
          &:first-child{
            &:after{
              width: 2px;
              height: 40px;
              top: 0;
              left: 0;
            }
          }
        }
      }
      .content{
        width:calc( 100% - 98px );
      }
    }
    .top-style {
      ul.nav{
        width: 100%;
        display: flex;
        justify-content: space-between;
        li{
          padding: 4px;
          text-align: center;
          line-height: 30px;
          &:first-child{
            &:after{
              width: 100%;
              height: 2px;
              bottom: 0px;
              left: 0;
            }
          }
        }
      }
      .content{
        width: 100%;
      }
    }
  }
}
.props{
  width:346px;
  .block{
    &.header{
      padding:10px;
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      .title{
        text-indent:10px;
        position:relative;
        &:before{
          content:"";
          position:absolute;
          display:block;
          width:2px;
          height:100%;
          background:#655EFF;
        }
      }
      .state{
        color:#655EFF;
      }
    }
    &.form{
      padding: 30px 0;
      .slider-wrapper{
        width:100%;
        display:flex;
        justify-content: space-between;
        .el-slider{
          width:66%;
        }
        span{
          margin-right:20px;
        }
      }
    }
    &.button{
      padding: 30px 0;
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
}
</style>
