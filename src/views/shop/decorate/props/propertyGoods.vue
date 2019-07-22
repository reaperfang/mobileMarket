<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="活动名称">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </div>

    <div class="block form">
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'propertyGoods',
  props: ['data'],
  components: {},
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        type: '',
        desc: ''
      },
      rules: {}
    }
  },
  created() {
    if(this.data){
      this.ruleForm = this.data;
    }
  },
  watch: {
    ruleForm: {
      handler(newValue) {
        this.$emit('change', {
          id: this.$parent.currentComponentId,
          data: newValue
        });
      },
      deep: true
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
</style>
