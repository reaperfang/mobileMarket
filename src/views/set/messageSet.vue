/*消息设置 */
<template>
 <div class="main">
   <p class="title">买家通知</p>
      <!-- :span-method="objectSpanMethod" -->
    <el-table
      :data="tableData"
      border
      style="width: 100%;">
      <el-table-column
        prop="id"
        label="消息类别"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="消息标题">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="推送规则">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="公众号模版消息">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="小程序模版消息">
      </el-table-column>
      <el-table-column
        prop="amount4"
        label="短信通知">
        <!-- <template slot-scope="scope">
            <el-switch
            v-model="scope.row"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
        </template> -->
      </el-table-column>
    </el-table>
  </div>     
</template>

<script>
import buyer from "./components/buyer";
import seller from "./components/seller";
export default {
  name: 'messageSet',
  data() {
    return {
      tableData: [{
          id: '12987122',
          name: '王小虎',
          amount1: '234',
          amount2: '3.2',
          amount3: 10,
          amount4: true
        }, {
          id: '12987123',
          name: '王小虎',
          amount1: '165',
          amount2: '4.43',
          amount3: 12,
          amount4: false
        }, {
          id: '12987124',
          name: '王小虎',
          amount1: '324',
          amount2: '1.9',
          amount3: 9,
          amount4: true
        }, {
          id: '12987125',
          name: '王小虎',
          amount1: '621',
          amount2: '2.2',
          amount3: 17,
          amount4: true
        }, {
          id: '12987126',
          name: '王小虎',
          amount1: '539',
          amount2: '4.1',
          amount3: 15,
          amount4: false
        }]
    }
  },
  components: {buyer, seller},
  watch: {
    
  },
  created() {
    this.getShopMessage()
  },
  destroyed() {
    
  },
  methods: {
    getShopMessage(){
      let id = this.$store.getters.cid || '10'
      this._apis.set.getShopMessage({cid:id}).then(response =>{
        console.log('11111',response)
      }).catch(error =>{

      })
    },
    handleClick(comp) {
      this.currentTab = comp.name;
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
            if (rowIndex % 2 === 0) {
            return {
                rowspan: 2,
                colspan: 1
            };
            } else {
                return {
                    rowspan: 0,
                    colspan: 0
                };
            }
        }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.tabs{
  background:#fff; 
  padding:10px 20px;
}
.main{
  width: 100%;
  padding: 20px;
  background: #fff;
}
.title{
  height: 60px;
  line-height: 60px;
}
</style>