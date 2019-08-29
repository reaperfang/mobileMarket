
<script>
export default {
    name:"mixinMultiPerson",
    data(){
        return{
            list: []
        }
    },
    created(){
        this.fetch();
        this._globalEvent.$on('fetchMultiPerson', () =>{
            this.fetch();
        });
    },
    watch: {
        'currentComponentData.data.addType'(newValue) {
            if(newValue == 2) {
                this.fetch();
            }
        },
        'currentComponentData.data.showNumber'(newValue) {
            this.fetch();
        }
    },
    methods:{

         //根据ids拉取数据
        fetch() {
            if(this.currentComponentData && this.currentComponentData.data) {
                let params = {};
                if(this.currentComponentData.data.addType == 2) {
                    params = {
                        num: this.currentComponentData.data.showNumber,
                        order: this.currentComponentData.data.sortRule
                    };
                }else{
                    params = {
                        spuIds: this.currentComponentData.data.ids.join(','),
                        order: this.currentComponentData.data.sortRule
                    };
                }

                this.loading = true;
                this._apis.shop.getMultiPersonListByIds(params).then((response)=>{
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
            if(datas.length > this.showNumber){
                datas = datas.slice(0,this.showNumber);
            }
            this.list = [];
            if(this.hideSaledGoods==true){
                var goods = datas;
                for(var i in datas){
                    if(goods[i].soldOut!=1){
                        this.list.push(datas[i]);
                    }
                }
            }
            else{
                this.list = datas;
            }
        },
    }
}
</script>