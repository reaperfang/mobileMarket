<template>
<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" :inline="true">
    <p>componentBase</p>
</el-form>
</template>

<script>
export default {
  name: 'componentBase',
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
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
