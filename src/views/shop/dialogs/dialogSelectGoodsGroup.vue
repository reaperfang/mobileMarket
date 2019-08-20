选择商品组弹框
<template>
  <DialogBase :visible.sync="visible" width="816px" :title="'选择商品分组'" @submit="submit">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0" :inline="true">
      <div class="inline-head">
        <el-form-item label="" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
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
        <el-table-column prop="title" label="分组名称"></el-table-column>
        <el-table-column prop="number" label="商品数量"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
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
  name: "dialogSelectGoodsGroup",
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
          title: '商品分组1',
          desc: '这是商品描述',
          createTime: '2019-08-23 12:44:23',
          number: 20
        },
        {
          id: uuid(),
          title: '商品分组2',
          desc: '这是商品描述2',
          createTime: '2019-08-23 12:44:23',
          number: 37
        },
        {
          id: uuid(),
          title: '商品分组3',
          desc: '这是商品描述2',
          createTime: '2019-08-23 12:44:23',
          number: 78
        }
      ]
    },

    /* 向父组件提交选中的数据 */
    submit() {
      this.$emit('dialogGoodsGroupSelected',  this.multipleSelection);
    },
  }
};
</script>

<style lang="scss" scoped>
.name_wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    width: 50px;
    height: 30px;
    display: block;
    margin-right: 10px;
    border: 1px solid #ddd;
  }
}
</style>