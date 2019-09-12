<template>
  <div>
    <DialogBase :visible.sync="visible" @submit="submit" title="购买商品获取积分规则" :hasCancel="hasCancel">
      <div class="c_container">
        <div class="clearfix">
          <span class="fl marR20">购买商品获取积分规则</span>
          <el-switch class="fl" v-model="enable" active-color="#66CCAC"></el-switch>
        </div>
        <div>购买获得积分，订单确认收货后按规则发放积分</div>
        <div>
          <span>赠送积分的商品：</span>
          <el-radio v-model="isAllProduct" label="0">全部商品</el-radio>
          <el-radio v-model="isAllProduct" label="1" @change="showDialog">指定商品</el-radio>
        </div>
        <div>
          <span>是否区分人群发放：</span>
          <el-radio v-model="distinguish" label="0">不区分</el-radio>
          <el-radio v-model="distinguish" label="1">区分</el-radio>
        </div>
        <div v-if="distinguish == '0'">
          <span>每消费</span>
          <div class="input_wrap">
            <el-input v-model="payAmount1"></el-input>
          </div>
          <span>元 获得</span>
          <div class="input_wrap">
            <el-input v-model="allMember"></el-input>
          </div>
          <span>积分</span>
        </div>
        <div v-if="distinguish == '1'">
            <div class="marB10">
                <span>每消费&nbsp;&nbsp;&nbsp;</span>
                <div class="input_wrap2" style="margin-left:14px">
                    <el-input placeholder="请输入整数" v-model="payAmount"></el-input>
                </div>
                <span>元 获得</span>
            </div>
            <div class="marB10">
                <span>客户获得</span>
                <div class="input_wrap2" style="margin-left:14px">
                    <el-input placeholder="请输入整数，不输入则不发放" v-model="noMember"></el-input>
                </div>
                <span>积分</span>
            </div>
            <div class="marB10">
                <span>新会员获得</span>
                <div class="input_wrap2">
                    <el-input placeholder="请输入整数，不输入则不发放" v-model="newMember"></el-input>
                </div>
                <span>积分</span>
            </div>
            <div class="marB10">
                <span>老会员获得</span>
                <div class="input_wrap2">
                    <el-input placeholder="请输入整数，不输入则不发放" v-model="oldMember"></el-input>
                </div>
                <span>积分</span>
            </div>
        </div>
      </div>
    </DialogBase>
    <el-dialog :visible.sync="otherVisible" width="40%" title="选择商品">
      <div class="dialog-container">
        <div class="c_container">
          <div>
            <div class="input_wrap">
              <el-cascader :options="categoryOptions" v-model="categoryValue" clearable></el-cascader>
            </div>
            <div class="input_wrap">
              <el-input placeholder="输入商品标签" v-model="productLabelName"></el-input>
            </div>
            <div class="input_wrap2">
              <el-input placeholder="输入商品名称" v-model="name"></el-input>
            </div>
            <el-button type="primary" class="marL10" @click="handleSearch">搜索</el-button>
            <el-button @click="reset">重置</el-button>
          </div>
          <el-table
            :data="skuList"
            style="width: 100%"
            ref="skuTable"
            :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
            :default-sort="{prop: 'date', order: 'descending'}"
          >
            <el-table-column type="selection" prop="choose" label="选择"></el-table-column>
            <el-table-column prop="goodsInfo.id" label="SKU"></el-table-column>
            <el-table-column prop="goodsInfo.name" label="商品名称"></el-table-column>
            <el-table-column prop="goodsInfo.specs" label="规格"></el-table-column>
            <el-table-column prop="goodsInfo.salePrice" label="商品价格"></el-table-column>
            <el-table-column prop="goodsInfo.stock" label="商品库存"></el-table-column>
          </el-table>
        </div>
      </div>
      <span class="dialog-footer fcc">
        <el-button type="primary" @click="submit2">确 认</el-button>
        <el-button @click="otherVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import DialogBase from "@/components/DialogBase";
