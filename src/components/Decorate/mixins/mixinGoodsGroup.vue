
<script>
export default {
    name:"mixinGoodsGroup",
    data() {
      return {
        list: []
      }
    },
    created() {
      this.fetch();
      this._globalEvent.$on('fetchGoodsGroup', () =>{
          this.fetch();
      });
    },
    methods:{

        //根据ids拉取数据
        fetch() {
            if(this.currentComponentData && this.currentComponentData.data && this.currentComponentData.data.ids) {
                let ids = [];
                for(let item in this.currentComponentData.data.ids) {
                  ids.push(item);
                }
                if(!ids.length) {
                  return;
                }
                this.loading = true;
                this._apis.goods.fetchCategoryList({ids}).then((response)=>{
                    this.list = response;
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
    }
}
</script>