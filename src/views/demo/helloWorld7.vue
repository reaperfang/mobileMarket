<template>
  <div class="hello">
    <h1>{{ msg }}</h1>


    <!-- 接口数据请求demo -->
    <el-card>
      <h1>接口数据请求demo</h1>
      
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld7',
  data () {
    return {
      msg: '中企电商VUE框架',
      data: null
    }
  },

  created() {
    this.fetch();
  },

  methods:{
    fetch() {
      this.$api.getList({id: 644}).then((response)=>{
        this.data = response;
      }).catch((error)=>{
        this.$message.error(error);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.hello{
      text-align: center;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-card{
  margin-bottom:20px;
}
.line-container::after{
  left:1em;
}
</style>
