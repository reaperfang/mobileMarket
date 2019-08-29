
<script>
export default {
    name:"mixinGoods",
    props: ['currentCatagoryId'],
    data(){
        return{
            list: []
        }
    },
    created(){
        this.fetch();
        this._globalEvent.$on('fetchGoods', () =>{
            this.fetch();
        });
    },
    watch: {
        currentCatagoryId(newValue) {
            this.currentCatagoryId = newValue;
            this.fetch();
        },
    },
    methods:{

        //根据ids拉取数据
        fetch() {
            if(this.currentComponentData && this.currentComponentData.data) {
                let params = {};
                const ids = this.currentComponentData.data.ids;
                if(ids && Object.prototype.toString.call(ids) === '[object Object]') {
                    if(this.currentCatagoryId === 'all') {
                        const allIds = [];
                        for(let k in ids) {
                            for(let item of ids[k]) {
                                allIds.push(item);
                            }
                        }
                        params = {
                            status: '1',
                            ids: allIds
                        }
                    }else{
                        params = {
                            status: '1',
                            ids: ids[this.currentCatagoryId],
                            productCatalogInfoId: this.currentCatagoryId
                        }
                    }
                }else if(Array.isArray(ids) && ids.length){
                    params = {
                        status: '1',
                        ids: ids,
                    }
                }else{
                    return;
                }
                this.loading = true;
                this._apis.goods.fetchAllSpuGoodsList(params).then((response)=>{
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
            this.list = datas;
        },
    }
}
</script>