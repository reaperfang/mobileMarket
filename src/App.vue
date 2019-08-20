<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import appConfig from '@/system/appConfig';
export default{
  name: 'App',
  created() {
     /* 加载腾讯地图库,jsonp回调 */
      this.$jsonp(appConfig.map.url,{
        key: appConfig.map.key
      }).then(()=>{
        this.$store.commit('SET_MAP_STATE', true);
        this._globalEvent.$emit('mapLoaded');
      })

      this.getShopInfo();
      this.getShopStyle();
  },
  mounted() {
    
  },
  methods: {
    /* 获取店铺信息 */
    getShopInfo() {
      this._apis.shop.getShopInfo({id: '2'}).then((response)=>{
        this.$store.commit('setShopInfo', response);
        this.loading = false;
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
        this.loading = false;
      });
    },

     /* 获取店铺风格 */
    getShopStyle() {
      this._apis.shop.getShopStyle({}).then((response)=>{
        if(response.colorStyle) {
          this.$store.commit('setColorStyle', JSON.parse(response.colorStyle));
        }
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      });
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
