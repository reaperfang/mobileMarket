/* demo腾讯地图-天安门 */
<template>
  <div class="wrapper">
    <div id="mapContainer" ref="mapContainer" :style="{width: width, height: height}"></div>
    <el-input
      placeholder="关键词"
      suffix-icon="el-icon-search"
      v-model="keyword" @keyup="search" @blur="search">
    </el-input>
    <div ref="infoDiv" class="info-div">
      <span class="temp">这里是搜索结果列表</span>
    </div>
  </div>
</template>

<script type='es6'>
import mapBase from "@/bizComps/MapBase";
export default {
  name: "demoMap1",
  extends: mapBase,
  data() {
    return {
      //搜索参数对象
      searchParams: {
        location: '北京',
        pageIndex:  1,
        pageCapacity: 4,
        autoExtend: true,
      }
    };
  },
  methods: {
    //实例初始化结束
    inited() {
      this.initEvent();
      let marker = new qq.maps.Marker({
        position: this.centerObj,
        map: this.mapObj
      });

      let marker2 = new qq.maps.Label({
        position: this.centerObj,
        map: this.mapObj,
        content: "天安门"
      });

      let cirle = new qq.maps.Circle({
        center: new qq.maps.LatLng(39.92, 116.405),
        radius: 2000,
        map: this.mapObj
      });
    },

    //初始化事件
    initEvent() {
      this.eventList["click"] = qq.maps.event.addListener(
        this.mapObj,
        "click",
        function(event) {
          alert("您点击了地图。");
        }
      );
      this.eventList["mouseup"] = qq.maps.event.addListener(
        this.mapObj,
        "mouseup",
        function(event) {
          alert("您在地图上抬起了鼠标。");
        }
      );
    },

    //执行搜索
    search() {
      this.searchService.search(this.keyword);
    },

    //搜索结束
    searchCompleted(results) {
      let latlngBounds = new qq.maps.LatLngBounds();
      let markers = [];
      let pois = results.detail.pois;
      for (let i = 0, l = pois.length; i < l; i++) {
        let poi = pois[i];
        //扩展边界范围，用来包含搜索到的Poi点
        latlngBounds.extend(poi.latLng);
        let marker = new qq.maps.Marker({
          map: this.mapObj,
          position: poi.latLng
        });

        marker.setTitle(i + 1);

        markers.push(marker);
      }
      //调整地图视野
      this.mapObj.fitBounds(latlngBounds);
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
.wrapper{
  #mapContainer {
    width: 100%;
    height: 100%;
  }
  .el-input{
    width: 600px;
    margin: 20px;
  }
  .info-div{
    width: 600px;
    height: 300px;
    background: #f3f1f1;
    padding-top: 5px;
    text-align: left;
    .temp{
      margin-left: 5px;
    }
    ol{
      height:300px;
      overflow-y: auto;
    }
  }
}
</style>

