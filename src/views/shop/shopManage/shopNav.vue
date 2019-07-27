<template>
  <p>店铺导航
    <el-button type="text" @click="dialogVisible=true; currentDialog='dialogSelectNavTemplate'">选择店铺导航</el-button>
    <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
  </p>
</template>

<script>
import dialogSelectNavTemplate from '../dialogs/dialogSelectNavTemplate';
export default {
  name: 'shopNav',
  components: {dialogSelectNavTemplate},
  data () {
    return {
      dialogVisible: false,
      currentDialog: '',
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
