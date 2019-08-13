<template>
  <!-- 购买公告 -->
  <div class="componentBuyNotice" v-if="currentComponentData && currentComponentData.data" >
    <ul :style="{'backgroundColor':currentComponentData.data.backgroundColor}">
      <li>
        <img src="http://35.201.165.105:8000/storage/image/20190809/1565333783849805.png" alt />
      </li>
      <li>
        <van-notice-bar text="通知内容通知内容通" :color="currentComponentData.data.fontColor" />
      </li>
      <li :style="{'color':currentComponentData.data.fontColor}">刚刚</li>
    </ul>
  </div>
</template>

<script>
import componentMixin from './mixin';
export default {
  name: 'componentBuyNotice',
  mixins:[componentMixin],
  components: {},
  data () {
    return {
      
    }
  },
  created() {

  },
  computed: {
    
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.componentBuyNotice {
  height: 29px;
  line-height: 29px;
  & > ul {
    padding: 0px 10px;
    display: flex;
    align-items: center;
    & > li:nth-child(1) {
      width: 22px;
      height: 22px;
      & > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    & > li:nth-child(2) {
      flex: 1;
    }
    & > li:nth-child(3) {
      flex: 0 0 50px;
      text-align: right;
    }
  }
  .van-notice-bar {
    background: none !important;
    height: 29px;
  }
  /deep/ .van-notice-bar__wrap {
    font-size: 12px;
    padding-left: 10px;
  }
}
</style>