export default {
  props: ["data"],
  name: "buyRegularDialog",
  data() {
    return {
      hasCancel: true,
      enable: false,
      isAllProduct: "0",
      distinguish: "0",
      otherVisible: false,
      categoryOptions: [],
      categoryValue: [],
      productLabelName: "",
      name: "",
      skuList: JSON.parse(localStorage.getItem('skuList')) || [],
      payAmount1: "",
      payAmount:"",
      allMember:"",
      noMember:"",
      newMember:"",
      oldMember:"",
      selectProducts:[],
      isAllProduct: null,
      distinguish: null
    };
  },
  methods: {
    submit() {
        let params = {
            id: this.data.row.id,
            enable: this.enable,
            sceneRule: {
                isAllProduct: this.isAllProduct == '0'? true:false,
                selectProducts: this.selectProducts,
                distinguish: this.distinguish == '0'? false:true,
                noDistinguish: {
                    payAmount: this.payAmount1,
                    allMember: this.allMember
                },
                yesDistinguish: {
                    payAmount: this.payAmount,
                    noMember: this.noMember,
                    newMember: this.newMember,
                    oldMember: this.oldMember
                }
            }
        }
        if(!params.sceneRule.isAllProduct && this.selectProducts.length == 0) {
            this.$notify({
                title: '警告',
                message: '请选择指定产品',
                type: 'warning'
            });
        }else{
            this._apis.client.editCreditRegular(params).then((response) => {
                this.$notify({
                    title: '成功',
                    message: "保存成功",
                    type: 'success'
                });
            }).catch((error) => {
                this.$notify.error({
                    title: '错误',
                    message: error
                });
            })
        }
    },
    showDialog(val) {
      if (val == 1) {
        this.otherVisible = true;
        this.$nextTick(() => {
          let sceneRule = JSON.parse(this.data.row.sceneRule);
          sceneRule.selectProducts.map((v) => {
            this.skuList.forEach(row => {
                if(row.goodsInfo.id == v.id) {
                  this.$refs.skuTable.toggleRowSelection(row);
                }
            })
          });
        })
      }
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
            label: data[i].name,
            value: data[i].id
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
    getProductClass() {
      this._apis.client
        .getProductClass({})
        .then(response => {
          let arr = this.transTreeData(response, 0);
          this.categoryOptions = [].concat(arr);
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: error
          });
        });
    },
    getSkuList(startIndex, pageSize) {
      let params = {
        name: this.name,
        productCatalogInfoId: this.categoryValue[2],
        startIndex: startIndex,
        pageSize: pageSize,
        productLabelName: this.productLabelName
      };
      this._apis.client
        .getSkuList(params)
        .then(response => {
          response.list.map((v) => {
              v.goodsInfo.specs = v.goodsInfo.specs.replace(/{|}|"|"/g,"");
          })
          this.skuList = [].concat(response.list);
        })
        .catch(error => {
          this.$notify.error({
            title: "错误",
            message: error
          });
        });
    },
    handleSearch() {
        this.getSkuList(1,10);
    },
    reset() {
        this.categoryValue = [];
        this.productLabelName = "";
        this.name = "";
    },
    submit2() {
        this.otherVisible = false;
        let selection = this.$refs.skuTable.selection;
        selection.map((v) => {
            let obj = {};
            obj.id = v.goodsInfo.id;
            obj.name = v.goodsInfo.name;
            this.selectProducts.push(obj);
        });
    },
    getInfo() {
      let row = this.data.row;
      if(row.sceneRule.length > 0) {
        let sceneRule = JSON.parse(row.sceneRule);
        this.enable = row.enable == '启用'?true:false;
        this.isAllProduct = sceneRule.isAllProduct?'0':'1';
        // this.$nextTick(() => {
        //   sceneRule.selectProducts.map((v) => {
        //     this.skuList.forEach(row => {
        //         if(row.goodsInfo.id == v.id) {
        //           console.log(this.$refs.skuTable);
        //           this.$refs.skuTable.toggleRowSelection(row);
        //         }
        //     })
        //   });
        // })
        this.distinguish = sceneRule.distinguish?"1":"0";
        this.payAmount1 = sceneRule.noDistinguish.payAmount;
        this.allMember = sceneRule.noDistinguish.allMember;
        this.oldMember = sceneRule.yesDistinguish.oldMember;
        this.newMember = sceneRule.yesDistinguish.newMember;
        this.noMember = sceneRule.yesDistinguish.noMember;
        this.payAmount = sceneRule.yesDistinguish.payAmount;
      }
    }
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
  mounted() {
    this.getSkuList(1,10);
    this.getInfo();
    this.getProductClass();
  },
  props: {
    data: {},
    dialogVisible: {
      type: Boolean,
      required: true
    }
  },
  components: {
    DialogBase
  }
};
</script>
<style lang="scss" scoped>
/deep/ .el-dialog {
  border-radius: 10px;
}
/deep/ .el-dialog__header {
  background: #f1f0ff;
  border-radius: 10px 10px 0 0;
}
/deep/ .el-dialog__title {
  color: #44434b;
}
.c_container {
    .marL10{
        margin-left: 10px;
    }
  > div {
    text-align: left;
    margin-bottom: 17px;
    .input_wrap {
      width: 150px;
      display: inline-block;
    }
    .input_wrap2 {
      width: 174px;
      display: inline-block;
    }
  }
  .marR20 {
    margin-right: 20px;
  }
}
</style>


