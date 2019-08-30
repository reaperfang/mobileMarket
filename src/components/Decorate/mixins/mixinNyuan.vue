
<script>
export default {
    name:"mixinNyuan",
    data(){
        return{
            list: []
        }
    },
    created(){
        this.fetch();
        this._globalEvent.$on('fetchNyuan', () =>{
            this.fetch();
        });
    },
    methods:{

         //根据ids拉取数据
        fetch() {
            if(this.currentComponentData && this.currentComponentData.data && this.currentComponentData.data.ids && this.currentComponentData.data.ids.length) {
                this.loading = true;
                this._apis.shop.getNyuanListByIds({
                    baleIds : this.currentComponentData.data.ids.join(',')
                }).then((response)=>{
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
            this.list = [];
            if(this.hideSaledGoods==true){
                for(var i in datas){
                    if(datas[i].soldOut!=1){
                        this.list.push(datas[i]);
                    }
                }
            }
            else{
                this.list = datas;
            }
            var list = this.list;
            this.list = [];
            if(this.hideEndGoods==true){
                for(var i in list){
                    if(list[i].activityEnd!=1){
                        this.list.push(list[i]);
                    }
                }
            }
            else{
                this.list = list;
            }
        },
    }
}
</script>