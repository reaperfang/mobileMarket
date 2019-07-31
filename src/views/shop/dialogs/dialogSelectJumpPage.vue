<template>
  <DialogBase :visible.sync="visible" width="816px" :title="'选择跳转页面'">
    <div class="jump_wrapper" style="background:rgb(242,242,249);">
      <el-tabs v-model="currentTab">
        <el-tab-pane label="微页面" name="microPage"></el-tab-pane>
        <el-tab-pane label="微页面分类" name="microPageClassify"></el-tab-pane>
        <el-tab-pane label="商品分组" name="goodsGroup"></el-tab-pane>
        <el-tab-pane label="商品详情" name="goodsDetail"></el-tab-pane>
        <el-tab-pane label="营销活动" name="marketCampaign"></el-tab-pane>
        <el-tab-pane label="系统页面" name="systemPage"></el-tab-pane>
      </el-tabs>
      
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0" :inline="true">
      <div class="inline-head">
        <el-form-item label="" prop="name">
          <el-select v-model="ruleForm.classify" placeholder="请选择分类">
            <el-option label="全部分类" :value="1"></el-option>
            <el-option label="常用页面" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入页面名称"></el-input>
        </el-form-item>
        <el-form-item label="" prop="">
          <el-button type="primary" @click="fetch">搜  索</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-table :data="tableList" stripe ref="multipleTable" @selection-change="handleSelectionChange">
      
        <template v-if="currentTab === 'microPage'">
          <el-table-column
            type="selection"  
            width="55">
          </el-table-column>
          <el-table-column prop="pageName" label="页面名称"></el-table-column>
          <el-table-column prop="pageTitle" label="页面标题"></el-table-column>
          <el-table-column prop="classify" label="所属分类"></el-table-column>
          <el-table-column prop="visitor" label="访客数"></el-table-column>
          <el-table-column prop="browse" label="浏览数"></el-table-column>
        </template>

        <template v-if="currentTab === 'microPageClassify'">
          <el-table-column
            type="selection"  
            width="55">
          </el-table-column>
          <el-table-column prop="classifyName" label="分类名称"></el-table-column>
          <el-table-column prop="pageNumber" label="页面数量"></el-table-column>
          <el-table-column prop="visitor" label="访客数"></el-table-column>
          <el-table-column prop="browse" label="浏览数"></el-table-column>
        </template>

        <template v-if="currentTab === 'goodsGroup'">
          <el-table-column
            type="selection"  
            width="55">
          </el-table-column>
          <el-table-column prop="classifyName" label="分类名称"></el-table-column>
          <el-table-column prop="goodsNumber" label="商品数量"></el-table-column>
        </template>

        <template v-if="currentTab === 'goodsDetail'">
          <el-table-column
            type="selection"  
            width="55">
          </el-table-column>
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column prop="classify" label="所属分类"></el-table-column>
          <el-table-column prop="visitor" label="访客数"></el-table-column>
          <el-table-column prop="browse" label="浏览数"></el-table-column>
          <el-table-column prop="totalSales" label="总销量"></el-table-column>
        </template>

        <template v-if="currentTab === 'marketCampaign'">
          <el-table-column
            type="selection"  
            width="55">
          </el-table-column>
          <el-table-column prop="activityName" label="活动名称"></el-table-column>
          <el-table-column prop="activityType" label="活动类型"></el-table-column>
          <el-table-column prop="visitor" label="访客数"></el-table-column>
          <el-table-column prop="browse" label="浏览数"></el-table-column>
        </template>

        <template v-if="currentTab === 'systemPage'">
          <el-table-column
            type="selection"  
            width="55">
          </el-table-column>
          <el-table-column prop="pageName" label="页面名称"></el-table-column>
        </template>
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
  </DialogBase>
</template>

<script>
import DialogBase from "@/components/DialogBase";
import tableBase from '@/components/TableBase';
import utils from "@/utils";
import uuid from 'uuid/v4';
export default {
  name: "dialogSelectJumpPage",
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
      currentTab: 'microPage',
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
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564155770253&di=f38112c9d66f6693432e18152abe5aa7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201203%2F05%2F20120305205212_MNNcA.jpeg',
          pageName: '页面1',
          pageTitle: '这是页面标题',
          classify: '常用页面',
          visitor: 23445,
          browse: 78637
        },
        {
          id: uuid(),
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564155770253&di=f38112c9d66f6693432e18152abe5aa7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201203%2F05%2F20120305205212_MNNcA.jpeg',
          pageName: '页面2',
          pageTitle: '这是页面标题',
          classify: '常用页面',
          visitor: 23445,
          browse: 78637
        },
        {
          id: uuid(),
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564155770253&di=f38112c9d66f6693432e18152abe5aa7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201203%2F05%2F20120305205212_MNNcA.jpeg',
          pageName: '页面3',
          pageTitle: '这是页面标题',
          classify: '常用页面',
          visitor: 23445,
          browse: 78637
        },
        {
          id: uuid(),
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564155770253&di=f38112c9d66f6693432e18152abe5aa7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201203%2F05%2F20120305205212_MNNcA.jpeg',
          pageName: '页面4',
          pageTitle: '这是页面标题',
          classify: '常用页面',
          visitor: 23445,
          browse: 78637
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
.jump_wrapper{
  padding:0 20px;
}
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
.inline-head{
  justify-content: flex-end;
}
</style>