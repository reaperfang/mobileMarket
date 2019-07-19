<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    这是基础信息页
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>

  </el-form>
</template>

<script>
export default {
  name: 'propertyGoods',
  components: {},
  data () {
    return {
      ruleForm: {
        value:1
      },
      rules: {}
      
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
