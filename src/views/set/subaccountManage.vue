/*子账号管理 */
<template>
    <div class="main">
      <div class="top_part">
        <div class="search">
          <el-form ref="form" :inline="true" :model="form" label-width="70px">
            <el-form-item label="店铺:" prop="name">
              <el-select v-model="form.name" placeholder="请选择">
                <el-option
                  v-for="item in shops"
                  :key="item.id"
                  :label="item.shopName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="角色:" prop="role">
              <el-select v-model="form.role" placeholder="请选择">
                <el-option
                  v-for="item in roles"
                  :key="item.id"
                  :label="item.shopName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" @click="submit">查询</el-button>
            <el-button type="primary" @click="reset">重置</el-button>
          </el-form>
        </div>
        <div class="create">
          <el-button type="primary" @click="_routeTo('createAccount')">新建子账号</el-button>
        </div>
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
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="memberInfoId"
          label="角色">
        </el-table-column>
        <el-table-column
          prop="amount"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="status"
          label="添加人">
        </el-table-column>
        <el-table-column
          prop="tradeDetailSn"
          label="创建时间">
        </el-table-column>
        <el-table-column
          prop="applyTime"
          label="初始密码"
          sortable>
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
  name: 'subaccountManage',
  extends: TableBase,
  data() {
    return {
      form:{
        name:'',
        role:'',
        startIndex:1,
        pageSize:10
      },
      shops:[ ],
      roles:[],
      dataList: [],
      multipleSelection:[]
    }
  },
  watch: {
    
  },
  created() {
    this.getSubAccount()
    this.getShops()
  },
  destroyed() {
    
  },
  methods: {
    getShops(){
      let data = this.$store.state.user.userInfo.shopInfoMap
      for(let key in data){
        let shopObj = data[key]
        this.shops.push(shopObj)
      }
    },

    getRoles(){

    },
    
    getSubAccount(){
      this._apis.set.getSubAccount(this.form).then(response =>{
        console.log('11111',response)
      }).catch(error =>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },

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
}
</style>