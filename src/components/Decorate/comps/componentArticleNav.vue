<template>
  <!-- 图文导航 -->
  <div class="componentArticleNav" :style="{'backgroundColor':currentComponentData.data.backgroundColor}" v-if="currentComponentData && currentComponentData.data">

    <template v-if="hasContent">
      <!-- 1、图片导航 -->
      <div v-if="currentComponentData.data.templateType===1">
        <!-- (1)固定 -->
        <div v-if="currentComponentData.data.slideType===1">
          <ul class="img_nav" :class="{'five':currentComponentData.data.itemList.length>4}">
            <li ref="img_w" v-for="(item,index) in currentComponentData.data.itemList" :key="index">
              <div :class="{'default': !item.url}">
                <img :src="item.url" alt />
              </div>
              <p class="ellipsis" :style="{color:currentComponentData.data.fontColor}">{{item.title}}</p>
            </li>
          </ul>
        </div>
        <!-- (2)横向滑动 -->
        <div v-if="currentComponentData.data.slideType===2">
          <ul class="img_nav2">
            <li ref="img_w" v-for="(item,index) in currentComponentData.data.itemList" :key="index">
              <div >
                <img :src="item.url" alt />
              </div>
              <p class="ellipsis" :style="{color:currentComponentData.data.fontColor}">{{item.title}}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 2、文字导航 -->
      <div v-if="currentComponentData.data.templateType===2">
        <!-- (1)固定 -->
        <div v-if="currentComponentData.data.slideType===1">
          <ul :class="currentComponentData.data.itemList.length>5?'img_nav4':'img_nav3'">
            <li ref="img_w" v-for="(item,index) in currentComponentData.data.itemList" :key="index">
              <span :style="{color:currentComponentData.data.fontColor}">{{item.title}}</span>
            </li>
          </ul>
        </div>
        <!-- (2)横向滑动 -->
        <div v-if="currentComponentData.data.slideType===2">
          <ul class="img_nav5">
            <li ref="img_w" v-for="(item,index) in currentComponentData.data.itemList" :key="index">
              <span class="ellipsis" :style="{color:currentComponentData.data.fontColor}">{{item.title}}</span>
            </li>
          </ul>
        </div>
      </div>
    </template>
    <div v-else class="temp_block">
       <img class="empty_data_img" src="../../../assets/images/shop/emptyData.png" alt="">
    </div>
  </div>
</template>
<script>
import componentMixin from '../mixins/mixinComps';
export default {
  name: "componentArticleNav",
  mixins:[componentMixin],
  components: {},
  data() {
    return {
      clientHight: ""
    };
  },
  created() {},
  watch: {
    'currentComponentData.data': {
      handler (newValue){
        if(this.$refs.img_w) {
          this.clientHight = this.$refs.img_w[0].clientWidth - 5;
        }
      }
    }
  },
  computed: {
    /* 检测是否有数据 */
    hasContent() {
        let value = false;
        if(this.currentComponentData.data.itemList) {
          if(Object.prototype.toString.call(this.currentComponentData.data.itemList) === '[object Object]') {
            this.currentComponentData.data.itemList = [...this.currentComponentData.data.itemList];
          }
          for(let item of this.currentComponentData.data.itemList) {
            if(item.title) {
              value = true;
              break;
            }
          }
        }
        return value;
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.componentArticleNav {
  // 小于5个数
  .img_nav {
    font-size:0;
    white-space:nowrap;
    overflow:hidden;
    & > li {
      width:25%;
      float:left;
      & > div {
        width:50px;
        height:50px;
        margin:0 auto;
        &.default{
          background: #ddd;
        }
        & > img {
          width: 100%;
          height: 100%;
        }
      }
      & > p {
        font-size: 14px;
        padding: 5px 0px;
        text-align:center;
      }
    }
    & > li:last-child {
      padding-right: 0px;
    }
  }
  .img_nav.five{
    li{
      width:20%;
      &>div{
        width:40px;
        height:40px;
      }
    }
  }
  //   大于5个时候换行。
  // .img_nav1 {
  //   display: flex;
  //   flex-direction: row;
  //   flex-wrap: wrap;
  //   // padding: 22px;
  //   & > li {
  //     width: 20%;
  //     text-align: center;
  //     // padding-right: 20px;
  //     padding-bottom: 10px;
  //     & > div {
  //       margin: 0 auto;
  //       & > img {
  //         width: 100%;
  //         height: 100%;
  //       }
  //     }
  //     & > p {
  //       font-size: 28px;
  //       padding-top: 20px;
  //       color: #1c1d1f;
  //     }
  //   }
  //   & > li:nth-child(5n) {
  //     padding-right: 0px;
  //   }
  // }
  //   横向滑动
  .img_nav2 {
    display: -webkit-box;
    overflow-x: scroll;
    & > li {
      width: 20%;
      text-align: center;
      & > div {
        margin: 0 auto;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
      & > p {
        font-size: 14px;
        padding: 5px 0px;
        color: #1c1d1f;
      }
    }
  }
  // 文字导航小于5个数
.img_nav3 {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 42px;
  & > li {
      flex: 1;
      text-align: center;
      box-sizing: border-box;
      position: relative;
    & > span {
      font-size: 14px;
      position: absolute;
      // box-sizing: border-box;
      left: 50%;
      top: 50%;
      transform: (-50% -50%);
      transform: translate(-50%, -50%);
      width: 100%;
      border-left: 1px solid #e5e5e5;
    }
    &:first-child{
      &>span{
      border-left:0;
      }
    }
  }
  }
  // 文字导航大于5个数
  .img_nav4 {
    min-height: 42px;
    overflow:hidden;
    padding:5px 0;
    & > li {
      text-align: center;
      box-sizing: border-box;
      position: relative;
      float:left;
      width:20%;
      margin-top:5px;
      &:nth-of-type(1){
        margin-top:0;
      }
      &:nth-of-type(2){
        margin-top:0;
      }
      &:nth-of-type(3){
        margin-top:0;
      }
      &:nth-of-type(4){
        margin-top:0;
      }
      &:nth-of-type(5){
        margin-top:0;
      }               
      & > span {
        font-size: 14px;
        width: 100%;
        display:block;
        border-left: 1px solid #e5e5e5;
      }         
    }
    & > li:nth-of-type(5n+1) {
      & > span {
        border-left: 0px;
      }
    }
  }
  // 文字导航横向滑动
  .img_nav5 {
    display: -webkit-box;
    width: 100%;
    overflow-x: scroll;
    height: 42px;
    & > li {
      width: 20%;
      text-align: center;
      box-sizing: border-box;
      position: relative;
      & > span {
        font-size: 14px;
        position: absolute;
        // box-sizing: border-box;
        left: 50%;
        top: 50%;
        transform: (-50% -50%);
        transform: translate(-50%, -50%);
        width: 100%;
        border-right: 1px solid #e5e5e5;
      }
    }
    & > li:last-child {
      & > span {
        border-right: 0px;
      }
    }
  }
}
</style>