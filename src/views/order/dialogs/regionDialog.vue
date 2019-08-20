<template>
  <DialogBase :visible.sync="visible" title="区域选择" width="500px" :showFooter="showFooter">
      <div>
          <div class="wrapper">
            <template v-for="(item, key) of region">
              <div class="province" :key="key">
                <div class="title" @mouseenter="titleMouseover(item)">
                  <el-checkbox v-model="item.checked"></el-checkbox>{{item.name}}
                  <div class="citys" v-if="item.checked"  @mouseover="titleMouseover(item)" @mouseout="titleMouseout(item)">
                    <div class="tr">
                      <i class="el-icon-close" @click="closeCitys"></i>
                    </div>
                    <el-checkbox-group v-model="checkList">
                      <el-checkbox v-for="(city, key2) of item.citys" :key="key2" 
                      :label="{
                        code: item.code,
                        name: item.name, 
                        city: {
                          code: city.code, 
                          name: city.name
                        }
                      }">{{city.name}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div>
            已选中：<el-tag v-for="(item, key) of checkList" :key="key" style="margin-right:5px;margin-bottom:5px;">{{item.city.name}}</el-tag>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="submit" :loading="loading">确 定</el-button>
          </div>
      </div>
  </DialogBase>    
</template>
<script>
import DialogBase from '@/components/DialogBase'
import { _nationalRegionInfo } from "@/api/order";
export default {
  name: "regionDialog",
  //extends: dialogBase,
  data() {
    return {
      region: [], //地区列表json
      // dialogWidth: '1000px',
      checkList: [], //选中的地区
      dialogFormVisible: true,

      showFooter: false
    };
  },
  created() {
    this.fetch();
    this.convertData();
  },
  computed: {
      visible: {
          get() {
              return this.dialogVisible
          },
          set(val) {
              this.$emit('update:dialogVisible', val)
          }
      },
  },
  props: {
      data: {

      },
      dialogVisible: {
          type: Boolean,
          required: true
      },
  },
  components: {
      DialogBase
  },
  methods: {
    closeCitys() {
      let _region = [...this.region]

      _region.forEach(val => {
        val.checked = false
      })

      this.region = _region
    },
    fetch() {
      this.loading = true;
      this._apis.order.getArea()
        .then(response => {
          this.region = response;
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          this.$message.error(error);
        });
    },

    submit() {
      this.$emit("submit", this.checkList);
      this.visible = false;
    },

    convertData() {
      this.checkList = [];
      if(this.data && this.data.deliveryAreaPrice){
        for(let key in this.data.deliveryAreaPrice){
          let oneType = this.data.deliveryAreaPrice[key];
          if(key !== '000000'){
            const provinces = key.split(',');
            for(let item of provinces){
              // if(item === ) {

              // }
            }
            const citys = [];
            for(let item of oneType.subArea){
              citys.push({
                code: item.zoneCode,
                name: item.zoneName
              });
            }
          }
        }
      }
    },

    //鼠标移入、覆盖
    titleMouseover(item) {
      const tempItem = [...this.region];
      for (let one of tempItem) {
        if (one.code === item.code) {
          one.checked = true;
        } else {
          one.checked = false;
        }
      }
      this.region = tempItem;
    },

    //鼠标移出
    titleMouseout(item) {
      // const tempItem = [...this.region];
      // for (let one of tempItem) {
      //   one.checked = false;
      // }
      // this.region = tempItem;
    },
    close() {
      
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
  // .el-checkbox.title{
  // 	width: 90px;
  // 	margin: 0 5px 10px 0 !important;
  // }
  p.title {
    border: 1px solid transparent;
    cursor: pointer;
    transition: all 0.4s;
    &:hover {
      border: 1px solid #98c4f1;
    }
  }
  .province {
    width: 120px;
    margin: 0 0 10px !important;
    position: relative;
    .citys {
      position: absolute;
      background: #fff;
      top: 0;
      z-index: 10;
      left: 50px;
      min-width: 200px;
      max-width: 500px;
      border: 1px solid #98c4f1;
      -webkit-box-shadow: 4px 3px 10px rgba(0, 0, 0, 0.2);
      box-shadow: 4px 3px 10px rgba(0, 0, 0, 0.2);
      padding: 8px 8px 6px;
      // display:none;
      transition: all 0.4s;
      .el-checkbox-group {
        .el-checkbox {
          margin: 0 5px 10px 0 !important;
        }
      }
      &.show {
        display: block;
      }
    }
  }
}
.dialog-footer {
  text-align: center;
}
// p.title:hover + .citys{
// 	display:block;
// }
</style>




