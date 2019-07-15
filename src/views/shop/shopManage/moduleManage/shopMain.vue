<!--商户信息-->
<template>
  <div class="app-container">
    <el-card class="box-card">
      <section class="guideBox">
        <div class="phoneBox">
          <img src="@/assets/images/shop/phoneBg.png" />
          <img class="phoneTop" src="@/assets/images/shop/phoneTop.png" />
          <!-- <div class="phoneHead">

          </div> -->
          <div class="phoneBody">
            <div class="item item-talkOne">
              <div class="person" style="margin-top:54px;">
                <img src="@/assets/images/shop/talk-person.png" />
              </div>
              <div class="con talk-left">
                <div class="talk">
                  <img src="@/assets/images/shop/talk-01.png" style="width:359px;height:113px;" />
                  <div class="text">
                    <div class="tit">提示</div>
                    <p class="talk-con">您好，您的店铺还未装修，跟我一起装修您的店铺吧！！</p>
                  </div>
                </div>
                <div class="btn">
                  <el-button type="primary" @click="isStep2Show = true" size="mini" style="float:right;">开始教程</el-button>
                </div>
              </div>
            </div>
            <div class="item item-talkTwo" v-if="isStep2Show">
              <div class="con talk-right">
                <div class="talk">
                  <img src="@/assets/images/shop/talk-02.png" style="width:354px;height:150px;" />
                  <div class="text">
                    <div class="tit">装修教程</div>
                    <p class="talk-con" style="width:285px;">在“ 店铺模板 ”中直接选用模板进行<br />“ 确认使用 ”，就装修完成了哦！～～</p>
                  </div>
                </div>
                <div class="btn">
                  <el-button type="primary" size="mini">知道啦</el-button>
                </div>
              </div>
              <div class="person" style="margin-top:91px;">
                <img src="@/assets/images/shop/talk-person.png" />
              </div>
            </div>
            <div class="item item-talkThree">
              <div class="person" style="margin-top:84px;">
                <img src="@/assets/images/shop/talk-person.png" />
              </div>
              <div class="con talk-left">
                <div class="talk">
                  <img src="@/assets/images/shop/talk-03.png" style="width:362px;height:152px;" />
                  <div class="text">
                    <div class="tit">自定义页面</div>
                    <div class="talk-con">
                      <p>在<span> “页面管理” </span>中进行页面创建或编辑</p>
                      <p>在<span> “店铺导航” </span>中设置店铺导航形式、名称、链接</p>
                      <p>在<span> “店铺风格” </span>中可以设置店铺整体的颜色方案</p>
                      <p>这样可以创建出最个性化的店铺</p>
                    </div>
                  </div>
                </div>
                <div class="btn">
                  <el-button type="primary" size="mini" style="float:right;">开始装修</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4>手机店铺预览</h4>
          <img width="160" height="160" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563188450117&di=a9405fbf7175f80ef1dbb15116ac3c64&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201601%2F22%2F20160122003337_ZxyWu.jpeg" />
          <p>使用微信扫描二维码，预览店铺效果</p>
          <h4>店铺装修方法</h4>
          <p>方法一: 最快捷的方法</p>
          <p>直接在 <el-button @click="$emit('changePage', 'shopTemplate')" type="text">店铺模板</el-button> 中选用配套店铺模版进行“一键装修”</p>
          <p style="margin-top: 25px">方法二: 最个性化的方法</p>
          <p>在 <el-button type="text">页面管理</el-button> 中进行页面创建或编辑</p>
          <p>在 <el-button type="text">店铺导航</el-button> 中设置店铺导航形式、名称、链接</p>
          <p>在 <el-button type="text">店铺风格</el-button> 中可以设置店铺整体的颜色方案这样可以创建出最个性化的店铺</p>
        </div>
      </section>
    </el-card>
  </div>
</template>

<script>

export default {
  name: 'shopMain',
  data() {
    return {
      isStep2Show: false
    }
  },

  created() {

  },

  methods: {

  }
}
</script>

<style scoped lang="scss">
.guideBox{
  display: flex;
  .phoneBox{
    width: 467px;
    height: 830px;
    position: relative;
    margin-right:50px;
    img{
      width: 100%;
      height: 100%;
    }
    .phoneTop{
      position: absolute;
      left: 28px;
      top: 116px;
      width: 412px;
      height: 77px;
    }

    .phoneBody{
      width:408px;
      position:absolute;
      left:28px;
      top:193px;
      .item{
        display:flex;
        margin-top:112px;
        margin-left:13px;
        .con{
          display:flex;
          justify-content: flex-end;
          flex-direction:column;
        }
        .talk{
          position:relative;
          .text{
            position:absolute;
            .tit{
              font-size:16px;
              color:#3D434A;
              line-height:16px;
            }
            .talk-con{
              width:295px;
              margin-top:21px;
              font-size:14px;
              color:#3D434A;
              line-height:17px;
            }
          }
        }
        .talk-left{
          margin-left:5px;
        }
        .talk-right{
          margin-right:9px;
        }
        .person{
          width:60px;
          height:60px;
          border:1px #D0D6E4 solid;
          border-radius:10px;
          overflow:hidden;
          img{
            display:block;
            width:48px;
            height:65px;
            margin:0 auto;
          }
        }
        .btn{
          margin-top:17px;
        }
      }
      .item-talkOne{
        .talk{
          width:359px;
          height:113px;
          .text{
            left:38px;
            top:19px;
          }
        }
      }
      .item-talkTwo{
        .talk{
          width:354px;
          height:150px;
          .text{
            left:24px;
            top:20px;
          }
        }
      }
      .item-talkThree{
        .talk{
          width:362px;
          height:152px;
          .text{
            left:37px;
            top:20px;
            p{
              margin:0;
            }
            span{
              color:#578EFA;
            }
          }
        }
      }
    }
  }

  p{
    font-size: 12px;
    .el-button{
      padding: 0
    }
  }
  h4{
    font-size: 14px;
    margin: 25px 0 15px;
  }
}
</style>
