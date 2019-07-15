<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <!-- element-ui框架使用demo -->
    <el-card>
      <h1>element-ui</h1>
      <el-row>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </el-row>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  components: {},
  data () {
    return {
      msg: '中企电商VUE框架'
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
