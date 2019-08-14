<template>
  <DialogBase :visible.sync="visible" width="816px" :title="'选择优惠券'" @submit="submit">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0" :inline="true">
      <div class="inline-head">
        <el-form-item label="" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入优惠券名称"></el-input>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-button type="primary" @click="fetch">搜  索</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-table :data="tableList" stripe ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"  
          width="55">
        </el-table-column>
        <el-table-column prop="title" label="优惠券名称"></el-table-column>
        <el-table-column prop="goods" label="适用商品"></el-table-column>
        <el-table-column prop="content" label="优惠内容"></el-table-column>
        <el-table-column prop="receiverLimit" label="领取人限制"></el-table-column>
        <el-table-column prop="timesLimit" label="限领次数"></el-table-column>
        <el-table-column prop="remainingStock" label="剩余库存"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="Number(startIndex) || 1"
          :page-sizes="[5, 10, 20, 50, 100, 200, 500]"
          :page-size="pageSize*1"
          :total="total*1"
          layout="total, sizes, prev, pager, next, jumper"
          >
        </el-pagination>
      </div>
  </DialogBase>
</template>

<script>
import DialogBase from "@/components/DialogBase";
import tableBase from '@/components/TableBase';
import utils from "@/utils";
import uuid from 'uuid/v4';
export default {
  name: "dialogSelectCoupon",
  extends: tableBase,
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
      tableList: [],
      multipleSelection: [],
      ruleForm: {
        name: ''
      },
      rules: {}
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
    fetch() {
      this.tableList = [
        {
          id: uuid(),
          title: '优惠券1',
          goods: '全店商品',
          content: '满20，减10',
          receiverLimit: '不限制',
          timesLimit: '不限制',
          remainingStock: 124234,
          status: 'false'
        },
        {
          id: uuid(),
          title: '优惠券2',
          goods: '全店商品',
          content: '满20，减10',
          receiverLimit: '不限制',
          timesLimit: '不限制',
          remainingStock: 124234,
          status: 'false'
        },
        {
          id: uuid(),
          title: '优惠券3',
          goods: '全店商品',
          content: '满20，减10',
          receiverLimit: '不限制',
          timesLimit: '不限制',
          remainingStock: 124234,
          status: 'true'
        }
      ]
    },

    /* 向父组件提交选中的数据 */
    submit() {
      this.$emit('dialogDataSelected',  this.multipleSelection);
    },
  }
};
</script>

<style lang="scss">
</style>