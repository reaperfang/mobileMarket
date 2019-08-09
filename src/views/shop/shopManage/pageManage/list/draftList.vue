<template>
  <div>
    <div class="head-wrapper">
      <el-form ref="ruleForm" :model="ruleForm" label-width="80px" :inline="true">
        <el-form-item label="" prop="classify">
          <el-select v-if="classifyList.length" v-model="ruleForm.pageCategoryInfoId" placeholder="请选择分类">
            <el-option label="全部分类" value=""></el-option>
            <el-option v-for="(item, key) of classifyList" :key="key" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="页面名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入页面名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="fetch">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="btns">
        <el-button type="primary">新建页面</el-button>
        <el-button type="primary" plain>批量改分类</el-button>
        <el-button type="warning" plain>批量删除</el-button>
      </div>
    </div>
    <div class="table">
      <p>草稿（共28个）</p>
      <el-table :data="tableList" stripe>
        <el-table-column
          type="selection"  
          width="55">
        </el-table-column>
        <el-table-column prop="name" label="页面名称"></el-table-column>
        <el-table-column prop="title" label="页面标题"></el-table-column>
        <el-table-column prop="pageCategoryName" label="所属分类"></el-table-column>
        <el-table-column prop="vv" label="访客数"></el-table-column>
        <el-table-column prop="pv" label="浏览数"></el-table-column>
        <el-table-column prop="updateTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateUserName" label="操作账号"></el-table-column>
        <el-table-column prop="" label="操作" :width="'300px'">
          <template slot-scope="scope">
            <span class="table-btn" @click="copyPage(scope.row)">复制</span>
            <span class="table-btn" @click="_routeTo('shopEditor', {pageId: scope.row.id})">编辑</span>
            <span class="table-btn" @click="deletePage(scope.row)">删除</span>
            <span class="table-btn" @click="setIndex(scope.row)">设为首页</span>
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
import uuid from 'uuid/v4';
export default {
  name: 'draftList',
  extends: tableBase,
  components: {},
  data () {
    return {
      tableList:[],
      classifyList: [],
       ruleForm: {
        status: '1',
        pageCategoryInfoId: '',
        name: ''
      }
    }
  },
  created() {
    this.getClassifyList();
    this.fetch();
  },
  methods: {

   /* 复制页面 */
    copyPage(item) {
      this.$confirm('确定复制此页面吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
        })
    },

    /* 删除页面 */
    deletePage(item) {
       this.$confirm('确定删除此页面吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
        })
    },

    /* 设为首页 */
    setIndex(item) {
       this.$confirm('确定将此页面设为首页吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
        })
    },

    fetch() {
      this._apis.shop.getPageList(this.ruleForm).then((response)=>{
        this.tableList = response.list;
        this.total = response.total;
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      });
    },

    
    //获取分类列表
    getClassifyList() {
      this._apis.shop.selectAllClassify({}).then((response)=>{
        this.classifyList = response;
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.head-wrapper{
  background:#fff;
  padding:20px;
  padding-top:0;
}
/deep/ .table{
  margin-top:20px;
  background:#fff;
  padding:20px;
  p{
    margin-bottom:20px;
  }
}
/deep/ thead th{
  background: rgba(230,228,255,1)!important;
  color:#837DFF!important;
}
</style>
