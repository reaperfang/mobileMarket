<template>
  <div class="module view">
    <div class="phone-head">
      <img :src="require('@/assets/images/shop/phone-head.png')" alt="">
    </div>
    <div class="phone-body">
      <template v-for="(item, key) of componentList">
        <component :is='item' v-bind="editProps" @change='change' :key="key"></component>
      </template>
    </div>
  </div>
</template>

<script>
import utils from '@/utils';
export default {
  name: 'editView',
  components: {},
  data () {
    return {
    }
  },
  computed:{
    currentComponentName() {
      return this.$store.getters.currentComponentName;
    },
    componentList() {
      return this.$store.getters.componentList;
    }
  },
  watch: {
    componentList: {
      handler(newValue) {
        console.log(newValue);
      },
      deep: true
    }
  },
  created() {

  },
  methods: {
    loadCompTemplate() {
      const filePath = `./comps/component${utils.titleCase(this.currentComponentName)}.vue`;
      import(filePath).then(loadedComponent => {
        this.currentComponent = loadedComponent.default
      }).catch(e => {
          console.log(e);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 .module{
    margin-right:20px;
 }
 .view {
    width: 374px;
    border: 1px solid #e2e1e1;
    .phone-head {
      width: 100%;
      height: 64px;
      text-align: center;
      line-height: 64px;
      background: #fff;
      img{
        width:100%;
      }
    }
    .phone-body {
    }
  }
</style>
