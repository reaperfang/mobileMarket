<template>
  <div class="group-wrapper">
    <div class="module view" ref="groupWrapper" :style="fontStyle">
      <div class="phone-head">
        <img src="../../../../assets/images/shop/phone-head.png" alt="">
      </div>
      <div class="phone-body">
        <div class="left-style" v-if="ruleForm.groupStyle==='left'">
          <ul class="nav">
            <li>商品组一</li>
            <li>商品组二</li>
            <li>商品组三</li>
            <li>商品组四</li>
            <li>商品组五</li>
          </ul>
          <div class="content" :style="pageMargin">
            <div class="wrapper" :style="groupMargin">
              <p>二级分组一</p>
              <ul class="group tile-list n3">
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组一</span>
                </li>
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组二</span>
                </li>
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组三</span>
                </li>
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组四</span>
                </li>
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组五</span>
                </li>
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组六</span>
                </li>
              </ul>
            </div>
            <div class="wrapper" :style="groupMargin">
              <p>二级分组二</p>
              <ul class="group tile-list n3">
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组一</span>
                </li>
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组二</span>
                </li>
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组三</span>
                </li>
              </ul>
            </div>
            <div class="wrapper" :style="groupMargin">
              <p>二级分组三</p>
              <ul class="group tile-list n3">
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组一</span>
                </li>
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组二</span>
                </li>
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组三</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="top-style" v-else-if="ruleForm.groupStyle==='top'">
          <ul class="nav tile-list n5">
            <li>商品组一</li>
            <li>商品组二</li>
            <li>商品组三</li>
            <li>商品组四</li>
            <li>商品组五</li>
          </ul>
          <div class="content">
            <div class="wrapper" :style="groupMargin">
              <p>二级分组一</p>
              <ul class="group tile-list n3">
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组一</span>
                </li>
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组二</span>
                </li>
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组三</span>
                </li>
              </ul>
            </div>
            <div class="wrapper" :style="groupMargin">
              <p>二级分组二</p>
              <ul class="group tile-list n3">
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组一</span>
                </li>
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组二</span>
                </li>
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组三</span>
                </li>
              </ul>
            </div>
            <div class="wrapper" :style="groupMargin">
              <p>二级分组三</p>
              <ul class="group tile-list n3">
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组一</span>
                </li>
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组二</span>
                </li>
                <li>
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563199294268&di=e7d1fadb49617ed7006011b35ab03cac&imgtype=0&src=http%3A%2F%2Fimg1.cache.netease.com%2Fcatchpic%2FD%2FD2%2FD208347761CB9773FDC6D49EEC804B73.jpg" alt="">
                  <span>三级分组三</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="module props">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <div class="block header">
          <p class="title">商品分组页设置</p>
          <p class="state">生效中</p>
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
             <el-slider v-model="ruleForm.pageMargin" :min="0" :max="30"></el-slider>
             <span>{{ruleForm.pageMargin}}像素</span>
            </div>
          </el-form-item>
          <el-form-item label="分组间距" prop="groupFont">
             <div class="slider-wrapper">
              <el-slider v-model="ruleForm.groupMargin" :min="0" :max="30"></el-slider>
              <span>{{ruleForm.groupMargin}}像素</span>
             </div>
          </el-form-item>
        </div>

        <div class="block button">
          <el-button type="primary" @click="submit">保存并生效</el-button>
          <el-button @click="submit">保    存</el-button>
          <el-button>预    览  </el-button>
        </div>

      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopIndex",
  components: {},
  data() {
    return {
      fontStyle: {fontWeight: 500},  //动态字体样式对象
      pageMargin: {padding: '15px'},  //动态页面边距对象
      groupMargin: {marginBottom: '20px'},  //动态分组间距对象
      ruleForm: {
        groupStyle: 'left',  //分组样式
        groupFont: 'normal',  //分组字体
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
      this.pageMargin = {padding: `${newValue}px`};
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
    },

    submit() {
      this.loading = true;
      if(this.currentPageId) {
        this._apis.shop.editShopGroup(this.ruleForm).then((response)=>{
          this.$notify({
            title: '成功',
            message: '编辑成功！',
            type: 'success'
          });
          this.loading = false;
        }).catch((error)=>{
          this.$notify.error({
            title: '错误',
            message: error
          });
          this.loading = false;
        });
      }else{
        this._apis.shop.createShopGroup(this.ruleForm).then((response)=>{
          this.$notify({
            title: '成功',
            message: '创建成功！',
            type: 'success'
          });
          this.loading = false;
        }).catch((error)=>{
          this.$notify.error({
            title: '错误',
            message: error
          });
          this.loading = false;
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.group-wrapper{
  display:flex;
  flex-direction: row;
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
        color:rgb(252,65,70);
        transition:all 0.4s;
      }
      &:first-child{
        color:rgb(252,65,70);
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
}

.module {
  &.view {
    width: 374px;
    .phone-body {
      height: 760px;
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
          padding:0 10px;
          li{
            padding: 0 4px;
            text-align: center;
            line-height: 30px;
            border-radius:6px;
            font-size:14px;
            &:first-child{
              border:1px solid rgb(252,65,70);;
              color:rgb(252,65,70);
            }
          }
        }
        .content{
          width: 100%;
        }
      }
    }
  }

  &.props{
    width:346px;
    .block{
      &.button{
        padding: 30px 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
    }
  }
}
</style>
