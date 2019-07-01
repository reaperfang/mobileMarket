<template>
  <div class="hello">
    <h1>{{ msg }}</h1>


    <!-- 图表demo -->
    <el-card>
      <h1>图表</h1>
      <demoChart :width="'900px'" :title="'测试图表'" style="margin: 0 auto;"></demoChart>
    </el-card>
  </div>
</template>

<script>
import utils from '@/utils';
import demoChart from './bizComps/demoChart';
export default {
  name: 'HelloWorld5',
  components: {demoChart},
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
