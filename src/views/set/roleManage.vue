/* 角色管理 */
<template>
     <div class="main">
      <div class="top_part">
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
        name:'',
      },
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
    text-align: right;
  }
  .bottom_part{
    margin-top:10px;
  }
}
</style>