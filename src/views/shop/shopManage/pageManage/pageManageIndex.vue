<template>
  <p>页面管理首页</p>
</template>

<script>
import pageList from './list/pageList';
import classifyList from './list/classifyList';
import draftList from './list/draftList';
export default {
  name: 'pageManageIndex',
  components: {pageList, classifyList, draftList},
  data () {
    return {
    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>
