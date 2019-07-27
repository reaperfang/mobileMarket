/*子账号管理 */
<template>
    <div class="main">
      <div class="top_part">
        <div class="search">
          <el-form ref="form" :inline="true" :model="form" :rules="rules" label-width="70px">
            <el-form-item label="角色:" prop="name">
                <el-input v-model="form.name" style="width:182px;" placeholder="全部"></el-input>
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
        
      </div>
    </div>    
</template>

<script>
export default {
  name: 'subaccountManage',
  data() {
    return {
      form:{
        name:''
      }
    }
  },
  components: {},
  watch: {
    
  },
  created() {

  },
  destroyed() {
    
  },
  methods: {
    submit(){},
    reset(){}
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