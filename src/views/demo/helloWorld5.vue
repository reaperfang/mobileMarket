<template>
  <div class="hello">
    <h1>{{ msg }}</h1>


    <!-- 图表demo -->
    <el-card>
      <h1>图表</h1>
      <demoChart :title="'测试图表'"></demoChart>
    </el-card>
  </div>
</template>

<script>
import utils from '@/utils';
import demoChart from './components/demoChart';
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
</style>
