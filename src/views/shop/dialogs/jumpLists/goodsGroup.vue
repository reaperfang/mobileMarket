<template>
  <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0" :inline="true">
          <div class="inline-head">
            <el-form-item label="" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入分组名称"></el-input>
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
          <el-table-column prop="classifyName" label="分类名称"></el-table-column>
          <el-table-column prop="goodsNumber" label="商品数量"></el-table-column>
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
export default {
  name: "goodsGroup",
  extends: tableBase,
  components: {},
  props: {
     
  },
  data() {
    return {
      ruleForm: {
        name: ''
      },
      rules: {},
      goodsClassifyList: []
    };
  },
  created() {
  },
  methods: {
    fetch() {
      this._apis.shop.getClassifyList({
        enable: '1'
      }).then((response)=>{
        this.goodsClassifyList = response.list;
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      });
    },

    /* 选中某一行 */
    rowClick(row, column, event) {
      this.$emit('seletedRow',  {
        pageType: 'goodsGroup',
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

<style lang="scss">
.inline-head{
  justify-content: flex-end;
}
</style>