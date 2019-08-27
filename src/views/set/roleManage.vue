/* 角色管理 */
<template>
     <div class="main">
      <div class="top_part">
        <div class="search">
          <el-form ref="form" :inline="true" :model="form" label-width="70px">
            <el-form-item label="店铺:" prop="shop">
              <el-select v-model="form.shop" placeholder="请选择">
                <el-option
                  v-for="item in shops"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" @click="submit">查询</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
          </el-form>
        </div>
        <el-button type="primary" @click="_routeTo('createRole')">新建角色</el-button>
      </div>
      <div class="bottom_part">
        <el-table
        :data="dataList"
        style="width: 100%"
        :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
        :default-sort = "{prop: 'name9', order: 'descending'}"
        @selection-change="handleSelectionChange"
        >
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
          prop="cashoutSn"
          label="角色名称">
        </el-table-column>
        <el-table-column
          prop="memberInfoId"
          label="角色描述">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="包含人数">
        </el-table-column>
        <el-table-column
          prop="status"
          label="创建人">
        </el-table-column>
        <el-table-column
          prop="tradeDetailSn"
          label="创建时间">
        </el-table-column>
        <el-table-column
        label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" style="color:#FD4C2B">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-top:10px;">批量删除</el-button>
      <div class="page_styles">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="sizes, prev, pager, next"
          :total="100">
        </el-pagination>
      </div>
      </div>
    </div>       
</template>

<script>
import TableBase from "@/components/TableBase";
export default {
  name: 'roleManage',
  extends: TableBase,
  data() {
    return {
      form:{
        shop:'',
      },
      shops:[
        {
          label:'店铺1',
          value:1
        }
      ],
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection:[]
    }
  },
  watch: {
    
  },
  created() {

  },
  destroyed() {
    
  },
  methods: {
    submit(){},
    reset(){},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.main{
  width: 100%;
  background: #fff;
  padding:20px;
  .top_part{
    display: flex;
    justify-content: space-between;
  }
  .bottom_part{
    margin-top:10px;
  }
}
</style>