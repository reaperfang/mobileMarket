<template>
  <DialogBase :visible.sync="visible" width="500px" :title="'选择功能点'" @submit="submit">
      <div class="content">
        <el-tree
        :data="data.data.functions"
        show-checkbox
        node-key="id"
        ref="tree"
        highlight-current
        :default-checked-keys="data.functions"
        :props="defaultProps">
        </el-tree>
        <!-- :default-checked-keys="toNum(data.functions)" -->
      </div>
  </DialogBase>
</template>

<script>
import DialogBase from "@/components/DialogBase";
import utils from "@/utils";
export default {
  name: "dialogTree",
  components: {DialogBase},
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      functions:[],
    }
  },
  props: {
      dialogVisible: {
          type: Boolean,
          required: true
      },
      data:{
          type: Object,
          required: true
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
    },
  },
  created(){ },
  methods: {
    submit() {
      let checkedKeys = this.$refs.tree.getCheckedKeys()
      let HalfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
      this.functions =  checkedKeys.concat(HalfCheckedKeys)
      this.$emit('submit',{shopId:this.data.id,functions:this.functions})
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
