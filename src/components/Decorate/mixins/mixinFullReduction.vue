
<script>
export default {
  name: "mixinFullReduction",
  components: {},
  data() {
    return {
      list: []
    };
  },
  created() {
    this.fetch();
    this._globalEvent.$on('fetchFullReduction', () =>{
        this.fetch();
    });
  },
  methods: {

       //根据ids拉取数据
        fetch() {
            if(this.currentComponentData && this.currentComponentData.data) {
                const ids = this.currentComponentData.data.ids;
                if(Array.isArray(ids) && ids.length){
                  this.loading = true;
                  this._apis.shop.getFullReductionListByIds({
                      ids: ids.join(',')
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
        },
  }
};
</script>