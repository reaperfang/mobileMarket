<!--富文本数据弹窗-->
<template>
  <DialogBase :visible.sync="visible" title="富文本数据">
     <div v-html="data"></div>
  </DialogBase>
</template>

<script>
import DialogBase from '@/components/DialogBase';
export default {
  name: 'demoDialog',
  components: {DialogBase},
  props: {
      data: {},
      dialogVisible: {
          type: Boolean,
          required: true
      },
  },
  data() {
    return {
      
    }
  },
   computed: {
        visible: {
            get() {
                return this.dialogVisible
            },
            set(val) {
                this.$emit('update:dialogVisible', val)
            }
        }
    },
  methods: {
     
  }
}
</script>
<style>
</style>
