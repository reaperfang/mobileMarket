<template>
<div v-if="componentDataMap[data.id] && componentDataMap[data.id].data" v-html="componentDataMap[data.id].data.richValue"></div>
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
  computed: {
    componentDataMap() {
      return this.$store.getters.componentDataMap;
    }
  },
  created() {

  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
