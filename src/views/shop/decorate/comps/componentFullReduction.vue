<template>
  <!-- 满减瞒折 -->
  <div class="componentFullReduction">
    <div class="reduction">
      <div class="reduction_first">
        <span>减</span>
        <span>满减/满折</span>
        <span>2019.05.10-2019.06.10</span>
      </div>
      <div class="reduction_two">
        <ul>
          <li :class="reductionStyle">{{currentComponentData.data.title}}</li>
          <li :class="reductionStyle">{{currentComponentData.data.title}}</li>
          <li :class="reductionStyle">{{currentComponentData.data.title}}</li>
          <li :class="reductionStyle">{{currentComponentData.data.title}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import componentMixin from "./mixin";
export default {
  name: "componentFullReduction",
  mixins: [componentMixin],
  components: {},
  data() {
    return {};
  },
  created() {},
  computed: {
    reductionStyle() {
      return `style${this.currentComponentData.data.displayStyle}`;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.componentFullReduction {
  & > .reduction {
    padding: 10px 20px;
    & > .reduction_first {
      position: relative;
      & > span {
        margin-right: 8px;
      }
      & > span:first-child {
        width: 19px;
        height: 19px;
        line-height: 19px;
        border-radius: 5px;
        text-align: center;
        color: #fff;
        font-size: 12px;
        background: #fc3d42;
        display: inline-block;
        position: absolute;
        top: 2px;
      }
      & > span:nth-child(2) {
        font-size: 16px;
        color: #333;
        padding-left: 28px;
      }
      & > span:last-child(3) {
        font-size: 11px;
		transform: scale(0.92);
        color: #7c7c7c;
      }
    }
    & > .reduction_two {
      padding-top: 15px;
      & > ul {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        & > li {
          width: 78px;
          height: 20px;
          line-height: 20px;
          background: rgba(255, 255, 255, 1);
          text-align: center;
          color: #fc3d42;
          margin-right: 18px;
          margin-bottom: 10px;
        }
        & > .style1 {
          border: 1px solid #fc3d42;
          border-radius: 4px;
        }
        & > .style2 {
          border: 1px solid #fc3d42;
        }
        & > .style3 {
          border: 1px dashed #fc3d42;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
