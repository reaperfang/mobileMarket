<template>
  <DialogBase :visible.sync="visible" @submit="submit" title="优惠券/码" :hasCancel="hasCancel">
    <div class="c_container" style="position: relative">
      <el-button class="border_btn send" @click="sendDiscount">{{activeName == 'first' ? '发放优惠券':'发放优惠码'}}</el-button>
      <el-tabs v-model="activeName">
        <el-tab-pane label="优惠券" name="first">
          <div class="clearfix">
            <p class="fl">共{{couponList.length || 0}}张</p>
            <div class="fr">
              <el-select v-model="couponType" style="margin-bottom: 10px" @change="getStatus">
                <el-option label="全部状态" value="2"></el-option>
                <el-option label="未使用" value="0"></el-option>
                <el-option label="已使用" value="1"></el-option>
              </el-select>
            </div>
          </div>
          <div>
            <el-table
              :data="couponList"
              style="width: 100%"
              :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
              :default-sort="{prop: 'date', order: 'descending'}"
            >
            <el-table-column prop="name" label="优惠券名称"></el-table-column>
            <el-table-column prop="receiveType" label="领取方式"></el-table-column>
            <el-table-column prop="beginTime" label="获取时间"></el-table-column>
            <el-table-column prop="consumeStatus" label="状态"></el-table-column>
          </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="优惠码" name="second">
          <div class="clearfix">
            <p class="fl">共{{codeList.length || 0}}张</p>
            <div class="fr">
              <el-select v-model="codeType" style="margin-bottom: 10px" @change="getCodeStatus">
                <el-option label="全部状态" value="2"></el-option>
                <el-option label="未使用" value="0"></el-option>
                <el-option label="已使用" value="1"></el-option>
              </el-select>
            </div>
          </div>
          <el-table
            :data="codeList"
            style="width: 100%"
            :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <el-table-column prop="name" label="优惠券名称"></el-table-column>
            <el-table-column prop="receiveType" label="领取方式"></el-table-column>
            <el-table-column prop="beginTime" label="获取时间"></el-table-column>
            <el-table-column prop="consumeStatus" label="状态"></el-table-column>
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
      codeType: "1",
      couponList: [],
      codeList:[],
      reciveMap: 
        {
          0: '主动领取',
          1: '后台派发', 
          101: '应用首页',
          201: '一码多用',
          301: '短信群发',
          401: '限时折扣',
          402: 'N元N件',
          403: '满减/满折',
          404: '满包邮',
          407: '优惠套装',
          408: '赠品',
          501: '特权价',
          502: '积分商城',
          503: '超级海报',
          504: '支付推广',
          505: '找人代付',
          506: '限时秒杀',
          507: '多人拼团',
          601: '节日有礼',
          602: '签到有礼',
          1001: '升级礼包',
          1002: '会员卡礼包'
        }
    };
  },
  methods: {
    submit() {
      
    },
    sendDiscount() {
      this.$emit("sendDiscount");
    },
    getUsedCoupon(status) {
      let params = {usedType:"1", couponType: "0", memberId: "1"};
      if(status !== '2') {
        params.usedStatus = status;
      }
      this._apis.client.getUsedCoupon(params).then((response) => {
          this.couponList = [];
          response.map((v) => {
              v.appCoupon.consumeStatus = v.consumeStatus == 0?'未使用':'已使用';
              v.appCoupon.receiveType = this.reciveMap[v.receiveType];
              this.couponList.push(v.appCoupon);
          })
      }).catch((error) => {
          this.$notify.error({
              title: '错误',
              message: error
          });
      })
    },
    getUsedCode(status) {
      let params = {usedType:"1", couponType: "1", memberId: "1"};
      if(status !== '2') {
        params.usedStatus = status;
      }
      this._apis.client.getUsedCoupon(params).then((response) => {
          this.codeList = [];
          response.map((v) => {
            v.appCoupon.consumeStatus = v.consumeStatus == 0?'未使用':'已使用';
            v.appCoupon.receiveType = this.reciveMap[v.receiveType];
            this.codeList.push(v.appCoupon);
          })
      }).catch((error) => {
          this.$notify.error({
              title: '错误',
              message: error
          });
      })
    },
    getStatus(val) {
      this.getUsedCoupon(val);
    },
    getCodeStatus(val) {
      this.getUsedCode(val);
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
    this.getUsedCode();
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
/deep/ .el-table__body-wrapper{
  height: 320px;
  overflow-y: auto;
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


