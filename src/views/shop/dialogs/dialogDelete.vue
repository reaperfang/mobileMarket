<template>
  <DialogBase :visible.sync="visible" width="500px" :title="'删除提示'" @submit="submit">
      <div class="content">
        <p>删除将不能恢复，</p>
        <p>确定要删除吗？</p>
      </div>
  </DialogBase>
</template>

<script>
import DialogBase from "@/components/DialogBase";
import utils from "@/utils";
export default {
  name: "dialogDelete",
  components: {DialogBase},
  data() {
    return {}
  },
  props: {
      data:{
        type: String,
        required: true
      },
      arrayData:{},
      dialogVisible: {
          type: Boolean,
          required: true
      },
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
    submit() {
      if(this.data.type == 'groupId'){
        this.$emit('submit',{deleteGroup:{groupId:this.data}})
      }else{
        this.$emit('submit',{deleteImage:{imageId:this.arrayData}})
      }
    }
  },

}
</script>

<style lang="scss" scoped>
.content{
  line-height: 30px;
  font-size: 14px;
  color: #443D4A;
  text-align: center;
}
</style>
