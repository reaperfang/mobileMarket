<template>
  <div class="group-wrapper">
    <div class="module view">
      <div class="phone-head">
        <img :src="require('@/assets/images/shop/editor/phone_head.png')" alt="">
        <span>商品分组</span>
      </div>
      <div class="phone-body">
        <componentGoodsGroupPageSetting 
        :data="ruleForm" 
        v-if="ruleForm"
        ></componentGoodsGroupPageSetting>
      </div>
    </div>
    <div class="module props">
      <propertyGoodsGroupPageSetting 
      :saveAndApply="saveAndApply" 
      :data="ruleForm" 
      :save="save" 
      @goodsGroupPageDataChanged="emitChangeRuleForm"
      ></propertyGoodsGroupPageSetting>
    </div>
  </div>
</template>

<script>
import componentGoodsGroupPageSetting from '../../decorate/comps/componentGoodsGroupPageSetting';
import propertyGoodsGroupPageSetting from '../../decorate/props/propertyGoodsGroupPageSetting';
export default {
  name: "shopIndex",
  components: {componentGoodsGroupPageSetting, propertyGoodsGroupPageSetting},
  data() {
    return {
     ruleForm: null,
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.loading = true;
      this._apis.shop.getGoodsGroup({}).then((response)=>{
        const pageData = JSON.parse(response.pageData);
        if(pageData && pageData.groupStyle) {
          this.ruleForm = pageData;
        }
        this.loading = false;
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
        this.loading = false;
      });
    },

    /* 表单数据发生改变 */
    emitChangeRuleForm(value) {
      this.ruleForm = value
    },

    /* 保存并生效 */
    saveAndApply() {
      this.submit({
        status: '0',
        pageKey: '',
        pageData: JSON.stringify(this.ruleForm)
      });
    },

    /* 保存 */
    save() {
       this.submit({
        status: '1',
        pageKey: '',
        pageData: JSON.stringify(this.ruleForm)
      });
    },

    submit(params) {
      this.loading = true;
      this._apis.shop.editGoodsGroup(params).then((response)=>{
        this.$notify({
          title: '成功',
          message: '编辑成功！',
          type: 'success'
        });
        this.loading = false;
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.group-wrapper{
  display:flex;
  flex-direction: row;
}
.module {
  &.view {
    width: 374px;
    .phone-body {
      height: 760px;
    }
  }
  &.props{
    width:346px;
    border-right: 1px solid #e8e5e5;
  }
}
</style>
