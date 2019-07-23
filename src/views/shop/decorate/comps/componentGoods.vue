<template>
<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" :inline="true">
    <p>componentGoods, {{componentDataMap[data.id].data}}</p>
</el-form>
</template>

<script>
export default {
  name: 'componentGoods',
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
