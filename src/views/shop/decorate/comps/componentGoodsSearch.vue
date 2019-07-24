<template>
    <div>
       <el-tag type="danger" v-for="(item, key) in componentDataMap[data.id].data">{{key}}：{{item}}</el-tag>
    </div>
</template>

<script>
export default {
  name: 'componentGoodsSearch',
  props:['data'],
  components: {},
  data () {
    return {
      
    }
  },
  created() {

  },
  computed: {
    componentDataMap() {
      return this.$store.getters.componentDataMap;
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
