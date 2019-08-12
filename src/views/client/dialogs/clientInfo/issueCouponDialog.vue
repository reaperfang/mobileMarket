<template>
  <DialogBase :visible.sync="visible" @submit="submit" title="发放优惠券" :hasCancel="hasCancel">
    <div class="c_container">
      <p class="marB20">客户ID: 0001</p>
      <div class="clearfix">
        <div class="fl l_block">
          选择优惠券：
        </div>
        <div class="fl r_block">
          <div class="sel_cont" v-for="(i,index) in selectList" :key="index">
            <el-select v-model="i.couponId" style="margin-bottom: 10px">
              <el-option v-for="item in data.allCoupons" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-input-number v-model="i.num" :min="1"></el-input-number>
            <span class="marL20 addMainColor pointer" @click="handleDelete(index)">删除</span>
          </div>
          <span class="add pointer" @click="handleAdd">添加</span>
        </div>
      </div>
    </div>
  </DialogBase>
</template>
<script>
import clientApi from "@/api/client";
import DialogBase from "@/components/DialogBase";
export default {
  props: ["data"],
  name: "issueCouponDialog",
  data() {
    return {
      hasCancel: true,
      coupon:"",
      selectList: [
        {num: 1,couponId:""}
      ]
    };
  },
  methods: {
    submit() {
      
    },
    handleAdd() {
      this.selectList.push({num: 1, couponId:""});
    },
    handleDelete(index) {
      this.selectList.splice(index, 1);
    }
  },
  computed: {
    visible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this.$emit("update:dialogVisible", val);
      }
    }
  },
  mounted() {
  
  },
  props: {
    data: {},
    dialogVisible: {
      type: Boolean,
      required: true
    }
  },
  components: {
    DialogBase
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-input-number--small .el-input-number__decrease, .el-input-number--small .el-input-number__increase{
  background-color: #655EFF;
  color: #fff;
}
/deep/ .el-input-number--small{
  width: 110px;
}
.c_container {
    text-align: left;
    .l_block{
      width: 86px;
      margin-top: 8px;
    }
    .r_block{
      position: relative;
      .add{
        position: absolute;
        right: -44px;
        top: 8px;
        color: #655EFF;
      }
    }
}
</style>


