<!-- 弹窗基类,所有模块内的弹窗都继承自此页面 -->

<script>
import orderBase from './orderBase';
import {_expressCompanyList} from '@/api/order';
export default {
  name: 'dialogBase',
  props: ['data', 'mode', 'refresh'],
  extends: orderBase,
  data() {
    return {
      loading: false,
      dialogFormVisible: true,
      formLabelWidth: '80px',
      dialogWidth: '548px',
    }
  },
  methods: {
    close() {
      this.$emit('dialogClose');
    },

    // 提交表单
    submitForm(formName, cbName) {
      this.$refs[formName].validate(valid => {
        //$ref类似选择器
        if (valid) {
          this[cbName]();
        }
      });
    },

     //获取快递公司列表
    getExpressCompanyList(){
      _expressCompanyList({}).then((response)=>{
        this.expressCompanyList = response;
      }).catch((error)=>{
        this.$message.error(error);
      });
    }
  }
}
</script>
<style lang="scss" scoped>
input{
  width:150px!important;
}
</style>
