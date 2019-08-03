<template>
  <div>
    <div class="on_off">
      <p>店铺的各个页面可以通过导航串联起来。通过精心设置的导航，方便买家在栏目间快速切换，引导买家前往你期望的页面。 </p>
      <el-switch
        v-model="ruleForm.openAD"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
    </div>
    <div class="ad_head_wrapper">
      <el-form ref="ruleForm" :model="ruleForm" label-width="80px" :inline="true">
        <el-form-item label="" prop="ADType">
          <el-select v-model="ruleForm.ADType" placeholder="请选择广告类型">
            <el-option label="全部广告" :value="1"></el-option>
            <el-option label="展示中" :value="2"></el-option>
            <el-option label="已过期" :value="3"></el-option>
            <el-option label="排期中" :value="4"></el-option>
            <el-option label="停用" :value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入广告名称"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="btns">
        <el-button type="primary" @click="_routeTo('createAD')">新建广告</el-button>
        <el-button type="warning" plain>批量删除</el-button>
      </div>
    </div>
    <div class="table">
      <p>广告（28个）</p>
      <el-table :data="tableList" stripe>
        <el-table-column
          type="selection"  
          width="55">
        </el-table-column>
        <el-table-column prop="url" label="广告图">
          <template slot-scope="scope">
            <div class="name_wrapper">
              <img :src="scope.row.url" alt="加载错误">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="广告名称"></el-table-column>
        <el-table-column prop="visitor" label="访客数"></el-table-column>
        <el-table-column prop="browse" label="浏览数"></el-table-column>
        <el-table-column prop="showTime" label="展示时间" :width="'400px'"></el-table-column>
        <el-table-column prop="status" label="状态"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="account" label="操作账号"></el-table-column>
        <el-table-column prop="" label="操作" :width="'300px'">
          <template slot-scope="scope">
            <span class="table-btn" @click="stopAD(scope.row)">停用</span>
            <span class="table-btn" @click="_routeTo('createAD', {ADId: scope.row.id})">编辑</span>
            <span class="table-btn" @click="deleteAD(scope.row)">删除</span>
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
  name: 'ADManageIndex',
  extends: tableBase,
  components: {},
  data () {
    return {
      tableList:[],
      ruleForm: {
        openAD: true,
        ADType: 1,
        name: ''
      },
      rules: {}
    }
  },
  created() {
    this.fetch();
  },
  methods: {

    /* 停用广告 */
    stopAD(item) {
      this.$confirm('确定停用此广告吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
        })
    },

    /* 删除广告 */
    deleteAD(item) {
       this.$confirm('确定删除此启动广告吗？', '提示', {
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
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564738386683&di=cd021b8260860d8b6e1df10742e911e8&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D671676918%2C3573661553%26fm%3D214%26gp%3D0.jpg',
          title: '启动广告1',
          visitor: 5515,
          browse: 123321,
          showTime: '2016-09-21  08:50:08 - 2016-09-22  08:50:08',
          status: '展示中',
          createTime: '2016-09-21  08:50:08',
          account: 'fangyuan'
        },
        {
          id: uuid(),
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564738386683&di=cd021b8260860d8b6e1df10742e911e8&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D671676918%2C3573661553%26fm%3D214%26gp%3D0.jpg',
          title: '启动广告1',
          visitor: 5515,
          browse: 123321,
          showTime: '2016-09-21  08:50:08 - 2016-09-22  08:50:08',
          status: '展示中',
          createTime: '2016-09-21  08:50:08',
          account: 'fangyuan'
        },
        {
          id: uuid(),
          url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564738386683&di=cd021b8260860d8b6e1df10742e911e8&imgtype=jpg&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D671676918%2C3573661553%26fm%3D214%26gp%3D0.jpg',
          title: '启动广告1',
          visitor: 5515,
          browse: 123321,
          showTime: '2016-09-21  08:50:08 - 2016-09-22  08:50:08',
          status: '展示中',
          createTime: '2016-09-21  08:50:08',
          account: 'fangyuan'
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.on_off{
  height:36px;
  background: rgb(255,233,210);
  margin-bottom:20px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 9px;
  p{
    color:rgba(146,146,155,1);
  }
}
.ad_head_wrapper{
  background:#fff;
  padding:20px;
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
