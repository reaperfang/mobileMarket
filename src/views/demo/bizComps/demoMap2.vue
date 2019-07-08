/* demo腾讯地图-数码庄园 */
<template>
  <div id="mapContainer" ref="mapContainer" :style="{width: width, height: height}"></div>
</template>

<script type='es6'>
import mapBase from "@/bizComps/MapBase";
export default {
  name: "demoMap2",
  extends: mapBase,
  data() {
    return {
    };
  },
  methods: {

    //实例初始化结束
    inited() {
      this.initEvent();
      var marker = new qq.maps.Marker({
          position: this.centerObj,
          map: this.mapObj
      });

      var marker2 = new qq.maps.Label({
          position: this.centerObj,
          map: this.mapObj,
          content:'数码庄园'
      });
    },

    //初始化事件
    initEvent() {
       
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
#mapContainer{
  width:100%;
  height:100%;
}
</style>

