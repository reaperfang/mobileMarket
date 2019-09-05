/*新建子账号 */
<template>
    <div class="main">
        <h1>创建角色</h1>
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <!-- <el-form-item label="店铺名称:" prop="shopName">
                <el-input v-model="form.shopName" style="width:182px;" placeholder="10个汉字"></el-input>
            </el-form-item> -->
            <el-form-item label="角色名称:" prop="roleName">
                <el-input v-model="form.roleName" style="width:182px;" placeholder="10个汉字"></el-input>
            </el-form-item>
            <el-form-item label="角色描述:" prop="roleDesc">
                <el-input v-model="form.roleDesc" style="width:182px;" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="同步店铺:" prop="shop">
                <el-radio-group v-model="form.shop" class="inline">
                    <el-radio
                    v-for="item in shops"
                    :key="item.id"
                    :label="item.id"
                    :value="item.id"
                    @change="handleShop"
                    class="mr20">
                    {{item.shopName}}
                    </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-tab-pane v-for="(menu, index) in theModel" :key="index"  :label="menu.menuName" style="display:block">
                    <tree-menu 
                    :model="menu" 
                    ref="tree" 
                    :menuList="menu" 
                    :label="index" 
                    :selectKeys="selectKeys">
                    </tree-menu>
                </el-tab-pane>
            </el-form-item>
            <el-form-item class="mtb200">
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button @click="_routeTo('roleManage')">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import treeMenu from '@/components/TreeMenu'
import * as menus from '@/components/menus'
export default {
  name: 'createRole',
  components:{
      treeMenu
  },
  data() {
    return {
      form: {
          roleName:'',
          roleDesc: '',
          shop: []
      },
      shops:[],
      rules:{
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        shop:[
          { required: true, message: '请选择店铺', trigger: 'blur' },
        ]
      },
      selectKeys:[],
      theModel:menus,
      msfList:[]
    }
  },
  computed: {
      roleInfo(){
          return this.$route.params.data
      },
      userInfo(){
        return JSON.parse(this.$store.getters.userInfo)
     }
  },
  created(){
      this.init()
      this.getShops()
  },
  methods:{
    init(){
        this.roleInfo && (this.form = {
            roleName:this.roleInfo.roleName,
            roleDesc:this.roleInfo.roleDesc,
            shop:this.roleInfo.shopIds.split(',')              
        })
    },
      //获取所有店铺
    getShops(){
      let data = this.userInfo.shopInfoMap
      for(let key in data){
        let shopObj = data[key]
        this.shops.push(shopObj)
      }
    },
    handleShop(val){
        this.shops.map(item =>{
            item.id == val && (this.msfList = item.data.msfList)
        })
        console.log('66666',this.msfList )
    },
    onSubmit(){},      
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main{
    width: 100%;
    background: #fff;
    padding: 20px;
    h1{
        font-size: 14px;
        color: #3D434A;
        margin-bottom: 30px;
    }
}
.inline{
    display: inline;
}
.ml20{
    margin-left: 20px;
}
.mr20{
    margin-right: 20px;
}
.mtb200{
    margin: 200px 0;
}
</style>