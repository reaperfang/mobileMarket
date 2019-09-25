<template>
  <DialogBase :visible.sync="visible" @submit="submit" title="发放优惠券" :hasCancel="hasCancel">
    <div class="c_container">
      <p class="marB20">客户ID: {{data.memberSn}}</p>
      <div class="clearfix">
        <div class="fl l_block">
          选择优惠券：
        </div>
        <div class="fl r_block">
          <div class="sel_cont" v-for="(i,index) in selectList" :key="index">
            <el-select v-model="i.appCouponId" style="margin-bottom: 10px">
              <el-option v-for="item in data.allCoupons" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-input-number v-model="i.couponNum" :min="1"></el-input-number>
            <span class="addMainColor pointer" @click="handleDelete(index)" style="margin-left: 20px">删除</span>
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
        {couponNum: 1,appCouponId:"",memberId:"1",receiveType:"1",receiveActivityId:"1"}
      ]
    };
  },
  methods: {
    submit() {
      this._apis.client.distributeCoupon(this.selectList).then((response) => {
        console.log(response);
        this.$emit('refreshPage');
      }).catch((error) => {
        console.log(error);
      })
    },
    handleAdd() {
      this.selectList.push({couponNum: 1,appCouponId:"",memberId:"1",receiveType:"1",receiveActivityId:"1",weChartNickname: this.data.weChartNickname});
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
    .marB20{
      margin-bottom: 20px;
    }
}
</style>


