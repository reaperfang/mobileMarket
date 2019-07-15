<!--富文本数据弹窗-->
<template>
  <el-dialog title="富文本数据" :visible.sync="dialogFormVisible"  @close="close" :width="dialogWidth" class="gl-dialog">
    <div v-html="data"></div>
  </el-dialog>
</template>

<script>
import dialogBase from '@/components/DialogBase';
export default {
  name: 'demoDialog',
  extends: dialogBase,
  props: ['data'],
  data() {
    return {
      
    }
  },
  methods: {
     
  }
}
</script>
<style>
</style>
