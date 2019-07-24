<template>
    <div>
       <el-tag type="danger" v-for="(item, key) in currentComponentData.data">{{key}}：{{item}}</el-tag>
    </div>
</template>

<script>
import componentMixin from './componentMixin.js';
export default {
  name: 'componentEnterShop',
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
