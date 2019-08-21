<template>
  <DialogBase :visible.sync="visible" @submit="submit" title="选择红包" :hasCancel="hasCancel">
    <div class="table_container">
      <div class="fr marB20">
        <div class="input_wrap">
          <el-input placeholder="输入红包名称/红包编号" v-model="key"></el-input>
        </div>
        <el-button type="primary">搜索</el-button>
      </div>
      <div>
        <el-table
          :data="redList"
          style="width: 100%"
          ref="redTable"
          :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
          :default-sort="{prop: 'date', order: 'descending'}"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="name" label="红包名称"></el-table-column>
          <el-table-column prop="name" label="红包类型"></el-table-column>
          <el-table-column prop="hongbaoTotalMoney" label="红包余额"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>         
        </el-table>
      </div>
    </div>
  </DialogBase>
</template>
<script>
import DialogBase from "@/components/DialogBase";
export default {
  name: "redListDialog",
  props: ['data'],
  data() {
    return {
      hasCancel: true,
      key: ""
    };
  },
  methods: {
    submit() {
        this.$emit('getSelectedRed', {selection: this.$refs.redTable.selection});
    },
    getSel() {
      let redArr = this.data.redArr;
      redArr.map((v) => {
        this.redList.forEach(row => {
          if(row.id = v) {
            this.$refs.redTable.toggleRowSelection(row, true);
          }
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
    },
    redList() {
        return JSON.parse(localStorage.getItem('redPacket'));
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
  },
  updated() {
    if(this.data.redArr) {
      this.getSel();
    }
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


