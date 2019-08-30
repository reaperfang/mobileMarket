
<script>
export default {
    name:"mixinDiscount",
    data(){
        return{
            list: []
        }
    },
    created(){
        this.fetch();
        this._globalEvent.$on('fetchDiscount', () =>{
            this.fetch();
        });
    },
    methods:{
          //根据ids拉取数据
        fetch() {
            if(this.currentComponentData && this.currentComponentData.data) {
                const ids = this.currentComponentData.data.ids;
                if(Array.isArray(ids) && ids.length){
                    this.loading = true;
                    this._apis.shop.getDiscountListByIds({
                        rightsDiscount: 1, 
                        spuIds: ids.join(',')
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
}
</script>