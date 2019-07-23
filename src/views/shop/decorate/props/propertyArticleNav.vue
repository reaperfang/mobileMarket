<template>
<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" :inline="true">
    <p>propertyArticleNav</p>
</el-form>
</template>

<script>
export default {
  name: 'propertyArticleNav',
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
          id: this.$parent.currentComponentId,
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
