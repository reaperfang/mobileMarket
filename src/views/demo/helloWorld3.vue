<template>
  <div class="hello">
    <h1>{{ msg }}</h1>


    <!-- 腾讯地图demo -->
    <el-card>
      <div class="map-demo">
        <div class="map1">
          <h1>腾讯地图1-天安门</h1>
          <demoMap1 :width="'600px'" :height="'300px'" :zoom="11" :center="[39.9046900000,116.4071700000]"></demoMap1>
        </div>
        <div class="map2">
          <h1>腾讯地图2-数码庄园</h1>
          <demoMap2 :width="'600px'" :height="'300px'" :zoom="15" :center="[39.7832100000,116.4994700000]"></demoMap2>
        </div>
      </div>
    </el-card>

  </div>
</template>

<script>
import utils from '@/utils';
import demoMap1 from './bizComps/demoMap1';
import demoMap2 from './bizComps/demoMap2';
export default {
  name: 'HelloWorld3',
  components: {demoMap1, demoMap2},
  data () {
    return {
      msg: '中企电商VUE框架'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
