<template>
  <DialogBase :visible.sync="visible" width="500px" :title="'编辑分组'">
    <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="分组名称：">
           <el-input v-model="form.groupName" class="w250"></el-input>
        </el-form-item>
      </el-form>
  </DialogBase>
</template>

<script>
import DialogBase from "@/components/DialogBase";
import utils from "@/utils";
export default {
  name: "dialogGroups",
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
      form:{
        groupName:''
      },
    };
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
  created() {
  },
  methods: {
  }
};
</script>

<style>

</style>


<style lang="scss" scoped>
.w250{
  width: 250px;
}
</style>