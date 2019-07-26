/*提现设置 */
<template>
    <div class="main">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="是否允许提现:" prop="name">
          <el-radio-group v-model="form.name">
            <el-radio :label="1">不允许</el-radio>
            <el-radio :label="2">允许</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="save">
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>    
</template>

<script>
export default {
  name: 'withdrawSet',
  data() {
    return {
      form:{
        name:1,
      },
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
    onSubmit(){},
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.main{
  width: 100%;
  background: #fff;
  padding: 20px;
  .save{
    margin: 200px 0 200px;
  }
}
</style>