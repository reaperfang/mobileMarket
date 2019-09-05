
<script>
export default {
  name: 'mixinCoupon',
  data () {
    return {
      list: [],
      loading: false
    }
  },
  created() {
    this.fetch();
    this._globalEvent.$on('fetchCoupon', () =>{
      this.fetch();
    });
  },
  watch: {

    /* 监听添加类型，自动获取状态则拉取一下数据 */
    'currentComponentData.data.addType'(newValue) {
      if(newValue == 2) {
        this.fetch();
      }else{
        this.items = [];
        this.list = [];
        this.fetch();
      }
    },

    /* 监听显示个数类型 */
    'currentComponentData.data.couponNumberType'(newValue) {
      this.fetch();
    },

    /* 监听显示个数 */
    'currentComponentData.data.showNumber'(newValue) {
      this.fetch();
    }
  },
  methods: {

     //根据ids拉取数据
        fetch() {
          if(this.currentComponentData && this.currentComponentData.data) {
            let params = {};
            if(this.currentComponentData.data.addType == 2) {
              if(this.currentComponentData.data.couponNumberType === 1) {
                params = {
                  couponType: 0
                };
              }else {
                params = {
                  couponType: 0,
                  limitedQuantity: this.currentComponentData.data.showNumber
                };
              }
            }else{
              if(this.currentComponentData.data.ids.length) {
                params = {
                  couponType: 0,
                  ids: this.currentComponentData.data.ids
                };
              }else{
                this.list = [];
                return;
              }
            }

            this.loading = true;
            this.list = [];
            this._apis.shop.getCouponListByIds(params).then((response)=>{
                this.createList(response);
                this.loading = false;
            }).catch((error)=>{
                this.$notify.error({
                    title: '错误',
                    message: error
                });
                this.list = [];
                this.loading = false;
            });
          }
        },

         /* 创建数据 */
        createList(datas) {
            this.list = datas;
        },
  }
}
</script>