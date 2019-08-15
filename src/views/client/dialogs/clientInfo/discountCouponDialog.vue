<template>
  <DialogBase :visible.sync="visible" @submit="submit" title="优惠券/码" :hasCancel="hasCancel">
    <div class="c_container" style="position: relative">
      <el-button class="border_btn send" @click="sendDiscount">{{data.couponType == '0' ? '发放优惠券':'发放优惠码'}}</el-button>
      <el-tabs v-model="activeName">
        <el-tab-pane label="优惠券" name="first">
          <div class="clearfix">
            <p class="fl">共20张</p>
            <div class="fr">
              <el-select v-model="coupon" style="margin-bottom: 10px">
                <el-option label="全部状态（20）" value="1"></el-option>
                <el-option label="未使用" value="2"></el-option>
                <el-option label="已使用" value="3"></el-option>
              </el-select>
            </div>
          </div>
          <el-table
            :data="dataList"
            style="width: 100%"
            :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <el-table-column prop="createUserName" label="优惠券名称"></el-table-column>
            <el-table-column prop="tradeTime" label="领取方式"></el-table-column>
            <el-table-column prop="changeReason" label="获取时间"></el-table-column>
            <el-table-column prop="changeAmount" label="状态"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="优惠码" name="second">
          <div class="clearfix">
            <p class="fl">共20张</p>
            <div class="fr">
              <el-select v-model="coupon" style="margin-bottom: 10px">
                <el-option label="全部状态（20）" value="1"></el-option>
                <el-option label="未使用" value="2"></el-option>
                <el-option label="已使用" value="3"></el-option>
              </el-select>
            </div>
          </div>
          <el-table
            :data="dataList"
            style="width: 100%"
            :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <el-table-column prop="createUserName" label="优惠券名称"></el-table-column>
            <el-table-column prop="tradeTime" label="领取方式"></el-table-column>
            <el-table-column prop="changeReason" label="获取时间"></el-table-column>
            <el-table-column prop="changeAmount" label="状态"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </DialogBase>
</template>
<script>
import clientApi from "@/api/client";
import DialogBase from "@/components/DialogBase";
export default {
  props: ["data"],
  name: "discountCouponDialog",
  data() {
    return {
      hasCancel: true,
      activeName: "first",
      coupon: '1',
      dataList: [
        {
          createUserName: "Coco",
          tradeTime: "2019-08-01",
          changeReason: "消费得积分",
          changeAmount: "50"
        }
      ]
    };
  },
  methods: {
    submit() {
      
    },
    sendDiscount() {
      this.$emit("sendDiscount");
    },
    getUsedCoupon() {
      let params = {usedType:"1", couponType: "1", memberId: "1"};
      this._apis.client.getUsedCoupon(params).then((response) => {
        console.log(response);
      }).catch((error) => {
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
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
    this.getUsedCoupon();
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
/deep/ .el-dialog__body {
  padding: 10px 20px 20px 20px;
}
.c_container {
  text-align: left;
  .input_wrap {
    width: 188px;
    display: inline-block;
  }
  .send {
    position: absolute;
    right: 0;
    z-index: 999;
  }
}
</style>


