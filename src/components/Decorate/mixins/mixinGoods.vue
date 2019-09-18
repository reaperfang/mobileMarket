
<script>
export default {
    name:"mixinGoods",
    props: ['currentCatagoryId'],
    data(){
        return{
            list: [],
            loading: false
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
            this.fetch();
        },
        'ruleForm.currentCatagoryId'() {
            this.fetch();
        }
    },
    methods:{

        //根据ids拉取数据
        fetch() {
            if(this.currentComponentData && this.currentComponentData.data) {
                let params = {};
                if(!this.currentComponentData.data.source || (this.currentComponentData.data.source === 1)) {
                    const ids = this.currentComponentData.data.ids;
                    if(ids) {
                        if(Object.prototype.toString.call(ids) === '[object Object]') {
                            params = this.setGroupGoodsParams(ids);
                        }else if(Array.isArray(ids) && ids.length){
                            params = this.setNormalGoodsParams(ids);
                        }else{
                            this.list = [];
                            return;
                        }
                    }else{
                        this.list = [];
                        return;
                    }
                }else if(this.currentComponentData.data.source === 2){
                    params = {
                        status: '1',
                        productCatalogInfoId: this.ruleForm.currentCatagoryId
                    };
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
                    this.list = [];
                    this.loading = false;
                });
            }
        },

          /* 创建数据 */
        createList(datas) {
            this.list = datas;
            if(this.currentComponentData.data.source === 2) {
                this._globalEvent.$emit('goodsListOfGroupChange', datas);  //告知中央组件list数据更改
            }
        },

        /* 设置分组商品参数 */
        setGroupGoodsParams(ids) {
            let params = {};
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
            return params;
        },

        /* 设置普通商品参数 */
        setNormalGoodsParams(ids) {
            return {
                status: '1',
                ids: ids,
            }
        }
    }
}
</script>