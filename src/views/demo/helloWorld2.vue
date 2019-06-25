<template>
  <div class="hello">
    <h1>{{ msg }}</h1>


    <!-- 过滤器使用demo -->
    <el-card>
      <h1>过滤器使用</h1>
      <el-row>
        <el-button>日期事件过滤器（{{new Date() | formatDate('yyyy-MM-dd hh:mm:ss')}}）</el-button>
        <el-button>颜色转换过滤器（{{'rgb(45,123,67)' | colorRGB2Hex()}}）</el-button>
        <el-button>数字格式化过滤器（{{3453478565 | formatNumber()}}）</el-button>
        <el-button>百分比格式化过滤器（{{0.2398 | percent(2)}}）</el-button>
      </el-row>
    </el-card>

  </div>
</template>

<script>
import utils from '@/utils';
export default {
  name: 'HelloWorld2',
  data () {
    return {
      msg: '中企电商VUE框架'
    }
  }
}
</script>

<style lang="scss" scoped>
.hello{
      text-align: center;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-card{
  margin-bottom:20px;
}
.line-container::after{
  left:1em;
}
</style>
