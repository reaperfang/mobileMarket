<template>
  <div>
       <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0" :inline="true" style="overflow-y: initial;">
          <div class="inline-head">
            <el-form-item label="" prop="name">
              <treeselect
                :multiple="true"
                :options="options"
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
        <el-table :data="tableData[currentTab]" stripe ref="multipleTable" @selection-change="handleSelectionChange" @row-click="rowClick">
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
// import the component
import Treeselect from '@riophae/vue-treeselect'
  // import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: "goodsDetail",
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
      tableData: [],

      value: [],
      options: [ {
        id: 'fruits',
        label: 'Fruits',
        children: [ {
          id: 'apple',
          label: 'Apple 🍎',
          isNew: true,
        }, {
          id: 'grapes',
          label: 'Grapes 🍇',
        }, {
          id: 'pear',
          label: 'Pear 🍐',
        }, {
          id: 'strawberry',
          label: 'Strawberry 🍓',
        }, {
          id: 'watermelon',
          label: 'Watermelon 🍉',
        } ],
      }, {
        id: 'vegetables',
        label: 'Vegetables',
        children: [ {
          id: 'corn',
          label: 'Corn 🌽',
        }, {
          id: 'carrot',
          label: 'Carrot 🥕',
        }, {
          id: 'eggplant',
          label: 'Eggplant 🍆',
        }, {
          id: 'tomato',
          label: 'Tomato 🍅',
        } ],
      } ],
    };
  },
  created() {
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
    //根据ids拉取数据
    fetch() {
        if(this.currentComponentData && this.currentComponentData.data) {
            let params = {};
            const ids = this.currentComponentData.data.ids;
            if(ids && Object.prototype.toString.call(ids) === '[object Object]') {
                if(this.currentCatagoryId === 'all') {
                    const allIds = [];
                    for(let k in ids) {
                        for(let item of ids[k]) {
                            allIds.push(item);
                        }
                    }
                    params = {
                        status: '1',
                        ids: allIds
                    }
                }else{
                    params = {
                        status: '1',
                        ids: ids[this.currentCatagoryId],
                        productCatalogInfoId: this.currentCatagoryId
                    }
                }
            }else if(Array.isArray(ids) && ids.length){
                params = {
                    status: '1',
                    ids: ids,
                }
            }else{
                return;
            }
            this.loading = true;
            this._apis.goods.fetchAllSpuGoodsList(params).then((response)=>{
                this.createList(response);
                this.loading = false;
            }).catch((error)=>{
                this.$notify.error({
                    title: '错误',
                    message: error
                });
                this.loading = false;
            });
        }
    },

      /* 创建数据 */
    createList(datas) {
        this.list = datas;
    },

   /* 选中某一行 */
    rowClick(row, column, event) {
      this.$emit('seletedRow',  {
        pageType: 'goodsDetail',
        data: {
          id: row.id,
          name: row.name,
          title: row.title
        }
      });
    },

  }
};
</script>

<style lang="scss">
.inline-head{
  justify-content: flex-end;
}
</style>