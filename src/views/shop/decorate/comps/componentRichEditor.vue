
<template>
    <div>
      <el-tag type="danger" v-for="(item, key) in currentComponentData.data">{{key}}：{{item}}</el-tag>
      <div v-html="currentComponentData.data.richValue"></div>
    </div>
</template>

<script>
import componentMixin from './componentMixin.js';
export default {
  name: 'componentRichEditor',
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
</style>
