<template>
  <!-- 图文导航 -->
  <div class="componentArticleNav" :style="{'backgroundColor':currentComponentData.data.backgroundColor}" v-if="currentComponentData && currentComponentData.data">
    <!-- 1、图片导航 -->
    <div v-if="currentComponentData.data.templateType===1">
      <!-- (1)固定 -->
      <div v-if="currentComponentData.data.slideType===1">
        <ul :class="currentComponentData.data.itemList.length>=5?'img_nav1':'img_nav'">
          <li ref="img_w" v-for="(item,index) in currentComponentData.data.itemList">
            <div :style="{'height':clientHight+'px'}">
              <img :src="item.url" alt />
            </div>
            <p class="ellipsis" :style="{color:currentComponentData.data.fontColor}">{{item.title}}</p>
          </li>
        </ul>
      </div>
      <!-- (2)横向滑动 -->
      <div v-if="currentComponentData.data.slideType===2">
        <ul class="img_nav2">
          <li ref="img_w" v-for="(item,index) in currentComponentData.data.itemList">
            <div :style="{'height':clientHight+'px'}">
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
          <li ref="img_w" v-for="(item,index) in currentComponentData.data.itemList">
            <span :style="{color:data.fontColor}">{{item.title}}</span>
          </li>
        </ul>
      </div>
      <!-- (2)横向滑动 -->
      <div v-if="currentComponentData.data.slideType===2">
        <ul class="img_nav5">
          <li ref="img_w" v-for="(item,index) in currentComponentData.data.itemList">
            <span class="ellipsis" :style="{color:currentComponentData.data.fontColor}">{{item.title}}</span>
          </li>
        </ul>
      </div>
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
          console.log(this.$refs.img_w[0].clientWidth);
          this.clientHight = this.$refs.img_w[0].clientWidth - 5;
        }
      }
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.componentArticleNav {
  // 小于5个数
  .img_nav {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 11px;
    & > li {
      flex: 1;
      text-align: center;
      padding-right: 10px;
      & > div {
        margin: 0 auto;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
      & > p {
        font-size: 14px;
        padding-top: 10px;
      }
    }
    & > li:last-child {
      padding-right: 0px;
    }
  }
  //   大于5个时候换行。
  .img_nav1 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 11px;
    & > li {
      width: 20%;
      text-align: center;
      padding-right: 10px;
      padding-bottom: 5px;
      & > div {
        margin: 0 auto;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
      & > p {
        font-size: 14px;
        padding-top: 10px;
        color: #1c1d1f;
      }
    }
    & > li:nth-child(5n) {
      padding-right: 0px;
    }
  }
  //   横向滑动
  .img_nav2 {
    display: -webkit-box;
    padding: 10px;
    overflow-x: scroll;
    & > li {
      width: calc(20% - 7.5px);
      text-align: center;
      margin-right: 10px;
      & > div {
        margin: 0 auto;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
      & > p {
        font-size: 14px;
        padding-top: 5px;
        color: #1c1d1f;
      }
    }
  }
  // 文字导航小于5个数
  .img_nav3 {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 11px;
    & > li {
      flex: 1;
      text-align: center;
      margin-right: 10px;
      height: 30px;
      line-height: 30px;
      background: #f2f1ff;
      & > span {
        font-size: 14px;
      }
    }
    & > li:last-child {
      margin-right: 0px;
    }
  }
  // 文字导航大于5个数
  .img_nav4 {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 11px;
    & > li {
      text-align: center;
      margin-right: 10px;
      margin-bottom: 5px;
      width: calc(20% - 8px);
      height: 30px;
      line-height: 30px;
      background: #f2f1ff;
      & > span {
        font-size: 14px;
      }
    }
    & > li:nth-child(5n) {
      margin-right: 0px;
    }
  }
  // 文字导航横向滑动
  .img_nav5 {
    display: -webkit-box;
    padding: 10px;
    width: 100%;
    overflow-x: scroll;
    & > li {
      width: calc(20% - 8px);
      text-align: center;
      margin-right: 10px;
      height: 30px;
      background: #f2f1ff;
      & > span {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
      }
    }
  }
}
</style>