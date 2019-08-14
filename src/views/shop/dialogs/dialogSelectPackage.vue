<template>
  <DialogBase :visible.sync="visible" width="816px" :title="'选择优惠套餐活动'" @submit="submit">
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
    <el-table :data="tableList" stripe ref="multipleTable" @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"  
          width="55">
        </el-table-column>
        <el-table-column prop="title" label="优惠活动标题">
          <template slot-scope="scope">
            <div class="name_wrapper">
              <img :src="scope.row.url" alt="加载错误">
              <p>{{scope.row.title}}</p>
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
  name: "dialogSelectPackage",
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
  mounted() {
  },
  methods: {
    fetch() {
      this.tableList = [
         {
          id: uuid(),
          url: 'http://img.yxp.126.net/VUKxW42-iWGgVKQ30HxFpg==/927987815164602.jpg',
          title: '优惠活动1',
          desc: '这是商品描述',
          createTime: '2019-08-23 12:44:23',
          price: 20
        },
        {
          id: uuid(),
          url: 'http://img.yxp.126.net/VUKxW42-iWGgVKQ30HxFpg==/927987815164602.jpg',
          title: '优惠活动2',
          desc: '这是商品描述2',
          createTime: '2019-08-23 12:44:23',
          price: 37
        },
        {
          id: uuid(),
          url: 'http://img.yxp.126.net/VUKxW42-iWGgVKQ30HxFpg==/927987815164602.jpg',
          title: '优惠活动3',
          desc: '这是商品描述2',
          createTime: '2019-08-23 12:44:23',
          price: 78
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
.name_wrapper{
    display: flex;
    flex-direction: row;
    align-items: center;
    img{
      width:50px;
      height:30px;
      margin-right:10px;
    }
}
</style>