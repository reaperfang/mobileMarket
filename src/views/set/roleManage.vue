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
        <rlTable></rlTable>
      </div>
    </div>       
</template>

<script>
import rlTable from './components/rlTable'
export default {
  name: 'roleManage',
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
  components: {rlTable},
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