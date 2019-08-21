<template>
  <DialogBase :visible.sync="visible" @submit="submit" title="选择赠品" :hasCancel="hasCancel">
    <div class="table_container">
      <div class="fr marB20">
        <div class="input_wrap">
          <el-input placeholder="赠品编号/名称" v-model="key"></el-input>
        </div>
        <el-button type="primary">搜索</el-button>
      </div>
      <div>
        <el-table
          :data="giftList"
          style="width: 100%"
          ref="giftTable"
          :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="businessId" label="赠品编号"></el-table-column>
          <el-table-column prop="goodsName" label="赠品名称"></el-table-column>
          <el-table-column prop="stock" label="剩余库存"></el-table-column>
          <el-table-column prop="goodsName" label="状态"></el-table-column>         
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
        this.$emit('getSelection', {selection: this.$refs.giftTable.selection});
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
    giftList() {
        return JSON.parse(localStorage.getItem('giftList'));
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


