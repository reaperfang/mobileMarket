<template>
  <!-- 辅助线 -->
  <div class="componentHelpLine" v-if="currentComponentData && currentComponentData.data">
    <div :class="currentComponentData.data.lineMargin===1?'help_blank':'help_blank1'">
      <p :style="styleObj"></p>
    </div>
  </div>
</template>

<script>
import componentMixin from '../mixins/mixinComps';
export default {
  name: 'componentHelpLine',
  mixins:[componentMixin],
  components: {},
  data () {
    return {
      pink: "pink",
      borderStyle: {
        1: "solid",
        2: "dashed",
        3: "dotted",
      }
    }
  },
  created() {

  },
  computed: {
    styleObj() {
      return {
        borderBottom: `1px ${this.borderStyle[this.currentComponentData.data.lineStyle]} ${
          this.currentComponentData.data.lineColor
        }`
      };
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.help_blank {
  padding: 15px 0px;
}
.help_blank1 {
  padding: 15px 10px;
}
</style>
