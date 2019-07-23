<template>
<p>componentRichEditor, {{componentDataMap[data.id].data}}</p>
</template>

<script>
export default {
  name: 'componentRichEditor',
  props:['data'],
  components: {},
  data () {
    return {
      ruleForm: {
       
      },
      rules: {

      }
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
