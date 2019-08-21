<template>
  <DialogBase :visible.sync="visible" @submit="submit" title="选择优惠券" :hasCancel="hasCancel">
    <div class="table_container">
      <div class="fr marB20">
        <div class="input_wrap">
          <el-input placeholder="优惠券名称/优惠券编号" v-model="key"></el-input>
        </div>
        <el-button type="primary">搜索</el-button>
      </div>
      <div>
        <el-table
          :data="couponList"
          style="width: 100%"
          ref="couponTable"
          :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="businessId" label="优惠券编号"></el-table-column>
          <el-table-column prop="name" label="优惠券名称"></el-table-column>
          <el-table-column prop="useTypeDiscount" label="限领次数"></el-table-column>
          <el-table-column prop="remainStock" label="当前剩余数量"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>         
        </el-table>
      </div>
    </div>
  </DialogBase>
</template>
<script>
import DialogBase from "@/components/DialogBase";
export default {
  name: "levelInfoDialog",
  data() {
    return {
      hasCancel: true,
      key: ""
    };
  },
  methods: {
    submit() {
        this.$emit('getSelectedCoupon', {selection: this.$refs.couponTable.selection});
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
    },
    couponList() {
        return JSON.parse(localStorage.getItem('allCoupons'));
    }
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
.table_container {
  width: 100%;
  margin: 0 auto;
  .input_wrap {
    display: inline-block;
    width: 230px;
  }
  .marB20{
    margin-bottom: 20px;
  }
}
</style>


