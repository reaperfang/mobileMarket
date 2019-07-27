<template>
<div>propertyArticleAD
    <el-button type="text" @click="dialogVisible=true; currentDialog='dialogGoodsSearchDemo'">查看示例</el-button>
   <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
</div>
</template>

<script>
import propertyMixin from './mixin';
import dialogGoodsSearchDemo from '../../dialogs/dialogGoodsSearchDemo';
export default {
  name: 'propertyGoodsSearch',
  mixins: [propertyMixin],
  components: {dialogGoodsSearchDemo},
  data () {
    return {
      dialogVisible: false,
      currentDialog: '',
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
