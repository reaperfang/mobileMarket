<template>
  <DialogBase :visible.sync="visible" width="500px" :title="'图片裁剪'" @submit="submit">
    <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="裁剪尺寸：">
           <el-select v-model="form.groupId" placeholder="请选择">
            <el-option
              v-for="item in groupList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
  </DialogBase>
</template>

<script>
import DialogBase from "@/components/DialogBase";
import utils from "@/utils";
export default {
  name: "dialogGroupsMove",
  components: {DialogBase},
  props: {
      data:{},
      arrayData: {},
      dialogVisible: {
          type: Boolean,
          required: true
      },
  },
  data() {
    return {
      form:{
        groupId:''
      },
      groupList:[
        {
          label:'800*800',
          value:'1'
        },
        {
          label:'800*640',
          value:'2'
        },
        {
          label:'640*800',
          value:'3'
        },
        {
          label:'582*166',
          value:'4'
        }
      ],
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
    submit() {
      this.$emit('submit',{moveGroup:{imageId:this.arrayData,groupId:this.form.groupId}})
    }
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