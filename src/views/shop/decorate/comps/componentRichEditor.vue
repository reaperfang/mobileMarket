<template>
</template>

<template>
    <div>
      <el-tag type="danger" v-for="(item, key) in componentDataMap[data.id].data">{{key}}：{{item}}</el-tag>
      <div v-if="componentDataMap[data.id] && componentDataMap[data.id].data" v-html="componentDataMap[data.id].data.richValue"></div>
    </div>
</template>

<script>
export default {
  name: 'componentRichEditor',
  props:['data'],
  components: {},
  data () {
    return {
    }
  },
  created() {

  },
  computed: {
    componentDataMap() {
      return this.$store.getters.componentDataMap;
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
