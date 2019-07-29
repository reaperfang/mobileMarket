<template>
  <div>
    <div class="head-wrapper">
      <el-form ref="form" :model="form" label-width="80px" :inline="true">
        <el-form-item label="" prop="classify">
          <el-select v-model="ruleForm.classify" placeholder="请选择分类">
            <el-option label="常用页面" value="1"></el-option>
            <el-option label="其他页面" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="页面名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入页面名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="btns">
        <el-button type="primary" @click="_routeTo('shopEditor')">新建页面</el-button>
        <el-button type="primary" plain>批量改分类</el-button>
        <el-button type="warning" plain>批量删除</el-button>
      </div>
    </div>
    <div class="table">
      <p>微页面28个</p>
      <el-table :data="tableList" stripe>
        <el-table-column
          type="selection"  
          width="55">
        </el-table-column>
        <el-table-column prop="name" label="页面名称"></el-table-column>
        <el-table-column prop="title" label="页面标题"></el-table-column>
        <el-table-column prop="classify" label="所属分类"></el-table-column>
        <el-table-column prop="visitor" label="访客数"></el-table-column>
        <el-table-column prop="browse" label="浏览数"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="" label="操作" :width="'300px'">
          <template slot-scope="scope">
            <span class="table-btn" @click="copyPage(scope.row)">复制</span>
            <span class="table-btn" @click="_routeTo('shopEditor', {pageId: scope.row.id})">编辑</span>
            <span class="table-btn" @click="deletePage(scope.row)">删除</span>
            <span class="table-btn" @click="spread(scope.row)">推广</span>
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
     <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
  </div>
</template>

<script>
import tableBase from '@/components/TableBase';
import uuid from 'uuid/v4';
import dialogPopularize from '../../../dialogs/dialogPopularize';
export default {
  name: 'pageList',
  extends: tableBase,
  components: {dialogPopularize},
  data () {
    return {
      tableList:[],
      dialogVisible: false,
      currentDialog: '',
    }
  },
  created() {
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

    /* 推广 */
    spread(item) {
       this.dialogVisible=true; 
       this.currentDialog='dialogPopularize';
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
      this.tableList = [
        {
          id: uuid(),
          name: '店铺首页',
          title: '页面标题展示',
          classify: '常用页面',
          visitor: 5515,
          browse: 123321,
          createTime: '2016-09-21  08:50:08'
        },
        {
          id: uuid(),
          name: '店铺首页2',
          title: '页面标题展示',
          classify: '常用页面',
          visitor: 5515,
          browse: 123321,
          createTime: '2016-09-21  08:50:08'
        },
        {
          id: uuid(),
          name: '店铺首页3',
          title: '页面标题展示',
          classify: '常用页面',
          visitor: 5515,
          browse: 123321,
          createTime: '2016-09-21  08:50:08'
        },
        {
          id: uuid(),
          name: '店铺首页4',
          title: '页面标题展示',
          classify: '常用页面',
          visitor: 5515,
          browse: 123321,
          createTime: '2016-09-21  08:50:08'
        },
        {
          id: uuid(),
          name: '店铺首页5',
          title: '页面标题展示',
          classify: '常用页面',
          visitor: 5515,
          browse: 123321,
          createTime: '2016-09-21  08:50:08'
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
</style>
