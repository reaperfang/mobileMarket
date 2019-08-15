<template>
  <DialogBase :visible.sync="visible" @submit="submit" title="优惠券/码" :hasCancel="hasCancel">
    <div class="c_container" style="position: relative">
      <el-button class="border_btn send" @click="sendDiscount">{{data.couponType == '0' ? '发放优惠券':'发放优惠码'}}</el-button>
      <el-tabs v-model="activeName">
        <el-tab-pane label="优惠券" name="first">
          <div class="clearfix">
            <p class="fl">共{{data.couponList.length}}张</p>
            <div class="fr">
              <el-select v-model="couponType" style="margin-bottom: 10px">
                <el-option label="全部状态（20）" value="1"></el-option>
                <el-option label="未使用" value="2"></el-option>
                <el-option label="已使用" value="3"></el-option>
              </el-select>
            </div>
          </div>
          <el-table
            :data="data.couponList"
            style="width: 100%"
            :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <el-table-column prop="name" label="优惠券名称"></el-table-column>
            <el-table-column prop="cardSubTitle" label="领取方式"></el-table-column>
            <el-table-column prop="beginTime" label="获取时间"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="优惠码" name="second">
          <div class="clearfix">
            <p class="fl">共{{data.codeList.length}}张</p>
            <div class="fr">
              <el-select v-model="codeType" style="margin-bottom: 10px">
                <el-option label="全部状态（20）" value="1"></el-option>
                <el-option label="未使用" value="2"></el-option>
                <el-option label="已使用" value="3"></el-option>
              </el-select>
            </div>
          </div>
          <el-table
            :data="data.codeList"
            style="width: 100%"
            :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <el-table-column prop="name" label="优惠券名称"></el-table-column>
            <el-table-column prop="cardSubTitle" label="领取方式"></el-table-column>
            <el-table-column prop="beginTime" label="获取时间"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
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
      couponType: '1',
      codeType: "1"
    };
  },
  methods: {
    submit() {
      
    },
    sendDiscount() {
      this.$emit("sendDiscount");
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


