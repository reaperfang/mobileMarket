<!--地图组件基类 -->

<script type='es6'>
import Vue from 'vue';
import VueAMap from "vue-amap";
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '23b66fd8d7e808965bc6730567f49a3c',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor','AMap.Geolocation'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
export default {
  name: "mapBase",
  props:{
    //地图宽度
    width:{  
      type: String,
      default: '100%'
    },

    //地图高度
    height:{
      type: String,  
      default: '100%'
    },

    //缩放
    zoom:{  
      type: Number,
      default: 11
    },

    //中心坐标
    center:{  
      type: Array,
      default: ()=>{
        return [39.9046900000,116.4071700000]
      }
    }
  },

  data() {
    return {
      centerObj: null,  //中心经纬度对象
      mapObj: null,   //地图实例
      eventList: {},   //注册事件列表
      searchParams: {},    //搜索参数对象
      keyword: '',   //搜索关键词
      searchService: null  //搜索服务对象
    };
  },

  computed: {
    mapLoaded() {
      return this.$store.getters.mapLoaded;
    }
  },


  mounted(){
    const _self = this;
    if(!this.mapLoaded) {
       /* 加载腾讯地图库,jsnp回调 */
        this.$jsonp('https://map.qq.com/api/js?v=2.exp',{
          key: '7FYBZ-SKMKW-D5HR6-RUHRK-Z76EE-DNBYL'
        }).then(()=>{
          _self.init.call(_self);
          _self.$store.commit('SET_MAP_STATE', true);
        })
    }else {
      this.init();
    }
  },
  methods: {

    //初始化
    init() {
      this.centerObj = new qq.maps.LatLng(this.center[0], this.center[1]);
      this.mapObj = new qq.maps.Map(this.$refs.mapContainer, {
        zoom: this.zoom,
        center: this.centerObj,
        mapTypeId: qq.maps.MapTypeId.ROADMAP
      });

      //初始化事件
      this.inited();

      //初始化搜索
      this.initSearch();
    },

    /* 初始化搜索 */
    initSearch() {
      const _self = this;
      if(!this.$refs.infoDiv){
        return;
      }
      this.searchService = new qq.maps.SearchService({
        //设置搜索范围为北京
        location: this.searchParams.location || '北京',
        //设置搜索页码为1
        pageIndex: this.searchParams.pageIndex || 1,
        //设置每页的结果数为5
        pageCapacity: this.searchParams.pageCapacity || 5,
        //设置展现查询结构到infoDIV上
        panel: this.$refs.infoDiv,
        //设置动扩大检索区域。默认值true，会自动检索指定城市以外区域。
        autoExtend: this.searchParams.autoExtend || true,
        //检索成功的回调函数
        complete: function(results) {
          _self.searchCompleted(results);
        },
        //若服务请求失败，则运行以下函数
        error: function() {
          this.$message.error('搜索出错');
        }
      });
    }

  },
  components: {}
};
</script>

