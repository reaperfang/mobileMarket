/* 选择N元N件弹框 */
<template>
  <DialogBase :visible.sync="visible" width="816px" :title="'选择N元N件活动'" @submit="submit">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0" :inline="true">
      <div class="inline-head">
        <el-form-item label="" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-button type="primary" @click="fetch">搜  索</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-table :data="tableList" stripe ref="multipleTable" @selection-change="handleSelectionChange"  v-loading="loading">
        <el-table-column
          type="selection"  
          width="55">
        </el-table-column>
        <el-table-column prop="name" label="活动标题">
          <template slot-scope="scope">
            <div class="name_wrapper">
              <img :src="scope.row.activityPic" alt="">
              <p>{{scope.row.name}}</p>
            </div>
          </template>
        </el-table-column>
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
  name: "dialogSelectNyuan",
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
      pageNum: 1,
      ruleForm: {
        pageNum: 1,
        name: '',
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
  mounted() {
  },
  methods: {
    fetch() {
      this.loading = true;
      this._apis.shop.getNyuanList(this.ruleForm).then((response)=>{
        this.tableList = response.list;
        this.total = response.total;
        this.loading = false;
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
        this.loading = false;
      });
    },

     //当前页码改变
    handleCurrentChange(pIndex=1) {
      this.loading = true
      this.pageNum = pIndex
      this.ruleForm.pageNum = pIndex
      this.fetch()
    },

    /* 向父组件提交选中的数据 */
    submit() {
      this.$emit('dialogDataSelected',  this.multipleSelection);
    },
  }
};
</script>

<style lang="scss" scoped>
.name_wrapper{
    display: flex;
    flex-direction: row;
    align-items: center;
    img{
      width: 50px;
      height: 30px;
      display: block;
      margin-right: 10px;
      border: 1px solid #ddd;
    }
}
</style>