<template>
  <div class="new-template">
    <section>
      <div class="title">基础信息设置</div>
      <div class="content">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="模板名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入，不超过20个字符"></el-input>
          </el-form-item>
          <el-form-item label="计费方式" prop="mode">
            <el-radio v-model="ruleForm.mode" label="1">按件计费</el-radio>
            <el-radio v-model="ruleForm.mode" label="2">按重计费</el-radio>
            <el-radio v-model="ruleForm.mode" label="3">按体积计费</el-radio>
          </el-form-item>
        </el-form>
      </div>
    </section>
    <section class="regional-setting">
        <div class="title">区域设置</div>
        <div class="content">
            sf
        </div>
    </section>
  </div>
</template>
<script>
export default {
    data() {
        return {
            ruleForm: {
                name: '',
                mode: '1'
            },
            rules: {
                
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.new-template {
  section {
    padding: 20px;
    background-color: #fff;
    .title {
        margin-bottom: 20px;
        font-size: 16px;
    }
    &.regional-setting {
        .content {
            margin-left: 60px;
        }
    }
  }
}
/deep/ .el-input {
    width: auto;
}
</style>


