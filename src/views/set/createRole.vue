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
                <el-checkbox-group v-model="form.shop" class="inline">
                    <div v-for="item in shops" :key="item.id">
                        <el-checkbox                                          
                        :label="item.id"
                        :value="item.id"                     
                        class="mr20">
                        {{item.shopName}}
                        </el-checkbox>
                        <el-link type="primary" @click="handleIsShow(item)">{{item.isShow ? '隐藏' : '展开'}}</el-link>
                        <el-tree
                        :data="item.data.msfList"
                        show-checkbox
                        node-key="id"
                        :default-expanded-keys="[2, 3]"
                        :default-checked-keys="[5]"
                        :props="defaultProps"
                        v-if="item.isShow">
                        </el-tree>
                    </div>                    
                </el-checkbox-group>
                <!-- @change="handleShop(item.id)" -->
            </el-form-item>
            <!-- <el-form-item>
                <el-tab-pane v-for="(menu, index) in theModel" :key="index"  :label="menu.name" style="display:block">
                    <tree-menu 
                    :model="menu" 
                    ref="tree" 
                    :menuList="menu" 
                    :label="index" 
                    :selectKeys="selectKeys">
                    </tree-menu>
                </el-tab-pane>
            </el-form-item> -->
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
import shopInfoVue from './shopInfo.vue';
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
    //   theModel:menus,
      theModel:[],
      msfList:[{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
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
        data[key].data.msfList = this.getTree(data[key].data.msfList)
        let shopObj = Object.assign(data[key],{isShow:false})
        this.shops.push(shopObj)
      }
    },
    //是否展示功能点
    handleIsShow(data){
        this.shops.map(item =>{
            item.id == data.id && (item.isShow = !item.isShow)
        })
    },
    // handleShop(val){
    //     this.shops.map(item =>{
    //         item.id == val && (this.msfList = item.data.msfList)
    //     })
    //     this.tree(this.msfList)
    //     console.log('66666',this.msfList )     
    // },

    getTree(list){
        let msfList = []
        for(let item0 of list){ //1
            if(item0.navType == 0){
                msfList.push(Object.assign(item0,{children:[]}))
            }
        }
        for(let item1 of list){//2
            if(item1.navType == 1){
                msfList[0].children.push(Object.assign(item1,{children:[]}))
            }
        }

        for(let item2 of list){//5
            if(item2.navType == 2){
                msfList[0].children.map((children1,index) => {
                    if(children1.id == item2.parentId){
                        msfList[0].children[index].children.push(Object.assign(item2,{children:[]}))
                    }
                })
            }
        }

        for(let item3 of list){//5
            if(item3.navType == 3){
                // console.log('num',1)
                msfList[0].children.map((children1,index1) => {
                    msfList[0].children[index1].children.map((children2,index2) =>{
                        if(children2.id == item3.parentId){
                            msfList[0].children[index1].children[index2].children.push(Object.assign(item3,{children:[]}))
                        }
                    })
                })
            }
        }

        for(let item4 of list){//8
            if(item4.navType == 4){
                msfList[0].children.map((children1,index1) => {
                    msfList[0].children[index1].children.map((children2,index2) =>{
                        msfList[0].children[index1].children[index2].children.map((children3,index3) =>{
                            if(children3.id == item4.parentId){
                                msfList[0].children[index1].children[index2].children[index3].children.push(Object.assign(item4,{children:[]}))
                            }
                        })
                    })
                })
            }
        }

        for(let item5 of list){//4
            if(item5.navType == 5){
                msfList[0].children.map((children1,index1) => {
                    msfList[0].children[index1].children.map((children2,index2) =>{
                        msfList[0].children[index1].children[index2].children.map((children3,index3) =>{
                            msfList[0].children[index1].children[index2].children[index3].children.map((children4,index4) =>{
                                if(children4.id == item5.parentId){
                                    msfList[0].children[index1].children[index2].children[index3].children[index4].children.push(Object.assign(item5,{children:[]}))
                                }
                            })
                        })
                    })
                })
            }
        }
        console.log('tree',msfList)
        return msfList
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