<template>
    <div>
       <el-tag type="danger" v-for="(item, key) in currentComponentData.data">{{key}}：{{item}}</el-tag>
    </div>
</template>

<script>
import componentMixin from './mixin';
export default {
  name: 'componentGoodsGroup',
  mixins:[componentMixin],
  components: {},
  data () {
    return {
    }
  },
  created() {

  },
  computed: {
    
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
