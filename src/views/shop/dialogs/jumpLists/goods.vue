<template>
  <div>
       <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0" :inline="true" style="overflow-y: initial;">
          <div class="inline-head">
            <el-form-item label="" prop="name">
              <treeselect
                style="width:300px"
                :multiple="true"
                :options="categoryData"
                placeholder="请选择分类"
                v-model="value"></treeselect>
            </el-form-item>
            <el-form-item label="" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
            <el-form-item label="" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入编码"></el-input>
            </el-form-item>
            <el-form-item label="" prop="">
              <el-button type="primary" @click="fetch">搜  索</el-button>
            </el-form-item>
          </div>
        </el-form>
        <el-table :data="tableData" stripe ref="multipleTable" @selection-change="handleSelectionChange" @row-click="rowClick" v-loading="loading">
          <el-table-column
            type="selection"  
            width="55">
          </el-table-column>
          <el-table-column prop="goodsName" label="商品名称"></el-table-column>
          <el-table-column prop="classify" label="所属分类"></el-table-column>
          <el-table-column prop="visitor" label="访客数"></el-table-column>
          <el-table-column prop="browse" label="浏览数"></el-table-column>
          <el-table-column prop="totalSales" label="总销量"></el-table-column>
        </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="Number(startIndex) || 1"
          :page-sizes="[5, 10, 20, 50, 100, 200, 500]"
          :page-size="pageSize*1"
          :total="total*1"
          layout="total, sizes, prev, pager, next, jumper"
          >
        </el-pagination>
      </div>
  </div>
</template>

<script>
import tableBase from '@/components/TableBase';
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: "goods",
  extends: tableBase,
  components: { Treeselect },
  props: {
     
  },
  data() {
    return {
      ruleForm: {
        name: ''
      },
      rules: {},
      goodsClassifyList: [],
      tableData: [],
      value: [],
      // options: [ {
      //   id: 'fruits',
      //   label: 'Fruits',
      //   children: [ {
      //     id: 'apple',
      //     label: 'Apple 🍎',
      //     isNew: true,
      //   }, {
      //     id: 'grapes',
      //     label: 'Grapes 🍇',
      //   }, {
      //     id: 'pear',
      //     label: 'Pear 🍐',
      //   }, {
      //     id: 'strawberry',
      //     label: 'Strawberry 🍓',
      //   }, {
      //     id: 'watermelon',
      //     label: 'Watermelon 🍉',
      //   } ],
      // }, {
      //   id: 'vegetables',
      //   label: 'Vegetables',
      //   children: [ {
      //     id: 'corn',
      //     label: 'Corn 🌽',
      //   }, {
      //     id: 'carrot',
      //     label: 'Carrot 🥕',
      //   }, {
      //     id: 'eggplant',
      //     label: 'Eggplant 🍆',
      //   }, {
      //     id: 'tomato',
      //     label: 'Tomato 🍅',
      //   } ],
      // } ],
    };
  },
  created() {
    this.getGoodsClassifyList();
  },
  watch: {
    multiple(newValue) {
      if (newValue) {
        this.value = this.value ? [ this.value ] : []
      } else {
        this.value = this.value[0]
      }
    },
  },
  methods: {

    /* 获取分组列表 */
    getGoodsClassifyList() {
     this._apis.goods.fetchCategoryList({
        enable: '1'
      }).then((response)=>{
        this.responseData = response;
        let arr = this.transTreeData(response, 0)
        this.categoryData = arr
        console.log(response);
        this.flatArr = this.flatTreeArray(JSON.parse(JSON.stringify(arr)))
        this.loading = false;
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
        this.loading = false;
      });
    },

    //根据ids拉取数据
    fetch() {
      this.loading = true;
      this._apis.goods.fetchSpuGoodsList({
        name: "",
        status: '1',
        productCatalogInfoId: this.value || ''
      }).then((response)=>{
        this.tableList = response.list;
        this.total = response.total;
        this.loading = false;
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
        this.loading = false;
      });
    },

   /* 选中某一行 */
    rowClick(row, column, event) {
      this.$emit('seletedRow',  {
        pageType: 'goods',
        data: {
          id: row.id,
          name: row.name,
          title: row.title
        }
      });
    },

    transTreeData(data, pid) {
      var result = [], temp;
      for (var i = 0; i < data.length; i++) {
          if (data[i].parentId == pid) {
              var obj = {
                label: data[i].name,
                id: data[i].id, 
                parentId: data[i].parentId, 
                level: data[i].level, 
                sort: data[i].sort, 
                image: data[i].image, 
                enable: data[i].enable, 
                goods: (data[i].goods || [])
              };
              temp = this.transTreeData(data, data[i].id);
              if (temp.length > 0) {
                  obj.children = temp;
              }
              result.push(obj);
          }
      }
      return result;
    },

     flatTreeArray(array = [], childrenKey = 'children') {
      var result = [];
      let flat = (array = {}, childrenKey, floor) => {
          array.forEach(item => {
          let dataItem = {
              floor: floor,
              name: item.categoryName,
              id: item.id,
              parentId: item.parentId,
          }
          result.push(dataItem);

          let childrenArr;
          if (item.hasOwnProperty(childrenKey)) {
              childrenArr = item[childrenKey];
              delete item[childrenKey];
          }
          if (childrenArr && childrenArr.length > 0) {
              flat(childrenArr, childrenKey, floor + 1)
          }
          });
      }
      flat(array, childrenKey, 1);
      return result;
    },

  }
};
</script>

<style lang="scss" scoped>
.inline-head{
  justify-content: flex-end;
}
</style>