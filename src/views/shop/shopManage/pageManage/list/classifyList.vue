<template>
  <div>
    <div class="head-wrapper">
      <el-form ref="form" :model="form" label-width="80px" :inline="true">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入分类名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="btns">
        <el-button type="primary">新建分类</el-button>
      </div>
    </div>
    <div class="table">
      <p>微页面分类（共28个）</p>
      <el-table :data="tableList" stripe>
        <el-table-column
          type="selection"  
          width="55">
        </el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column prop="number" label="页面数量"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="editTime" label="编辑时间"></el-table-column>
        <el-table-column prop="account" label="操作账号"></el-table-column>
        <el-table-column prop="" label="操作" :width="'300px'">
          <template slot-scope="scope">
            <span class="table-btn" @click="_routeTo('edit')">编辑</span>
            <span class="table-btn" @click="deleteClassify(scope.row)">删除</span>
            <span class="table-btn" @click="link(scope.row)">链接</span>
          </template>
        </el-table-column>
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
    </div>
  </div>
</template>

<script>
import tableBase from '@/components/TableBase';
export default {
  name: 'classifyList',
  extends: tableBase,
  components: {},
  data () {
    return {
      tableList:[]
    }
  },
  created() {
    this.fetch();
  },
  methods: {

    /* 删除分类 */
    deleteClassify(item) {

    },

    /* 链接 */
    link(item) {

    },

    fetch() {
      this.tableList = [
        {
          name: '店铺首页',
          number: 5515,
          createTime: '2016-09-21  08:50:08',
          editTime: '2016-09-21  08:50:08',
          account: '金花松鼠的',
          browse: 123321,
        },
        {
          name: '店铺首页',
          number: 5515,
          createTime: '2016-09-21  08:50:08',
          editTime: '2016-09-21  08:50:08',
          account: '金花松鼠的',
          browse: 123321,
        },
        {
          name: '店铺首页',
          number: 5515,
          createTime: '2016-09-21  08:50:08',
          editTime: '2016-09-21  08:50:08',
          account: '金花松鼠的',
          browse: 123321,
        },
        {
          name: '店铺首页',
          number: 5515,
          createTime: '2016-09-21  08:50:08',
          editTime: '2016-09-21  08:50:08',
          account: '金花松鼠的',
          browse: 123321,
        },
        {
          name: '店铺首页',
          number: 5515,
          createTime: '2016-09-21  08:50:08',
          editTime: '2016-09-21  08:50:08',
          account: '金花松鼠的',
          browse: 123321,
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.head-wrapper{
  background:#fff;
  padding:20px;
  padding-top:0;
}
.table{
  margin-top:20px;
  background:#fff;
  padding:20px;
  p{
    margin-bottom:20px;
  }
}
thead th{
  background: rgba(230,228,255,1)!important;
  color:#837DFF!important;
}
</style>
