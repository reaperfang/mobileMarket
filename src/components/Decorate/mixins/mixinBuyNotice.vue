
<script>
export default {
  name: "mixinBuyNotice",
  data() {
    return { 
      list: [],
      loading: false
    };
  },
  created() {
    this.fetch();
    this._globalEvent.$on('fetchBuyNotice', () =>{
      this.fetch();
    });
  },
  computed: {},
  methods: {

    //根据ids拉取数据
    fetch() {
        if(this.currentComponentData && this.currentComponentData.data) {
          const ids = this.currentComponentData.data.ids;
          if(Array.isArray(ids) && ids.length){
            this.loading = true;
            this._apis.order.getBuyNotice({
                    productIds: ids,
                }).then((response)=>{
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
          }else{
            this.list = [];
          }
        }
    },

      /* 创建数据 */
    createList(datas) {
        this.list = datas;
    }
  }
};
</script>