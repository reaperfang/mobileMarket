<template>
<el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" :inline="true">
    <p>propertyCoupon</p>
</el-form>
</template>

<script>
export default {
  name: 'propertyCoupon',
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
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
