<template>
<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" :inline="true">
    <p>propertyArticleAD</p>
</el-form>
</template>

<script>
export default {
  name: 'propertyArticleAD',
  components: {},
  data () {
    return {
      ruleForm: {
       
      },
      rules: {

      }
    }
  },
  watch: {
    ruleForm: {
      handler(newValue) {
        this.$emit('change', {
          type: this.$parent.currentComponentName,
          data: newValue
        });
      },
      deep: true
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
