/* 选择商品组弹框 */
<template>
  <DialogBase :visible.sync="visible" width="816px" :title="'选择商品分类'" @submit="submit">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0" :inline="true">
      <div class="inline-head">
        <el-form-item label prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label prop="name">
          <el-button type="primary" @click="fetch">搜 索</el-button>
        </el-form-item>
      </div>
    </el-form>

    <div class="goodsClassify">
      <div class="categoryTh" style="background:'#ebeafa'; color:'#655EFF';">
        <div class="treeRow th">
          <span class="td">分类名称</span>
          <span class="td">已选择商品数量</span>
          <span class="td">操作</span>
        </div>
      </div>
      <el-tree
        v-loading="loading"
        class="goodsCategory"
        :data="categoryData"
        :props="defaultProps"
        node-key="id"
        ref="category"
        :check-strictly="true"
        :default-expand-all="true"
        :expand-on-click-node="false"
        :render-content="renderContent"
      ></el-tree>
    </div>
    <!-- 动态弹窗 -->
    <component
      v-if="dialogVisible2"
      :is="currentDialog"
      :dialogVisible.sync="dialogVisible2"
      @dialogDataSelected="dialogDataSelected"
      :categoryId="currentCategory.id"
      :categoryName="currentCategory.categoryName"
    ></component>
  </DialogBase>
</template>

<script>
import DialogBase from "@/components/DialogBase";
import dialogSelectGoods from "./dialogSelectGoods";
import utils from "@/utils";
import uuid from "uuid/v4";
export default {
  name: "dialogSelectGoodsGroup",
  components: { DialogBase, dialogSelectGoods },
  props: {
    data: {},
    dialogVisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      loading: true,
      defaultProps: {
        //tree组件配置
        children: "childrenList",
        label: "categoryName"
      },
      categoryData: [], //转化以后的分类树形数据
      flatArr: [],
      responseData: [], //请求来的原数据
      ruleForm: {
        name: "",
        enable: "1"
      },
      rules: {},
      dialogVisible2: false, //子弹窗是否显示
      currentDialog: "", //当前弹窗
      currentCategory: {}, //当前选中的分类
      resultData: {} //生成的结果数据
    };
  },
  computed: {
    visible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this.$emit("update:dialogVisible", val);
      }
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.loading = true;
      this._apis.goods
        .fetchCategoryList(this.ruleForm)
        .then(response => {
          this.responseData = response;
          let arr = this.transTreeData(response, 0);
          this.categoryData = arr;
          console.log(response);
          this.flatArr = this.flatTreeArray(JSON.parse(JSON.stringify(arr)));
          this.loading = false;
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: error
          });
          this.loading = false;
        });
    },

    transTreeData(data, pid) {
      var result = [],
        temp;
      for (var i = 0; i < data.length; i++) {
        if (data[i].parentId == pid) {
          var obj = {
            categoryName: data[i].name,
            id: data[i].id,
            parentId: data[i].parentId,
            level: data[i].level,
            sort: data[i].sort,
            image: data[i].image,
            enable: data[i].enable,
            goods: data[i].goods || []
          };
          temp = this.transTreeData(data, data[i].id);
          if (temp.length > 0) {
            obj.childrenList = temp;
          }
          result.push(obj);
        }
      }
      return result;
    },

    flatTreeArray(array = [], childrenKey = "childrenList") {
      var result = [];
      let flat = (array = {}, childrenKey, floor) => {
        array.forEach(item => {
          let dataItem = {
            floor: floor,
            name: item.categoryName,
            id: item.id,
            parentId: item.parentId
          };
          result.push(dataItem);

          let childrenArr;
          if (item.hasOwnProperty(childrenKey)) {
            childrenArr = item[childrenKey];
            delete item[childrenKey];
          }
          if (childrenArr && childrenArr.length > 0) {
            flat(childrenArr, childrenKey, floor + 1);
          }
        });
      };
      flat(array, childrenKey, 1);
      return result;
    },

    renderContent(h, { node, data, store }) {
      return (
        <div class="treeRow">
          <span class="td first">
           <img class="td img" src={data.image}/>
           {data.categoryName}
           </span>
          <span class="td state">{data.goods ? data.goods.length : 0}</span>
          <span class="td operate">
            {
              <span class="blue" on-click={() => this.change(node, data)}>
                选择商品
              </span>
            }
          </span>
        </div>
      );
    },

    change(node, data) {
      console.log(data);
      this.currentCategory = data;
      this.currentDialog = "dialogSelectGoods";
      this.dialogVisible2 = true;
    },

    /* 向父组件提交选中的数据 */
    submit() {
      this.$emit("goodsGroupDataSelected", this.resultData);
    },

    /* 弹窗选中了数据项 */
    dialogDataSelected(items) {
      if(!items.length) {  //没有数据的分类不添加
        return;
      }
      /* 重置树形数据，把选中的商品回显到列表中 */
      for (let item of this.responseData) {
        if (this.currentCategory.id === item.id) {
          item["goods"] = items;
        }
      }
      this.categoryData = this.transTreeData(this.responseData, 0);

      //把选中的数据收集起来发给父组件
      this.resultData[this.currentCategory.id] = {
        catagoryData: this.currentCategory,
        goods: items
      };
      this.currentDialog = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.name_wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    display: block;
    margin-right: 10px;
    border: 1px solid #ddd;
    object-fit: cover;
  }
}

.blue {
  color: $globalMainColor;
}
.deleteColor {
  color: #f55858;
}
/deep/.goodsClassify {
  background: #fff;
  // padding: 25px 38px;
  .dialog-container {
    text-align: left;
  }
  .form-inline {
    margin-top: 23px;
  }
  .goodsCategory .el-tree-node,
  .categoryTh {
    position: relative;
  }
  .goodsCategory .el-tree-node__content {
    border-bottom: 1px solid #eee;
    height: auto;
  }
  .th .td:first-child {
    padding-left: 10px;
  }
  .treeRow {
    overflow: hidden;
    width: 100%;
  }
  .treeRow .td {
    line-height: 40px;
    height: 40px;
    display: inline-block;
    width: 33%;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .treeRow .td.img {
    width:50px;
    object-fit: contain;
  }
  .treeRow .td .thumbImg {
    width: 30px;
    height: 30px;
    border: 1px solid #efefef;
    display: block;
    overflow: hidden;
    margin-top: 2px;
  }
  .treeRow .td .thumbImg img {
    width: 100%;
    object-fit: contain;
  }
  .treeRow .td.short {
    width: 10%;
  }
  .treeRow .td:nth-child(2) {
    position: absolute;
    left: 35%;
    text-align: center;
  }
  .treeRow .td:nth-child(3) {
    position: absolute;
    left: 75%;
    min-width: 200px;
  }
}
.operate {
  span {
    margin-right: 26px;
  }
}
</style>